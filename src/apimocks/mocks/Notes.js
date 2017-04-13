/**
 * Created by emmertco on 10/9/2014.
 */
var mocks = [];

/**
 * @api {post}
 * @apiName
 * @apiGroup
 */

var LockNotes = {
    name: 'lockNotes',
    mockRoute: '/api/objects/123/notes/regular/lock',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [function () {
        return '';
    }]
};
mocks.push(LockNotes);

/**
 * @api {post}
 * @apiName
 * @apiGroup
 */

var GetNotes = {
    name: 'getNotes',
    mockRoute: '\/api\/objects\/.*\/notes\/regular',
    testScope: 'success', //success | fail | error
    testScenario: 'noNotes',
    jsonTemplate: [{
        defaultRoute: function () {
            var result = [
                {
                "id": 0,
                "version": 35,
                "category": "Regular",
                "isDeleted": false,
                "notes": [{
                    "noteId": 380,
                    "isDefault": false,
                    "status": "Deleted",
                    "items": [{
                        "itemId": 1,
                        "replaced": null,
                        "timeStamp": "2014-08-20T09:02:33.4040862",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">Note #1</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 2,
                        "replaced": null,
                        "timeStamp": "2014-08-20T09:04:28.6726111",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">Note #2</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 3,
                        "replaced": null,
                        "timeStamp": "2014-08-20T09:05:20.7380926",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">Note #3</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }
                    ]
                }, {
                    "noteId": 382,
                    "isDefault": false,
                    "status": "Deleted",
                    "items": [{
                        "itemId": 1,
                        "replaced": null,
                        "timeStamp": "2014-08-20T09:02:33.4040862",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">Note #1</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 2,
                        "replaced": null,
                        "timeStamp": "2014-08-20T09:04:28.6726111",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">Note #2</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 3,
                        "replaced": null,
                        "timeStamp": "2014-08-20T09:05:20.7380926",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">Note #3</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }
                    ]
                }, {
                    "noteId": 390,
                    "isDefault": false,
                    "status": "Cut",
                    "items": [{
                        "itemId": 10,
                        "replaced": null,
                        "timeStamp": "2014-08-20T09:29:46.848926",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">1</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }
                    ]
                }, {
                    "noteId": 392,
                    "isDefault": false,
                    "status": "Cut",
                    "items": [{
                        "itemId": 10,
                        "replaced": null,
                        "timeStamp": "2014-08-20T09:29:46.848926",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">1</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }
                    ]
                }, {
                    "noteId": 394,
                    "isDefault": false,
                    "status": "Deleted",
                    "items": [{
                        "itemId": 10,
                        "replaced": null,
                        "timeStamp": "2014-08-20T09:29:46.848926",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">1</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }
                    ]
                }, {
                    "noteId": 396,
                    "isDefault": false,
                    "status": "Cut",
                    "items": [{
                        "itemId": 13,
                        "replaced": null,
                        "timeStamp": "2013-08-20T09:38:34.1010134",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">123</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 10,
                        "replaced": null,
                        "timeStamp": "2012-08-20T09:29:46.848926",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">1</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 20,
                        "replaced": null,
                        "timeStamp": "2014-09-20T12:11:27.4583919",
                        "text": "My awesome note!",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 21,
                        "replaced": null,
                        "timeStamp": "2015-08-20T12:11:28.0929872",
                        "text": "My awesome note!",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 22,
                        "replaced": null,
                        "timeStamp": "2014-08-24T12:12:09.0801358",
                        "text": "My awesome note!",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 23,
                        "replaced": null,
                        "timeStamp": "2014-01-20T12:12:23.2387466",
                        "text": "My awesome note!",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 24,
                        "replaced": null,
                        "timeStamp": "2000-08-20T12:12:35.1326265",
                        "text": "My awesome note!",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 25,
                        "replaced": null,
                        "timeStamp": "2014-04-20T12:12:50.9747839",
                        "text": "My awesome note!",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 26,
                        "replaced": null,
                        "timeStamp": "2014-03-20T12:13:13.9367391",
                        "text": "My awesome note!",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 27,
                        "replaced": null,
                        "timeStamp": "2014-12-20T12:13:35.5577727",
                        "text": "My awesome note!",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 30,
                        "replaced": null,
                        "timeStamp": "2015-03-20T12:17:34.2243363",
                        "text": "My awesome note!",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 31,
                        "replaced": null,
                        "timeStamp": "2014-07-15T12:17:52.1243282",
                        "text": "My awesome note!",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }
                    ]
                }, {
                    "noteId": 398,
                    "isDefault": false,
                    "status": "Cut",
                    "items": [{
                        "itemId": 13,
                        "replaced": null,
                        "timeStamp": "2014-08-20T09:38:34.1010134",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">123</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 10,
                        "replaced": null,
                        "timeStamp": "2014-08-20T09:29:46.848926",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">1</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }
                    ]
                }, {
                    "noteId": 400,
                    "isDefault": false,
                    "status": "Cut",
                    "items": [{
                        "itemId": 13,
                        "replaced": null,
                        "timeStamp": "2014-08-20T09:38:34.1010134",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">123</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }, {
                        "itemId": 10,
                        "replaced": null,
                        "timeStamp": "2014-08-20T09:29:46.848926",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">1</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }
                    ]
                }, {
                    "noteId": 410,
                    "isDefault": true,
                    "status": "Visible",
                    "items": [{
                        "itemId": 40,
                        "replaced": null,
                        "timeStamp": "2014-10-22T09:26:32.0039986",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">123</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": ""
                    }
                    ]
                }
                ]
            }, {
                "id": 11,
                "version": 3,
                "category": "Calculated",
                "isDeleted": false,
                "notes": [{
                    "noteId": 395,
                    "isDefault": true,
                    "status": "Deleted",
                    "items": [{
                        "amount": 1.0,
                        "itemId": 12,
                        "replaced": null,
                        "timeStamp": "2014-08-20T09:34:49.9211057",
                        "text": "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">\r\n<HTML>\r\n<head>\r\n<meta content=\"TX14_HTM 14.0.236.500\" name=GENERATOR>\r\n<title></title>\r\n</head>\r\n<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n<p style=\"margin-top: 5pt;margin-bottom: 5pt;\"><span style=\"font-family:'Arial';font-size:10pt;\">123</span></p></body>\r\n</html>",
                        "drawer": "Commercial",
                        "fileNumber": "TF #1",
                        "isHidden": false,
                        "userName": "Rastsislau Chartkou"
                    }
                    ]
                }
                ]
            }
            ];
            return JSON.stringify(result);

        }},{
        noNotes: function () {
            return '{}';
        }}
    ]
};
mocks.push(GetNotes);

exports.mocks = mocks;