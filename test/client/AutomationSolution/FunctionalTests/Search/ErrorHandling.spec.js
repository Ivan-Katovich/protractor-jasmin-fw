exports.tags = ['File_Navigation', 'File_Search'];
var mockBackend = require('../../lib/mockBackend.js');
var mockUtils = require('../../utils/mockUtils.js');
var conversionUtils = require('../../utils/conversionUtils.js');
var webdriverUtils = require('../../utils/webdriverExtentionUtils.js');
var IR_NavigationBar = require('./../../PageObjects/Containers/NavigationBar.js');
var navigationBar = new IR_NavigationBar();
var IR_SearchPage = require('../../PageObjects/SearchPage.js');
var irSearchPage = new IR_SearchPage();

var stringValue = 'text123&%$%^&*(';
var maxStringValue = 'longstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlongstringlong!';

var mock = mockBackend([{
    testRoute: 'Search/GetAdvancedSearchCriteria',
    testScenarios: [0],
    testData: '',
    testMethod: 'POST'
}]);


describe('Search form validation/error handling for attributes', function () {

    if (browser.params.siteBase == 'node') {
        beforeEach(function() {
            mockUtils.createMockData(mockBackend, 'Search/GetAdvancedSearchCriteria', 0, 'POST');
            browser.sleep(500);
            navigationBar.searchIcon.click();
            irSearchPage.fileTypeDropdown.click().then(function() {
                irSearchPage.fileTypeDropdownElement(2).click().then(function() {});
            });
        });



       it('If string textbox accepts 255 max length and user enters more than 255 in that textbox,it should only accept first 255 character in that  attribute ', function() {

           irSearchPage.attrStrMax255.sendKeys(maxStringValue+'more than 255 characters').then(function () {
                irSearchPage.attrStrMax255.getAttribute('value').then(function (strVal) {
                 //the length should not be more than 255
                    expect(strVal.length<=255).toBeTruthy();
                });
               
            });
        }); //it block completed

       it('If string textbox accepts 15 max length and user enters more than 15 in that textbox,it should only accept first 15 character in that  attribute ', function () {
           irSearchPage.attrStrMax15.sendKeys(stringValue + 'more than 15 characters').then(function () {
               irSearchPage.attrStrMax15.getAttribute('value').then(function (strVal) {
                   console.log(strVal.length);
                   //the length should not be more than 15
                   expect(strVal.length <= 15).toBeTruthy();
                });
            });
        }); //it block completed

       it('Float attribute textbox should not allow more than 14 digits', function() {
            var floatVal = '12345678901234.99'; //digits more than 14---total are 17
            irSearchPage.attrFloatMax255.sendKeys(floatVal).then(function() {
                irSearchPage.attrFloatMax255.getAttribute('value').then(function(floatingVal) {
                 
                    expect(floatingVal.length).toBeLessThan(15);
                });
          });
        });//it block completed

       it('Interger attribute textbox should not allow more than 10 digits', function() {
           var intVal = '1234567890123'; //digits more than 10---total are 13
           irSearchPage.attrIntMax255.sendKeys(intVal).then(function() {
               irSearchPage.attrIntMax255.getAttribute('value').then(function(integerVal) {
                   
                   expect(integerVal.length).toBeLessThan(11);
               });
           });
       });//it block completed
        
       it('Date-time picker:If user enters any invalid alphabetical text in date-time picker field,it should display error notification symbol right after that attribute', function () {
           irSearchPage.attrDateTimePicker.sendKeys(stringValue).then(function () {
               irSearchPage.attrDateTimePicker.getAttribute('class').then(function (className) {
                   expect(className).toContain('ng-invalid');
                   //verify that search button is disabled
                   expect(irSearchPage.searchButton.getAttribute('disabled')).toBe('true');
               });
           });
       });

       it('Date-time picker:If user enters any invalid month value(for example-15/12/2015) in date-time picker field,it should display error notification symbol right after that attribute', function () {
           var dateTileVal = '15/12/2015';  //note that 15 is an invalid month value
           irSearchPage.attrDateTimePicker.sendKeys(dateTileVal).then(function () {
               irSearchPage.attrDateTimePicker.getAttribute('class').then(function (className) {
                   expect(className).toContain('ng-invalid');
                   //verify that search button is disabled
                   expect(irSearchPage.searchButton.getAttribute('disabled')).toBe('true');
               });
           });
       });

       it('Date-time picker:If user enters any invalid day value(for example-15/38/2015) in date-time picker field,it should display error notification symbol right after that attribute', function () {
           var dateTileVal = '10/38/2015'; //note that 38 is an invalid day value
           irSearchPage.attrDateTimePicker.sendKeys(dateTileVal).then(function () {
               irSearchPage.attrDateTimePicker.getAttribute('class').then(function (className) {
                   expect(className).toContain('ng-invalid');
                   //verify that search button is disabled
                   expect(irSearchPage.searchButton.getAttribute('disabled')).toBe('true');
               });
           });
       });

       it('Date-time picker:If user enters any invalid year value(for example-15/38/0000) in date-time picker field,it should display error notification symbol right after that attribute', function () {
           var dateTileVal = '11/08/ 0000'; //note that 0000 is an invalid year value
           irSearchPage.attrDateTimePicker.sendKeys(dateTileVal).then(function () {
               irSearchPage.attrDateTimePicker.getAttribute('class').then(function (className) {
                   expect(className).toContain('ng-invalid');
                   //verify that search button is disabled
                   expect(irSearchPage.searchButton.getAttribute('disabled')).toBe('true');
               });
           });
       });
        
       it('If a floating point attribute accepts min 50 and max 200 and a user enters any numeric value < min , it should display error notification symbol right after that attribute ', function () {
           var invalidMinVal = 25; //25 and 205 are invalid values
           irSearchPage.attrFloatMin50Max200.sendKeys(invalidMinVal).then(function () {
               irSearchPage.attrFloatMin50Max200.getAttribute('class').then(function (className) {
                   expect(className).toContain('ng-invalid');
                   //verify that search button is disabled
                   expect(irSearchPage.searchButton.getAttribute('disabled')).toBe('true');
               });
           });
       });

        it('If a floating point attribute accepts min 50 and max 200 and a user enters either any non-numeric or alphabetical value, the field should ignore any non-numerical characters ', function () {
            irSearchPage.attrFloatMin50Max200.sendKeys(stringValue).then(function () {
                irSearchPage.attrFloatMin50Max200.getAttribute('value').then(function (val) {
                    expect(val).toBe('123');
                });
            });
        });
       
        it('If a floating point attribute accepts min 50 and max 200 and a user enters  any numeric value > max ,  it should display error notification symbol right after that attribute) ', function () {
            var invalidMaxVal = 205; //25 and 205 are invalid values
            irSearchPage.attrFloatMin50Max200.sendKeys(invalidMaxVal).then(function () {
                irSearchPage.attrFloatMin50Max200.getAttribute('class').then(function (className) {
                    expect(className).toContain('ng-invalid');
                    //verify that search button is disabled
                    expect(irSearchPage.searchButton.getAttribute('disabled')).toBe('true');
                });
            });
        });
        
        it('If an integer attribute accepts min 10 and max 20 and a user enters any numeric value < min , it should display error notification symbol right after that attribute) ', function () {
            var invalidMinVal = 5;
            irSearchPage.attrIntMin10Max20.sendKeys(invalidMinVal).then(function () {
                webdriverUtils.pressTab().then(function () {
                    irSearchPage.attrIntMin10Max20.getAttribute('class').then(function (className) {
                        expect(className).toContain('ng-invalid');
                        //verify that search button is disabled
                        expect(irSearchPage.searchButton.getAttribute('disabled')).toBe('true');
                    });
                });
            });
        });
        
        it('If an integer attribute accepts min 10 and max 20 and a user enters either any non-numeric or alphabetical value  , it should display error notification symbol right after that attribute) ', function () {
            irSearchPage.attrIntMin10Max20.sendKeys(stringValue).then(function () {
                webdriverUtils.pressTab().then(function () {
                    irSearchPage.attrIntMin10Max20.getAttribute('class').then(function (className) {
                        expect(className).toContain('ng-invalid');
                        //verify that search button is disabled
                        expect(irSearchPage.searchButton.getAttribute('disabled')).toBe('true');
                    });
                });
            });
        });

        it('If an integer attribute accepts min 10 and max 20 and a user enters  any numeric value > max , it should display error notification symbol right after that attribute) ', function () {
            var invalidMaxVal = 205; //25 and 205 are invalid values
            irSearchPage.attrIntMin10Max20.sendKeys(invalidMaxVal).then(function () {
                webdriverUtils.pressTab().then(function () {
                    irSearchPage.attrIntMin10Max20.getAttribute('class').then(function (className) {
                        expect(className).toContain('ng-invalid');
                    });
                });
            });
        });
    }//if block completed

});//describe block completed