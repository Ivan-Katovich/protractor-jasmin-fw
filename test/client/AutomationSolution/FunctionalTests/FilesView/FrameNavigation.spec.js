exports.tags = ['File_Navigation', 'File_Navigation'];
var recordHeaderElement = require('./../../PageObjects/Containers/RecordHeader.js');
var SearchPage = require('../../PageObjects/SearchPage.js');
var filesview = require('../../PageObjects/FilesView.js');
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var FileTree = require('./../../PageObjects/Containers/FileTree.js');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var recordHeader = new recordHeaderElement();
var searchPage = new SearchPage();
var navigationBar = new NavigationBar();
var fileTree = new FileTree();
var filesArea = new filesview();

var file = 'FrameNavigation';
var folder1 = 'Folder1';
var document1 = 'F1D1';
var page1 = 'tif.tif';

describe('ImageRight frame navigation', function () {


        beforeEach(function () {
            browser.driver.get(browser.params.defaultUrl).then(function () {
                webdriverUtils.waitTillElementVisible(navigationBar.searchIcon).then(function () {
                    navigationBar.searchIcon.click().then(function () {
                        webdriverUtils.waitTillElementVisible(searchPage.fileNumberSearchBox).then(function () {
                            searchPage.fileNumberSearchBox.sendKeys(file).then(function () {
                                searchPage.searchButton.click().then(function () {
                                    webdriverUtils.waitTillElementVisible(fileTree.fileTreeSymbol).then(function () {
                                        webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                                            webdriverUtils.showNodeChildrenByText(folder1, 'folder').then(function () {
                                                webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1)).then(function () {
                                                    webdriverUtils.showNodeChildrenByText(document1, 'document').then(function () {
                                                        webdriverUtils.waitTillElementVisible(fileTree.pageByText(page1)).then(function () {
                                                            webdriverUtils.clickOnNodeInFileTree(page1, 'page').then(function () {
                                                                browser.sleep(500);
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

        //type in frame field 
        function typeInFrameField(text) {
            //select all the text in page input value
            filesArea.frameInputField.clear().then(function () {
                //now type in the new value
                filesArea.frameInputField.sendKeys(text).then(function () {
                    return 0;
                });
            });
        }

        //press tab keys given number of times
        function pressTabKey(numberOfTimes) {
            for (var i = 1; i <= numberOfTimes; i++) {
                //press tab key
                webdriverUtils.pressTab();
                browser.sleep(1000);
            }
        }

        //press ENTER keys given number of times
        function pressEnterKey(numberOfTimes) {
            for (var i = 1; i <= numberOfTimes; i++) {
                //press ENTER key
                browser.actions().sendKeys(protractor.Key.ENTER).perform();
                browser.sleep(1000);
            }
        }

        //click outside given number of times
        function clickSomewhereOutside(numberOfTimes) {
            for (var i = 1; i <= numberOfTimes; i++) {
                //click outside
                recordHeader.fileNumberRecordHeader.click();
                browser.sleep(1000);
            }
        }

        function getRandomInt(min, max) {
            max = typeof max !== 'undefined' ? max : 99999999;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        it('Typing a valid frame number and press Enter	Web Client navigated to correct multipage tiff number and the page remains highlighted in the file tree', function () {
            webdriverUtils.waitTillElementVisible(filesArea.pageNumberInput).then(function () {
                expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
                filesArea.numberOfFrames().then(function (obj) {

                    var i = obj.indexOf('Frames');
                    var frameNo = getRandomInt(1, obj.substring(3, i - 1));
                    typeInFrameField(frameNo);
                    pressEnterKey(1);
                    browser.sleep(1000);
                    filesArea.frameInputField.getAttribute('value').then(function (actualVal) {
                        expect(parseInt(actualVal)).toBe(frameNo);
                        expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
                    });
                });
            });
        });

        it('Type a valid frame number and press TAB,Web Client navigated to correct multipage tiff number and the page remains highlighted in the file tree', function () {
            webdriverUtils.waitTillElementVisible(filesArea.pageNumberInput);
            expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
            filesArea.numberOfFrames().then(function (obj) {

                var i = obj.indexOf('Frames');
                var frameNo = getRandomInt(1, obj.substring(3, i - 1));
                typeInFrameField(frameNo);
                pressTabKey(1);
                browser.sleep(1000);
                filesArea.frameInputField.getAttribute('value').then(function (actualVal) {
                    expect(parseInt(actualVal)).toBe(frameNo);
                    expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
                });
            });
        });

        it('Press Tab again multiple time without typing new frame number	web client should not navigate to a new page and the page remains highlighted in the file tree', function () {
            webdriverUtils.waitTillElementVisible(filesArea.pageNumberInput);
            expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
            browser.sleep(1000);
            filesArea.frameInputField.getAttribute('value').then(function (previousVal) {
                pressTabKey(5);
                browser.sleep(1000);
                filesArea.frameInputField.getAttribute('value').then(function (newVal) {
                    expect(previousVal).toBe(newVal);
                    expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
                });
            });
        });

        it('Type a valid frame number and click anywhere outside the box	Web Client navigated to correct multipage tiff number and the page remains highlighted in the file tree', function () {
            webdriverUtils.waitTillElementVisible(filesArea.pageNumberInput);
            expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
            filesArea.numberOfFrames().then(function (obj) {
                var i = obj.indexOf('Frames');
                var frameNo = getRandomInt(1, obj.substring(3, i - 1));
                typeInFrameField(frameNo);
                clickSomewhereOutside(1);
                browser.sleep(1000);
                filesArea.frameInputField.getAttribute('value').then(function (actualVal) {
                    expect(parseInt(actualVal)).toBe(frameNo);
                    expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
                });

            });
        });

        it('Type a valid frame number and click edit	The multipage tiff should be navigated to the new frame number and the frame number control box should disappear from the bar. The page remains highlighted in the file tree', function () {
            webdriverUtils.waitTillElementVisible(filesArea.pageNumberInput).then(function () {
                expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
                filesArea.numberOfFrames().then(function (obj) {
                    var i = obj.indexOf('Frames');
                    var frameNo = getRandomInt(1, obj.substring(3, i - 1));
                    typeInFrameField(frameNo);
                    pressTabKey(1);
                    filesArea.frameInputField.getAttribute('value').then(function (newVal) {
                        expect(parseInt(newVal)).toBe(frameNo);
                        filesArea.editAnnotationIcon.click().then(function () {
                            browser.sleep(5000);
                            expect(filesArea.frameInputField.isPresent()).toBe(false);
                            expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
                        });
                    });
                });
            });
        });


        it('Type an ivalide frame numbers (for example, a frame number larger than total number of frames)	Web Client should remain at the current frame and the page is highlighted in the file tree', function () {
            webdriverUtils.waitTillElementVisible(filesArea.pageNumberInput);
            expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
            filesArea.numberOfFrames().then(function (obj) {
                var i = obj.indexOf('Frames');
                var invalidMaxframeNo = getRandomInt(obj.substring(3, i - 1) + 1, 999999), invalidMinFrameNo = 0;
                typeInFrameField(invalidMaxframeNo);
                pressTabKey(1);
                expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
                typeInFrameField(invalidMinFrameNo);
                pressTabKey(1);
                expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
            });
        });

        it('Type negative numbers and alpha numeric characters	Web Client should remain at the current frame and the page is highlighted in the file tree', function () {
            webdriverUtils.waitTillElementVisible(filesArea.pageNumberInput);
            expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
            filesArea.numberOfFrames().then(function (obj) {
                var i = obj.indexOf('Frames');
                var invalidNegativeframeNo = -50, nonNumericVal = 'xyz123!~@#';
                typeInFrameField(invalidNegativeframeNo);
                pressTabKey(1);
                expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
                typeInFrameField(nonNumericVal);
                pressTabKey(1);
                expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
            });
        });
    
});