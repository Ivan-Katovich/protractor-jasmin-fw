exports.tags = ['File_Navigation', 'File_Search'];
var config = {
    mock: {
        backend: require('../../lib/mockBackend_Proposed.js')
    },
    utils: {
        navigation: require('../../utils/navigationHelper_Proposed.js'),
        conversion: require('../../utils/conversionUtils_Proposed.js'),

    },
    pageObjects: {
        IR_NavigationBar: require('./../../PageObjects/Containers/NavigationBar.js'),
        IR_SearchPage: require('../../PageObjects/SearchPage.js')
    }
};

var test = {
    utils: {
        navigation: new config.utils.navigation(protractor, browser),
        conversion: new config.utils.conversion(),
        webdriverUtils: require('../../utils/webdriverExtentionUtils.js')
},
    pageObjects: {
        navigationBar: new config.pageObjects.IR_NavigationBar(),
        searchPage: new config.pageObjects.IR_SearchPage()
    }
};

config.mock.backend([
    {
        testRoute: 'Search/GetAdvancedSearchCriteria',
        testScenarios: [0],
        testMethod: 'POST'
    }
]);

describe("Search - Clear Criteria", function () {

    beforeEach(function () {

        test.utils.navigation.navigateToApp();

    });

    afterEach(function() {

        browser.sleep(1000);

    });


    if (browser.params.siteBase === 'node') {



        it("should clear all search criteria after selecting 'Clear Criteria' button", function () {

            var data = {
                criteria: {
                    searchKeyword: '%'
                },
                results: {
                    noFileMarksChecked: 'All File Marks',
                    //twoFileMarks: '2 CHECKED',
                    noFileTypesSelected: 'All File Types',
                    noDrawersSelected: 'All Drawers',
                    stringValue: 'text',
                    intValue: '1',
                    floatValue: '1.5',
                    dateValue: '10/10/2014'
                }
            };


            config.mock.backend.registerProxy([
                {
                    testRoute: 'Search/GetAdvancedSearchCriteria',
                    testScenario: 0,
                    testMethod: 'POST'
                }
            ]);

            test.utils.navigation.navigateToSearch(test.pageObjects.navigationBar).then(function () {

                test.pageObjects.searchPage.fileNameSearchBox.sendKeys(data.criteria.searchKeyword).then(function () {

                    test.pageObjects.searchPage.fileNumberSearchBox.sendKeys(data.criteria.searchKeyword).then(function () {

                        test.pageObjects.searchPage.drawerDropdown.click().then(function () {
                            test.pageObjects.searchPage.drawerDropdownElement(2).click();
                            test.pageObjects.searchPage.drawerDropdownElement(2).getText().then(function (dropdown) {

                            });
                        });

                        test.pageObjects.searchPage.fileMarkButton.click().then(function () {
                            test.pageObjects.searchPage.fileMarkDropdownElement(2).click();
                            test.pageObjects.searchPage.fileMarkDropdownElement(3).click();
                            test.pageObjects.searchPage.fileMarkButton.click();
                        });

                        test.pageObjects.searchPage.fileTypeDropdown.click().then(function () {
                            test.utils.webdriverUtils.waitTillElementVisible(test.pageObjects.searchPage.fileTypeDropdownElement(1)).then(function () {
                                test.pageObjects.searchPage.fileTypeDropdownElementByText('Qualcore').click().then(function () {
                                    test.utils.webdriverUtils.waitTillElementVisible(test.pageObjects.searchPage.fileTypeAttrBoolCheckbox).then(function () {
                                        test.pageObjects.searchPage.fileTypeAttrBoolCheckbox.click();
                                        test.pageObjects.searchPage.fileTypeAttrStringInput.sendKeys(data.results.stringValue);
                                        test.pageObjects.searchPage.fileTypeAttrStringDropdown.click().then(function () {
                                            test.pageObjects.searchPage.fileTypeAttrStringElements.get(1).click();
                                        });
                                        test.pageObjects.searchPage.fileTypeAttrUserDropdown.click().then(function () {
                                            test.pageObjects.searchPage.fileTypeAttrUserElements.get(1).click();
                                        });
                                        test.pageObjects.searchPage.fileTypeAttrIntDropdown.click().then(function () {
                                            test.pageObjects.searchPage.fileTypeAttrIntElements.get(1).click();
                                        });
                                        test.pageObjects.searchPage.fileTypeAttrFloatDropdown.click().then(function () {
                                            test.pageObjects.searchPage.fileTypeAttrFloatElements.get(1).click();
                                        });
                                        test.pageObjects.searchPage.fileTypeAttrFloatScrollingMin.sendKeys(data.results.floatValue);
                                        test.pageObjects.searchPage.fileTypeAttrFloatScrollingMax.sendKeys(data.results.floatValue);
                                        test.pageObjects.searchPage.fileTypeAttrIntScrollingMin.sendKeys(data.results.intValue);
                                        test.pageObjects.searchPage.fileTypeAttrIntScrollingMax.sendKeys(data.results.intValue);
                                        test.pageObjects.searchPage.fileTypeAttrDatepicker.sendKeys(data.results.dateValue);


                                        test.pageObjects.searchPage.clearCriteriaButton.click().then(function () {
                                            expect(test.pageObjects.searchPage.fileTypeDropdownSelectedValue.getText()).toEqual(data.results.noFileTypesSelected);
                                            expect(test.pageObjects.searchPage.drawerDropdownSelectedValue.getText()).toEqual(data.results.noDrawersSelected);
                                            expect(test.pageObjects.searchPage.fileMarkCounter).toEqual(data.results.noFileMarksChecked);
                                            test.pageObjects.searchPage.fileNameSearchBox.getAttribute('value').then(function (text) {
                                                expect(text).toEqual("");
                                            });
                                            test.pageObjects.searchPage.fileNumberSearchBox.getAttribute('value').then(function (text) {
                                                expect(text).toEqual("");
                                            });


                                            test.pageObjects.searchPage.fileTypeDropdown.click().then(function () {
                                                test.pageObjects.searchPage.fileTypeDropdownElementByText('Qualcore').click().then(function () {
                                                    test.pageObjects.searchPage.fileTypeAttrBoolCheckboxChecked.then(function (checked) {
                                                        //verify that check box is not checked after clicking clear criteria--if checked is true, that means it's checked if it's null it's unchecked
                                                        expect(checked).toEqual(null);
                                                    });

                                                    expect(test.pageObjects.searchPage.fileTypeAttrDatepicker.getAttribute('value')).toEqual('');

                                                    expect(test.pageObjects.searchPage.fileTypeAttrStringInput.getAttribute('value')).toEqual('');

                                                    test.pageObjects.searchPage.fileTypeAttrStringSelectedValue.getText().then(function (fileTypeSelectedValue) {
                                                        expect(fileTypeSelectedValue.replace(/\s+/g, ' ').trim()).toEqual('');
                                                    });
                                                    test.pageObjects.searchPage.fileTypeAttrUserSelectedValue.getText().then(function (fileTypeUser) {
                                                        expect(fileTypeUser.replace(/\s+/g, ' ').trim()).toEqual('');
                                                    });
                                                    test.pageObjects.searchPage.fileTypeAttrIntSelectedValue.getText().then(function (intVal) {
                                                        expect(intVal.replace(/\s+/g, ' ').trim()).toEqual('');
                                                    });
                                                    test.pageObjects.searchPage.fileTypeAttrFloatSelectedValue.getText().then(function (floatValue) {
                                                        expect(floatValue.replace(/\s+/g, ' ').trim()).toEqual('');
                                                    });

                                                    test.pageObjects.searchPage.fileTypeAttrFloatScrollingMin.getAttribute('value').then(function (floatScrolling) {
                                                        expect(floatScrolling.replace(/\s+/g, ' ').trim()).toEqual('');
                                                    });
                                                    test.pageObjects.searchPage.fileTypeAttrFloatScrollingMax.getAttribute('value').then(function (maxFloat) {
                                                        expect(maxFloat.replace(/\s+/g, ' ').trim()).toEqual('');
                                                    });
                                                    test.pageObjects.searchPage.fileTypeAttrIntScrollingMin.getAttribute('value').then(function (intMin) {
                                                        expect(intMin.replace(/\s+/g, ' ').trim()).toEqual('');
                                                    });
                                                    test.pageObjects.searchPage.fileTypeAttrIntScrollingMax.getAttribute('value').then(function (intMax) {
                                                        expect(intMax.replace(/\s+/g, ' ').trim()).toEqual('');
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
    }
});