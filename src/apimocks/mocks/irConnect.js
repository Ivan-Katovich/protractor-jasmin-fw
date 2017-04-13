/**
 * Created by jeff on 4/14/2016.
 */

var mocks = [];

/**
 * @api {get} /token token
 * @apiName token
 * @apiGroup irConnect
 */
var token = {
    name: 'token',
    mockRoute: '/token',
    testScope: 'success', //success | fail | error
    testScenario: 'bearerToken',
    jsonTemplate: [{bearerToken: function () {
        var token = {
            "access_token":"token",
            "token_type":"bearer",
            "expires_in":86399,
            "nonce":"nonce",
            ".issued":"Mon, 21 Mar 2016 14:45:24 GMT",
            ".expires":"Tue, 22 Mar 2016 14:45:24 GMT"
        };
        return JSON.stringify(token);
    }}]
};
mocks.push(token);

/**
 * @api {get} /irconnect/negotiate negotiate
 * @apiName negotiate
 * @apiGroup irConnect
 */
var negotiate = {
    name: 'negotiate',
    mockRoute: '/irconnect/negotiate',
    testScope: 'success', //success | fail | error
    testScenario: 'negotiate',
    jsonTemplate: [{negotiate: function () {
        var negotiate = {
            "Url":"/irconnect",
            "ConnectionToken":"token",
            "KeepAliveTimeout":20.0,
            "DisconnectTimeout":30.0,
            "ConnectionTimeout":110.0,
            "TryWebSockets":true, //probably better to send false, otherwise web client will try to establish web socket connection…
            "ProtocolVersion":"1.5",
            "TransportConnectTimeout":5.0,
            "LongPollDelay":0.0
        };
        return JSON.stringify(negotiate);
    }}]
};
mocks.push(negotiate);

/**
 * @api {get} /irconnect/connect connect
 * @apiName connect
 * @apiGroup irConnect
 */
var connect = {
    name: 'connect',
    mockRoute: '/irconnect/connect',
    testScope: 'success', //success | fail | error
    testScenario: 'connect',
    jsonTemplate: [{connect: function () {
        var connect =  {"C":"d-9CD97E43-E,0|P,0|Q,1","S":1,"M":[]};
        return JSON.stringify(connect);
    }}]
};
mocks.push(connect);

/**
 * @api {get} /irconnect/start start
 * @apiName start
 * @apiGroup irConnect
 */
var start = {
    name: 'start',
    mockRoute: '/irconnect/start',
    testScope: 'success', //success | fail | error
    testScenario: 'start',
    jsonTemplate: [{start: function () {
        var start =  { "Response": "started" };
        return JSON.stringify(start);
    }}]
};
mocks.push(start);

/**
 * @api {get} /irconnect/poll poll
 * @apiName poll
 * @apiGroup irConnect
 */
var poll = {
    name: 'poll',
    mockRoute: '/irconnect/poll',
    testScope: 'success', //success | fail | error
    testScenario: 'poll',
    jsonTemplate: [{poll: function () {
            var poll =  {
                "C" : "d-9CD97E43-E,0|P,1|Q,1",
                "M" : [{
                    "H" : "ImageRightConnectNotificationsHub",
                    "M" : "PushItems",
                    "A" : [[{
                        "Name" : "2.ZIP",
                        "DateCreated" : "2016-03-14T11:56:20.4845514Z",
                        "Size" : 250906097
                    }, {
                        "Name" : "BMP.bmp",
                        "DateCreated" : "2016-03-17T13:20:57.7020911Z",
                        "Size" : 11220054
                    }, {
                        "Name" : "cover.jpg",
                        "DateCreated" : "2016-03-16T08:08:32.7977784Z",
                        "Size" : 15122
                    }, {
                        "Name" : "New Text Document (2).txt",
                        "DateCreated" : "2016-03-14T09:21:24.9477635Z",
                        "Size" : 0
                    }, {
                        "Name" : "New Text Document.txt",
                        "DateCreated" : "2016-03-10T12:55:49.7059134Z",
                        "Size" : 0
                    }
                    ]]
                }
                ]
            };
            return JSON.stringify(poll);
        }},
        {upload: function () {
            var upload =  {
                "C" : "d-9CD97E43-E,0|P,6B|Q,1",
                "M" : [{
                    "H" : "ImageRightConnectNotificationsHub",
                    "M" : "UploadFinished",
                    "A" : [{
                        "Results" : [{
                            "FileName" : "BMP.bmp",
                            "Status" : 1,
                            "PageId" : 43841
                        }
                        ],
                        "Status" : 2,
                        "UploadId" : "GUID"
                    }
                    ]
                }
                ]
            };
            return JSON.stringify(upload);
        }}]
};
mocks.push(poll);

exports.mocks = mocks;