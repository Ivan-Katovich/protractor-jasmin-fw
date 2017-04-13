var modal = (require('./../elementary/modal'))(0);
var subModal = (require('./../elementary/modal'))(1);
var checkbox = require('./../elementary/checkbox');
var slider = require('./../elementary/slider');
var radioButton = require('./../elementary/radioButton');
var Cog = require('./../elementary/cog');
var convUtils = require('../../utils/conversionUtils.js');
var q = require('q');

var AddSlaModal = function () {

    var container = modal.container,
        config = {
            body: {
                root: by.id('sla-form'),
                cog: by.css('.sla-action-dropdown'),
                slaName: {
                    root: by.css('.editable-text-control'),
                    defaultInput: by.id('slaName'),
                    readOnlyMod: {
                        editBtn: by.xpath('.//*[contains(@class,"fa-pencil")]/..'),
                        editInput: by.tagName('input'),
                        clearBtn: by.css('.inline-edit-clear'),
                        acceptBtn: by.css('.btn-primary'),
                        denyBtn: by.css('.btn-default'),
                        value: by.css('.inline-readonly-text')
                    }
                },
                clearFix: {
                    root: by.css('.clearfix'),
                    hoursRadio: by.xpath('.//*[@id="hours"]/..'),
                    maxHoursNum: {
                        input: by.id('max-hours'),
                        inputDis: by.id('max-hours-dis'),
                        label: by.id('max-hours-lbl')
                    },
                    daysRadio: by.xpath('.//*[@id="days"]/..'),
                    maxDaysNum: {
                        input: by.id('max-days'),
                        inputDis: by.id('max-days-dis'),
                        label: by.id('max-days-lbl')
                    }
                },
                goodLvl: {
                    root: by.id('good-lvl'),
                    checkbox: by.css('.checkbox-control'),
                    slider: by.css('.fixed-col8'),
                    textInput: by.css('.form-control')
                },
                okLvl: {
                    root: by.id('ok-lvl'),
                    checkbox: by.css('.checkbox-control'),
                    slider: by.css('.fixed-col8'),
                    textInput: by.css('.form-control')
                },
                warnLvl: {
                    root: by.id('warn-lvl'),
                    checkbox: by.css('.checkbox-control'),
                    slider: by.css('.fixed-col8')
                },
                calculateTimeframeTitle: by.css('.d2'),
                timeRadio: {
                    root: by.id('time-radiobtn'),
                    taskCreationTime: by.xpath('.//*[@id="flowStart"]/..'),
                    taskCreationInfoBox: by.id('flowStart-info-box'),
                    taskCreationInfo: by.css('#flowStart-info-box>i'),
                    stepDurationTime: by.xpath('.//*[@id="stepDur"]/..'),
                    stepDurationInfoBox: by.id('stepDur-info-box'),
                    stepDurationInfo: by.css('#stepDur-info-box>i')
                },
                taskFilter: {
                    workflowsAndSteps: {
                        root: by.id('wflows-steps'),
                        description: by.css('.pull-left'),
                        showHide: by.id('ws-show-hide'),
                        filtersList: by.tagName('ir-workflow-filter-section-sla'),
                        items: {
                            root: by.css('.ir-vs-filter-item'),
                            radioButtons: by.css('.pull-left'),
                            showHide: by.css('.icon-box'),
                            selectAllCheckboxes: by.css('.inner-panel-body>.checkbox-control'),
                            checkBoxes: by.css('.col3-filter-list .checkbox-control')
                        }
                    },
                    groupsAndUsers: {
                        root: by.id('groups-users'),
                        mainCheckbox: by.css('.checkbox-control.pull-left'),
                        description: by.css('[style*="margin-left"]'),
                        showHide: by.id('gu-show-hide'),
                        itemsList: by.css('.sla-group-list'),
                        items: by.css('li.filter-list-item .checkbox-control')
                    },
                    drawersAndFileTypes: {
                        root: by.id('drawers-filetypes'),
                        mainCheckbox: by.css('#drawers-filetypes>*>*>*>.checkbox-control'), // paste without root
                        description: by.css('[style*="margin-left"]'),
                        showHide: by.id('df-show-hide'),
                        itemsList: by.css('.panel-body'),
                        firstLvlCheckboxSet: by.css('#drawers-filetypes .ir-accordion .accordion-toggle>.checkbox-control'), // paste without root
                        items: {
                            root: by.css('.ir-accordion'),
                            showHide: by.css('.icon-box'),
                            secondLvlCheckboxSet: by.css('.col3-list-item .checkbox-control')
                        }
                    }
                }
            },
            sidebar: {
                root: by.css('.db-sla-sidebar'),
                newSlaBtn: by.css('.new-sla-btn'),
                slaList: {
                    root: by.css('.db-sla-list'),
                    checkboxes: by.css('.checkbox-control'),
                    items: by.tagName('li'),
                    focusedItem: by.css('.selected-sla')
                }

            }
        };

    return Object.assign(modal,{
        get sidebar(){
            var root = container.element(config.sidebar.root);
            return {
                get newSlaBtn(){
                    return root.element(config.sidebar.newSlaBtn);
                },
                get slaList(){
                    return {
                        get checkboxes(){
                            return checkbox.Set(root.all(config.sidebar.slaList.checkboxes));
                        },
                        get items(){
                            var items = root.all(config.sidebar.slaList.items);
                            return {
                                get all(){
                                    return items;
                                },
                                isFocused: function(n){
                                    return items.get(n).getAttribute('class')
                                        .then(function (text) {
                                            return text.includes('selected-sla');
                                        });
                                },
                                getItem: function(n){
                                    return items.get(n);
                                },
                                getFocusedItem: function(){
                                    return root.element(config.sidebar.slaList.focusedItem);
                                },
                                getItemByName: function(name){
                                    return items.all(by.tagName('span')).filter(function(elem){
                                        return elem.getText()
                                            .then(function (text) {
                                                return text.replace(/  +/g,'') === name;
                                            })
                                    }).first();
                                },
                                isItemPresent: function(name){
                                    return items.all(by.css('span')).filter(function(elem){
                                        return elem.getText()
                                            .then(function (text) {
                                                return text.replace(/  +/g,'') === name;
                                            })
                                    }).count()
                                        .then(function (n) {
                                            return n>0;
                                        });
                                }

                            }
                        }
                    }
                }
            }
        },
        get body() {
            var root = container.element(config.body.root);
            return {
                get cog(){
                    return Cog(root.element(config.body.cog));
                },
                get slaName() {
                    var root = container.element(config.body.slaName.root);
                    return {
                        get defaultInput(){
                            return root.element(config.body.slaName.defaultInput);
                        },
                        getDefName: function(){
                            return this.defaultInput.getAttribute('value');
                        },
                        setDefName: function (name) {
                            var self = this;
                            return self.defaultInput.clear()
                                .then(function () {
                                    return self.defaultInput.sendKeys(name)
                                });
                        },
                        get readOnlyMod(){
                            return {
                                get editBtn(){
                                    return root.element(config.body.slaName.readOnlyMod.editBtn);
                                },
                                get value(){
                                    return root.element(config.body.slaName.readOnlyMod.value);
                                },
                                get editInput(){
                                    return root.element(config.body.slaName.readOnlyMod.editInput);
                                },
                                get acceptBtn(){
                                    return root.element(config.body.slaName.readOnlyMod.acceptBtn);
                                },
                                get denyBtn(){
                                    return root.element(config.body.slaName.readOnlyMod.denyBtn);
                                },
                                get clearBtn(){
                                    return root.element(config.body.slaName.readOnlyMod.clearBtn);
                                },
                                setNewName: function(name){
                                    var self = this;
                                    return browser.actions().mouseMove(self.editBtn).click().perform()
                                        .then(self.editInput.clear)
                                        .then(function () {
                                            return self.editInput.sendKeys(name);
                                        })
                                        .then(self.acceptBtn.click);
                                },
                                clickEdit: function(){
                                    return browser.actions().mouseMove(this.editBtn).click().perform();
                                }

                            }
                        }
                    }
                },
                get clearFix() {
                    var root = container.element(config.body.clearFix.root);
                    return {
                        get hoursRadio() {
                            return radioButton.Single(root.element(config.body.clearFix.hoursRadio));
                        },
                        get daysRadio() {
                            return radioButton.Single(root.element(config.body.clearFix.daysRadio));
                        },
                        get maxDaysNum() {
                            return {
                                get input() {
                                    return root.element(config.body.clearFix.maxDaysNum.input);
                                },
                                get inputDis() {
                                    return root.element(config.body.clearFix.maxDaysNum.inputDis);
                                },
                                get label() {
                                    return root.element(config.body.clearFix.maxDaysNum.label);
                                },
                                getLabel: function(){
                                    return this.label.getText();
                                },
                                getValue: function(){
                                    return this.input.getAttribute('value');
                                },
                                isReady: function(){
                                    return this.input.isPresent();
                                }
                            }
                        },
                        get maxHoursNum() {
                            return {
                                get input() {
                                    return root.element(config.body.clearFix.maxHoursNum.input);
                                },
                                get inputDis() {
                                    return root.element(config.body.clearFix.maxHoursNum.inputDis);
                                },
                                get label() {
                                    return root.element(config.body.clearFix.maxHoursNum.label);
                                },
                                getLabel: function(){
                                    return this.label.getText();
                                },
                                getValue: function(){
                                    return this.input.getAttribute('value');
                                },
                                isReady: function(){
                                    return this.input.isPresent();
                                }
                            }
                        }

                    }
                },
                get goodLvl(){
                    var root = container.element(config.body.goodLvl.root);
                    return {
                        isVisible: function(){
                            return root.isDisplayed();
                        },
                        get slider(){
                            return slider.LvlSlider(root.element(config.body.goodLvl.slider))
                        },
                        get checkbox(){
                            return checkbox.Single(root.element(config.body.goodLvl.checkbox));
                        },
                        get textInput() {
                            return root.element(config.body.goodLvl.textInput);
                        }

                    }
                },
                get okLvl(){
                    var root = container.element(config.body.okLvl.root);
                    return {
                        isVisible: function(){
                            return root.isDisplayed();
                        },
                        get slider(){
                            return slider.LvlSlider(root.element(config.body.okLvl.slider))
                        },
                        get checkbox(){
                            return checkbox.Single(root.element(config.body.okLvl.checkbox));
                        },
                        get textInput() {
                            return root.element(config.body.goodLvl.textInput);
                        }
                    }
                },
                get warnLvl(){
                    var root = container.element(config.body.warnLvl.root);
                    return {
                        isVisible: function(){
                            return root.isDisplayed();
                        },
                        get slider(){
                            return slider.LvlSlider(root.element(config.body.warnLvl.slider))
                        },
                        get checkbox(){
                            return checkbox.Single(root.element(config.body.warnLvl.checkbox));
                        }
                    }
                },
                get timeRadio(){
                    var root = container.element(config.body.timeRadio.root);
                    return {
                        get taskCreationTime(){
                            return radioButton.Single(root.element(config.body.timeRadio.taskCreationTime));
                        },
                        get stepDurationTime(){
                            return radioButton.Single(root.element(config.body.timeRadio.stepDurationTime));
                        },
                        getTaskCreationInfo: function(){
                            return browser.actions().mouseMove(root.element(config.body.timeRadio.taskCreationInfoBox)).perform()
                                .then(function () {
                                    return root.element(config.body.timeRadio.taskCreationInfo).getAttribute('uib-tooltip');
                                });
                        },
                        getStepDurationInfo: function(){
                            return browser.actions().mouseMove(root.element(config.body.timeRadio.stepDurationInfoBox)).perform()
                                .then(function () {
                                    return root.element(config.body.timeRadio.stepDurationInfo).getAttribute('uib-tooltip');
                                });
                        }
                    }
                },
                get taskFilter(){
                    return{
                        get workflowsAndSteps(){
                            var root = element(config.body.taskFilter.workflowsAndSteps.root);
                            return {
                                isVisible: function(){
                                    return root.isDisplayed();
                                },
                                isUnchecked: function(){
                                    return root.element(by.css('.field-required')).isPresent();
                                },
                                isCollapsed: function(){
                                    return element(config.body.taskFilter.workflowsAndSteps.showHide).element(by.tagName('i')).getAttribute('class')
                                        .then(function (text) {
                                            return text.includes('plus');
                                        })
                                },
                                expand: function(){
                                    return this.isCollapsed()
                                        .then(function (is) {
                                            if(is){
                                                return root.element(config.body.taskFilter.workflowsAndSteps.showHide).click();
                                            }
                                        });
                                },
                                collapse: function(){
                                    return this.isCollapsed()
                                        .then(function (is) {
                                            if(!is){
                                                return root.element(config.body.taskFilter.workflowsAndSteps.showHide).click();
                                            }
                                        });
                                },
                                get filtersList(){
                                    return root.element(config.body.taskFilter.workflowsAndSteps.filtersList);
                                },
                                get radioButtons(){
                                    return radioButton.Set(root.all(config.body.taskFilter.workflowsAndSteps.items.root).all(config.body.taskFilter.workflowsAndSteps.items.radioButtons));
                                },
                                get items(){
                                    var items = root.all(config.body.taskFilter.workflowsAndSteps.items.root);
                                    return {
                                        get all(){
                                            return items;
                                        },
                                        getItemByNameOrNumber: function(nameOrNumber){
                                            if(typeof nameOrNumber === 'number'){
                                                return items.get(nameOrNumber);
                                            } else if(typeof nameOrNumber === 'string'){
                                                return items.filter(function(elem,index){
                                                    return elem.getText()
                                                        .then(function (text) {
                                                            return text.includes(nameOrNumber);
                                                        })
                                                }).first();
                                            } else {
                                                throw new Error('Wrong type of variable: '+nameOrNumber);
                                            }
                                        },
                                        isCollapsedByNameOrNumber: function(nameOrNumber){
                                            return this.getItemByNameOrNumber(nameOrNumber).element(config.body.taskFilter.workflowsAndSteps.items.showHide).element(by.tagName('i')).getAttribute('class')
                                                .then(function (text) {
                                                    return text.includes('plus');
                                                })
                                        },
                                        expandByNameOrNumber: function(nameOrNumber){
                                            var self = this;
                                            return self.isCollapsedByNameOrNumber(nameOrNumber)
                                                .then(function (is) {
                                                    if(is){
                                                        return self.getItemByNameOrNumber(nameOrNumber).element(config.body.taskFilter.workflowsAndSteps.items.showHide).click();
                                                    }
                                                });
                                        },
                                        collapseByNameOrNumber: function(nameOrNumber){
                                            var self = this;
                                            return self.isCollapsedByNameOrNumber(nameOrNumber)
                                                .then(function (is) {
                                                    if(!is){
                                                        return self.getItemByNameOrNumber(nameOrNumber).element(config.body.taskFilter.workflowsAndSteps.items.showHide).click();
                                                    }
                                                });
                                        },
                                        get internalCheckboxes(){
                                            return checkbox.Set(items.all(config.body.taskFilter.workflowsAndSteps.items.checkBoxes));
                                        },
                                        getInternalCheckboxesByNameOrNumber: function(nameOrNumber){
                                            return checkbox.Set(this.getItemByNameOrNumber(nameOrNumber).all(config.body.taskFilter.workflowsAndSteps.items.checkBoxes));
                                        },
                                        getInternalSelectAllCheckboxByNameOrNumber: function(nameOrNumber){
                                            return checkbox.Single(this.getItemByNameOrNumber(nameOrNumber).element(config.body.taskFilter.workflowsAndSteps.items.selectAllCheckboxes));
                                        },
                                        get internalSelectAllCheckboxes(){
                                            return checkbox.Single(items.all(config.body.taskFilter.workflowsAndSteps.items.selectAllCheckboxes));
                                        },
                                        expandAll: function(){
                                            var self = this;
                                            return items.count()
                                                .then(function (count) {
                                                    return convUtils.asyncLoop(count,function(loop,i){
                                                        var innerPosition = i-1;
                                                        return self.expandByNameOrNumber(innerPosition)
                                                            .then(function () {
                                                                return loop();
                                                            });
                                                    });
                                                });
                                        },
                                        collapseAll: function(){
                                            var self = this;
                                            return items.count()
                                                .then(function (count) {
                                                    return convUtils.asyncLoop(count,function(loop,i){
                                                        var innerPosition = i-1;
                                                        return self.collapseByNameOrNumber(innerPosition)
                                                            .then(function () {
                                                                return loop();
                                                            });
                                                    });
                                                });
                                        },
                                        isAllExpanded: function(){
                                            var self = this;
                                            var deferred = q.defer();
                                            var isAll = [];
                                            items.each(function(elem,index){
                                                self.isCollapsedByNameOrNumber(index)
                                                    .then(function (is) {
                                                        return isAll.push(!is);
                                                    })
                                            });
                                            deferred.resolve(isAll);
                                            return deferred.promise;
                                        },
                                        isAllCollapsed: function(){
                                            var self = this;
                                            var deferred = q.defer();
                                            var isAll = [];
                                            items.each(function(elem,index){
                                                self.isCollapsedByNameOrNumber(index)
                                                    .then(function (is) {
                                                        return isAll.push(is);
                                                    })
                                            });
                                            deferred.resolve(isAll);
                                            return deferred.promise;
                                        }
                                    }
                                }
                            }
                        },
                        get groupsAndUsers(){
                            var root = element(config.body.taskFilter.groupsAndUsers.root);
                            return {
                                isVisible: function(){
                                    return root.isDisplayed();
                                },
                                isUnchecked: function(){
                                    return root.element(by.css('.field-required')).isPresent();
                                },
                                isCollapsed: function(){
                                    return element(config.body.taskFilter.groupsAndUsers.showHide).element(by.tagName('i')).getAttribute('class')
                                        .then(function (text) {
                                            return text.includes('plus');
                                        })
                                },
                                expand: function(){
                                    return this.isCollapsed()
                                        .then(function (is) {
                                            if(is){
                                                return root.element(config.body.taskFilter.groupsAndUsers.showHide).click();
                                            }
                                        });
                                },
                                collapse: function(){
                                    return this.isCollapsed()
                                        .then(function (is) {
                                            if(!is){
                                                return root.element(config.body.taskFilter.groupsAndUsers.showHide).click();
                                            }
                                        });
                                },
                                get itemsList(){
                                    return root.element(config.body.taskFilter.groupsAndUsers.itemsList);
                                },
                                get mainCheckbox(){
                                    return checkbox.Single(root.element(config.body.taskFilter.groupsAndUsers.mainCheckbox));
                                },
                                get checkboxSet(){
                                    return checkbox.Set(root.all(config.body.taskFilter.groupsAndUsers.items));
                                }
                            }
                        },
                        get drawersAndFileTypes(){
                            var root = element(config.body.taskFilter.drawersAndFileTypes.root);
                            return {
                                isVisible: function(){
                                    return root.isDisplayed();
                                },
                                isUnchecked: function(){
                                    return root.element(by.css('.field-required')).isPresent();
                                },
                                isCollapsed: function(){
                                    return element(config.body.taskFilter.drawersAndFileTypes.showHide).element(by.tagName('i')).getAttribute('class')
                                        .then(function (text) {
                                            return text.includes('plus');
                                        })
                                },
                                expand: function(){
                                    return this.isCollapsed()
                                        .then(function (is) {
                                            if(is){
                                                return root.element(config.body.taskFilter.drawersAndFileTypes.showHide).click();
                                            }
                                        });
                                },
                                collapse: function(){
                                    return this.isCollapsed()
                                        .then(function (is) {
                                            if(!is){
                                                return root.element(config.body.taskFilter.drawersAndFileTypes.showHide).click();
                                            }
                                        });
                                },
                                get itemsList(){
                                    return root.element(config.body.taskFilter.drawersAndFileTypes.itemsList);
                                },
                                get mainCheckbox(){
                                    return checkbox.Single(element(config.body.taskFilter.drawersAndFileTypes.mainCheckbox));
                                },

                                get firstLvlCheckboxSet(){
                                    return checkbox.Set(element.all(config.body.taskFilter.drawersAndFileTypes.firstLvlCheckboxSet));
                                },

                                get items(){
                                    var items = root.all(config.body.taskFilter.drawersAndFileTypes.items.root);
                                    return {
                                        get all(){
                                            return items;
                                        },
                                        getItemByNameOrNumber: function(nameOrNumber){
                                            if(typeof nameOrNumber === 'number'){
                                                return items.get(nameOrNumber);
                                            } else if(typeof nameOrNumber === 'string'){
                                                return items.filter(function(elem,index){
                                                    return elem.getText()
                                                        .then(function (text) {
                                                            return text.includes(nameOrNumber);
                                                        })
                                                }).first();
                                            } else {
                                                throw new Error('Wrong type of variable: '+nameOrNumber);
                                            }
                                        },
                                        isCollapsedByNameOrNumber: function(nameOrNumber){
                                            return this.getItemByNameOrNumber(nameOrNumber).element(config.body.taskFilter.drawersAndFileTypes.items.showHide).element(by.tagName('i')).getAttribute('class')
                                                .then(function (text) {
                                                    return text.includes('plus');
                                                })
                                        },
                                        expandByNameOrNumber: function(nameOrNumber){
                                            var self = this;
                                            return self.isCollapsedByNameOrNumber(nameOrNumber)
                                                .then(function (is) {
                                                    if(is){
                                                        return self.getItemByNameOrNumber(nameOrNumber).element(config.body.taskFilter.drawersAndFileTypes.items.showHide).click();
                                                    }
                                                });
                                        },
                                        collapseByNameOrNumber: function(nameOrNumber){
                                            var self = this;
                                            return self.isCollapsedByNameOrNumber(nameOrNumber)
                                                .then(function (is) {
                                                    if(!is){
                                                        return self.getItemByNameOrNumber(nameOrNumber).element(config.body.taskFilter.drawersAndFileTypes.items.showHide).click();
                                                    }
                                                });
                                        },
                                        getCheckboxesInItemWithNameOrNumber: function(nameOrNumber){
                                            var self = this;
                                            return checkbox.Set(self.getItemByNameOrNumber(nameOrNumber).all(config.body.taskFilter.drawersAndFileTypes.items.secondLvlCheckboxSet));
                                        },
                                        expandAll: function(){
                                            var self = this;
                                            return items.count()
                                                .then(function (count) {
                                                    return convUtils.asyncLoop(count,function(loop,i){
                                                        var innerPosition = i-1;
                                                        return self.expandByNameOrNumber(innerPosition)
                                                            .then(function () {
                                                                return loop();
                                                            });
                                                    });
                                                });
                                        },
                                        collapseAll: function(){
                                            var self = this;
                                            return items.count()
                                                .then(function (count) {
                                                    return convUtils.asyncLoop(count,function(loop,i){
                                                        var innerPosition = i-1;
                                                        return self.collapseByNameOrNumber(innerPosition)
                                                            .then(function () {
                                                                return loop();
                                                            });
                                                    });
                                                });
                                        },
                                        isAllExpanded: function(){
                                            var self = this;
                                            var deferred = q.defer();
                                            var isAll = [];
                                            items.each(function(elem,index){
                                                self.isCollapsedByNameOrNumber(index)
                                                    .then(function (is) {
                                                        return isAll.push(!is);
                                                    })
                                            });
                                            deferred.resolve(isAll);
                                            return deferred.promise;
                                        },
                                        isAllCollapsed: function(){
                                            var self = this;
                                            var deferred = q.defer();
                                            var isAll = [];
                                            items.each(function(elem,index){
                                                self.isCollapsedByNameOrNumber(index)
                                                    .then(function (is) {
                                                        return isAll.push(is);
                                                    })
                                            });
                                            deferred.resolve(isAll);
                                            return deferred.promise;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        get subModal(){
            return subModal;
        }
    });
};

module.exports = AddSlaModal;