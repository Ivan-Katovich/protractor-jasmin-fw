exports.tags = ['File_Navigation', 'File_Navigation'];
var recordHeaderElement = require('./../../PageObjects/Containers/RecordHeader.js');
var IR_SearchPage = require('../../PageObjects/SearchPage.js');
var IR_filesview = require('../../PageObjects/FilesView.js');
var IR_NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var IR_FileTree = require('./../../PageObjects/Containers/FileTree.js');
var IR_NoteEditorModal = require('../../PageObjects/ModalDialogs/NoteEditorModal.js');
var IR_ErrorMessage = require('./../../PageObjects/ModalDialogs/ErrorMessage.js');
var IR_HistoricalNoteView = require('./../../PageObjects/Containers/HistoricalNoteView.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');

var conversionUtils = require('../../utils/conversionUtils.js');
var tasksUtils = require('../../utils/tasksUtils.js');

//Making objects of the included pages
var recordHeader = new recordHeaderElement();
var searchPage = new IR_SearchPage();
var navigationBar = new IR_NavigationBar();
var fileTree = new IR_FileTree();
var filesArea = new IR_filesview();
var historicalNoteView = new IR_HistoricalNoteView();
var user;

var file = 'HistoricalNotes';
var folder = 'Folder With Hist Notes';
var onlyHistNotesFolder = 'OnlyHistNotes';


describe("Historical Notes", function () {

        beforeEach(function () {
            browser.driver.get(browser.params.defaultUrl);
            webdriverUtils.waitTillElementVisible(navigationBar.searchIcon).then(function () {
                navigationBar.searchIcon.click().then(function () {
                    browser.waitForAngular();
                    if (browser.params.authentication == 'ad' || browser.params.authentication == 'adfs') {
                        user = 'Barnwell,Jamie (barnweja)';
                    } else {
                        user = 'barnweja (barnweja)';
                    }
                    webdriverUtils.waitTillElementVisible(searchPage.fileNumberSearchBox).then(function () {
                        searchPage.fileNumberSearchBox.sendKeys(file).then(function () {
                            searchPage.searchButton.click().then(function () {
                                browser.waitForAngular();
                            });
                        });
                    });
                });
            });
        });

        //<<<<<<<<<<--------BEGIN FILE LEVEL HISTORICAL NOTES---------->>>>>>>>>>>>>

        it('When opening a file with both a default file note and historical file note(s), the viewer should display the default file note', function () {
            //Check that there are historical notes in the file tree but that only the default file note is displayed in the viewer.
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                fileTree.fileTreeNodes.getText().then(function (nodesArray) {
                    expect(nodesArray).toContain('1: Historical Notes');
                    expect(nodesArray).toContain('2: Historical Notes');
                    expect(nodesArray).toContain('3: Historical Notes');
                });
                //webdriverUtils.waitTillElementVisible(fileTree.fileViewRawNotes);
                filesArea.fileViewRawNotes.getText().then(function (defaultNote) {
                    expect(defaultNote).toBe('DEC 18, 2015 6:51:14 PM - XP1 (xp1)\nRegular file note');
                });
            });

        });// end it

        it('Navigating to a file with historical notes and clicking on a historical note in the tree should display the selected historical file note in the viewer', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                fileTree.fileTreeNodesByText('Historical Notes').then(function (histNotesArray) {
                    histNotesArray[0].click().then(function () { //select one of the historical notes to display and check the text
                        webdriverUtils.waitTillElementVisible(historicalNoteView.historicalNoteViewContainer).then(function () {
                            historicalNoteView.historicalNoteViewContainer.getText().then(function (noteText) {
                                //console.log('note text is ', noteText);
                                expect(noteText).toBe('NOTES\nDEC 18, 2015 6:50:08 PM - XP1 (xp1)\nNote in Hist Note 3\nDEC 18, 2015 6:40:24 PM - XP1 (xp1)\nAnother file note to be in historical note 2\nDEC 18, 2015 6:40:07 PM - XP1 (xp1)\nFile Note to be in historical note 2');
                            });
                        });
                    });
                });
            });
        });

        it('When a file has multiple historical notes, the historical notes should be displayed individually on the top of the tree view, ordered by the note with the latest entry first, and each should open in viewer when clicked', function () {
            var histNotesArray;
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                fileTree.fileTreeNodesByText('Historical Notes').then(function (histNotesArr) {
                    histNotesArray = histNotesArr;
                    var numNotes = histNotesArray.length;
                    expect(numNotes).toBe(3);
                    var dateNote1;
                    var dateNote2;
                    var dateNote3;
                    histNotesArray[0].click().then(function () { //open each note in viewer and get its top entry date to check that topmost note in tree has the newest date
                        historicalNoteView.dateOfEntry(1).getText().then(function (date1) {
                            dateNote1 = new Date(date1);
                            histNotesArray[1].click().then(function () {
                                historicalNoteView.dateOfEntry(1).getText().then(function (date2) {
                                    dateNote2 = new Date(date2);
                                    expect(dateNote1 >= dateNote2).toBe(true);
                                    histNotesArray[2].click().then(function () {
                                        historicalNoteView.dateOfEntry(1).getText().then(function (date3) {
                                            dateNote3 = new Date(date3);
                                            expect(dateNote2 >= dateNote3).toBe(true);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        //<<<<<<<<<<--------BEGIN FOLDER LEVEL HISTORICAL NOTES---------->>>>>>>>>>>>>

        it('When opening a folder with both a default folder note and historical folder note(s), the viewer should display the default folder note', function () {
            //Check that there are historical notes in the file tree when clicked on a folder but that only the default folder note is displayed in the viewer.
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.clickOnNodeInFileTree(folder, 'folder').then(function () {
                    webdriverUtils.showNodeChildrenByText(folder, 'folder').then(function () {
                        filesArea.fileViewRawNotes.getText().then(function (defaultNote) {
                            expect(defaultNote).toBe('DEC 18, 2015 6:38:42 PM - XP1 (xp1)\nRegular folder note');
                        });
                        fileTree.fileTreeNodes.getText().then(function (folderNodesArray) {
                            expect(folderNodesArray).toContain('1: Historical Notes');
                            expect(folderNodesArray).toContain('2: Historical Notes');
                            expect(folderNodesArray).toContain('3: Historical Notes');
                        });
                    });
                });
            });
        });

        it('When opening a folder with only hisotrical folder note(s) the viewer should display the folder with the Notes section informing the user there are no notes to display in note section', function () {
            //navigate to file 'historical note only' for this test since only has one hist note
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.showNodeChildrenByText(onlyHistNotesFolder, 'folder').then(function () {
                    webdriverUtils.clickOnNodeInFileTree(onlyHistNotesFolder, 'folder').then(function () {
                        expect(filesArea.noNotesMessage.isDisplayed()).toBe(true);
                        //now show that historical notes do exist in this folder to verify notes only display on file notes area if they are default notes
                        fileTree.fileTreeNodesByText('Historical Notes').then(function (histNotesArray) {
                            expect(histNotesArray.length).toBe(4); //only displaying file livel hist notes and the single hist ntote in onlyHistNotes flder
                        });
                    });
                });
            });
        });

        it('Navigating to a folder with historical notes and clicking on a historical note in the tree should display the selected historical folder note in the viewer', function () {
            webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                webdriverUtils.showNodeChildrenByText(onlyHistNotesFolder, 'folder').then(function () {
                    fileTree.fileTreeNodesByText('Historical Notes').then(function (histNotesArray) {   //there are 4 displayed now (last 1 is in the folder level
                        histNotesArray[3].click().then(function () { //open historical note in viewer
                            historicalNoteView.historicalNoteViewContainer.getText().then(function (noteText) {
                                expect(noteText).toBe('NOTES\nDEC 19, 2015 11:21:53 PM - XP1 (xp1)\nOnly note in folder to be historical note');
                            });
                        });
                    });
                });
            });
        });           
    
});
