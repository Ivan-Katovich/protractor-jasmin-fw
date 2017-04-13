
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


describe("URL Search - ID's, names, types, etc. Not Attributes", function () {
    if (browser.params.siteBase == 'iis') {
        beforeEach(function () {
            browser.driver.get(browser.params.defaultUrl);
            browser.sleep(500);
        });
        
        it('Using an existing (not including deleted files) fileId in URL search should open the specified file in the file view', function () {
           // browser.getCurrentUrl().then(function (url) {
                browser.driver.get(browser.params.defaultUrl + '?fileid=28361').then(function () {
                    webdriverUtils.waitTillElementVisible(recordHeader.fileNumberRecordHeader).then(function () {
                        expect(recordHeader.fileNumberRecordHeader.getText()).toBe('ADDFOLDER');
                    });
                });
            //});
        });

        it('Using a negative fileId in URL search should return an error message that no files matched the criteria', function () {
            browser.driver.get(browser.params.defaultUrl + '?fileid=-28361').then(function () {
                    browser.sleep(1000).then(function () {

                        expect(irSearchPage.invalidUrlPopup.getText()).toContain('A file was not found matching the given criteria');
                    });
                });
        });

        it('Using a non-existing (not including deleted files) fileId in URL search should return an error message that no files matched the criteria', function () {
            browser.driver.get(browser.params.defaultUrl + '?fileid=08361').then(function () {
                browser.sleep(1000).then(function () {

                    expect(irSearchPage.invalidUrlPopup.getText()).toContain('A file was not found matching the given criteria');
                });
            });
        });

        it('Using a fileID which matches a deleted file in URL search should present the user with an error message stating that the file they are looking for has been deleted', function () {
                browser.driver.get(browser.params.defaultUrl + '?fileid=28795').then(function () {
                    browser.sleep(1000);
                    expect(irSearchPage.invalidUrlPopup.getText()).toContain('The file in the URL lookup has been deleted');
                });
        });
       
        it('Using the wildcard charater for fileNumber in URL search along with a specified drawer should return a list of all files in the specified drawer in order by file number', function () {
            browser.driver.get(browser.params.defaultUrl + '?fileNumber=%25&drawer=8436').then(function () { //Auto drawer number since only has 8 files
                    webdriverUtils.waitTillElementVisible(irSearchPage.searchResultsHeader).then(function () {
                        expect(irSearchPage.searchResultsHeader.getText()).toBe('File Number of % and In Drawer Auto');
                        expect(irSearchPage.searchGrid.count()).toEqual(8);// according to db
                        irSearchPage.pageCountElement.getText().then(function (text) {
                            expect(text).toEqual('Total Items: 8');
                        });
                        irSearchPage.getAllResultsFromColumnInGrid("Drawer").map(function (gridElement) {
                            gridElement.getText().then(function (drawer) {
                                expect(drawer).toBe('Auto');
                            });
                        });
                        irSearchPage.getAllResultsFromColumnInGrid("File Number").then(function (items) {
                            var promises = [];
                            // var fileNums = [];
                            items.map(function (element) {
                                element.getText().then(function (elmText) {
                                    promises.push(elmText.toLowerCase());
                                });
                            });
                            Q.all(promises).done(function (searchResultsArray) {
                                expect(conversionUtils.isArraySortedDescending(searchResultsArray)).toBe(true);
                            });
                        });
                    });
                });
            });
        
        it('Using a specified unique fileNumber in URL search should open the specified file in the file view', function () {
            browser.driver.get(browser.params.defaultUrl + '?fileNumber=AddFolder').then(function () {
                    webdriverUtils.waitTillElementVisible(recordHeader.fileNumberRecordHeader).then(function () {
                        expect(recordHeader.fileNumberRecordHeader.getText()).toBe('ADDFOLDER');
                        navigationBar.searchIcon.click().then(function () {
                            webdriverUtils.waitTillElementVisible(irSearchPage.searchGrid).then(function () {
                                expect(irSearchPage.searchGrid.count()).toEqual(1);// according to db
                                irSearchPage.pageCountElement.getText().then(function (text) {
                                    expect(text).toEqual('Total Items: 1');
                                });
                                expect(irSearchPage.searchResultsHeader.getText()).toBe('File Number of AddFolder');
                            });
                        });
                    });
                });
            });
        
        it('Using the wildcard character for fileNumber in URL search should return a list of all files in the system ordered by file Number', function () {
            browser.driver.get(browser.params.defaultUrl + '?fileNumber=%25').then(function () {
                    webdriverUtils.waitTillElementVisible(irSearchPage.searchResultsHeader).then(function () {
                        expect(irSearchPage.searchResultsHeader.getText()).toBe('File Number of %');
                        irSearchPage.pageCountElement.getText().then(function (text) {
                            expect(text).toEqual('Total Items: 80');
                        });
                        irSearchPage.getAllResultsFromColumnInGrid("File Number").then(function (items) {
                            var promises = [];
                            // var fileNums = [];
                            items.map(function (element) {
                                element.getText().then(function (elmText) {
                                    promises.push(elmText.toLowerCase());
                                });
                            });
                            Q.all(promises).done(function (searchResultsArray) {
                                expect(conversionUtils.isArraySortedDescending(searchResultsArray)).toBe(true);
                            });
                        });
                    });
                });
        });
        
        it('Using a specified fileNumber and drawer in URL search should return the specified file from the specified drawer', function () {
            browser.driver.get(browser.params.defaultUrl + '?fileNumber=HistoricalNotes&drawer=8436').then(function () {
                    webdriverUtils.waitTillElementVisible(recordHeader.fileNumberRecordHeader).then(function () {
                        expect(recordHeader.fileNumberRecordHeader.getText()).toBe('HISTORICALNOTES');
                        expect(recordHeader.drawerRecordHeader.getText()).toBe('Auto');
                        navigationBar.searchIcon.click().then(function () {
                            webdriverUtils.waitTillElementVisible(irSearchPage.searchGrid).then(function () {
                                expect(irSearchPage.searchGrid.count()).toEqual(1);// according to db
                                irSearchPage.pageCountElement.getText().then(function (text) {
                                    expect(text).toEqual('Total Items: 1');
                                });
                                expect(irSearchPage.searchResultsHeader.getText()).toBe('File Number of HistoricalNotes and In Drawer Auto');
                            });
                        });
                    });
                });
        });

        it('URL search should return the same results no matter the order of the parameters', function () {
            browser.driver.get(browser.params.defaultUrl + '?drawer=8436&fileNumber=HistoricalNotes').then(function () {
                    webdriverUtils.waitTillElementVisible(recordHeader.fileNumberRecordHeader).then(function () {
                        expect(recordHeader.fileNumberRecordHeader.getText()).toBe('HISTORICALNOTES');
                        expect(recordHeader.drawerRecordHeader.getText()).toBe('Auto');
                        navigationBar.searchIcon.click().then(function () {
                            webdriverUtils.waitTillElementVisible(irSearchPage.searchGrid).then(function () {
                                expect(irSearchPage.searchGrid.count()).toEqual(1);// according to db
                                irSearchPage.pageCountElement.getText().then(function (text) {
                                    expect(text).toEqual('Total Items: 1');
                                });
                                expect(irSearchPage.searchResultsHeader.getText()).toBe('File Number of HistoricalNotes and In Drawer Auto');
                            });
                        });
                    });
                });
        });

        it('Specifying the fileType parameter in URL search should return a list of all files whose file type matches that given in order by file number', function () {
            browser.driver.get(browser.params.defaultUrl + '?fileNumber=%25&fileType=125').then(function () { //RenewalPolicy has 5
                    webdriverUtils.waitTillElementVisible(irSearchPage.searchGrid).then(function () {
                        expect(irSearchPage.searchResultsHeader.getText()).toBe('File Number of % and File Type of Renewal Policy');
                        irSearchPage.pageCountElement.getText().then(function (text) {
                            expect(text).toEqual('Total Items: 7');
                        });
                        expect(irSearchPage.searchGrid.count()).toEqual(7);// according to db
                        irSearchPage.getAllResultsFromColumnInGrid("File Type").map(function (gridElement) {
                            gridElement.getText().then(function (type) {
                                expect(type).toBe('Renewal Policy');
                            });
                        });
                        irSearchPage.getAllResultsFromColumnInGrid("File Number").then(function (items) {
                            var promises = [];
                            // var fileNums = [];
                            items.map(function (element) {
                                element.getText().then(function (elmText) {
                                    promises.push(elmText.toLowerCase());
                                });
                            });
                            Q.all(promises).done(function (searchResultsArray) {
                                expect(conversionUtils.isArraySortedDescending(searchResultsArray)).toBe(true);
                            });
                        });
                    });
                });
        });
                
        it('Using a string of characters followed by the wildcard charater for fileNumber in URL search should return a list of all files whose file numbers begin with the given string', function () {
            browser.driver.get(browser.params.defaultUrl + '?fileNumber=n%25').then(function () {
                    webdriverUtils.waitTillElementVisible(irSearchPage.searchResultsHeader).then(function () {
                        // check to e sure that they are all show in this search
                        irSearchPage.searchResultsHeader.getText().then(function (resultsHeader) {
                            expect(resultsHeader).toBe('File Number of n%');
                        });
                        irSearchPage.pageCountElement.getText().then(function (text) {
                            expect(text).toEqual('Total Items: 3');
                        });
                        expect(irSearchPage.searchGrid.count()).toEqual(3);
                        irSearchPage.getAllResultsFromColumnInGrid("File Number").map(function (element) {
                            element.getText().then(function (fileNum) {
                                expect(fileNum.substring(0, 1).toLowerCase()).toBe('n');
                            });
                        });
                    });
                });
        });
                
        it('Using URL lookup of filetype is done without the fileNumber parameter should return a pop-up informing the user that the search was invalid', function () {
            browser.driver.get(browser.params.defaultUrl + '?fileType=125').then(function () {
                    browser.sleep(1000);
                    expect(irSearchPage.invalidUrlPopup).toBeDefined();
                    expect(irSearchPage.invalidUrlPopup.getText()).toContain('This URL lookup is not valid. Please generate a new one');
                });
        });

        it('If a nonexistent fileNumber is specified in the URL search, the search should return 0 files', function () {
            browser.driver.get(browser.params.defaultUrl + '?fileNumber=nonexistentFileNumber').then(function () {
                    browser.sleep(1000);
                    expect(irSearchPage.searchResultsHeader.getText()).toBe('File Number of nonexistentFileNumber');
                    irSearchPage.pageCountElement.getText().then(function (text) {
                        expect(text).toEqual('Total Items: 0');
                    });
                    expect(irSearchPage.searchGrid.count()).toEqual(0);
                });
        });

        it('Using URL lookup of drawer is done without the fileNumber parameter should return a pop-up informing the user that the search was invalid', function () {
            browser.driver.get(browser.params.defaultUrl + '?drawer=352').then(function () {
                    browser.sleep(1000);
                    expect(irSearchPage.invalidUrlPopup).toBeDefined();
                    expect(irSearchPage.invalidUrlPopup.getText()).toContain('This URL lookup is not valid. Please generate a new one');
                });
        });

        //------------------Begin searching Folders----------------------------//

        it('Specifying a folderId for an existing folder in the URL lookup should open the parennt file of the folder and navigate the user to the folder level', function () {
            browser.driver.get(browser.params.defaultUrl + '?folderid=28456').then(function () {
                    webdriverUtils.waitTillElementVisible(irFilesView.fileViewHeader).then(function () {
                        irFilesView.fileViewHeader.getText().then(function (header) {
                            expect(header.toLowerCase()).toContain('folderforimport');
                        });
                        fileTree.selectedPages.getText().then(function (selNodes) {
                            expect(selNodes[0].toLowerCase()).toContain('folderforimport');
                        });
                    });
                });
            });
        
        it('Using a negative value for folderId in the URL lookup should give an error informing no folders were found with the given criteria', function () {
            browser.driver.get(browser.params.defaultUrl + '?folderid=-284563').then(function () {
                    browser.sleep(1000).then(function () {

                        expect(irSearchPage.invalidUrlPopup.getText()).toContain('A folder was not found matching the given criteria');
                    });
                });            
        });

        it('Specifying a folderId for a non-existent folder (not including deleted folders) in the URL lookup should give an error informing no folders were found with the given criteria', function () {
            browser.driver.get(browser.params.defaultUrl + '?folderid=00284563').then(function () {
                browser.sleep(1000).then(function () {

                    expect(irSearchPage.invalidUrlPopup.getText()).toContain('A folder was not found matching the given criteria');
                });
            });
        });


        it('Specifying a folderId for a deleted folder in the URL lookup should give an error informing the folder has been deleted', function () {
            browser.driver.get(browser.params.defaultUrl + '?folderid=29860').then(function () {
                    browser.sleep(1000).then(function () {
                        expect(irSearchPage.invalidUrlPopup.getText()).toContain('The content in the URL lookup has been deleted');
                });
            });
        });
        
        //below scenario covers the fact that our docs and folders are stored in the same table in our db without specifying which is which
        it('Specifying an existing documentId in the folderId parameter field should return an error informing no folders were found with the given criteria', function () {
            browser.driver.get(browser.params.defaultUrl + '?folderid=28406').then(function () {
                    browser.sleep(1000).then(function () {

                        expect(irSearchPage.invalidUrlPopup.getText()).toContain('A folder was not found matching the given criteria');
                    });
                });
        });      

        //-------------------Begin searching Documents--------------------------//

        it('Specifying a non-deleted documentId in the URL search should return the document with the specified id', function () {
            browser.driver.get(browser.params.defaultUrl + '?documentid=28406').then(function () {
                    webdriverUtils.waitTillElementVisible(irFilesView.fileViewHeader).then(function () {
                        irFilesView.fileViewHeader.getText().then(function (header) {
                            expect(header.toLowerCase()).toContain('document2');
                        });
                        fileTree.selectedPages.getText().then(function (selNodes) {
                            expect(selNodes[0].toLowerCase()).toContain('document2');
                        });
                    });
                });            
        });
        
        it('Using a negative value for a documentId in the URL lookup should give an error informing no docs were found with the given criteria', function () {
            browser.driver.get(browser.params.defaultUrl + '?documentid=-284563').then(function () {
                    browser.sleep(1000).then(function () {
                        expect(irSearchPage.invalidUrlPopup.getText()).toContain('A document was not found matching the given criteria.');
                    });
                });
        });

        it('Specifying a documentId for a non-existent document (not including deleted docs) in the URL lookup should give an error informing no docs were found with the given criteria', function () {
            browser.driver.get(browser.params.defaultUrl + '?documentid=00284563').then(function () {
                browser.sleep(1000).then(function () {
                    expect(irSearchPage.invalidUrlPopup.getText()).toContain('A document was not found matching the given criteria.');
                });
            });
        });

        it('Using a documentID which matches a deleted document in URL search should present the user with an error message stating that the content they are looking for has been deleted', function () {
            browser.driver.get(browser.params.defaultUrl + '?documentid=28392').then(function () {
                    browser.sleep(1000);
                    expect(irSearchPage.invalidUrlPopup.getText()).toContain('The content in the URL lookup has been deleted');
                });            
        });                      
        
        //below scenario covers the fact that our docs and folders are stored in the same table in our db without specifying which is which
        it('Specifying an existing folderId in the documentId parameter field should return an error informing no documents were found with the given criteria', function () {
            browser.driver.get(browser.params.defaultUrl + '?documentid=28456').then(function () {
                    browser.sleep(1000).then(function () {

                        expect(irSearchPage.invalidUrlPopup.getText()).toContain('A document was not found matching the given criteria');
                    });
                });            
        });

        //-----------------------Begin page lookup-----------//

        it('Specifying a non-deleted pageid in the URL search should return the page with the specified id', function () {
            //Endorsement DEC inside file a8 has a customer bill amount of 315
            browser.driver.get(browser.params.defaultUrl + '?pageid=213647').then(function () {
                    webdriverUtils.waitTillElementVisible(irFilesView.fileViewHeader).then(function () {
                        irFilesView.fileViewHeader.getText().then(function (header) {
                            expect(header.toLowerCase()).toBe('perro.jpg');
                        });
                        fileTree.selectedPages.getText().then(function (selNodes) {
                            expect(selNodes[0].toLowerCase()).toContain('perro.jpg');
                        });
                    });
                });
        });

        //Separate tests for negative value vs nonexistent value bc treated differently in code - was a defect
        it('Using a negative value for a pageid in the URL lookup should give an error informing no pages were found with the given criteria', function () {
            browser.driver.get(browser.params.defaultUrl + '?pageid=-284563').then(function () {
                    browser.sleep(1000).then(function () {

                        expect(irSearchPage.invalidUrlPopup.getText()).toContain('A page was not found matching the given criteria');
                    });
                });            
        });

        it('Specifying a pageid for a non-existent page (not including deleted pages) in the URL lookup should give an error informing no pages were found with the given criteria', function () {
            browser.driver.get(browser.params.defaultUrl + '?pageid=00284563').then(function () {
                browser.sleep(1000).then(function () {

                    expect(irSearchPage.invalidUrlPopup.getText()).toContain('A page was not found matching the given criteria');
                });
            });
        });

        it('Using a pageID which matches a deleted page in URL search should present the user with an error message stating that the content they are looking for has been deleted', function () {
            browser.driver.get(browser.params.defaultUrl + '?pageid=213725').then(function () {
                    browser.sleep(1000);
                    expect(irSearchPage.invalidUrlPopup.getText()).toContain('The content in the URL lookup has been deleted');
                });            
        });

        it('If URL is reached with key "featureNotSupported" and any value, an error message should display with the value in the message', function () {
            browser.driver.get(browser.params.defaultUrl + '?featureNotSupported=An%20Unsupported%20Feature').then(function () {
                    browser.sleep(1000);
                    expect(irSearchPage.invalidUrlPopup.getText()).toContain('An Unsupported Feature');
                });            
        });
        
    }
});
