exports.tags = ['File_Navigation', 'Left_Rail'];
/*
    Checkout feature; 
    Created: ...
    Refactored: 10/5/2016, navasaal
*/

/* modeling; */
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var SearchPage = require('../../PageObjects/SearchPage.js');
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var OpenFilesDropdown = require('./../../PageObjects/LeftRail/OpenFilesDropdown.js');
var CheckedOutFilesList = require('./../../PageObjects/LeftRail/CheckedOutFilesList.js');
var RecordHeader = require('./../../PageObjects/Containers/RecordHeader.js');
var LoginPage = require('./../../PageObjects/LoginPage.js');
var FileTree = require('./../../PageObjects/Containers/FileTree.js');
var filesview = require('../../PageObjects/FilesView.js');
var ErrorMessage = require('./../../PageObjects/ModalDialogs/ErrorMessage.js');
var LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js');

/* utils; */
var mockBackend = require('../../utils/mockBackend.js');
var conversionUtils = require('../../utils/conversionUtils.js');
var mockUtils = require('../../utils/mockUtils.js');
var Q = require('q');

/* objects; */
var leftRailBar = new LeftRailBar();
var irSearchPage = new SearchPage();
var navigationBar = new NavigationBar();
var openFilesDropdown = new OpenFilesDropdown();
var checkedOutFilesList = new CheckedOutFilesList();
var recordHeader = new RecordHeader();
var loginPage = new LoginPage();
var fileTree = new FileTree();
var errorMessage = new ErrorMessage();
var filesArea = new filesview();

describe("Checked out files List", function () {

    function cancelCheckOut() {
        return filesArea.cancelCheckOutButton.click().then(function () {
            return webdriverUtils.waitTillElementVisible(filesArea.okButton).then(function () {
                return filesArea.okButton.click();
            });
        });
    }

    function checkout() {
        return navigationBar.searchIcon.click()
        .then(function () {
            return irSearchPage.fileNameSearchBox.clear();
        })
        .then(function () {
            return irSearchPage.fileNameSearchBox.sendKeys('CheckedOutFilesList');
        })
        .then(irSearchPage.searchButton.click)
        .then(function () {
            return webdriverUtils.waitTillElementVisible(fileTree.folderByText('Folder1'));
        })
        .then(function () {
            return webdriverUtils.showNodeChildrenByText('Folder1', 'folder');
        })
        .then(function () {
            return webdriverUtils.waitTillElementVisible(fileTree.documentByText('F1D1'));
        })
        .then(function () {
            return webdriverUtils.showNodeChildrenByText('F1D1', 'document');
        })
        .then(function () {
            return webdriverUtils.waitTillElementVisible(fileTree.pageByText('doc.doc'));
        })
        .then(function () {
            return webdriverUtils.clickOnNodeInFileTree('doc.doc', 'page');
        })
        .then(function () {
            return filesArea.cancelCheckOutButton.isPresent()
            .then(function (cancel) {
                if (cancel == true) {
                    return cancelCheckOut();
                };
            });
        })
        .then(function () {
            return webdriverUtils.waitTillElementVisible(filesArea.checkOutButton);
        })
        .then(filesArea.checkOutButton.click)
        .then(function () {
            return browser.waitForAngular()
        })
        .then(leftRailBar.openFilesDropdown.click)
		.then(function () {
		    return browser.waitForAngular()
		})
    }

    beforeEach(function () {
        //(browser.params.siteBase == 'node') ? mockUtils.createMockData(mockBackend, 'api/files/find', 0, 'POST') : function () {
        browser.executeScript('window.localStorage.clear();')
        .then(browser.driver.get(browser.params.defaultUrl))
        .then(function () {
            browser.sleep(5000);
        });
    });

    it('1-If there are no files currently checked out, the checked out files dropdown should display YOU HAVE NO CHECKED OUT PAGES and count element should be 0', function () {
        leftRailBar.openFilesDropdown.click().
        then(function () {
            return expect(checkedOutFilesList.getFileList.count()).toBe(0);
        })
        .then(function () {
            return expect(checkedOutFilesList.checkedOutFilesListContainer.getText()).toBe('You have no checked out pages');
        });
    });

    it('2-If a user checks-out a page, the doc/page name should be added to the checked out files dropdown.', function () {
        return checkout()
        .then(function () {
            return expect(checkedOutFilesList.getFileList.count()).toBe(1);
        })
        .then(function () {
            return checkedOutFilesList.fileNumberContainer(0).getText();
        })
        .then(function (fileNum) {
            return expect(fileNum.toLowerCase()).toContain('checkedoutfileslist');
        })
        .then(function () {
            return checkedOutFilesList.fileNameOpenFileDropsDown(0).getText();
        })
        .then(function (openFile) {
            return expect(openFile.toLowerCase()).toBe('doc.doc');
        })
		.then(function () {
		    return cancelCheckOut();
		});
    });

    it('3-If a user checks out a page in a file and closes that file, You have no open files message should be presented.', function () {
        checkout()
        .then(function () {
            return openFilesDropdown.howerMouseOnFile(0);
        })
        .then(openFilesDropdown.removeOpenFileIcon(0).click)
        .then(function () {
            return openFilesDropdown.noFilesMessage.getText();
        })
        .then(function (message) {
            return expect(message).toBe('You have no open files');
        })
		.then(checkedOutFilesList.goToCheckedOutDoc(0).click)
		.then(function () {
		    return browser.sleep(5000);
		})
		.then(function () {
		    return cancelCheckOut();
		});
    });

    it('4-Clicking on checked-out page from checked out list should reopen the file at the page and display the page as selected in filetree.', function () {
        checkout()
        .then(checkedOutFilesList.goToCheckedOutDoc(0).click)
        .then(function () {
            return webdriverUtils.waitTillElementVisible(fileTree.fileNumber)
        })
        .then(function () {
            return fileTree.selectedPages.getText()
        })
        .then(function (treeSelection) {
            return expect(treeSelection[0]).toContain('doc.doc');
        })
        .then(function () {
            return filesArea.fileViewHeader.getText();
        })
        .then(function (docName) {
            return expect(docName.toLowerCase()).toContain('doc.doc');
        })
        .then(function () {
            return openFilesDropdown.getFileNames.getText();
        })
        .then(function (openFiles) {
            return expect(openFiles).toContain('CheckedOutFilesList');
        })
		.then(function () {
		    return filesArea.cancelCheckOutButton.isPresent()
		})
		.then(function (cancel) {
		    if (cancel == true) {
		        return cancelCheckOut();
		    };
		});
    });

    it('5-If a User has a page checked out from a currently open (but not currently visibile in file view) file, clicking the checked out page in the dropdown should navigate back to that file to the checked out page and move the file to the top of the list in open Files Dropdown.', function () {
        checkout()
        .then(navigationBar.searchIcon.click)
        .then(irSearchPage.clearResultsButton.click)
        .then(function () {
            return webdriverUtils.waitTillElementVisible(irSearchPage.fileNameSearchBox);
        })
        .then(irSearchPage.fileNameSearchBox.clear)
        .then(function () {
            return irSearchPage.fileNameSearchBox.sendKeys('KeyboardNavigation');
        })
        .then(irSearchPage.searchButton.click)
        .then(function () {
            return filesArea.createIcon.waitReady();
        })
        .then(checkedOutFilesList.goToCheckedOutDoc(0).click)
        .then(function () {
            return webdriverUtils.waitTillElementVisible(fileTree.fileNumber)
        })
        .then(function () {
            return fileTree.selectedPages.getText();
        })
        .then(function (selectTree) {
            return expect(selectTree[0]).toContain('doc.doc');
        })
		.then(function () {
		    return filesArea.cancelCheckOutButton.isPresent()
		})
		.then(function (cancel) {
		    if (cancel == true) {
		        return cancelCheckOut();
		    };
		});
    });
});