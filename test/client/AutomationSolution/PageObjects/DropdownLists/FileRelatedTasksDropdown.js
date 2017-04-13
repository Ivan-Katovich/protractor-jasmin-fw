var FileRelatedTasksDropdown = function () { };

FileRelatedTasksDropdown.prototype = Object.create({}, {

    container: { value: ".vf-tab-pane.active .record-diaries " },

    searchInput: {
        get: function () {
            return element(by.css(this.container + '.searchbox input'));
        }
    },

    noTasksMessageDisplayed: {
        get: function () {
            return element.all(by.css(this.container + '.task-list .todo-notodos')).get(0).getText();
        }
    },

    noDiariesMessageDisplayed: {
        get: function () {
            return element.all(by.css(this.container + '.diaries-list .todo-notodos')).get(0).getText();
        }
    },

    tasks: {
        get: function () {
            return element.all(by.css(this.container + '.task-list ul.todo-list-items li[ng-repeat]'));
        }
    },

    taskById: {
        value: function (id) {
            return element.all(by.css(this.container + ".task-list ul.todo-list-items li[ng-repeat]#" + id));
        }
    },

    task: {
        value: function (task) {
            switch (typeof(task)) {
                case 'number':
                    return this.tasks.get(task);
                case 'string':
                    return element(by.cssContainingText('.task-list ul.todo-list-items li[ng-repeat] .todo-item-description', task));
            }
        }
    },

    taskFileName: {
        value: function (index) {
            return element.all(by.css(this.container + 'ir-task-item .todo-item h3')).get(index);
        }
    },

    priorityAndDate: {
        value: function (index) {
            return element.all(by.css(this.container + 'ir-task-item .task-priority')).get(index).getText();
        }
    },

    priority: {
        value: function (index, fn) {
            var self = this;
            if(fn){
                self.priorityAndDate(index).getText().then(function (text) {
                    var outgoingArray = text.split("|");
                    fn(outgoingArray[0].trim());
                });
            }else{
                return self.priorityAndDate(index).getText()
                    .then(function (text) {
                        var outgoingArray = text.split("|");
                        return outgoingArray[0].trim();
                    });
            }

        }
    },

    availableDate: {
        value: function (index, fn) {
            var self = this;
            if(fn){
                self.priorityAndDate(index).getText().then(function (text) {
                    var outgoingArray = text.split("|");
                    fn(outgoingArray[1].trim());
                });
            }else{
                return self.priorityAndDate(index).getText()
                    .then(function (text) {
                        var outgoingArray = text.split("|");
                        return outgoingArray[1].trim();
                    });
            }

        }
    },

    allTaskDescriptions: {
        get: function () {
            return element.all(by.css(this.container + 'ir-task-item .todo-item-description'));
        }
    },

    taskDescription: {
        value: function (index) {
            return this.allTaskDescriptions.get(index).getText();
        }
    },

    taskDetailsExpander: {
        value: function (index) {
            return element.all(by.css(this.container + 'ir-task-item .show-task-description')).get(index);
        }
    },

    expandAllTasks: {
        value: function () {
            this.tasks.count().then(function (count) {
                for (var i = 0; i < count; i++) {
                    element.all(by.css('.vf-tab-pane.active .record-diaries ir-task-item .show-task-description')).get(i).click();
                    browser.sleep(500);
                }
            });
        }
    },

    collapseAllTasks: {
        value: function () {
            this.expandAllTasks();
        }
    },

    getTaskDetails: {
        value: function (index, value) {
            switch (value) {
                case "Flow":
                    return element.all(by.css(this.container + 'ir-task-item .todo-item-title')).get(index).all(by.css('.todo-detail-row [title]')).get(0).getText();
                case "Step":
                    return element.all(by.css(this.container + 'ir-task-item .todo-item-title')).get(index).all(by.css('.todo-detail-row [title]')).get(1).getText();
                case "FileNumber":
                    return element.all(by.css(this.container + 'ir-task-item .todo-item-title')).get(index).all(by.css('h4')).get(0).getText();
                case "Sent by":
                    return element.all(by.css(this.container + '.todo-item-details')).get(index).all(by.css('.value')).get(0);
                case "Sent on":
                    return element.all(by.css(this.container + '.todo-item-details')).get(index).all(by.css('.value')).get(1);
                default:
                    return null;
            }
        }
    },

    hoverMouseOnTask: {
        value: function (task) {
            return browser.actions()
                    .mouseMove(this.task(task), { x: 5, y: 5 })
                    .mouseDown()
                    .perform();
        }
    },

    hoverMouseOnDiary: {
        value: function (diary) {
            return browser.actions()
                    .mouseMove(this.diary(diary), { x: 5, y: 5 })
                    .mouseDown()
                    .perform();
        }
    },
    
    clickCog: {
        value: function () {
            var self= this;
            var cog = element.all(by.css(self.container + '.fa.fa-cog')).filter(function (elem) {
                return elem.isDisplayed();
            }).first();
            return cog.click()
            .then(function () {
                    return cog.element(by.xpath('./../../ul'));
            })
        }
    },

    findTask: {
        value: function (taskDescription, fn) {
            if(fn){
                element(by.css('.vf-tab-pane.active .record-diaries .searchbox input')).clear();
                element(by.css('.vf-tab-pane.active .record-diaries .searchbox input')).sendKeys(taskDescription).then(function () {
                    element.all(by.css(".vf-tab-pane.active .record-diaries .task-list ul.todo-list-items li[ng-repeat] .show-task-description")).get(0).click().then(function () {
                        fn(0);
                    });
                });
            }else{
                return element(by.css('.vf-tab-pane.active .record-diaries .searchbox input')).clear()
                    .then(function () {
                        return element(by.css('.vf-tab-pane.active .record-diaries .searchbox input')).sendKeys(taskDescription);
                    })
                    .then(element.all(by.css(".vf-tab-pane.active .record-diaries .task-list ul.todo-list-items li[ng-repeat] .show-task-description")).get(0).click)
                    .then(function () {
                        return 0;
                    });
            }
        }
    },

    findDiary: {
        value: function (diaryDescription, fn) {
            element(by.css('.vf-tab-pane.active .record-diaries .searchbox input')).clear();
            element(by.css('.vf-tab-pane.active .record-diaries .searchbox input')).sendKeys(diaryDescription).then(function () {
                fn(0);
            });
        }
    },

    ifTaskDescriptionExpanded: {
        value: function (index, fn) {
            var ifExpanded = false;
            element.all(by.css('.vf-tab-pane.active .record-diaries ir-task-item .show-task-description i')).get(index).getAttribute("class").then(function (elementClass) {
                if (elementClass === "fa fa-caret-down") {
                    ifExpanded = true;
                }
                fn(ifExpanded);
            });
        }
    },

    diaries: {
        get: function () {
            return element.all(by.css(this.container + '.diaries-list ul.todo-list-items li[ng-repeat]'));
        }
    },

    diary: {
        value: function (diary) {
            switch (typeof (diary)) {
                case 'number':
                    return this.diaries.get(diary);
                case 'string':
                    return element(by.cssContainingText('.file-view .todo-list-items .diary-description', diary));
            };
        }
    },

    diaryFileName: {
        value: function (index) {
            return element.all(by.css(this.container + 'ir-diary-item .todo-item-title .todo-item-options h3')).get(index);
        }
    },

    diaryFileNumber: {
        value: function (index) {
            return element.all(by.css(this.container + 'ir-diary-item .todo-item h4')).get(index);
        }
    },

    diaryAssignedTo: {
        value: function (index) {
            return element.all(by.css(this.container + 'ir-diary-item .todo-item .diariy-option span.assign-value')).get(index);
        }
    },

    allDiariesDescriptions: {
        get: function () {
            return element.all(by.css(this.container + 'ir-diary-item .todo-item .diary-description'));
        }
    },

    diaryDescription: {
        value: function (index) {
            return this.allDiariesDescriptions.get(index).getText();
        }
    },

    //diaryActionsIcon: {
    //    value: function (index) {
    //        browser.actions().mouseMove(this.diaryDescription(index)).perform();
    //        return this.diaryActionsIconNotHovered(index);
    //    }
    //},

    //diaryActionsIconNotHovered: {
    //    value: function (index) {
    //        return element.all(by.css(this.container + 'ir-diary-item .task-focus-actions i')).get(index);
    //    }
    //},

    //diaryPreviewIcon: {
    //    value: function (index) {
    //        browser.actions().mouseMove(this.diaryDescription(index)).perform();
    //        return this.diaryPreviewIconNotHovered(index);
    //    }
    //},

    //diaryPreviewIconNotHovered: {
    //    value: function (index) {
    //        return element.all(by.css(this.container + 'ir-diary-item .task-item-actions button i')).get(index);
    //    }
    //},

    diaryPriorityDate: {
        value: function (index) {
            return element.all(by.css(this.container + 'ir-diary-item .todo-item-title .task-priority')).get(index);
        }
    },

    diaryPriority: {
        value: function (index, fn) {
            this.diaryPriorityDate(index).getText().then(function (text) {
                var outgoingArray = text.split("|");
                fn(outgoingArray[0].trim());
            });
        }
    },

    diaryAvailableDate: {
        value: function (index, fn) {
            this.diaryPriorityDate(index).getText().then(function (text) {
                var outgoingArray = text.split("|");
                fn(outgoingArray[1].trim());
            });
        }
    },

    fileRelatedItemsIcon: {
        value: function () {
            return element(by.css('.record-diaries.dropdown'));
        }
    }
});

module.exports = FileRelatedTasksDropdown;
