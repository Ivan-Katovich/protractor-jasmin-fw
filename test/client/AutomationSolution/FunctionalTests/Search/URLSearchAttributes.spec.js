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


describe("URL Search - Attributes - Encrypted and Unencrypted",
    function() {
        beforeEach(function() {
            browser.driver.get(browser.params.defaultUrl);
        });


        it('Using String fileAttributes which matches a single deleted file in URL search should present the user with an error message stating that the file they are looking for has been deleted',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?fileAttributes=C_name%3dUrlTest')
                    .then(function() {
                        browser.sleep(1000);
                        expect(irSearchPage.invalidUrlPopup.getText())
                            .toContain('The file in the URL lookup has been deleted');
                    });
            });

        it('Using String fileAttributes which matches multiple deleted files in URL search should present the user with an error message stating that the files they are looking for has been deleted',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?fileAttributes=medicalBill%3DTesting123')
                    .then(function() {
                        browser.sleep(1000);
                        expect(irSearchPage.invalidUrlPopup.getText())
                            .toContain('The file in the URL lookup has been deleted');
                    });
            });

        it('Specifying a String file attribute in URL search should return the file whose attribute matches the given String',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?fileattributes=C_name%3DTest4')
                    .then(function() { //1 file with CustomerName = 'Test4'
                        webdriverUtils.waitTillElementVisible(recordHeader.fileNumberRecordHeader)
                            .then(function() {
                                expect(recordHeader.fileNumberRecordHeader.getText())
                                    .toBe('RECORDHEADERWITHFILEMARKS');
                            });
                    });
            });

        it('Specifying an Integer file attribute in URL search should return a file who has that attribute with the matching Integer',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?fileattributes=UserName%3D32')
                    .then(function() {
                        webdriverUtils.waitTillElementVisible(recordHeader.fileNumberRecordHeader)
                            .then(function() {
                                expect(recordHeader.fileNumberRecordHeader.getText())
                                    .toBe('FILEVIEWINGACTIONSATTRIBUTES');
                            });
                    });
            });

        it('Specifying a Boolean file attribute in URL search should return the file who has that attribute checked as true',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?fileattributes=Is%20Agency%3DTrue')
                    .then(function() { //isAgency has 1 file
                        webdriverUtils.waitTillElementVisible(recordHeader.fileNumberRecordHeader)
                            .then(function() {
                                expect(recordHeader.fileNumberRecordHeader.getText())
                                    .toBe('FILEVIEWINGACTIONSATTRIBUTES');
                            });
                    });
            });

        it('Specifying the Date attribute in URL search should return the file withthe given date attribute',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?fileattributes=Date%3D2015-12-08')
                    .then(function() {
                        webdriverUtils.waitTillElementVisible(recordHeader.fileNumberRecordHeader)
                            .then(function() {
                                expect(recordHeader.fileNumberRecordHeader.getText())
                                    .toBe('RECORDHEADERWITHFILEMARKS');
                            });
                    });
            });

        it('Using User folderAttributes which match a single deleted folder in URL search should present the user with an error message stating that the content they are looking for has been deleted',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?folderattributes=username%3D666')
                    .then(function() {
                        browser.sleep(1000);
                        expect(irSearchPage.invalidUrlPopup.getText())
                            .toContain('The content in the URL lookup has been deleted');
                    });
            });

        it('Using User folderAttributes which matches multiple deleted folders in URL search should present the user with an error message stating that the content they are looking for has been deleted',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?folderattributes=username%3D777')
                    .then(function() {
                        browser.sleep(1000);
                        expect(irSearchPage.invalidUrlPopup.getText())
                            .toContain('The content in the URL lookup has been deleted');
                    });
            });

        it('Using User folderAttributes which matches a single non-deleted folder in URL search should should return the folder with the specified attributes',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?folderattributes=username%3D33')
                    .then(function() {
                        webdriverUtils.waitTillElementVisible(irFilesView.fileViewHeader)
                            .then(function() {
                                irFilesView.fileViewHeader.getText()
                                    .then(function(header) {
                                        expect(header.toLowerCase()).toContain('fvaa folder1');
                                        fileTree.selectedPages.getText()
                                            .then(function(selNodes) {
                                                expect(selNodes[0].toLowerCase()).toContain('fvaa folder1');
                                            });
                                    });
                            });
                    });
            });

        it('Using User folderAttributes which match multiple non-deleted  folders in URL search should present the user with an error message stating that the content they are looking for has been deleted',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?folderattributes=username%3D555')
                    .then(function() {
                        browser.sleep(1000)
                            .then(function() {
                                //There are 2 folders inside folderattrsearch file with this attribute, so expect a popup
                                expect(irSearchPage.invalidUrlPopup.getText())
                                    .toContain('More than 1 folder was found for the given criteria. Please refine your search criteria');
                            });
                    });
            });

        it('If a int folderAttribute search matches no folder, should return a pop-up informing user no folder matches criteria',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?folderAttributes=FORM%3D51')
                    .then(function() {
                        browser.sleep(1000);
                        expect(irSearchPage.invalidUrlPopup.getText())
                            .toContain('A folder was not found matching the given criteria');
                    });
            });

        it('Using float documentAttributes which matches a single deleted document in URL search should present the user with an error message stating that the content they are looking for has been deleted',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?documentAttributes=Customer%20Bill%3D666')
                    .then(function() {
                        browser.sleep(1000);
                        expect(irSearchPage.invalidUrlPopup.getText())
                            .toContain('The content in the URL lookup has been deleted');
                    });
            });

        it('Using float documentAttributes which matches multiple deleted documents in URL search should present the user with an error message stating that the content they are looking for has been deleted',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?documentAttributes=Customer%20Bill%3D777')
                    .then(function() {
                        browser.sleep(1000);
                        expect(irSearchPage.invalidUrlPopup.getText())
                            .toContain('The content in the URL lookup has been deleted');
                    });
            });

        it('Using the Float attribute in URL search should return the document with the specified attribute value',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?documentAttributes=Customer%20Bill%3D315')
                    .then(function() {
                        webdriverUtils.waitTillElementVisible(irFilesView.fileViewHeader)
                            .then(function() {
                                irFilesView.fileViewHeader.getText()
                                    .then(function(header) {
                                        expect(header.toLowerCase()).toContain('fvaa document1');
                                    });
                                fileTree.selectedPages.getText()
                                    .then(function(selNodes) {
                                        expect(selNodes[0].toLowerCase()).toContain('fvaa document1');
                                    });
                            });
                    });
            });

        it('Specifying a String attribute in URL search should return the document with the String as the specified attribute',
            function() {
                //billing code of doc not be confused with billing code of folder
                browser.driver.get(browser.params.defaultUrl + '?documentAttributes=C_name%3DTest2')
                    .then(function() {
                        webdriverUtils.waitTillElementVisible(irFilesView.fileViewHeader)
                            .then(function() {
                                irFilesView.fileViewHeader.getText()
                                    .then(function(header) {
                                        expect(header.toLowerCase()).toContain('fvaa document1');
                                    });
                                fileTree.selectedPages.getText()
                                    .then(function(selNodes) {
                                        expect(selNodes[0].toLowerCase()).toContain('fvaa document1');
                                    });
                            });
                    });
            });

        it('Specifying multiple attributes String and float in URL search should return the document with the specified attributes',
            function() {
                //customer name and number
                browser.driver.get(browser.params.defaultUrl +
                        '?documentAttributes=C_name%3DTest2%2CCustomer%20Bill%3D315')
                    .then(function() {
                        webdriverUtils.waitTillElementVisible(irFilesView.fileViewHeader)
                            .then(function() {
                                irFilesView.fileViewHeader.getText()
                                    .then(function(header) {
                                        expect(header.toLowerCase()).toContain('fvaa document1');
                                    });
                                fileTree.selectedPages.getText()
                                    .then(function(selNodes) {
                                        expect(selNodes[0].toLowerCase()).toContain('fvaa document1');
                                    });
                            });
                    });
            });

        it('When multiple documents are found matching the int criteria, a popup should display informing the user of multiple documents',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?documentAttributes=FORM%3D3')
                    .then(function() {
                        browser.sleep(1000)
                            .then(function() {
                                //There are 3 documents with this attribute, so expect a popup

                                expect(irSearchPage.invalidUrlPopup.getText())
                                    .toContain('More than 1 document was found for the given criteria. Please refine your search criteria');
                            });
                    });
            });

        it('If an int docAttribute search matches no document, should return a pop-up informing user no document matches criteria',
            function() { //int
                browser.driver.get(browser.params.defaultUrl + '?documentAttributes=FORM%3D51')
                    .then(function() {
                        browser.sleep(1000);
                        expect(irSearchPage.invalidUrlPopup).toBeDefined();
                        expect(irSearchPage.invalidUrlPopup.getText())
                            .toContain('A document was not found matching the given criteria.');
                    });
            });

        //todo: test what happens when searcing on file attributes returns multiple files

        it('Should be able to search char fileAttributes with a wildcard if attribute is unencrypted',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?fileAttributes=medicalBill%3dTestingEnc%')
                    .then(function() {
                        webdriverUtils.waitTillElementVisible(recordHeader.fileNumberRecordHeader)
                            .then(function() {
                                expect(recordHeader.fileNumberRecordHeader.getText())
                                    .toBe('ENCRYPTIONTESTING');
                            });
                    });
            });

        it('Wildcard character, %, should be treated as a literal character when searching on a char fileAttribute that is encrypted',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?fileAttributes=EncryptedAttr%3dencryptedV%') //there will be an attr called 'encrFileAttr with 1 file with attr value Test
                 .then(function () {
                     expect(irSearchPage.invalidUrlPopup.getText()).toContain('A file was not found matching the given criteria');

                     browser.driver.get(browser.params.defaultUrl + '?fileAttributes=EncryptedAttr%3dencryptedValue')
                     webdriverUtils.waitTillElementVisible(recordHeader.fileNumberRecordHeader)
                            .then(function() {
                                expect(recordHeader.fileNumberRecordHeader.getText())
                                    .toBe('ENCRYPTIONTESTING');
                            });               
                 });
            });

        it('Should be able to search String folderAttributes with a wildcard if attribute is unencrypted',
            function () {
                browser.driver.get(browser.params.defaultUrl + '?folderattributes=UnencryptedAttr%3DUnencryptedFolderA%').then(function () {
                       webdriverUtils.waitTillElementVisible(irFilesView.fileViewHeader)
                           .then(function () {
                               irFilesView.fileViewHeader.getText()
                                   .then(function (header) {
                                       expect(header.toLowerCase()).toBe("encryptionfolder");
                                       fileTree.selectedPages.getText()
                                           .then(function (selNodes) {
                                               expect(selNodes[0].toLowerCase()).toBe('encryptionfolder');
                                           });
                                   });
                           });
                   });

            });

        it('Wildcard character, %, should be treated as a literal character when searching on a char folderAttribute that is encrypted',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?folderattributes=EncryptedAttr%3DEncryptedFold%')
                    .then(function() {
                        expect(irSearchPage.invalidUrlPopup.getText())
                            .toContain('A folder was not found matching the given criteria');
                        browser.driver.get(browser.params.defaultUrl +
                                '?folderattributes=EncryptedAttr%3DEncryptedFolderAttrValue')
                            .then(function() {
                                webdriverUtils.waitTillElementVisible(irFilesView.fileViewHeader)
                                    .then(function() {
                                        irFilesView.fileViewHeader.getText()
                                            .then(function(header) {
                                                expect(header.toLowerCase()).toBe('encryptionfolder');
                                                fileTree.selectedPages.getText()
                                                    .then(function(selNodes) {
                                                        expect(selNodes[0].toLowerCase()).toContain('encryptionfolder');
                                                    });
                                            });
                                    });
                            });
                    });
            });

        it('Should be able to search char documentAttributes with a wildcard if attribute is unencrypted',
            function () {
                //billing code of doc not be confused with billing code of folder
                browser.driver.get(browser.params.defaultUrl + '?documentAttributes=UnencryptedAttr%3dUnencryptedDocAtt%')
                    .then(function () {
                        webdriverUtils.waitTillElementVisible(irFilesView.fileViewHeader)
                            .then(function () {
                                irFilesView.fileViewHeader.getText()
                                    .then(function (header) {
                                        expect(header.toLowerCase()).toContain('encryptiondocument');
                                    });
                                fileTree.selectedPages.getText()
                                    .then(function (selNodes) {
                                        expect(selNodes[0].toLowerCase()).toContain('encryptiondocument');
                                    });
                            });
                    });
            });

        it('Wildcard character, %, should be treated as a literal character when searching on a char document Attribute that is encrypted',
            function() {
                browser.driver.get(browser.params.defaultUrl + '?documentAttributes=EncryptedAttr%3DEncryptedDocAt%')
                    .then(function() {
                        expect(irSearchPage.invalidUrlPopup.getText())
                            .toContain('A document was not found matching the given criteria.');
                        browser.driver.get(browser.params.defaultUrl +
                                '?documentAttributes=EncryptedAttr%3DEncryptedDocAttrValue')
                            .then(function() {
                                webdriverUtils.waitTillElementVisible(irFilesView.fileViewHeader)
                                    .then(function() {
                                        irFilesView.fileViewHeader.getText()
                                            .then(function(header) {
                                                expect(header.toLowerCase()).toContain('encryptiondocument');
                                            });
                                        fileTree.selectedPages.getText()
                                            .then(function(selNodes) {
                                                expect(selNodes[0].toLowerCase()).toContain('encryptiondocument');
                                            });
                                    });
                            });
                    });
            });

    });