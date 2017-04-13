/*
 name: fileSystemUtils.js
 created: 2/16/2016
 note: use this to work with file system items
 */

var fs = require('fs'),
    fsp = require('fs-promise'),
    q = require('q'),
    path = require('path');

function createTxt(file, text, callback) {
    fs.writeFile(file, text, function (err) {
        err ? console.log(err) : callback ? callback() : null;
    });
}

function createTxtPromised(file, text) {
    return fsp.writeFile(file, text)
        .then(function () {
            return waitForAppeared(file);
        });
}

function createReadOnly(folder, file, text, callback) {
    fs.writeFile(path.resolve(folder, file), text, function (err) {
        fs.chmod(path.resolve(folder, file), 4000, function (err) {
            err ? console.log(err) : callback ? callback.call() : null;
        });
    });
}

function createReadOnlyPromised(folder, file, text) {
    var filePath = path.resolve(folder, file);
    return fsp.writeFile(filePath, text)
        .then(function () {
            return fsp.chmod(filePath, 4000);
        })
        .then(function () {
            return waitForAppeared(filePath);
        });
}



function createManyInFolder(folder, file, text, count, callback) {
    for (index = 0 ; index < count; index++) {
        createInFolder(folder, index + file, text);
    }
    callback ? callback.call() : null;
}

function createManyInFolderPromised(folder, file, text, count) {
    var deferred = q.defer();
    for (index = 0 ; index < count; index++) {
        createInFolder(folder, index + file, text);
        if(index === count-1){
            deferred.resolve();
            return deferred.promise;
        }
    }
}

function createInFolder(folder, file, text, callback) {
    fs.writeFile(path.resolve(folder, file), text, function (err) {
        err ? console.log(err) : callback ? callback.call() : null;
    });
}

function createInFolderPromised(folder, file, text) {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
    var filePath = path.resolve(folder, file);
    return fsp.writeFile(filePath, text)
        .then(function () {
            return waitForAppeared(filePath);
        });
}

function createInFolderPromisedWithoutWaiting(folder, file, text) {
    var filePath = path.resolve(folder, file);
    return fsp.writeFile(filePath, text);
}

function removeFile(file, callback) {
    fs.unlink(file, function (err) {
        err ? console.log(err) : callback ? callback() : null;
    });
}

function removeFilePromised(file) {
    return fsp.unlink(file)
        .then(function () {
            return waitForDisappeared(file);
        });
}

function removeFolder(folder, callback) {
    fs.rmdir(folder, function (err) {
        err ? console.log(err) : callback ? callback() : null;
    });
}

function removeFolderPromised(folder){
    return fsp.rmdir(folder)
        .then(function () {
            return waitForDisappeared(folder);
        });
}

function removeInFolder(folder, file, callback) {
    var full = path.resolve(folder, file);
    fs.unlink(full, function (err) {
        err ? console.log(err) : callback ? callback() : null;
    });
}

function removeInFolderPromised(folder, file) {
    var full = path.resolve(folder, file);
    fsp.unlink(full)
        .then(function () {
            return waitForDisappeared(full);
        })
}

function removeAll(directory, callback) {
    fs.readdir(directory, function (err, files) {
        if (files != null && files != undefined) {
            for (index = 0; index < files.length; index++) {
                full = path.resolve(directory, files[index]);
                removeFile(full);
            }
        }
        callback ? callback() : null;
    });
}

function removeAllPromised(directory) {
    return fsp.emptyDir(directory)
        .then(function () {
            return browser.wait(function(){
                return fsp.readdir(directory)
                    .then(function (files) {
                        return files.length === 0;
                    });
            },10000);
        });
}

function doesExist(path, callback) {
    fs.exists(path, function (err) {
        err ? callback(true) : callback(false);
    });
}

function doesExistPromised(path){
    return fsp.exists(path);
}

function renameFile(name, newName, callback) {
    fs.rename(name, newName, function (err) {
        err ? console.log(err) : callback ? callback() : null;
    });
}

function renameFilePromised(name, newName) {
    return fsp.rename(name, newName)
        .then(function () {
            return waitForAppeared(newName);
        });
}

function moveFile(src, dest) {
    /* TBD; */
    copyFile(src, dest);
    removeFile(src);
}

function moveFilePromised(src, fileName, dest) {
    return copyFilePromised(src, fileName, dest)
        .then(function () {
            return removeFilePromised(path.resolve(src, fileName));
        });
}

function copyFile(folder, file, destFolder, cb) {
    var cbCalled = false;

    var rd = fs.createReadStream(path.resolve(folder, file));
    rd.on("error", done);
    var wr = fs.createWriteStream(path.resolve(destFolder, file));
    wr.on("error", done);
    wr.on("close", function (ex) {
        done();
    });
    rd.pipe(wr);

    function done(err) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }
}

function copyFilePromised(folder, file, destFolder) {
    var oldFile = path.resolve(folder, file),
        newFile = path.resolve(destFolder, file);
    return fsp.copy(oldFile,newFile);
}

function openFile(path, callback) {
    fs.open(path, 'r+', function (err) {
        err ? console.log(err) : callback ? callback() : null;
    });
}

function openFilePromised(path) {
    return fsp.open(path, 'r+');
}

function removeDir(folder){
    return fsp.remove(folder);
}

function waitForAppeared(path){
    return browser.wait(function(){
        return fsp.exists(path)
            .then(function (res) {
                return res;
            });
    },10000);
}

function waitForDisappeared(path){
    return browser.wait(function(){
        return fsp.exists(path)
            .then(function (res) {
                return !res;
            });
    },10000);
}

exports.createTxt = createTxt;
exports.createTxtPromised = createTxtPromised;
exports.createReadOnly = createReadOnly;
exports.createReadOnlyPromised = createReadOnlyPromised;
exports.createInFolder = createInFolder;
exports.createInFolderPromised = createInFolderPromised;
exports.createInFolderPromisedWithoutWaiting = createInFolderPromisedWithoutWaiting;
exports.createManyInFolder = createManyInFolder;
exports.createManyInFolderPromised = createManyInFolderPromised;
exports.removeFile = removeFile;
exports.removeFilePromised = removeFilePromised;
exports.removeInFolder = removeInFolder;
exports.removeInFolderPromised = removeInFolderPromised;
exports.removeAll = removeAll;
exports.removeAllPromised = removeAllPromised;
exports.renameFile = renameFile;
exports.renameFilePromised = renameFilePromised;
exports.moveFile = moveFile;
exports.moveFilePromised = moveFilePromised;
exports.copyFile = copyFile;
exports.copyFilePromised = copyFilePromised;
exports.removeFolder = removeFolder;
exports.removeFolderPromised = removeFolderPromised;
exports.doesExist = doesExist;
exports.doesExistPromised = doesExistPromised;
exports.openFile = openFile;
exports.openFilePromised = openFilePromised;
exports.waitForDisappeared = waitForDisappeared;
exports.waitForAppeared = waitForAppeared;
exports.removeDir = removeDir;