exports.tags = ['File_Navigation', 'File_Attributes'];
/**
 * Created by davissc on 9/18/2014.
 */
var recordHeaderElement = require('./../../PageObjects/Containers/RecordHeader.js');
var mockBackend = require('../../lib/mockBackend.js');
var IR_SearchPage = require('../../PageObjects/SearchPage.js');
var mockUtils = require('../../utils/mockUtils.js');
var IR_NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var conversionUtils = require('../../utils/conversionUtils.js');
var IR_OpenFilesDropdown = require('./../../PageObjects/LeftRail/OpenFilesDropdown.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var IR_FileTree = require('../../PageObjects/Containers/FileTree.js');
var LeftRailBar = require('./../../pageObjects/LeftRail/LeftRailBar.js');
//Making objects of the included pages
var recordHeader = new recordHeaderElement();
var searchPage = new IR_SearchPage();
var navigationBar = new IR_NavigationBar();
var openFilesDropdown = new IR_OpenFilesDropdown();
var fileTree = new IR_FileTree();
var leftRailBar = new LeftRailBar();

//First - get the scenario data you need and store it locally
var data = {
    attributes: '',
    drawer: '',
    fileMarks: '',
    fileName: '%25',
    fileNumber: '',
    fileType: ''
};

//Get data for route scenario
/* mock tests should be moved to frontend folder
var mock = mockBackend([
    {
        testRoute: 'api/files/find',
        testScenarios: [0, 1, 2, 3],
        testData: data,
        testMethod: 'POST'
    },
    {
        testRoute: 'MetadataInfoPane/GetFileInfoPaneData',
        testScenarios: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        testData: '',
        testMethod: 'GET'
    }
]);
 */
var file = "RecordHeaderWithFileMarks";
var file2 = "RecordHeader OneMark";
var file3 = "RecordHeader No Marks";
var fileSingleDigit = '1';
var fileDoubleDigit = '22';
var fileMultiDigit = '4444';
var fileNoName = "RH NoName"

describe("Record  Header :# ", function () {


    beforeEach(function () {
        if (browser.params.siteBase == 'iis') {
            browser.driver.get(browser.params.defaultUrl);
            webdriverUtils.waitTillElementPresent(navigationBar.searchIcon).then(function () {
                navigationBar.searchIcon.click().then(function() {
                    webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox).then(function () {
                        searchPage.fileNameSearchBox.clear().then(function () {
                            //search with a file which will return only 1 file and it should redirect to Files view
                            searchPage.fileNameSearchBox.sendKeys(file).then(function () {
                                searchPage.searchButton.click();
                            });
                        });
                    });
                });
            });
        }
    });


    it('If user has a file open, the record header will display the badge, filetype,filename , filenumber, drawer, and associated File Marks)', function () {
        /*
        if (browser.params.siteBase == 'node') {
            mockUtils.createMockData(mockBackend, 'api/files/find', 1, 'POST');
            mockUtils.createMockData(mockBackend, 'MetadataInfoPane/GetFileInfoPaneData', 16, 'GET');
            navigationBar.searchIcon.click();
            browser.sleep(500);
        }
        */
        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {

            //Get the file Name value from UI
            recordHeader.fileNameRecordHeader.getText().then(function (fileName) {
                //verify that fileName 
                expect(fileName.toLowerCase()).toBe(file.toLowerCase());
            });

            //Get the badge value from UI
            recordHeader.getBadgeInfo.getText().then(function (badge) {
                //verify that badge
                console.log('badge info text: ', badge);
                expect(badge.toLowerCase()).toBe('rs');
            });

            //Get File number from UI
            recordHeader.fileNumberRecordHeader.getText().then(function (fileNumber) {
                //Verify that fileNumber
                expect(fileNumber.toLowerCase()).toEqual(file.toLowerCase());
            });

            //Get the fileType value from UI
            recordHeader.fileTypeRecordHeader.getText().then(function (fileType) {
                //validate the fileType
                expect(fileType).toEqual('Events');
            });

            //Get the drawer value from the UI
            recordHeader.drawerRecordHeader.getText().then(function (drawerName) {
                //validate the value of drawer
                expect(drawerName).toEqual('Underwriting Drawer');
            });

            //---------------------Filemark related verification -----------------------------------//
            var expectedFileMarks = ['Blue File Mark', 'Green', 'Red', 'Magenta', 'Gray', 'Yellow'],
                expectedOutsideColors = ['background-color: rgb(0, 0, 255);', 'background-color: rgb(0, 255, 0);', 'background-color: rgb(192, 0, 0);', 'background-color: rgb(255, 0, 255);'],
                expectedColors = ['background-color: rgb(0, 0, 255);', 'background-color: rgb(0, 255, 0);', 'background-color: rgb(192, 0, 0);', 'background-color: rgb(255, 0, 255);', 'background-color: rgb(128, 128, 128);', 'background-color: rgb(255, 255, 0);'];//, '', '']; //:last 2 are icons ; 

            //verify that outside colors are as per expected or not
            //Get the outside colors  values
            var fileMarksOutsideColors = recordHeader.fileMarksOutSideElements.map(function (fm) {
                return fm.getAttribute('style');
            });
            //verify below
            fileMarksOutsideColors.then(function (fmOutsideColors) {
                expect(conversionUtils.isArraysEquivalent(fmOutsideColors, expectedOutsideColors)).toBe(true);
            });


            //Verify that fileMarks dropdown is  displayed  
            expect(recordHeader.fileMarksDropdown.isPresent()).toBe(true);

            //CLick on filemarks dropdown
            recordHeader.fileMarksDropdown.click().then(function () {
                //Get the all filemarks values from the UI and store it in an array
                var fileMarksOnUi = recordHeader.fileMarksAllElementsList.map(function (fileMark) {
                    return fileMark.getAttribute('title');
                });

                //Verify that actual and expected are equal or not
                fileMarksOnUi.then(function (fileMarkValue) {
                    expect(conversionUtils.isArraysEquivalent(fileMarkValue, expectedFileMarks)).toBe(true);
                });

                //Get the all filemarks colors from the UI and store it in an array
                var fileMarksColors = recordHeader.fileMarksAllElementsList.map(function (fileMark) {
                    return fileMark.getAttribute('style');
                });

                //Verify that colors  inside dropdown match with expectation
                fileMarksColors.then(function (colors) {
                    expect(conversionUtils.isArraysEquivalent(colors, expectedColors)).toBe(true);
                });

            });
        });
    });

    
    if (browser.params.siteBase == 'iis') {
        it('If there are different files(for e.g., 2 files in this case) opened and a user is switching between them,than it(record-header) should update associated badge,filename,filenumber,drawer,file type,attributes and filemarks according to opened file', function () {
            webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
                navigationBar.searchIcon.click().then(function () {
                    webdriverUtils.waitTillElementVisible(searchPage.clearResultsButton).then(function () {
                        searchPage.clearResultsButton.click().then(function () {
                            webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox).then(function () {
                                searchPage.fileNameSearchBox.clear().then(function () {
                                    searchPage.fileNameSearchBox.sendKeys(file2).then(function () {
                                        searchPage.searchButton.click().then(function () {
                                            //open files dropdown for the first file
                                            leftRailBar.openFilesDropdown.click().then(function () {
                                                //navigate to first opened file and verify recordheader
                                                webdriverUtils.clickOnElement(openFilesDropdown.openFileRecord(1)).then(function () {
                                                    webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
                                                        //verify file number
                                                        recordHeader.fileNumberRecordHeader.getText().then(function (f_no) {
                                                            expect(f_no.toLowerCase()).toBe(file.toLowerCase());
                                                        });

                                                        //Get the file Name value from UI
                                                        recordHeader.fileNameRecordHeader.getText().then(function (fileName) {
                                                            //verify that fileName
                                                            expect(fileName.toLowerCase()).toBe(file.toLocaleLowerCase());
                                                        });

                                                        //Get the badge value from UI
                                                        recordHeader.getBadgeInfo.getText().then(function (badge) {
                                                            //verify that badge
                                                            expect(badge.toLowerCase()).toBe('ro');
                                                        });

                                                        //Get the fileType value from UI
                                                        recordHeader.fileTypeRecordHeader.getText().then(function (fileType) {
                                                            //validate the fileType
                                                            expect(fileType).toEqual('Events');
                                                        });

                                                        //Get the drawer value from the UI
                                                        recordHeader.drawerRecordHeader.getText().then(function (drawerName) {
                                                            //validate the value of drawer
                                                            expect(drawerName).toEqual('Underwriting Drawer');
                                                        });

                                                        //---------------------Filemark related verification -----------------------------------//
                                                        var expectedFileMarks = ['Blue File Mark', 'Green', 'Red', 'Magenta', 'Gray', 'Yellow'],
                                                            expectedOutsideColors = ['background-color: rgb(0, 0, 255);', 'background-color: rgb(0, 255, 0);', 'background-color: rgb(192, 0, 0);', 'background-color: rgb(255, 0, 255);'],
                                                            expectedColors = ['background-color: rgb(0, 0, 255);', 'background-color: rgb(0, 255, 0);', 'background-color: rgb(192, 0, 0);', 'background-color: rgb(255, 0, 255);', 'background-color: rgb(128, 128, 128);', 'background-color: rgb(255, 255, 0);'];

                                                        //verify that outside colors are as per expected or not
                                                        //Get the outside colors  values
                                                        var fileMarksOutsideColors = recordHeader.fileMarksOutSideElements.map(function (fm) {
                                                            return fm.getAttribute('style');
                                                        });
                                                        //verify below
                                                        fileMarksOutsideColors.then(function (fmOutsideColors) {
                                                            expect(conversionUtils.isArraysEquivalent(fmOutsideColors, expectedOutsideColors)).toBe(true);
                                                        });


                                                        //Verify that fileMarks dropdown is  displayed
                                                        expect(recordHeader.fileMarksDropdown.isPresent()).toBe(true);

                                                        //CLick on filemarks dropdown
                                                        recordHeader.fileMarksDropdown.click().then(function () {
                                                            //Get the all filemarks values from the UI and store it in an array
                                                            var fileMarksOnUi = recordHeader.fileMarksAllElementsList.map(function (fileMark) {
                                                                return fileMark.getAttribute('title');
                                                            });

                                                            //Verify that actual and expected are equal or not
                                                            fileMarksOnUi.then(function (fileMarkValue) {
                                                                expect(conversionUtils.isArraysEquivalent(fileMarkValue, expectedFileMarks)).toBe(true);
                                                            });

                                                            //Get the all filemarks colors from the UI and store it in an array
                                                            var fileMarksColors = recordHeader.fileMarksAllElementsList.map(function (fileMark) {
                                                                return fileMark.getAttribute('style');
                                                            });

                                                            //Verify that colors  inside dropdown match with expectation
                                                            fileMarksColors.then(function (colors) {
                                                                expect(conversionUtils.isArraysEquivalent(colors, expectedColors)).toBe(true);
                                                            });

                                                        });

                                                    }); //open first file and verify the record header completed
                                                });
                                                //open files dropdown for the first file completed
                                                //open files dropdown for second file begins
                                                leftRailBar.openFilesDropdown.click().then(function () {
                                                    //Firefox click
                                                    webdriverUtils.clickOnElement(openFilesDropdown.openFileRecord(1)).then(function () {
                                                        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {

                                                            //navigate to Second opened file and verify recordheader
                                                            //verify badge info
                                                            recordHeader.getBadgeInfo.getText().then(function (badge) {
                                                                expect(badge.toLowerCase()).toBe('ro');
                                                            });

                                                            //verify the file number
                                                            recordHeader.fileNumberRecordHeader.getText().then(function (fNo) {
                                                                expect(fNo.toLowerCase()).toBe(file2.toLowerCase());
                                                            });

                                                            //verify the file name
                                                            recordHeader.fileNameRecordHeader.getText().then(function (fName) {
                                                                expect(fName.toLowerCase()).toBe(file2.toLowerCase());
                                                            });

                                                            //verify the drawer name
                                                            recordHeader.drawerRecordHeader.getText().then(function (drawer) {
                                                                expect(drawer).toBe('Human Resource');
                                                            });

                                                            //verify the file type
                                                            recordHeader.fileTypeRecordHeader.getText().then(function (fType) {
                                                                expect(fType).toBe('P&C PL');
                                                            });

                                                            ////File marks related verification////////
                                                            //Verify that fileMarks dropdown is not displayed 
                                                            expect(recordHeader.fileMarksDropdown.isPresent()).toBe(false);

                                                            //Store all the expected values
                                                            var expectedFileMarksColors = ['background-color: rgb(0, 255, 0);'], expectedFileMarkTitles = ['Green'];
                                                            //Get the outside colors  values
                                                            var fileMarksColors = recordHeader.fileMarksOutSideElements.map(function (fm) {
                                                                return fm.getAttribute('style');
                                                            });

                                                            // fileMarks colors Verification
                                                            fileMarksColors.then(function (fileMarks) {
                                                                expect(conversionUtils.isArraysEquivalent(fileMarks, expectedFileMarksColors)).toBe(true);
                                                            });

                                                            //Get the name of the fileMarks
                                                            var fileMarksName = recordHeader.fileMarksOutSideElements.map(function (fm) {
                                                                return fm.getAttribute('title');
                                                            });

                                                            //Verify all the titles
                                                            fileMarksName.then(function (fmtitles) {
                                                                expect(conversionUtils.isArraysEquivalent(fmtitles, expectedFileMarkTitles)).toBe(true);
                                                            });
                                                        }); //Open second file completed
                                                    });
                                                    //open files dropdown for second file completed
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
    }

    
    it('If a user opens a file which has more than 4 filemarks, the record header file marks dropdown arrow should be downwards', function () {
        /*if (browser.params.siteBase == 'node') {
            mockUtils.createMockData(mockBackend, 'api/files/find', 1, 'POST');
            mockUtils.createMockData(mockBackend, '/MetadataInfoPane/GetFileInfoPaneData', 16, 'GET');
            navigationBar.searchIcon.click();
            browser.sleep(500);
        }*/
        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
            expect(recordHeader.fileMarksDropdownDownArrow.isDisplayed()).toBe(true);
        });
    });

    it('If user has a file open with less than 4 File Mark on the file, the filemarks are displayed without dropdown ', function () {
     /*   if (browser.params.siteBase == 'node') {
            mockUtils.createMockData(mockBackend, 'api/files/find', 1, 'POST');
            mockUtils.createMockData(mockBackend, '/MetadataInfoPane/GetFileInfoPaneData', 17, 'GET');
            navigationBar.searchIcon.click();
            browser.sleep(500);
        } */

        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
            navigationBar.searchIcon.click().then(function () {
                webdriverUtils.waitTillElementVisible(searchPage.clearResultsButton).then(function () {
                    searchPage.clearResultsButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox).then(function () {
                            searchPage.fileNameSearchBox.clear().then(function () {
                                searchPage.fileNameSearchBox.sendKeys(file2).then(function () {
                                    searchPage.searchButton.click().then(function () {
                                        webdriverUtils.waitTillElementPresent(recordHeader.closeFileButton).then(function () {

                                            //Verify that fileMarks dropdown is not displayed 
                                            expect(recordHeader.fileMarksDropdown.isPresent()).toBe(false);

                                            //Store all the expected values
                                            var expectedFileMarksColors = ['background-color: rgb(0, 255, 0);'], expectedFileMarkTitles = ['Green'];
                                            //Get the outside colors  values
                                            var fileMarksColors = recordHeader.fileMarksOutSideElements.map(function (fm) {
                                                return fm.getAttribute('style');
                                            });

                                            // fileMarks colors Verification
                                            fileMarksColors.then(function (fileMarks) {
                                                expect(conversionUtils.isArraysEquivalent(fileMarks, expectedFileMarksColors)).toBe(true);
                                            });

                                            //Get the name of the fileMarks
                                            var fileMarksName = recordHeader.fileMarksOutSideElements.map(function (fm) {
                                                return fm.getAttribute('title');
                                            });

                                            //Verify all the titles
                                            fileMarksName.then(function (fmtitles) {
                                                expect(conversionUtils.isArraysEquivalent(fmtitles, expectedFileMarkTitles)).toBe(true);
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

    it('If user has a file open with 0 filemarks associated with that file,no filemarks should be displayed.', function () {
     /*   if (browser.params.siteBase == 'node') {
            mockUtils.createMockData(mockBackend, 'api/files/find', 1, 'POST');
            mockUtils.createMockData(mockBackend, '/MetadataInfoPane/GetFileInfoPaneData', 18, 'GET');
            navigationBar.searchIcon.click();
            browser.sleep(500);
        } */

        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
            navigationBar.searchIcon.click().then(function () {
                webdriverUtils.waitTillElementVisible(searchPage.clearResultsButton).then(function () {
                    searchPage.clearResultsButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox).then(function () {
                            searchPage.fileNameSearchBox.clear().then(function () {
                                searchPage.fileNameSearchBox.sendKeys(file3).then(function () {
                                    searchPage.searchButton.click().then(function () {
                                        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
                                            expect(recordHeader.fileMarkLabel.isPresent()).toBe(false);
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

    it('If user has a file open, selecting the badge icon will display all attributes available for the file.', function () {
       /* if (browser.params.siteBase == 'node') {
            mockUtils.createMockData(mockBackend, 'api/files/find', 1, 'POST');
            mockUtils.createMockData(mockBackend, '/MetadataInfoPane/GetFileInfoPaneData', 16, 'GET');
            navigationBar.searchIcon.click();
            browser.sleep(500);
        } */

        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
            //Click on file attributes symbol
            webdriverUtils.clickOnElement(recordHeader.getBadgeInfo).then(function () {
                //Verify that the header information of the pop-up
                recordHeader.fileAttributePopupHeaderElement.getText().then(function (headerValue) {
                    expect(headerValue).toBe('FILE ATTRIBUTES');
                });

                //verify that all the attributes are actually displayed in the pop-up
                recordHeader.fileAttributesList.map(function (attr) {
                    var flag = "badge pop-up empty";
                    if (attr.isDisplayed()) {
                        flag = "badge pop-up not empty";
                    }
                    expect(flag).toBe("badge pop-up not empty");
                });

                var expectedAttrNames = ['BILLING CODE:', 'DATE OF BILL:', 'USERNAME:', 'ISAGENCY:', 'CUSTOMERNO:', 'CUSTOMERNAME:'],
                    expectedAttrValues = ['TFS', '12/8/2015 12:00:00 AM', 'zhaoje', 'False', '780', 'Test4'];


                //Get the actual attributes names from UI and save it to the variable
                var actualAttrNames = recordHeader.fileAttributesNameList.map(function (elem) {
                    return elem.getText();
                });

                //Verify all the attributes names one by one
                actualAttrNames.then(function (names) {
                    expect(conversionUtils.isArraysEquivalent(expectedAttrNames, names)).toBe(true);
                });

                //Verify that number of li tags and names and values are same
                recordHeader.fileAttributesList.count().then(function (liTagsCount) {
                    recordHeader.fileAttributesNameList.count().then(function (attrNameCount) {
                        recordHeader.fileAttributesValueList.count().then(function (attrValueCount) {
                            expect(liTagsCount).toEqual(attrNameCount);
                            expect(liTagsCount).toEqual(attrValueCount);
                            expect(attrNameCount).toEqual(attrValueCount);
                        });
                    });
                });

                //Get the actual attributes values from UI and save it to the variable
                var actualAttrValues = recordHeader.fileAttributesValueList.map(function (elem) {
                    return elem.getText();
                });

                //Verify all the attributes values one by one
                actualAttrValues.then(function (attrVal) {
                    expect(conversionUtils.isArraysEquivalent(expectedAttrValues, attrVal)).toBe(true);
                });
            });
        });
    });
   
    //----------------------------------------- Below are all the file info. Badge Logic scenarios---------------------------------------
    //------------------------------------------------------------------------------------------------------------------


    it('If File Name has more than two words[for e.g.,Test File Name], the badge displays [for e.g., TF]the first character of the first word and the first character of the second word in the name. ', function () {

  /*      if (browser.params.siteBase == 'node') {
            mockUtils.createMockData(mockBackend, 'api/files/find', 1, 'POST');
            mockUtils.createMockData(mockBackend, '/MetadataInfoPane/GetFileInfoPaneData', 5, 'GET');
            navigationBar.searchIcon.click();
            browser.sleep(500);
        } */

        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
            navigationBar.searchIcon.click().then(function () {
                webdriverUtils.waitTillElementVisible(searchPage.clearResultsButton).then(function () {
                    searchPage.clearResultsButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox).then(function () {
                            searchPage.fileNameSearchBox.clear().then(function () {
                                searchPage.fileNameSearchBox.sendKeys(file3).then(function () {
                                    searchPage.searchButton.click().then(function () {
                                        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {

                                            //Verify badge name
                                            expect(recordHeader.getBadgeInfo.getText()).toBe('RN');

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

    it('If File Name has two words[for e.g., Auto insurance], badge displays[for e.g., AI ] first character of the first word and the first character of the second word in the name. ', function () {
        /*
        if (browser.params.siteBase == 'node') {
            mockUtils.createMockData(mockBackend, 'api/files/find', 1, 'POST');
            mockUtils.createMockData(mockBackend, '/MetadataInfoPane/GetFileInfoPaneData', 6, 'GET');
            navigationBar.searchIcon.click();
            browser.sleep(500);
        } */
        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
            navigationBar.searchIcon.click().then(function () {
                webdriverUtils.waitTillElementVisible(searchPage.clearResultsButton).then(function () {
                    searchPage.clearResultsButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox).then(function () {
                            searchPage.fileNameSearchBox.clear().then(function () {
                                searchPage.fileNameSearchBox.sendKeys(file2).then(function () {
                                    searchPage.searchButton.click().then(function () {
                                        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
                                            expect(recordHeader.getBadgeInfo.getText()).toBe('RO');
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

    it('If File Name has one word[for e.g.,Auto] with NO digits in it; badge displays[for e.g., AO] first  and last letter of the word in filename. ', function () {
        /*
        if (browser.params.siteBase == 'node') {
            mockUtils.createMockData(mockBackend, 'api/files/find', 1, 'POST');
            mockUtils.createMockData(mockBackend, '/MetadataInfoPane/GetFileInfoPaneData', 7, 'GET');
            navigationBar.searchIcon.click();
            browser.sleep(500);
        } */
        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
            navigationBar.searchIcon.click().then(function () {
                webdriverUtils.waitTillElementVisible(searchPage.clearResultsButton).then(function () {
                    searchPage.clearResultsButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox).then(function () {
                            searchPage.fileNameSearchBox.clear().then(function () {
                                searchPage.fileNameSearchBox.sendKeys(file).then(function () {
                                    searchPage.searchButton.click().then(function () {
                                        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
                                            //Verify badge name
                                            expect(recordHeader.getBadgeInfo.getText()).toBe('RS');
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

    it('If File Name is a single digit, badge displays the number', function () {
        /*
        if (browser.params.siteBase == 'node') {
            mockUtils.createMockData(mockBackend, 'api/files/find', 1, 'POST');
            mockUtils.createMockData(mockBackend, '/MetadataInfoPane/GetFileInfoPaneData', 8, 'GET');
            navigationBar.searchIcon.click();
            browser.sleep(500);
        } */
        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
            navigationBar.searchIcon.click().then(function () {
                webdriverUtils.waitTillElementVisible(searchPage.clearResultsButton).then(function () {
                    searchPage.clearResultsButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox).then(function () {
                            searchPage.fileNameSearchBox.clear().then(function () {
                                searchPage.fileNameSearchBox.sendKeys(fileSingleDigit).then(function () {
                                    searchPage.searchButton.click().then(function () {
                                        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
                                            //Verify badge name
                                            expect(recordHeader.getBadgeInfo.getText()).toBe(fileSingleDigit);
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

    it('If File Name is a single number with 2 digits, badge displays both digits', function () {
        /*

        if (browser.params.siteBase == 'node') {
            mockUtils.createMockData(mockBackend, 'api/files/find', 1, 'POST');
            mockUtils.createMockData(mockBackend, '/MetadataInfoPane/GetFileInfoPaneData', 9, 'GET');
            navigationBar.searchIcon.click();
            browser.sleep(500);
        } */
        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
            navigationBar.searchIcon.click().then(function () {
                webdriverUtils.waitTillElementVisible(searchPage.clearResultsButton).then(function () {
                    searchPage.clearResultsButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox).then(function () {
                            searchPage.fileNameSearchBox.clear().then(function () {
                                searchPage.fileNameSearchBox.sendKeys(fileDoubleDigit).then(function () {
                                    searchPage.searchButton.click().then(function () {
                                        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
                                            expect(recordHeader.getBadgeInfo.getText()).toBe(fileDoubleDigit);
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

    it('If File Name is a single number with 3 or more digits, the badge displays the # sign and the first number for the badge...Example: 5612 = #5', function () {
        /*
        if (browser.params.siteBase == 'node') {
            mockUtils.createMockData(mockBackend, 'api/files/find', 1, 'POST');
            mockUtils.createMockData(mockBackend, '/MetadataInfoPane/GetFileInfoPaneData', 10, 'GET');
            navigationBar.searchIcon.click();
            browser.sleep(500);
        } */
        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
            navigationBar.searchIcon.click().then(function () {
                webdriverUtils.waitTillElementVisible(searchPage.clearResultsButton).then(function () {
                    searchPage.clearResultsButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox).then(function () {
                            searchPage.fileNameSearchBox.clear().then(function () {
                                searchPage.fileNameSearchBox.sendKeys(fileMultiDigit).then(function () {
                                    searchPage.searchButton.click().then(function () {
                                        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
                                            expect(recordHeader.getBadgeInfo.getText()).toBe('#4');
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

    it('If File Name is blank but File Number(for e.g.,Nirma ltd) is not blank, the badge displays(for e.g., NL)  2 characters with the same logic using file number. ', function () {
        /*
        if (browser.params.siteBase == 'node') {
            mockUtils.createMockData(mockBackend, 'api/files/find', 1, 'POST');
            mockUtils.createMockData(mockRHRHgggnnnBackend, '/MetadataInfoPane/GetFileInfoPaneData', 11, 'GET');
            navigationBar.searchIcon.click();
            browser.sleep(500);
        } */
        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
            navigationBar.searchIcon.click().then(function () {
                webdriverUtils.waitTillElementVisible(searchPage.clearResultsButton).then(function () {
                    searchPage.clearResultsButton.click().then(function () {
                        webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox).then(function () {
                            searchPage.fileNameSearchBox.clear().then(function () {
                                searchPage.fileNumberSearchBox.sendKeys(fileNoName).then(function () {
                                    searchPage.searchButton.click().then(function () {
                                        webdriverUtils.waitTillElementVisible(recordHeader.closeFileButton).then(function () {
                                            expect(recordHeader.getBadgeInfo.getText()).toBe('RN');
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