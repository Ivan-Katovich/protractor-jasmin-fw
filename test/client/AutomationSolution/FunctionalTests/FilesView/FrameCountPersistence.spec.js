exports.tags = ['File_Navigation', 'File_Navigation'];
var recordHeaderElement = require('./../../PageObjects/Containers/RecordHeader.js');
var SearchPage = require('../../PageObjects/SearchPage.js');
var filesview = require('../../PageObjects/FilesView.js');
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var OpenFilesDropdown = require('./../../PageObjects/LeftRail/OpenFilesDropdown.js');
var FileTree = require('./../../PageObjects/Containers/FileTree.js');
var LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

//Making objects of the included pages
var recordHeader = new recordHeaderElement();
var searchPage = new SearchPage();
var navigationBar = new NavigationBar();
var fileTree = new FileTree();
var filesArea = new filesview();
var openFilesDropdown = new OpenFilesDropdown();
var leftRailBar = new LeftRailBar();

var file = 'FrameCountPersistence';
var folder1 = 'Folder1';
var document1 = 'F1D1';


    describe('Multi frame navigation - frame count persistence', function () {

        function navigateToFrame(frameNo) {
            //  filesArea.frameInputField.clear();
            webdriverUtils.waitTillElementPresent(filesArea.frameInputField).then(function () {
                filesArea.frameInputField.click().then(function () {
                    browser.sleep('500').then(function () {
                        filesArea.frameInputField.clear().then(function() {
                            //      browser.actions().sendKeys(protractor.Key.CONTROL).sendKeys('a').perform().then(function () {
                            //        browser.actions().keyDown(protractor.Key.CONTROL).perform().then(function () { //un presses ctrl key
                            filesArea.frameInputField.sendKeys(frameNo).then(function () {
                                webdriverUtils.pressEnter();
                            });
                        });
                    });
                });
            });
            //     });
        }

        function isNodePresent(nodeText, nodeType) {
            switch (nodeType) {
                case 'folder':
                    return fileTree.folderByText(nodeText).isDisplayed();
                default:
                    return fileTree.documentByText(nodeText).isDisplayed();
            }
        }

        function navigateTo(folderName, subDocName) {
            return webdriverUtils.showNodeChildrenByText(folderName, 'folder').then(function () {
                webdriverUtils.waitTillElementVisible(fileTree.documentByText(subDocName)).then(function () {
                    webdriverUtils.showNodeChildrenByText(subDocName, 'document').then(function () {
                        webdriverUtils.clickOnNodeInFileTree(subDocName, 'document').then(function() {
                            webdriverUtils.waitTillElementVisible(fileTree.page(0));
                        });
                    });
                });
            });
        }

        function clickBack(howManyLevelUp) {
            for (var i = 0; i < howManyLevelUp; i++) {
                webdriverUtils.waitTillElementVisible(fileTree.backButton).then(function () {
                    fileTree.backButton.click();
                });
            }
        }

        function moveBackToPage(pageName) {
            webdriverUtils.clickOnElement(fileTree.documentByText(pageName));
        }

        function moveBackToFolder(folderName) {
            webdriverUtils.showNodeChildrenByText(folderName, 'folder').then(function () {
                webdriverUtils.clickOnNodeInFileTree(folderName, 'folder');
            });
        }

        function verifyFrameCount(expectedVal) {
            filesArea.frameInputField.getAttribute('value').then(function (actualFrameNo) {
                expect(expectedVal).toBe(actualFrameNo);
            });
        }

        function openAFile(fileNumber) {
            searchPage.fileNumberSearchBox.clear().then(function () {
                searchPage.fileNumberSearchBox.sendKeys(fileNumber).then(function () {
                    searchPage.searchButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(fileTree.fileTreeSymbol);
                    });
                });
            });
        }

        beforeEach(function () {
            browser.driver.get(browser.params.defaultUrl).then(function () {
                webdriverUtils.waitTillElementVisible(navigationBar.searchIcon).then(function () {
                    navigationBar.searchIcon.click().then(function () {
                        webdriverUtils.waitTillElementVisible(searchPage.fileNumberSearchBox).then(function () {
                            openAFile(file);
                        });
                    });
                });
            });
        });

        it('When I a page and navigate to frame(frame no 3 in this case) in multiframe image(tiff in this case) and I move back to document view and return to the Page A, it should show the frame no 3', function () {
            navigateTo(folder1, document1).then(function() {
                webdriverUtils.clickOnNodeInFileTree('tiff', 'page').then(function() {
                    //select frame no. 3
                    //  browser.sleep(2000);
                    navigateToFrame(3);
                    //move back to different document's page B
                    browser.sleep(1000).then(function() {
                        webdriverUtils.clickOnNodeInFileTree(document1, 'document').then(function() {
                            //return to page A
                            browser.sleep(1000).then(function() {           
                                webdriverUtils.clickOnNodeInFileTree('tiff', 'page').then(function() {
                                    //check the frame no.---it should be 3
                                    browser.sleep(2000).then(function() {
                                        verifyFrameCount('3');
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it('When I select IR page A from file A and  navigate to frame in multiframe image and I move to another file and If I return to page A of file A, it should show frame no 4.', function () {
            navigateTo(folder1, document1).then(function () {
                webdriverUtils.clickOnNodeInFileTree('tiff', 'page').then(function () {
                    browser.sleep(2000).then(function () {
                        navigateToFrame(4);
                        browser.sleep(1000).then(function () {
                            webdriverUtils.waitTillElementVisible(navigationBar.searchIcon).then(function () {
                                navigationBar.searchIcon.click().then(function () {
                                    webdriverUtils.waitTillElementVisible(searchPage.clearResultsButton).then(function () {
                                        searchPage.clearResultsButton.click().then(function () {
                                            webdriverUtils.waitTillElementVisible(searchPage.clearCriteriaButton).then(function () {
                                                searchPage.clearCriteriaButton.click().then(function () {
                                                    openAFile("PageActions");
                                                    browser.sleep(1000).then(function () {
                                                        webdriverUtils.waitTillElementVisible(leftRailBar.openFilesDropdown).then(function () {
                                                            leftRailBar.openFilesDropdown.click().then(function () {
                                                                //select antoher file no=>2
                                                                webdriverUtils.clickOnElement(openFilesDropdown.openFileRecord(1)).then(function () {
                                                                    webdriverUtils.waitTillElementPresent(filesArea.frameInputField).then(function () {
                                                                        webdriverUtils.waitTillElementVisible(filesArea.frameInputField).then(function () {
                                                                            //check the frame no.---it should be 4
                                                                            verifyFrameCount('4');
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        
        it('When navigate to frame no. 3 of multi-page image(tiff in this case) and close the file tree and re-open filetree, it should show the frame no. 3', function () {
            navigateTo(folder1, document1).then(function () {
                webdriverUtils.clickOnNodeInFileTree('tiff', 'page').then(function () {
                    webdriverUtils.waitTillElementPresent(filesArea.frameInputField).then(function () {
                        navigateToFrame(2);
                        //close the file tree
                        fileTree.fileTreeSymbol.click().then(function () {
                            //re-open the file tree
                            fileTree.fileTreeSymbol.click().then(function () {
                                //check the frame no.---it should be  2
                                verifyFrameCount('2');
                            });
                        });
                    });
                });
            });
        });  
    });
