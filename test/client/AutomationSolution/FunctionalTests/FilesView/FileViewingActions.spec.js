exports.tags = ['File_Navigation', 'File_Attributes'];

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

var file1 = 'FileViewingActionsAttributes';
var file2 = 'FileViewingActionsNoAttributes';
var folder1FVAA = 'FVAA Folder1';
var folder1FVANA = 'FVANA Folder1';
var document1FVAA = 'FVAA Document1';
var document1FVANA = 'FVANA Document1';
var pageFVAA = 'cat.jpg';

describe('Files viewing Actions ', function() {
    //_____________________Information symbol scenarios_________________________//
        beforeEach(function () {
                browser.driver.get(browser.params.defaultUrl);
                browser.sleep(500);
                navigationBar.searchIcon.click();
                browser.sleep(500);
        });

        function verifyFileAttributes() {

            //Verify that header shows correct values
            filesArea.informationPopUpHeader.getText().then(function (informationHeaderValue) {
                expect(informationHeaderValue).toBe('FILE ATTRIBUTES');
            });

            if (typeof filesArea.informationSymbolAttrLists != 'undefined') {
                //verify that all the attributes are actually showing in the pop-up
                filesArea.informationSymbolAttrLists.map(function (attrs) {
                    var flag = "information pop-up for file level empty";
                    if (attrs.isDisplayed()) {
                        flag = "information pop-up for file level not empty";
                    }
                    expect(flag).toBe("information pop-up for file level not empty");
                });
            } else {
                console.log('pop-up empty');
            }

            //Get the attribute names
            var attrNames = filesArea.informationPopUpAttrNames.map(function (aName) {
                return aName.getText();
            });
            //Get the attribute Values
            var attrValues = filesArea.informationPopUpAttrValues.map(function (aValue) {
                return aValue.getText();
            });

            var expAttrNames = ['DRAWER NAME:', 'FILE TYPE:', 'BILLING CODE:', 'DATE OF BILL:', 'USERNAME:', 'CUSTOMERNO:', 'CUSTOMERBILLAMOUNT:', 'ISAGENCY:', 'CUSTOMERNAME:', 'CUST NO:'], expAttrValues = ['Investigations', 'Events', 'A8T123', '1/4/2015 12:00:00 AM', 'badhekna', '2', '4', 'True', 'Test8', '3'];

            attrNames.then(function (actualAttrNames) {
                expect(conversionUtils.isArraysEquivalent(expAttrNames, actualAttrNames)).toBe(true);
            });

            attrValues.then(function (actualAttrValues) {
                console.log('actual', actualAttrValues);
                expect(conversionUtils.isArraysEquivalent(expAttrValues, actualAttrValues)).toBe(true);
            });

        }

        function verifyDocumentSystemAttributes() {
            //verify that pop-up header shows correct value
            filesArea.informationPopUpHeader.getText().then(function (informationHeaderValue) {
                expect(informationHeaderValue).toBe('DOCUMENT ATTRIBUTES');
            });
            if (typeof filesArea.informationSymbolAttrLists != 'undefined') {
                //verify that all the attributes are actually showing in the pop-up
                filesArea.informationSymbolAttrLists.map(function (attrs) {
                    var flag = "information pop-up for document level empty";
                    if (attrs.isDisplayed()) {
                        flag = "information pop-up for document level not empty";
                    }
                    expect(flag).toBe("information pop-up for document level not empty");
                });
            }
            else {
                console.log('pop-up empty');
            }

            //Get the attribute names
            var attrNames = filesArea.informationPopUpAttrNames.map(function (aName) {
                return aName.getText();
            });
            //Get the attribute Values
            var attrValues = filesArea.informationPopUpAttrValues.map(function (aValue) {
                return aValue.getText();
            });

            var expAttrNames = ['DOCUMENT DATE:', 'RECEIVED DATE:', 'TYPE:', 'DESCRIPTION:'],
                expAttrValues = ['12/17/2015', '12/17/2015 3:21:44 PM', 'Miscellaneous', 'FVANA Document1'];

            attrNames.then(function (actualAttrNames) {
                expect(conversionUtils.isArraysEquivalent(expAttrNames, actualAttrNames)).toBe(true);
            });

            attrValues.then(function (actualAttrValues) {
                expect(conversionUtils.isArraysEquivalent(expAttrValues, actualAttrValues)).toBe(true);
            });


        }

        function verifyDocumentAttributes() {
            //verify that pop-up header shows correct value
            filesArea.informationPopUpHeader.getText().then(function (informationHeaderValue) {
                expect(informationHeaderValue).toBe('DOCUMENT ATTRIBUTES');
            });
            if (typeof filesArea.informationSymbolAttrLists != 'undefined') {
                //verify that all the attributes are actually showing in the pop-up
                filesArea.informationSymbolAttrLists.map(function (attrs) {
                    var flag = "information pop-up for document level empty";
                    if (attrs.isDisplayed()) {
                        flag = "information pop-up for document level not empty";
                    }
                    expect(flag).toBe("information pop-up for document level not empty");
                });
            }
            else {
                console.log('pop-up empty');
            }

            //Get the attribute names
            var attrNames = filesArea.informationPopUpAttrNames.map(function (aName) {
                return aName.getText();
            });
            //Get the attribute Values
            var attrValues = filesArea.informationPopUpAttrValues.map(function (aValue) {
                return aValue.getText();
            });

            var expAttrNames = ['DOCUMENT DATE:', 'RECEIVED DATE:', 'TYPE:', 'DESCRIPTION:', 'CUSTOMERNAME:', 'CUST NO:', 'CUSTOMERBILLAMOUNT:', 'CUSTOMERNO:', 'DATE OF BILL:', 'FORM:', 'ISAGENCY:', 'MANDATORY ATTRIBUTES:'],
                expAttrValues = ['12/7/2015', '12/7/2015 3:05:44 PM', 'Endorsement DEC', 'FVAA Document1', 'Test2', '3', '31.5', '3', '1/23/2015 12:00:00 AM', '3', 'True', '1'];

            attrNames.then(function (actualAttrNames) {
                expect(conversionUtils.isArraysEquivalent(expAttrNames, actualAttrNames)).toBe(true);
            });

            // doc date changes as it is updated, so we don't want to check the actual date... just that something is there.
            attrValues.then(function (actualAttrValues) {
                actualAttrValues[0] = '';
                //console.log('attr vals', actualAttrValues);
                expect(conversionUtils.isArraysEquivalent(expAttrValues, actualAttrValues)).toBe(true);
                //  });
            });
        }

        function verifyFolderAttributes() {
            //verify that pop-up header shows correct value
            filesArea.informationPopUpHeader.getText().then(function (informationHeaderValue) {
                expect(informationHeaderValue).toBe('FOLDER ATTRIBUTES');
            });
            if (typeof filesArea.informationSymbolAttrLists != 'undefined') {
                //verify that all the attributes are actually showing in the pop-up
                filesArea.informationSymbolAttrLists.map(function (attrs) {
                    var flag = "information pop-up for folder level empty";
                    if (attrs.isDisplayed()) {
                        flag = "information pop-up for folder level not empty";
                    }
                    expect(flag).toBe("information pop-up for folder level not empty");
                });
            } else {
                console.log('pop-up empty');
            }

            //Get the attribute names
            var attrNames = filesArea.informationPopUpAttrNames.map(function (aName) {
                return aName.getText();
            });
            //Get the attribute Values
            var attrValues = filesArea.informationPopUpAttrValues.map(function (aValue) {
                return aValue.getText();
            });

            // FLAG: the edited date has changed on the live database...
            var expAttrNames = ['TYPE:', 'DESCRIPTION:', 'MODIFIED DATE:', 'CREATED DATE:', 'CUSTOMERNAME:', 'CUST NO:', 'CUSTOMERBILLAMOUNT:', 'CUSTOMERNO:', 'DATE OF BILL:', 'FORM:', 'ISAGENCY:', 'MANDATORY ATTRIBUTES:', 'BILLING CODE:', 'NEWATTR:', 'USERNAME:'],
                expAttrValues = ['Policy Info', 'FVAA Folder1', '12/17/15', '12/17/15', 'Test5', '7', '50', '17', '1/9/2015 12:00:00 AM', '3', 'True', '1', 'BCD', 'True', 'cannadro'];

            attrNames.then(function (actualAttrNames) {
                expect(conversionUtils.isArraysEquivalent(actualAttrNames, expAttrNames)).toBe(true);
            });

            attrValues.then(function (actualAttrValues) {

                //If this fails, something is def wrong
                expect(actualAttrValues.length).toEqual(expAttrValues.length);

                for (var i = 0; i < expAttrValues.length; i++) {
                    if (i === 2) {
                        //This is where we compare the modified date cause it keeps changing...
                        var patternForModifiedDate = '([0-9]{1,2}\/){2}[0-9]{2}';
                        expect(actualAttrValues[i]).toMatch(patternForModifiedDate);
                    } else {
                        //just compare the rest of the array
                        expect(actualAttrValues[i]).toBe(expAttrValues[i]);
                    }
                }
            });

        }

        function verifySystemFolderAttributes() {
            //verify that pop-up header shows correct value
            filesArea.informationPopUpHeader.getText().then(function (informationHeaderValue) {
                expect(informationHeaderValue).toBe('FOLDER ATTRIBUTES');
            });
            if (typeof filesArea.informationSymbolAttrLists != 'undefined') {
                //verify that all the attributes are actually showing in the pop-up
                filesArea.informationSymbolAttrLists.map(function (attrs) {
                    var flag = "information pop-up for folder level empty";
                    if (attrs.isDisplayed()) {
                        flag = "information pop-up for folder level not empty";
                    }
                    expect(flag).toBe("information pop-up for folder level not empty");
                });
            } else {
                console.log('pop-up empty');
            }

            //Get the attribute names
            var attrNames = filesArea.informationPopUpAttrNames.map(function (aName) {
                return aName.getText();
            });
            //Get the attribute Values
            var attrValues = filesArea.informationPopUpAttrValues.map(function (aValue) {
                return aValue.getText();
            });

            var expAttrNames = ['TYPE:', 'DESCRIPTION:', 'MODIFIED DATE:', 'CREATED DATE:'],
                expAttrValues = ['Cancellation/Reinstatement', 'FVANA Folder1', '12/17/15', '12/17/15'];

            attrNames.then(function (actualAttrNames) {
                expect(conversionUtils.isArraysEquivalent(actualAttrNames, expAttrNames)).toBe(true);
            });

            attrValues.then(function (actualAttrValues) {
                expect(conversionUtils.isArraysEquivalent(actualAttrValues, expAttrValues)).toBe(true);
            });

        }

        function verifyFileSystemAttributes() {

            //Verify that header shows correct values
            filesArea.informationPopUpHeader.getText().then(function (informationHeaderValue) {
                expect(informationHeaderValue).toBe('FILE ATTRIBUTES');
            });

            if (typeof filesArea.informationSymbolAttrLists != 'undefined') {
                //verify that all the attributes are actually showing in the pop-up
                filesArea.informationSymbolAttrLists.map(function (attrs) {
                    var flag = "information pop-up for file level empty";
                    if (attrs.isDisplayed()) {
                        flag = "information pop-up for file level not empty";
                    }
                    expect(flag).toBe("information pop-up for file level not empty");
                });
            } else {
                console.log('pop-up empty');
            }

            //Get the attribute names
            var attrNames = filesArea.informationPopUpAttrNames.map(function (aName) {
                return aName.getText();
            });
            //Get the attribute Values
            var attrValues = filesArea.informationPopUpAttrValues.map(function (aValue) {
                return aValue.getText();
            });

            var expAttrNames = ['DRAWER NAME:', 'FILE TYPE:'], expAttrValues = ['Investigations', 'Events'];

            attrNames.then(function (actualAttrNames) {
                expect(conversionUtils.isArraysEquivalent(expAttrNames, actualAttrNames)).toBe(true);
            });

            attrValues.then(function (actualAttrValues) {
                expect(conversionUtils.isArraysEquivalent(expAttrValues, actualAttrValues)).toBe(true);
            });

        }

        function verifyScrollability() {
            //Open the file view  information symbol
            filesArea.informationSymbol.click();
            filesArea.scrollabilityClassOfInformationPopup().then(function (classExists) {
                var flag = 'pop-up is not scrollable';
                if (classExists) {
                    flag = 'pop-up is scrollable';
                }
                expect('pop-up is scrollable').toBe(flag);
            });
        }

        function openInformationSymbol() {
            webdriverUtils.waitTillElementVisible(filesArea.informationSymbol);
            filesArea.informationSymbol.click();
        }

        function openFileTree() {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber);
        }


        it('If user is highlighted at file level, clicking on information symbol will show the file attributes along with cutom attributes', function () {

            searchPage.fileNumberSearchBox.sendKeys(file1).then(function () {
                searchPage.searchButton.click().then(function () {
                    //verify that files view is opened
                    recordHeader.fileNumberRecordHeader.getText().then(function (fileNo) {
                        expect(fileNo.toLowerCase()).toBe(file1.toLowerCase());
                        //Open the file view  information symbol
                        openInformationSymbol();
                        //By default user will be highlighted to files view - so check that information symbol shows fileAttributes
                        verifyFileAttributes();
                    });
                });
            });
        });

        it('If user is highlighted at file level, clicking on information symbol will show only  file system attributes if there is no  custom attributes associated with that file', function () {
            searchPage.fileNumberSearchBox.sendKeys(file2).then(function () {
                searchPage.searchButton.click().then(function () {
                    webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge).then(function () {
                        recordHeader.fileNumberRecordHeader.getText().then(function (fileNo) {
                            expect(fileNo.toLowerCase()).toBe(file2.toLowerCase());

                            //Open the file view  information symbol
                            openInformationSymbol();
                            //By default user will be highlighted to files view - so check that information symbol shows fileAttributes
                            verifyFileSystemAttributes();
                        });
                    });
                });
            });
        });

        it('If user is highlighted at folder level, clicking on information symbol will show the folder attributes', function () {

            searchPage.fileNumberSearchBox.sendKeys(file1).then(function () {
                searchPage.searchButton.click().then(function () {
                    //verify that files view is opened
                    recordHeader.fileNumberRecordHeader.getText().then(function (fileNo) {
                        expect(fileNo.toLowerCase()).toBe(file1.toLowerCase());
                    });

                    openFileTree();
                    webdriverUtils.clickOnNodeInFileTree(folder1FVAA, 'folder');
                });

                openInformationSymbol();
                //By default user will be highlighted to information symbol - so check that information symbol shows folder Attributes
                verifyFolderAttributes();
            });
        });

        it('If user is highlighted at folder level, clicking on information symbol will show the folder system attributes if there is no custom attributes associated  with the folder', function () {

            searchPage.fileNumberSearchBox.sendKeys(file2).then(function () {
                searchPage.searchButton.click().then(function () {
                    webdriverUtils.waitTillElementVisible(recordHeader.fileTaskListBadge).then(function () {
                        recordHeader.fileNumberRecordHeader.getText().then(function (fileNo) {
                            expect(fileNo.toLowerCase()).toBe(file2.toLowerCase());
                        });

                        openFileTree();
                        //Click on the third(0,1,2) element of the file tree after root
                        webdriverUtils.clickOnNodeInFileTree(folder1FVANA, 'folder');

                        openInformationSymbol();
                        //By default user will be highlighted to information symbol - so check that information symbol shows folder Attributes
                        verifySystemFolderAttributes();
                    });
                });
            });
        });

        // toDo: Fix the expect on this one
        xit('If user is highlighted at document level, clicking on information symbol will show the document attributes', function () {

            searchPage.fileNumberSearchBox.sendKeys(file1).then(function () {
                searchPage.searchButton.click().then(function () {
                    //verify that files view is opened
                    recordHeader.fileNumberRecordHeader.getText().then(function (fileNo) {
                        expect(fileNo.toLowerCase()).toBe(file1.toLowerCase());
                    });

                    openFileTree();
                    webdriverUtils.showNodeChildrenByText(folder1FVAA, 'folder');
                    webdriverUtils.clickOnNodeInFileTree(document1FVAA, 'document');

                    openInformationSymbol();
                    //By default user will be highlighted to information symbol - so check that information symbol shows folder Attributes
                    verifyDocumentAttributes();

                });
            });


        });

        it('If user is highlighted at an empty document in file tree, clicking on information symbol will show the document system attributes', function () {
            searchPage.fileNumberSearchBox.sendKeys(file2).then(function () {
                searchPage.searchButton.click().then(function () {
                    //verify that files view is opened
                    recordHeader.fileNumberRecordHeader.getText().then(function (fileNo) {
                        expect(fileNo.toLowerCase()).toBe(file2.toLowerCase());
                    });

                    openFileTree();
                    webdriverUtils.showNodeChildrenByText(folder1FVANA, 'folder');
                    webdriverUtils.clickOnNodeInFileTree(document1FVANA, 'document');

                    openInformationSymbol();

                    verifyDocumentSystemAttributes();
                });
            });
        });

        it('File viewing actions bar should display a file number if  user is highlighted  at a file level in filetree', function () {
            //search and open a file
            searchPage.fileNumberSearchBox.sendKeys(file1).then(function () {
                //Click on search button
                searchPage.searchButton.click().then(function () {
                    //By default user will be highlighted to file level so verify that title in fileViewing actions  is filenumber or not
                    filesArea.fileViewHeader.getText().then(function (fileTitleHeader) {
                        expect(fileTitleHeader.toLowerCase()).toBe(file1.toLowerCase());
                    });
                });
            });
        });

        it('File viewing actions bar should display a folder name if the user is highlighted  at a folder level in filetree', function () {
            //search and open a file
            searchPage.fileNumberSearchBox.sendKeys(file1).then(function () {
                //Click on search button
                searchPage.searchButton.click().then(function () {
                    openFileTree();
                    webdriverUtils.clickOnNodeInFileTree(folder1FVAA, 'folder');
                    //Check that
                    filesArea.fileViewHeader.getText().then(function (fileTitleHeader) {
                        expect(fileTitleHeader.toLowerCase()).toBe(folder1FVAA.toLowerCase());
                    });
                });
            });
        });

        it('File viewing actions bar should display a page name if the user is highlighted  at a page level in filetree', function () {
            //search and open a file
            searchPage.fileNumberSearchBox.sendKeys(file1).then(function () {
                //Click on search button
                searchPage.searchButton.click().then(function () {

                    openFileTree();
                    webdriverUtils.showNodeChildrenByText(folder1FVAA, 'folder');
                    webdriverUtils.showNodeChildrenByText(document1FVAA, 'document');
                    fileTree.page(0).click();
                    filesArea.fileViewHeader.getText().then(function (fileTitleHeader) {
                        expect(fileTitleHeader.toLowerCase()).toContain(pageFVAA.toLowerCase());
                    });
                });
            });
        });

        it('When a user opens a file first time and clicks on file tree button than it will show file tree and if user clicks on file tree button again,file tree will be hidden', function () {
            //search and open a file
            searchPage.fileNumberSearchBox.sendKeys(file1).then(function () {
                //Click on search button
                searchPage.searchButton.click().then(function () {

                    //file view record header should be  displayed to make sure that file view has been opened
                    recordHeader.fileNumberRecordHeader.getText().then(function (fileNumber) {
                        expect(fileNumber.toLowerCase()).toBe(file1.toLowerCase());
                    });
                    //Click and open file tree
                    //openFileTree();
                    //file Tree should be visible on click of a file tree
                    expect(fileTree.fileNumber.isDisplayed()).toBe(true);
                    //Click and close file tree
                    openFileTree();
                    fileTree.fileTreeSymbol.click().then(function () {
                        browser.waitForAngular().then(function () {
                            browser.sleep(500); //Do not like this but need to wait for animation to complete
                            //file Tree should not be visible on click of a file tree
                            expect(fileTree.fileNumber.isDisplayed()).toBe(false);
                        });
                    });
                });
            });

        });

        it('Information symbol pop-up displayed for file level attributes should be scrollable', function () {
            searchPage.fileNumberSearchBox.sendKeys(file1).then(function () {
                searchPage.searchButton.click().then(function () {
                    //verify that files view is opened
                    recordHeader.fileNumberRecordHeader.getText().then(function (fileNo) {
                        expect(fileNo.toLowerCase()).toBe(file1.toLowerCase());
                    });
                    //verify scrollability for file level attributes pop-up
                    verifyScrollability();
                });
            });
        });

        it('Information symbol pop-up displayed for folder attributes should be scrollable', function () {
            searchPage.fileNumberSearchBox.sendKeys(file1).then(function () {
                searchPage.searchButton.click().then(function () {
                    //verify that files view is opened
                    recordHeader.fileNumberRecordHeader.getText().then(function (fileNo) {
                        expect(fileNo.toLowerCase()).toBe(file1.toLowerCase());
                    });

                    //Open file tree and navigate to folder level
                    openFileTree();
                    webdriverUtils.clickOnNodeInFileTree(folder1FVAA, 'folder');
                    //verify scrollability for folder level attributes pop-up
                    verifyScrollability();
                });
            });
        });

        it('Information symbol pop-up displayed for document level attributes should be scrollable', function () {
            searchPage.fileNumberSearchBox.sendKeys(file1).then(function () {
                searchPage.searchButton.click().then(function () {
                    //verify that files view is opened
                    recordHeader.fileNumberRecordHeader.getText().then(function (fileNo) {
                        expect(fileNo.toLowerCase()).toBe(file1.toLowerCase());
                    });
                    //Open file tree and navigate to document level
                    openFileTree();
                    webdriverUtils.showNodeChildrenByText(folder1FVAA, 'folder');
                    webdriverUtils.clickOnNodeInFileTree(document1FVAA, 'document');
                    //verify scroll ability for document level attributes pop-up
                    verifyScrollability();
                });
            });
        });

        it('Information symbol pop-up displayed for page level should not show any attributes', function () {
            searchPage.fileNumberSearchBox.sendKeys(file1).then(function () {
                searchPage.searchButton.click().then(function () {
                    webdriverUtils.showNodeChildrenByText(folder1FVAA, 'folder').then(function () {
                        webdriverUtils.showNodeChildrenByText(document1FVAA , 'document').then(function () {
                            webdriverUtils.clickOnNodeInFileTree(pageFVAA, 'page').then(function () {
                                webdriverUtils.waitTillElementVisible(filesArea.informationSymbol).then(function () {
                                    filesArea.informationSymbol.click().then(function () {
                                        webdriverUtils.waitTillElementVisible(filesArea.informationPopUpHeader).then(function () {
                                            filesArea.informationPopUpHeader.getText().then(function (informationHeaderValue) {
                                                expect(informationHeaderValue).toBe('PAGE ATTRIBUTES');
                                                filesArea.informationPopUpPageAttr.getText().then(function (pageAttr) {
                                                    expect(pageAttr).toBe('No Page Attributes Present');
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
