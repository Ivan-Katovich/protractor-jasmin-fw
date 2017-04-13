/*
 You can look at the scenario's needed in the other file.
 Example: If you want a different fileTree and don't know the exact scenario, Open the FileTree.js and find the scenario you want to change the scenario in THIS file

 ---------------------------------
 NOTE
 If some metadata does not show up in the MOCKS ONLY, then it could be some camelCase error
 Not every scenario has been updated to use camelCase
 ---------------------------------
 */

var fileTree = require('./FileTree.js');
var metadataInfoPane = require('./MetadataInfoPane.js');
var content = require('./Content.js');
var notes = require('./Notes.js');

var utils = require('../utils.js');

var relatedFilesScenarios = [
    [
        {
            "id":2730816,
            "fileTypeId":2730287,
            "fileTypeName":"Test Type",
            "fileTypeDescription":"Test Type",
            "drawerId":2730294,
            "drawerName":"Test Drawer",
            "drawerDescription":"Test Drawer",
            "notesId":0,
            "description":"Scotts Test File",
            "fileNumberPart1":"Scotts Test File",
            "fileNumberPart2":"",
            "fileNumberPart3":"",
            "isTemporary":false,
            "isDeleted":false,
            "dateLastOpened":"2015-08-06T15:46:41.703",
            "lastModified":"2015-07-14T19:40:20.867",
            "dateCreated":"2015-03-05T20:23:28.423",
            "attributes":[]
        },
        {
            "id":2731193,
            "fileTypeId":2730287,
            "fileTypeName":"Test Type",
            "fileTypeDescription":"Test Type",
            "drawerId":2730294,
            "drawerName":"Test Drawer",
            "drawerDescription":"Test Drawer",
            "notesId":0,
            "description":"1",
            "fileNumberPart1":"1",
            "fileNumberPart2":"",
            "fileNumberPart3":"",
            "isTemporary":false,
            "isDeleted":false,
            "dateLastOpened":"2015-07-22T18:09:49.04",
            "lastModified":"2015-03-18T15:54:17.273",
            "dateCreated":"2015-03-18T15:54:17.273",
            "attributes":[]
        },
        {
            "id":2731429,
            "fileTypeId":2730287,
            "fileTypeName":"Test Type",
            "fileTypeDescription":"Test Type",
            "drawerId":2730294,
            "drawerName":"Test Drawer",
            "drawerDescription":"Test Drawer",
            "notesId":0,
            "description":"Scotts Testes",
            "fileNumberPart1":"Scotts Testes",
            "fileNumberPart2":"",
            "fileNumberPart3":"",
            "isTemporary":false,
            "isDeleted":false,
            "dateLastOpened":"2015-05-07T18:32:59.7",
            "lastModified":"2015-05-07T18:37:39",
            "dateCreated":"2015-03-20T20:43:40.143",
            "attributes":[]
        },
        {
            "id":2733350,
            "fileTypeId":2730287,
            "fileTypeName":"Test Type",
            "fileTypeDescription":"Test Type",
            "drawerId":2730294,
            "drawerName":"Test Drawer",
            "drawerDescription":"Test Drawer",
            "notesId":0,
            "description":"Scott's Note Test",
            "fileNumberPart1":"Scott's Note Test",
            "fileNumberPart2":"",
            "fileNumberPart3":"",
            "isTemporary":false,
            "isDeleted":false,
            "dateLastOpened":"2015-07-28T13:28:44.81",
            "lastModified":"2015-07-29T19:01:00.47",
            "dateCreated":"2015-04-06T17:10:18.097",
            "attributes":[]
        }
    ]
];



var mocks = [];

var FileOpen = {
    name: 'FileOpen',
    mockRoute: '/File/Open',
    testScope: 'success',
    testScenario: 'multipleWebdavPage',
    jsonTemplate: [
        {
            scottNoteTest: function(){
                var file = {
                    "isErrored":false,
                    "isFrozen":false,
                    "effectivePermissions":-1,
                    "error":null,
                    "fileTree":[
                        {
                            "data":"Accounting",
                            "description":null,
                            "attr":{
                                "id":"2733354",
                                "typeId":"2726717",
                                "rel":"folder"
                            },
                            "state":null,
                            "children":[
                                {
                                    "data":"Agent 6/26",
                                    "description":null,
                                    "attr":{
                                        "id":"2936587",
                                        "typeId":"595623",
                                        "rel":"folder"
                                    },
                                    "state":null,
                                    "children":[
                                        {
                                            "data":"8/14/2015 A&S",
                                            "description":"A&S",
                                            "attr":{
                                                "id":"2937860",
                                                "typeId":"624706",
                                                "rel":"document"
                                            },
                                            "state":null,
                                            "children":[

                                            ],
                                            "notes":null,
                                            "effectivePermissions":-1
                                        }
                                    ],
                                    "notes":null,
                                    "effectivePermissions":-1
                                },
                                {
                                    "data":"Agent iPad",
                                    "description":null,
                                    "attr":{
                                        "id":"2938048",
                                        "typeId":"595623",
                                        "rel":"folder"
                                    },
                                    "state":null,
                                    "children":[

                                    ],
                                    "notes":null,
                                    "effectivePermissions":-1
                                },
                                {
                                    "data":"4/6/2015 rename1",
                                    "description":"rename1",
                                    "attr":{
                                        "id":"2733355",
                                        "typeId":"624672",
                                        "rel":"document"
                                    },
                                    "state":null,
                                    "children":[

                                    ],
                                    "notes":null,
                                    "effectivePermissions":-1
                                },
                                {
                                    "data":"6/26/2015 401k 6/26 test",
                                    "description":"401k 6/26 test",
                                    "attr":{
                                        "id":"2936589",
                                        "typeId":"624672",
                                        "rel":"document"
                                    },
                                    "state":null,
                                    "children":[

                                    ],
                                    "notes":null,
                                    "effectivePermissions":-1
                                },
                                {
                                    "data":"6/26/2015 aaaa",
                                    "description":"aaaa",
                                    "attr":{
                                        "id":"2936664",
                                        "typeId":"624672",
                                        "rel":"document"
                                    },
                                    "state":null,
                                    "children":[

                                    ],
                                    "notes":null,
                                    "effectivePermissions":-1
                                },
                                {
                                    "data":"6/26/2015 401k",
                                    "description":"401k",
                                    "attr":{
                                        "id":"2936667",
                                        "typeId":"624672",
                                        "rel":"document"
                                    },
                                    "state":null,
                                    "children":[

                                    ],
                                    "notes":null,
                                    "effectivePermissions":-1
                                },
                                {
                                    "data":"6/26/2015 rename",
                                    "description":"rename",
                                    "attr":{
                                        "id":"2936670",
                                        "typeId":"624672",
                                        "rel":"document"
                                    },
                                    "state":null,
                                    "children":[

                                    ],
                                    "notes":null,
                                    "effectivePermissions":-1
                                },
                                {
                                    "data":"3/24/2016 401k",
                                    "description":"401k",
                                    "attr":{
                                        "id":"2956622",
                                        "typeId":"624672",
                                        "rel":"document"
                                    },
                                    "state":null,
                                    "children":[

                                    ],
                                    "notes":null,
                                    "effectivePermissions":-1
                                },
                                {
                                    "data":"3/24/2016 401k",
                                    "description":"401k",
                                    "attr":{
                                        "id":"2956623",
                                        "typeId":"624672",
                                        "rel":"document"
                                    },
                                    "state":null,
                                    "children":[

                                    ],
                                    "notes":null,
                                    "effectivePermissions":-1
                                },
                                {
                                    "data":"3/24/2016 401k",
                                    "description":"401k",
                                    "attr":{
                                        "id":"2956624",
                                        "typeId":"624672",
                                        "rel":"document"
                                    },
                                    "state":null,
                                    "children":[

                                    ],
                                    "notes":null,
                                    "effectivePermissions":-1
                                }
                            ],
                            "notes":[
                                {
                                    "id":314,
                                    "version":7,
                                    "category":0,
                                    "isDeleted":false,
                                    "notes":[
                                        {
                                            "noteId":166772,
                                            "isDefault":true,
                                            "status":0,
                                            "items":[
                                                {
                                                    "itemId":315,
                                                    "replaced":null,
                                                    "timeStamp":"2015-04-06T17:12:13.1129209Z",
                                                    "text":"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.504\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">This is a folder Note</span></p></body>\r\n</html>",
                                                    "drawer":"Test Drawer",
                                                    "fileNumber":"Scott's Note Test",
                                                    "isHidden":false,
                                                    "userName":"Blazina,Kevin (kblazina)"
                                                },
                                                {
                                                    "itemId":524,
                                                    "replaced":null,
                                                    "timeStamp":"2015-05-07T20:27:54.5447358Z",
                                                    "text":"<p>this is my new test</p>\n",
                                                    "drawer":"Test Drawer",
                                                    "fileNumber":"Scott's Note Test",
                                                    "isHidden":false,
                                                    "userName":"QA2 (qa2)"
                                                },
                                                {
                                                    "itemId":200602,
                                                    "replaced":null,
                                                    "timeStamp":"2015-08-24T16:24:33.4167294Z",
                                                    "text":"<p>Test iPad&nbsp;</p>\n",
                                                    "drawer":"Test Drawer",
                                                    "fileNumber":"Scott's Note Test",
                                                    "isHidden":false,
                                                    "userName":"Blazina,Kevin (kblazina)"
                                                },
                                                {
                                                    "itemId":201053,
                                                    "replaced":null,
                                                    "timeStamp":"2016-03-25T16:08:13.4908814Z",
                                                    "text":"<p>aa</p>\n",
                                                    "drawer":"Test Drawer",
                                                    "fileNumber":"Scott's Note Test",
                                                    "isHidden":false,
                                                    "userName":"Blazina,Kevin (kblazina)"
                                                }
                                            ]
                                        },
                                        {
                                            "noteId":166778,
                                            "isDefault":false,
                                            "status":0,
                                            "items":[
                                                {
                                                    "itemId":313,
                                                    "replaced":null,
                                                    "timeStamp":"2015-04-06T17:11:35.1049358Z",
                                                    "text":"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.504\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">This is a folder note that I am merging</span></p></body>\r\n</html>",
                                                    "drawer":"Test Drawer",
                                                    "fileNumber":"Kevin Note test",
                                                    "isHidden":false,
                                                    "userName":"Blazina,Kevin (kblazina)"
                                                }
                                            ]
                                        },
                                        {
                                            "noteId":166785,
                                            "isDefault":false,
                                            "status":0,
                                            "items":[
                                                {
                                                    "itemId":322,
                                                    "replaced":null,
                                                    "timeStamp":"2015-04-06T17:26:03.5801471Z",
                                                    "text":"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.504\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">Historical folder note 3</span></p></body>\r\n</html>",
                                                    "drawer":"Test Drawer",
                                                    "fileNumber":"Kevins note 2 test",
                                                    "isHidden":false,
                                                    "userName":"Blazina,Kevin (kblazina)"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            "effectivePermissions":-1
                        },
                        {
                            "data":"Accounting",
                            "description":null,
                            "attr":{
                                "id":"2938049",
                                "typeId":"2726717",
                                "rel":"folder"
                            },
                            "state":null,
                            "children":[
                                {
                                    "data":"8/25/2015 5500 Form/Schedule A",
                                    "description":"5500 Form/Schedule A",
                                    "attr":{
                                        "id":"2938051",
                                        "typeId":"2727011",
                                        "rel":"document"
                                    },
                                    "state":null,
                                    "children":[

                                    ],
                                    "notes":null,
                                    "effectivePermissions":-1
                                }
                            ],
                            "notes":[
                                {
                                    "id":200612,
                                    "version":3,
                                    "category":0,
                                    "isDeleted":false,
                                    "notes":[
                                        {
                                            "noteId":406986,
                                            "isDefault":true,
                                            "status":0,
                                            "items":[
                                                {
                                                    "itemId":200613,
                                                    "replaced":null,
                                                    "timeStamp":"2015-08-25T15:38:24.9746392Z",
                                                    "text":"This is a new folder added with iPad",
                                                    "drawer":"Test Drawer",
                                                    "fileNumber":"Scott's Note Test",
                                                    "isHidden":false,
                                                    "userName":"Blazina,Kevin (kblazina)"
                                                },
                                                {
                                                    "itemId":201030,
                                                    "replaced":null,
                                                    "timeStamp":"2016-03-24T15:41:40.2860395Z",
                                                    "text":"<p>Testing...</p>\n",
                                                    "drawer":"Test Drawer",
                                                    "fileNumber":"Scott's Note Test",
                                                    "isHidden":false,
                                                    "userName":"Davis,Scott (davissc)"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            "effectivePermissions":-1
                        }
                    ],
                    "relatedFiles":[
                        {
                            "id":2730816,
                            "fileTypeId":2730287,
                            "fileTypeName":"Test Type",
                            "fileTypeDescription":"Test Type",
                            "drawerId":2730294,
                            "drawerName":"Test Drawer",
                            "drawerDescription":"Test Drawer",
                            "hasNotes":null,
                            "notesId":0,
                            "description":"Scotts Test File",
                            "fileNumberPart1":"Scotts Test File",
                            "fileNumberPart2":"",
                            "fileNumberPart3":"",
                            "isTemporary":false,
                            "isDeleted":false,
                            "dateLastOpened":"2015-10-19T16:46:25.35",
                            "lastModified":"2015-11-18T14:54:12.703",
                            "dateCreated":"2015-03-05T20:23:28.423",
                            "attributes":[

                            ],
                            "effectivePermissions":-1,
                            "isFrozen":false
                        },
                        {
                            "id":2731429,
                            "fileTypeId":2730287,
                            "fileTypeName":"Test Type",
                            "fileTypeDescription":"Test Type",
                            "drawerId":2730294,
                            "drawerName":"Test Drawer",
                            "drawerDescription":"Test Drawer",
                            "hasNotes":null,
                            "notesId":0,
                            "description":"Scotts Testes",
                            "fileNumberPart1":"Scotts Testes",
                            "fileNumberPart2":"",
                            "fileNumberPart3":"",
                            "isTemporary":false,
                            "isDeleted":false,
                            "dateLastOpened":"2015-05-07T18:32:59.7",
                            "lastModified":"2016-06-03T16:50:16.577",
                            "dateCreated":"2015-03-20T20:43:40.143",
                            "attributes":[

                            ],
                            "effectivePermissions":-1,
                            "isFrozen":false
                        },
                        {
                            "id":2936729,
                            "fileTypeId":2730287,
                            "fileTypeName":"Test Type",
                            "fileTypeDescription":"Test Type",
                            "drawerId":2730294,
                            "drawerName":"Test Drawer",
                            "drawerDescription":"Test Drawer",
                            "hasNotes":null,
                            "notesId":0,
                            "description":"Related Files Test",
                            "fileNumberPart1":"Related Files Test",
                            "fileNumberPart2":"",
                            "fileNumberPart3":"",
                            "isTemporary":false,
                            "isDeleted":false,
                            "dateLastOpened":"2015-08-06T15:47:41.513",
                            "lastModified":"2016-06-08T19:24:44.04",
                            "dateCreated":"2015-06-29T17:54:20.143",
                            "attributes":[

                            ],
                            "effectivePermissions":-1,
                            "isFrozen":false
                        }
                    ],
                    "fileTypeTemplate":{
                        "id":2730287,
                        "notesAllowed":true,
                        "calculateNotesAllowed":true,
                        "effectivePermissions":2147483647,
                        "folderTypeDataResults":[
                            {
                                "isRepeatable":true,
                                "notesAllowed":true,
                                "calculateNotesAllowed":true,
                                "folderTypeDataResults":[
                                    {
                                        "isRepeatable":true,
                                        "notesAllowed":false,
                                        "calculateNotesAllowed":false,
                                        "folderTypeDataResults":[

                                        ],
                                        "documentTypeDataResults":[
                                            {
                                                "classId":-1,
                                                "id":624706,
                                                "name":"A&S",
                                                "description":"A&S",
                                                "overlayId":2936561,
                                                "automationId":"AS",
                                                "dateLastModified":"2016-05-13T14:23:39.77",
                                                "effectivePermissions":2147483647
                                            },
                                            {
                                                "classId":-1,
                                                "id":624317,
                                                "name":"Accounting_Name",
                                                "description":"Accounting_Desc",
                                                "overlayId":2951743,
                                                "automationId":"Accounting",
                                                "dateLastModified":"2016-05-13T14:23:39.783",
                                                "effectivePermissions":2147483647
                                            },
                                            {
                                                "classId":-1,
                                                "id":624315,
                                                "name":"Acknowledgement",
                                                "description":"Acknowledgement",
                                                "overlayId":-1,
                                                "automationId":"Acknowledgement",
                                                "dateLastModified":"2016-05-13T14:23:39.797",
                                                "effectivePermissions":2147483647
                                            }
                                        ],
                                        "classId":-2,
                                        "id":595623,
                                        "name":"Agent",
                                        "description":"Agent",
                                        "overlayId":-1,
                                        "automationId":"Agent",
                                        "dateLastModified":"2016-05-13T14:23:38.763",
                                        "effectivePermissions":2147483647
                                    }
                                ],
                                "documentTypeDataResults":[
                                    {
                                        "classId":-1,
                                        "id":624672,
                                        "name":"401k",
                                        "description":"401k",
                                        "overlayId":2940591,
                                        "automationId":"401k",
                                        "dateLastModified":"2016-06-08T17:58:06.54",
                                        "effectivePermissions":2147483647
                                    },
                                    {
                                        "classId":-1,
                                        "id":2727011,
                                        "name":"5500 Form/Schedule A",
                                        "description":"5500 Form/Schedule A",
                                        "overlayId":-1,
                                        "automationId":"5500Form/ScheduleA",
                                        "dateLastModified":"2016-05-13T14:23:39.757",
                                        "effectivePermissions":2147483647
                                    },
                                    {
                                        "classId":-1,
                                        "id":624706,
                                        "name":"A&S",
                                        "description":"A&S",
                                        "overlayId":2936561,
                                        "automationId":"AS",
                                        "dateLastModified":"2016-05-13T14:23:39.77",
                                        "effectivePermissions":2147483647
                                    },
                                    {
                                        "classId":-1,
                                        "id":624317,
                                        "name":"Accounting_Name",
                                        "description":"Accounting_Desc",
                                        "overlayId":2951743,
                                        "automationId":"Accounting",
                                        "dateLastModified":"2016-05-13T14:23:39.783",
                                        "effectivePermissions":2147483647
                                    }
                                ],
                                "classId":-2,
                                "id":2726717,
                                "name":"Accounting",
                                "description":"Accounting",
                                "overlayId":-1,
                                "automationId":"Accounting",
                                "dateLastModified":"2016-05-13T14:23:38.73",
                                "effectivePermissions":2147483647
                            },
                            {
                                "isRepeatable":true,
                                "notesAllowed":true,
                                "calculateNotesAllowed":true,
                                "folderTypeDataResults":[
                                    {
                                        "isRepeatable":false,
                                        "notesAllowed":false,
                                        "calculateNotesAllowed":false,
                                        "folderTypeDataResults":[

                                        ],
                                        "documentTypeDataResults":[
                                            {
                                                "classId":-1,
                                                "id":624706,
                                                "name":"A&S",
                                                "description":"A&S",
                                                "overlayId":2936561,
                                                "automationId":"AS",
                                                "dateLastModified":"2016-05-13T14:23:39.77",
                                                "effectivePermissions":2147483647
                                            },
                                            {
                                                "classId":-1,
                                                "id":624317,
                                                "name":"Accounting_Name",
                                                "description":"Accounting_Desc",
                                                "overlayId":2951743,
                                                "automationId":"Accounting",
                                                "dateLastModified":"2016-05-13T14:23:39.783",
                                                "effectivePermissions":2147483647
                                            },
                                            {
                                                "classId":-1,
                                                "id":624315,
                                                "name":"Acknowledgement",
                                                "description":"Acknowledgement",
                                                "overlayId":-1,
                                                "automationId":"Acknowledgement",
                                                "dateLastModified":"2016-05-13T14:23:39.797",
                                                "effectivePermissions":2147483647
                                            }
                                        ],
                                        "classId":-2,
                                        "id":595623,
                                        "name":"Agent",
                                        "description":"Agent",
                                        "overlayId":-1,
                                        "automationId":"Agent",
                                        "dateLastModified":"2016-05-13T14:23:38.763",
                                        "effectivePermissions":2147483647
                                    }
                                ],
                                "documentTypeDataResults":[
                                    {
                                        "classId":-1,
                                        "id":595629,
                                        "name":"1035 Exchange",
                                        "description":"1035 Exchange",
                                        "overlayId":-1,
                                        "automationId":"1035Exchange",
                                        "dateLastModified":"2016-05-13T14:23:39.73",
                                        "effectivePermissions":2147483647
                                    },
                                    {
                                        "classId":-1,
                                        "id":624672,
                                        "name":"401k",
                                        "description":"401k",
                                        "overlayId":2940591,
                                        "automationId":"401k",
                                        "dateLastModified":"2016-06-08T17:58:06.54",
                                        "effectivePermissions":2147483647
                                    }
                                ],
                                "classId":-2,
                                "id":2726718,
                                "name":"Billing/Accounting",
                                "description":"Billing/Accounting",
                                "overlayId":-1,
                                "automationId":"Billing/Accounting",
                                "dateLastModified":"2016-05-13T14:23:38.813",
                                "effectivePermissions":2147483647
                            },
                            {
                                "isRepeatable":false,
                                "notesAllowed":true,
                                "calculateNotesAllowed":true,
                                "folderTypeDataResults":[

                                ],
                                "documentTypeDataResults":[
                                    {
                                        "classId":-1,
                                        "id":624317,
                                        "name":"Accounting_Name",
                                        "description":"Accounting_Desc",
                                        "overlayId":2951743,
                                        "automationId":"Accounting",
                                        "dateLastModified":"2016-05-13T14:23:39.783",
                                        "effectivePermissions":2147483647
                                    },
                                    {
                                        "classId":-1,
                                        "id":595641,
                                        "name":"Advance Rates",
                                        "description":"Advance Rates",
                                        "overlayId":-1,
                                        "automationId":"AdvanceRates",
                                        "dateLastModified":"2016-05-13T14:23:39.807",
                                        "effectivePermissions":2147483647
                                    }
                                ],
                                "classId":-2,
                                "id":2727018,
                                "name":"Carrier",
                                "description":"Carrier",
                                "overlayId":-1,
                                "automationId":"Carrier",
                                "dateLastModified":"2016-05-13T14:23:38.843",
                                "effectivePermissions":2147483647
                            },
                            {
                                "isRepeatable":false,
                                "notesAllowed":true,
                                "calculateNotesAllowed":true,
                                "folderTypeDataResults":[

                                ],
                                "documentTypeDataResults":[
                                    {
                                        "classId":-1,
                                        "id":624317,
                                        "name":"Accounting_Name",
                                        "description":"Accounting_Desc",
                                        "overlayId":2951743,
                                        "automationId":"Accounting",
                                        "dateLastModified":"2016-05-13T14:23:39.783",
                                        "effectivePermissions":2147483647
                                    },
                                    {
                                        "classId":-1,
                                        "id":624695,
                                        "name":"Firm Order Noted",
                                        "description":"Firm Order Noted",
                                        "overlayId":-1,
                                        "automationId":"FirmOrderNoted",
                                        "dateLastModified":"2016-05-13T14:23:40.743",
                                        "effectivePermissions":2147483647
                                    },
                                    {
                                        "classId":-1,
                                        "id":2726706,
                                        "name":"Form",
                                        "description":"Form",
                                        "overlayId":-1,
                                        "automationId":"Form",
                                        "dateLastModified":"2016-05-13T14:23:40.757",
                                        "effectivePermissions":2147483647
                                    }
                                ],
                                "classId":-2,
                                "id":624723,
                                "name":"Demand Package",
                                "description":"Demand Package",
                                "overlayId":-1,
                                "automationId":"DEMANDPKG",
                                "dateLastModified":"2016-05-13T14:23:38.98",
                                "effectivePermissions":2147483647
                            },
                            {
                                "isRepeatable":false,
                                "notesAllowed":true,
                                "calculateNotesAllowed":true,
                                "folderTypeDataResults":[

                                ],
                                "documentTypeDataResults":[
                                    {
                                        "classId":-1,
                                        "id":624695,
                                        "name":"Firm Order Noted",
                                        "description":"Firm Order Noted",
                                        "overlayId":-1,
                                        "automationId":"FirmOrderNoted",
                                        "dateLastModified":"2016-05-13T14:23:40.743",
                                        "effectivePermissions":2147483647
                                    },
                                    {
                                        "classId":-1,
                                        "id":624682,
                                        "name":"GIA",
                                        "description":"GIA",
                                        "overlayId":-1,
                                        "automationId":"GIA",
                                        "dateLastModified":"2016-05-13T14:23:40.79",
                                        "effectivePermissions":2147483647
                                    }
                                ],
                                "classId":-2,
                                "id":624726,
                                "name":"Employee Benefits",
                                "description":"Employee Benefits",
                                "overlayId":-1,
                                "automationId":"EMPLOYEEBENEFITS",
                                "dateLastModified":"2016-05-13T14:23:39.003",
                                "effectivePermissions":2147483647
                            },
                            {
                                "isRepeatable":false,
                                "notesAllowed":true,
                                "calculateNotesAllowed":true,
                                "folderTypeDataResults":[

                                ],
                                "documentTypeDataResults":[
                                    {
                                        "classId":-1,
                                        "id":624303,
                                        "name":"Financials",
                                        "description":"Financials",
                                        "overlayId":-1,
                                        "automationId":"Financials",
                                        "dateLastModified":"2016-05-13T14:23:40.73",
                                        "effectivePermissions":2147483647
                                    },
                                    {
                                        "classId":-1,
                                        "id":624695,
                                        "name":"Firm Order Noted",
                                        "description":"Firm Order Noted",
                                        "overlayId":-1,
                                        "automationId":"FirmOrderNoted",
                                        "dateLastModified":"2016-05-13T14:23:40.743",
                                        "effectivePermissions":2147483647
                                    }
                                ],
                                "classId":-2,
                                "id":2727529,
                                "name":"Financials",
                                "description":"Financials",
                                "overlayId":-1,
                                "automationId":"Financials",
                                "dateLastModified":"2016-05-13T14:23:39.077",
                                "effectivePermissions":2147483647
                            },
                            {
                                "isRepeatable":false,
                                "notesAllowed":true,
                                "calculateNotesAllowed":true,
                                "folderTypeDataResults":[

                                ],
                                "documentTypeDataResults":[
                                    {
                                        "classId":-1,
                                        "id":624692,
                                        "name":"General",
                                        "description":"General",
                                        "overlayId":-1,
                                        "automationId":"General",
                                        "dateLastModified":"2016-05-13T14:23:40.767",
                                        "effectivePermissions":2147483647
                                    },
                                    {
                                        "classId":-1,
                                        "id":2727001,
                                        "name":"General Marketing Materials",
                                        "description":"General Marketing Materials",
                                        "overlayId":-1,
                                        "automationId":"GeneralMarketingMaterials",
                                        "dateLastModified":"2016-05-13T14:23:40.78",
                                        "effectivePermissions":2147483647
                                    }
                                ],
                                "classId":-2,
                                "id":624732,
                                "name":"General Correspondence",
                                "description":"Gen Corr",
                                "overlayId":-1,
                                "automationId":"GENCORRESPONDENCE",
                                "dateLastModified":"2016-05-13T14:23:39.1",
                                "effectivePermissions":2147483647
                            },
                            {
                                "isRepeatable":true,
                                "notesAllowed":true,
                                "calculateNotesAllowed":true,
                                "folderTypeDataResults":[
                                    {
                                        "isRepeatable":true,
                                        "notesAllowed":true,
                                        "calculateNotesAllowed":false,
                                        "folderTypeDataResults":[
                                            {
                                                "isRepeatable":false,
                                                "notesAllowed":false,
                                                "calculateNotesAllowed":false,
                                                "folderTypeDataResults":[
                                                    {
                                                        "isRepeatable":false,
                                                        "notesAllowed":false,
                                                        "calculateNotesAllowed":false,
                                                        "folderTypeDataResults":[
                                                            {
                                                                "isRepeatable":false,
                                                                "notesAllowed":false,
                                                                "calculateNotesAllowed":false,
                                                                "folderTypeDataResults":[
                                                                    {
                                                                        "isRepeatable":false,
                                                                        "notesAllowed":false,
                                                                        "calculateNotesAllowed":false,
                                                                        "folderTypeDataResults":[

                                                                        ],
                                                                        "documentTypeDataResults":[
                                                                            {
                                                                                "classId":-1,
                                                                                "id":2733819,
                                                                                "name":"Test Type",
                                                                                "description":"Test Type Description",
                                                                                "overlayId":2940591,
                                                                                "automationId":"Test Type",
                                                                                "dateLastModified":"2016-06-08T17:57:56.45",
                                                                                "effectivePermissions":2147483647
                                                                            }
                                                                        ],
                                                                        "classId":-2,
                                                                        "id":2733820,
                                                                        "name":"Test Folder Type",
                                                                        "description":"Test Folder Type Description",
                                                                        "overlayId":-1,
                                                                        "automationId":"Test Folder Type",
                                                                        "dateLastModified":"2016-05-13T14:23:39.653",
                                                                        "effectivePermissions":2147483647
                                                                    }
                                                                ],
                                                                "documentTypeDataResults":[
                                                                    {
                                                                        "classId":-1,
                                                                        "id":2733819,
                                                                        "name":"Test Type",
                                                                        "description":"Test Type Description",
                                                                        "overlayId":2940591,
                                                                        "automationId":"Test Type",
                                                                        "dateLastModified":"2016-06-08T17:57:56.45",
                                                                        "effectivePermissions":2147483647
                                                                    }
                                                                ],
                                                                "classId":-2,
                                                                "id":2733820,
                                                                "name":"Test Folder Type",
                                                                "description":"Test Folder Type Description",
                                                                "overlayId":-1,
                                                                "automationId":"Test Folder Type",
                                                                "dateLastModified":"2016-05-13T14:23:39.653",
                                                                "effectivePermissions":2147483647
                                                            }
                                                        ],
                                                        "documentTypeDataResults":[
                                                            {
                                                                "classId":-1,
                                                                "id":2733819,
                                                                "name":"Test Type",
                                                                "description":"Test Type Description",
                                                                "overlayId":2940591,
                                                                "automationId":"Test Type",
                                                                "dateLastModified":"2016-06-08T17:57:56.45",
                                                                "effectivePermissions":2147483647
                                                            }
                                                        ],
                                                        "classId":-2,
                                                        "id":2733820,
                                                        "name":"Test Folder Type",
                                                        "description":"Test Folder Type Description",
                                                        "overlayId":-1,
                                                        "automationId":"Test Folder Type",
                                                        "dateLastModified":"2016-05-13T14:23:39.653",
                                                        "effectivePermissions":2147483647
                                                    }
                                                ],
                                                "documentTypeDataResults":[
                                                    {
                                                        "classId":-1,
                                                        "id":2733819,
                                                        "name":"Test Type",
                                                        "description":"Test Type Description",
                                                        "overlayId":2940591,
                                                        "automationId":"Test Type",
                                                        "dateLastModified":"2016-06-08T17:57:56.45",
                                                        "effectivePermissions":2147483647
                                                    }
                                                ],
                                                "classId":-2,
                                                "id":2733820,
                                                "name":"Test Folder Type",
                                                "description":"Test Folder Type Description",
                                                "overlayId":-1,
                                                "automationId":"Test Folder Type",
                                                "dateLastModified":"2016-05-13T14:23:39.653",
                                                "effectivePermissions":2147483647
                                            }
                                        ],
                                        "documentTypeDataResults":[
                                            {
                                                "classId":-1,
                                                "id":2733857,
                                                "name":"New Document",
                                                "description":"New Document with a very long description that should run off of the side of the page and make you say WHAAAAAAAAATTTT",
                                                "overlayId":-1,
                                                "automationId":"New Document",
                                                "dateLastModified":"2016-05-13T14:23:41.133",
                                                "effectivePermissions":2147483647
                                            },
                                            {
                                                "classId":-1,
                                                "id":2733819,
                                                "name":"Test Type",
                                                "description":"Test Type Description",
                                                "overlayId":2940591,
                                                "automationId":"Test Type",
                                                "dateLastModified":"2016-06-08T17:57:56.45",
                                                "effectivePermissions":2147483647
                                            }
                                        ],
                                        "classId":-2,
                                        "id":2733820,
                                        "name":"Test Folder Type",
                                        "description":"Test Folder Type Description",
                                        "overlayId":-1,
                                        "automationId":"Test Folder Type",
                                        "dateLastModified":"2016-05-13T14:23:39.653",
                                        "effectivePermissions":2147483647
                                    }
                                ],
                                "documentTypeDataResults":[
                                    {
                                        "classId":-1,
                                        "id":2733857,
                                        "name":"New Document",
                                        "description":"New Document with a very long description that should run off of the side of the page and make you say WHAAAAAAAAATTTT",
                                        "overlayId":-1,
                                        "automationId":"New Document",
                                        "dateLastModified":"2016-05-13T14:23:41.133",
                                        "effectivePermissions":2147483647
                                    },
                                    {
                                        "classId":-1,
                                        "id":2733819,
                                        "name":"Test Type",
                                        "description":"Test Type Description",
                                        "overlayId":2940591,
                                        "automationId":"Test Type",
                                        "dateLastModified":"2016-06-08T17:57:56.45",
                                        "effectivePermissions":2147483647
                                    }
                                ],
                                "classId":-2,
                                "id":2733820,
                                "name":"Test Folder Type",
                                "description":"Test Folder Type Description",
                                "overlayId":-1,
                                "automationId":"Test Folder Type",
                                "dateLastModified":"2016-05-13T14:23:39.653",
                                "effectivePermissions":2147483647
                            },
                            {
                                "isRepeatable":false,
                                "notesAllowed":true,
                                "calculateNotesAllowed":true,
                                "folderTypeDataResults":[

                                ],
                                "documentTypeDataResults":[

                                ],
                                "classId":-2,
                                "id":624717,
                                "name":"Work In Process",
                                "description":"WIP",
                                "overlayId":-1,
                                "automationId":"WIP",
                                "dateLastModified":"2016-05-13T14:23:39.703",
                                "effectivePermissions":2147483647
                            }
                        ],
                        "documentTypeDataResults":[
                            {
                                "classId":-1,
                                "id":624672,
                                "name":"401k",
                                "description":"401k",
                                "overlayId":2940591,
                                "automationId":"401k",
                                "dateLastModified":"2016-06-08T17:58:06.54",
                                "effectivePermissions":2147483647
                            },
                            {
                                "classId":-1,
                                "id":624706,
                                "name":"A&S",
                                "description":"A&S",
                                "overlayId":2936561,
                                "automationId":"AS",
                                "dateLastModified":"2016-05-13T14:23:39.77",
                                "effectivePermissions":2147483647
                            }
                        ]
                    },
                    "annotationTemplates":null,
                    "isWebDavEnabled":true,
                    "notes":[
                        {
                            "id":316,
                            "version":11,
                            "category":0,
                            "isDeleted":false,
                            "notes":[
                                {
                                    "noteId":166773,
                                    "isDefault":true,
                                    "status":0,
                                    "items":[
                                        {
                                            "itemId":317,
                                            "replaced":null,
                                            "timeStamp":"2015-04-06T17:12:26.7565494Z",
                                            "text":"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.504\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">This is a file note for Scott</span></p></body>\r\n</html>",
                                            "drawer":"Test Drawer",
                                            "fileNumber":"Scott's Note Test",
                                            "isHidden":false,
                                            "userName":"Blazina,Kevin (kblazina)"
                                        },
                                        {
                                            "itemId":324,
                                            "replaced":null,
                                            "timeStamp":"2015-04-06T17:28:36.7560087Z",
                                            "text":"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.504\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">test</span></p></body>\r\n</html>",
                                            "drawer":"Test Drawer",
                                            "fileNumber":"Scott's Note Test",
                                            "isHidden":false,
                                            "userName":"Blazina,Kevin (kblazina)"
                                        },
                                        {
                                            "itemId":523,
                                            "replaced":null,
                                            "timeStamp":"2015-05-07T20:24:14.5595065Z",
                                            "text":"<p>this is a test</p>\n",
                                            "drawer":"Test Drawer",
                                            "fileNumber":"Scott's Note Test",
                                            "isHidden":false,
                                            "userName":"QA2 (qa2)"
                                        },
                                        {
                                            "itemId":200600,
                                            "replaced":null,
                                            "timeStamp":"2015-08-24T16:17:18.2926819Z",
                                            "text":"<p>This was added from my iPad&nbsp;</p>\n",
                                            "drawer":"Test Drawer",
                                            "fileNumber":"Scott's Note Test",
                                            "isHidden":false,
                                            "userName":"Blazina,Kevin (kblazina)"
                                        },
                                        {
                                            "itemId":200601,
                                            "replaced":null,
                                            "timeStamp":"2015-08-24T16:19:24.4587804Z",
                                            "text":"<p><span style=\"font-size:20px\"><strong><em><u>This was also added from my iPad&nbsp;<s>​</s></u></em></strong>​​</span></p>\n",
                                            "drawer":"Test Drawer",
                                            "fileNumber":"Scott's Note Test",
                                            "isHidden":false,
                                            "userName":"Blazina,Kevin (kblazina)"
                                        },
                                        {
                                            "itemId":200650,
                                            "replaced":null,
                                            "timeStamp":"2015-09-11T13:06:04.264458Z",
                                            "text":"<p><strong>This is a test</strong></p>\n",
                                            "drawer":"Test Drawer",
                                            "fileNumber":"Scott's Note Test",
                                            "isHidden":false,
                                            "userName":"Blazina,Kevin (kblazina)"
                                        }
                                    ]
                                },
                                {
                                    "noteId":166776,
                                    "isDefault":false,
                                    "status":0,
                                    "items":[
                                        {
                                            "itemId":311,
                                            "replaced":null,
                                            "timeStamp":"2015-04-06T17:11:15.1872873Z",
                                            "text":"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.504\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">This is a file note that I am merging</span></p></body>\r\n</html>",
                                            "drawer":"Test Drawer",
                                            "fileNumber":"Kevin Note test",
                                            "isHidden":false,
                                            "userName":"Blazina,Kevin (kblazina)"
                                        }
                                    ]
                                },
                                {
                                    "noteId":166783,
                                    "isDefault":false,
                                    "status":0,
                                    "items":[
                                        {
                                            "itemId":320,
                                            "replaced":null,
                                            "timeStamp":"2015-04-06T17:25:29.7682791Z",
                                            "text":"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.504\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">note 3 historical note</span></p></body>\r\n</html>",
                                            "drawer":"Test Drawer",
                                            "fileNumber":"Kevins note 2 test",
                                            "isHidden":false,
                                            "userName":"Blazina,Kevin (kblazina)"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "locationLabel":"",
                    "location":"",
                    "hasLocation":false,
                    "drawerLabel":"Drawer",
                    "drawer":"Test Drawer",
                    "fileTypeLabel":"File Type",
                    "fileType":"Test Type",
                    "fileTypeId":"2730287",
                    "fileNumberLabel":"File number",
                    "fileNumber":"Scott's Note Test",
                    "fileNameLabel":"File name",
                    "fileName":"Scott's Note Test",
                    "fileMarkSize":16,
                    "fileMarksLabel":"File Marks",
                    "fileMarks":[

                    ],
                    "hasAttributes":false,
                    "attributes":[

                    ],
                    "fileId":"2733350",
                    "hasNotes":true,
                    "lockedTasks":null
                };
                return JSON.stringify(file);
            }
        },
        {
            multipleFoldersAndDocuments: function () {

                var fileTreeTemplate = utils.getTemplateFromRoute(fileTree, 'GetFileTree', 'defaultRoute');
                var metadataTemplate = utils.getTemplateFromRoute(metadataInfoPane, 'GetFileInfoPaneData', 'defaultRoute');
                var fileTemplate = utils.getTemplateFromRoute(content, 'GetTemplates', 'defaultRoute');
                var notesTemplate = utils.getTemplateFromRoute(notes, 'getNotes', 'defaultRoute');

                var result = {
                    "isErrored": false,
                    "error": null,
                    "locationLabel": "",
                    "location": "",
                    "hasLocation": false,
                    "drawerLabel": "Drawer",
                    "drawer": "Underwriting Drawer",
                    "fileTypeLabel": "File Type",
                    "fileType": "Workers Comp UW Files",
                    "fileTypeId": "626671",
                    "fileNumberLabel": "Policy Number",
                    "fileNumber": "MID100",
                    "fileNameLabel": "Insured Name",
                    "fileName": "Midwest Contractors Inc",
                    "fileMarkSize": 16,
                    "fileMarksLabel": "File Marks",
                    //Change the metadataTemplate number based on desired scenario
                    "fileMarks": metadataTemplate.FileMarks,
                    "hasAttributes": true,
                    //Change the metadataTemplate number based on desired scenario
                    "attributes": metadataTemplate.Attributes,
                    "fileId": "654461",
                    "lockedTasks": null,
                    "fileTree": fileTreeTemplate,
                    "relatedFiles": relatedFilesScenarios[0],
                    "fileTypeTemplate": fileTemplate,
                    //if chrome's network traffic is showing the response as json, it's because of the html in the notes
                    //it works ok, it's just formatting
                    "notes": notesTemplate,
                    "annotationTemplates": null,
                    "isWebDavEnabled": true
                };

                return JSON.stringify(result);
            }
        },
        {
            singleFolderOneDocument: function () {

                var fileTreeTemplate = utils.getTemplateFromRoute(fileTree, 'GetFileTree', 'singleFolderAndDoc');
                var metadataTemplate = utils.getTemplateFromRoute(metadataInfoPane, 'GetFileInfoPaneData', 'defaultRoute');
                var fileTemplate = utils.getTemplateFromRoute(content, 'GetTemplates', 'addDocumentTestRoute');

                var result = {
                    "isErrored": false,
                    "error": null,
                    "locationLabel": "",
                    "location": "",
                    "hasLocation": false,
                    "drawerLabel": "Drawer",
                    "drawer": "Underwriting Drawer",
                    "fileTypeLabel": "File Type",
                    "fileType": "Workers Comp UW Files",
                    "fileTypeId": "626671",
                    "fileNumberLabel": "Policy Number",
                    "fileNumber": "MID100",
                    "fileNameLabel": "Insured Name",
                    "fileName": "Midwest Contractors Inc",
                    "fileMarkSize": 16,
                    "fileMarksLabel": "File Marks",
                    //Change the metadataTemplate number based on desired scenario
                    "fileMarks": metadataTemplate.FileMarks,
                    "hasAttributes": true,
                    //Change the metadataTemplate number based on desired scenario
                    "attributes": metadataTemplate.Attributes,
                    "fileId": "654461",
                    "lockedTasks": null,
                    "fileTree": fileTreeTemplate,
                    "relatedFiles": relatedFilesScenarios[0],
                    "fileTypeTemplate": fileTemplate,
                    //if chrome's network traffic is showing the response as json, it's because of the html in the notes
                    //it works ok, it's just formatting
                    "notes": {},
                    "annotationTemplates": null,
                    "isWebDavEnabled": true
                };

                return JSON.stringify(result);
            }
        },
        {
            singleFolderMultiDocument: function () {

                var fileTreeTemplate = utils.getTemplateFromRoute(fileTree, 'GetFileTree', 'singleFolderMultiDoc');
                var metadataTemplate = utils.getTemplateFromRoute(metadataInfoPane, 'GetFileInfoPaneData', 'defaultRoute');
                var fileTemplate = utils.getTemplateFromRoute(content, 'GetTemplates', 'defaultRoute');
                var notesTemplate = utils.getTemplateFromRoute(notes, 'getNotes', 'defaultRoute');

                var result = {
                    "isErrored": false,
                    "error": null,
                    "locationLabel": "",
                    "location": "",
                    "hasLocation": false,
                    "drawerLabel": "Drawer",
                    "drawer": "Underwriting Drawer",
                    "fileTypeLabel": "File Type",
                    "fileType": "Workers Comp UW Files",
                    "fileTypeId": "626671",
                    "fileNumberLabel": "Policy Number",
                    "fileNumber": "MID100",
                    "fileNameLabel": "Insured Name",
                    "fileName": "Midwest Contractors Inc",
                    "fileMarkSize": 16,
                    "fileMarksLabel": "File Marks",
                    //Change the metadataTemplate number based on desired scenario
                    "fileMarks": metadataTemplate.FileMarks,
                    "hasAttributes": true,
                    //Change the metadataTemplate number based on desired scenario
                    "attributes": metadataTemplate.Attributes,
                    "fileId": "654461",
                    "lockedTasks": null,
                    "fileTree": fileTreeTemplate,
                    "relatedFiles": relatedFilesScenarios[0],
                    "fileTypeTemplate": fileTemplate,
                    //if chrome's network traffic is showing the response as json, it's because of the html in the notes
                    //it works ok, it's just formatting
                    "notes": notesTemplate,
                    "annotationTemplates": null,
                    "isWebDavEnabled": true
                };

                return JSON.stringify(result);
            }
        },
        {
            addPageTest: function () {

                var fileTreeTemplate = utils.getTemplateFromRoute(fileTree, 'GetFileTree', 'addPageTestSingleFolderDocPage');
                var metadataTemplate = utils.getTemplateFromRoute(metadataInfoPane, 'GetFileInfoPaneData', 'defaultRoute');
                var fileTemplate = utils.getTemplateFromRoute(content, 'GetTemplates', 'addDocumentTestRoute');

                var result = {
                    "isErrored": false,
                    "error": null,
                    "locationLabel": "",
                    "location": "",
                    "hasLocation": false,
                    "drawerLabel": "Drawer",
                    "drawer": "Underwriting Drawer",
                    "fileTypeLabel": "File Type",
                    "fileType": "Workers Comp UW Files",
                    "fileTypeId": "626671",
                    "fileNumberLabel": "Policy Number",
                    "fileNumber": "MID100",
                    "fileNameLabel": "Insured Name",
                    "fileName": "Midwest Contractors Inc",
                    "fileMarkSize": 16,
                    "fileMarksLabel": "File Marks",
                    //Change the metadataTemplate number based on desired scenario
                    "fileMarks": metadataTemplate.FileMarks,
                    "hasAttributes": true,
                    //Change the metadataTemplate number based on desired scenario
                    "attributes": metadataTemplate.Attributes,
                    "fileId": "654461",
                    "lockedTasks": null,
                    "fileTree": fileTreeTemplate,
                    "relatedFiles": relatedFilesScenarios[0],
                    "fileTypeTemplate": fileTemplate,
                    //if chrome's network traffic is showing the response as json, it's because of the html in the notes
                    //it works ok, it's just formatting
                    "notes": {},
                    "annotationTemplates": null,
                    "isWebDavEnabled": true
                };

                return JSON.stringify(result);
            }
        },
        {
            singleDocument: function () {
                var metadataTemplate = utils.getTemplateFromRoute(metadataInfoPane, 'GetFileInfoPaneData', 'defaultRoute');
                var fileTreeTemplate = utils.getTemplateFromRoute(fileTree, 'GetFileTree', 'singleDocument');
                var fileTemplate = utils.getTemplateFromRoute(content, 'GetTemplates', 'addDocumentTestRoute');

                var result = {
                    "isErrored": false,
                    "error": null,
                    "locationLabel": "",
                    "location": "",
                    "hasLocation": false,
                    "drawerLabel": "Drawer",
                    "drawer": "Underwriting Drawer",
                    "fileTypeLabel": "File Type",
                    "fileType": "Workers Comp UW Files",
                    "fileTypeId": "626671",
                    "fileNumberLabel": "Policy Number",
                    "fileNumber": "MID100",
                    "fileNameLabel": "Insured Name",
                    "fileName": "Midwest Contractors Inc",
                    "fileMarkSize": 16,
                    "fileMarksLabel": "File Marks",
                    //Change the metadataTemplate number based on desired scenario
                    "fileMarks": metadataTemplate.FileMarks,
                    "hasAttributes": true,
                    //Change the metadataTemplate number based on desired scenario
                    "attributes": metadataTemplate.Attributes,
                    "fileId": "654461",
                    "lockedTasks": null,
                    "fileTree": fileTreeTemplate,
                    "relatedFiles": relatedFilesScenarios[0],
                    "fileTypeTemplate": fileTemplate,
                    //if chrome's network traffic is showing the response as json, it's because of the html in the notes
                    //it works ok, it's just formatting
                    "notes": {},
                    "annotationTemplates": null,
                    "isWebDavEnabled": true
                };

                return JSON.stringify(result);
            }
        },
        {
            emptyFile: function () {

                var metadataTemplate = utils.getTemplateFromRoute(metadataInfoPane, 'GetFileInfoPaneData', 'defaultRoute');
                var fileTreeTemplate = utils.getTemplateFromRoute(fileTree, 'GetFileTree', 'singleDocument');
                var fileTemplate = utils.getTemplateFromRoute(content, 'GetTemplates', 'defaultRoute');

                var result = {
                    "isErrored": false,
                    "error": null,
                    "locationLabel": "",
                    "location": "",
                    "hasLocation": false,
                    "drawerLabel": "Drawer",
                    "drawer": "Underwriting Drawer",
                    "fileTypeLabel": "File Type",
                    "fileType": "Workers Comp UW Files",
                    "fileTypeId": "626671",
                    "fileNumberLabel": "Policy Number",
                    "fileNumber": "MID100",
                    "fileNameLabel": "Insured Name",
                    "fileName": "Midwest Contractors Inc",
                    "fileMarkSize": 16,
                    "fileMarksLabel": "File Marks",
                    //Change the metadataTemplate number based on desired scenario
                    //"fileMarks": JSON.parse(metadataTemplate[0]()).FileMarks,
                    "fileMarks": metadataTemplate.FileMarks,
                    "hasAttributes": true,
                    //Change the metadataTemplate number based on desired scenario
                    //"attributes": JSON.parse(metadataTemplate[0]()).Attributes,
                    "attributes": metadataTemplate.Attributes,
                    "fileId": "654461",
                    "lockedTasks": null,
                    //"fileTree": JSON.parse(fileTreeScenarios[4].singleDocument()),
                    "fileTree": fileTreeTemplate,
                    "relatedFiles": relatedFilesScenarios[0],
                    //"fileTypeTemplate": JSON.parse(fileTemplateScenarios[1].addDocumentTestRoute()),
                    "fileTypeTemplate": fileTemplate,

                    //if chrome's network traffic is showing the response as json, it's because of the html in the notes
                    //it works ok, it's just formatting
                    "notes": {},
                    "annotationTemplates": null,
                    "isWebDavEnabled": true
                };

                return JSON.stringify(result);
            }
        },
        {
            oneFolderOneFolderType: function () {

                var metadataTemplate = utils.getTemplateFromRoute(metadataInfoPane, 'GetFileInfoPaneData', 'defaultRoute');
                var fileTreeTemplate = utils.getTemplateFromRoute(fileTree, 'GetFileTree', 'singleFolderMultiDoc');
                var fileTemplate = utils.getTemplateFromRoute(content, 'GetTemplates', 'oneFolderTypeTestRoute');

                var result = {
                    "isErrored": false,
                    "error": null,
                    "locationLabel": "",
                    "location": "",
                    "hasLocation": false,
                    "drawerLabel": "Drawer",
                    "drawer": "Underwriting Drawer",
                    "fileTypeLabel": "File Type",
                    "fileType": "Workers Comp UW Files",
                    "fileTypeId": "626671",
                    "fileNumberLabel": "Policy Number",
                    "fileNumber": "MID100",
                    "fileNameLabel": "Insured Name",
                    "fileName": "Midwest Contractors Inc",
                    "fileMarkSize": 16,
                    "fileMarksLabel": "File Marks",
                    //Change the metadataTemplate number based on desired scenario
                    //"fileMarks": JSON.parse(metadataTemplate[0]()).FileMarks,
                    "fileMarks": metadataTemplate.FileMarks,
                    "hasAttributes": true,
                    //Change the metadataTemplate number based on desired scenario
                    //"attributes": JSON.parse(metadataTemplate[0]()).Attributes,
                    "attributes": metadataTemplate.Attributes,
                    "fileId": "654461",
                    "lockedTasks": null,
                    //"fileTree": JSON.parse(fileTreeScenarios[2].singleFolderMultiDoc()),
                    "fileTree": fileTreeTemplate,
                    "relatedFiles": relatedFilesScenarios[0],
                    //"fileTypeTemplate": JSON.parse(fileTemplateScenarios[2].oneFolderTypeTestRoute()),
                    "fileTypeTemplate": fileTemplate,
                    //if chrome's network traffic is showing the response as json, it's because of the html in the notes
                    //it works ok, it's just formatting
                    "notes": {},
                    "annotationTemplates": null,
                    "isWebDavEnabled": true
                };

                return JSON.stringify(result);
            }
        },
        {
            singleFolderWithNotes: function () {

                var fileTreeTemplate = utils.getTemplateFromRoute(fileTree, 'GetFileTree', 'singleFolderWithNotes');
                var metadataTemplate = utils.getTemplateFromRoute(metadataInfoPane, 'GetFileInfoPaneData', 'defaultRoute');
                var fileTemplate = utils.getTemplateFromRoute(content, 'GetTemplates', 'defaultRoute');
                var notesTemplate = utils.getTemplateFromRoute(notes, 'getNotes', 'defaultRoute');

                var result = {
                    "isErrored": false,
                    "error": null,
                    "locationLabel": "",
                    "location": "",
                    "hasLocation": false,
                    "drawerLabel": "Drawer",
                    "drawer": "Underwriting Drawer",
                    "fileTypeLabel": "File Type",
                    "fileType": "Workers Comp UW Files",
                    "fileTypeId": "626671",
                    "fileNumberLabel": "Policy Number",
                    "fileNumber": "MID100",
                    "fileNameLabel": "Insured Name",
                    "fileName": "Midwest Contractors Inc",
                    "fileMarkSize": 16,
                    "fileMarksLabel": "File Marks",
                    //Change the metadataTemplate number based on desired scenario
                    "fileMarks": metadataTemplate.FileMarks,
                    "hasAttributes": true,
                    //Change the metadataTemplate number based on desired scenario
                    "attributes": metadataTemplate.Attributes,
                    "fileId": "654461",
                    "lockedTasks": null,
                    "fileTree": fileTreeTemplate,
                    "relatedFiles": relatedFilesScenarios[0],
                    "fileTypeTemplate": fileTemplate,
                    //if chrome's network traffic is showing the response as json, it's because of the html in the notes
                    //it works ok, it's just formatting
                    "notes": notesTemplate,
                    "annotationTemplates": null,
                    "isWebDavEnabled": true
                };

                return JSON.stringify(result);
            }
        },
        {
            multipleWebdavPage: function() {

                var fileTreeTemplate = utils.getTemplateFromRoute(fileTree, 'GetFileTree', 'defaultRoute');
                var metadataTemplate = utils.getTemplateFromRoute(metadataInfoPane, 'GetFileInfoPaneData', 'defaultRoute');
                var fileTemplate = utils.getTemplateFromRoute(content, 'GetTemplates', 'defaultRoute');
                var notesTemplate = utils.getTemplateFromRoute(notes, 'getNotes', 'defaultRoute');

                var result = {
                    "isErrored": false,
                    "error": null,
                    "locationLabel": "",
                    "location": "",
                    "hasLocation": false,
                    "drawerLabel": "Drawer",
                    "drawer": "Underwriting Drawer",
                    "fileTypeLabel": "File Type",
                    "fileType": "Workers Comp UW Files",
                    "fileTypeId": "626671",
                    "fileNumberLabel": "Policy Number",
                    "fileNumber": "MID100",
                    "fileNameLabel": "Insured Name",
                    "fileName": "Midwest Contractors Inc",
                    "fileMarkSize": 16,
                    "fileMarksLabel": "File Marks",
                    //Change the metadataTemplate number based on desired scenario
                    "fileMarks": metadataTemplate.FileMarks,
                    "hasAttributes": true,
                    //Change the metadataTemplate number based on desired scenario
                    "attributes": metadataTemplate.Attributes,
                    "fileId": "654461",
                    "lockedTasks": null,
                    "fileTree": fileTreeTemplate,
                    "relatedFiles": relatedFilesScenarios[0],
                    "fileTypeTemplate": fileTemplate,
                    //if chrome's network traffic is showing the response as json, it's because of the html in the notes
                    //it works ok, it's just formatting
                    "notes": notesTemplate,
                    "annotationTemplates": null,
                    "isWebDavEnabled": true
                };

                return JSON.stringify(result);
            }
        },
        {
            audioVideoTest: function () {
                var fileTreeTemplate = utils.getTemplateFromRoute(fileTree, 'GetFileTree', 'audioVideoTree');
                var metadataTemplate = utils.getTemplateFromRoute(metadataInfoPane, 'GetFileInfoPaneData', 'defaultRoute');
                var fileTemplate = utils.getTemplateFromRoute(content, 'GetTemplates', 'defaultRoute');
                var notesTemplate = utils.getTemplateFromRoute(notes, 'getNotes', 'defaultRoute');

                var result = {
                    "isErrored": false,
                    "error": null,
                    "locationLabel": "",
                    "location": "",
                    "hasLocation": false,
                    "drawerLabel": "Drawer",
                    "drawer": "Underwriting Drawer",
                    "fileTypeLabel": "File Type",
                    "fileType": "Workers Comp UW Files",
                    "fileTypeId": "626671",
                    "fileNumberLabel": "Policy Number",
                    "fileNumber": "MID100",
                    "fileNameLabel": "Insured Name",
                    "fileName": "Midwest Contractors Inc",
                    "fileMarkSize": 16,
                    "fileMarksLabel": "File Marks",
                    //Change the metadataTemplate number based on desired scenario
                    "fileMarks": metadataTemplate.FileMarks,
                    "hasAttributes": true,
                    //Change the metadataTemplate number based on desired scenario
                    "attributes": metadataTemplate.Attributes,
                    "fileId": "654461",
                    "lockedTasks": null,
                    "fileTree": fileTreeTemplate,
                    "relatedFiles": relatedFilesScenarios[0],
                    "fileTypeTemplate": fileTemplate,
                    //if chrome's network traffic is showing the response as json, it's because of the html in the notes
                    //it works ok, it's just formatting
                    "notes": notesTemplate,
                    "annotationTemplates": null,
                    "isWebDavEnabled": true
                };

                return JSON.stringify(result);
            }
        }
    ]
};

mocks.push(FileOpen);

exports.mocks = mocks;