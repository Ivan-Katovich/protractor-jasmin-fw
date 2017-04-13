exports.tags = ['Process_Dashboard', 'SLA'];

var Navigation = require('./../../../pageObjects/Containers/NavigationBar.js'),
    Dashboard = require('./../../../pageObjects/Dashboard/dashboard.js'),

    dbHelper = require('./../../../utils/dataBaseHelper.js'),

    navigation = new Navigation(),
    dashboard = Dashboard(),
    convUtils = require('../../../utils/conversionUtils.js'),

    isFirst = true;

var data = {
    slaModalDefaultName: 'New Service Level 1',
    daysRadioLabel: 'Days',
    hoursRadioLabel: 'Hours',
    maxDaysNumLabel: {label:'Max number of Days', defAmount: '120'},
    maxHoursNumLabel: {label:'Max number of Hours', defAmount: '24'},
    taskCreationTimeInfo: 'Service levels for tasks will be calculated using the time since a task was created to the current date/time.',
    stepDurationTimeInfo: 'Service levels for tasks will be calculated using the sum of the time elapsed for all steps selected within the SLA definition. For a selected step, the time will be calculated from the time the task entered the step to the time the task exited the step. For the step where the task currently resides, calculated time will include the time since the task entered the step to the current date/time.',
    areYouSureModalBodyText: {
        firstRow: 'You have made changes that will be lost if you leave this screen.',
        secondRow: 'Are you sure you want to leave?'
    },
    confirmationModalBodyText: 'Are you sure you want to DELETE',
    slaName255symbols: 'Lorem ipsum dolor sit amet, nonummy ligula volutpat hac integer nonummy. Suspendisse ultricies, congue etiam tellus, erat libero, nulla eleifend, mauris pellentesque. Suspendisse integer praesent vel, integer gravida mauris, fringilla vehicula lacinia non',
    slaName250symbols: 'Lorem ipsum dolor sit amet, nonummy ligula volutpat hac integer nonummy. Suspendisse ultricies, congue etiam tellus, erat libero, nulla eleifend, mauris pellentesque. Suspendisse integer praesent vel, integer gravida mauris, fringilla vehicula lacini'
};

function restoreFileStructure() {
    return dbHelper.executeVoidCommand("delete from FilterAccount")
        .then(function () {
            return dbHelper.executeVoidCommand("delete from FilterLocation");
        })
        .then(function () {
            return dbHelper.executeVoidCommand("delete from FilterObjectType");
        })
        .then(function () {
            return dbHelper.executeVoidCommand("delete from FilterFlow");
        })
        .then(function () {
            return dbHelper.executeVoidCommand("delete from FilterStep");
        })
        .then(function () {
            return dbHelper.executeVoidCommand("delete from AgeBucket");
        })
        .then(function () {
            return dbHelper.executeVoidCommand("delete from DashboardViewServiceLevel");
        })
        .then(function () {
            return dbHelper.executeVoidCommand("delete from DashboardView");
        })
        .then(function () {
            return dbHelper.executeVoidCommand("delete from ServiceLevel");
        });
}

/* spec; */
describe('Process Dashboard - Add new SLA', function () {

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
                    return navigation.dashboardIcon.waitReady();
                })
                .then(navigation.dashboardIcon.click)
                .then(function () {
                    return browser.sleep(2000);
                });
        }else{
            return browser.driver.get(browser.params.defaultUrl)
                .then(function () {
                    return navigation.dashboardIcon.waitReady();
                })
                .then(navigation.dashboardIcon.click)
                .then(function () {
                    return browser.sleep(2000);
                });
        }
    });

    afterEach(function () {
        return restoreFileStructure()
            .then(function () {
                return browser.executeScript('window.localStorage.clear();');
            });
    });

    it('1-User should be able to open modal dialogue and close it without creating new SLA (modal dialogue should work correctly)', function () {
        return dashboard.sla.header.cog.click()
        .then(function(){
            return browser.sleep(5000);
        })
        .then(function () {
            expect(dashboard.addSlaModal.isVisible()).toBe(true);
            expect(dashboard.addSlaModal.sidebar.newSlaBtn.isEnabled()).toBe(false);
            expect(dashboard.addSlaModal.body.slaName.getDefName()).toBe('New Service Level 1');
            expect(dashboard.addSlaModal.body.clearFix.daysRadio.getLabel()).toBe('Days');
            expect(dashboard.addSlaModal.body.clearFix.hoursRadio.getLabel()).toBe('Hours');
            expect(dashboard.addSlaModal.body.clearFix.daysRadio.isRSelected()).toBe(true);
            expect(dashboard.addSlaModal.body.clearFix.maxDaysNum.getLabel()).toBe('Max number of Days');
            expect(dashboard.addSlaModal.body.clearFix.maxHoursNum.getLabel()).toBe('Max number of Hours');
            expect(dashboard.addSlaModal.body.clearFix.maxDaysNum.getValue()).toBe('120');
            expect(dashboard.addSlaModal.body.clearFix.maxHoursNum.isReady()).toBe(false);
            expect(dashboard.addSlaModal.body.goodLvl.checkbox.isChecked()).toBe(true);
            expect(dashboard.addSlaModal.body.goodLvl.checkbox.getLabel()).toBe('Good');
            expect(dashboard.addSlaModal.body.okLvl.checkbox.isChecked()).toBe(false);
            expect(dashboard.addSlaModal.body.warnLvl.checkbox.isChecked()).toBe(false);
            expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe('120 days');
            expect(dashboard.addSlaModal.body.goodLvl.slider.getMinAmount()).toBe('0 days');
            expect(dashboard.addSlaModal.body.goodLvl.slider.isHighlighted()).toBe(true);
            expect(dashboard.addSlaModal.body.okLvl.slider.isHighlighted()).toBe(false);
            expect(dashboard.addSlaModal.body.warnLvl.slider.isHighlighted()).toBe(false);
            expect(dashboard.addSlaModal.body.timeRadio.taskCreationTime.getLabel()).toBe('Task Creation Time');
            expect(dashboard.addSlaModal.body.timeRadio.stepDurationTime.getLabel()).toBe('Step Duration Time');
            expect(dashboard.addSlaModal.body.timeRadio.taskCreationTime.isRSelected()).toBe(true);
            expect(dashboard.addSlaModal.body.timeRadio.getTaskCreationInfo()).toBe(data.taskCreationTimeInfo);
            expect(dashboard.addSlaModal.body.timeRadio.getStepDurationInfo()).toBe(data.stepDurationTimeInfo);
            expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.isVisible()).toBe(true);
            expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.isUnchecked()).toBe(true);
            expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.isCollapsed()).toBe(true);
            expect(dashboard.addSlaModal.body.taskFilter.groupsAndUsers.isVisible()).toBe(true);
            expect(dashboard.addSlaModal.body.taskFilter.groupsAndUsers.isUnchecked()).toBe(false);
            expect(dashboard.addSlaModal.body.taskFilter.groupsAndUsers.isCollapsed()).toBe(true);
            expect(dashboard.addSlaModal.body.taskFilter.groupsAndUsers.mainCheckbox.isPartChecked()).toBe(false);
            expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.isVisible()).toBe(true);
            expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.isUnchecked()).toBe(false);
            expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.isCollapsed()).toBe(true);
            expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.mainCheckbox.isPartChecked()).toBe(false);
            expect(dashboard.addSlaModal.footer.okBtn.isEnabled()).toBe(false);
            expect(dashboard.addSlaModal.footer.resetBtn.isEnabled()).toBe(false);
        })
        .then(dashboard.addSlaModal.header.itself.click)
        .then(function () {
            return dashboard.addSlaModal.compare('dashboardAddNewSlaModal');
        })
        .then(dashboard.addSlaModal.body.clearFix.hoursRadio.select)
        .then(function () {
            return expect(dashboard.addSlaModal.footer.resetBtn.isEnabled()).toBe(true);
        })
        .then(dashboard.addSlaModal.footer.reset)
        .then(function () {
            expect(dashboard.addSlaModal.footer.resetBtn.isEnabled()).toBe(false);
            expect(dashboard.addSlaModal.body.clearFix.daysRadio.isRSelected()).toBe(true);
        })
        .then(function () {
            return dashboard.addSlaModal.body.slaName.setDefName('Alternative Sla Name');
        })
        .then(dashboard.addSlaModal.body.timeRadio.stepDurationTime.select)
        .then(dashboard.addSlaModal.footer.reset)
        .then(function () {
            expect(dashboard.addSlaModal.footer.resetBtn.isEnabled()).toBe(false);
            expect(dashboard.addSlaModal.body.slaName.getDefName()).toBe('New Service Level 1');
            expect(dashboard.addSlaModal.body.timeRadio.taskCreationTime.isRSelected()).toBe(true);
        })
        .then(dashboard.addSlaModal.header.close)
        .then(function () {
            // return dashboard.addSlaModal.container.waitMissing();
            return browser.waitForAngular();
        })
        .then(function () {
            expect(dashboard.addSlaModal.container.isPresent()).toBe(false);
            expect(dashboard.sla.emptySla.addSlaBtn.isDisplayed()).toBe(true);
        });
    });

    it('2-User should be able to add one or few new SLAs using AddNewSla modal dialogue options', function () {
        return dashboard.sla.header.cog.click()
            .then(function () {
                expect(dashboard.addSlaModal.footer.cancelBtn.isPresent()).toBe(false);
                expect(dashboard.addSlaModal.footer.okBtn.getText()).toBe('Add');
                expect(dashboard.addSlaModal.footer.resetBtn.getText()).toBe('Reset');
            })
            .then(function () {
                return dashboard.addSlaModal.body.slaName.setDefName('First new SLA');
            })
            .then(dashboard.addSlaModal.body.clearFix.hoursRadio.select)
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.selectByNumber(2);
            })
            .then(dashboard.addSlaModal.footer.accept)
            .then(function () {
                expect(dashboard.addSlaModal.sidebar.slaList.checkboxes.count()).toBe(1);
                expect(dashboard.addSlaModal.footer.okBtn.isEnabled()).toBe(false);
                expect(dashboard.addSlaModal.footer.cancelBtn.isPresent()).toBe(false);
                expect(dashboard.addSlaModal.footer.okBtn.getText()).toBe('Apply');
            })
            .then(dashboard.addSlaModal.sidebar.newSlaBtn.click)
            .then(function () {
                return dashboard.addSlaModal.body.slaName.setDefName('Second new SLA');
            })
            .then(dashboard.addSlaModal.body.timeRadio.stepDurationTime.select)
            .then(function () {
                expect(dashboard.addSlaModal.footer.okBtn.isEnabled()).toBe(false);
                expect(dashboard.addSlaModal.footer.cancelBtn.isEnabled()).toBe(true);
                expect(dashboard.addSlaModal.footer.okBtn.getText()).toBe('Add');
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.selectByNumber(1);
            })
            .then(function () {
                return dashboard.addSlaModal.body.okLvl.checkbox.check();
            })
            .then(function () {
                return expect(dashboard.addSlaModal.footer.okBtn.isEnabled()).toBe(false);
            })
            .then(function () {
                return dashboard.addSlaModal.body.warnLvl.checkbox.check();
            })
            .then(function () {
                return expect(dashboard.addSlaModal.footer.okBtn.isEnabled()).toBe(false);
            })
            .then(function () {
                return dashboard.addSlaModal.body.goodLvl.slider.movePointer(-300);
            })
            .then(function () {
                return dashboard.addSlaModal.body.okLvl.slider.movePointer(-150);
            })
            .then(function () {
                return expect(dashboard.addSlaModal.footer.okBtn.isEnabled()).toBe(true);
            })
            .then(dashboard.addSlaModal.footer.accept)
            .then(function () {
                expect(dashboard.addSlaModal.sidebar.slaList.checkboxes.count()).toBe(2);
                expect(dashboard.addSlaModal.footer.okBtn.isEnabled()).toBe(false);
                expect(dashboard.addSlaModal.footer.cancelBtn.isPresent()).toBe(false);
            })
            .then(dashboard.addSlaModal.sidebar.newSlaBtn.click)
            .then(function () {
                expect(dashboard.addSlaModal.footer.okBtn.isEnabled()).toBe(false);
                expect(dashboard.addSlaModal.footer.cancelBtn.isEnabled()).toBe(true);
                expect(dashboard.addSlaModal.footer.okBtn.getText()).toBe('Add');
            })
            .then(dashboard.addSlaModal.footer.cancel)
            .then(function () {
                expect(dashboard.addSlaModal.sidebar.slaList.checkboxes.count()).toBe(2);
                expect(dashboard.addSlaModal.footer.okBtn.isEnabled()).toBe(false);
                expect(dashboard.addSlaModal.footer.cancelBtn.isPresent()).toBe(false);
                expect(dashboard.addSlaModal.sidebar.slaList.items.isFocused(0)).toBe(true);
            })
            .then(dashboard.addSlaModal.sidebar.newSlaBtn.click)
            .then(function () {
                return dashboard.addSlaModal.body.slaName.setDefName('Fourth new SLA');
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.selectByNumber(0);
            })
            .then(dashboard.addSlaModal.footer.cancel)
            .then(function () {
                expect(dashboard.addSlaModal.subModal.isVisible()).toBe(true);
                expect(dashboard.addSlaModal.subModal.header.getName()).toBe('Are You Sure?');
                expect(dashboard.addSlaModal.subModal.getBodyText()).toContain(data.areYouSureModalBodyText.firstRow);
                expect(dashboard.addSlaModal.subModal.getBodyText()).toContain(data.areYouSureModalBodyText.secondRow);
                expect(dashboard.addSlaModal.subModal.footer.cancelBtn.getText()).toBe('No, Stay Here');
                expect(dashboard.addSlaModal.subModal.footer.okBtn.getText()).toBe('Yes, Leave');
            })
            .then(dashboard.addSlaModal.subModal.footer.accept)
            .then(function () {
                expect(dashboard.addSlaModal.sidebar.slaList.checkboxes.count()).toBe(2);
                expect(dashboard.addSlaModal.footer.okBtn.isEnabled()).toBe(false);
                expect(dashboard.addSlaModal.footer.cancelBtn.isPresent()).toBe(false);
                expect(dashboard.addSlaModal.sidebar.slaList.items.isFocused(0)).toBe(true);
            })
            .then(dashboard.addSlaModal.sidebar.slaList.items.getItem(0).click)
            .then(dashboard.addSlaModal.body.clearFix.daysRadio.select)
            .then(dashboard.addSlaModal.sidebar.slaList.items.getItem(1).click)
            .then(function () {
                expect(dashboard.addSlaModal.subModal.isVisible()).toBe(true);
                expect(dashboard.addSlaModal.subModal.header.getName()).toBe('Are You Sure?');
                expect(dashboard.addSlaModal.subModal.getBodyText()).toContain(data.areYouSureModalBodyText.firstRow);
                expect(dashboard.addSlaModal.subModal.getBodyText()).toContain(data.areYouSureModalBodyText.secondRow);
                expect(dashboard.addSlaModal.subModal.footer.cancelBtn.getText()).toBe('No, Stay Here');
                expect(dashboard.addSlaModal.subModal.footer.okBtn.getText()).toBe('Yes, Leave');
            })
            .then(dashboard.addSlaModal.subModal.footer.accept)
            .then(function () {
                expect(dashboard.addSlaModal.sidebar.slaList.checkboxes.count()).toBe(2);
                expect(dashboard.addSlaModal.footer.okBtn.isEnabled()).toBe(false);
                expect(dashboard.addSlaModal.footer.cancelBtn.isPresent()).toBe(false);
                expect(dashboard.addSlaModal.sidebar.slaList.items.isFocused(1)).toBe(true);
            });
    });

    it('3-User should be able to copy or delete SLA through modal dialogue', function () {
        return dashboard.sla.header.cog.click()
            .then(function () {
                return dashboard.addSlaModal.body.slaName.setDefName('First new SLA');
            })
            .then(dashboard.addSlaModal.body.clearFix.hoursRadio.select)
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.selectByNumber(2);
            })
            .then(dashboard.addSlaModal.footer.accept)
            .then(function () {
                return expect(dashboard.addSlaModal.sidebar.slaList.checkboxes.count()).toBe(1);
            })
            .then(function () {
                return dashboard.addSlaModal.body.cog.expand();
            })
            .then(function () {
                expect(dashboard.addSlaModal.body.cog.isEnabledByDescription('Copy Service Level')).toBe(true);
                expect(dashboard.addSlaModal.body.cog.isEnabledByDescription('Delete Service Level')).toBe(true);
            })
            .then(function () {
                return dashboard.addSlaModal.body.cog.selectByDescription('Copy Service Level');
            })
            .then(function () {
                expect(dashboard.addSlaModal.sidebar.slaList.checkboxes.count()).toBe(2);
                expect(dashboard.addSlaModal.body.clearFix.hoursRadio.isRSelected()).toBe(true);
                expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.isRSelectedByNumber(2)).toBe(true);
                expect(dashboard.addSlaModal.footer.okBtn.isEnabled()).toBe(false);
                expect(dashboard.addSlaModal.footer.resetBtn.isEnabled()).toBe(false);
                expect(dashboard.addSlaModal.sidebar.slaList.items.getFocusedItem().getText()).toBe('First new SLA Copy 1');
            })
            .then(function () {
                return convUtils.asyncLoop(4, function(loop,i){
                    var innerPosition = i-1;
                    return dashboard.addSlaModal.sidebar.slaList.items.getItem(0).click()
                        .then(function () {
                            return dashboard.addSlaModal.body.cog.expand();
                        })
                        .then(function () {
                            return dashboard.addSlaModal.body.cog.selectByDescription('Copy Service Level');
                        })
                        .then(function () {
                            return expect(dashboard.addSlaModal.sidebar.slaList.items.getFocusedItem().getText()).toContain('Copy '+(innerPosition+2));
                        })
                        .then(function(){
                            return loop();
                        });
                });
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.selectByNumber(1);
            })
            .then(dashboard.addSlaModal.footer.accept)
            .then(function () {
                expect(dashboard.addSlaModal.footer.okBtn.isEnabled()).toBe(false);
                expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.isRSelectedByNumber(1));
            })
            .then(dashboard.addSlaModal.sidebar.newSlaBtn.click)
            .then(function () {
                return dashboard.addSlaModal.body.slaName.setDefName(data.slaName255symbols);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.selectByNumber(0);
            })
            .then(dashboard.addSlaModal.footer.accept)
            .then(function () {
                return dashboard.addSlaModal.body.cog.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.cog.selectByDescription('Copy Service Level');
            })
            .then(function () {
                return expect(dashboard.addSlaModal.sidebar.slaList.items.getFocusedItem().getText()).toContain(data.slaName255symbols.substring(0,data.slaName255symbols.length-7)+' Copy 1');
            })
            .then(dashboard.addSlaModal.sidebar.newSlaBtn.click)
            .then(function () {
                return dashboard.addSlaModal.body.slaName.setDefName(data.slaName250symbols);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.selectByNumber(1);
            })
            .then(dashboard.addSlaModal.footer.accept)
            .then(function () {
                return dashboard.addSlaModal.body.cog.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.cog.selectByDescription('Copy Service Level');
            })
            .then(function () {
                return expect(dashboard.addSlaModal.sidebar.slaList.items.getFocusedItem().getText()).toContain(data.slaName250symbols.substring(0,data.slaName250symbols.length-2)+' Copy 2');
            })
            .then(function () {
                return dashboard.addSlaModal.sidebar.slaList.items.getItemByName('First new SLA').click();
            })
            .then(function () {
                return dashboard.addSlaModal.body.cog.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.cog.selectByDescription('Delete Service Level');
            })
            .then(function () {
                expect(dashboard.addSlaModal.subModal.isVisible()).toBe(true);
                expect(dashboard.addSlaModal.subModal.header.getName()).toBe('Confirmation');
                expect(dashboard.addSlaModal.subModal.getBodyText()).toContain(data.confirmationModalBodyText);
                expect(dashboard.addSlaModal.subModal.getBodyText()).toContain('First new SLA');
                expect(dashboard.addSlaModal.subModal.footer.cancelBtn.getText()).toBe('Cancel');
                expect(dashboard.addSlaModal.subModal.footer.okBtn.getText()).toBe('Delete');
            })
            .then(dashboard.addSlaModal.subModal.footer.cancel)
            .then(function () {
                expect(dashboard.addSlaModal.subModal.isVisible()).toBe(false);
                expect(dashboard.addSlaModal.sidebar.slaList.items.getFocusedItem().getText()).toContain('First new SLA');
                expect(dashboard.addSlaModal.sidebar.slaList.items.getFocusedItem().getText()).not.toContain('Copy');
            })
            .then(function () {
                return dashboard.addSlaModal.body.cog.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.cog.selectByDescription('Delete Service Level');
            })
            .then(dashboard.addSlaModal.subModal.footer.accept)
            .then(function () {
                expect(dashboard.addSlaModal.subModal.isVisible()).toBe(false);
                expect(dashboard.addSlaModal.sidebar.slaList.items.isFocused(0)).toBe(true);
                expect(dashboard.addSlaModal.sidebar.slaList.items.isItemPresent('First new SLA')).toBe(false);
            })
            .then(function () {
                return dashboard.addSlaModal.sidebar.slaList.items.getItemByName(data.slaName255symbols).click();
            })
            .then(function () {
                return dashboard.addSlaModal.body.cog.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.cog.selectByDescription('Delete Service Level');
            })
            .then(function () {
                expect(dashboard.addSlaModal.subModal.isVisible()).toBe(true);
                expect(dashboard.addSlaModal.subModal.header.getName()).toBe('Confirmation');
                expect(dashboard.addSlaModal.subModal.getBodyText()).toContain(data.confirmationModalBodyText);
                expect(dashboard.addSlaModal.subModal.getBodyText()).toContain(data.slaName255symbols);
                expect(dashboard.addSlaModal.subModal.footer.cancelBtn.getText()).toBe('Cancel');
                expect(dashboard.addSlaModal.subModal.footer.okBtn.getText()).toBe('Delete');
            })
            .then(dashboard.addSlaModal.subModal.footer.accept)
            .then(function () {
                return dashboard.addSlaModal.sidebar.slaList.items.getItemByName('First new SLA Copy 1').click();
            })
            .then(dashboard.addSlaModal.body.timeRadio.stepDurationTime.select)
            .then(function () {
                return dashboard.addSlaModal.body.cog.expand();
            })
            .then(function () {
                expect(dashboard.addSlaModal.body.cog.isEnabledByDescription('Copy Service Level')).toBe(false);
                expect(dashboard.addSlaModal.body.cog.isEnabledByDescription('Delete Service Level')).toBe(true);
            })
            .then(function () {
                return dashboard.addSlaModal.body.cog.selectByDescription('Delete Service Level');
            })
            .then(dashboard.addSlaModal.subModal.footer.cancel)
            .then(function () {
                expect(dashboard.addSlaModal.sidebar.slaList.items.getFocusedItem().getText()).toContain('First new SLA Copy 1');
                expect(dashboard.addSlaModal.body.timeRadio.stepDurationTime.isRSelected()).toBe(true);
            })
            .then(function () {
                return dashboard.addSlaModal.body.cog.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.cog.selectByDescription('Delete Service Level');
            })
            .then(dashboard.addSlaModal.subModal.footer.accept)
            .then(function () {
                return expect(dashboard.addSlaModal.sidebar.slaList.items.isItemPresent('First new SLA Copy 1')).toBe(false);
            })
            .then(function () {
                return dashboard.addSlaModal.sidebar.slaList.items.all.count();
            })
            .then(function (n) {
                return convUtils.asyncLoop(n, function(loop,i){
                    var innerPosition = i-1;
                    return dashboard.addSlaModal.sidebar.slaList.items.getItem(0).click()
                        .then(function () {
                            return dashboard.addSlaModal.body.cog.expand();
                        })
                        .then(function () {
                            return dashboard.addSlaModal.body.cog.selectByDescription('Delete Service Level');
                        })
                        .then(dashboard.addSlaModal.subModal.footer.accept)
                        .then(function(){
                            return loop();
                        });
                });
            })
            .then(function () {
                return dashboard.addSlaModal.body.cog.expand();
            })
            .then(function () {
                expect(dashboard.addSlaModal.body.cog.isEnabledByDescription('Copy Service Level')).toBe(false);
                expect(dashboard.addSlaModal.body.cog.isEnabledByDescription('Delete Service Level')).toBe(false);
            });
    });

    it('4-User should be able to modify SLA through modal dialogue', function () {
        return dashboard.sla.header.cog.click()
            .then(function () {
                return dashboard.addSlaModal.body.slaName.setDefName('First SLA');
            })
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.hoursRadio.select();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.selectByNumber(1);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.groupsAndUsers.mainCheckbox.uncheck();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.groupsAndUsers.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.groupsAndUsers.checkboxSet.checkByNumber(2);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.mainCheckbox.uncheck();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.firstLvlCheckboxSet.checkByNumber(2);
            })
            .then(dashboard.addSlaModal.footer.accept)
            .then(function () {
                return dashboard.addSlaModal.body.slaName.readOnlyMod.setNewName('First SLA modified');
            })
            .then(dashboard.addSlaModal.body.clearFix.daysRadio.select)
            .then(function () {
                return dashboard.addSlaModal.body.okLvl.checkbox.check();
            })
            .then(function () {
                return dashboard.addSlaModal.body.goodLvl.slider.movePointer(-300);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.selectByNumber(3);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.groupsAndUsers.mainCheckbox.check();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.mainCheckbox.check();
            })
            .then(dashboard.addSlaModal.footer.accept)
            .then(dashboard.addSlaModal.header.close)
            .then(dashboard.sla.header.cog.click)
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.expand();
            })
            .then(function () {
                expect(dashboard.addSlaModal.body.slaName.readOnlyMod.value.getText()).toBe('First SLA modified');
                expect(dashboard.addSlaModal.body.clearFix.daysRadio.isRSelected()).toBe(true);
                expect(dashboard.addSlaModal.body.okLvl.checkbox.isChecked()).toBe(true);
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).not.toContain('120');
                expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.isRSelectedByNumber(3)).toBe(true);
                expect(dashboard.addSlaModal.body.taskFilter.groupsAndUsers.mainCheckbox.isChecked()).toBe(true);
                expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.mainCheckbox.isChecked()).toBe(true);
                expect(dashboard.addSlaModal.body.taskFilter.groupsAndUsers.mainCheckbox.isPartChecked()).toBe(false);
                expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.mainCheckbox.isPartChecked()).toBe(false);
            })
            .then(function () {
                return dashboard.addSlaModal.body.slaName.readOnlyMod.setNewName('First SLA remodified');
            })
            .then(dashboard.addSlaModal.body.clearFix.hoursRadio.select)
            .then(function () {
                return dashboard.addSlaModal.body.okLvl.checkbox.uncheck();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.selectByNumber(2);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.groupsAndUsers.mainCheckbox.uncheck();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.mainCheckbox.uncheck();
            })
            .then(dashboard.addSlaModal.footer.reset)
            .then(function () {
                expect(dashboard.addSlaModal.body.slaName.readOnlyMod.value.getText()).toBe('First SLA modified');
                expect(dashboard.addSlaModal.body.clearFix.daysRadio.isRSelected()).toBe(true);
                expect(dashboard.addSlaModal.body.okLvl.checkbox.isChecked()).toBe(true);
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).not.toContain('120');
                expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.isRSelectedByNumber(3)).toBe(true);
                expect(dashboard.addSlaModal.body.taskFilter.groupsAndUsers.mainCheckbox.isChecked()).toBe(true);
                expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.mainCheckbox.isChecked()).toBe(true);
                expect(dashboard.addSlaModal.body.taskFilter.groupsAndUsers.mainCheckbox.isPartChecked()).toBe(false);
                expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.mainCheckbox.isPartChecked()).toBe(false);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.selectByNumber(3);
            })
            .then(function () {
                expect(dashboard.addSlaModal.footer.okBtn.isEnabled()).toBe(false);
                expect(dashboard.addSlaModal.footer.resetBtn.isEnabled()).toBe(false);
            })
            .then(dashboard.addSlaModal.sidebar.newSlaBtn.click)
            .then(function () {
                return dashboard.addSlaModal.body.slaName.setDefName('Second SLA');
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.expand();
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.selectByNumber(0);
            })
            .then(dashboard.addSlaModal.footer.accept)
            .then(function () {
                return dashboard.addSlaModal.body.slaName.readOnlyMod.clickEdit();
            })
            .then(dashboard.addSlaModal.body.slaName.readOnlyMod.clearBtn.click)
            .then(function () {
                return expect(dashboard.addSlaModal.body.slaName.readOnlyMod.editInput.getAttribute('value')).toBe('');
            })
            .then(dashboard.addSlaModal.body.slaName.readOnlyMod.denyBtn.click)
            .then(function () {
                return expect(dashboard.addSlaModal.body.slaName.readOnlyMod.value.getText()).toBe('Second SLA')
            })
            .then(function () {
                return dashboard.addSlaModal.body.slaName.readOnlyMod.setNewName('Second SLA modified');
            })
            .then(dashboard.addSlaModal.sidebar.slaList.items.getItemByName('First SLA modified').click)
            .then(function () {
                expect(dashboard.addSlaModal.subModal.isVisible()).toBe(true);
                expect(dashboard.addSlaModal.subModal.header.getName()).toBe('Are You Sure?');
                expect(dashboard.addSlaModal.subModal.getBodyText()).toContain(data.areYouSureModalBodyText.firstRow);
                expect(dashboard.addSlaModal.subModal.getBodyText()).toContain(data.areYouSureModalBodyText.secondRow);
                expect(dashboard.addSlaModal.subModal.footer.cancelBtn.getText()).toBe('No, Stay Here');
                expect(dashboard.addSlaModal.subModal.footer.okBtn.getText()).toBe('Yes, Leave');
            })
            .then(dashboard.addSlaModal.subModal.footer.cancel)
            .then(function () {
                expect(dashboard.addSlaModal.sidebar.slaList.items.getFocusedItem().getText()).toContain('Second SLA');
                expect(dashboard.addSlaModal.body.slaName.readOnlyMod.value.getText()).toContain('Second SLA modified');
            })
            .then(dashboard.addSlaModal.sidebar.slaList.items.getItemByName('First SLA modified').click)
            .then(dashboard.addSlaModal.subModal.footer.accept)
            .then(function () {
                expect(dashboard.addSlaModal.sidebar.slaList.items.getFocusedItem().getText()).toContain('First SLA modified');
            })
            .then(dashboard.addSlaModal.sidebar.slaList.items.getItemByName('Second SLA').click)
            .then(function () {
                return expect(dashboard.addSlaModal.body.slaName.readOnlyMod.value.getText()).not.toContain('modified');
            })
            .then(dashboard.addSlaModal.body.clearFix.hoursRadio.select)
            .then(dashboard.addSlaModal.header.close)
            .then(function () {
                expect(dashboard.addSlaModal.subModal.isVisible()).toBe(true);
                expect(dashboard.addSlaModal.subModal.header.getName()).toBe('Are You Sure?');
                expect(dashboard.addSlaModal.subModal.getBodyText()).toContain(data.areYouSureModalBodyText.firstRow);
                expect(dashboard.addSlaModal.subModal.getBodyText()).toContain(data.areYouSureModalBodyText.secondRow);
                expect(dashboard.addSlaModal.subModal.footer.cancelBtn.getText()).toBe('No, Stay Here');
                expect(dashboard.addSlaModal.subModal.footer.okBtn.getText()).toBe('Yes, Leave');
            })
            .then(dashboard.addSlaModal.subModal.footer.cancel)
            .then(function () {
                expect(dashboard.addSlaModal.sidebar.slaList.items.getFocusedItem().getText()).toContain('Second SLA');
                expect(dashboard.addSlaModal.body.clearFix.hoursRadio.isRSelected()).toBe(true);
            })
            .then(dashboard.addSlaModal.header.close)
            .then(dashboard.addSlaModal.subModal.footer.accept)
            .then(function () {
                // return dashboard.addSlaModal.container.waitMissing();
                return browser.waitForAngular();
            })
            .then(function () {
                return expect(dashboard.addSlaModal.container.isPresent()).toBe(false);
            });
    });

    it('5-User should be able to filter Workflows&Steps, Users&Groups, Drawers&FileTypes', function () {
        var flowArrayUpperCase = [];
        var drawersArray = [];
        var drawersArrayUpperCase = [];
        return dashboard.sla.header.cog.click()
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.expand();
            })
            .then(function () {
                return dbHelper.executeJsonCommand("SELECT flowname FROM FlowDef WHERE status=0 AND flowid IN (SELECT DISTINCT flowid FROM StepDef JOIN StepRootDef ON StepDef.stepdefid=StepRootDef.steprootid WHERE debug=0 AND (stepname LIKE 'Manual%' OR stepname LIKE 'Manager%' OR stepname LIKE 'Rendezvous%' OR stepname LIKE 'Indexing%' OR stepname LIKE 'Split%' OR stepname LIKE 'Gatekeeper%' OR stepname LIKE 'Diary%'))");
            })
            .then(function (flowArray) {
                return flowArray.forEach(function(elem){
                    flowArrayUpperCase.push(elem.flowname.toUpperCase());
                });
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.all.getText();
            })
            .then(function (modalFlowArray) {
                return modalFlowArray.forEach(function(elem){
                    expect(flowArrayUpperCase).toContain(elem.replace(/  +/g,''));
                });
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.expandAll();
            })
            .then(function () {
                return expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.isAllExpanded()).not.toContain(false);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.internalCheckboxes.getLabels();
            })
            .then(function (stepsArray) {
                return stepsArray.forEach(function(elem){
                    expect((elem.includes('Manual')||elem.includes('Indexing')||elem.includes('Split')||elem.includes('Rendezvous')||elem.includes('Manager')||elem.includes('Gatekeeper')||elem.includes('Diary'))).toBe(true);
                })
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.collapseAll();
            })
            .then(function () {
                return expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.isAllCollapsed()).not.toContain(false);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.expandByNameOrNumber(1);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.collapse();
            })
            .then(function () {
                return expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.filtersList.isDisplayed()).toBe(false);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.expand();
            })
            .then(function () {
                expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.isCollapsedByNameOrNumber(1)).toBe(false);
                expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.getInternalSelectAllCheckboxByNameOrNumber(1).isChecked()).toBe(false);
                expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.getInternalCheckboxesByNameOrNumber(1).isAllUnchecked()).toBe(true);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.getInternalSelectAllCheckboxByNameOrNumber(1).check();
            })
            .then(function () {
                return expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.getInternalSelectAllCheckboxByNameOrNumber(1).isChecked()).toBe(false);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.selectByNumber(1);
            })
            .then(function () {
                expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.getInternalSelectAllCheckboxByNameOrNumber(1).isChecked()).toBe(true);
                expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.getInternalCheckboxesByNameOrNumber(1).isAllChecked()).toBe(true);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.getInternalSelectAllCheckboxByNameOrNumber(1).uncheck();
            })
            .then(function () {
                expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.getInternalSelectAllCheckboxByNameOrNumber(1).isChecked()).toBe(false);
                expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.getInternalCheckboxesByNameOrNumber(1).isAllUnchecked()).toBe(true);
                expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.radioButtons.isRSelectedByNumber(1))
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.getInternalCheckboxesByNameOrNumber(1).checkByNumber(0);
            })
            .then(function () {
                return expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.getInternalSelectAllCheckboxByNameOrNumber(1).isPartChecked()).toBe(true);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.getInternalCheckboxesByNameOrNumber(1).checkAll();
            })
            .then(function () {
                expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.getInternalSelectAllCheckboxByNameOrNumber(1).isPartChecked()).toBe(false);
                expect(dashboard.addSlaModal.body.taskFilter.workflowsAndSteps.items.getInternalSelectAllCheckboxByNameOrNumber(1).isChecked()).toBe(true);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.groupsAndUsers.expand();
            })
            // .then(function () {
            //     return dashboard.addSlaModal.body.taskFilter.groupsAndUsers.checkboxSet.getLabels();
            // })
            .then(function () {
                // var last = array.splice(-2,2)[1];
                // var notSorted = array.toString();
                // array.sort();
                // var sorted = array.toString();
                // expect(notSorted).toEqual(sorted);
                // expect(last).toBe('unassigned');
                expect(dashboard.addSlaModal.body.taskFilter.groupsAndUsers.itemsList.isDisplayed()).toBe(true);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.expand();
            })
            .then(function () {
                return dbHelper.executeJsonCommand('SELECT description FROM Locations');
            })
            .then(function (json) {
                return json.forEach(function(elem){
                    drawersArray.push(elem.description);
                    drawersArrayUpperCase.push(elem.description.toUpperCase());
                });
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.firstLvlCheckboxSet.getLabels();
            })
            .then(function (modalDrawersArray) {
                expect(modalDrawersArray).toEqual(modalDrawersArray.sort());
                return modalDrawersArray.forEach(function(elem){
                    expect(drawersArrayUpperCase).toContain(elem.replace(/  +/g,''));
                })
            })
            .then(function () {
                return convUtils.asyncLoop(drawersArray.length, function(loop,i){
                    var innerPosition = i-1;
                    var fileTypesArray = [];
                    return dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.items.expandByNameOrNumber(innerPosition)
                        .then(function () {
                            expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.firstLvlCheckboxSet.isCheckedByLabel(drawersArrayUpperCase[innerPosition])).toBe(true);
                            expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.firstLvlCheckboxSet.isPartCheckedByLabel(drawersArrayUpperCase[innerPosition])).toBe(false);
                            expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.items.getCheckboxesInItemWithNameOrNumber(drawersArrayUpperCase[innerPosition]).isAllChecked()).toBe(true);
                        })
                        .then(function () {
                            return dbHelper.executeJsonCommand("select name from ObjectType where classid=-3 and typeid in (select childtypeid from TypeRules where parenttypeid=(select typeid from ObjectLink join locations on objectlink.objectid=locations.locationid where description='"+drawersArray[innerPosition]+"'))");
                        })
                        .then(function (json) {
                            return json.forEach(function(elem){
                                fileTypesArray.push(elem.name);
                            })
                        })
                        .then(function () {
                            return dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.items.getCheckboxesInItemWithNameOrNumber(drawersArrayUpperCase[innerPosition]).getLabels();
                        })
                        .then(function (labels) {
                            return labels.forEach(function(label){
                                expect(fileTypesArray).toContain(label);
                            })
                        })
                        .then(function(){
                            return loop();
                        });
                });
            })
            .then(function () {
                return expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.items.isAllExpanded()).not.toContain(false);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.items.getCheckboxesInItemWithNameOrNumber(0).uncheckByLabel('Events');
            })
            .then(function () {
                expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.items.getCheckboxesInItemWithNameOrNumber(0).isCheckedByLabel('Events')).toBe(false);
                expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.items.getCheckboxesInItemWithNameOrNumber(1).isCheckedByLabel('Events')).toBe(true);
                expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.firstLvlCheckboxSet.isPartCheckedByNumber(0)).toBe(true);
                expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.mainCheckbox.isPartChecked()).toBe(true);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.items.getCheckboxesInItemWithNameOrNumber(0).checkByLabel('Events');
            })
            .then(function () {
                expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.items.getCheckboxesInItemWithNameOrNumber(0).isCheckedByLabel('Events')).toBe(true);
                expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.firstLvlCheckboxSet.isPartCheckedByNumber(0)).toBe(false);
                expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.firstLvlCheckboxSet.isCheckedByNumber(0)).toBe(true);
                expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.mainCheckbox.isPartChecked()).toBe(false);
                expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.mainCheckbox.isChecked()).toBe(true);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.items.collapseAll();
            })
            .then(function () {
                return expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.items.isAllCollapsed()).not.toContain(false);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.items.expandByNameOrNumber(1);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.collapse();
            })
            .then(function () {
                return expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.itemsList.isDisplayed()).toBe(false);
            })
            .then(function () {
                return dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.expand();
            })
            .then(function () {
                expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.items.isAllCollapsed()).toContain(false);
                expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.items.isAllExpanded()).toContain(false);
                expect(dashboard.addSlaModal.body.taskFilter.drawersAndFileTypes.items.isCollapsedByNameOrNumber(1)).toBe(false);
            });
    });

    it('6-User should be able to manage levels sliders', function () {
        var days = '120',
            newDays = '240',
            changedDays,
            temp;
        return dashboard.sla.header.cog.click()
            .then(function () {
                return dashboard.addSlaModal.body.okLvl.checkbox.check();
            })
            .then(function () {
                return dashboard.addSlaModal.body.warnLvl.checkbox.check();
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.input.clear)
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.maxDaysNum.input.sendKeys(newDays);
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.label.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.goodLvl.slider.isHighlighted()).toBe(true);
                expect(dashboard.addSlaModal.body.okLvl.slider.isHighlighted()).toBe(true);
                expect(dashboard.addSlaModal.body.warnLvl.slider.isHighlighted()).toBe(true);
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe(days);
                expect(dashboard.addSlaModal.body.goodLvl.slider.getMaxAmount()).toBe(newDays+' days');
                expect(dashboard.addSlaModal.body.goodLvl.textInput.getAttribute('value')).toBe(days);
                expect(dashboard.addSlaModal.body.okLvl.slider.getPointerText()).toBe((days*1+1)+'');
                expect(dashboard.addSlaModal.body.okLvl.slider.getMaxAmount()).toBe(newDays+' days');
                expect(dashboard.addSlaModal.body.okLvl.textInput.getAttribute('value')).toBe((days*1+1)+'');
                expect(dashboard.addSlaModal.body.warnLvl.slider.getPointerText()).toBe(newDays+' days');
            })
            .then(function () {
                return dashboard.addSlaModal.body.goodLvl.slider.movePointer(60);
            })
            .then(function () {
                return dashboard.addSlaModal.body.goodLvl.slider.getPointerText();
            })
            .then(function (text) {
                changedDays = text;
                expect(text*1).toBeGreaterThan(days*1);
                expect(text*1).toBeLessThan(newDays*1);
                expect(dashboard.addSlaModal.body.okLvl.slider.getPointerText()).toBe((text*1+1)+'');
                expect(dashboard.addSlaModal.body.warnLvl.slider.getPointerText()).toBe(newDays+' days');
            })
            .then(dashboard.addSlaModal.body.okLvl.textInput.clear)
            .then(function () {
                return dashboard.addSlaModal.body.okLvl.textInput.sendKeys((changedDays*1+20)+'');
            })
            .then(dashboard.addSlaModal.header.itself.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe(changedDays);
                expect(dashboard.addSlaModal.body.goodLvl.slider.getMaxAmount()).toBe(newDays+' days');
                expect(dashboard.addSlaModal.body.goodLvl.textInput.getAttribute('value')).toBe(changedDays);
                expect(dashboard.addSlaModal.body.okLvl.slider.getPointerText()).toBe((changedDays*1+20)+'');
            })
            .then(dashboard.addSlaModal.body.okLvl.textInput.clear)
            .then(function () {
                return dashboard.addSlaModal.body.okLvl.textInput.sendKeys(newDays);
            })
            .then(dashboard.addSlaModal.header.itself.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.okLvl.slider.getPointerText()).toBe(newDays+' days');
                expect(dashboard.addSlaModal.body.warnLvl.slider.getPointerText()).toBe(newDays+' days');
            })
            .then(dashboard.addSlaModal.body.okLvl.textInput.clear)
            .then(function () {
                return dashboard.addSlaModal.body.okLvl.textInput.sendKeys((days*1-20)+'');
            })
            .then(dashboard.addSlaModal.header.itself.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe(changedDays);
                expect(dashboard.addSlaModal.body.goodLvl.slider.getMaxAmount()).toBe(newDays+' days');
                expect(dashboard.addSlaModal.body.goodLvl.textInput.getAttribute('value')).toBe(changedDays);
                expect(dashboard.addSlaModal.body.okLvl.slider.getPointerText()).toBe(newDays+' days');
                expect(dashboard.addSlaModal.body.okLvl.textInput.getAttribute('value')).toBe(newDays);
                expect(dashboard.addSlaModal.body.warnLvl.slider.getPointerText()).toBe(newDays+' days');
            })
            .then(dashboard.addSlaModal.body.goodLvl.textInput.clear)
            .then(function () {
                return dashboard.addSlaModal.body.goodLvl.textInput.sendKeys('0');
            })
            .then(dashboard.addSlaModal.header.itself.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe(changedDays);
                expect(dashboard.addSlaModal.body.goodLvl.slider.getMaxAmount()).toBe(newDays+' days');
            })
            .then(dashboard.addSlaModal.body.goodLvl.textInput.clear)
            .then(function () {
                return dashboard.addSlaModal.body.goodLvl.textInput.sendKeys('hello');
            })
            .then(dashboard.addSlaModal.header.itself.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe(changedDays);
            })
            .then(dashboard.addSlaModal.body.goodLvl.textInput.clear)
            .then(function () {
                return dashboard.addSlaModal.body.goodLvl.textInput.sendKeys('   ');
            })
            .then(dashboard.addSlaModal.header.itself.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe(changedDays);
            })
            .then(dashboard.addSlaModal.body.goodLvl.textInput.clear)
            .then(function () {
                return dashboard.addSlaModal.body.goodLvl.textInput.sendKeys('*=@&$');
            })
            .then(dashboard.addSlaModal.header.itself.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe(changedDays);
            })
            .then(dashboard.addSlaModal.body.goodLvl.textInput.clear)
            .then(function () {
                return dashboard.addSlaModal.body.goodLvl.textInput.sendKeys('1');
            })
            .then(dashboard.addSlaModal.header.itself.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe('1');
                expect(dashboard.addSlaModal.body.okLvl.slider.getPointerText()).toBe(newDays+' days');
            })
            .then(dashboard.addSlaModal.body.goodLvl.textInput.clear)
            .then(function () {
                return dashboard.addSlaModal.body.goodLvl.textInput.sendKeys(newDays);
            })
            .then(dashboard.addSlaModal.header.itself.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe(newDays+' days');
                expect(dashboard.addSlaModal.body.okLvl.slider.getPointerText()).toBe(newDays+' days');
                expect(dashboard.addSlaModal.body.warnLvl.slider.getPointerText()).toBe(newDays+' days');
            })
            .then(dashboard.addSlaModal.body.goodLvl.textInput.clear)
            .then(function () {
                return dashboard.addSlaModal.body.goodLvl.textInput.sendKeys((newDays*1+20)+'');
            })
            .then(dashboard.addSlaModal.header.itself.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe(newDays+' days');
                expect(dashboard.addSlaModal.body.okLvl.slider.getPointerText()).toBe(newDays+' days');
                expect(dashboard.addSlaModal.body.warnLvl.slider.getPointerText()).toBe(newDays+' days');
            })
            .then(function () {
                return dashboard.addSlaModal.body.warnLvl.checkbox.uncheck();
            })
            .then(function () {
                expect(dashboard.addSlaModal.body.warnLvl.checkbox.getLabel()).toBe('Add level');
                expect(dashboard.addSlaModal.body.warnLvl.checkbox.isChecked()).toBe(false);
                expect(dashboard.addSlaModal.body.okLvl.checkbox.getLabel()).toBe('Warning');
                expect(dashboard.addSlaModal.body.okLvl.slider.isHighlighted()).toBe(true);
                expect(dashboard.addSlaModal.body.warnLvl.slider.isHighlighted()).toBe(false);
            })
            .then(function () {
                return dashboard.addSlaModal.body.okLvl.checkbox.uncheck();
            })
            .then(function () {
                expect(dashboard.addSlaModal.body.okLvl.checkbox.getLabel()).toBe('Add level');
                expect(dashboard.addSlaModal.body.okLvl.checkbox.isChecked()).toBe(false);
                expect(dashboard.addSlaModal.body.okLvl.slider.isHighlighted()).toBe(false);
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.input.clear)
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.maxDaysNum.input.sendKeys('1');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.label.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.clearFix.maxDaysNum.input.getAttribute('value')).toBe('1');
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe('1 days');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.input.clear)
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.maxDaysNum.input.sendKeys('365');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.label.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.clearFix.maxDaysNum.input.getAttribute('value')).toBe('365');
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe('365 days');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.input.clear)
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.maxDaysNum.input.sendKeys('0');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.label.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.clearFix.maxDaysNum.input.getAttribute('value')).toBe('365');
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe('365 days');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.input.clear)
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.maxDaysNum.input.sendKeys('500');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.label.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.clearFix.maxDaysNum.input.getAttribute('value')).toBe('365');
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe('365 days');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.input.clear)
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.maxDaysNum.input.sendKeys('3.5');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.label.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.clearFix.maxDaysNum.input.getAttribute('value')).toBe('35');
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe('35 days');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.input.clear)
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.maxDaysNum.input.sendKeys('#& _');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.label.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.clearFix.maxDaysNum.input.getAttribute('value')).toBe('35');
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe('35 days');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.input.clear)
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.maxDaysNum.input.sendKeys('hello');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.label.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.clearFix.maxDaysNum.input.getAttribute('value')).toBe('35');
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe('35 days');
            })
            .then(dashboard.addSlaModal.body.clearFix.hoursRadio.select)
            .then(dashboard.addSlaModal.body.clearFix.maxHoursNum.input.clear)
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.maxHoursNum.input.sendKeys('1');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxHoursNum.label.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.clearFix.maxHoursNum.input.getAttribute('value')).toBe('1');
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe('1 hours');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxHoursNum.input.clear)
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.maxHoursNum.input.sendKeys('8760');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxHoursNum.label.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.clearFix.maxHoursNum.input.getAttribute('value')).toBe('8760');
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe('8,760 hours');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxHoursNum.input.clear)
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.maxHoursNum.input.sendKeys('0');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxHoursNum.label.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.clearFix.maxHoursNum.input.getAttribute('value')).toBe('8760');
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe('8,760 hours');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxHoursNum.input.clear)
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.maxHoursNum.input.sendKeys('9000');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxHoursNum.label.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.clearFix.maxHoursNum.input.getAttribute('value')).toBe('8760');
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe('8,760 hours');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxHoursNum.input.clear)
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.maxHoursNum.input.sendKeys('90.5');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxHoursNum.label.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.clearFix.maxHoursNum.input.getAttribute('value')).toBe('905');
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe('905 hours');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxHoursNum.input.clear)
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.maxHoursNum.input.sendKeys('   ');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxHoursNum.label.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.clearFix.maxHoursNum.input.getAttribute('value')).toBe('905');
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe('905 hours');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxHoursNum.input.clear)
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.maxHoursNum.input.sendKeys('hello');
            })
            .then(dashboard.addSlaModal.body.clearFix.maxHoursNum.label.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.clearFix.maxHoursNum.input.getAttribute('value')).toBe('905');
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe('905 hours');
            })
            .then(dashboard.addSlaModal.body.clearFix.daysRadio.select)
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.input.clear)
            .then(function () {
                return dashboard.addSlaModal.body.clearFix.maxDaysNum.input.sendKeys(days);
            })
            .then(dashboard.addSlaModal.body.clearFix.maxDaysNum.label.click)
            .then(function () {
                expect(dashboard.addSlaModal.body.warnLvl.checkbox.input.isEnabled()).toBe(false);
            })
            .then(function () {
                return dashboard.addSlaModal.body.okLvl.checkbox.check();
            })
            .then(function () {
                return dashboard.addSlaModal.body.warnLvl.checkbox.check();
            })
            .then(function () {
                expect(dashboard.addSlaModal.body.goodLvl.slider.getPointerText()).toBe(days+' days');
                expect(dashboard.addSlaModal.body.okLvl.slider.getPointerText()).toBe(days+' days');
                expect(dashboard.addSlaModal.body.warnLvl.slider.getPointerText()).toBe(days+' days');
            })
            .then(function () {
                return dashboard.addSlaModal.body.goodLvl.slider.movePointer(-200);
            })
            .then(function () {
                return dashboard.addSlaModal.body.goodLvl.slider.getPointerText()
            })
            .then(function (text) {
                temp = text;
                expect(text*1).toBeLessThan(days*1);
            })
            .then(function () {
                return dashboard.addSlaModal.body.goodLvl.slider.movePointer(40);
            })
            .then(function () {
                return dashboard.addSlaModal.body.goodLvl.slider.getPointerText();
            })
            .then(function (text) {
                expect(text*1).toBeGreaterThan(temp*1);
            })
            .then(function () {
                return dashboard.addSlaModal.body.okLvl.slider.movePointer(-140);
            })
            .then(function () {
                return dashboard.addSlaModal.body.okLvl.slider.getPointerText();
            })
            .then(function (text) {
                temp = text;
                expect(text*1).toBeLessThan(days*1);
            })
            .then(function () {
                return dashboard.addSlaModal.body.okLvl.slider.movePointer(40);
            })
            .then(function () {
                return dashboard.addSlaModal.body.okLvl.slider.getPointerText();
            })
            .then(function (text) {
                expect(text*1).toBeGreaterThan(temp*1);
            })
            .then(function () {
                return dashboard.addSlaModal.body.warnLvl.slider.movePointer(-80);
            })
            .then(function () {
                return dashboard.addSlaModal.body.warnLvl.slider.getPointerText();
            })
            .then(function (text) {
                expect(text).toBe(days+' days');
            })
            .then(function () {
                return dashboard.addSlaModal.body.warnLvl.slider.movePointer(60);
            })
            .then(function () {
                return dashboard.addSlaModal.body.warnLvl.slider.getPointerText();
            })
            .then(function (text) {
                expect(text).toBe(days+' days');
            });

    });
});