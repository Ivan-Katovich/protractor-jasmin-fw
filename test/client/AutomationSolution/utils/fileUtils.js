
var dataBaseHelper = require('./dataBaseHelper.js');

function deleteDocumentByDescription(file, document) {
    return dataBaseHelper.executeVoidCommand("update DocFolder set isdeleted = 1 where fileid = (select fileid from Files where filename = '" + file + "') " +
        "and description = '" + document + "' and isdeleted = 0");
}

function deleteDocumentInFolder(file, folder, document) {
    if (folder == null) {
        return dataBaseHelper.executeVoidCommand("update DocFolder set isdeleted = 1 where description = '" + document + "' and isdeleted = 0 and fileid = " +
            "(select fileid from Files where filename = '" + file + "' and isdeleted = 0) and " +
            "parentid is NULL");
    } else {
        return dataBaseHelper.executeVoidCommand("update DocFolder set isdeleted = 1 where description = '" + document + "' and isdeleted = 0 and fileid = " +
            "(select fileid from Files where filename = '" + file + "' and isdeleted = 0) and " +
            "parentid = (select docfolderid from DocFolder where description = '" + folder + "' and isdeleted = 0 and fileid = " +
            "(select fileid from Files where filename = '" + file + "' and isdeleted = 0))");
    }
}

function deleteDocumentByID(documentID) {
    return dataBaseHelper.executeVoidCommand("update DocFolder set isdeleted = 1 where isdeleted = 0 and docfolderid = " + documentID + "");
}

function restoreDocumentByDescription(file, document) {
    return dataBaseHelper.executeVoidCommand("update DocFolder set isdeleted = 0 where fileid = (select fileid from Files where filename = '" + file + "') " +
        "and description = '" + document + "' and isdeleted = 1");
}


function restoreDocumentInFolderByDescription(file, folder, document) {
    if (folder == null) {
        return dataBaseHelper.executeVoidCommand("update DocFolder set isdeleted = 0 where fileid = (select fileid from Files where filename = '" + file + "') " +
            "and parentid is Null and description = '" + document + "' and isdeleted = 1");
    } else {
        return dataBaseHelper.executeVoidCommand("update DocFolder set isdeleted = 0 where fileid = (select fileid from Files where filename = '" + file + "')" +
            " and parentid = (select docfolderid from DocFolder where description = '" + folder + "' and isdeleted = 0 and " +
            "fileid = (select fileid from Files where filename = '" + file + "' and isdeleted = 0)) " +
            "and description = '" + document + "' and isdeleted = 1");
    }
}

function restoreDocumentByID(documentID) {
    return dataBaseHelper.executeVoidCommand("update DocFolder set isdeleted = 0 where isdeleted = 1 and docfolderid = " + documentID + "");
}

function restoreDocumentDeletedToday(file, document) {
    return dataBaseHelper.executeVoidCommand("update DocFolder set isdeleted = 0 where fileid = (select fileid from Files where filename = '" + file + "') " +
        "and description = '" + document + "' and isdeleted = 1 and lastmodified between DATEADD(dd, DATEDIFF(dd,0,GETDATE()), 0) and DATEADD(dd, DATEDIFF(dd,0,GETDATE()), 1)");
}

function deleteFileByDescription(file) {
    return dataBaseHelper.executeVoidCommand("update Files set isdeleted = 1 where filename = '" + file + "'");
}

function restoreFileByDescription(file) {
    return dataBaseHelper.executeVoidCommand("update Files set isdeleted = 0 where filename = '" + file + "'");
}

// The 'folder' parameter receives NULL or folder name
function changeDocumentLocation(file, folder, document, type) {
    if (folder == null) {
        //the document location is file root
        return dataBaseHelper.executeVoidCommand("UPDATE DocFolder set parentid = NULL where fileid = (select fileid from Files where filename = '" + file + "' and isdeleted = 0) " +
            "and description = '" + document + "' and isdeleted = 0")
            .then(function () {
                return changeDocumentType(file, document, type);
            });
    } else {
        //the document location is folder
        return dataBaseHelper.executeVoidCommand("UPDATE DocFolder set parentid = (select docfolderid from DocFolder where description = '" + folder + "' and isdeleted = 0)" +
            " where fileid = (select fileid from Files where filename = '" + file + "' and isdeleted = 0) and description = '" + document + "' and isdeleted = 0")
            .then(function () {
                return changeDocumentType(file, document, type);
            });
    }
}

function changePageLocation(file, document, page, pageNumber) {
    return dataBaseHelper.executeVoidCommand("UPDATE Pages set documentid = (select docfolderid from DocFolder where description = '" + document + "' and isdeleted = 0 " +
        "and fileid = (select fileid from Files where filename = '" + file + "' and isdeleted = 0)), pagenumber = " + pageNumber + " " +
        "where description = '" + page + "' and documentid in (select docfolderid from DocFolder " +
        "where fileid = (select fileid from Files where filename = '" + file + "' and isdeleted = 0) and isdeleted = 0) and isdeleted = 0");
}

// The 'folder' parameter receives NULL or folder name
function moveDocumentToNewFile(sourceFile, destinationFile, folder, document, type) {
    if (folder == null) {
        //the document location is file root
        return dataBaseHelper.executeVoidCommand("UPDATE DocFolder set parentid = NULL, fileid = (select fileid from Files where filename = '" + destinationFile + "' and isdeleted = 0)  where fileid = (select fileid from Files where filename = '" + sourceFile + "' and isdeleted = 0) " +
            "and description = '" + document + "' and isdeleted = 0")
            .then(function () {
                return changeDocumentType(destinationFile, document, type);
            });
    } else {
        //the document location is folder
        return dataBaseHelper.executeVoidCommand("UPDATE DocFolder set parentid = (select docfolderid from DocFolder where description = '" + folder + "' and isdeleted = 0)," +
            " fileid = (select fileid from Files where filename = '" + destinationFile + "' and isdeleted = 0) where fileid = (select fileid from Files where filename = '" + sourceFile + "' and isdeleted = 0) and description = '" + document + "' and isdeleted = 0")
            .then(function () {
                return changeDocumentType(destinationFile, document, type);
            });
    }
    //change document type

}

function movePageToNewFile(sourceFile, sourceDocument, destinationFile, destinationDocument, page, pageNumber) {
    return dataBaseHelper.executeVoidCommand("UPDATE Pages set documentid = (select docfolderid from DocFolder where description = '" + destinationDocument + "' and isdeleted = 0 " +
        "and fileid = (select fileid from Files where filename = '" + destinationFile + "' and isdeleted = 0)), pagenumber = " + pageNumber + " " +
        "where description = '" + page + "' and documentid = (select docfolderid from DocFolder " +
        "where description = '" + sourceDocument + "' and isdeleted = 0 and fileid = (select fileid from Files where filename = '" + sourceFile + "' and isdeleted = 0) and isdeleted = 0) and isdeleted = 0");
}

function deletePage(file, document, page) {
    return dataBaseHelper.executeVoidCommand("UPDATE Pages set isdeleted = 1 where documentid = (select docfolderid from DocFolder " +
        "where description = '" + document + "' and isdeleted = 0 and fileid = (select fileid from Files where filename = '" + file + "' and isdeleted = 0))" +
        " and description = '" + page + "'");
}

function deleteAllPagesFromDocument(file, document) {
    return dataBaseHelper.executeVoidCommand("UPDATE Pages set isdeleted = 1 where documentid =" +
        " (select docfolderid from DocFolder where description = '" + document + "' and isdeleted = 0 " +
        "and fileid = (select fileid from Files where filename = '" + file + "' and isdeleted = 0))");
}

function deletePageFromDocumentInFolder(file, folder, document, page) {
    if (folder == null) {
        return dataBaseHelper.executeVoidCommand("update Pages set isdeleted = 1 where documentid = " +
            "(select docfolderid from DocFolder where description = '" + document + "' and isdeleted = 0 and fileid = " +
            "(select fileid from Files where filename = '" + file + "' and isdeleted = 0) and " +
            "parentid is NULL) and description = '" + page + "'");
    } else {
        return dataBaseHelper.executeVoidCommand("update Pages set isdeleted = 1 where documentid = " +
            "(select docfolderid from DocFolder where description = '" + document + "' and isdeleted = 0 and fileid = " +
            "(select fileid from Files where filename = '" + file + "' and isdeleted = 0) and " +
            "parentid = (select docfolderid from DocFolder where description = '" + folder + "' and isdeleted = 0 and fileid = " +
            "(select fileid from Files where filename = '" + file + "' and isdeleted = 0))) and description = '" + page + "'");
    }
}

function deleteAllPagesFromDocumentInFolder(file, folder, document) {
    if (folder == null) {
        return dataBaseHelper.executeVoidCommand("update Pages set isdeleted = 1 where documentid = " +
            "(select docfolderid from DocFolder where description = '" + document + "' and isdeleted = 0 and fileid = " +
            "(select fileid from Files where filename = '" + file + "' and isdeleted = 0) and " +
            "parentid is NULL)");
    } else {
        return dataBaseHelper.executeVoidCommand("update Pages set isdeleted = 1 where documentid = " +
            "(select docfolderid from DocFolder where description = '" + document + "' and isdeleted = 0 and fileid = " +
            "(select fileid from Files where filename = '" + file + "' and isdeleted = 0) and " +
            "parentid = (select docfolderid from DocFolder where description = '" + folder + "' and isdeleted = 0 and fileid = " +
            "(select fileid from Files where filename = '" + file + "' and isdeleted = 0)))");
    }
}

function changePageDescription(pageID, newPageDesc) {
    return dataBaseHelper.executeVoidCommand("UPDATE Pages set description = '" + newPageDesc + "' where pageid = " + pageID);
}

function changeDocumentDescription(documentID, newDocumentDesc) {
    return dataBaseHelper.executeVoidCommand("update DocFolder set description = '" + newDocumentDesc + "' where docfolderid = " + documentID);
    //dataBaseHelper.executeVoidCommand("UPDATE DocFolder set description = " + newDocumentDesc + " where docfolderid = " + documentID); //22550
}

function changeDocumentType(file, document, type) {
    return dataBaseHelper.executeVoidCommand("UPDATE ObjectLink set typeid = (select typeid from ObjectType where name = '" + type + "' and classid = (select classid from ClassDef where classname = 'Document'))" +
        " where objectid = (select docfolderid from DocFolder where description = '" + document + "' " +
        "and fileid = (select fileid from Files where filename = '" + file + "' and isdeleted = 0) and isdeleted = 0)");
}

function getDocumentID(filename, documentDescription) {
    return dataBaseHelper.executeStringCommand("select docfolderid from DocFolder where description = '" + documentDescription + "' and isdeleted = 0 " +
        "and fileid = (select fileid from Files where filename = '" + filename + "' and isdeleted = 0)")
        .then(function (result) {
            return parseInt(result);
        });
}

function isPagePresent(file, folder, document, page){
    if (folder == null) {
        return dataBaseHelper.executeVoidCommand("select pageid from Pages where documentid = " +
            "(select docfolderid from DocFolder where description = '" + document + "' and isdeleted = 0 and fileid = " +
            "(select fileid from Files where filename = '" + file + "' and isdeleted = 0) and " +
            "parentid is NULL) and description = '" + page + "' and isdeleted = 0")
            .then(function (res) {
                return res.length;
            });
    } else {
        return dataBaseHelper.executeVoidCommand("select pageid from Pages where documentid = " +
            "(select docfolderid from DocFolder where description = '" + document + "' and isdeleted = 0 and fileid = " +
            "(select fileid from Files where filename = '" + file + "' and isdeleted = 0) and " +
            "parentid = (select docfolderid from DocFolder where description = '" + folder + "' and isdeleted = 0 and fileid = " +
            "(select fileid from Files where filename = '" + file + "' and isdeleted = 0))) and description = '" + page + "' and isdeleted = 0")
            .then(function (res) {
                return res.length;
            });
    }
}

function freezeFile(fileName, name) {
    return dataBaseHelper.executeVoidCommand("UPDATE Files SET frozenby = (select top (1) accountid from SecurityAccount where name='" + name +
        "') WHERE filename = '" + fileName + "'");
}

function unfreezeFile(fileName) {
    return dataBaseHelper.executeVoidCommand("UPDATE Files SET frozenby = NULL WHERE filename = '" + fileName + "'");
}

//this function removes from file previously deleted or moved pages and documents with statuses 1 and 2
function cleanFile(fileName) {
    return dataBaseHelper.executeVoidCommand("delete from pages where documentid in (select docfolderid from DocFolder where fileid in " +
        "(select fileid from files where filename = '" + fileName + "') and isdeleted <> 0)")
        .then(function () {
            return dataBaseHelper.executeVoidCommand("delete from pages where documentid in (select docfolderid from DocFolder where fileid in " +
                "((select fileid from files where filename = '" + fileName + "'))and isdeleted<>0");
        })
        .then(function () {
            return dataBaseHelper.executeVoidCommand("delete from Document where docfolderid in (select docfolderid from DocFolder where fileid in " +
                "((select fileid from files where filename = '" + fileName + "') and isdeleted <> 0)");
        })
        .then(function () {
            return dataBaseHelper.executeVoidCommand(" from Folder where docfolderid in (select docfolderid from DocFolder where fileid in " +
                "((select fileid from files where filename = '" + fileName + "') and isdeleted <> 0)");
        })
        .then(function () {
            return dataBaseHelper.executeVoidCommand("delete from DocFolder where fileid in " +
                "((select fileid from files where filename = '" + fileName + "') and isdeleted <>0 ");
        });
}

function renameDrawerInstanceDescription(oldName, newName) {
    return dataBaseHelper.executeVoidCommand("update Locations set description = '" + newName + "' where description = '" + oldName + "'");
}

function renameFileTypeDescription(oldName, newName) {
    return dataBaseHelper.executeVoidCommand("update ObjectType set description = '" + newName + "' where description = '" + oldName + "' and classid='-3'");
}

function renameDocumentTypeDescription(oldName, newName) {
    return dataBaseHelper.executeVoidCommand("update ObjectType set description = '" + newName + "' where description = '" + oldName + "' and classid='-1'");
}

exports.cleanFile = cleanFile;
exports.restoreFileByDescription = restoreFileByDescription;
exports.restoreDocumentByID = restoreDocumentByID;
exports.restoreDocumentDeletedToday = restoreDocumentDeletedToday;
exports.deleteFileByDescription = deleteFileByDescription;
exports.restoreDocumentByDescription = restoreDocumentByDescription;
exports.restoreDocumentInFolderByDescription = restoreDocumentInFolderByDescription;
exports.deleteDocumentByDescription = deleteDocumentByDescription;
exports.deleteDocumentInFolder = deleteDocumentInFolder;
exports.deleteDocumentByID = deleteDocumentByID;
exports.changeDocumentLocation = changeDocumentLocation;
exports.changePageLocation = changePageLocation;
exports.moveDocumentToNewFile = moveDocumentToNewFile;
exports.movePageToNewFile = movePageToNewFile;
exports.deletePage = deletePage;
exports.deleteAllPagesFromDocument = deleteAllPagesFromDocument;
exports.deletePageFromDocumentInFolder = deletePageFromDocumentInFolder;
exports.deleteAllPagesFromDocumentInFolder = deleteAllPagesFromDocumentInFolder;
exports.changePageDescription = changePageDescription;
exports.changeDocumentDescription = changeDocumentDescription;
exports.changeDocumentType = changeDocumentType;
exports.getDocumentID = getDocumentID;
exports.isPagePresent = isPagePresent;
exports.freezeFile = freezeFile;
exports.unfreezeFile = unfreezeFile;
exports.renameDrawerInstanceDescription = renameDrawerInstanceDescription;
exports.renameFileTypeDescription = renameFileTypeDescription;
exports.renameDocumentTypeDescription = renameDocumentTypeDescription;


