exports.tags = ['Browser_Client_Viewer', 'Annotations'];

var recordHeaderElement = require('./../../PageObjects/Containers/RecordHeader.js');
var searchPage = require('../../PageObjects/SearchPage.js');
var filesview = require('../../PageObjects/FilesView.js');
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var FileTree = require('../../PageObjects/Containers/FileTree.js');

var fileTree = new FileTree();
var recordHeader = new recordHeaderElement();
var searchPage = new searchPage();
var navigationBar = new NavigationBar();
var filesArea = new filesview();


describe('Annotations', function () {

        beforeEach(function () {
            browser.driver.get(browser.params.defaultUrl).then(function(){
                webdriverUtils.waitTillElementVisible(navigationBar.searchIcon).then(function(){
                    navigationBar.searchIcon.click().then(function(){
                        webdriverUtils.waitTillElementVisible(searchPage.fileNumberSearchBox).then(function(){
                            searchPage.fileNumberSearchBox.sendKeys('Annotations').then(function () {
                                searchPage.searchButton.click().then(function () {
                                    webdriverUtils.waitTillElementVisible(recordHeader.fileNumberRecordHeader).then(function(){
                                        webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function(){
                                            webdriverUtils.showNodeChildrenByText('Folder1', 'folder');
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        //This function verifies that annotation icons should be displayed or not based on given parameters
        function verifyAnnotationToolIconDisplay(iconName, expectedDisplay) {
            //find the element by provided Id as per the given parameter
            filesArea.annotationIcon(iconName).isDisplayed().then(function (toolIconDisplayed) {
                switch (expectedDisplay) {
                    case 'true':
                        var flag1 = iconName + ' is not displayed';
                        if (toolIconDisplayed) {
                            flag1 = iconName + ' is displayed as expected';
                        }
                        expect(iconName + ' is displayed as expected').toBe(flag1);
                        break;
                    case 'false':
                        var flag = iconName + ' is not displayed as expected';
                        if (toolIconDisplayed) {
                            flag = iconName + ' is displayed';
                        }
                        expect(iconName + ' is not displayed as expected').toBe(flag);
                        break;
                    default:
                        console.log('wrong second argument in the verifyIconDisplay function');
                        break;
                }
            });
        }//function completed

        it('When a user clicks on annotation button first time, he should see the annotation button showing ON mode and if he clicks again, he should see annotation button showing OFF(Just checking the class of the button to verify the style)', function () {
            webdriverUtils.waitTillElementVisible(fileTree.documentByText('F1D1')).then(function () {
                webdriverUtils.showNodeChildrenByText('F1D1', 'document').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.pageByText('cat.jpg')).then(function () {
                        webdriverUtils.clickOnNodeInFileTree('cat.jpg', 'page').then(function () {
                            webdriverUtils.waitTillElementVisible(filesArea.editAnnotationIcon).then(function () {
                                expect(filesArea.editAnnotationIconButton.getAttribute('class')).not.toContain('toggled-annotation');
                                browser.sleep(1000).then(function () {
                                    webdriverUtils.clickOnElement(filesArea.editAnnotationIcon).then(function () {
                                        browser.sleep(1000).then(function () {
                                            expect(filesArea.editAnnotationIconButton.getAttribute('class')).toContain('toggled-annotation');
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it('By default on landing on a frame, annotation toolbar icons should not be displayed', function () {
            webdriverUtils.waitTillElementVisible(fileTree.documentByText('F1D1')).then(function () {
                webdriverUtils.showNodeChildrenByText('F1D1', 'document').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.pageByText('cat.jpg')).then(function () {
                        webdriverUtils.clickOnNodeInFileTree('cat.jpg', 'page').then(function () {
                            webdriverUtils.waitTillElementVisible(filesArea.iframeInFilesView).then(function () {
                                //navigate to the first available iframe
                                browser.switchTo().frame(0).then(function () {
                                    //make sure that stampTool Icon should not be displayed
                                    verifyAnnotationToolIconDisplay('stampTool', 'false');
                                    //make sure that textTool Icon should not be displayed
                                    verifyAnnotationToolIconDisplay('textTool', 'false');
                                    //make sure that stickyNoteTool Icon should not be displayed
                                    verifyAnnotationToolIconDisplay('stickyNoteTool', 'false');
                                    //make sure that lineTool Icon should not be displayed
                                    verifyAnnotationToolIconDisplay('lineTool', 'false');
                                    //make sure that highlighter Icon should not be displayed
                                    verifyAnnotationToolIconDisplay('highlighter', 'false');
                                    //make sure that rotateLeftBtn Icon should not be displayed
                                    verifyAnnotationToolIconDisplay('rotateLeftBtn', 'false');
                                    //make sure that rotateRightBtn Icon should not be displayed
                                    verifyAnnotationToolIconDisplay('rotateRightBtn', 'false');
                                    //make sure that deleteAnnotation Icon should not be displayed
                                    verifyAnnotationToolIconDisplay('deleteAnnotation', 'false');
                                });
                            });
                        });
                    });
                });
            });
        });

        it('When user clicks on edit button first time, annotation toolbar with valid icons should be displayed', function () {
            webdriverUtils.waitTillElementVisible(fileTree.documentByText('F1D1')).then(function () {
                webdriverUtils.showNodeChildrenByText('F1D1', 'document').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.pageByText('cat.jpg')).then(function () {
                        webdriverUtils.clickOnNodeInFileTree('cat.jpg', 'page').then(function () {
                            webdriverUtils.waitTillElementVisible(filesArea.editAnnotationIcon).then(function() {
                                filesArea.editAnnotationIcon.click().then(function () {
                                    webdriverUtils.waitTillElementVisible(filesArea.iframeInFilesView).then(function () {
                                        browser.sleep(5000);
                                        //navigate to the first available iframe ------------since icons are inside iframe
                                        browser.switchTo().frame(0).then(function () {

                                            //make sure that stampTool Icon should  be displayed
                                            browser.sleep(1000);
                                            verifyAnnotationToolIconDisplay('stampTool', 'true');
                                            //make sure that textTool Icon should  be displayed
                                            browser.sleep(1000);
                                            verifyAnnotationToolIconDisplay('textTool', 'true');
                                            //make sure that stickyNoteTool Icon should  be displayed
                                            browser.sleep(1000);
                                            verifyAnnotationToolIconDisplay('stickyNoteTool', 'true');
                                            //make sure that lineTool Icon should  be displayed
                                            browser.sleep(1000);
                                            verifyAnnotationToolIconDisplay('lineTool', 'true');
                                            //make sure that highlighter Icon should  be displayed
                                            browser.sleep(1000);
                                            verifyAnnotationToolIconDisplay('highlighter', 'true');
                                            //make sure that rotateLeftBtn Icon should  be displayed
                                            browser.sleep(1000);
                                            verifyAnnotationToolIconDisplay('rotateLeftBtn', 'true');
                                            //make sure that rotateRightBtn Icon should  be displayed
                                            browser.sleep(1000);
                                            verifyAnnotationToolIconDisplay('rotateRightBtn', 'true');
                                            //make sure that deleteAnnotation Icon should  be displayed
                                            browser.sleep(1000);
                                            verifyAnnotationToolIconDisplay('deleteAnnotation', 'true');
                                        });
                                    });
                                });
                            });
                        });
                    })
                });
            });
        });

        it('Custom stamp annotation dropdown should be scrollable', function () {
            webdriverUtils.waitTillElementVisible(fileTree.documentByText('F1D1')).then(function () {
                webdriverUtils.showNodeChildrenByText('F1D1', 'document').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.pageByText('cat.jpg')).then(function () {
                        webdriverUtils.clickOnNodeInFileTree('cat.jpg', 'page').then(function () {
                            webdriverUtils.waitTillElementVisible(filesArea.editAnnotationIcon).then(function () {
                                filesArea.editAnnotationIcon.click().then(function () {
                                    browser.sleep(1000);
                                    webdriverUtils.waitTillElementVisible(filesArea.iframeInFilesView).then(function () {
                                        browser.waitForAngular().then(function () {
                                            browser.switchTo().frame(0).then(function () {
                                                filesArea.annotationIcon('stampTool').click().then(function () {
                                                    browser.sleep(1000);
                                                    filesArea.customStampScrollability().then(function (scrollable) {
                                                        expect(scrollable).toBe(true);
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


        it('When a user lands on a frame where there is a supported file types in this case jpg ,it should show edit annotation icon ', function () {
            webdriverUtils.waitTillElementVisible(fileTree.documentByText('F1D1')).then(function () {
                webdriverUtils.showNodeChildrenByText('F1D1', 'document').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.pageByText('cat.jpg')).then(function () {
                        webdriverUtils.clickOnNodeInFileTree('cat.jpg', 'page').then(function () {
                            filesArea.editAnnotationIcon.isDisplayed().then(function (pensilIconVisible) {
                                expect(pensilIconVisible).toBe(true);
                            });
                        });
                    });
                });
            });
        });

        it('When a user lands on a frame where there is an unsupported file types in this case(.exe),it should not show edit annotation icon', function () {
            webdriverUtils.waitTillElementVisible(fileTree.documentByText('F1D1')).then(function () {
                webdriverUtils.showNodeChildrenByText('F1D1', 'document').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.pageByText('exe.exe')).then(function () {
                        webdriverUtils.clickOnNodeInFileTree('exe.exe', 'page').then(function () {
                            filesArea.editAnnotationIcon.isDisplayed().then(function (pensilIconVisible) {
                                expect(pensilIconVisible).toBe(false);
                            });
                        });
                    });
                });
            });
        });

        it('Annotation icons(Text stamp,Arrow,highlighter,Rotate left and right,Save Annotations button) should contain valid tooltips properties so that when user hovers on them it shows that tooltip', function () {
            webdriverUtils.waitTillElementVisible(fileTree.documentByText('F1D1')).then(function () {
                webdriverUtils.showNodeChildrenByText('F1D1', 'document').then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.pageByText('cat.jpg')).then(function () {
                        webdriverUtils.clickOnNodeInFileTree('cat.jpg', 'page').then(function () {
                            filesArea.editAnnotationIcon.click().then(function () {
                                browser.sleep(1500).then(function () {
                                    //navigate to the first available iframe ------------since icons are inside iframe
                                    browser.switchTo().frame(0).then(function () {
                                        //check the tooltip property for text stamp
                                        filesArea.annotationIcon('stampTool').getAttribute('title').then(function (tooltip) {
                                            expect(tooltip).toBe('Text Stamp');
                                        });
                                        //check the tooltip property for arrow
                                        filesArea.annotationIcon('lineTool').getAttribute('title').then(function (tooltip) {
                                            expect(tooltip).toBe('Arrow');
                                        });
                                        //check the tooltip property for highlighter
                                        filesArea.annotationIcon('highlighter').getAttribute('title').then(function (tooltip) {
                                            expect(tooltip).toBe('Highlighter');
                                        });
                                        //check the tooltip property for Rotate Left
                                        filesArea.annotationIcon('rotateLeftBtn').getAttribute('title').then(function (tooltip) {
                                            expect(tooltip).toBe('Rotate Left');
                                        });
                                        //check the tooltip property for Rotate Right
                                        filesArea.annotationIcon('rotateRightBtn').getAttribute('title').then(function (tooltip) {
                                            expect(tooltip).toBe('Rotate Right');
                                        });
                                        //check the tooltip property for Save Annotations button
                                        filesArea.annotationIcon('saveBtn').getAttribute('title').then(function (tooltip) {
                                            expect(tooltip).toBe('Save Annotations');
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