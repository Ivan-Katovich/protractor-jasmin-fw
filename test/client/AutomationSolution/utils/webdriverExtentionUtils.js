/* 
 * Functions that extend standard functionality of WebDriver
 */

var Q = require('q');
var conversionUtils = require('./conversionUtils.js');
var IR_FileTree = require('../PageObjects/Containers/FileTree.js');
var IR_NavigationBar = require('../PageObjects/Containers/NavigationBar.js');
var IR_SearchPage = require('../PageObjects/SearchPage.js');
var IR_ErrorMessage = require('../pageObjects/ModalDialogs/ErrorMessage.js');

var fileTree = new IR_FileTree();
var searchPage = new IR_SearchPage();
var navigationBar = new IR_NavigationBar();
var errorMessage = new IR_ErrorMessage();

function hoverMouse(object, x, y) {
    var px = x ? x : 0;
    var py = y ? x : 0;
    return object.waitToBeCompletelyVisibleAndStable()
        .then(function () {
            return object.getSize();
        })
        .then(function (size) {
            return browser.actions()
                .mouseMove(object, { x: size.width, y: 0 })
                .mouseMove({ x: px, y: py })
                .perform();
        });
}

function hoverAndClick(object, x, y) {
    var px = x ? x : 0;
    var py = y ? x : 0;
    return object.waitToBeCompletelyVisibleAndStable()
        .then(function () {
            return object.getSize();
        })
        .then(function (size) {
            return browser.actions()
                .mouseMove(object, { x: size.width, y: 0 })
                .mouseMove({ x: px, y: py })
                .click()
                .perform();
        });
}

function hoverAndContextClick(object, x, y) {
    var px = x ? x : 0;
    var py = y ? x : 0;
    return object.waitToBeCompletelyVisibleAndStable()
        .then(function () {
            return object.getSize();
        })
        .then(function (size) {
            return browser.actions()
                .mouseMove(object, { x: size.width, y: 0 })
                .mouseMove({ x: px, y: py })
                .click(protractor.Button.RIGHT)
                .perform();
        });
}

function isElementFocused(element) {
    return expect(element.getOuterHtml()).toEqual(browser.driver.switchTo().activeElement().getOuterHtml());
}

function clickTabKey() {
    return browser.actions().sendKeys('\t').perform();
}

function pressTab() {
    return browser.actions().sendKeys(protractor.Key.TAB).perform();
}

function pressTabs(count) {
    while (count > 0) {
        pressTab();
        count--;
    }
}

function shiftTabs(count) {
    return conversionUtils.asyncLoop(count, function(loop,i){
        return shiftTab()
            .then(function(){
                return loop();
            });
    });
}

function shiftTab() {
    return browser.actions().keyDown(protractor.Key.SHIFT).sendKeys(protractor.Key.TAB).keyUp(protractor.Key.SHIFT).perform();
    // browser.actions().keyDown(protractor.Key.SHIFT).perform(); //un presses shift key
}

function pressUps(count) {
    return conversionUtils.asyncLoop(count, function (loop, i) {
        return browser.actions().sendKeys(protractor.Key.ARROW_UP).perform()
            .then(function () {
                return loop();
            });
    });
}

function pressDowns(count) {
    return conversionUtils.asyncLoop(count, function(loop,i){
        return browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform()
            .then(function(){
                return loop();
            });
    });
}

function pressLefts(count) {
    while (count > 0) {
        browser.actions().sendKeys(protractor.Key.ARROW_LEFT).perform();
        count--;
    }
}

function pressRights(count) {
    while (count > 0) {
        browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
        count--;
    }
}

function pressEnter() {
    return browser.actions().sendKeys(protractor.Key.ENTER).perform();
}

function pressEscape() {
    return browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
}

function doubleClick(element) {
    return browser.actions().doubleClick(element).perform();
}

function contextClick(element) {
    return browser.actions().mouseMove(element).perform().then(function () {
        return browser.actions().click(protractor.Button.RIGHT).perform();
    });
}

function clickSpinnerInInputUp(element) {
    element.getSize().then(function (size) {
        var x = size.width - 5;
        var topY = size.height - 15;
        return browser.actions().mouseMove(element, { x: x, y: topY }).click().perform();
    });
}

function clickSpinnerInInputDown(element) {
    element.getSize().then(function (size) {
        var x = size.width - 5;
        var bottomY = size.height - 5;
        return browser.actions().mouseMove(element, { x: x, y: bottomY }).click().perform();
    });
}

//finds node by text and type and clicks the description
function clickOnNodeInFileTree(nodeText, nodeType) {
    switch (nodeType) {
        case 'folder':
            return fileTree.folderByText(nodeText).waitReady()
                .then(function (el) {
                    return el.click();
                });
        case 'page':
            return fileTree.pageByText(nodeText).waitReady()
                .then(function (el) {
                    return el.click();
                });
        case 'document':
            return fileTree.documentByText(nodeText).waitReady()
                .then(function (el) {
                    return el.click();
                });
        default:
            throw new Error('Wrong node type: '+nodeType+' must be: "folder", "document" or "page"');
    }
}


//finds a node by text and type and then displays the children of the given node 
function showNodeChildrenByText(nodeText, nodeType, index) {
    // figure logic in here to check if already expanded. Only perfom following if now already expanded
    if (typeof index == "undefined") {
        index = 0;
    }

    switch (nodeType) {
        case 'folder':
            return waitTillElementVisible(fileTree.expandCollapseFolderNode(nodeText, index))
                .then(function () {
                    return fileTree.expandCollapseFolderNode(nodeText, index).click();
                });
            break;
        case 'document':
            return waitTillElementVisible(fileTree.expandCollapseDocumentNode(nodeText, index))
                .then(function () {
                    return fileTree.expandCollapseDocumentNode(nodeText, index).click();
                });
            break;
    }

}

//finds all nodes with a common text and type, gets the given index, and then displays the children of the given node 
function showNodeChildrenByTextAndIndex(nodeText, nodeType, index) {
    // figure logic in here to check if already expanded. Only perfom following if now already expanded
    switch (nodeType) {
        case 'folder':
            return waitTillElementVisible(fileTree.expandCollapseFolderNode(nodeText)).then(function () {
                fileTree.expandCollapseFolderNode(nodeText).click();
            });
            break;
        case 'document':
            return waitTillElementVisible(fileTree.expandCollapseDocumentNode(nodeText)).then(function () {
                fileTree.expandCollapseDocumentNode(nodeText).click();
            });
            break;
    }
}

// selects node to bring up menu options
function selectNodeIconByText(nodeText) {
    return fileTree.fileTreeNodesByText(nodeText).click();
}




// This Function returns an element index in a collection of elements or -1 if the element was not found
// can be used like this: getItemIndex(elementCollection, itemName, function (result) {  ..doSomethingWithResult(result)});
function getItemIndex(elementCollection, itemName, fn) {
    var index = -1;
    elementCollection.count().then(function (count) {
        var promises = [];
        for (var i = 0; i < count; i++) {
            promises.push(elementCollection.get(i).getText());
        }
        Q.all(promises).done(function (resultArray) {
            for (var i = 0; i < resultArray.length; i++) {
                if (resultArray[i].toLowerCase().trim() === itemName.toLowerCase().trim()) {
                    index = i;
                    break;
                }
            }
            fn(index);
        });
    });
}

function ctrlShiftClick(element) {
    browser.actions().sendKeys(protractor.Key.SHIFT).sendKeys(protractor.Key.CONTROL).click(element).perform();
    browser.actions().keyDown(protractor.Key.SHIFT).perform(); //un presses shift key
    browser.actions().keyDown(protractor.Key.CONTROL).perform(); //un presses shift key
}

function ctrlClick(element) {
    return browser.actions().keyDown(protractor.Key.CONTROL).click(element).keyUp(protractor.Key.CONTROL).perform();
}

function shiftClick(element) {
    return browser.actions().keyDown(protractor.Key.SHIFT).click(element).keyUp(protractor.Key.SHIFT).perform();
}

function shiftDown() {
    browser.actions().sendKeys(protractor.Key.SHIFT).sendKeys(protractor.Key.ARROW_DOWN).perform();
    browser.actions().keyDown(protractor.Key.SHIFT).perform(); //un presses shift key
}

function shiftUp() {
    browser.actions().sendKeys(protractor.Key.SHIFT).sendKeys(protractor.Key.ARROW_UP).perform();
    browser.actions().keyDown(protractor.Key.SHIFT).perform(); //un presses shift key
}

function waitTillElementVisible(element) {
    return browser.wait(function () {
        return element.isDisplayed();
    }, 20000);
}

function waitTillNotPresent(element) {
    return browser.wait(function () {
        return element.isPresent().then(function (displayed) {
            return !displayed;
        });
    }, 15000);
}

function waitTillElementPresent(element) {
    return browser.wait(function () { return element.isPresent(); }, 10000);
}

//flag: firefoxClick
function clickOnElement(element) {
    if (browser.browserName === 'firefox') {
        return browser.actions().mouseMove(element).mouseDown().mouseUp().perform();
    } else {
        return element.click();
    }
}

function ifOrderedByPriority(priorityArray) {
    var priorityNumberArray = [];
    for (var i = 0; i < priorityArray.length; i++) {
        priorityArray[i] = priorityArray[i].substring(0, 10);
        priorityNumberArray.push(priorityArray[i].replace('PRIORITY ', ''));
    }
    return conversionUtils.isArraySortedAscending(priorityNumberArray);
}

function waitForGrowl() {
    return browser.wait(function () {
        return errorMessage.growlNotifications
            .then(function (growls) {
                return growls.length > 0;
            })
    }, 10000);
}

function waitForGrowlDisappears(){
    return browser.wait(function () {
        return errorMessage.growlNotifications
            .then(function (growls) {
                return growls.length === 0;
            })
    }, 10000);
}

exports.waitForGrowl = waitForGrowl;
exports.waitForGrowlDisappears = waitForGrowlDisappears;
exports.selectNodeIconByText = selectNodeIconByText;
exports.showNodeChildrenByText = showNodeChildrenByText;
exports.clickOnNodeInFileTree = clickOnNodeInFileTree;
exports.isElementFocused = isElementFocused;
exports.clickOnElement = clickOnElement;
exports.clickTabKey = clickTabKey;
exports.pressTab = pressTab;
exports.pressTabs = pressTabs;
exports.shiftTab = shiftTab;
exports.shiftTabs = shiftTabs;
exports.pressUps = pressUps;
exports.pressDowns = pressDowns;
exports.pressLefts = pressLefts;
exports.pressRights = pressRights;
exports.pressEscape = pressEscape;
exports.pressEnter = pressEnter;
exports.doubleClick = doubleClick;
exports.clickSpinnerInInputUp = clickSpinnerInInputUp;
exports.clickSpinnerInInputDown = clickSpinnerInInputDown;
exports.getItemIndex = getItemIndex;
exports.waitTillElementVisible = waitTillElementVisible;
exports.waitTillNotPresent = waitTillNotPresent;
exports.waitTillElementPresent = waitTillElementPresent;
exports.ctrlClick = ctrlClick;
exports.shiftClick = shiftClick;
exports.ctrlShiftClick = ctrlShiftClick;
exports.shiftDown = shiftDown;
exports.shiftUp = shiftUp;
exports.clickOnElement = clickOnElement;
exports.ifOrderedByPriority = ifOrderedByPriority;
exports.contextClick = contextClick;
exports.hoverMouse = hoverMouse;
exports.hoverAndClick = hoverAndClick;
exports.hoverAndContextClick = hoverAndContextClick;