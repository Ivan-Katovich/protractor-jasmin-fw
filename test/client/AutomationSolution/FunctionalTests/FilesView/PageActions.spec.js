exports.tags = ['Browser_Client_Viewer', 'Zoom'];
var recordHeaderElement = require('./../../PageObjects/Containers/RecordHeader.js');
var SearchPage = require('../../PageObjects/SearchPage.js');
var filesview = require('../../PageObjects/FilesView.js');
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var FileTree = require('./../../PageObjects/Containers/FileTree.js');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var searchUtil = require('../../BusinessProcess/Search.js');

var recordHeader = new recordHeaderElement();
var searchPage = new SearchPage();
var navigationBar = new NavigationBar();
var fileTree = new FileTree();
var filesArea = new filesview();

var file = 'PageActions';
var folder1 = 'Folder1';
var document1 = 'F1D1';
var page1 = 'gato.jpg';
var no = 0;

describe('Page actions', function () {

        beforeEach(function () {
            return browser.executeScript('window.localStorage.clear();')
            .then(function () {
                return browser.driver.get(browser.params.defaultUrl);
            })
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return searchUtil.openFile(file);
            })
            .then(function () {
                return filesArea.createIcon.waitReady();
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(folder1, 'folder');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.documentByText(document1));
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(document1, 'document');
            })
            .then(function () {
                return webdriverUtils.waitTillElementVisible(fileTree.pageByText(page1));
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree(page1, 'page');
            })
            .then(function () {
                return browser.sleep(10000);
            });
        });

        function verifyZoomIn(previousValue) {
            return filesArea.zoomInputField.getAttribute('value').then(function (zoomNumericValue) {
                expect(parseInt(zoomNumericValue)).not.toEqual(parseInt(previousValue));
                expect(parseInt(zoomNumericValue)).toBeGreaterThan(parseInt(previousValue));
            });
        }

        function verifyZoomOut(previousValue) {
            filesArea.zoomInputField.getAttribute('value').then(function (zoomNumericValue) {
                expect(parseInt(zoomNumericValue)).not.toEqual(parseInt(previousValue));
                expect(parseInt(zoomNumericValue)).toBeLessThan(parseInt(previousValue));
            });
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        it('1-When the user clicks on zoom-in button,the input value for zoom should increase and same page is still highlighted in filetree', function () {
            return webdriverUtils.waitTillElementVisible(filesArea.zoomInputField)
            .then(function () {
                return filesArea.zoomValue();
            })
            .then(function (value) {
                return filesArea.zoomIn().click().then(function () {
                    return verifyZoomIn(value);
                });
            })
            .then(function () {
                return expect(fileTree.getPageLiByText(page1).getAttribute('class')).toContain('doc-selected');
            });
        });

        it('2-When the user clicks on zoom-out button,the input value for zoom should decrease and same page is still highlighted in filetree', function () {
            return webdriverUtils.waitTillElementVisible(filesArea.zoomInputField)
            .then(function () {
                return filesArea.zoomValue().then(function (value) {
                    return filesArea.zoomOut().click().then(function () {
                        return verifyZoomOut(value);
                    });
                })
                .then(function () {
                    return expect(fileTree.getPageLiByText(page1).getAttribute('class')).toContain('doc-selected');
                });
            });
        });

        it('3-User can enter a zoom value as low as 0', function () {
            return filesArea.zoomInputField.click()
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function(){
                return browser.actions().sendKeys(protractor.Key.CONTROL).sendKeys('a').perform();
            })
            .then(function () {
                return browser.actions().keyDown(protractor.Key.CONTROL).perform()
            })
            .then(function () {
                return filesArea.zoomInputField.sendKeys(no);
            })
            .then(function () {
                return webdriverUtils.pressEnter();
            })
            .then(function () {
                expect(filesArea.zoomValue()).toBe(no.toString());
                expect(fileTree.getPageLiByText(page1).getAttribute('class')).toContain('doc-selected');
            });
        });

        it('4-User can enter a max value of 500', function () {
            var no = 500;
            filesArea.zoomInputField.click().then(function () {
                browser.sleep('500').then(function () {
                    browser.actions().sendKeys(protractor.Key.CONTROL).sendKeys('a').perform().then(function () {
                        browser.actions().keyDown(protractor.Key.CONTROL).perform().then(function () { //un presses ctrl key
                            filesArea.zoomInputField.sendKeys(no).then(function () {
                                webdriverUtils.pressEnter().then(function () {
                                    recordHeader.fileNumberRecordHeader.click().then(function () {
                                        expect(fileTree.getPageLiByText(page1).getAttribute('class')).toContain('doc-selected');
                                        expect(filesArea.zoomValue()).toBe(no.toString());
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it('5-User can enter a value between 0 and 500', function () {
            var no = 250;
            filesArea.zoomInputField.click().then(function () {
                browser.sleep('500').then(function () {
                    browser.actions().sendKeys(protractor.Key.CONTROL).sendKeys('a').perform().then(function () {
                        browser.actions().keyDown(protractor.Key.CONTROL).perform().then(function () { //un presses ctrl key
                            filesArea.zoomInputField.sendKeys(no).then(function () {
                                webdriverUtils.pressTab().then(function () {
                                    recordHeader.fileNumberRecordHeader.click().then(function () {
                                        expect(filesArea.zoomValue()).toBe(no.toString());
                                        expect(fileTree.getPageLiByText(page1).getAttribute('class')).toContain('doc-selected');
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    
        it('6-When the user enters a valid zoom value(between 0 to 500) and clicks somewhere outside(blurs),zoom input field should contain that number', function () {
            var no = getRandomInt(1, 500);
            //select all the text in zoom value
            filesArea.zoomInputField.click().then(function () {
                browser.sleep('500').then(function () {
                    browser.actions().sendKeys(protractor.Key.CONTROL).sendKeys('a').perform().then(function () {
                        browser.actions().keyDown(protractor.Key.CONTROL).perform().then(function () { //un presses ctrl key
                            filesArea.zoomInputField.sendKeys(no).then(function () {
                                recordHeader.fileNumberRecordHeader.click().then(function () {
                                    expect(filesArea.zoomValue()).toBe(no.toString());
                                });
                            });
                            //verify that same page is highlighted in tree
                            expect(fileTree.getPageLiByText(page1).getAttribute('class')).toContain('doc-selected');
                        });
                    });
                });
            });
        });

        it('7-If user enters 28 in zoom numeric field and after that he enters 29 in that field,he should be able to see 29 in the zoom numeric field[added this scenario to verify rounding problems of Javascript]', function () {
            var no = 28;
            var no2 = 29;

            filesArea.zoomInputField.click().then(function () {
                browser.sleep('500').then(function () {
                    browser.actions().sendKeys(protractor.Key.CONTROL).sendKeys('a').perform().then(function () {
                        browser.actions().keyDown(protractor.Key.CONTROL).perform().then(function () { //un presses ctrl key
                            filesArea.zoomInputField.sendKeys(no).then(function () {
                                webdriverUtils.pressTab().then(function () {
                                    expect(filesArea.zoomValue()).toBe(no.toString());
                                    filesArea.zoomInputField.click().then(function () {
                                        browser.sleep('500').then(function () {
                                            browser.actions().sendKeys(protractor.Key.CONTROL).sendKeys('a').perform().then(function () {
                                                browser.actions().keyDown(protractor.Key.CONTROL).perform().then(function () { //un presses ctrl key
                                                    filesArea.zoomInputField.sendKeys(no2).then(function () {
                                                        webdriverUtils.pressTab().then(function () {
                                                            recordHeader.fileNumberRecordHeader.click().then(function () {
                                                                expect(filesArea.zoomValue()).toBe(no2.toString());
                                                                expect(fileTree.getPageLiByText(page1).getAttribute('class')).toContain('doc-selected');
                                                                //expect(fileTree.fileTreeNodeHighlighted(2)).toContain('doc-selected');
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

        it('8-If a user enters any numeric value greater than 500 or less than 0,zoom numeric field will accept that value but it will show that as an invalid number', function () {
            var overMax = 10000;
            var underMin = -10;
            filesArea.zoomInputField.click().then(function () {
                browser.sleep('500').then(function () {
                    browser.actions().sendKeys(protractor.Key.CONTROL).sendKeys('a').perform().then(function () {
                        browser.actions().keyDown(protractor.Key.CONTROL).perform().then(function () { //un presses ctrl key
                            filesArea.zoomInputField.sendKeys(overMax).then(function () {
                                webdriverUtils.pressTab().then(function () {
                                    expect(filesArea.zoomValue()).toBe(overMax.toString());
                                    expect(filesArea.zoomInputField.getAttribute('class')).toContain('ng-invalid');
                                    expect(filesArea.zoomInputField.getAttribute('class')).toContain('ng-invalid-max');

                                    filesArea.zoomInputField.click().then(function () {
                                        browser.sleep('500').then(function () {
                                            browser.actions().sendKeys(protractor.Key.CONTROL).sendKeys('a').perform().then(function () {
                                                browser.actions().keyDown(protractor.Key.CONTROL).perform().then(function () { //un presses ctrl key
                                                    filesArea.zoomInputField.sendKeys(underMin).then(function () {
                                                        webdriverUtils.pressTab().then(function () {
                                                            recordHeader.fileNumberRecordHeader.click().then(function () {
                                                                expect(filesArea.zoomValue()).toBe(underMin.toString());
                                                                filesArea.zoomInputField.getAttribute('class').then(function (invalid) {
                                                                    expect(invalid).toContain('ng-invalid');
                                                                    expect(fileTree.getPageLiByText(page1).getAttribute('class')).toContain('doc-selected');
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

        it('9-When a user opens a page with a single frame, it should be opened as a thumbnail with zoom buttons enabled',
            function() {
                var driver = browser.driver;
                var thumbnailWidth = 'width: 640px;';
                browser.sleep(5000)
                    .then(function() {

                        browser.switchTo()
                            .frame(driver.findElement(protractor.By.css('iframe')))
                            .then(function() {
                                driver.findElement(protractor.By.css('.lt-imageviewer-maindiv div'))
                                    .then(function(element) {
                                        element.getAttribute("style")
                                            .then(function(style) {
                                                expect(style).toContain(thumbnailWidth);
                                                browser.switchTo().defaultContent();
                                            });
                                    });
                            });
                    });
            });
    
});