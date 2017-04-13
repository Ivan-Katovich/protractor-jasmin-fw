/**
 * Created by flaterje on 5/13/2014.
 */
var mocks = [];


/**
 * @api {get} /Task/GetAllTasks Get All Tasks
 * @apiName GetAllTasks
 * @apiGroup Task
 * @apiParam {TaskRequest} request TaskRequest is an object of object TaskSortField, object SortOrder, string IdPrefix,
 * integer TotalTasksToReturn, long FileId, boolean LockableTasksOnly, long[] FlowsToFilterBy, long[] StepsToFilterBy,
 * object Assignment, object AvailableDateStart, object AvailableDateEnd, integer Page, integer TasksPerPage
 * @apiParam {Long} taskId
 */
var GetAllTasks = {
    name: 'GetAllTasks',
    mockRoute: '/Task/GetAllTasks',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [
        function() {
            var result = {
                "total":"41",
                "page":1,
                "records":"41",
                "rows":[
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":207,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":202,
                        "StepName":"Manual 3",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1403033983220)\/",
                        "DateInitiated":"\/Date(1403033868783)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"khvashma",
                        "FileId":1053,
                        "FileName":"July 17",
                        "FileNumber":"July 17",
                        "FileTypeId":72,
                        "PageId":null,
                        "ObjectId":1056
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":214,
                        "Description":"1",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1403192757023)\/",
                        "DateInitiated":"\/Date(1403192757023)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1053,
                        "FileName":"July 17",
                        "FileNumber":"July 17",
                        "FileTypeId":72,
                        "PageId":null,
                        "ObjectId":1053
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":240,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":202,
                        "StepName":"Manual 3",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1403884967633)\/",
                        "DateInitiated":"\/Date(1403702046520)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1220,
                        "FileName":"June 25",
                        "FileNumber":"June 25",
                        "FileTypeId":72,
                        "PageId":19625,
                        "ObjectId":1224
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":250,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":202,
                        "StepName":"Manual 3",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1403884975010)\/",
                        "DateInitiated":"\/Date(1403811066070)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1220,
                        "FileName":"June 25",
                        "FileNumber":"June 25",
                        "FileTypeId":72,
                        "PageId":19663,
                        "ObjectId":1224
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":251,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":202,
                        "StepName":"Manual 3",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1403884979010)\/",
                        "DateInitiated":"\/Date(1403813149473)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1220,
                        "FileName":"June 25",
                        "FileNumber":"June 25",
                        "FileTypeId":72,
                        "PageId":19666,
                        "ObjectId":1224
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":258,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":202,
                        "StepName":"Manual 3",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":71,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1403898199253)\/",
                        "DateInitiated":"\/Date(1403890172397)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1315,
                        "FileName":"",
                        "FileNumber":"~D10032",
                        "FileTypeId":74,
                        "PageId":19690,
                        "ObjectId":1317
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":259,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":202,
                        "StepName":"Manual 3",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":71,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1403898195347)\/",
                        "DateInitiated":"\/Date(1403890220243)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1315,
                        "FileName":"",
                        "FileNumber":"~D10032",
                        "FileTypeId":74,
                        "PageId":19701,
                        "ObjectId":1321
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":260,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":202,
                        "StepName":"Manual 3",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":71,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1403898190643)\/",
                        "DateInitiated":"\/Date(1403890511920)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1315,
                        "FileName":"",
                        "FileNumber":"~D10032",
                        "FileTypeId":74,
                        "PageId":19712,
                        "ObjectId":1322
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":343,
                        "Description":"Page 1",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404756134943)\/",
                        "DateInitiated":"\/Date(1404756107867)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1611,
                        "FileName":"Tasks",
                        "FileNumber":"Tasks",
                        "FileTypeId":72,
                        "PageId":26265,
                        "ObjectId":1615
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":344,
                        "Description":"Pahe 1",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404756153837)\/",
                        "DateInitiated":"\/Date(1404756153837)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1611,
                        "FileName":"Tasks",
                        "FileNumber":"Tasks",
                        "FileTypeId":72,
                        "PageId":26265,
                        "ObjectId":1615
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":345,
                        "Description":"Page 1",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404756165243)\/",
                        "DateInitiated":"\/Date(1404756165243)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1611,
                        "FileName":"Tasks",
                        "FileNumber":"Tasks",
                        "FileTypeId":72,
                        "PageId":26265,
                        "ObjectId":1615
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":346,
                        "Description":"Page 1",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404756180090)\/",
                        "DateInitiated":"\/Date(1404756180090)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1611,
                        "FileName":"Tasks",
                        "FileNumber":"Tasks",
                        "FileTypeId":72,
                        "PageId":26265,
                        "ObjectId":1615
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":347,
                        "Description":"Page 2",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404756194403)\/",
                        "DateInitiated":"\/Date(1404756194403)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1611,
                        "FileName":"Tasks",
                        "FileNumber":"Tasks",
                        "FileTypeId":72,
                        "PageId":26264,
                        "ObjectId":1615
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":348,
                        "Description":"Page 2",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404756203700)\/",
                        "DateInitiated":"\/Date(1404756203700)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1611,
                        "FileName":"Tasks",
                        "FileNumber":"Tasks",
                        "FileTypeId":72,
                        "PageId":26264,
                        "ObjectId":1615
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":358,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404829446003)\/",
                        "DateInitiated":"\/Date(1404829446003)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1767,
                        "FileName":"July 8",
                        "FileNumber":"July 8",
                        "FileTypeId":72,
                        "PageId":31322,
                        "ObjectId":1769
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":359,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":70,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404838223870)\/",
                        "DateInitiated":"\/Date(1404838223870)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1775,
                        "FileName":"",
                        "FileNumber":"~D10100",
                        "FileTypeId":73,
                        "PageId":31323,
                        "ObjectId":1777
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":360,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404838490920)\/",
                        "DateInitiated":"\/Date(1404838490920)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1106,
                        "FileName":"18529 Pages",
                        "FileNumber":"18529 Pages",
                        "FileTypeId":72,
                        "PageId":31332,
                        "ObjectId":1524
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":370,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":71,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404841250913)\/",
                        "DateInitiated":"\/Date(1404841250913)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1780,
                        "FileName":"",
                        "FileNumber":"~D10110",
                        "FileTypeId":74,
                        "PageId":31347,
                        "ObjectId":1782
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":371,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":71,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404848939273)\/",
                        "DateInitiated":"\/Date(1404848939273)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1783,
                        "FileName":"July 8a",
                        "FileNumber":"July 8a",
                        "FileTypeId":74,
                        "PageId":31351,
                        "ObjectId":1785
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":372,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":71,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404913939037)\/",
                        "DateInitiated":"\/Date(1404913939037)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"bkandiah",
                        "FileId":1791,
                        "FileName":"July 9",
                        "FileNumber":"July 9",
                        "FileTypeId":74,
                        "PageId":31361,
                        "ObjectId":1793
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":373,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404918731507)\/",
                        "DateInitiated":"\/Date(1404918731507)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1106,
                        "FileName":"18529 Pages",
                        "FileNumber":"18529 Pages",
                        "FileTypeId":72,
                        "PageId":31363,
                        "ObjectId":1795
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":374,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404918778367)\/",
                        "DateInitiated":"\/Date(1404918778367)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1106,
                        "FileName":"18529 Pages",
                        "FileNumber":"18529 Pages",
                        "FileTypeId":72,
                        "PageId":31365,
                        "ObjectId":1796
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":375,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404918855230)\/",
                        "DateInitiated":"\/Date(1404918855230)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1106,
                        "FileName":"18529 Pages",
                        "FileNumber":"18529 Pages",
                        "FileTypeId":72,
                        "PageId":31366,
                        "ObjectId":1796
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":380,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":71,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404929604403)\/",
                        "DateInitiated":"\/Date(1404929604467)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"bkandiah",
                        "FileId":1791,
                        "FileName":"July 9",
                        "FileNumber":"July 9",
                        "FileTypeId":74,
                        "PageId":43088,
                        "ObjectId":1802
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":381,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404929687030)\/",
                        "DateInitiated":"\/Date(1404929687030)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1106,
                        "FileName":"18529 Pages",
                        "FileNumber":"18529 Pages",
                        "FileTypeId":72,
                        "PageId":43100,
                        "ObjectId":1803
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":382,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404936125490)\/",
                        "DateInitiated":"\/Date(1404936125490)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1804,
                        "FileName":"July Large File",
                        "FileNumber":"July LF",
                        "FileTypeId":72,
                        "PageId":43101,
                        "ObjectId":1806
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":383,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404999737983)\/",
                        "DateInitiated":"\/Date(1404999737983)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1804,
                        "FileName":"July Large File",
                        "FileNumber":"July LF",
                        "FileTypeId":72,
                        "PageId":61630,
                        "ObjectId":1808
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":384,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1405003494000)\/",
                        "DateInitiated":"\/Date(1405003494000)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1804,
                        "FileName":"July Large File",
                        "FileNumber":"July LF",
                        "FileTypeId":72,
                        "PageId":80159,
                        "ObjectId":1810
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":385,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1405004009840)\/",
                        "DateInitiated":"\/Date(1405004009840)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1804,
                        "FileName":"July Large File",
                        "FileNumber":"July LF",
                        "FileTypeId":72,
                        "PageId":80176,
                        "ObjectId":1812
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":390,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":71,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1405351155987)\/",
                        "DateInitiated":"\/Date(1405351156017)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1820,
                        "FileName":"",
                        "FileNumber":"July 14",
                        "FileTypeId":74,
                        "PageId":80225,
                        "ObjectId":1822
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":400,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1406210153377)\/",
                        "DateInitiated":"\/Date(1406210153377)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1831,
                        "FileName":"BaleshTest1",
                        "FileNumber":"BaleshTest1",
                        "FileTypeId":72,
                        "PageId":80245,
                        "ObjectId":1833
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":401,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1406213610053)\/",
                        "DateInitiated":"\/Date(1406213610053)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1831,
                        "FileName":"BaleshTest1",
                        "FileNumber":"BaleshTest1",
                        "FileTypeId":72,
                        "PageId":80248,
                        "ObjectId":1835
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":410,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1411409876630)\/",
                        "DateInitiated":"\/Date(1411409876683)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1870,
                        "FileName":"Sept 22",
                        "FileNumber":"Sept 22",
                        "FileTypeId":72,
                        "PageId":80260,
                        "ObjectId":1872
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":411,
                        "Description":"No Description",
                        "Priority":0,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1411410172183)\/",
                        "DateInitiated":"\/Date(1411410172183)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1874,
                        "FileName":"FM Image",
                        "FileNumber":"FM Image",
                        "FileTypeId":72,
                        "PageId":80261,
                        "ObjectId":1876
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":280,
                        "Description":"No Description",
                        "Priority":5,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":200,
                        "StepName":"Manual 1",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":70,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404217741580)\/",
                        "DateInitiated":"\/Date(1404215724193)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1413,
                        "FileName":"",
                        "FileNumber":"~D10050",
                        "FileTypeId":73,
                        "PageId":19745,
                        "ObjectId":1415
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":282,
                        "Description":"No Description",
                        "Priority":5,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":200,
                        "StepName":"Manual 1",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404227497150)\/",
                        "DateInitiated":"\/Date(1404216817287)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1494,
                        "FileName":"TempD10052",
                        "FileNumber":"TempD10052",
                        "FileTypeId":72,
                        "PageId":19803,
                        "ObjectId":1496
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":301,
                        "Description":"No Description",
                        "Priority":5,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":200,
                        "StepName":"Manual 1",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404217858690)\/",
                        "DateInitiated":"\/Date(1404217844253)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1455,
                        "FileName":"",
                        "FileNumber":"~D10070",
                        "FileTypeId":72,
                        "PageId":19785,
                        "ObjectId":1457
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":303,
                        "Description":"No Description",
                        "Priority":5,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":200,
                        "StepName":"Manual 1",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":71,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404225004123)\/",
                        "DateInitiated":"\/Date(1404218280857)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1490,
                        "FileName":"OldTemp",
                        "FileNumber":"OldTemp",
                        "FileTypeId":74,
                        "PageId":19800,
                        "ObjectId":1492
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":310,
                        "Description":"No Description",
                        "Priority":5,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":200,
                        "StepName":"Manual 1",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404227613043)\/",
                        "DateInitiated":"\/Date(1404227090747)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1501,
                        "FileName":"GGG",
                        "FileNumber":"GGG",
                        "FileTypeId":72,
                        "PageId":19806,
                        "ObjectId":1503
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":333,
                        "Description":"Task1",
                        "Priority":5,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":201,
                        "StepName":"Manual 2",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404293308143)\/",
                        "DateInitiated":"\/Date(1404292054623)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"",
                        "FileId":1334,
                        "FileName":"MyFile",
                        "FileNumber":"MyFile",
                        "FileTypeId":72,
                        "PageId":null,
                        "ObjectId":1334
                    },
                    {
                        "Actions":[
                            {
                                "GeneralName":"Select...",
                                "Name":"Select...",
                                "Command":null,
                                "IsAvailable":false,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Lock and Open",
                                "Name":"Lock",
                                "Command":"lock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Release",
                                "Name":"Release",
                                "Command":"release",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Set Task Attributes",
                                "Name":"Set Task Attributes",
                                "Command":"setattr",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Unlock",
                                "Name":"Unlock",
                                "Command":"unlock",
                                "IsAvailable":true,
                                "IsListed":true
                            },
                            {
                                "GeneralName":"Route",
                                "Name":"Route",
                                "Command":"route",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Change Priority",
                                "Name":"Change Priority",
                                "Command":"changepriority",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Kill",
                                "Name":"Kill",
                                "Command":"kill",
                                "IsAvailable":true,
                                "IsListed":false
                            },
                            {
                                "GeneralName":"Return To Sender",
                                "Name":"Return To Sender",
                                "Command":"return",
                                "IsAvailable":true,
                                "IsListed":false
                            }
                        ],
                        "TaskId":335,
                        "Description":"Task3",
                        "Priority":5,
                        "FlowId":198,
                        "FlowName":"Balesh",
                        "StepId":202,
                        "StepName":"Manual 3",
                        "StepType":0,
                        "IsDiary":false,
                        "DrawerId":69,
                        "AttachmentId":null,
                        "NoteId":null,
                        "AssignedTo":"",
                        "Status":"Ready",
                        "AvailableDate":"\/Date(1404294164783)\/",
                        "DateInitiated":"\/Date(1404293510240)\/",
                        "IsLocked":false,
                        "IsMyTask":false,
                        "Locale":"en",
                        "IsLockedByMe":false,
                        "CanBeLockedByMe":true,
                        "LockedByUserName":"ezhovakr",
                        "FileId":1334,
                        "FileName":"MyFile",
                        "FileNumber":"MyFile",
                        "FileTypeId":72,
                        "PageId":null,
                        "ObjectId":1334
                    }
                ],
                "userdata":{
                    "Due":41,
                    "Total":41
                }
            };
            return JSON.stringify(result);
        }]
};
mocks.push(GetAllTasks);



/**
 * @api {get} /Task/GetTasksOnFile Get Tasks On File
 * @apiName GetTasksOnFile
 * @apiGroup Task
 * @apiParam {TaskRequest} request TaskRequest is an object of object TaskSortField, object SortOrder, string IdPrefix,
 * integer TotalTasksToReturn, long FileId, boolean LockableTasksOnly, long[] FlowsToFilterBy, long[] StepsToFilterBy,
 * object Assignment, object AvailableDateStart, object AvailableDateEnd, integer Page, integer TasksPerPage
 * @apiParam {Long} taskId
 */
var GetTasksOnFile = {
    name: 'GetTasksOnFile',
    mockRoute: '/Task/GetTasksOnFile',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: '{' +
    '"total":"8",' +
    '"page":1,' +
    '"records":"8",' +
    '"rows":[{{#repeat 15}}{' +
    '       "Actions":[{{#repeat 10}}{' +
    '               "GeneralName":"Select...",' +
    '               "Name":"Select...",' +
    '               "Command":null,' +
    '               "IsAvailable":{{boolean}},' +
    '               "IsListed":{{boolean}}' +
    '           }{{/repeat}}' +
    '           ],' +
    '       "TaskId": {{number 4000}},' +
    '       "Description":"No Description",' +
    '       "Priority":{{number 4}},' +
    '       "FlowId":{{number 3000}},' +
    '       "FlowName":"{{firstName}}",' +
    '       "StepId":{{number 4000}},' +
    '       "StepName":"Manual {{number 5}}",' +
    '       "StepType":{{number 5}},' +
    '       "IsDiary":false,' +
    '       "DrawerId":{{number 1000}},' +
    '       "AttachmentId":"138327",' +
    '       "NoteId":null,' +
    '       "AssignedTo":"",' +
    '       "Status":"Ready",' +
    '       "AvailableDate":"\/Date(12312312312)\/",' +
    '       "DateInitiated":"\/Date(12312312312)\/",' +
    '       "IsLocked":{{boolean}},' +
    '       "IsMyTask":{{boolean}},' +
    '       "Locale":"en",' +
    '       "IsLockedByMe":{{boolean}},' +
    '       "CanBeLockedByMe":{{boolean}},' +
    '       "LockedByUserName":"bk1",' +
    '       "FileId":{{number 500000}},' +
    '       "FileName":"October 10",' +
    '       "FileNumber":"Oct 10",' +
    '       "FileTypeId":{{number 255}},' +
    '       "PageId":{{number 50000}}' +
    '   }{{/repeat}}' +
    '   ],' +
    '"userdata":{' +
    '       "Due":{{number 10}},' +
    '       "Total":{{number 10}}' +
    '   }' +
    '}'
};
mocks.push(GetTasksOnFile);

/**
 * @api {get} /Task/GetAllDiaries Get All Diaries
 * @apiName GetAllDiaries
 * @apiGroup Task
 * @apiParam {TaskRequest} request TaskRequest is an object of object TaskSortField, object SortOrder, string IdPrefix,
 * integer TotalTasksToReturn, long FileId, boolean LockableTasksOnly, long[] FlowsToFilterBy, long[] StepsToFilterBy,
 * object Assignment, object AvailableDateStart, object AvailableDateEnd, integer Page, integer TasksPerPage
 * @apiParam {Long} taskId
 */
var GetAllDiaries = {
    name: 'GetAllDiaries',
    mockRoute: '/Task/GetAllDiaries',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: '{' +
    '"total":"0",' +
    '"page":1,' +
    '"records":"0",' +
    '"rows":[],' +
    '"userdata":{' +
    '       "Due":0,' +
    '       "Total":0' +
    '   }' +
    '}'
};
mocks.push(GetAllDiaries);

/**
 * @api {get} /Task/GetDiariesOnFile Get Diaries On File
 * @apiName GetDiariesOnFile
 * @apiGroup Task
 * @apiParam {TaskRequest} request TaskRequest is an object of object TaskSortField, object SortOrder, string IdPrefix,
 * integer TotalTasksToReturn, long FileId, boolean LockableTasksOnly, long[] FlowsToFilterBy, long[] StepsToFilterBy,
 * object Assignment, object AvailableDateStart, object AvailableDateEnd, integer Page, integer TasksPerPage
 * @apiParam {Long} taskId
 */
var GetDiariesOnFile = {
    name: 'GetDiariesOnFile',
    mockRoute: '/Task/GetDiariesOnFile',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: '{' +
    '"total":"8",' +
    '"page":1,' +
    '"records":"8",' +
    '"rows":[{{#repeat 15}}{' +
    '       "Actions":[{{#repeat 10}}{' +
    '               "GeneralName":"Select...",' +
    '               "Name":"Select...",' +
    '               "Command":null,' +
    '               "IsAvailable":{{boolean}},' +
    '               "IsListed":{{boolean}}' +
    '           }{{/repeat}}' +
    '           ],' +
    '       "TaskId": {{number 4000}},' +
    '       "Description":"No Description",' +
    '       "Priority":{{number 4}},' +
    '       "FlowId":{{number 3000}},' +
    '       "FlowName":"{{firstName}}",' +
    '       "StepId":{{number 4000}},' +
    '       "StepName":"Manual {{number 5}}",' +
    '       "StepType":{{number 5}},' +
    '       "IsDiary":true,' +
    '       "DrawerId":{{number 1000}},' +
    '       "AttachmentId":"138327",' +
    '       "NoteId":null,' +
    '       "AssignedTo":"",' +
    '       "Status":"Ready",' +
    '       "AvailableDate":"\/Date(12312312312)\/",' +
    '       "DateInitiated":"\/Date(12312312312)\/",' +
    '       "IsLocked":{{boolean}},' +
    '       "IsMyTask":{{boolean}},' +
    '       "Locale":"en",' +
    '       "IsLockedByMe":{{boolean}},' +
    '       "CanBeLockedByMe":{{boolean}},' +
    '       "LockedByUserName":"bk1",' +
    '       "FileId":{{number 500000}},' +
    '       "FileName":"October 10",' +
    '       "FileNumber":"Oct 10",' +
    '       "FileTypeId":{{number 255}},' +
    '       "PageId":{{number 50000}}' +
    '   }{{/repeat}}' +
    '   ],' +
    '"userdata":{' +
    '       "Due":{{number 10}},' +
    '       "Total":{{number 10}}' +
    '   }' +
    '}'
};
mocks.push(GetDiariesOnFile);

var GetTaskFind = {
    name: 'GetTaskFind',
    mockRoute: 'api/files/654461/tasks/find',
    testScope: 'success',
    testScenario: 0,
    jsonTemplate: [
        function() {
            var data = {"items":[{"id":8087,"description":"","priority":1,"fileId":654461,"fileName":"Java the Cup","fileNumber":"0600001","flowId":585,"flowName":"Not Used Ageny Quotes","stepId":592,"stepName":"NEW BUSINESS PROCESSING","senderStep":592,"superTaskId":null,"rendezvousStepId":null,"subTaskIsRequired":false,"noteId":null,"assignedTo":{"id":527380,"externalId":null,"name":"jclayton","friendlyName":"Julie Clayton","type":0,"enabled":false},"sender":{"id":-2,"externalId":null,"name":"Admin","friendlyName":"ImageRight Administrator","type":0,"enabled":false},"lockedBy":null,"availableDate":"2010-01-01T19:43:38.813+00:00","startDate":"2010-01-01T19:43:38.813+00:00","lockExpiration":"0001-01-01T00:00:00+00:00","undoExpires":"0001-01-01T00:00:00+00:00","deadLine":"2015-06-02T21:23:44.393+00:00","dateInitiated":"2010-01-01T19:43:38.813+00:00","debug":false,"stackLevel":null,"errorCode":0,"errorMessage":"","statusDetails":4,"status":0,"pageNumber":129706,"objectId":2724245},{"id":8010,"description":"Endorsement","priority":5,"fileId":654461,"fileName":"Java the Cup","fileNumber":"0600001","flowId":0,"flowName":"Not Used Agency Endorsement","stepId":1,"stepName":"Endorsement Request","senderStep":1,"superTaskId":null,"rendezvousStepId":null,"subTaskIsRequired":false,"noteId":null,"assignedTo":null,"sender":{"id":-2,"externalId":null,"name":"Admin","friendlyName":"ImageRight Administrator","type":0,"enabled":false},"lockedBy":null,"availableDate":"2009-12-31T15:49:56.557+00:00","startDate":"2009-12-31T15:49:56.557+00:00","lockExpiration":"0001-01-01T00:00:00+00:00","undoExpires":"0001-01-01T00:00:00+00:00","deadLine":"0001-01-01T00:00:00+00:00","dateInitiated":"2009-12-31T15:49:56.547+00:00","debug":false,"stackLevel":null,"errorCode":0,"errorMessage":"","statusDetails":0,"status":0,"pageNumber":129633,"objectId":2724237},{"id":8050,"description":"","priority":5,"fileId":654461,"fileName":"Java the Cup","fileNumber":"0600001","flowId":0,"flowName":"Not Used Agency Endorsement","stepId":1,"stepName":"Endorsement Request","senderStep":1,"superTaskId":null,"rendezvousStepId":null,"subTaskIsRequired":false,"noteId":null,"assignedTo":{"id":764453,"externalId":null,"name":"hwalker","friendlyName":"Herschel Walker","type":0,"enabled":false},"sender":{"id":-2,"externalId":null,"name":"Admin","friendlyName":"ImageRight Administrator","type":0,"enabled":false},"lockedBy":null,"availableDate":"2010-01-01T19:37:15.3+00:00","startDate":"2010-01-01T19:37:15.3+00:00","lockExpiration":"0001-01-01T00:00:00+00:00","undoExpires":"0001-01-01T00:00:00+00:00","deadLine":"0001-01-01T00:00:00+00:00","dateInitiated":"2010-01-01T19:37:15.3+00:00","debug":false,"stackLevel":null,"errorCode":0,"errorMessage":"","statusDetails":0,"status":0,"pageNumber":129649,"objectId":2724238}],"nextPageLink":null,"count":3};
            return JSON.stringify(data);
        },
        {
        multipleResults :function() {
                var data = {"items":[{"id":8087,"description":"","priority":1,"fileId":654461,"fileName":"Java the Cup","fileNumber":"0600001","flowId":585,"flowName":"Not Used Ageny Quotes","stepId":592,"stepName":"NEW BUSINESS PROCESSING","senderStep":592,"superTaskId":null,"rendezvousStepId":null,"subTaskIsRequired":false,"noteId":null,"assignedTo":{"id":527380,"externalId":null,"name":"jclayton","friendlyName":"Julie Clayton","type":0,"enabled":false},"sender":{"id":-2,"externalId":null,"name":"Admin","friendlyName":"ImageRight Administrator","type":0,"enabled":false},"lockedBy":null,"availableDate":"2010-01-01T19:43:38.813+00:00","startDate":"2010-01-01T19:43:38.813+00:00","lockExpiration":"0001-01-01T00:00:00+00:00","undoExpires":"0001-01-01T00:00:00+00:00","deadLine":"2015-06-02T21:23:44.393+00:00","dateInitiated":"2010-01-01T19:43:38.813+00:00","debug":false,"stackLevel":null,"errorCode":0,"errorMessage":"","statusDetails":4,"status":0,"pageNumber":129706,"objectId":2724245},{"id":8010,"description":"Endorsement","priority":5,"fileId":654461,"fileName":"Java the Cup","fileNumber":"0600001","flowId":0,"flowName":"Not Used Agency Endorsement","stepId":1,"stepName":"Endorsement Request","senderStep":1,"superTaskId":null,"rendezvousStepId":null,"subTaskIsRequired":false,"noteId":null,"assignedTo":null,"sender":{"id":-2,"externalId":null,"name":"Admin","friendlyName":"ImageRight Administrator","type":0,"enabled":false},"lockedBy":null,"availableDate":"2009-12-31T15:49:56.557+00:00","startDate":"2009-12-31T15:49:56.557+00:00","lockExpiration":"0001-01-01T00:00:00+00:00","undoExpires":"0001-01-01T00:00:00+00:00","deadLine":"0001-01-01T00:00:00+00:00","dateInitiated":"2009-12-31T15:49:56.547+00:00","debug":false,"stackLevel":null,"errorCode":0,"errorMessage":"","statusDetails":0,"status":0,"pageNumber":129633,"objectId":2724237},{"id":8050,"description":"","priority":5,"fileId":654461,"fileName":"Java the Cup","fileNumber":"0600001","flowId":0,"flowName":"Not Used Agency Endorsement","stepId":1,"stepName":"Endorsement Request","senderStep":1,"superTaskId":null,"rendezvousStepId":null,"subTaskIsRequired":false,"noteId":null,"assignedTo":{"id":764453,"externalId":null,"name":"hwalker","friendlyName":"Herschel Walker","type":0,"enabled":false},"sender":{"id":-2,"externalId":null,"name":"Admin","friendlyName":"ImageRight Administrator","type":0,"enabled":false},"lockedBy":null,"availableDate":"2010-01-01T19:37:15.3+00:00","startDate":"2010-01-01T19:37:15.3+00:00","lockExpiration":"0001-01-01T00:00:00+00:00","undoExpires":"0001-01-01T00:00:00+00:00","deadLine":"0001-01-01T00:00:00+00:00","dateInitiated":"2010-01-01T19:37:15.3+00:00","debug":false,"stackLevel":null,"errorCode":0,"errorMessage":"","statusDetails":0,"status":0,"pageNumber":129649,"objectId":2724238}],"nextPageLink":null,"count":3};
                return JSON.stringify(data);
            }
        }
    ]
};
mocks.push(GetTaskFind);


var TasksFind = {
    name: 'TasksFind',
    mockRoute: '/api/tasks/find',
    testScope: 'success', //success | fail | error
    testScenario: 'scenario',
    jsonTemplate: [
        {
            scenario: function () {
                var result =
                {
                    "items":[
                        {
                            "id":4047,
                            "description":"Renewal App - this is an additional task description that needs to be added to the task.",
                            "priority":1,
                            "fileId":1937434,
                            "fileName":"Wilkins Electric Testing for Mocks",
                            "fileNumber":"2106",
                            "flowId":60,
                            "flowName":"CL Submission",
                            "stepId":61,
                            "stepName":"Marketing",
                            "senderStep":56,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":1810,
                                "externalId":null,
                                "name":"mforce",
                                "friendlyName":"Michele Force",
                                "type":0
                            },
                            "lockedBy":{
                                "id":2728651,
                                "externalId":"bd0d7e9ca78aca4198ff4efeb4206da6",
                                "name":"kblazina",
                                "friendlyName":"Blazina,Kevin",
                                "type":0
                            },
                            "availableDate":"2008-07-19T12:36:28.053+00:00",
                            "startDate":"2008-07-19T12:36:28.063+00:00",
                            "lockExpiration":"2015-03-16T15:33:40.33+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-04T12:35:38.843+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"DeadlineDecreasePriority",
                            "status":"Ready",
                            "pageNumber":93157,
                            "objectId":1937458
                        },
                        {
                            "id":4049,
                            "description":"Renewal App",
                            "priority":1,
                            "fileId":1937709,
                            "fileName":"Art of Filming, LLC",
                            "fileNumber":"2107",
                            "flowId":60,
                            "flowName":"CL Submission",
                            "stepId":61,
                            "stepName":"Marketing",
                            "senderStep":56,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":1810,
                                "externalId":null,
                                "name":"mforce",
                                "friendlyName":"Michele Force",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-07-20T17:55:47.977+00:00",
                            "startDate":"2008-07-20T17:55:48.007+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-04T12:35:39.767+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"DeadlineDecreasePriority",
                            "status":"Ready",
                            "pageNumber":93355,
                            "objectId":1937722
                        },
                        {
                            "id":4367,
                            "description":"Pre Renewal Docs",
                            "priority":1,
                            "fileId":1932304,
                            "fileName":"Loganville Heating and Air",
                            "fileNumber":"2100",
                            "flowId":53,
                            "flowName":"WS CL Renewal",
                            "stepId":56,
                            "stepName":"Process Updated Information",
                            "senderStep":55,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":1811,
                                "externalId":null,
                                "name":"sking",
                                "friendlyName":"Stephanie King",
                                "type":0
                            },
                            "lockedBy":{
                                "id":2728651,
                                "externalId":"bd0d7e9ca78aca4198ff4efeb4206da6",
                                "name":"kblazina",
                                "friendlyName":"Blazina,Kevin",
                                "type":0
                            },
                            "availableDate":"2008-08-08T17:57:14.743+00:00",
                            "startDate":"2008-08-08T17:57:14.743+00:00",
                            "lockExpiration":"2015-03-16T15:33:40.95+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-04T12:53:30.717+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":91585,
                            "objectId":1932335
                        },
                        {
                            "id":4399,
                            "description":"Pre Renewal Docs",
                            "priority":1,
                            "fileId":1937709,
                            "fileName":"Art of Filming, LLC",
                            "fileNumber":"2107",
                            "flowId":53,
                            "flowName":"WS CL Renewal",
                            "stepId":55,
                            "stepName":"Gather Renewal Info",
                            "senderStep":54,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":527377,
                                "externalId":null,
                                "name":"mburger",
                                "friendlyName":"Michael Burger ",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-09T06:03:04.12+00:00",
                            "startDate":"2008-08-09T06:03:04.12+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-05T06:02:51.483+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":93550,
                            "objectId":1937743
                        },
                        {
                            "id":4370,
                            "description":"Pre Renewal Docs",
                            "priority":1,
                            "fileId":1936576,
                            "fileName":"Global Com",
                            "fileNumber":"2103",
                            "flowId":53,
                            "flowName":"WS CL Renewal",
                            "stepId":56,
                            "stepName":"Process Updated Information",
                            "senderStep":55,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":527380,
                                "externalId":null,
                                "name":"jclayton",
                                "friendlyName":"Julie Clayton",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-09T12:00:10.223+00:00",
                            "startDate":"2008-08-09T12:00:10.223+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-04T12:53:32.17+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":92474,
                            "objectId":1936600
                        },
                        {
                            "id":4378,
                            "description":"Pre Renewal Docs",
                            "priority":1,
                            "fileId":1937709,
                            "fileName":"Art of Filming, LLC",
                            "fileNumber":"2107",
                            "flowId":53,
                            "flowName":"WS CL Renewal",
                            "stepId":56,
                            "stepName":"Process Updated Information",
                            "senderStep":55,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":527380,
                                "externalId":null,
                                "name":"jclayton",
                                "friendlyName":"Julie Clayton",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-09T12:00:10.313+00:00",
                            "startDate":"2008-08-09T12:00:10.313+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-04T12:53:35.767+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":93501,
                            "objectId":1937741
                        },
                        {
                            "id":4385,
                            "description":"Pre Renewal Docs",
                            "priority":1,
                            "fileId":1938842,
                            "fileName":"Ray's Autos",
                            "fileNumber":"2110",
                            "flowId":53,
                            "flowName":"WS CL Renewal",
                            "stepId":56,
                            "stepName":"Process Updated Information",
                            "senderStep":55,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":764453,
                                "externalId":null,
                                "name":"hwalker",
                                "friendlyName":"Herschel Walker",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-09T12:00:10.463+00:00",
                            "startDate":"2008-08-09T12:00:10.463+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-04T12:53:39.27+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":94260,
                            "objectId":1938876
                        },
                        {
                            "id":2828,
                            "description":"Please Review: Audit Payment Not Received",
                            "priority":1,
                            "fileId":1944054,
                            "fileName":"Lisa Fetrow",
                            "fileNumber":"2210",
                            "flowId":87,
                            "flowName":"WS CL Audit",
                            "stepId":88,
                            "stepName":"Audit Process",
                            "senderStep":90,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-11T12:29:23.997+00:00",
                            "startDate":"2008-08-12T11:37:20.657+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-13T13:04:18.843+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":98530,
                            "objectId":1944075
                        },
                        {
                            "id":2856,
                            "description":"Please Review: Audit Payment Not Received",
                            "priority":1,
                            "fileId":1952763,
                            "fileName":"Metro Construction",
                            "fileNumber":"2109",
                            "flowId":87,
                            "flowName":"WS CL Audit",
                            "stepId":88,
                            "stepName":"Audit Process",
                            "senderStep":90,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-11T12:29:32.8+00:00",
                            "startDate":"2008-08-11T12:29:40.43+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-13T13:05:08.213+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":105041,
                            "objectId":1952782
                        },
                        {
                            "id":3075,
                            "description":"Please follow up",
                            "priority":1,
                            "fileId":1949843,
                            "fileName":"Brian Evans",
                            "fileNumber":"2110",
                            "flowId":540,
                            "flowName":"UW_New Business",
                            "stepId":547,
                            "stepName":"Mail Policy",
                            "senderStep":546,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":527380,
                                "externalId":null,
                                "name":"jclayton",
                                "friendlyName":"Julie Clayton",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-11T14:39:24.71+00:00",
                            "startDate":"2008-08-11T14:39:24.71+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-07T12:22:25.567+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":100397,
                            "objectId":1949846
                        },
                        {
                            "id":2424,
                            "description":"Please review and Process",
                            "priority":1,
                            "fileId":2416,
                            "fileName":"A-1 Roofing & Stucco",
                            "fileNumber":"A1R100",
                            "flowId":87,
                            "flowName":"WS CL Audit",
                            "stepId":90,
                            "stepName":"Wait for Payment",
                            "senderStep":88,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":527380,
                                "externalId":null,
                                "name":"jclayton",
                                "friendlyName":"Julie Clayton",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-11T17:08:00.763+00:00",
                            "startDate":"2008-08-11T17:08:00.763+00:00",
                            "lockExpiration":"2013-11-06T16:43:18.523+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-07T13:01:39.323+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":285,
                            "objectId":3493
                        },
                        {
                            "id":2052,
                            "description":"Please Review: Audit Payment Not Received",
                            "priority":1,
                            "fileId":2425,
                            "fileName":"Design Right Printing",
                            "fileNumber":"DESIG-1",
                            "flowId":87,
                            "flowName":"WS CL Audit",
                            "stepId":88,
                            "stepName":"Audit Process",
                            "senderStep":90,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-14T12:27:35.583+00:00",
                            "startDate":"2008-08-14T12:27:40.7+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-05T12:11:29.557+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":6643,
                            "objectId":326618
                        },
                        {
                            "id":2029,
                            "description":"Please Review: Audit Payment Not Received",
                            "priority":1,
                            "fileId":2415,
                            "fileName":"Murray Builders LLC",
                            "fileNumber":"MUR100",
                            "flowId":87,
                            "flowName":"WS CL Audit",
                            "stepId":88,
                            "stepName":"Audit Process",
                            "senderStep":90,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-14T15:25:37.493+00:00",
                            "startDate":"2008-08-14T15:25:38.023+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-04T12:01:33.017+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":134706,
                            "objectId":2725313
                        },
                        {
                            "id":8473,
                            "description":"Bo's Task",
                            "priority":1,
                            "fileId":2727080,
                            "fileName":"Alanzo Smith",
                            "fileNumber":"ALL456",
                            "flowId":7190,
                            "flowName":"Claims New Loss",
                            "stepId":7192,
                            "stepName":"Loss Reporting",
                            "senderStep":7191,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-2,
                                "externalId":null,
                                "name":"Admin",
                                "friendlyName":"ImageRight Administrator",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2012-04-06T16:56:42.673+00:00",
                            "startDate":"2012-04-06T16:56:43.86+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2012-03-23T18:21:14+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":138629,
                            "objectId":2727754
                        },
                        {
                            "id":8601,
                            "description":"go.......",
                            "priority":1,
                            "fileId":2727923,
                            "fileName":"A00000XX9999999",
                            "fileNumber":"A00000XX9999999",
                            "flowId":8550,
                            "flowName":"SA Claims",
                            "stepId":8561,
                            "stepName":"Adjuster",
                            "senderStep":8599,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2012-05-09T02:15:44.683+00:00",
                            "startDate":"2012-05-09T02:15:49.673+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2012-05-09T02:14:30.667+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":138980,
                            "objectId":2728063
                        },
                        {
                            "id":8637,
                            "description":"Tip top",
                            "priority":1,
                            "fileId":2727923,
                            "fileName":"A00000XX9999999",
                            "fileNumber":"A00000XX9999999",
                            "flowId":8550,
                            "flowName":"SA Claims",
                            "stepId":8561,
                            "stepName":"Adjuster",
                            "senderStep":8599,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2012-05-11T00:55:19.48+00:00",
                            "startDate":"2012-05-11T00:55:21.2+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2012-05-11T00:26:09.663+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":139086,
                            "objectId":2728201
                        },
                        {
                            "id":8642,
                            "description":"New Mail - 2nd",
                            "priority":1,
                            "fileId":2727923,
                            "fileName":"A00000XX9999999",
                            "fileNumber":"A00000XX9999999",
                            "flowId":8550,
                            "flowName":"SA Claims",
                            "stepId":8561,
                            "stepName":"Adjuster",
                            "senderStep":8599,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2012-05-11T01:15:04.153+00:00",
                            "startDate":"2012-05-11T01:15:05.597+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2012-05-11T01:06:58.753+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":139093,
                            "objectId":2728216
                        },
                        {
                            "id":8621,
                            "description":"New Mail",
                            "priority":1,
                            "fileId":2727923,
                            "fileName":"A00000XX9999999",
                            "fileNumber":"A00000XX9999999",
                            "flowId":8550,
                            "flowName":"SA Claims",
                            "stepId":8562,
                            "stepName":"Admin",
                            "senderStep":8599,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2012-05-11T15:42:56.843+00:00",
                            "startDate":"2012-05-11T15:43:04.05+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2012-05-09T20:20:00.533+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":139111,
                            "objectId":2728237
                        },
                        {
                            "id":8622,
                            "description":"New Mail",
                            "priority":1,
                            "fileId":2727923,
                            "fileName":"A00000XX9999999",
                            "fileNumber":"A00000XX9999999",
                            "flowId":8550,
                            "flowName":"SA Claims",
                            "stepId":8562,
                            "stepName":"Admin",
                            "senderStep":8599,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2012-05-11T15:42:56.88+00:00",
                            "startDate":"2012-05-11T15:43:04.11+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2012-05-09T20:20:00.713+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":139107,
                            "objectId":2728235
                        },
                        {
                            "id":8623,
                            "description":"New Mail",
                            "priority":1,
                            "fileId":2727923,
                            "fileName":"A00000XX9999999",
                            "fileNumber":"A00000XX9999999",
                            "flowId":8550,
                            "flowName":"SA Claims",
                            "stepId":8562,
                            "stepName":"Admin",
                            "senderStep":8599,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2012-05-11T15:42:56.893+00:00",
                            "startDate":"2012-05-11T15:43:04.17+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2012-05-09T20:20:00.83+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":139106,
                            "objectId":2728234
                        },
                        {
                            "id":8624,
                            "description":"New Mail",
                            "priority":1,
                            "fileId":2727923,
                            "fileName":"A00000XX9999999",
                            "fileNumber":"A00000XX9999999",
                            "flowId":8550,
                            "flowName":"SA Claims",
                            "stepId":8562,
                            "stepName":"Admin",
                            "senderStep":8599,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2012-05-11T15:42:56.903+00:00",
                            "startDate":"2012-05-11T15:43:03.987+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2012-05-09T20:20:00.953+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":139109,
                            "objectId":2728236
                        },
                        {
                            "id":4333,
                            "description":"Submission",
                            "priority":1,
                            "fileId":1936851,
                            "fileName":"Customs Shipping",
                            "fileNumber":"2104",
                            "flowId":60,
                            "flowName":"CL Submission",
                            "stepId":123,
                            "stepName":"Wait for Carrier Response",
                            "senderStep":61,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":2728566,
                                "externalId":"cac75f70bcc91744919f1917a96479c2",
                                "name":"vmuniswamy",
                                "friendlyName":"Muniswamy,Vijay",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2013-12-18T19:42:28.073+00:00",
                            "startDate":"2013-12-18T19:42:28.073+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-03T12:06:57.087+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":92697,
                            "objectId":1936877
                        },
                        {
                            "id":4339,
                            "description":"Submission",
                            "priority":1,
                            "fileId":1937709,
                            "fileName":"Art of Filming, LLC",
                            "fileNumber":"2107",
                            "flowId":60,
                            "flowName":"CL Submission",
                            "stepId":64,
                            "stepName":"Wait for Quotes",
                            "senderStep":61,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":2728651,
                                "externalId":"bd0d7e9ca78aca4198ff4efeb4206da6",
                                "name":"kblazina",
                                "friendlyName":"Blazina,Kevin",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2015-02-23T15:24:40.377+00:00",
                            "startDate":"2015-02-23T15:24:41.187+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-03T12:07:00.763+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":93419,
                            "objectId":1937734
                        },
                        {
                            "id":8950,
                            "description":"",
                            "priority":1,
                            "fileId":2725679,
                            "fileName":"Sarah J Alexander",
                            "fileNumber":"13",
                            "flowId":60,
                            "flowName":"CL Submission",
                            "stepId":61,
                            "stepName":"Marketing",
                            "senderStep":61,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":2729184,
                                "externalId":"a5d9fb006f52a9419f8c1e1d7625bd70",
                                "name":"bkandiah",
                                "friendlyName":"Kandiah,Balesh",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2015-02-26T21:57:12.253+00:00",
                            "startDate":"2015-02-26T21:57:12.253+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"2015-03-19T22:20:44.72+00:00",
                            "dateInitiated":"2015-02-26T21:57:12.253+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"DeadlineDecreasePriority",
                            "status":"Ready",
                            "pageNumber":147159,
                            "objectId":2730747
                        },
                        {
                            "id":8951,
                            "description":"",
                            "priority":1,
                            "fileId":2725679,
                            "fileName":"Sarah J Alexander",
                            "fileNumber":"13",
                            "flowId":60,
                            "flowName":"CL Submission",
                            "stepId":61,
                            "stepName":"Marketing",
                            "senderStep":61,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":2729184,
                                "externalId":"a5d9fb006f52a9419f8c1e1d7625bd70",
                                "name":"bkandiah",
                                "friendlyName":"Kandiah,Balesh",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2015-02-26T21:57:14.33+00:00",
                            "startDate":"2015-02-26T21:57:14.33+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"2015-03-19T21:57:14.447+00:00",
                            "dateInitiated":"2015-02-26T21:57:14.33+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"DeadlineDecreasePriority",
                            "status":"Ready",
                            "pageNumber":147158,
                            "objectId":2730746
                        }
                    ],
                    "nextPageLink":null,
                    "count":1000
                };
                return JSON.stringify(result);
            }
        },
        {
            multipleResults: function(){

                var result =
                {
                    "items":[
                        {
                            "id":4047,
                            "description":"Renewal App - this is an additional task description that needs to be added to the task.",
                            "priority":1,
                            "fileId":1937434,
                            "fileName":"Wilkins Electric",
                            "fileNumber":"2106",
                            "flowId":60,
                            "flowName":"CL Submission",
                            "stepId":61,
                            "stepName":"Marketing",
                            "senderStep":56,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":1810,
                                "externalId":null,
                                "name":"mforce",
                                "friendlyName":"Michele Force",
                                "type":0
                            },
                            "lockedBy":{
                                "id":2728651,
                                "externalId":"bd0d7e9ca78aca4198ff4efeb4206da6",
                                "name":"kblazina",
                                "friendlyName":"Blazina,Kevin",
                                "type":0
                            },
                            "availableDate":"2008-07-19T12:36:28.053+00:00",
                            "startDate":"2008-07-19T12:36:28.063+00:00",
                            "lockExpiration":"2015-03-16T15:33:40.33+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-04T12:35:38.843+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"DeadlineDecreasePriority",
                            "status":"Ready",
                            "pageNumber":93157,
                            "objectId":1937458
                        },
                        {
                            "id":4049,
                            "description":"Renewal App",
                            "priority":1,
                            "fileId":1937709,
                            "fileName":"Art of Filming, LLC",
                            "fileNumber":"2107",
                            "flowId":60,
                            "flowName":"CL Submission",
                            "stepId":61,
                            "stepName":"Marketing",
                            "senderStep":56,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":1810,
                                "externalId":null,
                                "name":"mforce",
                                "friendlyName":"Michele Force",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-07-20T17:55:47.977+00:00",
                            "startDate":"2008-07-20T17:55:48.007+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-04T12:35:39.767+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"DeadlineDecreasePriority",
                            "status":"Ready",
                            "pageNumber":93355,
                            "objectId":1937722
                        },
                        {
                            "id":4367,
                            "description":"Pre Renewal Docs",
                            "priority":1,
                            "fileId":1932304,
                            "fileName":"Loganville Heating and Air",
                            "fileNumber":"2100",
                            "flowId":53,
                            "flowName":"WS CL Renewal",
                            "stepId":56,
                            "stepName":"Process Updated Information",
                            "senderStep":55,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":1811,
                                "externalId":null,
                                "name":"sking",
                                "friendlyName":"Stephanie King",
                                "type":0
                            },
                            "lockedBy":{
                                "id":2728651,
                                "externalId":"bd0d7e9ca78aca4198ff4efeb4206da6",
                                "name":"kblazina",
                                "friendlyName":"Blazina,Kevin",
                                "type":0
                            },
                            "availableDate":"2008-08-08T17:57:14.743+00:00",
                            "startDate":"2008-08-08T17:57:14.743+00:00",
                            "lockExpiration":"2015-03-16T15:33:40.95+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-04T12:53:30.717+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":91585,
                            "objectId":1932335
                        },
                        {
                            "id":4399,
                            "description":"Pre Renewal Docs",
                            "priority":1,
                            "fileId":1937709,
                            "fileName":"Art of Filming, LLC",
                            "fileNumber":"2107",
                            "flowId":53,
                            "flowName":"WS CL Renewal",
                            "stepId":55,
                            "stepName":"Gather Renewal Info",
                            "senderStep":54,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":527377,
                                "externalId":null,
                                "name":"mburger",
                                "friendlyName":"Michael Burger ",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-09T06:03:04.12+00:00",
                            "startDate":"2008-08-09T06:03:04.12+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-05T06:02:51.483+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":93550,
                            "objectId":1937743
                        },
                        {
                            "id":4370,
                            "description":"Pre Renewal Docs",
                            "priority":1,
                            "fileId":1936576,
                            "fileName":"Global Com",
                            "fileNumber":"2103",
                            "flowId":53,
                            "flowName":"WS CL Renewal",
                            "stepId":56,
                            "stepName":"Process Updated Information",
                            "senderStep":55,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":527380,
                                "externalId":null,
                                "name":"jclayton",
                                "friendlyName":"Julie Clayton",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-09T12:00:10.223+00:00",
                            "startDate":"2008-08-09T12:00:10.223+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-04T12:53:32.17+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":92474,
                            "objectId":1936600
                        },
                        {
                            "id":4378,
                            "description":"Pre Renewal Docs",
                            "priority":1,
                            "fileId":1937709,
                            "fileName":"Art of Filming, LLC",
                            "fileNumber":"2107",
                            "flowId":53,
                            "flowName":"WS CL Renewal",
                            "stepId":56,
                            "stepName":"Process Updated Information",
                            "senderStep":55,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":527380,
                                "externalId":null,
                                "name":"jclayton",
                                "friendlyName":"Julie Clayton",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-09T12:00:10.313+00:00",
                            "startDate":"2008-08-09T12:00:10.313+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-04T12:53:35.767+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":93501,
                            "objectId":1937741
                        },
                        {
                            "id":4385,
                            "description":"Pre Renewal Docs",
                            "priority":1,
                            "fileId":1938842,
                            "fileName":"Ray's Autos",
                            "fileNumber":"2110",
                            "flowId":53,
                            "flowName":"WS CL Renewal",
                            "stepId":56,
                            "stepName":"Process Updated Information",
                            "senderStep":55,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":764453,
                                "externalId":null,
                                "name":"hwalker",
                                "friendlyName":"Herschel Walker",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-09T12:00:10.463+00:00",
                            "startDate":"2008-08-09T12:00:10.463+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-04T12:53:39.27+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":94260,
                            "objectId":1938876
                        },
                        {
                            "id":2828,
                            "description":"Please Review: Audit Payment Not Received",
                            "priority":1,
                            "fileId":1944054,
                            "fileName":"Lisa Fetrow",
                            "fileNumber":"2210",
                            "flowId":87,
                            "flowName":"WS CL Audit",
                            "stepId":88,
                            "stepName":"Audit Process",
                            "senderStep":90,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-11T12:29:23.997+00:00",
                            "startDate":"2008-08-12T11:37:20.657+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-13T13:04:18.843+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":98530,
                            "objectId":1944075
                        },
                        {
                            "id":2856,
                            "description":"Please Review: Audit Payment Not Received",
                            "priority":1,
                            "fileId":1952763,
                            "fileName":"Metro Construction",
                            "fileNumber":"2109",
                            "flowId":87,
                            "flowName":"WS CL Audit",
                            "stepId":88,
                            "stepName":"Audit Process",
                            "senderStep":90,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-11T12:29:32.8+00:00",
                            "startDate":"2008-08-11T12:29:40.43+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-13T13:05:08.213+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":105041,
                            "objectId":1952782
                        },
                        {
                            "id":3075,
                            "description":"Please follow up",
                            "priority":1,
                            "fileId":1949843,
                            "fileName":"Brian Evans",
                            "fileNumber":"2110",
                            "flowId":540,
                            "flowName":"UW_New Business",
                            "stepId":547,
                            "stepName":"Mail Policy",
                            "senderStep":546,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":527380,
                                "externalId":null,
                                "name":"jclayton",
                                "friendlyName":"Julie Clayton",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-11T14:39:24.71+00:00",
                            "startDate":"2008-08-11T14:39:24.71+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-07T12:22:25.567+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":100397,
                            "objectId":1949846
                        },
                        {
                            "id":2424,
                            "description":"Please review and Process",
                            "priority":1,
                            "fileId":2416,
                            "fileName":"A-1 Roofing & Stucco",
                            "fileNumber":"A1R100",
                            "flowId":87,
                            "flowName":"WS CL Audit",
                            "stepId":90,
                            "stepName":"Wait for Payment",
                            "senderStep":88,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":527380,
                                "externalId":null,
                                "name":"jclayton",
                                "friendlyName":"Julie Clayton",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-11T17:08:00.763+00:00",
                            "startDate":"2008-08-11T17:08:00.763+00:00",
                            "lockExpiration":"2013-11-06T16:43:18.523+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-07T13:01:39.323+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":285,
                            "objectId":3493
                        },
                        {
                            "id":2052,
                            "description":"Please Review: Audit Payment Not Received",
                            "priority":1,
                            "fileId":2425,
                            "fileName":"Design Right Printing",
                            "fileNumber":"DESIG-1",
                            "flowId":87,
                            "flowName":"WS CL Audit",
                            "stepId":88,
                            "stepName":"Audit Process",
                            "senderStep":90,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-14T12:27:35.583+00:00",
                            "startDate":"2008-08-14T12:27:40.7+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-05T12:11:29.557+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":6643,
                            "objectId":326618
                        },
                        {
                            "id":2029,
                            "description":"Please Review: Audit Payment Not Received",
                            "priority":1,
                            "fileId":2415,
                            "fileName":"Murray Builders LLC",
                            "fileNumber":"MUR100",
                            "flowId":87,
                            "flowName":"WS CL Audit",
                            "stepId":88,
                            "stepName":"Audit Process",
                            "senderStep":90,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2008-08-14T15:25:37.493+00:00",
                            "startDate":"2008-08-14T15:25:38.023+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-04T12:01:33.017+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":134706,
                            "objectId":2725313
                        },
                        {
                            "id":8473,
                            "description":"Bo's Task",
                            "priority":1,
                            "fileId":2727080,
                            "fileName":"Alanzo Smith",
                            "fileNumber":"ALL456",
                            "flowId":7190,
                            "flowName":"Claims New Loss",
                            "stepId":7192,
                            "stepName":"Loss Reporting",
                            "senderStep":7191,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-2,
                                "externalId":null,
                                "name":"Admin",
                                "friendlyName":"ImageRight Administrator",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2012-04-06T16:56:42.673+00:00",
                            "startDate":"2012-04-06T16:56:43.86+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2012-03-23T18:21:14+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":138629,
                            "objectId":2727754
                        },
                        {
                            "id":8601,
                            "description":"go.......",
                            "priority":1,
                            "fileId":2727923,
                            "fileName":"A00000XX9999999",
                            "fileNumber":"A00000XX9999999",
                            "flowId":8550,
                            "flowName":"SA Claims",
                            "stepId":8561,
                            "stepName":"Adjuster",
                            "senderStep":8599,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2012-05-09T02:15:44.683+00:00",
                            "startDate":"2012-05-09T02:15:49.673+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2012-05-09T02:14:30.667+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":138980,
                            "objectId":2728063
                        },
                        {
                            "id":8637,
                            "description":"Tip top",
                            "priority":1,
                            "fileId":2727923,
                            "fileName":"A00000XX9999999",
                            "fileNumber":"A00000XX9999999",
                            "flowId":8550,
                            "flowName":"SA Claims",
                            "stepId":8561,
                            "stepName":"Adjuster",
                            "senderStep":8599,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2012-05-11T00:55:19.48+00:00",
                            "startDate":"2012-05-11T00:55:21.2+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2012-05-11T00:26:09.663+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":139086,
                            "objectId":2728201
                        },
                        {
                            "id":8642,
                            "description":"New Mail - 2nd",
                            "priority":1,
                            "fileId":2727923,
                            "fileName":"A00000XX9999999",
                            "fileNumber":"A00000XX9999999",
                            "flowId":8550,
                            "flowName":"SA Claims",
                            "stepId":8561,
                            "stepName":"Adjuster",
                            "senderStep":8599,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2012-05-11T01:15:04.153+00:00",
                            "startDate":"2012-05-11T01:15:05.597+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2012-05-11T01:06:58.753+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":139093,
                            "objectId":2728216
                        },
                        {
                            "id":8621,
                            "description":"New Mail",
                            "priority":1,
                            "fileId":2727923,
                            "fileName":"A00000XX9999999",
                            "fileNumber":"A00000XX9999999",
                            "flowId":8550,
                            "flowName":"SA Claims",
                            "stepId":8562,
                            "stepName":"Admin",
                            "senderStep":8599,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2012-05-11T15:42:56.843+00:00",
                            "startDate":"2012-05-11T15:43:04.05+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2012-05-09T20:20:00.533+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":139111,
                            "objectId":2728237
                        },
                        {
                            "id":8622,
                            "description":"New Mail",
                            "priority":1,
                            "fileId":2727923,
                            "fileName":"A00000XX9999999",
                            "fileNumber":"A00000XX9999999",
                            "flowId":8550,
                            "flowName":"SA Claims",
                            "stepId":8562,
                            "stepName":"Admin",
                            "senderStep":8599,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2012-05-11T15:42:56.88+00:00",
                            "startDate":"2012-05-11T15:43:04.11+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2012-05-09T20:20:00.713+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":139107,
                            "objectId":2728235
                        },
                        {
                            "id":8623,
                            "description":"New Mail",
                            "priority":1,
                            "fileId":2727923,
                            "fileName":"A00000XX9999999",
                            "fileNumber":"A00000XX9999999",
                            "flowId":8550,
                            "flowName":"SA Claims",
                            "stepId":8562,
                            "stepName":"Admin",
                            "senderStep":8599,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2012-05-11T15:42:56.893+00:00",
                            "startDate":"2012-05-11T15:43:04.17+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2012-05-09T20:20:00.83+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":139106,
                            "objectId":2728234
                        },
                        {
                            "id":8624,
                            "description":"New Mail",
                            "priority":1,
                            "fileId":2727923,
                            "fileName":"A00000XX9999999",
                            "fileNumber":"A00000XX9999999",
                            "flowId":8550,
                            "flowName":"SA Claims",
                            "stepId":8562,
                            "stepName":"Admin",
                            "senderStep":8599,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":-4,
                                "externalId":null,
                                "name":"Internal",
                                "friendlyName":"Internal server account",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2012-05-11T15:42:56.903+00:00",
                            "startDate":"2012-05-11T15:43:03.987+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2012-05-09T20:20:00.953+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":139109,
                            "objectId":2728236
                        },
                        {
                            "id":4333,
                            "description":"Submission",
                            "priority":1,
                            "fileId":1936851,
                            "fileName":"Customs Shipping",
                            "fileNumber":"2104",
                            "flowId":60,
                            "flowName":"CL Submission",
                            "stepId":123,
                            "stepName":"Wait for Carrier Response",
                            "senderStep":61,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":2728566,
                                "externalId":"cac75f70bcc91744919f1917a96479c2",
                                "name":"vmuniswamy",
                                "friendlyName":"Muniswamy,Vijay",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2013-12-18T19:42:28.073+00:00",
                            "startDate":"2013-12-18T19:42:28.073+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-03T12:06:57.087+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":92697,
                            "objectId":1936877
                        },
                        {
                            "id":4339,
                            "description":"Submission",
                            "priority":1,
                            "fileId":1937709,
                            "fileName":"Art of Filming, LLC",
                            "fileNumber":"2107",
                            "flowId":60,
                            "flowName":"CL Submission",
                            "stepId":64,
                            "stepName":"Wait for Quotes",
                            "senderStep":61,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":2728651,
                                "externalId":"bd0d7e9ca78aca4198ff4efeb4206da6",
                                "name":"kblazina",
                                "friendlyName":"Blazina,Kevin",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2015-02-23T15:24:40.377+00:00",
                            "startDate":"2015-02-23T15:24:41.187+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"0001-01-01T00:00:00+00:00",
                            "dateInitiated":"2009-06-03T12:07:00.763+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"None",
                            "status":"Ready",
                            "pageNumber":93419,
                            "objectId":1937734
                        },
                        {
                            "id":8950,
                            "description":"",
                            "priority":1,
                            "fileId":2725679,
                            "fileName":"Sarah J Alexander",
                            "fileNumber":"13",
                            "flowId":60,
                            "flowName":"CL Submission",
                            "stepId":61,
                            "stepName":"Marketing",
                            "senderStep":61,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":2729184,
                                "externalId":"a5d9fb006f52a9419f8c1e1d7625bd70",
                                "name":"bkandiah",
                                "friendlyName":"Kandiah,Balesh",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2015-02-26T21:57:12.253+00:00",
                            "startDate":"2015-02-26T21:57:12.253+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"2015-03-19T22:20:44.72+00:00",
                            "dateInitiated":"2015-02-26T21:57:12.253+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"DeadlineDecreasePriority",
                            "status":"Ready",
                            "pageNumber":147159,
                            "objectId":2730747
                        },
                        {
                            "id":8951,
                            "description":"",
                            "priority":1,
                            "fileId":2725679,
                            "fileName":"Sarah J Alexander",
                            "fileNumber":"13",
                            "flowId":60,
                            "flowName":"CL Submission",
                            "stepId":61,
                            "stepName":"Marketing",
                            "senderStep":61,
                            "superTaskId":null,
                            "rendezvousStepId":null,
                            "subTaskIsRequired":false,
                            "noteId":null,
                            "assignedTo":null,
                            "sender":{
                                "id":2729184,
                                "externalId":"a5d9fb006f52a9419f8c1e1d7625bd70",
                                "name":"bkandiah",
                                "friendlyName":"Kandiah,Balesh",
                                "type":0
                            },
                            "lockedBy":null,
                            "availableDate":"2015-02-26T21:57:14.33+00:00",
                            "startDate":"2015-02-26T21:57:14.33+00:00",
                            "lockExpiration":"0001-01-01T00:00:00+00:00",
                            "undoExpires":"0001-01-01T00:00:00+00:00",
                            "deadLine":"2015-03-19T21:57:14.447+00:00",
                            "dateInitiated":"2015-02-26T21:57:14.33+00:00",
                            "debug":false,
                            "stackLevel":null,
                            "errorCode":"None",
                            "errorMessage":"",
                            "statusDetails":"DeadlineDecreasePriority",
                            "status":"Ready",
                            "pageNumber":147158,
                            "objectId":2730746
                        }
                    ],
                    "nextPageLink":null,
                    "count":1000
                };
                return JSON.stringify(result);

            }
        }
    ]

};
mocks.push(TasksFind);

var GetPriorities = {
    name: 'GetPriorities',
    mockRoute: '\/api\/steps\/.*\/priorities',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [ function(){
        return '[0,1,2,3,4,5,6,7,8,9]';
    }],


};
mocks.push(GetPriorities);

var GetUserSteps = {
    name: 'GetUserSteps',
    mockRoute: '\/api\/steps\/.*\/users',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [ function(){
        var result = [
            {
                "id":2729184,
                "externalId":"a5d9fb006f52a9419f8c1e1d7625bd70",
                "name":"bkandiah",
                "friendlyName":"Kandiah,Balesh",
                "type":0
            },
            {
                "id":2729604,
                "externalId":"e2742e131d6e4a439b5baabb503ff9db",
                "name":"CON - Scrum ZAK",
                "friendlyName":"CON - Scrum ZAK",
                "type":1
            },
            {
                "id":2729690,
                "externalId":"04f716ece8419c41844f3a686b24678d",
                "name":"barnweja",
                "friendlyName":"Barnwell,Jamie",
                "type":0
            },
            {
                "id":2729617,
                "externalId":"50e01f71ae36f243a2a4d50a6d985ac5",
                "name":"dewolfyu",
                "friendlyName":"DeWolf,Yuehli",
                "type":0
            },
            {
                "id":2729172,
                "externalId":"9c1d61daf9456445b8da759123cc3e0b",
                "name":"flaterje",
                "friendlyName":"Flater,Jeff",
                "type":0
            },
            {
                "id":2729175,
                "externalId":"d429968d80ad8041a9a7fda479121f88",
                "name":"badhekna",
                "friendlyName":"Badheka,Nandan",
                "type":0
            },
            {
                "id":2729177,
                "externalId":"4096fc2e06466b4c9a68b76c65f04050",
                "name":"davissc",
                "friendlyName":"Davis,Scott",
                "type":0
            },
            {
                "id":2728651,
                "externalId":"bd0d7e9ca78aca4198ff4efeb4206da6",
                "name":"kblazina",
                "friendlyName":"Blazina,Kevin",
                "type":0
            },
            {
                "id":2728615,
                "externalId":"9ca0c6620535454c91ef4735a724cccb",
                "name":"karyn",
                "friendlyName":"Fowler,Karyn",
                "type":0
            },
            {
                "id":2729185,
                "externalId":"16fde91a0eea724ea9538d2309a02e71",
                "name":"emmertco",
                "friendlyName":"Emmert,Corey",
                "type":0
            },
            {
                "id":2733725,
                "externalId":null,
                "name":"Balesh Role",
                "friendlyName":"Balesh Role",
                "type":2
            },
            {
                "id":2733724,
                "externalId":null,
                "name":"Balesh Group",
                "friendlyName":"Balesh Group",
                "type":1
            },
            {
                "id":2729660,
                "externalId":"0a0a70feb2578f41bd93641964fee75b",
                "name":"bk1",
                "friendlyName":"bk1 bk1",
                "type":0
            },
            {
                "id":2729852,
                "externalId":"d021055676d075439daeb49335938998",
                "name":"bk2",
                "friendlyName":"bk2 bk2",
                "type":0
            },
            {
                "id":2733726,
                "externalId":"cd76d2a4346b88469e077e80a8397fa8",
                "name":"bk3",
                "friendlyName":"bk3 bk3",
                "type":0
            },
            {
                "id":2733727,
                "externalId":"5dd3074512625f46a9116852c8126b71",
                "name":"bk4",
                "friendlyName":"bk4",
                "type":0
            },
            {
                "id":2733728,
                "externalId":"6e7694a7af448742aa6bedd43f8111aa",
                "name":"bk5",
                "friendlyName":"bk5 bk5",
                "type":0
            },
            {
                "id":2733729,
                "externalId":"7c7d7f36016ce247a2e6029ce16fc7c4",
                "name":"bk6",
                "friendlyName":"bk6 bk6",
                "type":0
            },
            {
                "id":2733730,
                "externalId":"eed7d8326f1eb543ae9cc3d55ab8736c",
                "name":"CON - Newbie Mentors",
                "friendlyName":"Newbie Mentors",
                "type":1
            },
            {
                "id":2733735,
                "externalId":"eeb0dcddace0a14fa956d1c8ad92995e",
                "name":"joemorris",
                "friendlyName":"Joe Morris",
                "type":0
            },
            {
                "id":2733731,
                "externalId":"265a3ee2710ac74bab864335aab2ac74",
                "name":"CON - Corporate Trainers",
                "friendlyName":"Corporate Trainers",
                "type":1
            },
            {
                "id":2733732,
                "externalId":"87cefe9d5cbdb248b859cfd6b19e633d",
                "name":"CON - OpsTeam",
                "friendlyName":"OpsTeam",
                "type":1
            },
            {
                "id":2733750,
                "externalId":"e49bbaa39e85ed41b3638d80e84f706d",
                "name":"FrontRangeSvc",
                "friendlyName":"FrontRangeSvc",
                "type":0
            },
            {
                "id":2733751,
                "externalId":"2753da4eeca8a344b256d4a1ce90886e",
                "name":"BESAdmin",
                "friendlyName":"Blackberry Account",
                "type":0
            },
            {
                "id":2733733,
                "externalId":"88df79a7b8485445a8628706a60dea1f",
                "name":"_kandiah$%$#&^%#___'_{}",
                "friendlyName":"*kandiah$%$#&^%#[][';{}",
                "type":1
            },
            {
                "id":2733752,
                "externalId":"8506d47848ad4a4584852def160bed9c",
                "name":"ba%^%#-_lesh___",
                "friendlyName":"balesh kan*4%*diah",
                "type":0
            },
            {
                "id":2733753,
                "externalId":"17c7fb2520eb6e409f22944c7ac5dd29",
                "name":"bkandiah2",
                "friendlyName":"bkandiah2",
                "type":0
            },
            {
                "id":2733734,
                "externalId":"699b5176bc2c8a4895ab754a4b5d86c0",
                "name":"89_iyyG__t",
                "friendlyName":"b k",
                "type":0
            },
            {
                "id":2734212,
                "externalId":"829dd55961f9c845aef7a81ba264acb4",
                "name":"bkandiah4",
                "friendlyName":"bkandiah4",
                "type":0
            }
        ];
        return JSON.stringify(result);
    }
    ]
};
mocks.push(GetUserSteps);

var GetStepAttributes = {
    name: 'GetStepAttributes',
    mockRoute: '\/api\/steps\/.*\/attributes',
    testScope: 'success', //success | fail | error
    testScenario: 'manyAttributes',
    jsonTemplate: [{
        manyAttributes: function () {
            return '[{"id":2730162,"type":3,"displayName":"Balesh Date None","name":"Balesh Date None",' +
                '"description":"Balesh Date None","mandatory":false,"defaultValue":null,"hasDefaultValue":false,' +
                '"disabled":false,"visibility":true,"requirementsRule":0,' +
                '"validationRule":{"controlType":0,"minValue":null,"maxValue":null,"mask":null,"length":null,' +
                '"choices":null,' +
                '"validators":null,"readonly":false,"allowNew":false,"nameVisible":true,' +
                '"descrVisible":false,"separator":"-","order":0,"flags":0,"shouldSort":false,"isDefaultChoices":true}},' +
                '{"id":2730163,"type":3,"displayName":"Balesh Date Picker","name":"Balesh Date Picker",' +
                '"description":"Balesh Date Picker","mandatory":false,"defaultValue":null,"hasDefaultValue":false,' +
                '"disabled":false,"visibility":false,"requirementsRule":0,' +
                '"validationRule":{"controlType":1,"minValue":null,"maxValue":null,"mask":null,"length":null,' +
                '"choices":null,' +
                '"validators":null,"readonly":false,"allowNew":false,"nameVisible":true,' +
                '"descrVisible":false,"separator":"-","order":0,"flags":0,"shouldSort":false,"isDefaultChoices":true}},' +
                '{"id":2734316,"type":4,"displayName":"Balesh Float Combo Box","name":"Balesh Float Combo Box",' +
                '"description":"Balesh Float Combo Box","mandatory":false,"defaultValue":null,"hasDefaultValue":false,' +
                '"disabled":false,"visibility":true,"requirementsRule":0,' +
                '"validationRule":{"controlType":2,"minValue":null,"maxValue":null,"mask":null,"length":null,' +
                '"choices":[{"value":"1.5","description":null,"tag":null},{"value":"123.5","description":null,"tag":null},{"value":"56.658","description":null,"tag":null}],' +
                '"validators":null,"readonly":false,"allowNew":false,"nameVisible":true,' +
                '"descrVisible":false,"separator":"-","order":0,"flags":0,"shouldSort":false,"isDefaultChoices":true}},' +
                '{"id":2734320,"type":4,"displayName":"Balesh Float -100 - 100 Edit 2","name":"Balesh Float -100 - 100 Edit 2",' +
                '"description":"Balesh Float -100 - 100 Edit 2","mandatory":false,"defaultValue":null,"hasDefaultValue":false,' +
                '"disabled":false,"visibility":false,"requirementsRule":0,' +
                '"validationRule":{"controlType":4,"minValue":-100.0,"maxValue":100.0,"mask":null,"length":null,' +
                '"choices":null,' +
                '"validators":null,"readonly":false,"allowNew":false,"nameVisible":true,' +
                '"descrVisible":false,"separator":"-","order":0,"flags":0,"shouldSort":false,"isDefaultChoices":true}},' +
                '{"id":2734315,"type":4,"displayName":"Balesh Float no min/max Box","name":"Balesh Float no min/max Box",' +
                '"description":"Balesh Float no min/max Box","mandatory":false,"defaultValue":null,"hasDefaultValue":false,' +
                '"disabled":false,"visibility":true,"requirementsRule":0,' +
                '"validationRule":{"controlType":3,"minValue":null,"maxValue":null,"mask":"","length":10,' +
                '"choices":null,' +
                '"validators":null,"readonly":false,"allowNew":false,"nameVisible":true,' +
                '"descrVisible":false,"separator":"-","order":0,"flags":0,"shouldSort":false,"isDefaultChoices":true}},' +
                '{"id":2734311,"type":0,"displayName":"Balesh Integer Combo Box","name":"Balesh Integer Combo Box",' +
                '"description":"Balesh Integer Combo Box","mandatory":false,"defaultValue":null,"hasDefaultValue":false,' +
                '"disabled":false,"visibility":true,"requirementsRule":0,' +
                '"validationRule":{"controlType":2,"minValue":null,"maxValue":null,"mask":null,"length":null,' +
                '"choices":[{"value":"1","description":null,"tag":null},{"value":"10","description":null,"tag":null},{"value":"100","description":null,"tag":null}],' +
                '"validators":null,"readonly":false,"allowNew":false,"nameVisible":true,' +
                '"descrVisible":false,"separator":"-","order":0,"flags":0,"shouldSort":false,"isDefaultChoices":true}},' +
                '{"id":2730160,"type":0,"displayName":"Balesh Integer -2000 - 2000 Edit","name":"Balesh Integer -2000 - 2000 Edit",' +
                '"description":"Balesh Integer -2000 - 2000 Edit","mandatory":false,"defaultValue":null,"hasDefaultValue":false,' +
                '"disabled":false,"visibility":false,"requirementsRule":0,' +
                '"validationRule":{"controlType":4,"minValue":-2000.0,"maxValue":2000.0,"mask":null,"length":null,' +
                '"choices":null,' +
                '"validators":null,"readonly":false,"allowNew":false,"nameVisible":true,' +
                '"descrVisible":false,"separator":"-","order":0,"flags":0,"shouldSort":false,"isDefaultChoices":true}},' +
                '{"id":2734310,"type":0,"displayName":"Balesh Integer no min/max Box","name":"Balesh Integer no min/max Box",' +
                '"description":"Balesh Integer no min/max Box","mandatory":false,"defaultValue":null,"hasDefaultValue":false,' +
                '"disabled":false,"visibility":true,"requirementsRule":0,' +
                '"validationRule":{"controlType":3,"minValue":null,"maxValue":null,"mask":"","length":255,' +
                '"choices":null,' +
                '"validators":null,"readonly":false,"allowNew":false,"nameVisible":true,' +
                '"descrVisible":false,"separator":"-","order":0,"flags":0,"shouldSort":false,"isDefaultChoices":true}},' +
                '{"id":2734313,"type":2,"displayName":"Balesh String Combo Box","name":"Balesh String Combo Box",' +
                '"description":"Balesh String Combo Box","mandatory":false,"defaultValue":null,"hasDefaultValue":false,' +
                '"disabled":false,"visibility":false,"requirementsRule":0,' +
                '"validationRule":{"controlType":2,"minValue":null,"maxValue":null,"mask":null,"length":null,' +
                '"choices":[{"value":"ImageRight","description":null,"tag":null},{"value":"AIM","description":null,"tag":null},{"value":"WorkSmart","description":null,"tag":null}],' +
                '"validators":null,"readonly":false,"allowNew":false,"nameVisible":true,' +
                '"descrVisible":false,"separator":"-","order":0,"flags":0,"shouldSort":false,"isDefaultChoices":true}},' +
                '{"id":2734312,"type":2,"displayName":"Balesh String Text Box 10","name":"Balesh String Text Box 10",' +
                '"description":"Balesh String Text Box 10","mandatory":false,"defaultValue":null,"hasDefaultValue":false,' +
                '"disabled":false,"visibility":true,"requirementsRule":0,' +
                '"validationRule":{"controlType":3,"minValue":null,"maxValue":null,"mask":"","length":10,' +
                '"choices":null,' +
                '"validators":null,"readonly":false,"allowNew":false,"nameVisible":true,' +
                '"descrVisible":false,"separator":"-","order":0,"flags":0,"shouldSort":false,"isDefaultChoices":true}},' +
                '{"id":2730161,"type":6,"displayName":"Balesh User","name":"Balesh User",' +
                '"description":"Balesh User","mandatory":false,"defaultValue":null,"hasDefaultValue":false,' +
                '"disabled":false,"visibility":false,"requirementsRule":0,' +
                '"validationRule":{"controlType":2,"minValue":null,"maxValue":null,"mask":null,"length":null,' +
                '"choices":[{"value":{"id":2729184,"externalId":"a5d9fb006f52a9419f8c1e1d7625bd70","name":"bkandiah","friendlyName":"Kandiah,Balesh","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2728624,"externalId":"c291b900a51ded429715c75b7120ce17","name":"lcollins","friendlyName":"Collins,Les","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2730164,"externalId":"39970aee5ff2934ab70881f618cbb7a2","name":"dechols","friendlyName":"Echols,David","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2730165,"externalId":"d3f03a078c2c034f9c3e0ba741516ca8","name":"BDonahue","friendlyName":"Donahue,Benjie","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2730166,"externalId":"a154951e1a503443982115abb09026e7","name":"lbrennan","friendlyName":"Brennan,Lori","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2728651,"externalId":"bd0d7e9ca78aca4198ff4efeb4206da6","name":"kblazina","friendlyName":"Blazina,Kevin","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2728910,"externalId":"616cc76350da4b43860abd45269d2509","name":"bblair","friendlyName":"Blair,Buddy","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2730167,"externalId":"73dc52e0abd2b7468058d6f3790ab6c9","name":"iray","friendlyName":"Ray,Iris","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2730168,"externalId":"96d64ee584a416479abf7695ad9f4454","name":"bkdelete1","friendlyName":"b kandiah","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2730169,"externalId":"c86f4c4e50a14343b86d8ee4f1f210c1","name":"eaglegi","friendlyName":"Eagle,Ginny","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2730170,"externalId":"d63fc05c16415c48825f14f758abeb18","name":"elliotpa","friendlyName":"Elliott,Pam","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2730171,"externalId":"ffe36acd13d3a648b33f94fc9a9bdbb5","name":"abramslo","friendlyName":"Abrams,Louise","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2730172,"externalId":"bcb312c7bf484743a51c00c23be82e48","name":"aitelhmi","friendlyName":"Aitelhadj,Mina","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2729617,"externalId":"50e01f71ae36f243a2a4d50a6d985ac5","name":"dewolfyu","friendlyName":"DeWolf,Yuehli","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2730173,"externalId":"3f036308babfc746ac95c841be416b8f","name":"dayaluki","friendlyName":"Dayalu,Kiran","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2730174,"externalId":"cdc3c24fdee3284f94deb908d87cd92f","name":"demmercl","friendlyName":"Demmer,Clifton","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2730175,"externalId":"b466605d7bd3094db0895e853cd1723c","name":"dotangu","friendlyName":"Dotan,Guy","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2730176,"externalId":"7e02362b0f6b8249be0dc2f238cf4fb6","name":"Dowst","friendlyName":"Dow,Steve","type":0},' +
                '"description":"","tag":null},' +
                '{"value":{"id":2730177,"externalId":"ccc7ae48d902f243aac4785ab20420ef","name":"DobranSh","friendlyName":"Dobranski,Sharon","type":0},' +
                '"description":"","tag":null}],' +
                '"validators":null,"readonly":false,"allowNew":false,"nameVisible":true,' +
                '"descrVisible":false,"separator":"-","order":0,"flags":0,"shouldSort":false,"isDefaultChoices":true}},' +
                '{"id":2734432,"type":1,"displayName":"Balesh Boolean","name":"Balesh Boolean",' +
                '"description":"Balesh Boolean","mandatory":false,"defaultValue":null,"hasDefaultValue":false,' +
                '"disabled":false,"visibility":true,"requirementsRule":0,' +
                '"validationRule":{"controlType":0,"minValue":null,"maxValue":null,"mask":null,"length":null,' +
                '"choices":null,' +
                '"validators":null,"readonly":false,"allowNew":false,"nameVisible":true,' +
                '"descrVisible":false,"separator":"-","order":0,"flags":0,"shouldSort":false,"isDefaultChoices":true}}]';
        }
    },
        {
            noAttributes: function () {
                return '[]';
            }
        }
    ]
};
mocks.push(GetStepAttributes);

var TasksToANode = {
    name: 'TasksToANode',
    mockRoute: '\/api\/tasks\/.*/lock.*',
    testScope: 'success',
    testScenario: 0,
    jsonTemplate: [
        //0 Task on a folder
        function () {
            var result = {
                "id": 210782,
                "description": "Task on Embedded Folder",
                "priority": 1,
                "fileId": 654461,
                "fileName": "Task Redirect",
                "fileNumber": "Task Redirect",
                "flowId": 210690,
                "flowName": "Kevin Test 2",
                "stepId": 210691,
                "stepName": "Manual 1",
                "senderStep": 210691,
                "superTaskId": null,
                "rendezvousStepId": null,
                "subTaskIsRequired": false,
                "noteId": null,
                "assignedTo": null,
                "sender": {
                    "id": 2728651,
                    "externalId": "bd0d7e9ca78aca4198ff4efeb4206da6",
                    "name": "kblazina",
                    "friendlyName": "Blazina,Kevin",
                    "type": 0,
                    "enabled": false
                },
                "lockedBy": {
                    "id": 2936191,
                    "externalId": "366b8cbfc79d6d42aea94ef7768f4b66",
                    "name": "chide",
                    "friendlyName": "Chi,Derek",
                    "type": 0,
                    "enabled": false
                },
                "availableDate": "2015-10-16T13:26:05.897+00:00",
                "startDate": "2015-10-16T13:26:05.897+00:00",
                "lockExpiration": "2015-12-03T16:28:38.463+00:00",
                "undoExpires": "0001-01-01T00:00:00+00:00",
                "deadLine": "0001-01-01T00:00:00+00:00",
                "dateInitiated": "2015-10-16T13:26:05.897+00:00",
                "debug": false,
                "stackLevel": null,
                "errorCode": 0,
                "errorMessage": "",
                "statusDetails": 1,
                "status": 0,
                "pageNumber": null,
                "objectId": 395
            };

            return JSON.stringify(result);
        }
    ]
};
mocks.push(TasksToANode);

exports.mocks = mocks;