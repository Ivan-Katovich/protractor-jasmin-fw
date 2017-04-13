var ToDoList = require('./../../pageObjects/DropdownLists/ToDoList.js');
var toDoList = new ToDoList();
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');


function showAllTasksInToDoList() {
    var deferred = protractor.promise.defer();
    webdriverUtils.clickOnElement(toDoList.settingsFilter).then(function () {
        webdriverUtils.clickOnElement(toDoList.dateFilter('ALL')).then(function () {
            webdriverUtils.clickOnElement(toDoList.allTasksCheckbox).then(function () {
                webdriverUtils.clickOnElement(toDoList.settingsFilter);
                browser.waitForAngular().then(function () {
                    deferred.fulfill();
                });
            });
        });
    });
    return deferred.promise;
}

exports.showAllTasksInToDoList = showAllTasksInToDoList;