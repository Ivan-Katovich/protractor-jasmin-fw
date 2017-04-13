/**
 * Created by flaterje on 4/29/2014.
 */
var mocks = [];

var GetResults = {
    name: "GetResults",
    mockRoute: "api/files/find",
    testScope: "success", //success | fail | error
    testScenario: "multipleResults",
    jsonTemplate: [
        {
            multipleResults: function() {
                return "[{{#repeat 18}}" +
                    "{" +
                    '   "id":654461,' +
                    '   "fileTypeId":{{number 100}},' +
                    '   "fileTypeName":"{{company}}",' +
                    '   "fileTypeDescription":"{{company}}",' +
                    '   "drawerId":{{number 100}},' +
                    '   "drawerName":"{{company}}",' +
                    '   "drawerDescription":"{{company}}",' +
                    '   "notesId":{{number 100}},' +
                    '   "description":"{{company}}",' +
                    '   "fileNumberPart1":"{{company}}",' +
                    '   "fileNumberPart2":"",' +
                    '   "fileNumberPart3":"pt3",' +
                    '   "isTemporary":{{boolean}},' +
                    '   "isDeleted":{{boolean}},' +
                    '   "dateLastOpened":"2015-06-01T17:41:20.3992519-04:00",' +
                    '   "lastModified":"2015-06-01T17:41:20.3992519-04:00",' +
                    '   "dateCreated":"2015-06-01T17:41:20.3992519-04:00",' +
                    '   "attributes":[{{#repeat 5}}' +
                    "       {" +
                    '           "name":"NameStr{{number 10}}",' +
                    '           "value":{' +
                    "           }" +
                    "       } {{/repeat}}" +
                    "   ]" +
                    "} {{/repeat}}" +
                    "]";
            }
        },
        {
            singleResult: function() {
                return "[{{#repeat 1}}" +
                    "{" +
                    '   "id":654461,' +
                    '   "fileTypeId":{{number 100}},' +
                    '   "fileTypeName":"{{company}}",' +
                    '   "fileTypeDescription":"{{company}}",' +
                    '   "drawerId":{{number 100}},' +
                    '   "drawerName":"{{company}}",' +
                    '   "drawerDescription":"{{company}}",' +
                    '   "notesId":{{number 100}},' +
                    '   "description":"{{company}}",' +
                    '   "fileNumberPart1":"{{company}}",' +
                    '   "fileNumberPart2":"",' +
                    '   "fileNumberPart3":"pt3",' +
                    '   "isTemporary":{{boolean}},' +
                    '   "isDeleted":{{boolean}},' +
                    '   "dateLastOpened":"2015-06-01T17:41:20.3992519-04:00",' +
                    '   "lastModified":"2015-06-01T17:41:20.3992519-04:00",' +
                    '   "dateCreated":"2015-06-01T17:41:20.3992519-04:00",' +
                    '   "attributes":[{{#repeat 5}}' +
                    "       {" +
                    '           "name":"NameStr{{number 10}}",' +
                    '           "value":{' +
                    "           }" +
                    "       } {{/repeat}}" +
                    "   ]" +
                    "} {{/repeat}}" +
                    "]";
            }
        },
        {
            twentyResultsWithUniqueIds: function() {
                var files = [];

                for (var i = 0; i < 20; i++) {
                    var file = {
                        id: i,
                        fileTypeId: 100,
                        fileTypeName: "No FileType",
                        fileTypeDescription: "No FileType",
                        drawerId: 100,
                        drawerName: "No Drawer",
                        drawerDescription: "No Drawer",
                        notesId: 1,
                        description: "File " + i,
                        fileNumberPart1: "File " + i,
                        fileNumberPart2: "",
                        fileNumberPart3: "",
                        isTemporary: false,
                        isDeleted: false,
                        dateLastOpened: "2015-06-01T17:41:20.3992519-04:00",
                        lastModified: "2015-06-01T17:41:20.3992519-04:00",
                        dateCreated: "2015-06-01T17:41:20.3992519-04:00"
                    };
                    files.push(file);
                }

                return JSON.stringify(files);
            }
        }
    ]
};
mocks.push(GetResults);


/**
 * @api {get} /Search/GetAdvancedSearchCriteria Get Advanced Search Criteria
 * @apiName GetAdvancedSearchCriteria
 * @apiGroup Search
 */
var GetAdvancedSearchCriteria = {
    name: "GetAdvancedSearchCriteria",
    mockRoute: "/Search/GetAdvancedSearchCriteria",
    testScope: "success", //success | fail | error
    testScenario: "encryptedAttributes",
    //latency: '11000-17000',
    data: {
        drawers: [
            { name: "Drawer 1", id: "1" }, { name: "Drawer 2", id: "2" }, {
                name: "Drawer 3",
                id: "3"
            }, { name: "Drawer 4", id: "4" }
        ],
        attributes: [
            { PropertyType: 0, DisplayName: "Attr Bool", Id: "ir:attrdef_1" },
            { PropertyType: 3, DisplayName: "Attr Date", Id: "irattrdef_2" },
            { PropertyType: 6, DisplayName: "Attr String", Id: "ir:attrdef_3", MaxLength: 255 },
            {
                PropertyType: 6,
                DisplayName: "Attr  String with choices",
                Id: "ir:attrdef_4",
                Choices: [{ DisplayName: "Choice 1", Value: "Choice 1" }, { DisplayName: "Choice 2", Value: "Choice 2" }]
            },
            {
                PropertyType: 2,
                DisplayName: "Attr Int no min max",
                Id: "ir:attrdef_5",
                MaximumValue: 2147483647,
                MinimumValue: -2147483648
            },
            {
                PropertyType: 2,
                DisplayName: "Attr Int with choices",
                Id: "ir:attrdef_6",
                Choices: [{ DisplayName: "1", Value: 1 }, { DisplayName: "2", Value: 2 }]
            },
            {
                PropertyType: 2,
                DisplayName: "Attr Int with min max",
                Id: "ir:attrdef_7",
                MinimumValue: 1,
                MaximumValue: 313
            },
            {
                PropertyType: 4,
                DisplayName: "Attr Float no min max",
                Id: "ir:attrdef_8",
                MaximumValue: 2147483647,
                MinimumValue: -2147483648
            },
            {
                PropertyType: 4,
                DisplayName: "Attr Float with choices",
                Id: "ir:attrdef_9",
                Choices: [{ DisplayName: "1.5", Value: 1.5 }, { DisplayName: "2.5", Value: 2.5 }]
            },
            {
                PropertyType: 4,
                DisplayName: "Attr Float with min max",
                Id: "ir:attrdef_10",
                MinimumValue: 0,
                MaximumValue: 300.5
            },
            {
                PropertyType: 1,
                DisplayName: "Attr User",
                Id: "ir:attrdef_11",
                Choices: [
                    { DisplayName: "Corey", Value: "Corey" }, {
                        DisplayName: "Scott",
                        Value: "Scott"
                    }, { DisplayName: "Derek", Value: "Derek" }
                ]
            },
            {
                "DefaultValue": null,
                "MaxLength": 15,
                "Choices": null,
                "Id": "ir:attrdef_9308",
                "LocalName": "Str Textbox 15 length",
                "LocalNameSpace": "",
                "DisplayName": "Str Textbox 15 length",
                "QueryName": "ir:attrdef_9308",
                "Description": "Str Textbox 15 length",
                "PropertyType": 6,
                "Cardinality": 0,
                "Updatability": 1,
                "Inherited": false,
                "Required": false,
                "Queryable": true,
                "Orderable": true,
                "OpenChoice": false
            },
            {
                "DefaultValue": null,
                "MaxLength": 255,
                "Choices": null,
                "Id": "ir:attrdef_9304",
                "LocalName": "Str Textbox 255 length",
                "LocalNameSpace": "",
                "DisplayName": "Str Textbox 255 length",
                "QueryName": "ir:attrdef_9304",
                "Description": "Str Textbox 255 length",
                "PropertyType": 6,
                "Cardinality": 0,
                "Updatability": 1,
                "Inherited": false,
                "Required": false,
                "Queryable": true,
                "Orderable": true,
                "OpenChoice": false
            },
            {
                "DefaultValue": null,
                "MinimumValue": 0,
                "MaximumValue": 2147483647,
                "Choices": null,
                "Id": "ir:attrdef_9307",
                "LocalName": "Int Textbox 15 length",
                "LocalNameSpace": "",
                "DisplayName": "Int Textbox 15 length",
                "QueryName": "ir:attrdef_9307",
                "Description": "Int Textbox 15 length",
                "PropertyType": 2,
                "Cardinality": 0,
                "Updatability": 1,
                "Inherited": false,
                "Required": false,
                "Queryable": true,
                "Orderable": true,
                "OpenChoice": false
            },
            {
                "DefaultValue": null,
                "MinimumValue": 0,
                "MaximumValue": 2147483647,
                "Choices": null,
                "Id": "ir:attrdef_9303",
                "LocalName": "Int Textbox 255 length",
                "LocalNameSpace": "",
                "DisplayName": "Int Textbox 255 length",
                "QueryName": "ir:attrdef_9303",
                "Description": "Int Textbox 255 length",
                "PropertyType": 2,
                "Cardinality": 0,
                "Updatability": 1,
                "Inherited": false,
                "Required": false,
                "Queryable": true,
                "Orderable": true,
                "OpenChoice": false
            },
            {
                "DefaultValue": null,
                "Precision": 0,
                "MinimumValue": 0,
                "MaximumValue": 3.4028234663852886E+38,
                "Choices": null,
                "Id": "ir:attrdef_9306",
                "LocalName": "Float Textbox 15 length",
                "LocalNameSpace": "",
                "DisplayName": "Float Textbox 15 length",
                "QueryName": "ir:attrdef_9306",
                "Description": "Float Textbox 15 length",
                "PropertyType": 4,
                "Cardinality": 0,
                "Updatability": 1,
                "Inherited": false,
                "Required": false,
                "Queryable": true,
                "Orderable": true,
                "OpenChoice": false
            },
            {
                "DefaultValue": null,
                "Precision": 0,
                "MinimumValue": 0,
                "MaximumValue": 3.4028234663852886E+38,
                "Choices": null,
                "Id": "ir:attrdef_9305",
                "LocalName": "Float Textbox 255 length",
                "LocalNameSpace": "",
                "DisplayName": "Float Textbox 255 length",
                "QueryName": "ir:attrdef_9305",
                "Description": "Float Textbox 255 length",
                "PropertyType": 4,
                "Cardinality": 0,
                "Updatability": 1,
                "Inherited": false,
                "Required": false,
                "Queryable": true,
                "Orderable": true,
                "OpenChoice": false
            },
            {
                "DefaultValue": null,
                "Choices": null,
                "Id": "ir:attrdef_9309",
                "LocalName": "date-time picker(date-time picker)",
                "LocalNameSpace": "",
                "DisplayName": "date-time picker",
                "QueryName": "ir:attrdef_9309",
                "Description": "date-time picker",
                "PropertyType": 3,
                "Cardinality": 0,
                "Updatability": 1,
                "Inherited": false,
                "Required": false,
                "Queryable": true,
                "Orderable": true,
                "OpenChoice": false
            },
            {
                "DefaultValue": null,
                "Choices": null,
                "Id": "ir:attrdef_9310",
                "LocalName": "date-time picker(none)",
                "LocalNameSpace": "",
                "DisplayName": "date-time picker(none)",
                "QueryName": "ir:attrdef_9310",
                "Description": "date-time picker(none)",
                "PropertyType": 3,
                "Cardinality": 0,
                "Updatability": 1,
                "Inherited": false,
                "Required": false,
                "Queryable": true,
                "Orderable": true,
                "OpenChoice": false
            },
            {
                "DefaultValue": null,
                "Precision": 0,
                "MinimumValue": 50,
                "MaximumValue": 200,
                "Choices": null,
                "Id": "ir:attrdef_9311",
                "LocalName": "float with min(50)-max(200)",
                "LocalNameSpace": "",
                "DisplayName": "float with min(50)-max(200)",
                "QueryName": "ir:attrdef_9311",
                "Description": "float with min(50)-max(200)",
                "PropertyType": 4,
                "Cardinality": 0,
                "Updatability": 1,
                "Inherited": false,
                "Required": false,
                "Queryable": true,
                "Orderable": true,
                "OpenChoice": false
            },
            {
                "DefaultValue": null,
                "MinimumValue": 10,
                "MaximumValue": 20,
                "Choices": null,
                "Id": "ir:attrdef_9312",
                "LocalName": "int with min(10) and max(20)",
                "LocalNameSpace": "",
                "DisplayName": "int with min(10) and max(20)",
                "QueryName": "ir:attrdef_9312",
                "Description": "int with min(10) and max(20)",
                "PropertyType": 2,
                "Cardinality": 0,
                "Updatability": 1,
                "Inherited": false,
                "Required": false,
                "Queryable": true,
                "Orderable": true,
                "OpenChoice": false
            },
            {
                "DefaultValue": null,
                "MinimumValue": 0,
                "MaximumValue": 2147483647,
                "Choices": null,
                "Id": "ir:attrdef_467",
                "LocalName": "Mandatory Attributes",
                "LocalNameSpace": "",
                "DisplayName": "Mandatory Attributes",
                "QueryName": "ir:attrdef_467",
                "Description": "Mandatory Attributes",
                "PropertyType": 2,
                "Cardinality": 0,
                "Updatability": 1,
                "Inherited": false,
                "Required": true,
                "Queryable": true,
                "Orderable": true,
                "OpenChoice": false
            }
        ]
    },
    jsonTemplate: [
        {
            noEncryptedAttributes: function() {
                return "{" +
                    '"drawers":[' +
                    "       {{#repeat drawers}}" +
                    "       {" +
                    '       "fileTypes":' +
                    "           [" +
                    "               {{#repeat 1 5}}" +
                    '               "{{number 5}}"' +
                    "                   {{/repeat}}" +
                    "           ]," +
                    '       "id":"{{this.id}}",' +
                    '       "name":"{{this.name}}"' +
                    "       }{{/repeat}}" +
                    "   ]," +
                    '"fileMarks":[' +
                    "   {{#repeat 8}}" +
                    "   {" +
                    '   "Id":{{index}},' +
                    '   "Name":"{{company}}",' +
                    '   "Color":{' +
                    '           "R":{{number 255}},' +
                    '           "G":{{number 255}},' +
                    '           "B":{{number 255}},' +
                    '           "A":{{number 255}},' +
                    '           "IsKnownColor":{{boolean}},' +
                    '           "IsEmpty":{{boolean}},' +
                    '           "IsSystemColor":{{boolean}},' +
                    '           "Name":"ff000000"' +
                    "           }," +
                    '   "ColorToHex": "#000000",' +
                    '   "HasIcon":{{boolean}},' +
                    '   "Icon":null,' +
                    '   "IconContentType": "image/png",' +
                    '   "IconToBase64": "iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAIAAABLixI0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAABBdEVYdENvbW1lbnQAQ1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAKsEVYkwAAA6RJREFUSEuFlM9vG0UUx/s/QUH8BZwqDhwQF4S4VZxyQdBKFQIhcUJIoSGtN4bGDlXjxElTJ6QlTUuahDghtlvbiW3a2KmdTe3Ebtc/dmd3dvf1OzOuE4Fxvhqvn3bmffa9N2/mHLku+S4nn5HPiTxf/jzX9/COE7dqpb2mrjuNBtkeOS5m+0rX9XNwA8sTfoKFIadcIF1u7WaSoeD19eWlvZ1Mq14n+aW+kiy4YYgVIiCHMHyHEKnrE5+9Hfnm28u/jAdyhWw6l7Fcpjz/K8FCCCIKxAEmvImQrEUuI8bJnl+IDg1d/DWkJdJ/F/YLnDxk0FeC5eH7b1gkFoq4GLk2cYdYOhX/+quhSDi4sfawWHnmkCPX91GXJT8lQG+iQ+EEy3Sb5UL6xyuXFoLB/Npq69WRyTsyjz5SOfpgMVl18bNRMFTOYWQz3mT684/Ov/3ZW+99+cGHxdS2LOZAFnbQEqski/lkC5Yj/kwyW8MXP//98ne5UITaLVHGASwQkFk3LlgiLvQF5+Rwv0VW+/tPPgXrsRampiFYohYnUiAYg3I0yfKJ2Yflj99954v3L4QuXenoZZWjJ6VAPfuM2jO/jdpHtdHDZLJdKjpW03JN1azwlz4n6rL69oRFdttuPliaj01PZLb/MhrVF3UdPYGY4fkvEKTqhTlPPSBVMUY4jfzYqN2aHJ+enliPr9SbR5WjysuOoRhgnRbCPMWSS/BAxeTwOo65svogoI2g9fNPs/qLcqV6UG3UVHWUQOkZkvU/Z5sxc3Ymol37aTZys/Ak1dArlmGU9orcdk4jlAGdsABCmQDq3jm+W6sehG9oN7TRu7ejidWVSiHPXr7Sn5fNdoejYSTIdcWeKqJkybONuMStBYgYgnVQKWmBkcDo8MzUxPIfsXRq67Bc2i/tVatV5ayIEIh4CpY8XxiK0mXhTan4z5j288jID6FQYHFxdmPjYT6XKeSztVq3ZArRMwaxKuViOBQMBIbHx6/fvz8P1u7OE7COj4+VMxZJFK4hgR7E0g/2wRobuxoOa8vLC4q1k31sGIZy7rGUMYjVqFcnb4WRYCQSAmtr6xFyzKSTjImrVSF6OoPFrNbdxTsAzc1NgrW9vZbbTSNHOdtl9TYRz0Esh5vxzVU0fTT62717c5ubK8nEJjYXnqcRPWMQC5v+9NluLDY1M3MTcSUS62CZHQOeqL1C9AT6GSzTMgCamgovLcXi8T+zmZToaCm5piv1Rtf1114GyzviVC38AAAAAElFTkSuQmCC"' +
                    "   }" +
                    "   {{/repeat}}" +
                    "   ]," +
                    '"fileTypes":[' +
                    "   {{#repeat 5 8}}" +
                    "   {" +
                    '       "attributes":[' +
                    "           {{#repeat attributes}}" +
                    "           {" +
                    "           {{#if this.Choices}}" +
                    '           "Choices": [' +
                    "           {{#repeat this.Choices}}" +
                    '           {"DisplayName": "{{this.DisplayName}}", "Value": "{{this.Value}}"}' +
                    "           {{/repeat}}" +
                    "           ]," +
                    "           {{else}}" +
                    '           "Choices": [],' +
                    "           {{/if}}" +
                    "           {{#if this.MinimumValue}}" +
                    '           "MinimumValue":"{{this.MinimumValue}}",' +
                    "           {{/if}}" +
                    "           {{#if this.MaximumValue}}" +
                    '           "MaximumValue":"{{this.MaximumValue}}",' +
                    "           {{/if}}" +
                    "           {{#if this.MaxLength}}" +
                    '           "MaxLength":{{this.MaxLength}},' +
                    "           {{/if}}" +
                    '           "Id":"{{this.Id}}",' +
                    '           "DisplayName":"{{this.DisplayName}}",' +
                    '           "PropertyType":{{this.PropertyType}}' +
                    "           }" +
                    "           {{/repeat}}" +
                    "       ]," +
                    '       "id": "{{uniqueIndex}}",' +
                    '       "name": "{{company}}",' +
                    '       "fileMarks": [{{#repeat 1 8}}' +
                    '       "{{index}}"' +
                    "           {{/repeat}}" +
                    "       ]" +
                    "   }" +
                    "   {{/repeat}}" +
                    "   ]" +
                    "}";
            }
        },
        {
            encryptedAttributes: function() {
                return "{" +
                    '"drawers":[' +
                    "       {{#repeat drawers}}" +
                    "       {" +
                    '       "fileTypes":' +
                    "           [" +
                    "               {{#repeat 1 5}}" +
                    '               "{{number 5}}"' +
                    "                   {{/repeat}}" +
                    "           ]," +
                    '       "id":"{{this.id}}",' +
                    '       "name":"{{this.name}}"' +
                    "       }{{/repeat}}" +
                    "   ]," +
                    '"fileMarks":[' +
                    "   {{#repeat 8}}" +
                    "   {" +
                    '   "Id":{{index}},' +
                    '   "Name":"{{company}}",' +
                    '   "Color":{' +
                    '           "R":{{number 255}},' +
                    '           "G":{{number 255}},' +
                    '           "B":{{number 255}},' +
                    '           "A":{{number 255}},' +
                    '           "IsKnownColor":{{boolean}},' +
                    '           "IsEmpty":{{boolean}},' +
                    '           "IsSystemColor":{{boolean}},' +
                    '           "Name":"ff000000"' +
                    "           }," +
                    '   "ColorToHex": "#000000",' +
                    '   "HasIcon":{{boolean}},' +
                    '   "Icon":null,' +
                    '   "IconContentType": "image/png",' +
                    '   "IconToBase64": "iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAIAAABLixI0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAABBdEVYdENvbW1lbnQAQ1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAKsEVYkwAAA6RJREFUSEuFlM9vG0UUx/s/QUH8BZwqDhwQF4S4VZxyQdBKFQIhcUJIoSGtN4bGDlXjxElTJ6QlTUuahDghtlvbiW3a2KmdTe3Ebtc/dmd3dvf1OzOuE4Fxvhqvn3bmffa9N2/mHLku+S4nn5HPiTxf/jzX9/COE7dqpb2mrjuNBtkeOS5m+0rX9XNwA8sTfoKFIadcIF1u7WaSoeD19eWlvZ1Mq14n+aW+kiy4YYgVIiCHMHyHEKnrE5+9Hfnm28u/jAdyhWw6l7Fcpjz/K8FCCCIKxAEmvImQrEUuI8bJnl+IDg1d/DWkJdJ/F/YLnDxk0FeC5eH7b1gkFoq4GLk2cYdYOhX/+quhSDi4sfawWHnmkCPX91GXJT8lQG+iQ+EEy3Sb5UL6xyuXFoLB/Npq69WRyTsyjz5SOfpgMVl18bNRMFTOYWQz3mT684/Ov/3ZW+99+cGHxdS2LOZAFnbQEqski/lkC5Yj/kwyW8MXP//98ne5UITaLVHGASwQkFk3LlgiLvQF5+Rwv0VW+/tPPgXrsRampiFYohYnUiAYg3I0yfKJ2Yflj99954v3L4QuXenoZZWjJ6VAPfuM2jO/jdpHtdHDZLJdKjpW03JN1azwlz4n6rL69oRFdttuPliaj01PZLb/MhrVF3UdPYGY4fkvEKTqhTlPPSBVMUY4jfzYqN2aHJ+enliPr9SbR5WjysuOoRhgnRbCPMWSS/BAxeTwOo65svogoI2g9fNPs/qLcqV6UG3UVHWUQOkZkvU/Z5sxc3Ymol37aTZys/Ak1dArlmGU9orcdk4jlAGdsABCmQDq3jm+W6sehG9oN7TRu7ejidWVSiHPXr7Sn5fNdoejYSTIdcWeKqJkybONuMStBYgYgnVQKWmBkcDo8MzUxPIfsXRq67Bc2i/tVatV5ayIEIh4CpY8XxiK0mXhTan4z5j288jID6FQYHFxdmPjYT6XKeSztVq3ZArRMwaxKuViOBQMBIbHx6/fvz8P1u7OE7COj4+VMxZJFK4hgR7E0g/2wRobuxoOa8vLC4q1k31sGIZy7rGUMYjVqFcnb4WRYCQSAmtr6xFyzKSTjImrVSF6OoPFrNbdxTsAzc1NgrW9vZbbTSNHOdtl9TYRz0Esh5vxzVU0fTT62717c5ubK8nEJjYXnqcRPWMQC5v+9NluLDY1M3MTcSUS62CZHQOeqL1C9AT6GSzTMgCamgovLcXi8T+zmZToaCm5piv1Rtf1114GyzviVC38AAAAAElFTkSuQmCC"' +
                    "   }" +
                    "   {{/repeat}}" +
                    "   ]," +
                    '"fileTypes":[' +
                    "   {{#repeat 5 8}}" +
                    "   {" +
                    '   "attributes":[' +
                    '           {' +
                    '           "PropertyType": "2",' +
                    '           "DisplayName": "Attr Int no min max: Encrypted",' +
                    '           "Id": "ir:attrdef_1",' +
                    '           "MaximumValue": "2147483647",' +
                    '           "MinimumValue": "-2147483648",' +
                    '           "IsEncrypted": true' +
                    "           }," +
                    "           {" +
                    '           "PropertyType": "2",' +
                    '           "DisplayName": "Attr Int no min max: Unencrypted",' +
                    '           "Id": "ir:attrdef_2",' +
                    '           "MaximumValue": "2147483647",' +
                    '           "MinimumValue": "-2147483648",' +
                    '           "IsEncrypted": false' +
                    "           }" +
                    "       ]," +
                    '       "id": "{{uniqueIndex}}",' +
                    '       "name": "{{company}}",' +
                    '       "fileMarks": [{{#repeat 1 8}}' +
                    '       "{{index}}"' +
                    "           {{/repeat}}" +
                    "       ]" +
                    "   }" +
                    "   {{/repeat}}" +
                    "   ]" +
                    "}";
            }
        }
    ]
};
mocks.push(GetAdvancedSearchCriteria);

/**
 * @api {get} /Search/GetDocumentsByAttributes Get Documents By Attributes
 * @apiName GetAdvancedSearchCriteria
 * @apiGroup Search
 * @apiParam {String} attributes
 */

exports.mocks = mocks;