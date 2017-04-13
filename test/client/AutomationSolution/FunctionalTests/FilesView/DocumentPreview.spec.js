exports.tags = ['File_Navigation', 'Open_Files'];
var SearchPage = require('../../PageObjects/SearchPage.js');
var Filesview = require('../../PageObjects/FilesView.js');
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var FileTree = require('./../../PageObjects/Containers/FileTree.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var DocumentHeader = require('./../../PageObjects/Containers/DocumentHeader.js');
var ImageView = require('./../../PageObjects/Containers/ImageView.js');

//Making objects of the included pages
var searchPage = new SearchPage();
var navigationBar = new NavigationBar();
var fileTree = new FileTree();
var filesArea = new Filesview();
var documentHeader = new DocumentHeader();
var imageView = new ImageView();

var fileName = 'DocPreview';

var empty = 'Empty doc';
var multiPage = 'Doc with multiple image pages';
var page1 = 'page1.jpg';
var page2 = 'page2.gif';
var multiFrame = 'Doc with multiframe page';
var multiFramePg = 'multi.tiff';
var viewableOffice = 'Doc with viewable office doc page';
var viewOfficePg = 'viewable.doc';
var nonviewOffice = 'Doc with nonviewable office doc page';
var nonviewOfficePg = 'nonviewable.xlsb';
var unsupportedDoc = 'Doc with unsupported page';
var unsupportedPage = 'unsupported.zip';


if (browser.params.siteBase == 'iis') {

    describe('Document Preview', function () {

            beforeEach(function () {
                browser.driver.get(browser.params.defaultUrl).then(function () {
                        webdriverUtils.waitTillElementVisible(navigationBar.searchIcon).then(function () {
                                navigationBar.searchIcon.click().then(function () {
                                        webdriverUtils.waitTillElementVisible(searchPage.fileNameSearchBox).then(function () {
                                                searchPage.fileNameSearchBox.sendKeys(fileName).then(function () {
                                                        searchPage.searchButton.click();
                                                    });
                                            });
                                    });
                            });
                    });
            });

            it('When a user is in a file and has a single document selected, viewer should display doc header with doc name, doc type, number of pages, and actions button', function () {
                    webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                            fileTree.document(0).click().then(function() {
                                    webdriverUtils.waitTillElementVisible(documentHeader.documentTitle).then(function() {
                                            webdriverUtils.waitTillElementVisible(documentHeader.documentType).then(function() {
                                                    expect(
                                                            documentHeader.documentTitle.isDisplayed() &&
                                                            documentHeader.documentType.isDisplayed() &&
                                                            documentHeader.documentNumberOfPages.isDisplayed() &&
                                                            documentHeader.actionButtons.isDisplayed()
                                                        ).toBeTruthy();
                                                });
                                        });
                                });
                        });
                });

            it('When a document without pages has been selected, the viewer should display "Preview not available"', function() {
                    webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function() {
                            fileTree.document(0).click().then(function() {
                                    fileTree.documentByText(empty).click().then(function() {
                                            expect(documentHeader.isDisplayed()).toBeTruthy();
                                            expect(imageView.documentPreviewText.getText())
                                                .toEqual("Preview not available");
                                        });
                                });
                        });
                });

            it('When a document whose first page is an unsupported file type has been selected, the viewer should display "Preview not available"', function() {
                    webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function() {
                            fileTree.document(0).click().then(function() {
                                    fileTree.documentByText(unsupportedDoc).click().then(function() {
                                            expect(documentHeader.isDisplayed()).toBeTruthy();
                                            expect(imageView.documentPreviewText.getText())
                                                .toEqual("Preview not available");
                                        });
                                });
                        });
                });

            it('When a document whose first page is a viewable office type document is selected, viewer should display document view with header panel, ' +
                'a preview of the office document, but no WebDav options', function() {
                    webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function() {
                            fileTree.document(0).click().then(function() {
                                    fileTree.documentByText(viewableOffice).click().then(function() {
                                            webdriverUtils.waitTillElementVisible(documentHeader.documentTitle).then(function() {
                                                    expect(documentHeader.isDisplayed()).toBeTruthy();
                                                    expect(imageView.documentPreviewText.isPresent() && //since prview is present, 'no preview avail' message should not be 
                                                            filesArea.checkOutButton.isPresent() && //no webdav-related buttons
                                                            filesArea.viewOnlyButton.isPresent())
                                                        .toBeFalsy();
                                                });
                                        });
                                });
                        });
                });

            it('When a document whose first page is a non-viewable office type document is selected, viewer should display document view with header panel, ' +
                'but text "Preview not available", and no WebDav options', function() {
                    webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function() {
                            fileTree.document(0).click().then(function() {
                                    fileTree.documentByText(nonviewOffice).click().then(function() {
                                            webdriverUtils.waitTillElementVisible(documentHeader.documentTitle).then(function() {
                                                    expect(documentHeader.isDisplayed()).toBeTruthy();
                                                    expect(imageView.documentPreviewText.getText()).toBe("Preview not available");
                                                    expect(filesArea.checkOutButton.isPresent() && //no webdav-related buttons
                                                            filesArea.viewOnlyButton.isPresent()).toBeFalsy();
                                                });
                                        });
                                });
                        });
                });

        });
}
