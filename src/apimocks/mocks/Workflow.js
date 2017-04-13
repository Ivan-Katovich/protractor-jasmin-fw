/**
 * Created by flaterje on 5/13/2014.
 */
var mocks = [];

var apiWorkflows = {
    name: 'apiWorkflows',
    mockRoute: '/api/workflows',
    testScope: 'success', //success | fail | error
    testScenario: 'tasksMock',
    //todo: this simulates live data, it will consistently load the todo list mocks
    latency: 1000,
    jsonTemplate: [
        {
            tasksMock: function () {
                var result = [
                    {
                        "buddies":[

                        ],
                        "id":0,
                        "name":"Not Used Agency Endorsement",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":17,
                        "name":"Agency Cancellation",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":40,
                        "name":"WS Proof of Insurance",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":45,
                        "name":"PL Renewal",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":53,
                        "name":"WS CL Renewal",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":60,
                        "name":"CL Submission",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":69,
                        "name":"WS Binding",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":76,
                        "name":"PL New Business",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":87,
                        "name":"WS CL Audit",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":540,
                        "name":"UW_New Business",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":549,
                        "name":"Life Surrenders",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":580,
                        "name":"New Mail",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":585,
                        "name":"Not Used Ageny Quotes",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":596,
                        "name":"Department Sort",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":7190,
                        "name":"Claims New Loss",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":7940,
                        "name":"Life Settlements",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":7951,
                        "name":"Life Claims",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8100,
                        "name":"WS CL Endorsement",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8133,
                        "name":"WS Reinstatement",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8139,
                        "name":"WS Cancellation",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8150,
                        "name":"WS Policy Checking",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8158,
                        "name":"WS CL Submission",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8172,
                        "name":"WS Claims",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8179,
                        "name":"WS Mail",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8199,
                        "name":"WS PL Renewal",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8210,
                        "name":"WS PL Policy Checking",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8218,
                        "name":"WS PL New Business",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8229,
                        "name":"WS PL Binding",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8237,
                        "name":"WS PL Proof of Insurance",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8244,
                        "name":"WS PL Reinstatement",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8250,
                        "name":"WS PL Cancellation",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8261,
                        "name":"WS PL Endorsement",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8272,
                        "name":"WS PL Claims",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8279,
                        "name":"WS PL Mail",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8296,
                        "name":"CL Renewal",
                        "status":1,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8340,
                        "name":"Sample-G",
                        "status":1,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8370,
                        "name":"Test -2",
                        "status":1,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8380,
                        "name":"TEEHEE",
                        "status":1,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8390,
                        "name":"NSU-AM",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8432,
                        "name":"NSU - Split",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8510,
                        "name":"UW - Renewal",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8520,
                        "name":"UW - Sample 1",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8528,
                        "name":"UW Sam 01",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8540,
                        "name":"sam 03",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8550,
                        "name":"SA Claims",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":8650,
                        "name":"Fast Track",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":9180,
                        "name":"KevinTest",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":9400,
                        "name":"Balesh",
                        "status":1,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":9530,
                        "name":"Balesh WF",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":210310,
                        "name":"Complaints",
                        "status":0,
                        "effectivePermissions":-1
                    },
                    {
                        "buddies":[

                        ],
                        "id":-2147483638,
                        "name":"Diary",
                        "status":0,
                        "effectivePermissions":-1
                    }
                ];
                return JSON.stringify(result);
            }
        }]
};
mocks.push(apiWorkflows);

var accountsCurrent = {
    name: 'accountsCurrent',
    mockRoute: '/api/accounts/current',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [function () {
        var result = {
            "id": 2729177,
            "externalId": "4096fc2e06466b4c9a68b76c65f04050",
            "name": "davissc",
            "friendlyName": "Davis,Scott",
            "type": 0
        };
        return JSON.stringify(result);
    }]
};
mocks.push(accountsCurrent);


/**
 * @api {get} /Workflow/GetTaskAttributes Get Task Attributes
 * @apiName GetTaskAttributes
 * @apiGroup Workflow
 * @apiParam {Long} stepId
 * @apiParam {Long} taskId
 */
var GetTaskAttributes = {
    name: 'GetTaskAttributes',
    mockRoute: '/Workflow/GetTaskAttributes',
    testScope: 'success', //success | fail | error
    testScenario: 'manyAttributes',
    jsonTemplate: [
        {
            manyAttributes: function () {
                return '{' +
                    '"Success":{{boolean}},' +
                    '"Data":{' +
                    '       "Attributes":[{{#repeat 12}}{' +
                    '                   "IntValue":null,' +
                    '                   "IntChoices":null,' +
                    '                   "MaxValue":2147483647,' +
                    '                   "MinValue":-2147483647,' +
                    '                   "Id":14991,' +
                    '                   "ElementType":"ImageRight.WebClientModelsAttributes.IntAttribute",' +
                    '                   "Name":"{{firstName}}-IntegerNone",' +
                    '                   "Description":"{{firstName}} Int None",' +
                    '                   "DisplayName":"{{firstName}} Int None",' +
                    '                   "Value":null,' +
                    '                   "IsMandatory":{{boolean}},' +
                    '                   "Choices":[],' +
                    '                   "IsReadOnly":{{boolean}}' +
                    '           }{{/repeat}}]' +
                    '   }' +
                    '}';
            }
        }, {
            noAttributes: function () {
                return '{' +
                    '"Success":{{boolean}},' +
                    '"Data":{' +
                    '       "Attributes":[]' +
                    '   }' +
                    '}';
            }
        }
    ]
};
mocks.push(GetTaskAttributes);


/**
 * @api {get} /Workflow/SetTaskAttributes Set Task Attributes
 * @apiName SetTaskAttributes
 * @apiGroup Workflow
 * @apiParam {TaskAttributeModel} taskModel TaskAttributeModel is an object of object AttributesModel (AttributesInfo, AttributesModel),
 * long TaskId, long StepId, integer AnchorId
 */
var SetTaskAttributes = {
    name: 'SetTaskAttributes',
    mockRoute: '/Workflow/SetTaskAttributes',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: '{' +
    '"Success":{{boolean}} ' +
    '}'
};
mocks.push(SetTaskAttributes);

/**
 * @api {get} /Workflow/LockTask Lock Task
 * @apiName LockTask
 * @apiGroup Workflow
 * @apiParam {Long} taskId
 * @apiParam {Long} stepId
 */
var LockTask = {
    name: 'LockTask',
    mockRoute: '/Workflow/LockTask',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: '{' +
    '"Success":{{boolean}} ' +
    '}'
};
mocks.push(LockTask);

/**
 * @api {get} /Workflow/UnlockTask Unlock Task
 * @apiName UnlockTask
 * @apiGroup Workflow
 * @apiParam {Long} taskId
 */
var UnlockTask = {
    name: 'UnlockTask',
    mockRoute: '/Workflow/UnlockTask',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: '{' +
    '"Success":{{boolean}} ' +
    '}'
};
mocks.push(UnlockTask);

/**
 * @api {get} /Workflow/UnlockAllTaskLockedCurrentUser Unlock All Task Locked Current User
 * @apiName UnlockAllTaskLockedCurrentUser
 * @apiGroup Workflow
 * @apiParam {Long} fileId
 */
var UnlockAllTaskLockedCurrentUser = {
    name: 'UnlockAllTaskLockedCurrentUser',
    mockRoute: '/Workflow/UnlockAllTaskLockedCurrentUser',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: '{' +
    '"Success":{{boolean}},' +
    '"Data":{' +
    '       "SuccessTaskIds":[],' +
    '       "ErrorTaskIds":[],' +
    '       "OperationResult":0,' +
    '       "Message":null' +
    '   }' +
    '}'
};
mocks.push(UnlockAllTaskLockedCurrentUser);

/**
 * @api {get} /Workflow/RefreshTasks Refresh Tasks
 * @apiName RefreshTasks
 * @apiGroup Workflow
 * @apiParam {Long[]} taskIds
 */
var RefreshTasks = {
    name: 'RefreshTasks',
    mockRoute: '/Workflow/RefreshTasks',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: '{' +
    '"Success":{{boolean}},' +
    '"Data":{' +
    '       "SuccessTaskIds":[{{number 5000}}],' +
    '       "ErrorTaskIds":[],' +
    '       "OperationResult":0,' +
    '       "Message":null' +
    '   }' +
    '}'
};
mocks.push(RefreshTasks);

/**
 * @api {get} /Workflow/ReleaseTask Release Task
 * @apiName ReleaseTask
 * @apiGroup Workflow
 * @apiParam {Long} taskId
 * @apiParam {Long} stepId
 * @apiParam {Integer} anchorId
 * @apiParam {String} description
 */
var ReleaseTask = {
    name: 'ReleaseTask',
    mockRoute: '/Workflow/ReleaseTask',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: '{' +
    '"Success":{{boolean}} ' +
    '}'
};
mocks.push(ReleaseTask);

/**
 * @api {get} /Workflow/GetLinks Get Links
 * @apiName GetLinks
 * @apiGroup Workflow
 * @apiParam {Long} taskId
 * @apiParam {Long} stepId
 */
var GetLinks = {
    name: 'GetLinks',
    mockRoute: '/Workflow/GetLinks',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: '{' +
    '"Success":{{boolean}},' +
    '"Data":[{' +
    '       "AnchorId":1,' +
    '       "Label":"Manual 2"' +
    '   }]' +
    '}'
};
mocks.push(GetLinks);

/**
 * @api {get} /Workflow/GetWorkflowsWithSteps Get Workflows With Steps
 * @apiName GetWorkflowsWithSteps
 * @apiGroup Workflow
 */
var GetWorkflowsWithSteps = {
    name: 'GetWorkflowsWithSteps',
    mockRoute: '/Workflow/GetWorkflowsWithSteps',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: '{' +
    '"Success":true,' +
    '"Data":[{{#repeat 30}}{' +
    '       "Id":"{{number 3000}}",' +
    '       "Name":"3XSIMPLEFLOW",' +
    '       "Steps":[{{#repeat 2}}{' +
    '               "Id":"{{number 3000}}",' +
    '               "Name":"3XMANUAL1"' +
    '           }{{/repeat}}' +
    '           ]' +
    '   }{{/repeat}}' +
    '   ]' +
    '}'
};
mocks.push(GetWorkflowsWithSteps);

/**
 * @api {get} /Workflow/GetWorkflowsWithSteps Get Workflows With Steps
 * @apiName GetWorkflowsWithSteps
 * @apiGroup Workflow
 */
var GetUserData = {
    name: 'GetUserData',
    mockRoute: '/api/users/currentuser/userdata',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [
        function () {
            var templates = {
                "departmentId": null,
                "employeeId": null,
                "address": "1510 Klondike Road, Suite 400, Conyers",
                "workPhone": "770-285-2385",
                "homePhone": null,
                "email": "sdavis@vertafore.com",
                "zipcode": "30094",
                "stateProvince": "GA",
                "country": null,
                "fullName": "Davis,Scott",
                "profileName": null,
                "name": "davissc"
            };

            return JSON.stringify(templates);
        }
    ]
};
mocks.push(GetUserData);

exports.mocks = mocks;