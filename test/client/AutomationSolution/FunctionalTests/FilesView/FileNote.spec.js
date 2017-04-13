exports.tags = ['File_Manipulation', 'File_Notes'];

var recordHeaderElement = require('./../../PageObjects/Containers/RecordHeader.js');
var SearchPage = require('../../PageObjects/SearchPage.js');
var filesview = require('../../PageObjects/FilesView.js');
var NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var FileTree = require('./../../PageObjects/Containers/FileTree.js');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var tasksUtils = require('../../utils/tasksUtils.js');
var NoteEditorModal = require('../../PageObjects/ModalDialogs/NoteEditorModal.js');
var ErrorMessage = require('./../../PageObjects/ModalDialogs/ErrorMessage.js');
var searchUtil = require('../../BusinessProcess/Search.js');

var recordHeader = new recordHeaderElement();
var searchPage = new SearchPage();
var navigationBar = new NavigationBar();
var fileTree = new FileTree();
var filesArea = new filesview();
var noteEditorModal = new NoteEditorModal();
var errorMessage = new ErrorMessage();

var emptyNoteErrorMessage = "A Note can not be empty. Please enter the text to add to the Note.";
var notSupportedNoteErrorMessage = "Notes are not allowed on this file or folder.";
var fileToAddNote = "FileNotesTesting";
var folderToAddNote = "Folder for notes";
var driver = browser.driver;
var noNotesMessageFile = 'No notes available';
var noNotesMessageFolder = noNotesMessageFile;

var file1 = 'FileNotesPresent';
var file2 = 'NoFileNotes';
var file3 = 'OneFileNote';
var file4 = 'AddFileNotes';
var file5 = 'FileNotesNotAllowed';
var folder1 = 'Folder1';


describe('File view - File and folder notes', function () {

    beforeEach(function () {
        
            browser.driver.get(browser.params.defaultUrl)
            .then(navigationBar.searchIcon.click);
    });

    afterAll(function() {
        return tasksUtils.deleteFilerNote(fileToAddNote);
    });

    function verifyNotesContets(expectedNoteContents) {
        return filesArea.fileViewAllNotesText.map(function (note) {
            return note.getText();
        })
        .then(function (notes) {
            return expect(notes).toEqual(expectedNoteContents);
        });
    }

    function verifyNoNotesMessage(expectedMessage) {
        return expect(filesArea.noNotesMessage).toEqual(expectedMessage);
    }

    function addNote(note, fn) {
        return filesArea.addNoteButton.click()
        .then(function () {
            return noteEditorModal.textEditor.waitReady();
        })
        .then(function () {
            return browser.sleep(5000);
        })
        .then(function () {
            return browser.actions().sendKeys(note).perform();
        })
        .then(noteEditorModal.buttonAddNotes.click)
        .then(function () {
            return browser.waitForAngular();
        });
    }

    function checkDateAndUserOfAddedNote(noteIndex) {
        var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
            dateObj = new Date(),
            user = browser.params.defaultFullName,
            dateUserTemplate = monthNames[dateObj.getMonth()] + " " + dateObj.getDate() + ", " + dateObj.getFullYear() + "- " + user;

        return filesArea.dateAndUserOfAddedNote(noteIndex)
        .then(function (dateUserHeader) {
            var dateAndUserWithoutTime = dateUserHeader.substring(0, 12) + '- ' + dateUserHeader.substring(dateUserHeader.length - 9, dateUserHeader.length);
            return expect(dateAndUserWithoutTime).toContain(dateUserTemplate);
        });
    }

    if (browser.params.siteBase == 'iis') {

        it('1-When a user opens a file(first time) and is highlighted to a file level (by default) , "NOTES " will be displayed in notes header and associated File notes will be displayed in the file viewer area', function () {
            return searchPage.fileNumberSearchBox.sendKeys(file3)
            .then(searchPage.searchButton.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(filesArea.fileViewNotesHeaderForOpenedFile()).toEqual('NOTES');
            })
            .then(function () {
                var expectedNotes = ['File Note One'];
                return verifyNotesContets(expectedNotes);
            });
        });

        it('2-When a user navigates to a folder in filetree ,"NOTES " will be displayed in notes header and  associated folder notes will be displayed in the file viewer area', function () {
            return searchPage.fileNumberSearchBox.sendKeys(file3)
            .then(searchPage.searchButton.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree(folder1, 'folder');
            })
            .then(function () {
                return expect(filesArea.fileViewNotesHeaderForOpenedFile()).toEqual('NOTES');
            })
            .then(function () {
                var expectedNotes = ['Folder1 Note'];
                return verifyNotesContets(expectedNotes);
            });
        });

        it('3-When a user opens a file and there are no file notes associated with the opened file,"NO FILE NOTES AVAILABLE" message will be displayed', function () {
            return searchPage.fileNumberSearchBox.sendKeys(file2)
            .then(searchPage.searchButton.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return verifyNoNotesMessage(noNotesMessageFile);
            })
            .then(function () {
                return verifyNotesContets([ ]);
            });
        });

        it('4-When a user has a file open and he is at a folder (in filetree) which has not any associated notes,"NO FOLDER NOTES AVAILABLE" message will display', function () {
            return searchPage.fileNumberSearchBox.sendKeys(file2)
            .then(searchPage.searchButton.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree(folder1, 'folder');
            })
            .then(function(){
                return verifyNoNotesMessage(noNotesMessageFolder);
            })
            .then(function () {
                return verifyNotesContets([ ]);
            });
        });

        it('5-When a user opens a file and there are several file notes associated with it, then user should be able to see all of them and the last added note will be in the top', function () {
            return searchPage.fileNumberSearchBox.sendKeys(file1)
            .then(searchPage.searchButton.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return filesArea.fileViewAllNotesText.count()
            })
            .then(function (count) {
                return expect(count).toBeGreaterThan(1);
            })
            .then(function() {
                return filesArea.fileViewAllNotesText.get(0).getText();
            })
            .then(function (notesContents) {
                return expect(notesContents).toEqual("Note Two");
            })
            .then(function(){
                return filesArea.fileViewAllNotesText.get(1).getText();   
            })
            .then(function (notesContents) {
                return expect(notesContents).toEqual("Note One");
            });
        });

        it('6-When a user opens a file on the folder level and there are several folder notes associated with it, then user should be able to see all of them and the last added note will be in the top', function () {
            return searchPage.fileNumberSearchBox.sendKeys(file1)
            .then(searchPage.searchButton.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree(folder1, 'folder');
            })
            .then(function () {
                return filesArea.fileViewAllNotesText.count();
            })
            .then(function (count) {
                return expect(count).toBeGreaterThan(1);
            })
            .then(function () {
                return filesArea.fileViewAllNotesText.get(0).getText().then(function (notesContents) {
                    return expect(notesContents).toEqual('Folder1 Second Note');
                });
            })
            .then(function () {
                return filesArea.fileViewAllNotesText.get(1).getText().then(function (notesContents) {
                    return expect(notesContents).toEqual("Folder1 Note");
                });
            });
        });

        it("7-If the user is on a file level and clicks on 'Add notes' button the 'Note editor modal' should be open with today's date in the title", function () {
            return searchPage.fileNumberSearchBox.sendKeys(file1)
            .then(searchPage.searchButton.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return filesArea.fileViewHeader.getText().then(function (fileName) {
                    return expect(fileName.toLowerCase()).toEqual(file1.toLowerCase());
                })
            })
            .then(filesArea.addNoteButton.click)
            .then(function () {
                return noteEditorModal.title.then(function (title) {
                    return expect(title).toEqual(conversionUtils.getDate(new Date()));
                });
            });
        });

        it("8-If the user attempts to add an empty notes on a file level the appropriate error message should be displayed", function () {
            return searchPage.fileNumberSearchBox.sendKeys(file1)
            .then(searchPage.searchButton.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return filesArea.fileViewHeader.getText().then(function (fileName) {
                    return expect(fileName.toLowerCase()).toEqual(file1.toLowerCase());
                });
            })
            .then(filesArea.addNoteButton.click)
            .then(function () {
                return noteEditorModal.title.then(function (title) {
                    return expect(title).toEqual(conversionUtils.getDate(new Date()));
                });
            })
            .then(function () {
                return noteEditorModal.buttonAddNotes.waitReady();
            })
            .then(noteEditorModal.buttonAddNotes.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return errorMessage.errorMessageTextNode.waitReady();
            })
            .then(function () {
                return expect(errorMessage.errorMessageText).toEqual(emptyNoteErrorMessage);
            });
        });

        it("9-If the user is on a file level and clicks on 'Add notes' button than the user should be able to add a new note in the file", function () {
            var noteKeyword1 = "File note 1";
            var noteKeyword2 = "File note 2";

            return tasksUtils.deleteFilerNote(file4)
            .then(function () {
                return searchPage.fileNumberSearchBox.sendKeys(file4);
            })
            .then(searchPage.searchButton.click)
            .then(function () {
                return filesArea.fileViewHeader.getText();
            })
            .then(function (fileName) {
                return expect(fileName.toLowerCase()).toEqual(file4.toLowerCase());
            })
            .then(function () {
                return addNote(noteKeyword1);
            })
            .then(function () {
                return browser.sleep(2000);
            })
            .then(function () {
                return filesArea.fileViewAllNotesText.count().then(function (count) {
                    return expect(count).toEqual(1);
                });
            })
            .then(function () {
                return filesArea.fileViewAllNotesText.get(0).getText().then(function (notesContent1) {
                    return expect(notesContent1).toEqual(noteKeyword1);
                });
            })
            .then(function () {
                return addNote(noteKeyword2);
            })
            .then(function () {
                return browser.sleep(2000);
            })
            .then(function () {
                return filesArea.fileViewAllNotesText.count().then(function (count2) {
                    return expect(count2).toEqual(2);
                });
            })
            .then(function () {
                return filesArea.fileViewAllNotesText.get(1).getText().then(function (notesContent2) {
                    return expect(notesContent2).toEqual(noteKeyword2);
                });
            });
        });

        it("10-If the user opens a file on the folder level and clicks on 'Add notes' button the 'Note editor modal' should be open with today's date in the title", function () {
            return searchPage.fileNumberSearchBox.sendKeys(file1)
            .then(searchPage.searchButton.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree(folder1, 'folder');
            })
            .then(function () {
                return filesArea.fileViewHeader.getText().then(function (fileName) {
                    return expect(fileName.toLowerCase()).toEqual(fileName.toLowerCase());
                });
            })
            .then(filesArea.addNoteButton.click)
            .then(function () {
                return noteEditorModal.title.then(function (title) {
                    return expect(title).toEqual(conversionUtils.getDate(new Date()));
                });
            });
        });

        it("11-If the user attempts to add an empty notes on a folder level the appropriate error message should be displayed", function () {
            return searchPage.fileNumberSearchBox.sendKeys(file1)
            .then(searchPage.searchButton.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree(folder1, 'folder');
            })
            .then(function () {
                return filesArea.fileViewHeader.getText().then(function (fileName) {
                    return expect(fileName.toLowerCase()).toEqual(folder1.toLowerCase());
                });
            })
            .then(filesArea.addNoteButton.click)
            .then(function () {
                return noteEditorModal.title.then(function (title) {
                    return expect(title).toEqual(conversionUtils.getDate(new Date()));
                });
            })
            .then(noteEditorModal.buttonAddNotes.click)
            .then(function () {
                return errorMessage.errorMessageTextNode.waitReady();
            })
            .then(function () {
                return expect(errorMessage.errorMessageText).toEqual(emptyNoteErrorMessage);
            });
        });

        /* todo; */
        xit("If the user opens a file on the folder level and clicks on 'Add notes' button than the user should be able to add a new note in the folder", function () {
            var noteKeyword1 = "Folder note 1";
            var noteKeyword2 = "Folder note 2";
            //If the tests fail before deleting the notes
            //We need to clean it up before testing again otherwise it will always fail
            tasksUtils.deleteFolderNote('AddFileNotesFolder1');

            searchPage.fileNumberSearchBox.sendKeys(file4).then(function () {
                searchPage.searchButton.click().then(function () {

                    webdriverUtils.waitTillElementVisible(fileTree.folderByText(folder1)).then(function () {
                        webdriverUtils.clickOnNodeInFileTree('AddFileNotesFolder1', 'folder');

                        filesArea.fileViewHeader.getText().then(function (fileName) {
                            expect(fileName.toLowerCase()).toEqual('AddFileNotesFolder1'.toLowerCase());

                            addNote(noteKeyword1, function () {
                                webdriverUtils.waitTillElementVisible(filesArea.fileViewAllNotesText).then(function () {
                                    browser.sleep(500).then(function () {
                                        filesArea.fileViewAllNotesText.count().then(function (count1) {
                                            expect(count1).toEqual(1);

                                            filesArea.fileViewAllNotesText.get(0).getText().then(function (notesContent1) {
                                                expect(notesContent1).toEqual(noteKeyword1);

                                                checkDateAndUserOfAddedNote(0, function () {

                                                    addNote(noteKeyword2, function () {
                                                        webdriverUtils.waitTillElementVisible(filesArea.fileViewAllNotesText).then(function () {
                                                            browser.sleep(500).then(function () {
                                                                filesArea.fileViewAllNotesText.count().then(function (count2) {
                                                                    expect(count2).toEqual(2);
                                                                    filesArea.fileViewAllNotesText.get(0).getText().then(function (notesContent2) {
                                                                        expect(notesContent2).toEqual(noteKeyword2);

                                                                        checkDateAndUserOfAddedNote(0, function () {
                                                                            tasksUtils.deleteFolderNote(folderToAddNote);
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
                })
            });
        });

        it("13-If the user attempts to add a note to a folder which does not support notes the appropriate error message should be displayed", function () {
            var folderWithoutNotes = 'Folder without notes';
            return searchPage.fileNumberSearchBox.sendKeys(file5)
            .then(searchPage.searchButton.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree(folder1, 'folder');
            })
            .then(function () {
                return filesArea.fileViewHeader.getText().then(function (fileName) {
                    return expect(fileName.toLowerCase()).toEqual(folder1.toLowerCase());
                });
            })
            .then(function () {
                return addNote("Some note");
            })
            .then(function () {
                return errorMessage.errorMessageTextNode.waitReady();
            })
            .then(function () {
                return expect(errorMessage.errorMessageText).toEqual(notSupportedNoteErrorMessage);
            });
        });

        it("14-If the user attempts to add a note to a file which does not support notes the appropriate error message should be displayed", function () {
            return searchPage.fileNumberSearchBox.sendKeys(file5)
            .then(searchPage.searchButton.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return filesArea.fileViewHeader.getText().then(function (fileName) {
                    return expect(fileName.toLowerCase()).toEqual(file5.toLowerCase());
                });
            })
            .then(function () {
                return addNote("Some note");
            })
            .then(function () {
                return errorMessage.errorMessageTextNode.waitReady();
            })
            .then(function () {
                return expect(errorMessage.errorMessageText).toEqual(notSupportedNoteErrorMessage);
            });
        });

        it("15-Add Notes button should not be displayed when user tries to add Folder Note although the Folder has been removed from template", function () {
            return searchPage.fileNumberSearchBox.sendKeys(file2)
            .then(searchPage.searchButton.click)
            .then(function () {
                return browser.waitForAngular();
            })
            .then(function () {
                return filesArea.fileViewHeader.getText().then(function (fileName) {
                    return expect(fileName.toLowerCase()).toEqual(file2.toLowerCase());
                });
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree('FolderTypeRemoved', 'folder');
            })
            .then(function () {
                return expect(filesArea.isAddNoteButtonDisplayed).toEqual(false);
            });
        });
    }
});