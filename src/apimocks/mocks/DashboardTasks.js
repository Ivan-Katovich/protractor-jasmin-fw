var moment = require('moment');
exports.getTasksForDashboardTasksList = function (req, res) {

    var response = null;
    var ageModel = req.body['ageModelSet'];
    var fullTasksObj = {
        "items":[
            {
                "id":459598,
                "description":"DiaryDetailsTest",
                "priority":0,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate": moment(new Date().getTime()-1000*60*1000).format(),
                "startDate":moment(new Date().getTime()-1200*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-2400*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-1200*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":1,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //1 xp1 420
            {
                "id":459599,
                "description":"DiaryOnFile",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-7000*60*1000).format(),
                "startDate":moment(new Date().getTime()-9000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-21000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-9000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":2,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 xp1 420
            {
                "id":459674,
                "description":"SomeDiary",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-28T14:29:22+00:00",
                "startDate":"2015-12-28T14:29:43.933+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-28T14:29:43.933+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":3,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 G2 110
            {
                "id":459675,
                "description":"PRIORITY 5",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-800*60*1000).format(),
                "startDate":moment(new Date().getTime()-1050*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-2000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-1050*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":4,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //1 xp1 420
            {
                "id":459699,
                "description":"ForDeleteCancel",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2016-09-14T04:01:00+00:00",
                "startDate":"2016-09-14T15:42:46.94+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2016-09-14T15:42:46.94+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":5,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 G2 110
            {
                "id":459700,
                "description":"ForDeleteRelease",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-31000*60*1000).format(),
                "startDate":moment(new Date().getTime()-32000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-41000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-32000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":6,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 xp1 420
            {
                "id":459600,
                "description":"DiaryOnFolder",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":7,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //3 xp1 420
            {
                "id":459601,
                "description":"DiaryOnDoc",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:43+00:00",
                "startDate":"2015-12-23T11:08:08.633+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:08.633+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":8,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 G1 25
            {
                "id":459602,
                "description":"DiaryOnPage",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:51+00:00",
                "startDate":"2015-12-23T11:08:21.717+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:21.717+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":215301,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":9,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 G1 25
            {
                "id":459604,
                "description":"PRIORITY 1",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-21000*60*1000).format(),
                "startDate":moment(new Date().getTime()-25000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-39000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-25000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":10,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //2 xp1 420
            {
                "id":459670,
                "description":"FirstDiary",
                "priority":4,
                "fileId":29700,
                "fileName":"TwoTasksAndTwoDiaries",
                "fileNumber":"TwoTasksAndTwoDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-28T14:18:28+00:00",
                "startDate":"2015-12-28T14:18:41.827+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-28T14:18:41.827+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29700,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":11,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 G1 25
            {
                "id":459671,
                "description":"SecondDiary",
                "priority":4,
                "fileId":29700,
                "fileName":"TwoTasksAndTwoDiaries",
                "fileNumber":"TwoTasksAndTwoDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate": moment(new Date().getTime()-61000*60*1000).format(),
                "startDate": moment(new Date().getTime()-63000*60*1000).format(),
                "lockExpiration": moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated": moment(new Date().getTime()-63000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29700,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":12,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //3 xp1 420
            {
                "id":459597,
                "description":"LockedDiary",
                "priority":6,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:05:37+00:00",
                "startDate":"2015-12-23T11:05:51.703+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:05:51.703+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":13,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //4 G3 111
            {
                "id":459681,
                "description":"Diary1",
                "priority":7,
                "fileId":29814,
                "fileName":"NoTasksAndTwoDiaries",
                "fileNumber":"NoTasksAndTwoDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-28T14:36:28+00:00",
                "startDate":"2015-12-28T14:36:42.983+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-28T14:36:42.983+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29814,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":14,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 G3 111
            {
                "id":459682,
                "description":"Diary2",
                "priority":7,
                "fileId":29814,
                "fileName":"NoTasksAndTwoDiaries",
                "fileNumber":"NoTasksAndTwoDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate": moment(new Date().getTime()-67000*60*1000).format(),
                "startDate": moment(new Date().getTime()-68000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-79000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-68000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29814,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":15,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //3 xp1 420
            {
                "id":459603,
                "description":"EditDiaryTesting",
                "priority":8,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:12:00+00:00",
                "startDate":"2015-12-23T11:12:16.763+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:12:16.763+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":215301,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":16,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 G3 111
            {
                "id":459605,
                "description":"diary reassign test",
                "priority":8,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2015-12-20T08:21:47+00:00",
                "startDate":"2015-12-23T11:22:06.863+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"2015-12-28T15:24:05.613+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:22:06.863+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":215301,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":17,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 xp1 420
            {
                "id":459606,
                "description":"diary tomorrow reschedule",
                "priority":8,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":420,
                    "externalId":"36d7583708ebee4b95f31cc1c67b6947",
                    "name":"xp1",
                    "friendlyName":"XP1",
                    "type":0,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate": moment(new Date().getTime()-47000*60*1000).format(),
                "startDate": moment(new Date().getTime()-48000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-69000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-48000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":18,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //3 xp1 420


            {
                "id":458598,
                "description":"DiaryDetailsTestUpd",
                "priority":0,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate": moment(new Date().getTime()-1000*60*1000).format(),
                "startDate":moment(new Date().getTime()-1200*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-2400*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-1200*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":1,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //1 Admin -2
            {
                "id":458599,
                "description":"DiaryOnFileUpd",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-7000*60*1000).format(),
                "startDate":moment(new Date().getTime()-9000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-21000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-9000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":2,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 Admin -2
            {
                "id":458674,
                "description":"SomeDiaryUpd",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2015-12-28T14:29:22+00:00",
                "startDate":"2015-12-28T14:29:43.933+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-28T14:29:43.933+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":3,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 Admin -2
            {
                "id":458675,
                "description":"PRIORITY 5Upd",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":4,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //3 Admin -2
            {
                "id":458699,
                "description":"ForDeleteCancelUpd",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2016-09-14T04:01:00+00:00",
                "startDate":"2016-09-14T15:42:46.94+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2016-09-14T15:42:46.94+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":5,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 Admin -2
            {
                "id":458700,
                "description":"ForDeleteReleaseUpd",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-31000*60*1000).format(),
                "startDate":moment(new Date().getTime()-32000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-41000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-32000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":6,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 Admin -2
            {
                "id":458600,
                "description":"DiaryOnFolderUpd",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":7,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //3 Admin -2
            {
                "id":458601,
                "description":"DiaryOnDocUpd",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:43+00:00",
                "startDate":"2015-12-23T11:08:08.633+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:08.633+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":8,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 Admin -2
            {
                "id":458602,
                "description":"DiaryOnPageUpd",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:51+00:00",
                "startDate":"2015-12-23T11:08:21.717+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:21.717+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":215301,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":9,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 Admin -2
            {
                "id":458604,
                "description":"PRIORITY 1Upd",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":-2,
                    "externalId":null,
                    "name":"Admin",
                    "friendlyName":"Admin",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":10,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //3 Admin -2

            {
                "id":457598,
                "description":"DiaryDetailsTestUpd1",
                "priority":0,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate": moment(new Date().getTime()-1000*60*1000).format(),
                "startDate":moment(new Date().getTime()-1200*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-2400*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-1200*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":1,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //1 agresspe 393
            {
                "id":457599,
                "description":"DiaryOnFileUpd1",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-7000*60*1000).format(),
                "startDate":moment(new Date().getTime()-9000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-21000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-9000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":2,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 agresspe 393
            {
                "id":457674,
                "description":"SomeDiaryUpd1",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2015-12-28T14:29:22+00:00",
                "startDate":"2015-12-28T14:29:43.933+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-28T14:29:43.933+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":3,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 agresspe 393
            {
                "id":457675,
                "description":"PRIORITY 5Upd1",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":4,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //3 agresspe 393
            {
                "id":457699,
                "description":"ForDeleteCancelUpd1",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2016-09-14T04:01:00+00:00",
                "startDate":"2016-09-14T15:42:46.94+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2016-09-14T15:42:46.94+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":5,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 agresspe 393
            {
                "id":457700,
                "description":"ForDeleteReleaseUpd1",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-31000*60*1000).format(),
                "startDate":moment(new Date().getTime()-32000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-41000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-32000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":6,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 agresspe 393
            {
                "id":457600,
                "description":"DiaryOnFolderUpd1",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":7,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //3 agresspe 393
            {
                "id":457601,
                "description":"DiaryOnDocUpd1",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:43+00:00",
                "startDate":"2015-12-23T11:08:08.633+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:08.633+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":8,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 agresspe 393
            {
                "id":457602,
                "description":"DiaryOnPageUpd1",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:51+00:00",
                "startDate":"2015-12-23T11:08:21.717+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:21.717+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":215301,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":9,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 agresspe 393
            {
                "id":457604,
                "description":"PRIORITY 1Upd1",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":393,
                    "externalId":"96b275b563a2184884ba0004c4b2be4b",
                    "name":"agresspe",
                    "friendlyName":"agresspe",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":10,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //3 agresspe 393

            {
                "id":456598,
                "description":"DiaryDetailsTestUpd2",
                "priority":0,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate": moment(new Date().getTime()-1000*60*1000).format(),
                "startDate":moment(new Date().getTime()-1200*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-2400*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-1200*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":1,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //1 kennedar 4
            {
                "id":456599,
                "description":"DiaryOnFileUpd2",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-7000*60*1000).format(),
                "startDate":moment(new Date().getTime()-9000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-21000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-9000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":2,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 kennedar 4
            {
                "id":456674,
                "description":"SomeDiaryUpd2",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2015-12-28T14:29:22+00:00",
                "startDate":"2015-12-28T14:29:43.933+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-28T14:29:43.933+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":3,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 kennedar 4
            {
                "id":456675,
                "description":"PRIORITY 5Upd2",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":4,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //3 kennedar 4
            {
                "id":456699,
                "description":"ForDeleteCancelUpd2",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2016-09-14T04:01:00+00:00",
                "startDate":"2016-09-14T15:42:46.94+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2016-09-14T15:42:46.94+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":5,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 kennedar 4
            {
                "id":456700,
                "description":"ForDeleteReleaseUpd2",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-31000*60*1000).format(),
                "startDate":moment(new Date().getTime()-32000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-41000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-32000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":6,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 kennedar 4
            {
                "id":456600,
                "description":"DiaryOnFolderUpd2",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":7,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //3 kennedar 4
            {
                "id":456601,
                "description":"DiaryOnDocUpd2",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:43+00:00",
                "startDate":"2015-12-23T11:08:08.633+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:08.633+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":8,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 kennedar 4
            {
                "id":456602,
                "description":"DiaryOnPageUpd2",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:51+00:00",
                "startDate":"2015-12-23T11:08:21.717+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:21.717+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":215301,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":9,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 kennedar 4
            {
                "id":456604,
                "description":"PRIORITY 1Upd2",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "sender":{
                    "id":4,
                    "externalId":"5733f5f2a7935c45b5329f1a481e9b66",
                    "name":"kennedar",
                    "friendlyName":"kennedar",
                    "type":0,
                    "enabled":true,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":10,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //3 kennedar 4

            {
                "id":455598,
                "description":"DiaryDetailsTestUpd3",
                "priority":0,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate": moment(new Date().getTime()-1000*60*1000).format(),
                "startDate":moment(new Date().getTime()-1200*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-2400*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-1200*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":1,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //1 Individuals null
            {
                "id":455599,
                "description":"DiaryOnFileUpd3",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-7000*60*1000).format(),
                "startDate":moment(new Date().getTime()-9000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-21000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-9000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":2,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 Individuals null
            {
                "id":455674,
                "description":"SomeDiaryUpd3",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2015-12-28T14:29:22+00:00",
                "startDate":"2015-12-28T14:29:43.933+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-28T14:29:43.933+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":3,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 Individuals null
            {
                "id":455675,
                "description":"PRIORITY 5Upd3",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":4,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //3 Individuals null
            {
                "id":455699,
                "description":"ForDeleteCancelUpd3",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2016-09-14T04:01:00+00:00",
                "startDate":"2016-09-14T15:42:46.94+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2016-09-14T15:42:46.94+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":5,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 Individuals null
            {
                "id":455700,
                "description":"ForDeleteReleaseUpd3",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-31000*60*1000).format(),
                "startDate":moment(new Date().getTime()-32000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-41000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-32000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":6,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 Individuals null
            {
                "id":455600,
                "description":"DiaryOnFolderUpd3",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":7,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //3 Individuals null
            {
                "id":455601,
                "description":"DiaryOnDocUpd3",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:43+00:00",
                "startDate":"2015-12-23T11:08:08.633+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:08.633+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":8,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 Individuals null
            {
                "id":455602,
                "description":"DiaryOnPageUpd3",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:51+00:00",
                "startDate":"2015-12-23T11:08:21.717+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:21.717+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":215301,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":9,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 Individuals null
            {
                "id":455604,
                "description":"PRIORITY 1Upd3",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "sender":{
                    "id":null,
                    "externalId":null,
                    "name":"Individuals",
                    "friendlyName":"Individuals",
                    "type":1,
                    "enabled":false,
                    "description":null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":10,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //3 Individuals null

            {
                "id":454598,
                "description":"DiaryDetailsTestUpd4",
                "priority":0,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate": moment(new Date().getTime()-1000*60*1000).format(),
                "startDate":moment(new Date().getTime()-1200*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-2400*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-1200*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":1,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //1 G1 25
            {
                "id":454599,
                "description":"DiaryOnFileUpd4",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-7000*60*1000).format(),
                "startDate":moment(new Date().getTime()-9000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-21000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-9000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":2,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 G1 25
            {
                "id":454674,
                "description":"SomeDiaryUpd4",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-28T14:29:22+00:00",
                "startDate":"2015-12-28T14:29:43.933+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-28T14:29:43.933+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":3,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 G1 25
            {
                "id":454675,
                "description":"PRIORITY 5Upd4",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":4,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //3 G1 25
            {
                "id":454699,
                "description":"ForDeleteCancelUpd4",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2016-09-14T04:01:00+00:00",
                "startDate":"2016-09-14T15:42:46.94+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2016-09-14T15:42:46.94+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":5,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 G1 25
            {
                "id":454700,
                "description":"ForDeleteReleaseUpd4",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-31000*60*1000).format(),
                "startDate":moment(new Date().getTime()-32000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-41000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-32000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":6,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 G1 25
            {
                "id":454600,
                "description":"DiaryOnFolderUpd4",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":7,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //3 G1 25
            {
                "id":454601,
                "description":"DiaryOnDocUpd4",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:43+00:00",
                "startDate":"2015-12-23T11:08:08.633+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:08.633+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":8,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 G1 25
            {
                "id":454602,
                "description":"DiaryOnPageUpd4",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:51+00:00",
                "startDate":"2015-12-23T11:08:21.717+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:21.717+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":215301,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":9,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 G1 25
            {
                "id":454604,
                "description":"PRIORITY 1Upd4",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 25,
                    "externalId": null,
                    "name": "G1",
                    "friendlyName": "G1",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":10,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //3 G1 25

            {
                "id":453598,
                "description":"DiaryDetailsTestUpd5",
                "priority":0,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate": moment(new Date().getTime()-1000*60*1000).format(),
                "startDate":moment(new Date().getTime()-1200*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-2400*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-1200*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":1,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //1 G2 110
            {
                "id":453599,
                "description":"DiaryOnFileUpd5",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-7000*60*1000).format(),
                "startDate":moment(new Date().getTime()-9000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-21000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-9000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":2,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 G2 110
            {
                "id":453674,
                "description":"SomeDiaryUpd5",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-28T14:29:22+00:00",
                "startDate":"2015-12-28T14:29:43.933+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-28T14:29:43.933+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":3,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 G2 110
            {
                "id":453675,
                "description":"PRIORITY 5Upd5",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":4,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //3 G2 110
            {
                "id":453699,
                "description":"ForDeleteCancelUpd5",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2016-09-14T04:01:00+00:00",
                "startDate":"2016-09-14T15:42:46.94+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2016-09-14T15:42:46.94+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":5,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 G2 110
            {
                "id":453700,
                "description":"ForDeleteReleaseUpd5",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-31000*60*1000).format(),
                "startDate":moment(new Date().getTime()-32000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-41000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-32000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":6,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 G2 110
            {
                "id":453600,
                "description":"DiaryOnFolderUpd5",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":7,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //3 G2 110
            {
                "id":453601,
                "description":"DiaryOnDocUpd5",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:43+00:00",
                "startDate":"2015-12-23T11:08:08.633+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:08.633+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":8,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 G2 110
            {
                "id":453602,
                "description":"DiaryOnPageUpd5",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:51+00:00",
                "startDate":"2015-12-23T11:08:21.717+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:21.717+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":215301,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":9,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 G2 110
            {
                "id":453604,
                "description":"PRIORITY 1Upd5",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 110,
                    "externalId": null,
                    "name": "G2",
                    "friendlyName": "G2",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":10,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //3 G2 110

            {
                "id":452598,
                "description":"DiaryDetailsTestUpd6",
                "priority":0,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate": moment(new Date().getTime()-1000*60*1000).format(),
                "startDate":moment(new Date().getTime()-1200*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-2400*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-1200*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":1,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //1 G3 111
            {
                "id":452599,
                "description":"DiaryOnFileUpd6",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-7000*60*1000).format(),
                "startDate":moment(new Date().getTime()-9000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-21000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-9000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":2,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 G3 111
            {
                "id":452674,
                "description":"SomeDiaryUpd6",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-28T14:29:22+00:00",
                "startDate":"2015-12-28T14:29:43.933+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-28T14:29:43.933+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":3,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 G3 111
            {
                "id":452675,
                "description":"PRIORITY 5Upd6",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":4,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //3 G3 111
            {
                "id":452699,
                "description":"ForDeleteCancelUpd6",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2016-09-14T04:01:00+00:00",
                "startDate":"2016-09-14T15:42:46.94+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2016-09-14T15:42:46.94+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":5,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 G3 111
            {
                "id":452700,
                "description":"ForDeleteReleaseUpd6",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-31000*60*1000).format(),
                "startDate":moment(new Date().getTime()-32000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-41000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-32000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":6,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 G3 111
            {
                "id":452600,
                "description":"DiaryOnFolderUpd6",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":7,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //3 G3 111
            {
                "id":452601,
                "description":"DiaryOnDocUpd6",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:43+00:00",
                "startDate":"2015-12-23T11:08:08.633+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:08.633+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":8,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 G3 111
            {
                "id":452602,
                "description":"DiaryOnPageUpd6",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:51+00:00",
                "startDate":"2015-12-23T11:08:21.717+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:21.717+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":215301,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":9,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 G3 111
            {
                "id":452604,
                "description":"PRIORITY 1Upd6",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 111,
                    "externalId": null,
                    "name": "G3",
                    "friendlyName": "G3",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":10,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //3 G3 111

            {
                "id":451598,
                "description":"DiaryDetailsTestUpd7",
                "priority":0,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate": moment(new Date().getTime()-1000*60*1000).format(),
                "startDate":moment(new Date().getTime()-1200*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-2400*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-1200*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":1,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //1 G4 112
            {
                "id":451599,
                "description":"DiaryOnFileUpd7",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-7000*60*1000).format(),
                "startDate":moment(new Date().getTime()-9000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-21000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-9000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":2,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 G4 112
            {
                "id":451674,
                "description":"SomeDiaryUpd7",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-28T14:29:22+00:00",
                "startDate":"2015-12-28T14:29:43.933+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-28T14:29:43.933+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":3,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 G4 112
            {
                "id":451675,
                "description":"PRIORITY 5Upd7",
                "priority":1,
                "fileId":29741,
                "fileName":"FileWithTasksAndDiaries",
                "fileNumber":"FileWithTasksAndDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29741,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":4,
                "fileTypeId":104,
                "drawerId":8436,
                "objectTypeId":104,
                "objectClass":-3
            }, //3 G4 112
            {
                "id":451699,
                "description":"ForDeleteCancelUpd7",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2016-09-14T04:01:00+00:00",
                "startDate":"2016-09-14T15:42:46.94+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2016-09-14T15:42:46.94+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":5,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //4 G4 112
            {
                "id":451700,
                "description":"ForDeleteReleaseUpd7",
                "priority":1,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-31000*60*1000).format(),
                "startDate":moment(new Date().getTime()-32000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-41000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-32000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29408,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":6,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":104,
                "objectClass":-3
            }, //2 G4 112
            {
                "id":451600,
                "description":"DiaryOnFolderUpd7",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29409,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":7,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":114,
                "objectClass":-2
            }, //3 G4 112
            {
                "id":451601,
                "description":"DiaryOnDocUpd7",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:43+00:00",
                "startDate":"2015-12-23T11:08:08.633+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:08.633+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":8,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 G4 112
            {
                "id":451602,
                "description":"DiaryOnPageUpd7",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":"2015-12-23T11:18:51+00:00",
                "startDate":"2015-12-23T11:08:21.717+00:00",
                "lockExpiration":"0001-01-01T00:00:00+00:00",
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":"2015-12-23T11:08:21.717+00:00",
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":215301,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":9,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            }, //4 G4 112
            {
                "id":451604,
                "description":"PRIORITY 1Upd7",
                "priority":2,
                "fileId":29408,
                "fileName":"FileWithDifferentDiaries",
                "fileNumber":"FileWithDifferentDiaries",
                "flowId":-2147483638,
                "flowName":"Diary",
                "stepId":-2147483628,
                "stepName":"Diary Step",
                "senderStep":-2147483628,
                "superTaskId":null,
                "rendezvousStepId":null,
                "subTaskIsRequired":false,
                "noteId":null,
                "assignedTo":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "sender":{
                    "id": 112,
                    "externalId": null,
                    "name": "G4",
                    "friendlyName": "G4",
                    "type": 1,
                    "enabled": true,
                    "description": null
                },
                "lockedBy":null,
                "availableDate":moment(new Date().getTime()-55000*60*1000).format(),
                "startDate":moment(new Date().getTime()-56000*60*1000).format(),
                "lockExpiration":moment(new Date().getTime()-81000*60*1000).format(),
                "undoExpires":"0001-01-01T00:00:00+00:00",
                "deadLine":"0001-01-01T00:00:00+00:00",
                "dateInitiated":moment(new Date().getTime()-56000*60*1000).format(),
                "debug":false,
                "stackLevel":null,
                "errorCode":0,
                "errorMessage":"",
                "statusDetails":0,
                "status":0,
                "pageNumber":null,
                "objectId":29410,
                "documentAttributes":[

                ],
                "folderAttributes":[

                ],
                "fileAttributes":[

                ],
                "rowNum":10,
                "fileTypeId":104,
                "drawerId":351,
                "objectTypeId":156,
                "objectClass":-1
            } //3 G4 112
        ],
        "nextPageLink":null,
        "count":18
    };
    var objectForLoading = {
        "items":[],
        "nextPageLink":null,
        "count":0
    };

    ageModel.forEach(function(age){
        var min,
            max;
        switch(age.id){
            case 0:
                min = 0;
                max = 2880;
                break;
            case 1:
                min = 2880;
                max = 43200;
                break;
            case 2:
                min = 43200;
                max = 86400;
                break;
            case 3:
                min = 86400;
                max = Infinity;
                break;
            default:
                throw new Error('Incorrect aging ID');
        }
        fullTasksObj.items.forEach(function(task){
            var delta = (moment().format('x')-moment(task.dateInitiated).format('x'))/60000;
            // console.log(req.body['assignedTo']);
            // console.log(task.assignedTo.id);
            // console.log(req.body['assignedTo'].includes(task.assignedTo.id));
            if(delta>min && delta<=max && (req.body['assignedTo'].includes(task.assignedTo.id) || req.body['assignedTo'].includes(task.assignedTo.id+''))){
                objectForLoading.items.push(task);
            }
        });
    });

    objectForLoading.count = objectForLoading.items.length;

    if(req.body['ageModelSet']){
        response = objectForLoading;
    }

    var result = JSON.stringify(response);
    res.send(result);
    res.end();
};