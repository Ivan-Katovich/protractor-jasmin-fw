exports.tags = ['File_Manipulation', 'Upload'];
var IR_filesview = require('../../PageObjects/FilesView.js'),
    IR_AddDocModal = require('./../../PageObjects/ModalDialogs/AddDocModal.js'),
    IR_AppendPageModal = require('./../../PageObjects/ModalDialogs/AppendPageModal.js'),
    IR_NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js'),
    IR_ErrorMessage = require('./../../PageObjects/ModalDialogs/ErrorMessage.js'),
    IR_FileTree = require('../../PageObjects/Containers/FileTree.js'),
    IR_DocumentPageActionsDropdown = require('./../../PageObjects/DropdownLists/DocumentPageActionsDropdown.js'),

    conversionUtils = require('../../utils/conversionUtils.js'),
    dataBaseHelper = require('../../utils/dataBaseHelper.js'),
    webdriverUtils = require('../../utils/webdriverExtentionUtils.js'),
    searchUtil = require('../../BusinessProcess/Search.js'),
    fileUtils = require('../../utils/fileUtils.js'),
    fs = require('../../utils/fileSystemUtils.js'),

    docPageActionsDropdown = new IR_DocumentPageActionsDropdown(),
    fileTree = new IR_FileTree(),
    addDocModal = new IR_AddDocModal(),
    navigationBar = new IR_NavigationBar(),
    filesArea = new IR_filesview(),
    appendModal = new IR_AppendPageModal(),
    errorMessage = new IR_ErrorMessage(),

    file = "AddPage",
    docWithPage = "DocToAddTo",
    docEmpty = "EmptyDoc",
    descriptionLength255 = 'Lorem ipsum dolor sit amet, nonummy ligula volutpat hac integer nonummy. Suspendisse ultricies, congue etiam tellus, erat libero, nulla eleifend, mauris pellentesque. Suspendisse integer praesent vel, integer gravida mauris, fringilla vehicula lacinia non',

    root = process.cwd(),
    exampleFolder = root + '\\test\\example\\',
    firstFname = 'moving-forward.txt',
    secFname = 'EditAnnotationIcon.txt',
    text = 'Hello World',

    isFirst = true;

describe('Add Pages feature', function() {
    var filePath = exampleFolder+'moving-forward.txt',
        multipleFiles = filePath + '\n' + exampleFolder + "EditAnnotationIcon.txt",
        firstFile = 'moving-forward.txt';

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

    function uploadFile(howmany) {
        return filesArea.actionsDropdownButton.click()
            .then(docPageActionsDropdown.addPageAction.click)
            .then(function () {
                return appendModal.appendModalHeader.waitReady();
            })
            .then(function () {
                switch (howmany) {
                    case 'single':
                        return appendModal.appendPageChooseFiles.sendKeys(filePath);
                    default:
                        return appendModal.appendPageChooseFiles.sendKeys(multipleFiles);
                }
            });
    }

    function nodeName(which) {
        switch (which) {
            case 'first':
                return fileTree.pagesInFileTree.first().getText();
            case 'last':
                return fileTree.pagesInFileTree.last().getText();
            default:
                return fileTree.pagesInFileTree.get(which).getText();
        }
    }

    function restoreFileStructure() {
        return fileUtils.deleteAllPagesFromDocument(file,docEmpty)
            .then(function () {
                return fileUtils.deletePage(file,docWithPage,'moving');
            })
            .then(function () {
                return fileUtils.deletePage(file,docWithPage,firstFname);
            })
            .then(function () {
                return fileUtils.deletePage(file,docWithPage,secFname);
            })
            .then(function () {
                return fileUtils.deletePage(file,docWithPage,'newTitle');
            });
    }

    function prepareDataAndPage(fileNumberToOpen, folderNameToNavigate, docNameToNavigate, appendSingleOrMultiple) {
        return searchUtil.openFile(fileNumberToOpen)
            .then(function () {
                if(!(folderNameToNavigate.indexOf('noFolder') > (-1))){
                    return webdriverUtils.showNodeChildrenByText(folderNameToNavigate, 'folder');
                }
            })
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree(docNameToNavigate, 'document');
            })
            .then(function () {
                return webdriverUtils.showNodeChildrenByText(docNameToNavigate, 'document');
            })
            .then(function () {
                return uploadFile(appendSingleOrMultiple);
            });
    }
    
    it('1 - When user clicks the Add Page action button in the ations menu, then the Add Pages modal opens with the drag and drop cloud icon displayed', function () {
        searchUtil.openFile(file)
            .then(function () {
                return webdriverUtils.clickOnNodeInFileTree(docWithPage, 'document');
            })
            .then(filesArea.actionsDropdownButton.click)
            .then(docPageActionsDropdown.addPageAction.click)
            .then(function () {
                return appendModal.appendModalHeader.waitReady();
            })
            .then(function () {
                expect(appendModal.appendPageModal.isPresent()).toBe(true);
                expect(appendModal.appendPageDragNDropIcon.isPresent()).toBe(true);
            })
    });

    it('3 - When a user edits the page name and then selects Add Pages, the page should display in the tree with the new name', function () {
        return prepareDataAndPage(file, 'noFolder', docWithPage, 'single')
            .then(appendModal.appendPageDocsToImport(0).click)
            .then(appendModal.appendPageDocsToImport(0).clear)
            .then(function () {
                return appendModal.appendPageDocsToImport(0).sendKeys('newTitle');
            })
            .then(appendModal.appendDone.click)
            .then(function () {
                return fileTree.pageByText('newTitle').waitReady();
            });
    });
    
    it('9 - When user adds 2 pages, only the first of the newly added pages should get highlighted in the filetree', function () {
        return prepareDataAndPage(file, 'noFolder', docWithPage, 'multiple')
            .then(appendModal.appendDone.click)
            .then(function () {
                return fileTree.pageByText(secFname).waitReady();
            })
            .then(function () {
                expect(nodeName(1)).toBe('2: ' + firstFile);
                expect(nodeName('last')).toBe('3: ' + secFname);
                expect(fileTree.pagesInFileTree.get(1).element(by.xpath('..')).getAttribute('class')).toContain('doc-selected');
                expect(fileTree.pagesInFileTree.get(2).element(by.xpath('..')).getAttribute('class')).not.toContain('doc-selected');
            })
    });
        
    it('13 - After adding a page, page count should increase by 1', function() {
        return prepareDataAndPage(file, 'noFolder', docWithPage, 'single')
            .then(appendModal.appendDone.click)
            .then(function () {
                return fileTree.pageByText(firstFile).waitReady();
            })
            .then(function () {
                return expect(filesArea.totalNumberOfPages().getText()).toContain('2');
            });
    });

    it('14 - After adding 2 pages, page count should increase by 2', function() {
        return prepareDataAndPage(file, 'noFolder', docWithPage, 'multiple')
            .then(appendModal.appendDone.click)
            .then(function () {
                return fileTree.pageByText(secFname).waitReady();
            })
            .then(function () {
                return expect(filesArea.totalNumberOfPages().getText()).toContain('3');
            });
    });

});