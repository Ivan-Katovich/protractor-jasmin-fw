exports.tags = ['File_Navigation', 'File_Search'];
var mockBackend = require('../../lib/mockBackend.js');
var mockUtils = require('../../utils/mockUtils.js');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var IR_NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var navigationBar = new IR_NavigationBar();
var IR_SearchPage = require('../../PageObjects/SearchPage.js');
var irSearchPage = new IR_SearchPage();
var IR_RecordHeader = require('./../../PageObjects/Containers/RecordHeader.js');
var recordHeader = new IR_RecordHeader();

var stringValue = 'text123&%$';
var maxStringValue = 'longstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlong!';

describe("Search - Return Results by File Attributes", function () {
    if (browser.params.siteBase == 'iis') {

        it('Should display correct labels for integer and floating attributes with min-max without displaying min-max in brackets', function () {
            browser.driver.get(browser.params.defaultUrl);
            webdriverUtils.waitTillElementVisible(navigationBar.searchIcon).then(function () {
                navigationBar.searchIcon.click().then(function () {
                    webdriverUtils.waitTillElementVisible(irSearchPage.fileTypeDropdown).then(function () {

                        webdriverUtils.clickOnElement(irSearchPage.fileTypeDropdown).then(function () {
                            webdriverUtils.clickOnElement(irSearchPage.fileTypeDropdownElementByText('Workers Comp Claims')).then(function () {

                                irSearchPage.labelIntMinMax.getText().then(function (intlabel) {
                                    expect(intlabel).toBe('INT WITH MIN(10) AND MAX(20):');
                                });
                                irSearchPage.labelFloatMinMax.getText().then(function (floatlabel) {
                                    expect(floatlabel).toBe('FLOAT WITH MIN(50)-MAX(200):');
                                });

                                //    irSearchPage.fileTypeDropdown.click().then(function () {
                                //        browser.sleep(500);
                                //    irSearchPage.fileTypeDropdownElement(6).click().then(function() {
                                //        irSearchPage.labelIntMinMax.getText().then(function(intlabel) {
                                //            expect(intlabel).toBe('INT WITH MIN(10) AND MAX(20):');
                                //        });
                                //        irSearchPage.labelFloatMinMax.getText().then(function(floatlabel) {
                                //            expect(floatlabel).toBe('FLOAT WITH MIN(50)-MAX(200):');
                                //        });
                                //
                                //    });
                                //});
                            });
                        });
                    });
                });
            });
        });

        it('Should be able to search files using wildcard % in String attributes IF attribute is unencrypted',
            function() {
                browser.driver.get(browser.params.defaultUrl)
                    .then(function() {
                        webdriverUtils.waitTillElementVisible(navigationBar.searchIcon)
                            .then(function() {
                                navigationBar.searchIcon.click()
                                    .then(function() {
                                        webdriverUtils.waitTillElementVisible(irSearchPage.fileTypeDropdown)
                                            .then(function() {
                                                irSearchPage.fileTypeDropdown.click()
                                                    .then(function() {
                                                        webdriverUtils
                                                            .clickOnElement(irSearchPage
                                                                .fileTypeDropdownElementByText('P&C CL'))
                                                            .then(function() {
                                                                webdriverUtils
                                                                    .waitTillElementVisible(irSearchPage
                                                                        .fileTypeAttrBillingCode)
                                                                    .then(function() {
                                                                        irSearchPage.fileTypeAttrBillingCode
                                                                            .sendKeys("testingEncr%")
                                                                            .then(function() {
                                                                                irSearchPage.searchButton.click()
                                                                                    .then(function() {
                                                                                        webdriverUtils
                                                                                            .waitTillElementVisible(recordHeader.fileNumberRecordHeader)
                                                                                            .then(function() {
                                                                                                expect(recordHeader
                                                                                                        .fileNumberRecordHeader
                                                                                                        .getText())
                                                                                                    .toBe("ENCRYPTIONTESTING");
                                                                                                navigationBar.searchIcon
                                                                                                    .click()
                                                                                                    .then(function() {
                                                                                                        webdriverUtils
                                                                                                            .waitTillElementVisible(irSearchPage.searchResultsHeader)
                                                                                                            .then(function() {
                                                                                                                //breadcrumb verification
                                                                                                                expect(irSearchPage
                                                                                                                        .searchResultsHeader
                                                                                                                        .getText())
                                                                                                                    .toBe("File Type of P&C CL and Attributes matching: Billing Code with value of testingEncr%");
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
            });

        it('Should treat wildcard character % as literal (not wildcard) if String attribute is encrypted',
            function() {
                browser.driver.get(browser.params.defaultUrl)
                    .then(function() {
                        webdriverUtils.waitTillElementVisible(navigationBar.searchIcon)
                            .then(function() {
                                navigationBar.searchIcon.click()
                                    .then(function() {
                                        webdriverUtils.waitTillElementVisible(irSearchPage.fileTypeDropdown)
                                            .then(function() {
                                                irSearchPage.fileTypeDropdown.click()
                                                    .then(function() {
                                                        webdriverUtils
                                                            .clickOnElement(irSearchPage
                                                                .fileTypeDropdownElementByText('P&C CL'))
                                                            .then(function() {
                                                                webdriverUtils
                                                                    .waitTillElementVisible(irSearchPage
                                                                        .fileTypeAttrEncrString)
                                                                    .then(function() {
                                                                        irSearchPage.fileTypeAttrEncrString
                                                                            .sendKeys("encryptedVa%")
                                                                            .then(function() {
                                                                                irSearchPage.searchButton.click()
                                                                                    .then(function() {
                                                                                        expect(irSearchPage.searchGrid
                                                                                                .count())
                                                                                            .toEqual(0);
                                                                                        //breadcrumb verification
                                                                                        expect(irSearchPage
                                                                                                .searchResultsHeader
                                                                                                .getText())
                                                                                            .toBe("File Type of P&C CL and Attributes matching: EncryptedAttr with value of encryptedVa%");
                                                                                        //clear results and search on full attribute String value
                                                                                        irSearchPage.clearResultsButton
                                                                                            .click()
                                                                                            .then(function() {
                                                                                                webdriverUtils
                                                                                                    .waitTillElementVisible(irSearchPage
                                                                                                        .fileTypeAttrEncrString)
                                                                                                    .then(function() {
                                                                                                        irSearchPage
                                                                                                            .fileTypeAttrEncrString
                                                                                                            .clear()
                                                                                                            .then(function() { 
                                                                                                                irSearchPage
                                                                                                                    .fileTypeAttrEncrString
                                                                                                                    .sendKeys("encryptedValue")
                                                                                                                    .then(function() { 
                                                                                                                        irSearchPage
                                                                                                                            .searchButton
                                                                                                                            .click()
                                                                                                                            .then(function() {
                                                                                                                                webdriverUtils
                                                                                                                                    .waitTillElementVisible(recordHeader.fileNumberRecordHeader)
                                                                                                                                    .then(function() {
                                                                                                                                        expect(recordHeader
                                                                                                                                                .fileNumberRecordHeader
                                                                                                                                                .getText())
                                                                                                                                            .toBe("ENCRYPTIONTESTING");
                                                                                                                                        navigationBar.searchIcon
                                                                                                                                            .click()
                                                                                                                                            .then(function() {
                                                                                                                                                webdriverUtils
                                                                                                                                                    .waitTillElementVisible(irSearchPage.searchResultsHeader)
                                                                                                                                                    .then(function() {
                                                                                                                                                        //breadcrumb verification
                                                                                                                                                        expect(irSearchPage
                                                                                                                                                                .searchResultsHeader
                                                                                                                                                                .getText())
                                                                                                                                                            .toBe("File Type of P&C CL and Attributes matching: EncryptedAttr with value of encryptedValue");
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
                                                    });
                                            });
                                    });
                            });
                    });
            });

    }


    if (browser.params.siteBase == 'node') {
        beforeEach(function () {
            mockUtils.createMockData(mockBackend, 'Search/GetAdvancedSearchCriteria', 0, 'POST');
            browser.sleep(500);
            navigationBar.searchIcon.click();
            });

        it("should display correct attribute form controls after selecting file type", function() {
            irSearchPage.fileTypeDropdown.click().then(function() {
                irSearchPage.fileTypeDropdownElement(2).click().then(function() {
                    expect(irSearchPage.fileTypeAttrBoolCheckbox.isDisplayed()).toBeTruthy();
                    expect(irSearchPage.fileTypeAttrDatepicker.isDisplayed()).toBeTruthy();
                    expect(irSearchPage.fileTypeAttrStringInput.isDisplayed()).toBeTruthy();
                    expect(irSearchPage.fileTypeAttrStringDropdown.isDisplayed()).toBeTruthy();
                    expect(irSearchPage.fileTypeAttrUserDropdown.isDisplayed()).toBeTruthy();
                    expect(irSearchPage.fileTypeAttrIntDropdown.isDisplayed()).toBeTruthy();
                    expect(irSearchPage.fileTypeAttrFloatDropdown.isDisplayed()).toBeTruthy();
                    expect(irSearchPage.fileTypeAttrFloatScrollingMin.isDisplayed()).toBeTruthy();
                    expect(irSearchPage.fileTypeAttrFloatScrollingMax.isDisplayed()).toBeTruthy();
                    expect(irSearchPage.fileTypeAttrIntScrollingMin.isDisplayed()).toBeTruthy();
                    expect(irSearchPage.fileTypeAttrIntScrollingMax.isDisplayed()).toBeTruthy();
                });
            });
        });

        it('Should display correct labels for integer and floating attributes with min-max', function() {
            irSearchPage.fileTypeDropdown.click().then(function() {
                irSearchPage.fileTypeDropdownElement(2).click().then(function() {
                    expect(irSearchPage.labelFileTypeAttrInt.getText()).toBe('ATTR INT NO MIN MAX:');
                    expect(irSearchPage.labelfileTypeAttrFloatScrollingMin.getText()).toBe('ATTR FLOAT WITH MIN MAX:');
                });
            });
        });


        it("after date selection should display a correct date in mm/dd/yyyy format", function () {
            irSearchPage.fileTypeDropdown.click().then(function() {
                irSearchPage.fileTypeDropdownElement(2).click().then(function() {
                    expect(irSearchPage.fileTypeAttrDatepicker).toBeDefined();
                    irSearchPage.fileTypeAttrDatepicker.click();
                    var date = (new Date().getDate() < 10) ? '0' + new Date().getDate() : new Date().getDate();

                    irSearchPage.chooseDateInDatepicker(date.toString(), browser);

                    browser.driver.wait(function() {
                        return irSearchPage.datepicker.isPresent().then(function(element) {
                            return element === true;
                        });
                    }).then(function() {
                        expect(irSearchPage.fileTypeAttrDatepicker.getAttribute('value')).toEqual(conversionUtils.getDate(new Date()));
                    });
                });
            });
        });

        it("after month selection in datepicker date attribute should display a correct date in mm/dd/yyyy format", function() {
            irSearchPage.fileTypeDropdown.click().then(function() {
                irSearchPage.fileTypeDropdownElement(2).click().then(function() {
                    expect(irSearchPage.fileTypeAttrDatepicker).toBeDefined();
                    irSearchPage.fileTypeAttrDatepicker.click();
                    irSearchPage.clickLeftRowInDatepicker();

                    var dateObj = new Date();
                    var date = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();

                    // To avoid test failing in February or when date equal 31
                    if (dateObj.getDate() > 27) {
                        dateObj.setDate(27);
                        date = 27;
                    }
                    dateObj.setMonth(new Date().getMonth() - 1);

                    irSearchPage.chooseDateInDatepicker(date.toString(), browser);
                    browser.driver.wait(function() {
                        return irSearchPage.datepicker.isPresent().then(function(element) {
                            return element === true;
                        });
                    }).then(function() {
                        expect(irSearchPage.fileTypeAttrDatepicker.getAttribute('value')).toEqual(conversionUtils.getDate(dateObj));
                    });
                });
            });
        });

        it("after date typing and new date selection in datepicker date attribute should display a correct date in mm/dd/yyyy format", function() {
            irSearchPage.fileTypeDropdown.click().then(function () {
                browser.sleep(250);
               irSearchPage.fileTypeDropdownElement(2).click().then(function () {
                    
                    expect(irSearchPage.fileTypeAttrDatepicker.isDisplayed()).toBeTruthy();

                    var dateObj = new Date();
                    var todayDate = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();
                    dateObj.setYear(2000);
                    dateObj.setDate(12);

                    irSearchPage.fileTypeAttrDatepicker.sendKeys(conversionUtils.getDate(dateObj));
                   //click on date-picker and select the today's date
                    irSearchPage.fileTypeAttrDatepicker.click().then(function () {
                       irSearchPage.chooseDateInDatepicker(todayDate.toString(), browser);
                   });
                   

                    dateObj.setDate(todayDate.toString());

                    browser.driver.wait(function() {
                        return irSearchPage.datepicker.isPresent().then(function(element) {
                            return element === true;
                        });
                    }).then(function () {
                          expect(irSearchPage.fileTypeAttrDatepicker.getAttribute('value')).toEqual(conversionUtils.getDate(dateObj));
                    });
                });
            });
        });

        it("should have string dropdown with selectable values", function() {
            irSearchPage.fileTypeDropdown.click().then(function() {
                irSearchPage.fileTypeDropdownElement(2).click().then(function () {
                    irSearchPage.fileTypeAttrStringSelectedValue.getText().then(function (fileAttrSelectedVal) {
                        //removing extra spaces
                        expect(fileAttrSelectedVal.replace(/\s+/g, ' ').trim()).toEqual('');
                    });
                 
                });
                irSearchPage.fileTypeAttrStringDropdown.click().then(function() {
                    expect(irSearchPage.fileTypeAttrStringElements.count()).toBeGreaterThan(1);
                    irSearchPage.fileTypeAttrStringElements.get(1).click().then(function () {
                        irSearchPage.fileTypeAttrStringSelectedValue.getText().then(function (fileAttrSelectedVal) {
                            //removing extra spaces
                            expect(fileAttrSelectedVal.replace(/\s+/g,' ').trim()).toEqual('Choice 1');
                        });
                     
                    });
                });
            });
        });

        it("should have 'Int with choices' dropdown and the selectable value is only integers", function() {
            irSearchPage.fileTypeDropdown.click().then(function() {
                irSearchPage.fileTypeDropdownElement(2).click().then(function () {
                    irSearchPage.fileTypeAttrIntSelectedValue.getText().then(function (intAttr) {
                        //removing extra spaces
                        expect(intAttr.replace(/\s+/g, ' ').trim()).toEqual('');
                    });
                  
                });
                irSearchPage.fileTypeAttrIntDropdown.click().then(function() {
                    irSearchPage.fileTypeAttrIntElements.count().then(function(count) {
                        expect(count).toBeGreaterThan(1);
                        for (var i = 1; i < count; i++) {
                            irSearchPage.fileTypeAttrIntElements.get(i).getText().then(function(text) {
                                expect(conversionUtils.isInteger(text)).toBe(true);
                            });
                        }
                    });
                    irSearchPage.fileTypeAttrIntElements.get(1).click().then(function () {
                        irSearchPage.fileTypeAttrIntSelectedValue.getText().then(function (intAttr) {
                            //removing extra spaces
                            expect(intAttr.replace(/\s+/g, ' ').trim()).toEqual('1');
                        });
                       
                    });
                });
            });
        });

        it("should have 'Float with choices' dropdown and the selectable value is only float", function() {
            irSearchPage.fileTypeDropdown.click().then(function() {
                irSearchPage.fileTypeDropdownElement(2).click().then(function () {
                    irSearchPage.fileTypeAttrFloatSelectedValue.getText().then(function (floatVal) {
                        //removing extra spaces
                        expect(floatVal.replace(/\s+/g, ' ').trim()).toEqual('');
                    });
                    
                });
                irSearchPage.fileTypeAttrFloatDropdown.click().then(function() {
                    irSearchPage.fileTypeAttrFloatElements.count().then(function(count) {
                        expect(count).toBeGreaterThan(1);
                        for (var i = 1; i < count; i++) {
                            irSearchPage.fileTypeAttrFloatElements.get(i).getText().then(function(text) {
                                expect(conversionUtils.isFloat(text)).toBe(true);
                            });
                        }
                    });
                    irSearchPage.fileTypeAttrFloatElements.get(1).click().then(function () {
                        irSearchPage.fileTypeAttrFloatSelectedValue.getText().then(function (floatVal) {
                            //removing extra spaces
                            expect(floatVal.replace(/\s+/g, ' ').trim()).toEqual('1.5');
                        });
                        
                    });
                });
            });
        });

        it("should have User dropdown with selectable values", function() {
            irSearchPage.fileTypeDropdown.click().then(function() {
                irSearchPage.fileTypeDropdownElement(2).click().then(function () {
                    irSearchPage.fileTypeAttrUserSelectedValue.getText().then(function(userAttr) {
                        expect(userAttr.replace(/\s+/g, ' ').trim()).toEqual('');
                    });
                 
                });
                irSearchPage.fileTypeAttrUserDropdown.click().then(function() {
                    expect(irSearchPage.fileTypeAttrUserElements.count()).toBeGreaterThan(1);
                    irSearchPage.fileTypeAttrUserElements.get(1).click().then(function () {
                        irSearchPage.fileTypeAttrUserSelectedValue.getText().then(function(userAttr) {
                            expect(userAttr.replace(/\s+/g, ' ').trim()).toEqual('Corey');
                        });
                        
                    });
                });
            });
        });

        it("should have string field attribute", function() {
            irSearchPage.fileTypeDropdown.click().then(function() {
                irSearchPage.fileTypeDropdownElement(2).click().then(function() {
                    expect(irSearchPage.fileTypeAttrStringInput.getAttribute('value')).toEqual('');
                });
                irSearchPage.fileTypeAttrStringInput.sendKeys(stringValue).then(function() {
                    expect(irSearchPage.fileTypeAttrStringInput.getAttribute('value')).toEqual(stringValue);
                });
            });
        });

        it("should allow string field to contain not more than 255 characters", function() {
            irSearchPage.fileTypeDropdown.click().then(function() {
                irSearchPage.fileTypeDropdownElement(2).click().then(function() {
                    irSearchPage.fileTypeAttrStringInput.sendKeys(maxStringValue).then(function() {
                        expect(irSearchPage.fileTypeAttrStringInput.getAttribute('value')).toEqual(maxStringValue);
                    });
                    irSearchPage.fileTypeAttrStringInput.sendKeys(maxStringValue + '!!!excess symbols').then(function() {
                        expect(irSearchPage.fileTypeAttrStringInput.getAttribute('value')).toEqual(maxStringValue);
                    });
                });
            });
        });
        
        // 'Int with min max' field should not be highlighted in red in Mozilla Firefox
        it("when value less than min is entered with key stroke the 'Int with min max' field should have error notification", function() {
            irSearchPage.fileTypeDropdown.click().then(function() {
                irSearchPage.fileTypeDropdownElement(2).click().then(function() {
                    expect(irSearchPage.fileTypeAttrIntScrollingMin.getText()).toEqual('');
                });
                irSearchPage.fileTypeAttrIntScrollingMin.sendKeys("78");
                //press down arrow key
                browser.actions().sendKeys(protractor.Key.DOWN).perform();
                expect(irSearchPage.fileTypeAttrIntScrollingMin.getAttribute('class')).toContain("ng-valid");

                irSearchPage.fileTypeAttrIntScrollingMin.clear();
                irSearchPage.fileTypeAttrIntScrollingMin.sendKeys("-5");
                //press down arrow key
                browser.actions().sendKeys(protractor.Key.DOWN).perform();
                expect(irSearchPage.fileTypeAttrIntScrollingMin.getAttribute('class')).toContain("ng-invalid");
            });
        });

        it("when value more than max is entered with key stroke the 'Int with min max' field should have error notification", function () {
            irSearchPage.fileTypeDropdown.click().then(function () {
                irSearchPage.fileTypeDropdownElement(2).click().then(function () {
                    expect(irSearchPage.fileTypeAttrIntScrollingMin.getText()).toEqual('');
                });
                irSearchPage.fileTypeAttrIntScrollingMin.sendKeys("78");
                //press down arrow key
                browser.actions().sendKeys(protractor.Key.UP).perform();
                expect(irSearchPage.fileTypeAttrIntScrollingMin.getAttribute('class')).toContain("ng-valid");

                irSearchPage.fileTypeAttrIntScrollingMin.clear();
                irSearchPage.fileTypeAttrIntScrollingMin.sendKeys("1000");
                //press down arrow key
                browser.actions().sendKeys(protractor.Key.UP).perform();
                expect(irSearchPage.fileTypeAttrIntScrollingMin.getAttribute('class')).toContain("ng-invalid");
            });
        });

        it("When value below -2147483648 is entered into 'Int no min max' field, field should show error notification", function () {
            irSearchPage.fileTypeDropdown.click().then(function() {
                irSearchPage.fileTypeDropdownElement(2).click().then(function() {
                    irSearchPage.fileTypeAttrIntScrollingMax.getText().then(function (intVal) {
                        expect(intVal.replace(/\s+/g, ' ').trim()).toEqual('');
                    });
                });
                irSearchPage.fileTypeAttrIntScrollingMax.sendKeys("-2147483648");
                expect(irSearchPage.fileTypeAttrIntScrollingMax.getAttribute('class')).toContain("ng-valid");

                //enter lower value
                irSearchPage.fileTypeAttrIntScrollingMax.clear();
                irSearchPage.fileTypeAttrIntScrollingMax.sendKeys("-2147483649");  
                expect(irSearchPage.fileTypeAttrIntScrollingMax.getAttribute('class')).toContain("ng-invalid");
                
            });
        });

        it("When value above 2147483647 is entered into 'Int no min max' field, field should show error notification", function () {
            irSearchPage.fileTypeDropdown.click().then(function () {
                irSearchPage.fileTypeDropdownElement(2).click().then(function () {
                    irSearchPage.fileTypeAttrIntScrollingMax.getText().then(function (intVal) {
                        expect(intVal.replace(/\s+/g, ' ').trim()).toEqual('');
                    });
                });
                irSearchPage.fileTypeAttrIntScrollingMax.sendKeys("2147483647");
                expect(irSearchPage.fileTypeAttrIntScrollingMax.getAttribute('class')).toContain("ng-valid");

                //enter lower value
                irSearchPage.fileTypeAttrIntScrollingMax.clear();
                irSearchPage.fileTypeAttrIntScrollingMax.sendKeys("2147483648");
                expect(irSearchPage.fileTypeAttrIntScrollingMax.getAttribute('class')).toContain("ng-invalid");

            });
        });

        it("integer attribute field should allow up to 10 digits to be entered and ignore keystrokes after", function () {
            irSearchPage.fileTypeDropdown.click().then(function () {
                irSearchPage.fileTypeDropdownElement(2).click().then(function () {
                    irSearchPage.fileTypeAttrIntScrollingMax.getText().then(function (intVal) {
                        expect(intVal.replace(/\s+/g, ' ').trim()).toEqual('');
                    });
                });
                irSearchPage.fileTypeAttrIntScrollingMax.sendKeys("001100110022222");
                //should only allow the first 10 digits to enter and ignore the 2's after
                expect(irSearchPage.fileTypeAttrIntScrollingMax.getAttribute('value')).toEqual("0011001100");
            });
        });

        it("When only a dash (-) is entered into an integer or float attribute field, after defocusing the field the user should see a validation error", function () {
            irSearchPage.fileTypeDropdown.click().then(function () {
                irSearchPage.fileTypeDropdownElement(2).click().then(function () {

                    //when float element in focus, typing a - should not invalidate the field
                    irSearchPage.fileTypeAttrFloatScrollingMax.clear();
                    irSearchPage.fileTypeAttrFloatScrollingMax.sendKeys("-");
                    expect(irSearchPage.fileTypeAttrFloatScrollingMax.getAttribute('value')).toEqual("-");
                    //expect(irSearchPage.fileTypeAttrFloatScrollingMax.getAttribute('class')).toContain("ng-valid");

                    //defocus float element and still only a - should invalidate field
                    irSearchPage.fileTypeAttrFloatScrollingMax.sendKeys(protractor.Key.TAB);
                    expect(irSearchPage.fileTypeAttrFloatScrollingMax.getAttribute('class')).toContain("ng-invalid");


                    //when integer element in focus, typing a - should not invalidate the field
                    irSearchPage.fileTypeAttrIntScrollingMax.clear();
                    irSearchPage.fileTypeAttrIntScrollingMax.sendKeys("-");
                    expect(irSearchPage.fileTypeAttrIntScrollingMax.getAttribute('value')).toEqual("-");
                   // expect(irSearchPage.fileTypeAttrIntScrollingMax.getAttribute('class')).toContain("ng-valid");

                    //defocus integer element and still only a - should invalidate field
                    irSearchPage.fileTypeAttrIntScrollingMax.sendKeys(protractor.Key.TAB);
                    expect(irSearchPage.fileTypeAttrIntScrollingMax.getAttribute('class')).toContain("ng-invalid");
                });

            });
        });

        it("integer attribute field should only allow one dash in the field and it must be the first character", function () {
            irSearchPage.fileTypeDropdown.click().then(function () {
                irSearchPage.fileTypeDropdownElement(2).click().then(function () {
                    irSearchPage.fileTypeAttrIntScrollingMax.getText().then(function (intVal) {
                        expect(intVal.replace(/\s+/g, ' ').trim()).toEqual('');
                    });
                });
                irSearchPage.fileTypeAttrIntScrollingMax.sendKeys("-10");
                expect(irSearchPage.fileTypeAttrIntScrollingMax.getAttribute('value')).toEqual("-10");

                irSearchPage.fileTypeAttrIntScrollingMax.clear();//.then(function () {
                irSearchPage.fileTypeAttrIntScrollingMax.sendKeys("-1-200");
                expect(irSearchPage.fileTypeAttrIntScrollingMax.getAttribute('value')).toEqual("-1200");

                irSearchPage.fileTypeAttrIntScrollingMax.clear();//.then(function () {
                irSearchPage.fileTypeAttrIntScrollingMax.sendKeys("120-10");
                expect(irSearchPage.fileTypeAttrIntScrollingMax.getAttribute('value')).toEqual("12010");

                irSearchPage.fileTypeAttrIntScrollingMax.clear();//.then(function () {
                irSearchPage.fileTypeAttrIntScrollingMax.sendKeys("--200");
                expect(irSearchPage.fileTypeAttrIntScrollingMax.getAttribute('value')).toEqual("-200");
            });
        });

        it("integer attribute field should ignore any non-numeric characters (other than initial dash)", function () {
            irSearchPage.fileTypeDropdown.click().then(function () {
                irSearchPage.fileTypeDropdownElement(2).click().then(function () {
                    irSearchPage.fileTypeAttrIntScrollingMax.getText().then(function (intVal) {
                        expect(intVal.replace(/\s+/g, ' ').trim()).toEqual('');
                    });
                });
                irSearchPage.fileTypeAttrIntScrollingMax.sendKeys("-10ei-d");
                expect(irSearchPage.fileTypeAttrIntScrollingMax.getAttribute('value')).toEqual("-10");

                irSearchPage.fileTypeAttrIntScrollingMax.clear();//.then(function () {
                irSearchPage.fileTypeAttrIntScrollingMax.sendKeys("B1je200");
                expect(irSearchPage.fileTypeAttrIntScrollingMax.getAttribute('value')).toEqual("1200");

                irSearchPage.fileTypeAttrIntScrollingMax.clear();//.then(function () {
                irSearchPage.fileTypeAttrIntScrollingMax.sendKeys("kf//pp\\f");
                expect(irSearchPage.fileTypeAttrIntScrollingMax.getAttribute('value')).toEqual("");

                irSearchPage.fileTypeAttrIntScrollingMax.clear();//.then(function () {
                irSearchPage.fileTypeAttrIntScrollingMax.sendKeys("000dhs.ee8");
                expect(irSearchPage.fileTypeAttrIntScrollingMax.getAttribute('value')).toEqual("0008");
            });
        });

        // 'Float no min max' field should not be highlighted in red in Mozilla Firefox
        it("when value more than 2147483647 is entered in the 'Float no min max' field should have error notification", function () {
            irSearchPage.fileTypeDropdown.click().then(function () {
                irSearchPage.fileTypeDropdownElement(2).click().then(function () {
                    expect(irSearchPage.fileTypeAttrFloatScrollingMax.getText()).toEqual('');
                });
                irSearchPage.fileTypeAttrFloatScrollingMax.sendKeys("2147483646.999");
                expect(irSearchPage.fileTypeAttrFloatScrollingMax.getAttribute('class')).toContain("ng-valid");

                irSearchPage.fileTypeAttrFloatScrollingMax.clear();
                irSearchPage.fileTypeAttrFloatScrollingMax.sendKeys("2147483647");
                expect(irSearchPage.fileTypeAttrFloatScrollingMax.getAttribute('class')).toContain("ng-valid");

                irSearchPage.fileTypeAttrFloatScrollingMax.clear();
                irSearchPage.fileTypeAttrFloatScrollingMax.sendKeys("2147483647.000");
                expect(irSearchPage.fileTypeAttrFloatScrollingMax.getAttribute('class')).toContain("ng-valid");

                irSearchPage.fileTypeAttrFloatScrollingMax.clear();
                irSearchPage.fileTypeAttrFloatScrollingMax.sendKeys("2147483647.001");
                expect(irSearchPage.fileTypeAttrFloatScrollingMax.getAttribute('class')).toContain("ng-invalid");

                irSearchPage.fileTypeAttrFloatScrollingMax.clear();
                irSearchPage.fileTypeAttrFloatScrollingMax.sendKeys("2147483648");
                expect(irSearchPage.fileTypeAttrFloatScrollingMax.getAttribute('class')).toContain("ng-invalid");
            });
        });

        it("when value less than -2147483648 is entered with key stroke the 'Float no min max' field should have error notification", function () {
            irSearchPage.fileTypeDropdown.click().then(function () {
                irSearchPage.fileTypeDropdownElement(2).click().then(function () {
                    expect(irSearchPage.fileTypeAttrFloatScrollingMax.getText()).toEqual('');
                });
                irSearchPage.fileTypeAttrFloatScrollingMax.sendKeys("-2147483647.999");
                expect(irSearchPage.fileTypeAttrFloatScrollingMax.getAttribute('class')).toContain("ng-valid");

                irSearchPage.fileTypeAttrFloatScrollingMax.clear();
                irSearchPage.fileTypeAttrFloatScrollingMax.sendKeys("-2147483648.000");
                expect(irSearchPage.fileTypeAttrFloatScrollingMax.getAttribute('class')).toContain("ng-valid");

                irSearchPage.fileTypeAttrFloatScrollingMax.clear();
                irSearchPage.fileTypeAttrFloatScrollingMax.sendKeys("-2147483648.001");
                expect(irSearchPage.fileTypeAttrFloatScrollingMax.getAttribute('class')).toContain("ng-invalid");

                irSearchPage.fileTypeAttrFloatScrollingMax.clear();
                irSearchPage.fileTypeAttrFloatScrollingMax.sendKeys("-2147483649");
                expect(irSearchPage.fileTypeAttrFloatScrollingMax.getAttribute('class')).toContain("ng-invalid");
            });
        });

        // 'Float with min max' field should not be highlighted in red in Mozilla Firefox
        it("when value more than max is entered with key stroke the 'Float with min max' field should have error notification", function() {
            irSearchPage.fileTypeDropdown.click().then(function() {
                irSearchPage.fileTypeDropdownElement(2).click().then(function() {
                    expect(irSearchPage.fileTypeAttrFloatScrollingMin.getText()).toEqual('');
                });
                irSearchPage.fileTypeAttrFloatScrollingMin.sendKeys("300.4");
                expect(irSearchPage.fileTypeAttrFloatScrollingMin.getAttribute('class')).toContain("ng-valid");

                irSearchPage.fileTypeAttrFloatScrollingMin.clear();
                irSearchPage.fileTypeAttrFloatScrollingMin.sendKeys("300.6");
                expect(irSearchPage.fileTypeAttrFloatScrollingMin.getAttribute('class')).toContain("ng-invalid");
            });
        });

        it("when value less than min is entered with key stroke the 'Float with min max' field should have error notification", function () {
            irSearchPage.fileTypeDropdown.click().then(function () {
                irSearchPage.fileTypeDropdownElement(2).click().then(function () {
                    expect(irSearchPage.attrFloatMin50Max200.getText()).toEqual('');
                });
                irSearchPage.attrFloatMin50Max200.sendKeys("50.1");
                expect(irSearchPage.attrFloatMin50Max200.getAttribute('class')).toContain("ng-valid");

                irSearchPage.attrFloatMin50Max200.clear();
                irSearchPage.attrFloatMin50Max200.sendKeys("49.9");
                expect(irSearchPage.attrFloatMin50Max200.getAttribute('class')).toContain("ng-invalid");
            });
        });

        it("float attribute fields should ignore any characters past the first 14", function () {
            irSearchPage.fileTypeDropdown.click().then(function () {
                irSearchPage.fileTypeDropdownElement(2).click().then(function () {
                    expect(irSearchPage.attrFloatMin50Max200.getText()).toEqual('');
                });
                irSearchPage.attrFloatMin50Max200.sendKeys("1.234567890123456789");
                expect(irSearchPage.attrFloatMin50Max200.getAttribute('value')).toEqual("1.2345678901234"); 
            });
        });

        it("Float attribute field should only allow one dash in the field and it must be the first character", function () {
            irSearchPage.fileTypeDropdown.click().then(function () {
                irSearchPage.fileTypeDropdownElement(2).click();//.then(function () {
        //            irSearchPage.fileTypeAttrIntScrollingMax.getText().then(function (intVal) {
           //             expect(intVal.replace(/\s+/g, ' ').trim()).toEqual('');
            //        });
             //   });
                irSearchPage.attrFloatMin50Max200.sendKeys("-10");
                expect(irSearchPage.attrFloatMin50Max200.getAttribute('value')).toEqual("-10");

               

                irSearchPage.attrFloatMin50Max200.clear();//.then(function () {
                irSearchPage.attrFloatMin50Max200.sendKeys("-1-20.10");
                expect(irSearchPage.attrFloatMin50Max200.getAttribute('value')).toEqual("-120.10");

                irSearchPage.attrFloatMin50Max200.clear();//.then(function () {
                irSearchPage.attrFloatMin50Max200.sendKeys("120-10");
                expect(irSearchPage.attrFloatMin50Max200.getAttribute('value')).toEqual("12010");

                irSearchPage.attrFloatMin50Max200.clear();//.then(function () {
                irSearchPage.attrFloatMin50Max200.sendKeys("0.-200");
                expect(irSearchPage.attrFloatMin50Max200.getAttribute('value')).toEqual("0.200");

                irSearchPage.attrFloatMin50Max200.clear();//.then(function () {
                irSearchPage.attrFloatMin50Max200.sendKeys("-0.-200");
                expect(irSearchPage.attrFloatMin50Max200.getAttribute('value')).toEqual("-0.200");

                irSearchPage.attrFloatMin50Max200.clear();//.then(function () {
                irSearchPage.attrFloatMin50Max200.sendKeys("--2.00");
                expect(irSearchPage.attrFloatMin50Max200.getAttribute('value')).toEqual("-2.00");
            });
        });

        it("Float attribute field should ignore any non-numeric characters (other than initial dash and one decimal)", function () {
            irSearchPage.fileTypeDropdown.click().then(function () {
                irSearchPage.fileTypeDropdownElement(2).click();//.then(function () {
              //      irSearchPage.fileTypeAttrIntScrollingMax.getText().then(function (intVal) {
              //          expect(intVal.replace(/\s+/g, ' ').trim()).toEqual('');
             //       });
             //   });
                irSearchPage.attrFloatMin50Max200.sendKeys("-10eid");
                expect(irSearchPage.attrFloatMin50Max200.getAttribute('value')).toEqual("-10");

                irSearchPage.attrFloatMin50Max200.clear();//.then(function () {
                irSearchPage.attrFloatMin50Max200.sendKeys("B1je2.00");
                expect(irSearchPage.attrFloatMin50Max200.getAttribute('value')).toEqual("12.00");

                irSearchPage.attrFloatMin50Max200.clear();//.then(function () {
                irSearchPage.attrFloatMin50Max200.sendKeys("kf//pp\\f");
                expect(irSearchPage.attrFloatMin50Max200.getAttribute('value')).toEqual("");

                irSearchPage.attrFloatMin50Max200.clear();//.then(function () {
                irSearchPage.attrFloatMin50Max200.sendKeys("000dhs.ee8");
                expect(irSearchPage.attrFloatMin50Max200.getAttribute('value')).toEqual("000.8");

                irSearchPage.attrFloatMin50Max200.clear();//.then(function () {
                irSearchPage.attrFloatMin50Max200.sendKeys("000dhs.ee8.88");
                expect(irSearchPage.attrFloatMin50Max200.getAttribute('value')).toEqual("000.888");

                irSearchPage.attrFloatMin50Max200.clear();//.then(function () {
                irSearchPage.attrFloatMin50Max200.sendKeys("11..");
                expect(irSearchPage.attrFloatMin50Max200.getAttribute('value')).toEqual("11.");
            });
        });


    }
});
