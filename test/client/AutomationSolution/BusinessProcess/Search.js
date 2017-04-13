var IR_SearchPage = require('../pageObjects/SearchPage.js'),
    IR_Filesview = require('../pageObjects/FilesView.js'),
    IR_NavigationBar = require('./../pageObjects/Containers/NavigationBar.js'),
    IR_LeftRailBar = require('./../pageObjects/LeftRail/LeftRailBar.js'),
    IR_OpenFilesDropdown = require('./../pageObjects/LeftRail/OpenFilesDropdown.js'),
    openFilesDropdown = new IR_OpenFilesDropdown(),
    searchPage = new IR_SearchPage(),
    navigationBar = new IR_NavigationBar(),
    leftRailBar = new IR_LeftRailBar(),
    filesArea = new IR_Filesview();


function openFile(fileNumber,field) {
    if(!field){
        field = 'Number';
    }
    return navigationBar.searchIcon.click()
        .then(function () {
            return searchPage['file'+field+'SearchBox'].sendKeys(fileNumber);
        })
        .then(searchPage.searchButton.click)
        .then(function () {
            return searchPage.searchGrid.count();
        })
        .then(function (count) {
            if(count > 1){
                return searchPage.firstLinkInResults.click();
            }
        });
}

//open another file (not from the previous search)
function reopenFile(fileNumber) {
    // var EC = protractor.ExpectedConditions;
    return navigationBar.searchIcon.click()
        .then(searchPage.clearResultsButton.click)
        .then(searchPage.fileNumberSearchBox.clear)
        .then(function () {
            return searchPage.fileNumberSearchBox.sendKeys(fileNumber);
        })
        .then(searchPage.searchButton.click)
        .then(function () {
            return searchPage.searchGrid.count();
        })
        .then(function (count) {
            if (count > 1) {
                return searchPage.firstLinkInResults.click();
            }
        });
}

function displayOpenedFile(fileName) {
    return openFilesDropdown.fileNameByText(fileName).isDisplayed()
        .then(function (is) {
            if(is){
                return openFilesDropdown.fileNameByText(fileName).click()
                    .then(function () {
                        return filesArea.fileViewTitle.getText();
                    })
                    .then(function (text) {
                        return expect(text).toEqual(fileName);
                    });
            }else{
                return leftRailBar.openFilesDropdown.click()
                    .then(function () {
                        return openFilesDropdown.fileNameByText(fileName).click();
                    })
                    .then(function () {
                        return filesArea.fileViewTitle.getText();
                    })
                    .then(function (text) {
                        return expect(text).toEqual(fileName);
                    });
            }
        });
}

exports.openFile = openFile;
exports.reopenFile = reopenFile;
exports.displayOpenedFile = displayOpenedFile;