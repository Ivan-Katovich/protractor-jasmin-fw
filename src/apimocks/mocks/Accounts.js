/* 
    name: Accounts.js
    descr: backend mocks for api/accounts calls;
    created: 7/6/2016;
    by: navasaal;
*/

var mocks = [];

var currentGroups = {
    name: 'currentGroups',
    mockRoute: '/api/accounts/current/groups',
    testScope: 'success',
    testScenario: 'scenario',
    jsonTemplate: [{
        scenario: function () {
            var result = [{ "id": -1, "externalId": null, "name": "Everyone", "friendlyName": "Everyone", "type": 1, "enabled": true },
                { "id": 25, "externalId": null, "name": "G1", "friendlyName": "G1", "type": 1, "enabled": true }];
            return JSON.stringify(result);
        },
    }]
};
mocks.push(currentGroups);

var accountsCurrent = {
    name: 'accountsCurrent',
    mockRoute: '/api/accounts/current',
    testScope: 'success',
    testScenario: 'scenario',
    jsonTemplate: [{
        scenario: function () {
            var result = {
                "id": 2729177,
                "externalId": "4096fc2e06466b4c9a68b76c65f04050",
                "name": "davissc",
                "friendlyName": "Davis,Scott",
                "type": 0
            };
            return JSON.stringify(result);
        }
    }]
};
mocks.push(accountsCurrent);

var accountsMembersG2 = {
    name: 'accountsMembersG2',
    mockRoute: '/api/accounts/110',
    testScope: 'success',
    testScenario: 'scenario',
    jsonTemplate: [
        {
            scenario: function () {
                var result = {
                    "members": [
                        {
                            "members": [],
                            "id": 420,
                            "externalId": "36d7583708ebee4b95f31cc1c67b6947",
                            "name": "xp1",
                            "friendlyName": "XP1",
                            "type": 0,
                            "enabled": true,
                            "description": null
                        },
                        {
                            "members": [],
                            "id": 22885,
                            "externalId": "327ede1f24cc5345a74f6248b6d8dce1",
                            "name": "iglesibr",
                            "friendlyName": "iglesibr",
                            "type": 0,
                            "enabled": false,
                            "description": null
                        },
                        {
                            "members":[
                                {
                                    "members":[],
                                    "id":32,
                                    "externalId":"d429968d80ad8041a9a7fda479121f88",
                                    "name":"badhekna",
                                    "friendlyName":"badhekna",
                                    "type":0,
                                    "enabled":false,
                                    "description":null
                                },
                                {
                                    "members":[],
                                    "id":420,
                                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                                    "name":"xp1",
                                    "friendlyName":"XP1",
                                    "type":0,
                                    "enabled":true,
                                    "description":null
                                }
                            ],
                            "id":8252,
                            "externalId":null,
                            "name":"xp1_test",
                            "friendlyName":"xp1_test",
                            "type":1,
                            "enabled":true,
                            "description":null
                        }
                    ],
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                };
                return JSON.stringify(result);
            }
        }]
};
mocks.push(accountsMembersG2);

var accountsMembers = {
    name: 'accountsMembers',
    mockRoute: '\/api\/accounts\/[1234567890]+',
    // mockRoute: '/api/accounts/25',
    testScope: 'success',
    testScenario: 'scenario',
    jsonTemplate: [{
        scenario: function () {
            var result = {
                "members": [
                    {
                        "members": [],
                        "id": 420,
                        "externalId": "36d7583708ebee4b95f31cc1c67b6947",
                        "name": "xp1",
                        "friendlyName": "XP1",
                        "type": 0,
                        "enabled": true,
                        "description": null
                    },
                    {
                        "members": [],
                        "id": 9002,
                        "externalId": "04f716ece8419c41844f3a686b24678d",
                        "name": "barnweja",
                        "friendlyName": "Barnwell,Jamie",
                        "type": 0,
                        "enabled": true,
                        "description": null
                    },
                    {
                        "members": [],
                        "id": 22885,
                        "externalId": "327ede1f24cc5345a74f6248b6d8dce1",
                        "name": "iglesibr",
                        "friendlyName": "iglesibr",
                        "type": 0,
                        "enabled": false,
                        "description": null
                    }
                ],
                "id": 25,
                "externalId": null,
                "name": "G1",
                "friendlyName": "G1",
                "type": 1,
                "enabled": true,
                "description": null
            };
            return JSON.stringify(result);
        }
    },
        {
            groupsInGroups: function () {
                var result = {
                    "members": [
                        {
                            "members": [],
                            "id": 420,
                            "externalId": "36d7583708ebee4b95f31cc1c67b6947",
                            "name": "xp1",
                            "friendlyName": "XP1",
                            "type": 0,
                            "enabled": true,
                            "description": null
                        },
                        {
                            "members": [],
                            "id": 22885,
                            "externalId": "327ede1f24cc5345a74f6248b6d8dce1",
                            "name": "iglesibr",
                            "friendlyName": "iglesibr",
                            "type": 0,
                            "enabled": false,
                            "description": null
                        },
                        {
                            "members":[
                                {
                                    "members":[],
                                    "id":32,
                                    "externalId":"d429968d80ad8041a9a7fda479121f88",
                                    "name":"badhekna",
                                    "friendlyName":"badhekna",
                                    "type":0,
                                    "enabled":false,
                                    "description":null
                                },
                                {
                                    "members":[],
                                    "id":420,
                                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                                    "name":"xp1",
                                    "friendlyName":"XP1",
                                    "type":0,
                                    "enabled":true,
                                    "description":null
                                }
                            ],
                            "id":8252,
                            "externalId":null,
                            "name":"xp1_test",
                            "friendlyName":"xp1_test",
                            "type":1,
                            "enabled":true,
                            "description":null
                        }
                    ],
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                };
                return JSON.stringify(result);
            }
        }]
};
mocks.push(accountsMembers);

var rootGroups = {
    name: 'rootGroups',
    mockRoute: '/api/accounts/groups/roots',
    testScope: 'success',
    testScenario: 'scenario',
    jsonTemplate: [{
        scenario: function () {
            var result = [{ "id": -3, "externalId": null, "name": "Administrators", "friendlyName": "Administrators", "type": 1, "enabled": true },
                { "id": -1, "externalId": null, "name": "Everyone", "friendlyName": "Everyone", "type": 1, "enabled": true },
                { "id": 25, "externalId": null, "name": "G1", "friendlyName": "G1", "type": 1, "enabled": true },
                { "id": 110, "externalId": null, "name": "G2", "friendlyName": "G2", "type": 1, "enabled": true },
                { "id": 111, "externalId": null, "name": "G3", "friendlyName": "G3", "type": 1, "enabled": true },
                { "id": 112, "externalId": null, "name": "G4", "friendlyName": "G4", "type": 1, "enabled": true }];
            return JSON.stringify(result);
        },
    }]
};
mocks.push(rootGroups);

/*
 * Edit the functionalityRight you want to deny here instead of creating a new scenario unless the
 * scenario being tested is very specific
 */
var functionalityRights = {
    name: 'functionalityRights',
    mockRoute: '/api/accounts/functionalityrights',
    testScope: 'success',
    testScenario: 'allRights',
    latency: 1000,
    jsonTemplate: [
    {
        allRights: function() {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noTaskDiaryContextMenuActionRights: function () {
            var result = [
                    {
                        "name": "WebAccess-Login",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "WebAccess-Configuration",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-ToDoList",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-DiaryItems",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-ImportBin",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-Search",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-FileRelatedTasks",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-CreateDiary",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-CreateTask",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "ProcessDashboard-Access",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "ProcessDashboard-Create/ModifySLA",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-RelatedFiles",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-Settings",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-Show/HideAnnotations",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-ContentActions-AddPage",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-ContentActions-Annotate",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-ContentActions-Move",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-ContentActions-Checkout",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-ContentActions-Email",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-ContentActions-NewFolder",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-ContentActions-Download",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-ContentActions-AddNote",
                        "isAllowed": true,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-ContentActions-EditDescription",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-ContentActions-Print",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-ContentActions-NewDocument",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-ContentActions-Copy",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-ContentActions-CopyShortcut",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-TaskActions-Release",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-TaskActions-Route",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-TaskActions-Reassign",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-TaskActions-EditTask",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-TaskActions-SetAttributes",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-TaskActions-Reschedule",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-TaskActions-Delete",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-DiaryActions-Reschedule",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-DiaryActions-EditDiary",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-DiaryActions-Reassign",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-DiaryActions-Delete",
                        "isAllowed": false,
                        "isDenied": false
                    },
                    {
                        "name": "BrowserClient-DiaryActions-Release",
                        "isAllowed": false,
                        "isDenied": false
                    }
                ];

            return JSON.stringify(result);
         }
    },
    {
        noToDoList: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noDiaryList: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noImportBin: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noSearch: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noFileRelatedTasks: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noCreateDiary: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noCreateTask: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noRelatedFiles: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noSettings: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noShowAnnotations: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noAddPage: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noAddAnnotations: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noMove: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noCheckout: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noEmail: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noAddFolder: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noDownload: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noAddNote: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noEditDescription: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noPrint: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noAddDocument: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noCopy: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noCopyShortcut: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noTaskRelease: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noTaskRoute: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noTaskReassign: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noTaskEdit: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noTaskSetAttr: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noTaskReschedule: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noTaskDelete: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noDiaryReschedule: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noDiaryEdit: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noDiaryReassign: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noDiaryDelete: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": false,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    },
    {
        noDiaryRelease: function () {
            var result = [
                {
                    "name": "WebAccess-Login",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "WebAccess-Configuration",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ToDoList",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryItems",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ImportBin",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Search",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-FileRelatedTasks",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-CreateTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Access",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "ProcessDashboard-Create/ModifySLA",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-RelatedFiles",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Settings",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-Show/HideAnnotations",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddPage",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Annotate",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Move",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Checkout",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Email",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewFolder",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Download",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-AddNote",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-EditDescription",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Print",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-NewDocument",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-Copy",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-ContentActions-CopyShortcut",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Release",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Route",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-EditTask",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-SetAttributes",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-TaskActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reschedule",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-EditDiary",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Reassign",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Delete",
                    "isAllowed": true,
                    "isDenied": false
                },
                {
                    "name": "BrowserClient-DiaryActions-Release",
                    "isAllowed": false,
                    "isDenied": false
                }
            ];

            return JSON.stringify(result);
        }
    }

    ]
};
mocks.push(functionalityRights);

var accountsTree = {
    name: 'accountsAll',
    mockRoute: '/api/accounts/tree',
    testScope: 'success',
    testScenario: 'scenario',
    jsonTemplate: [{
        scenario: function () {
            var result = [
                {
                    "members":[
                        {
                            "members":[],
                            "id":6063,
                            "externalId":"96486f38720cfd449f520d9db6e406f0",
                            "name":"xp1",
                            "friendlyName":"xp1",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":2729177,
                            "externalId":"4096fc2e06466b4c9a68b76c65f04050",
                            "name":"davissc",
                            "friendlyName":"Davis,Scott",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":9002,
                            "externalId":"04f716ece8419c41844f3a686b24678d",
                            "name":"barnweja",
                            "friendlyName":"Barnwell,Jamie",
                            "type":0,
                            "enabled":true,
                            "description":null
                        }
                    ],
                    "id":-3,
                    "externalId":null,
                    "name":"Administrators",
                    "friendlyName":"Administrators group",
                    "type":1,
                    "enabled":true,
                    "description":null
                },
                {
                    "members": [
                        {
                            "members": [],
                            "id": 420,
                            "externalId": "36d7583708ebee4b95f31cc1c67b6947",
                            "name": "xp1",
                            "friendlyName": "XP1",
                            "type": 0,
                            "enabled": true,
                            "description": null
                        },
                        {
                            "members":[],
                            "id":2729177,
                            "externalId":"4096fc2e06466b4c9a68b76c65f04050",
                            "name":"davissc",
                            "friendlyName":"Davis,Scott",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members": [],
                            "id": 9002,
                            "externalId": "04f716ece8419c41844f3a686b24678d",
                            "name": "barnweja",
                            "friendlyName": "Barnwell,Jamie",
                            "type": 0,
                            "enabled": true,
                            "description": null
                        },
                        {
                            "members": [],
                            "id": 22885,
                            "externalId": "327ede1f24cc5345a74f6248b6d8dce1",
                            "name": "iglesibr",
                            "friendlyName": "iglesibr",
                            "type": 0,
                            "enabled": false,
                            "description": null
                        }
                    ],
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                {
                    "members": [
                        {
                            "members": [],
                            "id": 420,
                            "externalId": "36d7583708ebee4b95f31cc1c67b6947",
                            "name": "xp1",
                            "friendlyName": "XP1",
                            "type": 0,
                            "enabled": true,
                            "description": null
                        },
                        {
                            "members":[],
                            "id":2729177,
                            "externalId":"4096fc2e06466b4c9a68b76c65f04050",
                            "name":"davissc",
                            "friendlyName":"Davis,Scott",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members": [],
                            "id": 22885,
                            "externalId": "327ede1f24cc5345a74f6248b6d8dce1",
                            "name": "iglesibr",
                            "friendlyName": "iglesibr",
                            "type": 0,
                            "enabled": false,
                            "description": null
                        },
                        {
                            "members":[
                                {
                                    "members":[],
                                    "id":32,
                                    "externalId":"d429968d80ad8041a9a7fda479121f88",
                                    "name":"badhekna",
                                    "friendlyName":"badhekna",
                                    "type":0,
                                    "enabled":false,
                                    "description":null
                                },
                                {
                                    "members":[],
                                    "id":420,
                                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                                    "name":"xp1",
                                    "friendlyName":"XP1",
                                    "type":0,
                                    "enabled":true,
                                    "description":null
                                }
                            ],
                            "id":8252,
                            "externalId":null,
                            "name":"xp1_test",
                            "friendlyName":"xp1_test",
                            "type":1,
                            "enabled":true,
                            "description":null
                        }
                    ],
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                {
                    "members": [
                        {
                            "members": [],
                            "id": 420,
                            "externalId": "36d7583708ebee4b95f31cc1c67b6947",
                            "name": "xp1",
                            "friendlyName": "XP1",
                            "type": 0,
                            "enabled": true,
                            "description": null
                        },
                        {
                            "members": [],
                            "id": 9002,
                            "externalId": "04f716ece8419c41844f3a686b24678d",
                            "name": "barnweja",
                            "friendlyName": "Barnwell,Jamie",
                            "type": 0,
                            "enabled": true,
                            "description": null
                        }
                    ],
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                {
                    "members": [
                        {
                            "members": [],
                            "id": 420,
                            "externalId": "36d7583708ebee4b95f31cc1c67b6947",
                            "name": "xp1",
                            "friendlyName": "XP1",
                            "type": 0,
                            "enabled": true,
                            "description": null
                        }
                    ],
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                {
                    "members":[],
                    "id":-1,
                    "externalId":null,
                    "name":"Everyone",
                    "friendlyName":"Everyone",
                    "type":1,
                    "enabled":true,
                    "description":null
                },
                {
                    "members":[
                        {
                            "members":[],
                            "id":32,
                            "externalId":"d429968d80ad8041a9a7fda479121f88",
                            "name":"badhekna",
                            "friendlyName":"badhekna",
                            "type":0,
                            "enabled":false,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":420,
                            "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                            "name":"xp1",
                            "friendlyName":"XP1",
                            "type":0,
                            "enabled":true,
                            "description":null
                        }
                    ],
                    "id":8252,
                    "externalId":null,
                    "name":"xp1_test",
                    "friendlyName":"xp1_test",
                    "type":1,
                    "enabled":true,
                    "description":null
                },
                {
                    "members":[
                        {
                            "members":[],
                            "id":9483,
                            "externalId":"0a0a70feb2578f41bd93641964fee75b",
                            "name":"bk1",
                            "friendlyName":"bk1 bk1",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":17478,
                            "externalId":"d021055676d075439daeb49335938998",
                            "name":"bk2",
                            "friendlyName":"bk2 bk2",
                            "type":0,
                            "enabled":true,
                            "description":null
                        }
                    ],
                    "id":19870,
                    "externalId":null,
                    "name":"xp2_test",
                    "friendlyName":"xp2_test",
                    "type":1,
                    "enabled":true,
                    "description":null
                },
                {
                    "members":[
                        {
                            "members":[],
                            "id":-4,
                            "externalId":null,
                            "name":"IRServer",
                            "friendlyName":"IRServer",
                            "type":0,
                            "enabled":false,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":-2,
                            "externalId":null,
                            "name":"Admin",
                            "friendlyName":"Admin",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":4,
                            "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                            "name":"kennedar",
                            "friendlyName":"kennedar",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":5,
                            "externalId":"6e2a70649591f64fb12fb781c7dbda21",
                            "name":"CN=Auth_Forum_Users,OU=Forums,OU=Security Groups,OU=Groups,DC=DEVOP,DC=Vertafore,DC=com",
                            "friendlyName":"CN=Auth_Forum_Users,OU=Forums,OU=Security Groups,OU=Groups,DC=DEVOP,DC=Vertafore,DC=com",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":6,
                            "externalId":"f9c3bfa31c520d45a93cda330bb2c37c",
                            "name":"CON - Deployments",
                            "friendlyName":"CON - Deployments",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":7,
                            "externalId":"b4230ff2fc5f3b4fae86f9043747c90f",
                            "name":"TFS_StrategicTest_Contributors",
                            "friendlyName":"TFS_StrategicTest_Contributors",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":8,
                            "externalId":"ff1cc8d89b3270418609614183de5ab9",
                            "name":"IR_WS Conyers Developers",
                            "friendlyName":"IR/WS Conyers Developers",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":9,
                            "externalId":"84d6648058457d48b55ecd6b4e85faa5",
                            "name":"Vertafore - All Scrum Teams",
                            "friendlyName":"Vertafore - All Scrum Teams",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":13,
                            "externalId":"fd781e7e5a52564d86e95f053411ab91",
                            "name":"CON - Scrum The Mystery Machine",
                            "friendlyName":"CON - Scrum The Mystery Machine",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":17,
                            "externalId":"531b4cb4118e6345ae73935694725db5",
                            "name":"TFS_BenefitPoint_Contributors",
                            "friendlyName":"TFS_BenefitPoint_Contributors",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":18,
                            "externalId":"4656a8bed026524a8b106d5b17a3c7db",
                            "name":"CON - WebSense_Dev",
                            "friendlyName":"CON - WebSense_Dev",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":19,
                            "externalId":"db6adede74c9b0499777b19c9e27ab95",
                            "name":"CON - Senior Development",
                            "friendlyName":"SeniorDevelopment",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":393,
                            "externalId":"96b275b563a2184884ba0004c4b2be4b",
                            "name":"agresspe",
                            "friendlyName":"agresspe",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":394,
                            "externalId":"fbdfc9fd25c9124c90f97988ce34673a",
                            "name":"fowlerca",
                            "friendlyName":"Fowler,Carrie",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":440,
                            "externalId":"74e8b07b4fc57b4aa0ec3d3c7d3cadd0",
                            "name":"PAR-VPN-NetworkConnect",
                            "friendlyName":"PAR-VPN-NetworkConnect",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":472,
                            "externalId":"a5d9fb006f52a9419f8c1e1d7625bd70",
                            "name":"bkandiah",
                            "friendlyName":"Kandiah,Balesh",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":473,
                            "externalId":"778aea1405640d47b304bd870866885c",
                            "name":"Vertafore - Verizon Conferencing Users",
                            "friendlyName":"Vertafore - Verizon Conferencing Users",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":474,
                            "externalId":"89040c4d27b21a4e99f157f8099dd1f5",
                            "name":"Vertafore - Verizon Instant Meeting Users",
                            "friendlyName":"Vertafore - Verizon Instant Meeting Users",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":475,
                            "externalId":"718d5ec4cf62a84a8324b51c2b10028b",
                            "name":"Vertafore - Audio Conferencing Users",
                            "friendlyName":"Vertafore - Audio Conferencing Users",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":476,
                            "externalId":"db8ace1d5ffb8e4f9944e1d1652c79ea",
                            "name":"TFS_ImageRight_Contributors",
                            "friendlyName":"TFS_ImageRight_Contributors",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":477,
                            "externalId":"9014047c007a7f4586d056438ebee6eb",
                            "name":"TFS_DevelopmentTest_Contributors",
                            "friendlyName":"TFS_DevelopmentTest_Contributors",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":478,
                            "externalId":"303361f14bd179469540c2e2a9032dde",
                            "name":"TFS_Conyers_Development_Contributors",
                            "friendlyName":"TFS_Conyers_Development_Contributors",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":479,
                            "externalId":"e010e41fb72261468b5f180d173d8379",
                            "name":"TFS_IntegrationTesting_Contributors",
                            "friendlyName":"TFS_IntegrationTesting_Contributors",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":483,
                            "externalId":"7efda07d010b4f4288816f28af420d18",
                            "name":"CON - Teleworkers",
                            "friendlyName":"CON - Teleworkers",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":484,
                            "externalId":"b470d6574fbbaa478435a5464e278b23",
                            "name":"CON - WebSense_QA",
                            "friendlyName":"CON - WebSense_QA",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":485,
                            "externalId":"523b5d19ae9b5e429bc70f57dc0e28d1",
                            "name":"CON - Juniper_QA",
                            "friendlyName":"CON - Juniper_QA",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":552,
                            "externalId":"4d5052c555af354fbc6fe3b27b1f2bf6",
                            "name":"EPAM-ScrumeCore",
                            "friendlyName":"EPAM - Scrum eCore",
                            "type":0,
                            "enabled":true,
                            "description":null
                        },
                        {
                            "members":[],
                            "id":553,
                            "externalId":"a45b8048ca09124ca2a20d4b596555a5",
                            "name":"ImageRight EPAM Development",
                            "friendlyName":"ImageRight EPAM Development",
                            "type":0,
                            "enabled":true,
                            "description":null
                        }
                    ],
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                }
            ];
            return JSON.stringify(result);
        }
    }]
};
mocks.push(accountsTree);

var accountsAll = {
    name: 'accountsAll',
    mockRoute: '/api/accounts/',
    testScope: 'success',
    testScenario: 'scenario',
    jsonTemplate: [{
        scenario: function () {
            var result = [{ "id": -3, "externalId": null, "name": "Administrators", "friendlyName": "Administrators", "type": 1, "enabled": true },
                { "id": -1, "externalId": null, "name": "Everyone", "friendlyName": "Everyone", "type": 1, "enabled": true },
                { "id": 25, "externalId": null, "name": "G1", "friendlyName": "G1", "type": 1, "enabled": true },
                { "id": 110, "externalId": null, "name": "G2", "friendlyName": "G2", "type": 1, "enabled": true },
                { "id": 111, "externalId": null, "name": "G3", "friendlyName": "G3", "type": 1, "enabled": true },
                { "id": 112, "externalId": null, "name": "G4", "friendlyName": "G4", "type": 1, "enabled": true },
                { "id": -4, "externalId": null, "name": "IRServer", "friendlyName": "IRServer", "type": 0, "enabled": false },
                { "id": -2, "externalId": null, "name": "Admin", "friendlyName": "Admin", "type": 0, "enabled": true },
                { "id": 26, "externalId": null, "name": "TestUser1", "friendlyName": "", "type": 0, "enabled": true },
                { "id": 27, "externalId": null, "name": "TestUser2", "friendlyName": "", "type": 0, "enabled": true },
                { "id": 113, "externalId": null, "name": "TestUser3", "friendlyName": "", "type": 0, "enabled": true },
                { "id": 114, "externalId": null, "name": "TestUser4", "friendlyName": "", "type": 0, "enabled": true },
                { "id": 115, "externalId": null, "name": "TestUser5", "friendlyName": "", "type": 0, "enabled": true },
                { "id": 116, "externalId": null, "name": "TestUser6", "friendlyName": "", "type": 0, "enabled": true },
                { "id": 117, "externalId": null, "name": "TestUser7", "friendlyName": "", "type": 0, "enabled": true }];
            return JSON.stringify(result);
        },
    }]
};
mocks.push(accountsAll);


exports.mocks = mocks;