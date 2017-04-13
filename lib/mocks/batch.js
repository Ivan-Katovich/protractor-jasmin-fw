function _getInstancesBatch () {
    // MOVE DIALOG, call to api/batch : POPULATES MOVE DIALOG
    // IMPORTANT: folder typeId === 114, doc typeId = 156, GIVEN the template (in Content.js) scenario is 2
    // folder typeIds: comes from Content.js -> GetTemplates -> search token: 'axz-fold-id'
    // doc typeIds: search token: 'wits-end-32'

    //  tl;dr WHAT THE SCENARIOS SHOULD BE IF YOU WANT TO TEST MOVE ERRORS:
    //
    // Move.js -> documents/move -> Scenario 6
    // FileTree.js -> /FileTree/GetFileTree/ -> Scenario 8
    // Content.js -> /api/objecttypes/626650/template -> Scenario 2


    // Create a baseline structure for the move dialog.
    var resp_data = [
        {
            "name":"Folder 1",
            "typeId":114,
            "typeDescription":"Folder 1",
            "effectivePermissions":-1,
            "objectClass":-2,
            "dateCreated":"2008-07-29T07:13:20.74",
            "dateLastModified":"2015-02-25T17:46:01.16",
            "id":27367780371,
            "description":""
        },
        {
            "name":"Folder 2",
            "typeId":114,
            "typeDescription":"Folder 2",
            "effectivePermissions":-1,
            "objectClass":-2,
            "dateCreated":"2008-07-29T07:13:20.74",
            "dateLastModified":"2015-02-25T17:46:01.16",
            "id":27356670370,
            "description":""
        },
        {
            "name":"Folder 3",
            "typeId":114,
            "typeDescription":"Folder 3",
            "effectivePermissions":-1,
            "objectClass":-2,
            "dateCreated":"2008-07-29T07:13:20.74",
            "dateLastModified":"2015-02-25T17:46:01.16",
            "id":1937765410,
            "description":""
        }
    ];


    // Populate our response data with Documents.
    for (var i = 1; i < 50001; i++) {
        var temp = {
            "documentDate": "2008-06-17T00:00:00",
            "receivedDate": "2008-07-29T07:13:20.267",
            "name": "Document" + i,
            "typeId": 156,
            "typeDescription": "Document" + i,
            "effectivePermissions": -1,
            "objectClass": -1,
            "dateCreated": "2008-07-29T07:13:20.267",
            "dateLastModified": "2008-07-29T07:13:20.94",
            "id": i,
            "description": "Document" + i
        };
        resp_data.push(temp);
    }

    // Stringify for output.
    var stringified = JSON.stringify(resp_data);

    var response =

        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n'+
        'Content-Type: application/http; msgtype=response\r\n'+
        '\r\n'+
        'HTTP/1.1 200 OK\r\n'+
        'Content-Type: application/json; charset=utf-8\r\n'+
        '\r\n'+
        stringified + '\r\n'+
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4--\r\n'+
        '\r\n';

    return response;
}

function _getWorkflowsBatch () {
    var response = '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":-2147483628,"name":"Diary Step","typeGuid":"5cec8cad-1fdb-4509-8c29-214312154f49","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":-2147483627,"name":"End Step","typeGuid":"d32920e6-0be4-4dc5-80f6-aba89e3ed3f7","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4--\r\n' +
        '\r\n';
    return response;
}

function _getUnlockTasksBatch () {
    var response = '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4--\r\n' +
        '\r\n';
    return response;
}

function _getDefaultBatch(){
    //var response = '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":1,"name":"Endorsement Request","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":2,"name":"Mail Department Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":3,"name":"Wait for Endorsement","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":4,"name":"Endorsement Admin Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":5,"name":"Endorsement From Carrier","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":6,"name":"Initial Request?","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":10,"name":"Deadline Expired","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":18,"name":"Cancellation Processing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":19,"name":"Cancellation Admin Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":20,"name":"Mail Department Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":23,"name":"End 2","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":24,"name":"Cancellation Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":25,"name":"Signed LPR Processing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":26,"name":"Final Cancellation Processing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":27,"name":"Wait for Final Cancellation","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7110,"name":"Wait Signed LPR","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":43,"name":"Certificates/EPIs","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":44,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8127,"name":"Go To Endorsement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8128,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8129,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8130,"name":"Email Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":46,"name":"Accepted Quote?","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":47,"name":"Renewal Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":48,"name":"Administrative Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":49,"name":"Mail Department Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":50,"name":"Bridge To Endorsement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":51,"name":"Renewal Service","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":52,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":54,"name":"Internal Strategy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":55,"name":"Gather Renewal Info","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":56,"name":"Process Updated Information","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":57,"name":"Bridge to Submissions","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":121,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8110,"name":"Proc_Renewal_360","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8111,"name":"Case_Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8112,"name":"Wait for Renewal Information","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8113,"name":"Bridge to Binding Process","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8114,"name":"Bridge to Binding","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8115,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8116,"name":"Process Renewal List Case","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8117,"name":"Auto Renew","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":61,"name":"Marketing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":62,"name":"New Prospect Data Entry","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":63,"name":"Received Quotes","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":64,"name":"Wait for Quotes","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":65,"name":"Quote Deadline Expired?","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":66,"name":"Wait for Binding Instructions","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":67,"name":"Bind Instructions Deadline Expired?","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":68,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":123,"name":"Wait for Carrier Response","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":124,"name":"Create a Task for Each Carrier","typeGuid":"790490c6-77ab-4577-9f18-5245b9804f54","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":70,"name":"Binding Service","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":72,"name":"Binding Process","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":73,"name":"Wait for Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":75,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8124,"name":"Email Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8125,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8126,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":77,"name":"New Business Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":80,"name":"Accepted Quote?","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":81,"name":"Set Reminder","typeGuid":"790490c6-77ab-4577-9f18-5245b9804f54","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":82,"name":"New Business Setup","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":83,"name":"Policy Department Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":84,"name":"Department Admin Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":85,"name":"New Business Complete","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":86,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":88,"name":"Audit Process","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":90,"name":"Wait for Payment","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":93,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8120,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8121,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8122,"name":"Audit Dispute","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8123,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":541,"name":"Policy Admin Data Entry","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":542,"name":"Underwriting Action","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":543,"name":"Underwriting","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":544,"name":"Declination","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":545,"name":"Print Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":546,"name":"Pay Commisions","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":547,"name":"Mail Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":548,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":550,"name":"Surrender Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":551,"name":"Setup Surrender","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":552,"name":"Policy Has Value","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":553,"name":"Process Check","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":554,"name":"Manager Review","typeGuid":"e858a1b7-c137-4dc4-acb1-e6c9ee420b64","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":555,"name":"Send Check","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":556,"name":"Send Cancellation","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":557,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":581,"name":"Mail Indexing","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":582,"name":"General Inbox","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":584,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":586,"name":"SEND MESSAGE TO BROKER","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":587,"name":"NEED APPROVAL?","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":588,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":589,"name":"PREPARE DECLINATION","typeGuid":"790490c6-77ab-4577-9f18-5245b9804f54","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":591,"name":"PRODUCE QUOTE","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":592,"name":"NEW BUSINESS PROCESSING","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":594,"name":"MANAGER REVIEW","typeGuid":"e858a1b7-c137-4dc4-acb1-e6c9ee420b64","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":595,"name":"OK TO UNDERWRITE?","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":597,"name":"Commercial Lines","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":598,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":599,"name":"Send To Department","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":600,"name":"Specialty Lines","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":601,"name":"Personal Lines","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":602,"name":"Employee Benefits","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":603,"name":"Claims","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":604,"name":"Department Sorting","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":605,"name":"Accounting","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":606,"name":"Marketing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":7191,"name":"Department Admin Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":7192,"name":"Loss Reporting","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7193,"name":"Adjuster","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7194,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7195,"name":"Case 1","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7480,"name":"Claim Assistant","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":7941,"name":"Decision 2","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7942,"name":"Processing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7943,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7944,"name":"QA Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7945,"name":"Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":7946,"name":"Pricing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":7947,"name":"Closing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7948,"name":"Bid","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7949,"name":"Decision 1","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7950,"name":"Case Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":7952,"name":"Wait for Response","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7953,"name":"Reinsurance Final Report","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7954,"name":"Reinsured Claims","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7955,"name":"Coverage Verification","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":7956,"name":"Set Re-Request","typeGuid":"a2e7f866-ffe7-401b-8f09-8b86da41c7f5","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7957,"name":"Process Claim","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":7958,"name":"No Response?","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7959,"name":"Call Process Claim","typeGuid":"5829d669-0c8a-4961-9b43-31e528851320","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7960,"name":"Set Need More Info","typeGuid":"a2e7f866-ffe7-401b-8f09-8b86da41c7f5","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7961,"name":"Claims Committee Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7962,"name":"GoTo Process Claim","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7963,"name":"Contestable Claim","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7964,"name":"Decline Claim","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7965,"name":"Claims Team Prep","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7966,"name":"Claims Analyst","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":7967,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8101,"name":"Case_From","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8102,"name":"Endorsement From Carrier","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8103,"name":"Correction Requested","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8104,"name":"Additional Request","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8105,"name":"Endorsement Request","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8106,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8107,"name":"First Request","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8108,"name":"send","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8131,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8132,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8134,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8135,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8136,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8137,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8138,"name":"Reinstatement","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8140,"name":"Go To Reinstatement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8141,"name":"Cancellation Processing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8142,"name":"Underwriting","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8143,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8144,"name":"Final Cancel","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8145,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8146,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8147,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8148,"name":"Non-Pay","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8149,"name":"LPR","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8151,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8152,"name":"Policy Errors","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8153,"name":"Go To Endorsement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8154,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8155,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8156,"name":"Process Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8157,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8159,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8160,"name":"Track Carrier Response","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8161,"name":"Wait for Instructions","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8162,"name":"Email Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8163,"name":"New Prospect Data Entry","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8164,"name":"Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8165,"name":"Prepare Proposal","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8166,"name":"Case_Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8167,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8168,"name":"Marketing Role","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8169,"name":"Wait for Quotes","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8170,"name":"Go To Binding","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8173,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8174,"name":"Service Claim","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8175,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8176,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8177,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8178,"name":"Claims Processing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8180,"name":"RouteMail","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8181,"name":"Mail Indexing","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8182,"name":"Endorsement from Carrier","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8183,"name":"Account Manager Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8184,"name":"General Mailbox","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8185,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8186,"name":"Mail Sorting","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8187,"name":"Proof of Insurance","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8188,"name":"Binding","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8189,"name":"Endorsement Request","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8190,"name":"Audit","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8191,"name":"Claims","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8192,"name":"New Prospect Data Entry","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8193,"name":"Policy Checking","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8194,"name":"CL Submission","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8195,"name":"Cancellation","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8196,"name":"CL Renewal","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8197,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8198,"name":"Reinstatement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8200,"name":"Renewal Quote","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8201,"name":"Renewal Letter Sent","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8202,"name":"Go To Binding","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8203,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8204,"name":"Wait for Client Acceptance","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8205,"name":"Process Renewal List Case","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8206,"name":"Order Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8207,"name":"Wait for Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8208,"name":"Renewal Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8209,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8211,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8212,"name":"Process Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8213,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8214,"name":"Policy Errors","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8215,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8216,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8217,"name":"Go To Endorsement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8219,"name":"Quote","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8220,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8221,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8222,"name":"Email Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8223,"name":"Wait for Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8224,"name":"Wait for Quote","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8225,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8226,"name":"Customer Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8227,"name":"Go To Binding","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8228,"name":"Order Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8230,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8231,"name":"Wait for Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8232,"name":"Binding Service","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8233,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8234,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8235,"name":"Email Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8236,"name":"Binding Process","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8238,"name":"Go To Endorsement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8239,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8240,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8241,"name":"Certificates/EPIs","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8242,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8243,"name":"Email Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8245,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8246,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8247,"name":"Reinstatement","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8248,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8249,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8251,"name":"LPR","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8252,"name":"Underwriting","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8253,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8254,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8255,"name":"Final Cancel","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8256,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8257,"name":"Go To Reinstatement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8258,"name":"Non-Pay","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8259,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8260,"name":"Cancellation Processing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8262,"name":"Endorsement From Carrier","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8263,"name":"Case_From","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8264,"name":"First Request","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8265,"name":"Endorsement Request","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8266,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8267,"name":"Additional Request","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8268,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8269,"name":"send","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8270,"name":"Correction Requested","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8271,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8273,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8274,"name":"Claims Processing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8275,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8276,"name":"Service Claim","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8277,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8278,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8280,"name":"Claims","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8281,"name":"RouteMail","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8282,"name":"Mail Sorting","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8283,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8284,"name":"Endorsement from Carrier","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8285,"name":"Account Manager Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8286,"name":"General Mailbox","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8287,"name":"Endorsement Request","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8288,"name":"Cancellation","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8289,"name":"Reinstatement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8290,"name":"Proof of Insurance","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8291,"name":"Binding","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8292,"name":"PL New Business","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8293,"name":"Policy Checkiing","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8294,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8295,"name":"PL Renewal","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8381,"name":"Indexing 1","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8382,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8391,"name":"Account Manager","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8392,"name":"RSP","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8393,"name":"Case 1","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8394,"name":"Compliance","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8395,"name":"AM Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8396,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8433,"name":"Manual 1","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8434,"name":"Split 1","typeGuid":"bb5a6433-89a3-4614-9b78-007645735af0","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8435,"name":"Manual 2","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8436,"name":"Manual 3","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8437,"name":"Manual 4","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8438,"name":"Rendezvous 1","typeGuid":"127494e5-d4f7-453d-bdc0-d3bd1ee8438f","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8439,"name":"Manual 5","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8440,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8511,"name":"Indexing 1","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8512,"name":"Manual 1","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8513,"name":"Manager 1","typeGuid":"e858a1b7-c137-4dc4-acb1-e6c9ee420b64","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8514,"name":"Manual 2","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8515,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8521,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8522,"name":"Indexing 1","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8523,"name":"Manual 1","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8524,"name":"Manual 2","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8525,"name":"Manual 3","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8526,"name":"Manual 4","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8529,"name":"Manual 1","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8530,"name":"Manual 2","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8531,"name":"Manual 3","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8532,"name":"Manual 4","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8533,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8711,"name":"Manager 1","typeGuid":"e858a1b7-c137-4dc4-acb1-e6c9ee420b64","status":0,"effectivePermissions":-1,"debug":false,"isStart":true}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8541,"name":"Manual 1","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8542,"name":"Manual 2","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8543,"name":"ADMIN ASSISTANT","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8544,"name":"Manual 4","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8545,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8551,"name":"Claims Indexing","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8560,"name":"SimpleIndex","typeGuid":"790490c6-77ab-4577-9f18-5245b9804f54","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8561,"name":"Adjuster","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8562,"name":"Admin","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8563,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8564,"name":"Case 1","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8565,"name":"Manager","typeGuid":"e858a1b7-c137-4dc4-acb1-e6c9ee420b64","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8571,"name":"Rescan Claim","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8599,"name":"Delay1","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8600,"name":"Verify","typeGuid":"790490c6-77ab-4577-9f18-5245b9804f54","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":8651,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":8652,"name":"General Indexing","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":8653,"name":"Inbox","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":9531,"name":"Indexing 1","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":9532,"name":"Manual 1","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":9533,"name":"Manual 2","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":9534,"name":"Manual 3","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":9535,"name":"Manual 4","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"id":9536,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e\r\n' +
    //    'Content-Type: application/http; msgtype=response\r\n' +
    //    '\r\n' +
    //    'HTTP/1.1 200 OK\r\n' +
    //    'Content-Type: application/json; charset=utf-8\r\n' +
    //    '\r\n' +
    //    '[{"id":-2147483628,"name":"Diary Step","typeGuid":"5cec8cad-1fdb-4509-8c29-214312154f49","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"id":-2147483627,"name":"End Step","typeGuid":"d32920e6-0be4-4dc5-80f6-aba89e3ed3f7","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
    //    '--de7b8015-4a77-45aa-a631-56543d69288e--\r\n' +
    //    '\r\n';
    var response = '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":1,"name":"Endorsement Request","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":2,"name":"Mail Department Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":3,"name":"Wait for Endorsement","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":4,"name":"Endorsement Admin Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":5,"name":"Endorsement From Carrier","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":6,"name":"Initial Request?","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":10,"name":"Deadline Expired","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":18,"name":"Cancellation Processing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":19,"name":"Cancellation Admin Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":20,"name":"Mail Department Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":23,"name":"End 2","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":24,"name":"Cancellation Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":25,"name":"Signed LPR Processing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":26,"name":"Final Cancellation Processing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":27,"name":"Wait for Final Cancellation","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7110,"name":"Wait Signed LPR","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":43,"name":"Certificates/EPIs","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":44,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8127,"name":"Go To Endorsement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8128,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8129,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8130,"name":"Email Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":46,"name":"Accepted Quote?","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":47,"name":"Renewal Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":48,"name":"Administrative Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":49,"name":"Mail Department Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":50,"name":"Bridge To Endorsement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":51,"name":"Renewal Service","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":52,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":54,"name":"Internal Strategy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":55,"name":"Gather Renewal Info","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":56,"name":"Process Updated Information","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":57,"name":"Bridge to Submissions","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":121,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8110,"name":"Proc_Renewal_360","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8111,"name":"Case_Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8112,"name":"Wait for Renewal Information","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8113,"name":"Bridge to Binding Process","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8114,"name":"Bridge to Binding","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8115,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8116,"name":"Process Renewal List Case","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8117,"name":"Auto Renew","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":61,"name":"Marketing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":62,"name":"New Prospect Data Entry","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":63,"name":"Received Quotes","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":64,"name":"Wait for Quotes","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":65,"name":"Quote Deadline Expired?","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":66,"name":"Wait for Binding Instructions","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":67,"name":"Bind Instructions Deadline Expired?","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":68,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":123,"name":"Wait for Carrier Response","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":124,"name":"Create a Task for Each Carrier","typeGuid":"790490c6-77ab-4577-9f18-5245b9804f54","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":70,"name":"Binding Service","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":72,"name":"Binding Process","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":73,"name":"Wait for Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":75,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8124,"name":"Email Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8125,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8126,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":77,"name":"New Business Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":80,"name":"Accepted Quote?","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":81,"name":"Set Reminder","typeGuid":"790490c6-77ab-4577-9f18-5245b9804f54","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":82,"name":"New Business Setup","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":83,"name":"Policy Department Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":84,"name":"Department Admin Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":85,"name":"New Business Complete","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":86,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":88,"name":"Audit Process","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":90,"name":"Wait for Payment","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":93,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8120,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8121,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8122,"name":"Audit Dispute","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8123,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":541,"name":"Policy Admin Data Entry","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":542,"name":"Underwriting Action","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":543,"name":"Underwriting","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":544,"name":"Declination","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":545,"name":"Print Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":546,"name":"Pay Commisions","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":547,"name":"Mail Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":548,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":550,"name":"Surrender Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":551,"name":"Setup Surrender","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":552,"name":"Policy Has Value","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":553,"name":"Process Check","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":554,"name":"Manager Review","typeGuid":"e858a1b7-c137-4dc4-acb1-e6c9ee420b64","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":555,"name":"Send Check","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":556,"name":"Send Cancellation","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":557,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":581,"name":"Mail Indexing","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":582,"name":"General Inbox","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":584,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":586,"name":"SEND MESSAGE TO BROKER","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":587,"name":"NEED APPROVAL?","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":588,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":589,"name":"PREPARE DECLINATION","typeGuid":"790490c6-77ab-4577-9f18-5245b9804f54","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":591,"name":"PRODUCE QUOTE","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":592,"name":"NEW BUSINESS PROCESSING","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":594,"name":"MANAGER REVIEW","typeGuid":"e858a1b7-c137-4dc4-acb1-e6c9ee420b64","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":595,"name":"OK TO UNDERWRITE?","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":597,"name":"Commercial Lines","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":598,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":599,"name":"Send To Department","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":600,"name":"Specialty Lines","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":601,"name":"Personal Lines","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":602,"name":"Employee Benefits","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":603,"name":"Claims","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":604,"name":"Department Sorting","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":605,"name":"Accounting","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":606,"name":"Marketing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":7191,"name":"Department Admin Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":7192,"name":"Loss Reporting","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7193,"name":"Adjuster","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7194,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7195,"name":"Case 1","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7480,"name":"Claim Assistant","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":7941,"name":"Decision 2","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7942,"name":"Processing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7943,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7944,"name":"QA Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7945,"name":"Index","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":7946,"name":"Pricing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":7947,"name":"Closing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7948,"name":"Bid","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7949,"name":"Decision 1","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7950,"name":"Case Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":7952,"name":"Wait for Response","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7953,"name":"Reinsurance Final Report","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7954,"name":"Reinsured Claims","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7955,"name":"Coverage Verification","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":7956,"name":"Set Re-Request","typeGuid":"a2e7f866-ffe7-401b-8f09-8b86da41c7f5","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7957,"name":"Process Claim","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":7958,"name":"No Response?","typeGuid":"98f72c30-2282-4697-9629-004d191593f8","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7959,"name":"Call Process Claim","typeGuid":"5829d669-0c8a-4961-9b43-31e528851320","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7960,"name":"Set Need More Info","typeGuid":"a2e7f866-ffe7-401b-8f09-8b86da41c7f5","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7961,"name":"Claims Committee Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7962,"name":"GoTo Process Claim","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7963,"name":"Contestable Claim","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7964,"name":"Decline Claim","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7965,"name":"Claims Team Prep","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7966,"name":"Claims Analyst","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":7967,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8101,"name":"Case_From","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8102,"name":"Endorsement From Carrier","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8103,"name":"Correction Requested","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8104,"name":"Additional Request","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8105,"name":"Endorsement Request","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8106,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8107,"name":"First Request","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8108,"name":"send","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8131,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8132,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8134,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8135,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8136,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8137,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8138,"name":"Reinstatement","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8140,"name":"Go To Reinstatement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8141,"name":"Cancellation Processing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8142,"name":"Underwriting","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8143,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8144,"name":"Final Cancel","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8145,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8146,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8147,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8148,"name":"Non-Pay","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8149,"name":"LPR","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8151,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8152,"name":"Policy Errors","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8153,"name":"Go To Endorsement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8154,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8155,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8156,"name":"Process Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8157,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8159,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8160,"name":"Track Carrier Response","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8161,"name":"Wait for Instructions","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8162,"name":"Email Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8163,"name":"New Prospect Data Entry","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8164,"name":"Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8165,"name":"Prepare Proposal","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8166,"name":"Case_Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8167,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8168,"name":"Marketing Role","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8169,"name":"Wait for Quotes","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8170,"name":"Go To Binding","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8173,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8174,"name":"Service Claim","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8175,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8176,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8177,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8178,"name":"Claims Processing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8180,"name":"RouteMail","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8181,"name":"Mail Indexing","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8182,"name":"Endorsement from Carrier","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8183,"name":"Account Manager Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8184,"name":"General Mailbox","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8185,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8186,"name":"Mail Sorting","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8187,"name":"Proof of Insurance","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8188,"name":"Binding","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8189,"name":"Endorsement Request","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8190,"name":"Audit","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8191,"name":"Claims","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8192,"name":"New Prospect Data Entry","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8193,"name":"Policy Checking","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8194,"name":"CL Submission","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8195,"name":"Cancellation","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8196,"name":"CL Renewal","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8197,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8198,"name":"Reinstatement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8200,"name":"Renewal Quote","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8201,"name":"Renewal Letter Sent","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8202,"name":"Go To Binding","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8203,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8204,"name":"Wait for Client Acceptance","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8205,"name":"Process Renewal List Case","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8206,"name":"Order Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8207,"name":"Wait for Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8208,"name":"Renewal Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8209,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8211,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8212,"name":"Process Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8213,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8214,"name":"Policy Errors","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8215,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8216,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8217,"name":"Go To Endorsement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8219,"name":"Quote","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8220,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8221,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8222,"name":"Email Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8223,"name":"Wait for Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8224,"name":"Wait for Quote","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8225,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8226,"name":"Customer Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8227,"name":"Go To Binding","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8228,"name":"Order Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8230,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8231,"name":"Wait for Policy","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8232,"name":"Binding Service","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8233,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8234,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8235,"name":"Email Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8236,"name":"Binding Process","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8238,"name":"Go To Endorsement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8239,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8240,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8241,"name":"Certificates/EPIs","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8242,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8243,"name":"Email Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8245,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8246,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8247,"name":"Reinstatement","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8248,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8249,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8251,"name":"LPR","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8252,"name":"Underwriting","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8253,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8254,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8255,"name":"Final Cancel","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8256,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8257,"name":"Go To Reinstatement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8258,"name":"Non-Pay","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8259,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8260,"name":"Cancellation Processing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8262,"name":"Endorsement From Carrier","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8263,"name":"Case_From","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8264,"name":"First Request","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8265,"name":"Endorsement Request","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8266,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8267,"name":"Additional Request","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8268,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8269,"name":"send","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8270,"name":"Correction Requested","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8271,"name":"End 1","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8273,"name":"Go To Mail","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8274,"name":"Claims Processing","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8275,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8276,"name":"Service Claim","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8277,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8278,"name":"EMail Assign","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":true}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8280,"name":"Claims","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8281,"name":"RouteMail","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8282,"name":"Mail Sorting","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8283,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8284,"name":"Endorsement from Carrier","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8285,"name":"Account Manager Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8286,"name":"General Mailbox","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8287,"name":"Endorsement Request","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8288,"name":"Cancellation","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8289,"name":"Reinstatement","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8290,"name":"Proof of Insurance","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8291,"name":"Binding","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8292,"name":"PL New Business","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8293,"name":"Policy Checkiing","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8294,"name":"Route","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8295,"name":"PL Renewal","typeGuid":"7172d4e5-0fb7-4715-b644-425e0da40baf","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8381,"name":"Indexing 1","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8382,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8391,"name":"Account Manager","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8392,"name":"RSP","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8393,"name":"Case 1","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8394,"name":"Compliance","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8395,"name":"AM Review","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8396,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8433,"name":"Manual 1","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8434,"name":"Split 1","typeGuid":"bb5a6433-89a3-4614-9b78-007645735af0","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8435,"name":"Manual 2","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8436,"name":"Manual 3","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8437,"name":"Manual 4","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8438,"name":"Rendezvous 1","typeGuid":"127494e5-d4f7-453d-bdc0-d3bd1ee8438f","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8439,"name":"Manual 5","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8440,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8511,"name":"Indexing 1","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8512,"name":"Manual 1","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8513,"name":"Manager 1","typeGuid":"e858a1b7-c137-4dc4-acb1-e6c9ee420b64","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8514,"name":"Manual 2","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8515,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8521,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8522,"name":"Indexing 1","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8523,"name":"Manual 1","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8524,"name":"Manual 2","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8525,"name":"Manual 3","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8526,"name":"Manual 4","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8529,"name":"Manual 1","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8530,"name":"Manual 2","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8531,"name":"Manual 3","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8532,"name":"Manual 4","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8533,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8711,"name":"Manager 1","typeGuid":"e858a1b7-c137-4dc4-acb1-e6c9ee420b64","status":0,"effectivePermissions":-1,"debug":false,"isStart":true}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8541,"name":"Manual 1","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8542,"name":"Manual 2","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8543,"name":"ADMIN ASSISTANT","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8544,"name":"Manual 4","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8545,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8551,"name":"Claims Indexing","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8560,"name":"SimpleIndex","typeGuid":"790490c6-77ab-4577-9f18-5245b9804f54","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8561,"name":"Adjuster","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8562,"name":"Admin","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8563,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8564,"name":"Case 1","typeGuid":"a69902c0-1a91-4113-8f03-839b0d95ec41","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8565,"name":"Manager","typeGuid":"e858a1b7-c137-4dc4-acb1-e6c9ee420b64","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8571,"name":"Rescan Claim","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8599,"name":"Delay1","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8600,"name":"Verify","typeGuid":"790490c6-77ab-4577-9f18-5245b9804f54","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":8651,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":8652,"name":"General Indexing","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":8653,"name":"Inbox","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":9181,"name":"Manual 1","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":9182,"name":"Manual 2","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":9183,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":210265,"name":"Script 1","typeGuid":"790490c6-77ab-4577-9f18-5245b9804f54","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":9401,"name":"Indexing 1","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":9402,"name":"Manual 1","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":9403,"name":"Manual 2","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":9404,"name":"Manual 3","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":9405,"name":"Manual 4","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":9406,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[{"buddies":[],"id":9531,"name":"Indexing 1","typeGuid":"445767f6-d9b3-4a3a-a567-91506a02aea5","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":9532,"name":"Manual 1","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":9533,"name":"Manual 2","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":9534,"name":"Manual 3","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":true},{"buddies":[],"id":9535,"name":"Manual 4","typeGuid":"be3a6bcb-1fb3-4973-b798-4827d13de7b6","status":0,"effectivePermissions":-1,"debug":false,"isStart":false},{"buddies":[],"id":9536,"name":"End","typeGuid":"1aa6c21d-175d-491c-9d75-a53df0d249c2","status":0,"effectivePermissions":-1,"debug":false,"isStart":false}]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        '[]\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4--\r\n' +
        '\r\n';

    return response;
}

/*  
    Name: _getCopyBatch(); 
    Required to populate Copy Modal;

    Linked with: 
        File -> oneFolderOneFolderType;
        FileTree -> singleFolderMultiDoc;
        Content -> oneFolderTypeTestRoute;
*/
function _getCopyBatch() {
    
    /* folder items; */
    var folders = [
        {
            "name":"File Note",
            "typeId":114,
            "typeDescription": "File Note",
            "effectivePermissions":-1,
            "objectClass":-2,
            "dateCreated":"2016-05-05T09:33:54.963Z",
            "dateLastModified":"2016-05-05T09:33:56.547Z",
            "id":311,
            "description":"FileNote"
        }];

    /* doc items; */
    var docs = [
        {
            "documentDate":"2016-05-05T00:00:00Z",
            "receivedDate":"2016-05-05T09:31:37Z",
            "name": "Doc1",
            "typeId":168,
            "typeDescription": "Renewal Instructions",
            "effectivePermissions":-1,
            "objectClass":-1,
            "dateCreated":"2016-05-05T09:33:55.13Z",
            "dateLastModified":"2016-05-05T09:33:56.547Z",
            "id":312,
            "description": "Doc1"
        },
        {
            "documentDate":"2016-05-05T00:00:00Z",
            "receivedDate":"2016-05-05T09:31:37Z",
            "name": "Doc2",
            "typeId":168,
            "typeDescription": "Renewal Instructions",
            "effectivePermissions":-1,
            "objectClass":-1,
            "dateCreated":"2016-05-05T09:33:55.13Z",
            "dateLastModified":"2016-05-05T09:33:56.547Z",
            "id": 6110,
            "description": "Doc2"
        }];

    /* convert arrays; */
    var folderStr = JSON.stringify(folders);
    var docsStr = JSON.stringify(docs);
    
    /* construct responce;  */
    var resp = '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' +
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' +
        'HTTP/1.1 200 OK\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n' +
        '\r\n' +
        folderStr + '\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n' + 
        'Content-Type: application/http; msgtype=response\r\n' +
        '\r\n' + 
        'HTTP/1.1 200 OK\r\n' + 
        'Content-Type: application/json; charset=utf-8\r\n' + 
        '\r\n' +
        docsStr + '\r\n' +
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4--\r\n' +
        '\r\n';
    console.log(' ++++++++++++++ ++++++++++++++++++');
    return resp;
}

function _getSlaBatch(){
    var resp = '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4\r\n'+
        'Content-Type: application/http; msgtype=response\r\n'+
        '\r\n'+
        'HTTP/1.1 200 OK\r\n'+
        'Content-Type: application/json; charset=utf-8\r\n'+
        '\r\n'+
        '{"items":' +
        '[{"id":null,"ageModel":{"id":0,"from":null,"to":2880},"ageCalculationAlgorithm":0,"count":5,"name":null},' +
        '{"id":null,"ageModel":{"id":1,"from":2880,"to":43200},"ageCalculationAlgorithm":0,"count":2,"name":null},' +
        '{"id":null,"ageModel":{"id":2,"from":43200,"to":86400},"ageCalculationAlgorithm":0,"count":6,"name":null},' +
        '{"id":null,"ageModel":{"id":3,"from":86400,"to":null},"ageCalculationAlgorithm":0,"count":3,"name":null}],' +
        '"nextPageLink":null,"count":4}\r\n'+
        '--5b8e8d0f-afb6-4b1f-a701-ad001678faf4--\r\n'+
        '\r\n';

    return resp;
}

exports.getBatch = function (req, res) {

    var response = '';

    res.set('Cache-Control', 'no-cache');
    res.set('Content-Type', 'multipart/mixed; boundary="5b8e8d0f-afb6-4b1f-a701-ad001678faf4"');
    res.set('Expires', '-1');
    res.set('Pragma', 'no-cache');

    var body = req.body;

    if (body.indexOf('api/instances/2724232/children HTTP/1.1') > -1) {
        response = _getInstancesBatch();
    } else if (body.indexOf('api/instances/654461') > -1) {
        response = _getCopyBatch();
    } else if (body.indexOf('api/workflows/-2147483638') > -1) {
        response = _getWorkflowsBatch();
    } else if (body.indexOf('/api/tasks/210782/unlock HTTP/1.1') > -1) {
        response = _getUnlockTasksBatch();
    } else if (body.indexOf('/api/dashboard/taskcount HTTP/1.1') > -1){
        response = _getSlaBatch();
    }
    else {
        response = _getDefaultBatch();
    }

    res.send(response);
    res.end();

};