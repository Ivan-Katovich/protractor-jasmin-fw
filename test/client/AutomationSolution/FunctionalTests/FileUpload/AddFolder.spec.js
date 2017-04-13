exports.tags = ['File_Manipulation', 'Upload'];
var IR_filesview = require('../../PageObjects/FilesView.js'),
    IR_NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js'),
    IR_AddFolderModal = require('./../../PageObjects/ModalDialogs/AddFolderModal.js'),
    IR_FileTree = require('../../PageObjects/Containers/FileTree.js'),
    recordHeaderElement = require('../../PageObjects/Containers/RecordHeader.js'),
    ContextMenu = require('./../../PageObjects/DropdownLists/ContextMenu.js'),
    IR_DocumentPageActionsDropdown = require('./../../pageObjects/DropdownLists/DocumentPageActionsDropdown.js'),

    searchUtil = require('../../BusinessProcess/Search.js'),
    conversionUtils = require('../../utils/conversionUtils.js'),
    dataBaseHelper = require('../../utils/dataBaseHelper.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    fileUtils = require('../../utils/fileUtils.js'),

    fileTree = new IR_FileTree(),
    navigationBar = new IR_NavigationBar(),
    filesArea = new IR_filesview(),
    addFolderModal = new IR_AddFolderModal(),
    recordHeader = new recordHeaderElement(),
    contextMenu = new ContextMenu(),
    docPageActionsDropdown = new IR_DocumentPageActionsDropdown(),

    file = 'AddFolder',
    fileLevelDisabled = 'AddFolder_FileLevelDisabled',
    fileButtonChanges = 'AddFolder_ButtonChange',
    fileNested = 'AddFolder_Nested',

    folderNestedExisting = 'Existing_AllowsNested',
    folderNoNesting = 'Existing_NoNested',

    folderToAdd = 'FolderToAdd',
    defaultDescription = 'Download',
    descriptionFolderNote = 'testing folder note',
    descriptionLength1 = 'B',
    descriptionWithSimbols = '!n3wF0lder Name###3',
    descriptionLength255 = 'Lorem ipsum dolor sit amet, nonummy ligula volutpat hac integer nonummy. Suspendisse ultricies, congue etiam tellus, erat libero, nulla eleifend, mauris pellentesque. Suspendisse integer praesent vel, integer gravida mauris, fringilla vehicula lacinia non',

    isFirst = true;

function restoreFileStructure() {
    return fileUtils.deleteDocumentByDescription(fileButtonChanges,folderToAdd)
        .then(function () {
            return fileUtils.deleteDocumentByDescription(fileButtonChanges,'ExistingFolder');
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(fileNested,folderToAdd);
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(file,folderToAdd);
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(file,descriptionLength1);
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(file,descriptionLength255);
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(file,descriptionWithSimbols);
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(file,defaultDescription);
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(file,'Policy Info');
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(file,descriptionFolderNote);
        });
}

describe('Adding New Folders', function () {

    beforeEach(function () {
        if(isFirst){
            isFirst = false;
            return restoreFileStructure()
                .then(function () {
                    return browser.executeScript('window.localStorage.clear();');
                })
                .then(function () {
                    return browser.driver.get(browser.params.defaultUrl);
                })
                .then(function () {
                    return navigationBar.vertaforeLogo.waitReady();
                });
        }else{
            return browser.driver.get(browser.params.defaultUrl)
                .then(function () {
                    return navigationBar.vertaforeLogo.waitReady();
                });
        }
    });

    afterEach(function () {
        return restoreFileStructure()
            .then(function () {
                return browser.executeScript('window.localStorage.clear();');
            });
    });

    function verifyThatAddFolderEnableOrDisable(expected) {
        return filesArea.actionsDropdownButton.click()
            .then(function () {
                switch (expected) {
                    case 'disabled':
                        return expect(docPageActionsDropdown.newFolderAction.getAttribute('class')).toContain('disabled');
                    default:
                        return expect(docPageActionsDropdown.newFolderAction.getAttribute('class')).not.toContain('disabled');
                }
            });
    }

    if (browser.params.siteBase == 'iis') {

        it('1 - If user is highlighted at file level, clicking on Actions then "NEW FOLDER" button will show the "New Folder" pop-up with "Create Folder for (given file Name)" as header', function () {
            return searchUtil.openFile(file)
                .then(function () {
                    return recordHeader.fileNumberRecordHeader.getText();
                })
                .then(function (text) {
                    return expect(text.toLowerCase()).toBe(file.toLowerCase());
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.newFolderAction.click)
                .then(function () {
                    return expect(addFolderModal.addFolderHeader.getText()).toBe('Create Folder for ' + file);
                })
        });

        it('2 - When the new folder dialog is selected in the file level, the folder type dropdown should be auto-populated with only folder types allowed in that file type and that are not unrepeatable with a preexisting folder', function () {
            return searchUtil.openFile(file)
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.newFolderAction.click)
                .then(addFolderModal.folderTypeDropdown.click)
                .then(addFolderModal.folderTypeDropdownElements.getText)
                .then(function (texts) {
                    expect(texts).toContain('File Note');
                    expect(texts).toContain('New Mail');
                    expect(texts).toContain('Policy Info');
                    expect(texts).toContain('Cancellation/Reinstatement');
                    expect(texts).toContain('Underwriting Info');
                    expect(texts).toContain('Premium Finance');
                    expect(texts).toContain('Reinsurance');
                    expect(texts).toContain('Print');
                    expect(texts).toContain('Download');
                });
        });
       
        it('3 - If all folder types in a file are non-repeating and the file already contains an instance of each, the Add Folder button should be disabled in the actions menu', function () {
            return searchUtil.openFile(fileLevelDisabled)
                .then(function () {
                    return verifyThatAddFolderEnableOrDisable('disabled');
                });
        });

        it('4 - If all folder types in a file are non-repeating and the file already contains an instance of each, the Add Folder button should be disabled in the context menu', function () {
            return searchUtil.openFile(fileLevelDisabled)
                .then(function () {
                    return fileTree.fileNumber.contextClick();
                })
                .then(function () {
                    expect(contextMenu.addFolder.isDisplayed()).toBe(true);
                    expect(contextMenu.addFolder.getAttribute('class')).toContain('disabled');
                });
        });

        it('5 - After adding a new folder, user should be navigated into the new folder and tree should display new folder node in tree ', function () {
            return searchUtil.openFile(fileButtonChanges)
                .then(function () {
                    expect(fileTree.fileTreeNodes.getText()).not.toContain(folderToAdd);
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.newFolderAction.click)
                .then(addFolderModal.folderDescriptionBox.clear)
                .then(function () {
                    return addFolderModal.folderDescriptionBox.sendKeys(folderToAdd);
                })
                .then(addFolderModal.finalizeAddFolder.click)
                .then(function () {
                    expect(filesArea.fileViewTitle.getText()).toBe(folderToAdd);
                    expect(fileTree.fileTreeNodes.getText()).toContain(folderToAdd);
                });
        });

        it('6 - If all folder types in a file are non-repeating and the file already contains an instance of each except one, the Add Folder button in File Actions menu dropdown should be disabled directly after creating the last new folder', function () {
            return searchUtil.openFile(fileButtonChanges)
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.newFolderAction.click)
                .then(addFolderModal.folderTypeDropdown.click)
                .then(function () {
                    return expect(addFolderModal.folderTypeDropdownElements.count()).toBe(1)
                })
                .then(addFolderModal.folderDescriptionBox.clear)
                .then(function () {
                    return addFolderModal.folderDescriptionBox.sendKeys(folderToAdd);
                })
                .then(addFolderModal.finalizeAddFolder.click)
                .then(function () {
                    return webdriverUtils.clickOnNodeInFileTree(folderToAdd, 'folder');
                })
                .then(function () {
                    return verifyThatAddFolderEnableOrDisable('disabled');
                });
        });

        it('7 - If all folder types in a file are non-repeating and the file already contains an instance of each except one, the Add Folder button in context menu should be disabled directly after creating the last new folder', function () {
            return searchUtil.openFile(fileButtonChanges)
                .then(function () {
                    return fileTree.fileNumber.contextClick();
                })
                .then(contextMenu.addFolder.click)
                .then(addFolderModal.folderDescriptionBox.clear)
                .then(function () {
                    return addFolderModal.folderDescriptionBox.sendKeys(folderToAdd);
                })
                .then(addFolderModal.finalizeAddFolder.click)
                .then(function () {
                    return fileTree.fileNumber.contextClick();
                })
                .then(function () {
                    return expect(contextMenu.addFolder.getAttribute('class')).toContain('disabled');
                });
        });

        it('8 - The default folder description should match the first folder type dropdown selection', function () {
            return searchUtil.openFile(file)
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.newFolderAction.click)
                .then(function () {
                    expect(addFolderModal.folderTypeDropdownSelectedValue.getText()).toBe('Cancellation/Reinstatement');
                    expect(addFolderModal.folderDescriptionBox.getAttribute('value')).toBe('Cancellation/Reinstatement');
                });
        });

        it('9 - The folder description can be as few as 1 character in length.', function () {
            return searchUtil.openFile(file)
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.newFolderAction.click)
                .then(addFolderModal.folderDescriptionBox.clear)
                .then(function () {
                    return addFolderModal.folderDescriptionBox.sendKeys(descriptionLength1);
                })
                .then(addFolderModal.finalizeAddFolder.click)
                .then(function () {
                    return expect(fileTree.fileTreeNodes.getText()).toContain(descriptionLength1)
                });
        });

        it('10 - The folder description can be as large as 255 characters in length.', function () {
            return searchUtil.openFile(file)
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.newFolderAction.click)
                .then(addFolderModal.folderDescriptionBox.clear)
                .then(function () {
                    return addFolderModal.folderDescriptionBox.sendKeys(descriptionLength255);
                })
                .then(addFolderModal.finalizeAddFolder.click)
                .then(function () {
                    return expect(fileTree.fileTreeNodes.getText()).toContain(descriptionLength255)
                });
        });

        it('11 - If the user enters more than 255 characters in the description, the trailing characters should be removed.', function () {
            return searchUtil.openFile(file)
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.newFolderAction.click)
                .then(addFolderModal.folderDescriptionBox.clear)
                .then(function () {
                    return addFolderModal.folderDescriptionBox.sendKeys(descriptionLength255+'more than 255');
                })
                .then(addFolderModal.finalizeAddFolder.click)
                .then(function () {
                    return expect(fileTree.fileTreeNodes.getText()).toContain(descriptionLength255)
                });
        });

        it('12 - If the user enters less than 255 characters and more than 1 in the description, description should be saved as the user entered it.', function () {
            return searchUtil.openFile(file)
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.newFolderAction.click)
                .then(addFolderModal.folderDescriptionBox.clear)
                .then(function () {
                    return addFolderModal.folderDescriptionBox.sendKeys(descriptionWithSimbols);
                })
                .then(addFolderModal.finalizeAddFolder.click)
                .then(function () {
                    return expect(fileTree.fileTreeNodes.getText()).toContain(descriptionWithSimbols)
                });
        });

        it('13 - When a new folder type is selected from the dropdown, the folder description updates to match the folder type.', function () {
            var typeName;
            return searchUtil.openFile(file)
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.newFolderAction.click)
                .then(addFolderModal.folderTypeDropdown.click)
                .then(addFolderModal.folderTypeDropdownElement(4).getText)
                .then(function (text) {
                    return typeName = text;
                })
                .then(addFolderModal.folderTypeDropdownElement(4).click)
                .then(function () {
                    expect(addFolderModal.folderTypeDropdownSelectedValue.getText()).toBe(typeName);
                    expect(addFolderModal.folderDescriptionBox.getAttribute('value')).toBe(typeName);
                });
        });

        it('14 - If the folder description is erased before saving, the default folder description matching the selected folder type should be added on create.', function () {
            var typeName;
            return searchUtil.openFile(file)
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.newFolderAction.click)
                .then(addFolderModal.folderTypeDropdown.click)
                .then(addFolderModal.folderTypeDropdownElement(4).getText)
                .then(function (text) {
                    return typeName = text;
                })
                .then(addFolderModal.folderTypeDropdownElement(4).click)
                .then(addFolderModal.folderDescriptionBox.clear)
                .then(addFolderModal.finalizeAddFolder.click)
                .then(function () {
                    return expect(fileTree.fileTreeNodes.getText()).toContain(typeName)
                });
        });

        it('15 - If folder notes are enabled for the file type, the user should be able to enter and save a folder note from the folder note text field on the Add Folder form.', function () {
            return searchUtil.openFile(file)
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.newFolderAction.click)
                .then(addFolderModal.folderDescriptionBox.clear)
                .then(function () {
                    return addFolderModal.folderDescriptionBox.sendKeys(descriptionFolderNote);
                })
                .then(function () {
                    return addFolderModal.folderNotesBox.sendKeys(descriptionLength255 + ' more than 255 chars');
                })
                .then(addFolderModal.finalizeAddFolder.click)
                .then(function () {
                    return webdriverUtils.clickOnNodeInFileTree('testing folder note', 'folder')
                })
                .then(function () {
                    return expect(filesArea.fileViewAllNotesText.get(0).getText).toBe(descriptionLength255 + ' more than 255 chars');
                });
        });

        it('16 - If folder notes are disabled for the folder type, the user should not be able to enter a folder note from the folder note text field on the Add Folder form.', function () {
            return searchUtil.openFile(file)
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.newFolderAction.click)
                .then(addFolderModal.folderTypeDropdown.click)
                .then(addFolderModal.folderTypeDropdownElement(1).click)
                .then(function () {
                    return expect(addFolderModal.folderNotesBox.isEnabled()).toBe(false);
                })
        });

        it('17 - When the Create Folder dialog is selected in the folder level for a folder which does not allow nested folders, the Add Folder button should be grayed out', function () {
            return searchUtil.openFile(fileNested)
                .then(function () {
                    return webdriverUtils.clickOnNodeInFileTree(folderNoNesting, 'folder');
                })
                .then(function () {
                    return verifyThatAddFolderEnableOrDisable('disabled');
                })
        });

        it('18 - If user is highlighted at folder level, clicking on "NEW FOLDER" button will show the "New Folder" pop-up with "Create Folder for (given folder)" as header', function () {
            return searchUtil.openFile(fileNested)
                .then(function () {
                    return webdriverUtils.clickOnNodeInFileTree(folderNestedExisting, 'folder');
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.newFolderAction.click)
                .then(function () {
                    return expect(addFolderModal.addFolderHeader.getText()).toBe('Create Folder for ' + folderNestedExisting);
                })
        });
      
        it('19 - When the Create Folder dialog is selected in the folder level, the folder type dropdown should be auto-populated with only folders allowed to be nested in that folder', function () {
            return searchUtil.openFile(fileNested)
                .then(function () {
                    return webdriverUtils.clickOnNodeInFileTree(folderNestedExisting, 'folder');
                })
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.newFolderAction.click)
                .then(addFolderModal.folderTypeDropdown.click)
                .then(addFolderModal.folderTypeDropdownElements.getText)
                .then(function (texts) {
                    expect(texts).toContain('Billing Information');
                    expect(texts).toContain('Claims1FolderReimburse');
                    expect(texts).toContain('Cancellation/Reinstatement');
                });
        });
    }
});