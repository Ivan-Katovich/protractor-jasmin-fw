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

var file = 'MultiFrameDocumentViewer';
var folder1 = 'Folder1';
var tiffDocument = 'F1D1 Tiff';
var tiffPage = '1: tiff.tiff';
var jpegDocument = 'F1D2 jpg';
var jpegPage = '1: jpg.jpg';
var pdfDocument = 'F1D3 pdf';
var pdfPage = '1: pdf.pdf';

describe('Multi-Frame Document Viewer', function () {

        beforeEach(function () {
            browser.driver.get(browser.params.defaultUrl).then(function () {
                webdriverUtils.waitTillElementVisible(navigationBar.searchIcon).then(function () {
                    navigationBar.searchIcon.click().then(function () {
                        webdriverUtils.waitTillElementVisible(searchPage.fileNumberSearchBox).then(function () {
                            searchPage.fileNumberSearchBox.sendKeys(file).then(function () {
                                searchPage.searchButton.click().then(function () {
                                    webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                                        webdriverUtils.showNodeChildrenByText(folder1, 'folder');
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        function verifyFileActionsBar(fileTreeLevel) {
            browser.sleep(500);
            switch (fileTreeLevel) {
                case 'document':
                    filesArea.fileViewActions.then(function (fileActionsIcons) {
                        expect(fileActionsIcons.length).toBe(7);
                    });
                    var expected = ['fa-envelope', 'fa-arrow-circle-down', ' fa-print', 'fa-add-document', 'fa-share-square-o', 'fa-files-o'];
                    var actions = filesArea.fileViewActions.map(function (action) {
                        return action.getAttribute('class');
                    });

                    actions.then(function (actual) {
                        for (var i = 0; i < expected.length; i++) {
                            //if the expected value does not exist in actual, than test will fail
                            expect(actual[i].indexOf(expected[i])).not.toBe(-1);
                        }
                    });
                    break;
                default:
                    filesArea.fileViewActions.then(function (fileActions) {
                        expect(fileActions.length).toBe(0);
                    });
                    break;
            } //switch block completed

        }

        function navigateTo(documentName, pageName){
            return webdriverUtils.showNodeChildrenByText(documentName, 'document').then(function () {
                webdriverUtils.waitTillElementVisible(fileTree.pageByText(pageName)).then(function () {
                    webdriverUtils.clickOnNodeInFileTree(pageName, 'page');
                });
            });
        }

        it('If a user is in 3 columns thumbnail view, the 3 column thumbnail button should have active class to show that 3 columns are in focus', function () {
            //Navigate to multi-frame image
            navigateTo(tiffDocument, tiffPage).then(function () {
                webdriverUtils.waitTillElementVisible(filesArea.thumNailViewButton).then(function () {
                    filesArea.thumNailViewButton.click().then(function () {
                        browser.waitForAngular();
                        expect(filesArea.thumNailViewButton.getAttribute('class')).toContain('active');
                        expect(filesArea.singleColumnViewButton.getAttribute('class')).not.toContain('active');
                    });
                });
            });
        });//it block completed

        it('If a user is in 1 column thumbnail view, the 1 column thumbnail button should have active class to show that 1 columns are in focus', function () {
            //Navigate to multi-frame image
            navigateTo(tiffDocument, tiffPage).then(function () {
                webdriverUtils.waitTillElementVisible(filesArea.singleColumnViewButton).then(function () {
                    filesArea.singleColumnViewButton.click().then(function () {
                        browser.waitForAngular();
                        expect(filesArea.thumNailViewButton.getAttribute('class')).not.toContain('active');
                        expect(filesArea.singleColumnViewButton.getAttribute('class')).toContain('active');
                    });
                });
            });
        });//it block completed

        //verification done eslewhere

        /*
         it('File actions bar should display  email,download,print and append icons even if  a user is in focused frame mode', function() {
         //Navigate to document level
         clickOn('TIFF', 'tiff');
         browser.sleep(1000);

         filesArea.thumNailViewButton.click();
         filesArea.framesInThumNailView.then(function (frameImages) {
         frameImages[0].click().then(function () {
         verifyFileActionsBar('document');
         });
         });
         });//it block completed

         it('File actions bar should display  email,download,print and append icons even if  a user is in single column thumbnail view mode', function() {
         //Navigate to document level
         clickOn('TIFF', 'tiff');
         browser.sleep(1000);

         filesArea.singleColumnViewButton.click().then(function() {
         verifyFileActionsBar('document');
         });
         });//it block completed

         it('File actions bar should display  email,download,print and append icons even if  a user is in 3 column thumbnail view mode', function() {
         //Navigate to document level
         clickOn('TIFF', 'tiff');
         browser.sleep(1000);

         filesArea.thumNailViewButton.click();
         verifyFileActionsBar('document');
         });//it block completed
         */
        it('If a user is in focused frame view, zoom-in,zoom-out and zoomiinput field should be enabled and buttons should not be greyed-out', function () {
            //Navigate to multi-frame image
            navigateTo(tiffDocument, tiffPage).then(function () {
                webdriverUtils.waitTillElementVisible(filesArea.thumNailViewButton).then(function () {
                    filesArea.thumNailViewButton.click().then(function () {
                        browser.waitForAngular();
                        filesArea.framesInThumNailView.then(function (frameImages) {
                            frameImages[0].click().then(function () {
                                //now I am in focused frame view--so zoom-in and zoom-out button should be disabled
                                expect(filesArea.zoomControllerElement.getAttribute('class')).not.toContain('icon-disabled');
                                expect(filesArea.zoomInButtonElement.getAttribute('disabled')).toBe(null);
                                //zoom-out button
                                expect(filesArea.zoomOutButtonElement.getAttribute('disabled')).toBe(null);
                                //check zoom input field value
                                expect(filesArea.zoomInputField.getAttribute('disabled')).toBe(null);
                            });
                        });
                    });
                });
            });
        });//it block completed

        it('If a user is in single column thumbnail view, zoom-in,zoom-out and zoomiinput field should be disabled and buttons should be greyed-out', function () {
            //Navigate to multi-frame image
            navigateTo(tiffDocument, tiffPage).then(function () {
                webdriverUtils.waitTillElementVisible(filesArea.singleColumnViewButton).then(function () {
                    //click on single column button to go to the
                    filesArea.singleColumnViewButton.click().then(function () {
                        //now I am in focused frame view--so zoom-in and zoom-out button should be disabled
                        expect(filesArea.zoomControllerElement.getAttribute('class')).toContain('icon-disabled');
                        expect(filesArea.zoomInButtonElement.getAttribute('disabled')).toBe('true');
                        //zoom-out button
                        expect(filesArea.zoomOutButtonElement.getAttribute('disabled')).toBe('true');
                        //check zoom input field value
                        expect(filesArea.zoomInputField.getAttribute('disabled')).toBe('true');
                    });
                });
            });
        });//it block completed

        it('If a user is in multicolumn thumbnail frame view, zoom-in,zoom-out and zoomiinput field should be disabled and buttons should be greyed-out greyed-out', function () {
            //Navigate to multi-frame image
            navigateTo(tiffDocument, tiffPage).then(function () {
                webdriverUtils.waitTillElementVisible(filesArea.thumNailViewButton).then(function () {
                    filesArea.thumNailViewButton.click().then(function () {
                        //now I am in focused frame view--so zoom-in and zoom-out button should be disabled
                        expect(filesArea.zoomControllerElement.getAttribute('class')).toContain('icon-disabled');
                        expect(filesArea.zoomInButtonElement.getAttribute('disabled')).toBe('true');
                        //zoom-out button
                        expect(filesArea.zoomOutButtonElement.getAttribute('disabled')).toBe('true');
                        //check zoom input field value
                        expect(filesArea.zoomInputField.getAttribute('disabled')).toBe('true');
                    });
                });
            });
        });//it block completed

        it('If there is a single frame on the page where we are highlighted in filetree,multiframe component should be hidden', function () {
            //Navigate to single frame image
            navigateTo(jpegDocument, jpegPage).then(function () {
                //Check to make sure the multi-framing toolbar shouldn't ever be loaded into the dom
                expect(filesArea.thumNailViewButton.isPresent()).toBe(false);
                expect(filesArea.singleColumnViewButton.isPresent()).toBe(false);
                expect(filesArea.frameInputField.isPresent()).toBe(false);
                expect(filesArea.multiFrameComponentRow.isPresent()).toBe(false);
            });
        });//it block completed

        it('User should be able to switch to thumbnail and single column view by clicking a button(Just checking that class is changed or not)', function () {
            //Navigate to multi-frame image
            navigateTo(tiffDocument, tiffPage).then(function () {
                webdriverUtils.waitTillElementVisible(filesArea.thumNailViewButton).then(function () {
                    expect(filesArea.thumNailViewButton.isPresent()).toBe(true);
                    expect(filesArea.singleColumnViewButton.isPresent()).toBe(true);

                    filesArea.thumNailViewButton.click();
                    browser.waitForAngular();
                    expect(filesArea.thumbNailView.isPresent()).toBe(true);

                    filesArea.singleColumnViewButton.click();
                    browser.waitForAngular();
                    expect(filesArea.singleColumnView.isPresent()).toBe(true);
                    expect(filesArea.thumbNailView.isPresent()).toBe(false);
                });
            });
        });//it block completed

        it('When  user selects a page which has more than 1 frame, by default leadtools viewer is not displayed(again by - automation has checked the class value is correct or not---not checking that actually images are displayed or not)', function () {
            //Navigate to multi-frame image
            navigateTo(tiffDocument, tiffPage).then(function () {
                //by default- user should be navigated to thumbnail view
                webdriverUtils.waitTillElementVisible(filesArea.thumNailViewButton).then(function () {
                    expect(filesArea.iframeInFilesView.isPresent()).toBe(false);
                });
            });
        });//it block completed

        it('If a user clicks on thumbnail view button,user should see 3 columns view  in the viewer area', function () {
            //Navigate to multi-frame image
            navigateTo(tiffDocument, tiffPage).then(function () {
                webdriverUtils.waitTillElementVisible(filesArea.thumNailViewButton).then(function () {
                    //click on thumnail view
                    filesArea.thumNailViewButton.click().then(function () {
                        //images should be displayed in thumbnail view
                        expect(filesArea.thumbNailView.isPresent()).toBe(true);
                    });
                });
            });
        });//it block completed

        xit('If a user is on thumbnail view and clicks on any frame,user should see leadtools viewer and zoom-in, zoom-out and zoominput field button should be enabled and frame input field should also be updated ', function () {
            //Navigate to multi-frame image
            navigateTo(tiffDocument, tiffPage).then(function () {
                webdriverUtils.waitTillElementVisible(filesArea.thumNailViewButton).then(function () {
                    filesArea.thumNailViewButton.click().then(function () {
                        browser.waitForAngular();
                        filesArea.framesInThumNailView.then(function (frameImages) {
                            frameImages[0].click().then(function () {
                                //leadtools viewer should be displayed
                                expect(filesArea.iframeInFilesView.isPresent()).toBe(true);
                                expect(filesArea.zoomInButtonElement.getAttribute('disabled')).toBe(null);
                                expect(filesArea.zoomOutButtonElement.getAttribute('disabled')).toBe(null);
                                expect(filesArea.zoomInputField.getAttribute('disabled')).toBe(null);
                                expect(filesArea.frameInputField.getAttribute('value')).toBe('1');
                            });
                        });
                    });
                });
            });
        });//it block completed

        it('If a user is on single column view and clicks on any frame,user should see leadtools viewer and zoom-in, zoom-out and zoominput field button should be enabled and frame input field should also be updated ', function () {
            //Navigate to multi-frame image
            navigateTo(tiffDocument, tiffPage).then(function () {
                webdriverUtils.waitTillElementVisible(filesArea.thumNailViewButton).then(function () {
                    filesArea.singleColumnViewButton.click().then(function () {
                        filesArea.framesIn1ColumnView.then(function (frameImages) {
                            frameImages[3].click().then(function () {
                                //leadtools viewer should be displayed
                                expect(filesArea.iframeInFilesView.isPresent()).toBe(true);
                                expect(filesArea.zoomInButtonElement.getAttribute('disabled')).toBe(null);
                                expect(filesArea.zoomOutButtonElement.getAttribute('disabled')).toBe(null);
                                expect(filesArea.zoomInputField.getAttribute('disabled')).toBe(null);
                                expect(filesArea.frameInputField.getAttribute('value')).toBe('4');
                            });
                        });
                    });
                });
            });
        });//it block completed

        it('If a user click on a single column view button, user should see 1 column view in the viewer area', function () {
            //Navigate to multi-frame image
            navigateTo(tiffDocument, tiffPage).then(function () {
                webdriverUtils.waitTillElementVisible(filesArea.thumNailViewButton).then(function () {
                    //click on a single column view
                    filesArea.singleColumnViewButton.click().then(function () {
                        expect(filesArea.singleColumnView.isPresent()).toBe(true);
                    });
                });
            });
        });//it block completed

        it('When a user clicks on  a frame in single column view,he should see the page in the leadtools viewer', function () {
            //Navigate to multi-frame image
            navigateTo(tiffDocument, tiffPage).then(function () {
                webdriverUtils.waitTillElementVisible(filesArea.singleColumnViewButton).then(function () {
                    filesArea.singleColumnViewButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(filesArea.framesIn1ColumnView).then(function () {
                            filesArea.framesIn1ColumnView.then(function (frameImages) {
                                webdriverUtils.waitTillElementVisible(frameImages[0]).then(function () {
                                    frameImages[0].click().then(function () {
                                        webdriverUtils.waitTillElementVisible(filesArea.iframeInFilesView).then(function (isDisplayed) {
                                            expect(isDisplayed).toBe(true);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });//it block completed

        xit('When a user clicks on a frame in thumbnail view, he should see the page in the viewer', function () {
            //Navigate to multi-frame image
            navigateTo(tiffDocument, tiffPage).then(function () {
                webdriverUtils.waitTillElementVisible(filesArea.thumNailViewButton).then(function () {
                    filesArea.thumNailViewButton.click().then(function () {
                        filesArea.framesInThumNailView.then(function (frameImages) {
                            webdriverUtils.waitTillElementVisible(frameImages[0]).then(function () {
                                frameImages[0].click().then(function () {
                                    webdriverUtils.waitTillElementVisible(filesArea.iframeInFilesView).then(function (isDisplayed) {
                                        expect(isDisplayed).toBe(true);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });//it block completed

        it('If we are in multi-column thumbnail mode - the annotate button should, when clicked take us to annotate mode for the frame number in the input box and the farming control should hide', function () {
            //Navigate to multi-frame image
            navigateTo(tiffDocument, tiffPage).then(function () {
                webdriverUtils.waitTillElementVisible(filesArea.thumNailViewButton).then(function () {
                    filesArea.editAnnotationIcon.click();
                    //wait for all the jquery in the iframe to do it's stuff
                    //browser.waitForAngular();
                    browser.sleep(5000);
                    expect(filesArea.multiFrameComponentRow.isPresent()).toBe(false);
                });
            });
        });//it block completed

        it('If we are in single column view thumbnail mode - the annotate button should, when clicked take us to annotate mode for the frame number in the input box and the farming control should hide', function () {
            //Navigate to multi-frame image
            navigateTo(tiffDocument, tiffPage).then(function () {
                webdriverUtils.waitTillElementVisible(filesArea.singleColumnViewButton).then(function () {
                    filesArea.singleColumnViewButton.click().then(function () {
                        filesArea.editAnnotationIcon.click();
                        browser.waitForAngular();
                        browser.sleep(3000);
                        expect(filesArea.multiFrameComponentRow.isPresent()).toBe(false);
                    });
                });
            });
        });//it block completed

        it('If user is on a single-page pdf ,the annotate button should be visible and framing control should be hidden', function () {
            //navigate to pdf page
            navigateTo(pdfDocument, pdfPage).then(function () {
                //click on edit annotation icon
                expect(filesArea.editAnnotationIcon.isDisplayed()).toBe(true);
                expect(filesArea.multiFrameComponentRow.isPresent()).toBe(false);
            });
        });//it block completed

});//describe block completed