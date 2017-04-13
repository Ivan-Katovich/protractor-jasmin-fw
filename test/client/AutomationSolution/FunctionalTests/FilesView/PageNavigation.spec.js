exports.tags = ['File_Navigation', 'File_Navigation'];
var recordHeaderElement = require('./../../PageObjects/Containers/RecordHeader.js');
var SearchPage = require('../../PageObjects/SearchPage.js');
var filesview = require('../../PageObjects/FilesView.js');
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var FileTree = require('./../../PageObjects/Containers/FileTree.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

//Making objects of the included pages
var recordHeader = new recordHeaderElement();
var searchPage = new SearchPage();
var navigationBar = new NavigationBar();
var fileTree = new FileTree();
var filesArea = new filesview();


describe('ImageRight page navigation', function () {
    var pageCounterValue = null;
    //Pre-condition
    beforeEach(function() {
            browser.driver.get(browser.params.defaultUrl);
            browser.sleep(500);
            navigationBar.searchIcon.click();
            browser.sleep(500);
            searchPage.fileNumberSearchBox.sendKeys('PageNavigation').then(function () {
                searchPage.searchButton.click().then(function () {
                    webdriverUtils.waitTillElementVisible(fileTree.folderByText('Folder1')).then(function () {
                        webdriverUtils.showNodeChildrenByText('Folder1', 'folder').then(function () {
                            webdriverUtils.waitTillElementVisible(fileTree.documentByText('F1D1')).then(function () {
                                webdriverUtils.showNodeChildrenByText('F1D1', 'document').then(function () {
                                    webdriverUtils.waitTillElementVisible(fileTree.pageByText('haha.jpg')).then(function () {
                                        //webdriverUtils.clickOnFileTreeNode('Desert.jpg', 'page').then(function () {
                                        fileTree.page(0).click().then(function() {
                                            browser.sleep(2000);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        
    });

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    function getRandomInt(min, max) {
        max = typeof max !== 'undefined' ? max : 99999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //returns the current value of the frame input field
    function frameInputValue() {
        filesArea.pageNumberInput.getAttribute('value').then(function(pageValue) {
            pageCounterValue=pageValue;
        });
        return pageCounterValue;
    }


    it('After By typing a valid page number and pressing ENTER key,Web Client should navigate to the correct page number and the page is highlighted in the file tree', function () {
        //get any valid frame number
        var pageNo = 7;//getRandomInt(1, parseInt(nodes) - 1);
        filesArea.pageNumberInput.clear().then(function () {
            filesArea.pageNumberInput.sendKeys(pageNo).then(function () {
                webdriverUtils.pressEnter().then(function () {
                    browser.sleep(3000).then(function () {
                        //validate the number in frameInput field
                        filesArea.pageNumberInput.getAttribute('value').then(function (value) {
                            expect(parseInt(value)).toEqual(pageNo);
                        });

                        fileTree.selectedPages.getText().then(function (selPage) {
                            expect(selPage[0]).toContain('7');
                        });
                    });
                });
            });
        });
    });

    it('By typing a valid page number and pressing TAB key,Web Client should navigate to the correct page number and the page is highlighted in the file tree', function() {
        //get any valid frame number
        var pageNo = 5;//getRandomInt(1, parseInt(nodes) - 1);

        filesArea.pageNumberInput.clear().then(function () {
            filesArea.pageNumberInput.sendKeys(pageNo).then(function () {
                //press tab
                webdriverUtils.pressTab().then(function () {
                    browser.sleep(2000).then(function () {
                        //validate the number in frameInput field
                        filesArea.pageNumberInput.getAttribute('value').then(function (value) {
                            expect(parseInt(value)).toEqual(pageNo);
                        });

                        fileTree.selectedPages.getText().then(function (selPage) {
                            expect(selPage[0]).toContain('5');
                        });
                    });
                });
            });
        });
    });


    it('By typing a valid page number and clicking anywhere outside,Web Client should navigate to the correct page number and the page is highlighted in the file tree', function() {
        //get any valid frame number
        var pageNo = 9;//getRandomInt(1, parseInt(nodes) - 1);

        filesArea.pageNumberInput.clear().then(function () {
            //type the  valid number in the framenumber input
            filesArea.pageNumberInput.sendKeys(pageNo).then(function () {
                //click outside---clicking on recordheader file number text
                recordHeader.fileNumberRecordHeader.click().then(function () {
                    browser.sleep(2000).then(function () {
                        //validate the number in frameInput field
                        filesArea.pageNumberInput.getAttribute('value').then(function (value) {
                            //Check the framInput field
                            expect(parseInt(value)).toEqual(pageNo);
                        });

                        fileTree.selectedPages.getText().then(function (selPage) {
                            expect(selPage[0]).toContain('9');
                        });
                    });
                });
            });
        });
    });

    it('Type an ivalide page numbers (for example, a page number more than existing  in the file tree),Web Client should remain at the current page and it remains highlighted in the file tree', function() {
        filesArea.pageNumberInput.getAttribute('value').then(function (currentVal) {
            //o is the invalid value and max+65 is also an invalid value
            var invalidMinPageNo = 0, invalidMaxPageNo = 1500;
            //get the the currently highlighted node--make sure that the correct node is highlighted before entering any invalid numbers
            fileTree.getPageLiByText(currentVal + ": haha.jpg").getAttribute('class').then(function (className) {
                expect(className).toContain('doc-selected');
            });
            //fileTree.fileTreeNodeHighlighted(currentVal).then(function (className) {
            //    //check the class which is responsible for highlighting a node
            //    expect(className).toContain('doc-selected');
            //});

            filesArea.pageNumberInput.clear().then(function () {
                //type the  valid number in the framenumber input
                filesArea.pageNumberInput.sendKeys(invalidMinPageNo).then(function () {
                    //press tab key
                    webdriverUtils.pressTab().then(function () {
                        browser.sleep(2000).then(function () {
                            //verify that highlighted node is the same as previous after adding invalid min val
                            fileTree.getPageLiByText(currentVal + ": haha.jpg").getAttribute('class').then(function (className) {
                                //check the class which is responsible for highlighting a node
                                expect(className).toContain('doc-selected');
                                //select all the text in page input value
                                filesArea.pageNumberInput.clear().then(function () {
                                    //type the  valid number in the framenumber input
                                    filesArea.pageNumberInput.sendKeys(invalidMaxPageNo).then(function () {
                                        //press tab key
                                        webdriverUtils.pressTab().then(function () {
                                            browser.sleep(2000).then(function () {
                                                //verify that highlighted node is the same as previous after adding invalid max val
                                                fileTree.getPageLiByText(currentVal + ": haha.jpg").getAttribute('class').then(function (className) {
                                                    //check the class which is responsible for highlighting a node
                                                    expect(className).toContain('doc-selected');
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
    });//it block completed

    it('Type negative numbers and alpha numeric characters,Web Client should remain at the current page and it remains highlighted in the file tree', function() {
        var negNumber = -9, nonNumericVal = 'ABCCDXYZ!@#$%';
        //Get the frameInput field value
        filesArea.pageNumberInput.getAttribute('value').then(function (currentVal) {
            //get the the currently highlighted node--make sure that the correct node is highlighted
            fileTree.getPageLiByText(currentVal + ": haha.jpg").getAttribute('class').then(function (className) {
                //check the class which is responsible for highlighting a node
                expect(className).toContain('doc-selected');

                //select all the text in page input value
                filesArea.pageNumberInput.click().then(function () {
                    //type the  -ve number in the framenumber input
                    filesArea.pageNumberInput.sendKeys(negNumber).then(function () {
                        //press Tab
                        webdriverUtils.pressTab().then(function () {
                            browser.sleep(2000).then(function () {
                                //check the highlighted node has not been changed--after adding -ve number
                                fileTree.getPageLiByText(currentVal + ": haha.jpg").getAttribute('class').then(function (c) {
                                    //check the class which is responsible for highlighting a node
                                    expect(c).toContain('doc-selected');
                                });

                                ///--------//
                                //select all the text in page input value
                                filesArea.pageNumberInput.click().then(function () {
                                    //type the  -ve number in the framenumber input
                                    filesArea.pageNumberInput.sendKeys(nonNumericVal).then(function () {
                                        //press Tab
                                        webdriverUtils.pressTab().then(function () {
                                            browser.sleep(2000).then(function () {
                                                //check the highlighted node has not been changed--after adding -non numeric value
                                                fileTree.getPageLiByText(currentVal + ": haha.jpg").getAttribute('class').then(function (c) {
                                                    //check the class which is responsible for highlighting a node
                                                    expect(c).toContain('doc-selected');
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
    });//it block completed

    it('If a user is in edit mode and enters any valid page number and press ENTER key,webclient should navigate to the correct page number', function() {

        fileTree.fileTreeNodes.count().then(function(nodes) {
            //get any valid frame number
            var pageNo = 11;//getRandomInt(1, parseInt(nodes) - 1);

            //click on edit icon to enter in edit mode
            filesArea.editAnnotationIcon.click().then(function() {
                browser.sleep(2000);
            });

            //type the  valid number in the framenumber input
            filesArea.pageNumberInput.clear().then(function () {
                filesArea.pageNumberInput.sendKeys(pageNo).then(function () {
                    //press enter
                    webdriverUtils.pressEnter().then(function () {
                        browser.sleep(2000).then(function () {
                            //validate the number in frameInput field
                            filesArea.pageNumberInput.getAttribute('value').then(function (value) {
                                //Check the framInput field
                                expect(parseInt(value)).toEqual(pageNo);
                            });

                            fileTree.getPageLiByText(pageNo + ": dada.jpg").getAttribute('class').then(function (className) {
                                //check the class which is responsible for highlighting a node
                                expect(className).toContain('doc-selected');
                            });
                        });
                    });
                });
            });
        });
    });//it block completed

    it('If a user is in edit mode and enters any valid page number and press TAB key,webclient should navigate to the correct page number', function () {

        fileTree.fileTreeNodes.count().then(function (nodes) {
            //get any valid frame number
            var pageNo = 10;//getRandomInt(1, parseInt(nodes) - 1);

            //click on edit icon to enter in edit mode
            filesArea.editAnnotationIcon.click().then(function () {
                browser.sleep(2000);
            });

            filesArea.pageNumberInput.clear().then(function () {
                //type the  valid number in the framenumber input
                filesArea.pageNumberInput.sendKeys(pageNo).then(function () {
                    //press tab
                    webdriverUtils.pressTab().then(function () {
                        browser.sleep(2000).then(function () {
                            //validate the number in frameInput field
                            filesArea.pageNumberInput.getAttribute('value').then(function (value) {
                                //Check the framInput field
                                expect(parseInt(value)).toEqual(pageNo);
                            });

                            fileTree.getPageLiByText(pageNo + ": kaka.jpg").getAttribute('class').then(function (className) {
                                //check the class which is responsible for highlighting a node
                                expect(className).toContain('doc-selected');
                            });
                        });
                    });
                });
            });
        });
    });//it block completed

    it('If a user is in edit mode and enters any valid page number and click anywhere outside,webclient should navigate to the correct page number', function () {

        fileTree.fileTreeNodes.count().then(function (nodes) {
            //get any valid frame number
            var pageNo = 10;// getRandomInt(1, parseInt(nodes) - 1);

            //click on edit icon to enter in edit mode
            filesArea.editAnnotationIcon.click().then(function () {
                browser.sleep(2000);
            });

            filesArea.pageNumberInput.clear().then(function () {
                //type the  valid number in the framenumber input
                filesArea.pageNumberInput.sendKeys(pageNo).then(function () {
                    //click outside
                    recordHeader.fileNumberRecordHeader.click().then(function () {
                        browser.sleep(2000).then(function () {
                            //validate the number in frameInput field
                            filesArea.pageNumberInput.getAttribute('value').then(function (value) {
                                //Check the framInput field
                                expect(parseInt(value)).toEqual(pageNo);
                            });

                            fileTree.getPageLiByText(pageNo + ": kaka.jpg").getAttribute('class').then(function (className) {
                                //check the class which is responsible for highlighting a node
                                expect(className).toContain('doc-selected');
                            });
                        });
                    });
                });
            });
        });
    });//it block completed

    it('If a user is on first page the previous page button is disabled', function() {

        filesArea.pageNumberInput.clear().then(function () {
            //type the  1 number in the framenumber input
            filesArea.pageNumberInput.sendKeys('1').then(function () {
                //press tab--navigate to first page
                webdriverUtils.pressTab().then(function () {

                    //click on left button
                    filesArea.previousPageButton.getAttribute('class').then(function (classVal) {
                        expect(classVal).toContain('disabled');
                    });
                });
            });
        });
    });

    it('If a user is not on the first page and clicks on left arrow, page number field should decrease by 1 and the tree selection should update to page above original', function() {
        var pageNo = 12;//getRandomInt(1, parseInt(nodes) - 1);
        filesArea.pageNumberInput.clear().then(function () {
            filesArea.pageNumberInput.sendKeys(pageNo).then(function () {
                webdriverUtils.pressTab().then(function () {

                    filesArea.previousPageButton.click().then(function () {
                        browser.sleep(2000).then(function () {
                            filesArea.pageNumberInput.getAttribute('value').then(function (pageVal) {
                                expect(parseInt(pageVal)).toEqual(pageNo - 1);
                            });
                            fileTree.selectedPages.getText().then(function (selPage) {
                                expect(selPage[0]).toContain('11');
                            });
                        });
                    });
                });
            });
        });
    });

    it('If a user is not on the last page and clicks on right arrow, page number field should increase by 1 and tree selection should update to 1 below original', function () {
        //get any valid frame number
        var pageNo = 8;//getRandomInt(1, parseInt(nodes) - 1);
        filesArea.pageNumberInput.clear().then(function () {
            //type the  5 number in the framenumber input
            filesArea.pageNumberInput.sendKeys(pageNo).then(function () {
                webdriverUtils.pressTab().then(function () {

                    filesArea.nextPageButton.click().then(function () {
                        browser.sleep(2000).then(function () {
                            filesArea.pageNumberInput.getAttribute('value').then(function (pageVal) {
                                //after clicking on next frame button --it should navigate to next page
                                expect(parseInt(pageVal)).toEqual(pageNo + 1);
                            });
                            fileTree.selectedPages.getText().then(function (selPage) {
                                expect(selPage[0]).toContain('9');
                            });
                        });
                    });
                });
            });
        });
    });

    it('If user clicks on a page in the file tree than page number should change in the input field to the selected pages number', function() {
        var no = 10;
        //fileTree.fileTreeNodes.then(function (nodes) {
        //    webdriverUtils.clickOnElement(nodes[no]);
        //});
        fileTree.pagesInFileTree.then(function (pages) {
            //Do minus one to keep in sync with how arrows are handled and the page number
            //will match what you have
            //Since the page numbers start at 1 instead of 0
            webdriverUtils.clickOnElement(pages[no - 1]);
        });

        expect(filesArea.pageNumberInput.getAttribute('value')).toBe(no.toString());

        //--make sure that the correct node is highlighted
        fileTree.getPageLiByText(no + ": kaka.jpg").getAttribute('class').then(function (className) {
            expect(className).toContain('doc-selected');
        });
        //fileTree.fileTreeNodeHighlighted(parseInt(no)).then(function (className) {
        //    check the class which is responsible for highlighting a node
        //expect(className).toContain('doc-selected');
        //});

    });//it block completed

    it('Page number input field should not keep changing when user scrolls up/down in the filetree and highlighted page should stay the same',function() {
        var no = 10;
        fileTree.pagesInFileTree.then(function (pages) {
            //Do minus one to keep in sync with how arrows are handled and the page number
            //will match what you have
            //Since the page numbers start at 1 instead of 0
            webdriverUtils.clickOnElement(pages[no - 1]);
        });
        browser.sleep(2000);
        browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
        browser.actions().sendKeys(protractor.Key.PAGE_UP).perform();
        //make sure the highlighted page doesn't change
        //fileTree.fileTreeNodeHighlighted(parseInt(no)).then(function (className) {
        //    //check the class which is responsible for highlighting a node
        //    expect(className).toContain('doc-selected');
        //});
        fileTree.getPageLiByText(no + ": kaka.jpg").getAttribute('class').then(function (className) {
            expect(className).toContain('doc-selected');
        });

        browser.sleep(2000);
        //make sure page no does not change
        expect(filesArea.pageNumberInput.getAttribute('value')).toBe(no.toString());


    });//it block completed

});