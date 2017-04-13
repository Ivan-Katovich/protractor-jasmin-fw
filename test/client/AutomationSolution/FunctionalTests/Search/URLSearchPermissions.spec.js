exports.tags = ['File_Navigation', 'URL_Lookup'];
var IR_SearchPage = require('../../PageObjects/SearchPage.js');
var irSearchPage = new IR_SearchPage();
var IR_RecordHeader = require('./../../PageObjects/Containers/RecordHeader.js');
var IR_NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var navigationBar = new IR_NavigationBar();
var recordHeader = new IR_RecordHeader();
var IR_FilesView = require('../../PageObjects/FilesView.js');
var irFilesView = new IR_FilesView();
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var Q = require('q');
var IR_FileTree = require('./../../PageObjects/Containers/FileTree.js');
var fileTree = new IR_FileTree();
var IR_UserSettingsDropdown = require('./../../PageObjects/DropdownLists/UserSettingsDropdown.js');
var settingsDropdown = new IR_UserSettingsDropdown();
var IR_LoginPage = require('./../../PageObjects/LoginPage.js');
var loginPage = new IR_LoginPage();

describe("URL Search ", function () {
    if (browser.params.siteBase == 'iis') {

        beforeAll(function () {
            browser.driver.get(browser.params.defaultUrl);
            //make sure logged in as jbarnwell1 since need non-admin account to test permissions
            navigationBar.userSettingsIcon.click().then(function () {
                browser.waitForAngular().then(function () {
                    settingsDropdown.signOut.click().then(function () {
                        browser.sleep(2000).then(function () {
                            browser.driver.get(browser.params.defaultUrl).then(function () {
                                browser.sleep(3000).then(function () {
                                    loginPage.login("jbarnwell1", "Password1");
                                });
                            });
                        });
                    });
                });
            });
        });

        afterAll(function () {
            browser.driver.get(browser.params.defaultUrl);
            //make sure log back in as xp1 to continue tests w/o permissions issues
            navigationBar.userSettingsIcon.click().then(function () {
                settingsDropdown.signOut.click().then(function () {
                    browser.sleep(2000).then(function () {
                        browser.driver.get(browser.params.defaultUrl);
                        browser.sleep(3000);
                        loginPage.login(browser.params.defaultUserName, browser.params.defaultPassword);
                    });
                });
            });
        });
        
        it('If a user searches for a fileID of a file they do not have permissions to, they should be presented with error message "You do not have permissions to access the File in the URL lookup"', function () {
            browser.driver.get(browser.params.defaultUrl + '?fileid=28372').then(function () { //TrueTree of type Evens
                    browser.waitForAngular();
                    expect(irSearchPage.invalidUrlPopup.getText()).toContain('You do not have permissions to access the content in the URL lookup');
                });
                });

        
        it('If a user searches for a folderID of a folder they do not have permissions to, they should be presented with error message "You do not have permissions to access the content in the URL lookup"', function () {
            browser.driver.get(browser.params.defaultUrl + '?folderid=28500').then(function () {
                        browser.waitForAngular();
                        expect(irSearchPage.invalidUrlPopup.getText()).toContain('You do not have permissions to access the content in the URL lookup');
                    }); //Reinsurance_SecurityFolder in FileSecurityTesting
        });

        it('If a user searches for a documentId of a document they do not have permissions to, they should be presented with error message "You do not have permissions to access the content in the URL lookup"', function () {
            browser.driver.get(browser.params.defaultUrl + '?documentId=30232').then(function () {
                        browser.waitForAngular();
                        expect(irSearchPage.invalidUrlPopup.getText()).toContain('You do not have permissions to access the content in the URL lookup');
                    }); //TIFF_Multipage_format doctype in RelatedFile
            });

        it('If a user searches for a pageId within a file they have no permissions to they should be presented with error message "You do not have permissions to access the content in the URL lookup"', function () {
            browser.driver.get(browser.params.defaultUrl + '?pageId=213619').then(function () {
                        browser.waitForAngular();
                        expect(irSearchPage.invalidUrlPopup.getText()).toContain('You do not have permissions to access the content in the URL lookup');
                    }); //page inside file TrueTree of type Events
                });

        it('If a user searches for a pageId of a page within a drawer they do not have permissions to, they should be presented with error message "You do not have permissions to access the content in the URL lookup"', function () {
            browser.driver.get(browser.params.defaultUrl + '?pageId=216491').then(function () {
                        browser.waitForAngular();
                        expect(irSearchPage.invalidUrlPopup.getText()).toContain('You do not have permissions to access the content in the URL lookup');
                    }); //page in file DocPreview in Human Resources drawer
                       });

        it('If a user searches for by documentAttributes which match a doc in a filetype they do not have permissions to and another doc in a drawer they do have permissions to, '
            + 'they should be navigated to the document in the drawer they do have permissions to', function () { //matches on EmptyDoc in AddPage and Audit in FileWithRepFolder
                browser.driver.get(browser.params.defaultUrl + '?documentAttributes=Location%3D5').then(function () {
                            webdriverUtils.waitTillElementVisible(irFilesView.fileViewHeader).then(function () {
                                irFilesView.fileViewHeader.getText().then(function (header) {
                                    expect(header.toLowerCase()).toContain('emptydoc');
                                });
                                fileTree.selectedPages.getText().then(function (selNodes) {
                                    expect(selNodes[0].toLowerCase()).toContain('emptydoc');
                                });
                            });
                        });
                    });

        it('If a user searches for a pageId of a page within a fileType do not have permissions to, they should be presented with error message "You do not have permissions to access the content in the URL lookup"', function () {
            browser.driver.get(browser.params.defaultUrl + '?pageId=216482').then(function () {
                        browser.waitForAngular();
                        expect(irSearchPage.invalidUrlPopup.getText()).toContain('You do not have permissions to access the content in the URL lookup');
            }); //page in file FileWithRepFolder of type RepFile
        });

        it('If a user searches by documentAttributes and match on a doc in a filetype they do not have permissions to, they should be presented with error message "No content matched your given criteria"', function () {
            browser.driver.get(browser.params.defaultUrl + '?documentAttributes=UserName%3D123').then(function () { //Audit doc in FileWithRepFolder
                webdriverUtils.waitTillElementVisible(irSearchPage.invalidUrlPopup).then(function () {
                    expect(irSearchPage.invalidUrlPopup.getText()).toContain('A document was not found matching the given criteria');
                });
            });
        });
        
    }
});