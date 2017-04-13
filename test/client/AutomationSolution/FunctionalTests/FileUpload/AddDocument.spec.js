exports.tags = ['File_Manipulation', 'Upload'];
var IR_filesview = require('../../PageObjects/FilesView.js'),
    IR_AddDocModal = require('./../../PageObjects/ModalDialogs/AddDocModal.js'),
    IR_NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js'),
    IR_ErrorMessage = require('./../../PageObjects/ModalDialogs/ErrorMessage.js'),
    IR_FileTree = require('../../PageObjects/Containers/FileTree.js'),
    ContextMenu = require('./../../PageObjects/DropdownLists/ContextMenu.js'),
    IR_DocumentPageActionsDropdown = require('./../../pageObjects/DropdownLists/DocumentPageActionsDropdown.js'),

    conversionUtils = require('../../utils/conversionUtils.js'),
    dataBaseHelper = require('../../utils/dataBaseHelper.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    helper = require('../../utils/helper.js'),
    searchUtil = require('../../BusinessProcess/Search.js'),
    fileUtils = require('../../utils/fileUtils.js'),
    convUtils = require('../../utils/conversionUtils.js'),
    fs = require('../../utils/fileSystemUtils.js'),

    docPageActionsDropdown = new IR_DocumentPageActionsDropdown(),
    contextMenu = new ContextMenu(),
    fileTree = new IR_FileTree(),
    navigationBar = new IR_NavigationBar(),
    filesArea = new IR_filesview(),
    errorMessage = new IR_ErrorMessage(),
    addDocModal = new IR_AddDocModal(),

    fileRP = 'AddDocument_RP',
    fileEvents = 'AddDoc_Events',
    fileNoDocs = 'AddDoc_NoDocsOnFile',
    eventsFolder = 'FolderForImport',
    descriptionLength255 = 'Lorem ipsum dolor sit amet, nonummy ligula volutpat hac integer nonummy. Suspendisse ultricies, congue etiam tellus, erat libero, nulla eleifend, mauris pellentesque. Suspendisse integer praesent vel, integer gravida mauris, fringilla vehicula lacinia non',
    descriptionLengthMore255 = 'Lorem ipsum dolor sit amet, nonummy ligula volutpat hac integer nonummy. Suspendisse ultricies, congue etiam tellus, erat libero, nulla eleifend, mauris pellentesque. Suspendisse integer praesent vel, integer gravida mauris, fringilla vehicula lacinia non and few more',

    root = process.cwd(),
    exampleFolder = root + '\\test\\example\\',
    firstFname = 'moving-forward.txt',
    secFname = 'EditAnnotationIcon.txt',
    text = 'Hello World',

    isFirst = true;

function restoreFileStructure() {
    return fileUtils.deleteDocumentByDescription(fileRP, 'TestEDoc123Test')
        .then(function () {
            return fileUtils.deleteDocumentByDescription(fileRP, 'E-test1');
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(fileRP, 'E-test2');
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(fileRP, 'pageNameTest');
        })
        .then(function () {
            return fileUtils.deleteDocumentByDescription(fileRP, 'Application');
        });
}


describe('Import Document feature', function () {
    
    if (browser.params.siteBase == 'iis') {

        var filePath = exampleFolder+'moving-forward.txt',
            multipleFiles = filePath + '\n' + exampleFolder + "EditAnnotationIcon.txt",
            alphabeticalVal = "adsad",
            invalidDateVal1 = '15/05/2011',
            invalidDateVal2 = '10/35/2016',
            invalidHours = '13',
            invalidMinutes = '60';

        beforeAll(function(){
            return fs.removeDir(exampleFolder)
                .then(function () {
                    return fs.waitForDisappeared(exampleFolder);
                })
                .then(function () {
                    return fs.createInFolderPromised(exampleFolder, firstFname, text);
                })
                .then(function () {
                    return fs.createInFolderPromised(exampleFolder, secFname, text);
                });
        });

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

        afterAll(function(){
            return fs.removeDir(exampleFolder);
        });

        function verifyThatAddDocEnableOrDisable(expected) {
            return filesArea.actionsDropdownButton.click()
                .then(function () {
                    switch (expected) {
                        case 'disabled':
                            return expect(docPageActionsDropdown.newDocumentAction.getAttribute('class')).toContain('disabled');
                        default:
                            return expect(docPageActionsDropdown.newDocumentAction.getAttribute('class')).not.toContain('disabled');
                    }
                });
        }

        function verifyThatImportButtonEnableOrDisable(expected) {
            switch (expected) {
                case 'disabled':
                    return expect(addDocModal.finalizeAddDocument.isEnabled()).toBe(false);
                default:
                    return expect(addDocModal.finalizeAddDocument.isEnabled()).toBe(true);
            }
        }

        function uploadFile(howmany) {
            return filesArea.actionsDropdownButton.click()
                .then(docPageActionsDropdown.newDocumentAction.click)
                .then(function () {
                    return addDocModal.docTypeButton.waitReady();
                })
                .then(function () {
                    switch (howmany) {
                        case 'single':
                            return addDocModal.chooseFileInput.sendKeys(filePath);
                        default:
                            return addDocModal.chooseFileInput.sendKeys(multipleFiles);
                    }
                });
        }

        function openDocTypeDropdown() {
            return addDocModal.docTypeButton.waitReady()
                .then(addDocModal.docTypeButton.click)
        }

        it('1 - [Modal] When user clicks on add doc. button, add document pop-up should be displayed with drag and drop in default display (with cloud showing) and import button enabled because can create empty doc', function () {
            return searchUtil.openFile(fileRP)
                .then(filesArea.actionsDropdownButton.click)
                .then(docPageActionsDropdown.newDocumentAction.click)
                .then(function () {
                    expect(addDocModal.importModelDialogElement.isDisplayed()).toBe(true);
                    expect(addDocModal.importDialogDragNDropCloud.isDisplayed()).toBe(true);
                    expect(addDocModal.finalizeAddDocument.isEnabled()).toBe(true);
                });
        });

        it('2 - [Modal]When a user selects multiple files(2 files in this case) and remove them  and user should see the drag and drop cloud again and  be able to create an empty document', function () {
            var fileAmount = 2; //depends on how many files we are uploading
            return searchUtil.openFile(fileRP)
                .then(function () {
                    return uploadFile('multiple');
                })
                .then(function () {
                    return expect(addDocModal.uploadedFiles.count()).toBe(2);
                })
                .then(function () {
                    return convUtils.asyncLoop(fileAmount, function(loop,i){
                        return addDocModal.cancelUploadedFiles.get(0).click()
                            .then(function(){
                                return loop();
                            });
                    });
                })
                .then(function () {
                    expect(addDocModal.uploadedFiles.count()).toBe(0);
                    expect(addDocModal.importDialogDragNDropCloud.isDisplayed()).toBe(true);
                    expect(addDocModal.finalizeAddDocument.isEnabled()).toBe(true);
                });
        });

        it('3 - [Modal] When a user selects multiple files(2 files in this case),import document dialog box should display the names of the selected file in import dialog and not the drag and drop cloud', function () {
            return searchUtil.openFile(fileRP)
                .then(function () {
                    return uploadFile('multiple');
                })
                .then(function () {
                    return addDocModal.uploadedFilesNames;
                })
                .then(function (names) {
                    expect(names).toContain('moving-forward.txt');
                    expect(names).toContain('EditAnnotationIcon.txt');
                    expect(addDocModal.importDialogDragNDropCloud.isPresent()).toBe(false);
                });
        });

        it('4 - [Rename component]Page name can be as few as 0 chars in length up to 255 chars in length', function () {
            var title255;

            return searchUtil.openFile(fileRP)
                .then(function () {
                    return uploadFile('single');
                })
                .then(function () {
                    return addDocModal.docToImport(0).doubleClick();
                })
                .then(addDocModal.docToImport(0).clear)
                .then(function () {
                    return addDocModal.docToImport(0).sendKeys('');
                })
                .then(function () {
                    return verifyThatImportButtonEnableOrDisable('enabled');
                })
                .then(addDocModal.docToImport(0).clear)
                .then(function () {
                    return  addDocModal.docToImport(0).sendKeys('between 0 and 255 chars');
                })
                .then(function () {
                    return verifyThatImportButtonEnableOrDisable('enabled');
                })
                .then(addDocModal.docToImport(0).clear)
                .then(function () {
                    return  addDocModal.docToImport(0).sendKeys(descriptionLength255);
                })
                .then(function () {
                    return addDocModal.docToImport(0).getAttribute('title');
                })
                .then(function (title) {
                    return title255 = title;
                })
                .then(addDocModal.docToImport(0).clear)
                .then(function () {
                    return  addDocModal.docToImport(0).sendKeys(descriptionLengthMore255);
                })
                .then(function () {
                    return addDocModal.docToImport(0).getAttribute('title');
                })
                .then(function (title) {
                    return expect(title).toEqual(title255);
                });
        });

        it('5 - [target nav] Upon successful import, the tree should display the new document as selected', function () {
            return searchUtil.openFile(fileRP).then(function () {
                //send the keys to the element
                uploadFile('single').then(function () {
                    addDocModal.docDescription.clear().then(function () {
                        addDocModal.docDescription.sendKeys('pageNameTest').then(function () {
                            if (addDocModal.importModelDialogElement.isDisplayed()) {
                                addDocModal.finalizeAddDocument.click().then(function () {
                                    browser.sleep(7000).then(function () {
                                        fileTree.selectedPages.getText().then(function (selectedInTree) {
                                            expect(selectedInTree[0]).toContain('pageNameTest');
                                        });
                                    });
                                });
                            }
                        });
                    });
                });
            });
        });

        it('6 - When a user  opens a import document dialog box  on file level,it should show header like "import to file_name" ', function () {
            var fileName = fileRP;
            return searchUtil.openFile(fileRP).then(function () {
                //send the keys to the element
                uploadFile('single').then(function () {
                    expect(addDocModal.addDocumentHeader.getText()).toBe('Import to ' + fileName);
                });
            });
        });

        it('7 - When a user opens a import document dialog box on folder level,it should show header like "Import to folder_name"', function () {
            var folderName = eventsFolder;
            return searchUtil.openFile(fileEvents).then(function() {
                webdriverUtils.clickOnNodeInFileTree(folderName, 'folder');
                //send the keys to the element
                uploadFile('single').then(function() {
                    expect(addDocModal.addDocumentHeader.getText()).toBe('Import to ' + folderName);
                });
            });
        });

        it('8 - If there is no document types available at a file level,New Document button should be disabled in Actions menu', function () {
            return searchUtil.openFile(fileNoDocs)
                .then(function () {
                    return verifyThatAddDocEnableOrDisable('disabled');
                });
        });

        it('9 - If there is no document types available at a file level,New Document button should be disabled in context menu', function () {
            var expectedArray = ['', '', 'New Folder\nNF', 'New Document\nND', '', '', '', '', '', '', '', '', '', '', '','Copy Shortcut\nCS'];
            return searchUtil.openFile(fileNoDocs)
                .then(function () {
                    return fileTree.fileNumber.contextClick();
                })
                .then(function () {
                    expect(contextMenu.addDocument.isDisplayed()).toBe(true);

                    /* The add document node is a span. To get the "li" you need to get the parent of the node and check that class.
                     * The nodes in the context menu do not attach id's to the same html element tag name.
                     */
                    var addDocumentParent = contextMenu.addDocument.element(by.xpath('..'));
                    expect(addDocumentParent.getAttribute('class')).toContain('disabled');
                })
                .then(contextMenu.menuOptions.getText)
                .then(function (options) {
                    return expect(conversionUtils.isArraysIdentical(options, expectedArray)).toBe(true);
                });
        });

        it('10 - If there is no document types available at a folder level,New Document button should be disabled in the doc actions menu', function () {
            return searchUtil.openFile(fileEvents).then(function () {
                webdriverUtils.clickOnNodeInFileTree('FolderNoDocs', 'folder').then(function () {
                    verifyThatAddDocEnableOrDisable('disabled');
                });
            });
        });

        it('11 - If there is no document types available at a folder level,New Document button should be disabled in context menu', function () {
            var expectedArray = ['Expand', '', 'New Folder\nNF', 'New Document\nND', '', '', '', '', '', '', '', '', '', '', '', 'Copy Shortcut\nCS'];

            return searchUtil.openFile(fileEvents).then(function () {
                webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                    webdriverUtils.clickOnNodeInFileTree('FolderNoDocs', 'folder').then(function () {
                        var folderNode = fileTree.folderByText('FolderNoDocs');
                        webdriverUtils.contextClick(folderNode).then(function () {
                            webdriverUtils.waitTillElementVisible(contextMenu.addDocument).then(function () {
                                expect(contextMenu.addDocument.isDisplayed()).toBe(true);

                                /* The add document node is a span. To get the "li" you need to get the parent of the node and check that class.
                                 * The nodes in the context menu do not attach id's to the same html element tag name.
                                 */
                                var addDocumentParent = contextMenu.addDocument.element(by.xpath('..'));
                                addDocumentParent.getAttribute('class').then(function (classval) {
                                    //console.log('val of class fcor add doc', classval);
                                    expect(classval).toContain('disabled');
                                });
                                contextMenu.menuOptions.getText().then(function (fileOptions) {
                                    // console.log('file coptions: ', fileOptions);
                                    expect(conversionUtils.isArraysIdentical(fileOptions, expectedArray)).toBe(true);
                                });
                            });
                        });
                    });
                });
            });
        });

        it('12 - If there are some document types available at a file level,New Document button should be enabled in actions menu', function () {
            return searchUtil.openFile(fileRP).then(function () {
                webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                    verifyThatAddDocEnableOrDisable('enabled');
                });
            });
        });

        it('13 - If there are some document types available at a file level,New Document button should be enabled in context menu', function () {
            var expectedArray = ['', '', 'New Folder\nNF', 'New Document\nND', '', '', '', '', '', '', '', '', '', '', '', 'Copy Shortcut\nCS'];

            return searchUtil.openFile(fileRP).then(function () {
                webdriverUtils.waitTillElementVisible(fileTree.fileNumber).then(function () {
                    var fileNode = fileTree.fileNumber;
                    webdriverUtils.contextClick(fileNode).then(function () {
                        webdriverUtils.waitTillElementVisible(contextMenu.menuOptions).then(function () {
                            expect(contextMenu.menu.isDisplayed()).toBe(true);
                            contextMenu.menuOptions.getText().then(function (fileOptions) {
                                // console.log('file coptions: ', fileOptions);
                                expect(conversionUtils.isArraysIdentical(fileOptions, expectedArray)).toBe(true);
                            });
                        });
                    });
                });
            });
        });

        it('14 - If there are some document types available at a folder level,New Document button should be enabled in actions menu', function () {
            return searchUtil.openFile(fileEvents).then(function() {
                webdriverUtils.clickOnNodeInFileTree(eventsFolder, 'folder').then(function(){
                    verifyThatAddDocEnableOrDisable('enabled');
                });
            });
        });

        it('15 - If there are some document types available at a folder level,New Document button should be enabled in context menu', function () {
            var expectedArray = ['Expand', '', 'New Folder\nNF', 'New Document\nND', '', '', '', '', '', '', '', '', '', '', '', 'Copy Shortcut\nCS'];

            return searchUtil.openFile(fileEvents).then(function () {
                webdriverUtils.clickOnNodeInFileTree(eventsFolder, 'folder').then(function () {
                    var folderNode = fileTree.folderByText(eventsFolder);
                    webdriverUtils.contextClick(folderNode).then(function () {
                        webdriverUtils.waitTillElementVisible(contextMenu.addDocument).then(function () {
                            /* The add document node is a span. To get the "li" you need to get the parent of the node and check that class.
                             * The nodes in the context menu do not attach id's to the same html element tag name.
                             */
                            var addDocumentParent = contextMenu.addDocument.element(by.xpath('..'));
                            expect(addDocumentParent.isDisplayed()).toBe(true);
                            contextMenu.addDocument.getAttribute('class').then(function (classval) {
                                //console.log('val of class fcor add doc', classval);
                                expect(classval).not.toContain('disabled');
                            });
                            contextMenu.menuOptions.getText().then(function (fileOptions) {
                                // console.log('file coptions: ', fileOptions);
                                expect(conversionUtils.isArraysIdentical(fileOptions, expectedArray)).toBe(true);
                            });
                        });
                    });
                });
            });
        });

        ////-----------------------------Document type dropdown and document description related scenarios----------////
        it('16 - When a user opens  import dialog box at file level,correct document types should be displayed in the dropdown based on file template', function () {
            var expectedDocTypes = ['Application', 'Cancellation for noncompliance'];
            return searchUtil.openFile(fileRP).then(function() {
                uploadFile('single').then(function() {

                    openDocTypeDropdown();
                    //get the doc types from dropdown and save it in an array
                    var docTypes = addDocModal.docTypes.map(function (dType) {
                        return dType.getText();
                    });

                    docTypes.then(function (dt) {
                        expect(dt).toEqual(expectedDocTypes);
                    });
                });
            });
        });

        it('17 - When a user opens  import dialog box at folder level,correct document types should be displayed in the dropdown based on folder template', function () {
            var expectedDocTypes = ['Endorsement DEC', 'Original Policy', 'Renewal Policy'];
            return searchUtil.openFile(fileEvents).then(function() {
                webdriverUtils.clickOnNodeInFileTree(eventsFolder, 'folder');

                uploadFile('single').then(function() {

                    openDocTypeDropdown();
                    //get the doc types from dropdown and save it in an array
                    var docTypes = addDocModal.docTypes.map(function (dType) {
                        return dType.getText();
                    });

                    docTypes.then(function (dt) {
                        expect(dt).toEqual(expectedDocTypes);
                    });
                });
            });
        });

        it('18 - When a user opens import dialog box at file level and selects a document type, by default document description should equal to document type', function () {
            var selectFileType = 'Application';
            return searchUtil.openFile(fileRP).then(function() {
                uploadFile('single').then(function() {
                    openDocTypeDropdown();
                    addDocModal.selectDocType(selectFileType);
                    expect(addDocModal.docTypeButton.getText()).toBe(selectFileType);
                    expect(addDocModal.docDescription.getAttribute('value')).toBe(selectFileType);
                });
            });
        });

        //If this is the same modal as above, we don't need to test this twice since the only diff is how we got to the modal
        it('19 - When a user opens  import dialog box at folder level and selects a document type, by default document description should equal to document type', function () {
            var selectFileType = 'Original Policy';
            return searchUtil.openFile(fileEvents).then(function() {
                webdriverUtils.clickOnNodeInFileTree(eventsFolder, 'folder');

                uploadFile('single').then(function() {
                    openDocTypeDropdown();
                    addDocModal.selectDocType(selectFileType);
                    expect(addDocModal.docTypeButton.getText()).toBe(selectFileType);
                    expect(addDocModal.docDescription.getAttribute('value')).toBe(selectFileType);
                });
            });
        });

        //Note that editing the document description is different than the tests aboove for editing the page description in the add doc modal
        it('20 - User should be able to customize(add/edit) existing document description up to 255 characters', function () {
            var description = descriptionLength255 + 'this is longer than 255 characters';
            return searchUtil.openFile(fileRP).then(function () {
                uploadFile('single').then(function() {
                    //clear the field
                    addDocModal.docDescription.clear();
                    browser.sleep(5000);
                    //edit the doc description and check that the excess characters were not allowed in description
                    addDocModal.docDescription.sendKeys(description).then(function () {
                        browser.sleep(5000);
                        expect(addDocModal.docDescription.getAttribute('value')).toBe(descriptionLength255);
                    });
                });
            });
        });

        it('21 - Document Description should get maintained when updating document type.', function () {
            var description = 'policy xyz', selectFileType = 'Cancellation for noncompliance';
            return searchUtil.openFile(fileRP).then(function() {
                uploadFile('single').then(function() {
                    addDocModal.docDescription.clear();
                    browser.sleep(5000);
                    //edit the doc description
                    addDocModal.docDescription.sendKeys(description);
                    openDocTypeDropdown();
                    addDocModal.selectDocType(selectFileType);
                    expect(addDocModal.docTypeButton.getText()).toBe(selectFileType);
                    expect(addDocModal.docDescription.getAttribute('value')).toBe(description);
                });
            });
        });

        it('22 - Last Document Type entered should be remembered and defaulted in add document form when user re-open add doc form and navigated away from the current node in file tree', function () {
            fileUtils.deleteDocumentByDescription(fileRP, 'E-test1');
            var selectFileType = 'Cancellation for noncompliance';
            return searchUtil.openFile(fileRP).then(function() {
                uploadFile('single').then(function() {
                    openDocTypeDropdown();
                    addDocModal.selectDocType(selectFileType);
                    addDocModal.docDescription.clear();
                    addDocModal.docDescription.sendKeys('E-test1');
                    addDocModal.finalizeAddDocument.click().then(function () {
                        browser.sleep(5000).then(function() {
                            browser.sleep(1000);
                            fileTree.fileNumber.click();
                            browser.sleep(1500);
                            uploadFile('single').then(function() {
                                expect(addDocModal.docTypeButton.getText()).toBe(selectFileType);
                            });
                        });
                    });
                });
            });
        });


        //_____---------------------------Dates  and time----------------------//


        it('23 - In Import dialog on file level ,Date and Received fields should display current date by default', function () {
            var today = new Date();
            var day = today.getDate(), month = today.getMonth() + 1, year = today.getFullYear();
            day = (day < 10) ? '0' + day : day;
            month = (month < 10) ? '0' + month : month;

            return searchUtil.openFile(fileRP).then(function() {
                uploadFile('single').then(function() {
                    expect(addDocModal.docDate.getAttribute('value')).toBe(month + '/' + day + '/' + year);
                    expect(addDocModal.docReceivedDate.getAttribute('value')).toBe(month + '/' + day + '/' + year);
                });
            });
        });

        //Check to see if this is just another way to get to the same dialog and therefor is redundant
        it('24 - In Import dialog on folder level ,Date and Received fields should display current date by default', function () {
            var today = new Date();
            var day = today.getDate(), month = today.getMonth() + 1, year = today.getFullYear();
            day = (day < 10) ? '0' + day : day;
            month = (month < 10) ? '0' + month : month;

            return searchUtil.openFile(fileEvents).then(function() {
                webdriverUtils.clickOnNodeInFileTree(eventsFolder, 'folder');

                uploadFile('single').then(function() {
                    expect(addDocModal.docDate.getAttribute('value')).toBe(month + '/' + day + '/' + year);
                    expect(addDocModal.docReceivedDate.getAttribute('value')).toBe(month + '/' + day + '/' + year);
                });
            });
        });

        it('25 - Default time should be the current time', function () {
            var today = new Date();
            var hours = (today.getHours() % 12), minutes = today.getMinutes();
            hours = (hours == 0) ? 12 : ((hours < 10) ? '0' + hours : hours);
            minutes = (minutes < 10) ? '0' + minutes : minutes;
            return searchUtil.openFile(fileRP).then(function() {
                uploadFile('single').then(function() {
                    expect(addDocModal.getHours.getAttribute('value')).toBe(hours.toString());
                    expect(addDocModal.getMinutes.getAttribute('value')).toBe(minutes.toString());
                });
            });
        });

        ///--------------------add document form error validation -----------------------------//
        it('26 - If a user enters any invalid date in document date field,the DONE button should show disabled and greyed-out', function () {
            return searchUtil.openFile(fileRP).then(function() {
                uploadFile('single').then(function() {
                    addDocModal.docDate.clear();
                    addDocModal.docDate.sendKeys(invalidDateVal1);
                    addDocModal.docDescription.sendKeys('this');
                    expect(addDocModal.finalizeAddDocument.getAttribute('class')).toContain('disabled');
                    addDocModal.docDate.clear();
                    addDocModal.docDate.sendKeys(invalidDateVal2);
                    addDocModal.docDescription.sendKeys('this');
                    expect(addDocModal.finalizeAddDocument.getAttribute('class')).toContain('disabled');
                });
            });
        });

        it('27 - If a user enters any invalid date in received document date field,the DONE button should show disabled and greyed-out', function () {
            return searchUtil.openFile(fileRP).then(function() {
                uploadFile('single').then(function() {
                    addDocModal.docReceivedDate.clear();
                    addDocModal.docReceivedDate.sendKeys(invalidDateVal1);
                    addDocModal.docDescription.sendKeys('this');
                    expect(addDocModal.finalizeAddDocument.getAttribute('class')).toContain('disabled');
                    addDocModal.docReceivedDate.clear();
                    addDocModal.docReceivedDate.sendKeys(invalidDateVal2);
                    addDocModal.docDescription.sendKeys('this');
                    expect(addDocModal.finalizeAddDocument.getAttribute('class')).toContain('disabled');
                });
            });
        });

        it('28 - If a user enters any alphabetical value in document date field,the DONE button should show disabled and greyed-out', function () {
            return searchUtil.openFile(fileRP).then(function() {
                uploadFile('single').then(function() {
                    addDocModal.docDate.clear();
                    addDocModal.docDate.sendKeys(alphabeticalVal);
                    addDocModal.docDescription.sendKeys('this');
                    expect(addDocModal.finalizeAddDocument.getAttribute('class')).toContain('disabled');
                    addDocModal.docDate.clear();
                    addDocModal.docDate.sendKeys(alphabeticalVal);
                    addDocModal.docDescription.sendKeys('this');
                    expect(addDocModal.finalizeAddDocument.getAttribute('class')).toContain('disabled');
                });
            });
        });

        it('29 - If a user enters any alphabetical value in received document date field,the DONE button should show disabled and greyed-out', function () {
            return searchUtil.openFile(fileRP).then(function() {
                uploadFile('single').then(function() {
                    addDocModal.docReceivedDate.clear();
                    addDocModal.docReceivedDate.sendKeys(alphabeticalVal);
                    addDocModal.docDescription.sendKeys('this');
                    expect(addDocModal.finalizeAddDocument.getAttribute('class')).toContain('disabled');
                    addDocModal.docReceivedDate.clear();
                    addDocModal.docReceivedDate.sendKeys(alphabeticalVal);
                    addDocModal.docDescription.sendKeys('this');
                    expect(addDocModal.finalizeAddDocument.getAttribute('class')).toContain('disabled');
                });
            });
        });

        it('30 - if user enter invalid hours value(for example- 13) in time field,DONE button should be disabled and greyed-out', function () {
            return searchUtil.openFile(fileRP)
                .then(function () {
                    return uploadFile('single');
                })
                .then(addDocModal.getHours.clear)
                .then(function () {
                    return addDocModal.getHours.sendKeys(invalidHours);
                })
                .then(function () {
                    return addDocModal.docDescription.sendKeys('this');
                })
                .then(function () {
                    return expect(addDocModal.finalizeAddDocument.getAttribute('class')).toContain('disabled');
                });
        });

        it('31 - if user enter invalid minutes value(for example- 60) in time field,DONE button should be disabled and greyed-out', function () {
            return searchUtil.openFile(fileRP)
                .then(function () {
                    return uploadFile('single');
                })
                .then(addDocModal.getMinutes.clear)
                .then(function () {
                    return addDocModal.getMinutes.sendKeys(invalidMinutes);
                })
                .then(function () {
                    return addDocModal.docDescription.sendKeys('this');
                })
                .then(function () {
                    return expect(addDocModal.finalizeAddDocument.getAttribute('class')).toContain('disabled');
                });
        });

        it('32 - [Growl message existence on add doc. on success]on creating a doc without task,growl message should display', function () {
            return searchUtil.openFile(fileRP)
                .then(function () {
                    return uploadFile('single');
                })
                .then(addDocModal.docDescription.clear)
                .then(function () {
                    return addDocModal.docDescription.sendKeys('pageNameTest');
                })
                .then(addDocModal.finalizeAddDocument.click)
                .then(function () {
                    return expect(errorMessage.growlNotification.isDisplayed()).toBe(true);
                });
        });
    }
});