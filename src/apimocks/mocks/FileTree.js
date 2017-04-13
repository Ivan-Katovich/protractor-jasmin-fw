/**
 * Created by flaterje on 5/13/2014.
 */
var mocks = [];


/**
 * @api {get} /FileTree/GetDocumentPages Get Document Pages
 * @apiName GetDocumentPages
 * @apiGroup FileTree
 * @apiParam {String} id
 */
var GetDocumentPages = {
    name: 'GetDocumentPages',
    mockRoute: '/FileTree/GetDocumentPages',
    testScope: 'success',
    testScenario: 'defaultRoute',
    jsonTemplate: [
        {
            manyItems: function () {
                return '{' +
                    '	"Success": true,' +
                    '	"PageData": [' +
                    '		{' +
                    '			"Name": "Sticky Note 1",' +
                    '			"Id": "17",' +
                    '			"success": false,' +
                    '            "ContentType" : "msg",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false' +
                    '		},' +
                    '		{' +
                    '			"Name": "Sticky Note 2",' +
                    '			"Id": "93355",' +
                    '			"success": false,' +
                    '            "ContentType" : "jpg",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false' +
                    '		},' +
                        '		{' +
                        '			"Name": "Sticky Note 2",' +
                        '			"Id": "1568",' +
                        '			"success": false,' +
                        '            "ContentType" : "xls",' +
                        '            "WebDavURL" : "",' +
                    '                "LockLost": false' +
                        '		},' +
                        '		{' +
                        '			"Name": "Sticky Note 2",' +
                        '			"Id": "178908",' +
                        '			"success": false,' +
                        '            "ContentType" : "xlsx",' +
                        '            "WebDavURL" : "ms-word:ofe|u|https://webdavserverurl/file.xlsx",' +
                    '               "LockLost": false' +
                        '		},' +
                        '		{' +
                        '			"Name": "Text From File",' +
                        '			"Id": "188",' +
                        '			"success": false,' +
                        '            "ContentType" : "doc",' +
                        '            "WebDavURL" : "ms-word:ofe|u|https://webdavserverurl/file.doc",' +
                    '               "LockLost": false' +
                        '		},' +
                        '		{' +
                        '			"Name": "Text From File",' +
                        '			"Id": "1445",' +
                        '			"success": false,' +
                        '            "ContentType" : "docx",' +
                        '            "WebDavURL" : "",' +
                    '               "LockLost": false' +
                        '		},' +
                        '		{' +
                        '			"Name": "Text From File",' +
                        '			"Id": "14355",' +
                        '			"success": false,' +
                        '            "ContentType" : "ppt",' +
                        '            "WebDavURL" : "",' +
                    '               "LockLost": false' +
                        '		},' +
                        '		{' +
                        '			"Name": "Text From File",' +
                        '			"Id": "14755",' +
                        '			"success": false,' +
                        '            "ContentType" : "pptx",' +
                        '            "WebDavURL" : "ms-word:ofe|u|https://webdavserverurl/file.pptx",' +
                    '               "LockLost": false' +
                        '		},' +
                    '		{' +
                    '			"Name": "Text From File",' +
                    '			"Id": "93355",' +
                    '			"success": false,' +
                    '            "ContentType" : "tiff",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false' +
                    '		},' +
                    '		{' +
                    '			"Name": "Secured Stamp (Pinned)",' +
                    '			"Id": "16",' +
                    '			"success": false,' +
                    '            "ContentType" : "tiff",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false' +
                    '		}' +
                    '	],' +
                    '	"Total": 10' +
                    '}';
            }
        },
        {
            audioVideo: function () {
                return '{' +
                    '	"Success": true,' +
                    '	"PageData": [' +
                    '		{' +
                    '			"Name": "Mp3 Audio",' +
                    '			"Id": "17",' +
                    '			"success": false,' +
                    '            "ContentType" : "mp3",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false,' +
                    '           "ImageId": "114",' +
                    '           "ImageVersion": "0"' +
                    '		},' +
                    '		{' +
                    '			"Name": "wav audio",' +
                    '			"Id": "18",' +
                    '			"success": false,' +
                    '            "ContentType" : "wav",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false,' +
                    '           "ImageId": "115",' +
                    '           "ImageVersion": "1"' +
                    '		},' +
                    '		{' +
                    '			"Name": "ogg audio",' +
                    '			"Id": "1568",' +
                    '			"success": false,' +
                    '            "ContentType" : "ogg",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false,' +
                    '           "ImageId": "116",' +
                    '           "ImageVersion": "0"' +
                    '		},' +
                    '		{' +
                    '			"Name": "oga audio",' +
                    '			"Id": "178908",' +
                    '			"success": false,' +
                    '            "ContentType" : "oga",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false,' +
                    '           "ImageId": "117",' +
                    '           "ImageVersion": "3"' +
                    '		},' +
                    '		{' +
                    '			"Name": "mp4 video",' +
                    '			"Id": "188",' +
                    '			"success": false,' +
                    '            "ContentType" : "mp4",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false,' +
                    '           "ImageId": "118",' +
                    '           "ImageVersion": "2"' +
                    '		},' +
                    '		{' +
                    '			"Name": "webm video",' +
                    '			"Id": "1445",' +
                    '			"success": false,' +
                    '            "ContentType" : "webm",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false,' +
                    '           "ImageId": "119",' +
                    '           "ImageVersion": "4"' +
                    '		},' +
                    '		{' +
                    '			"Name": "ogv video",' +
                    '			"Id": "1445",' +
                    '			"success": false,' +
                    '            "ContentType" : "ogv",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false,' +
                    '           "ImageId": "120",' +
                    '           "ImageVersion": "0"' +
                    '		}' +
                    '	],' +
                    '	"Total": 7' +
                    '}';
            }
        },
        {
            defaultRoute: function () {
            return '{' +
                '	"Success": true,' +
                '	"PageData": [' +
                '		{' +
                '			"Name": "Sticky Note 1",' +
                '			"Id": "17",' +
                '			"success": false,' +
                '            "ContentType" : "jpg",' +
                '            "WebDavURL" : "",' +
                '           "LockLost": false' +
                '		}' +
                '	],' +
                '	"Total": 1' +
                '}';
            }
        },
        {
            msgPage: function () {
                return '{' +
                    '	"Success": true,' +
                    '	"PageData": [' +
                    '		{' +
                    '			"Name": "Email msg",' +
                    '			"Id": "17",' +
                    '			"success": false,' +
                    '            "ContentType" : "msg",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false' +
                    '		}' +
                    '	],' +
                    '	"Total": 1' +
                        '}';
            }
        },
        {
            noNamePage: function () {
               return '{' +
                   '	"Success": true,' +
                   '	"PageData": [' +
                   '		{' +
                   '			"Name": "",' +
                   '			"Id": "17",' +
                   '			"success": false,' +
                   '            "ContentType" : "jpg",' +
                   '            "WebDavURL" : "",' +
                   '           "LockLost": false' +
                   '		}' +
                   '	],' +
                   '	"Total": 1' +
                   '}';
           }
        },
        {
            addPageTestSinglePage: function () {
                var result = {
                    Success: true,
                    PageData: [{
                        Name: 'Single Page',
                        Id: '12345',
                        success: false,
                        ContentType: 'png',
                        WebDavURL: '',
                        LockLost: false
                    }],
                    Total: 1
                };
                return JSON.stringify(result);
            }
        },
        {
            addPageTestNinePages: function () {
                var pages = [];
                for (var i = 0; i < 9; i++) {
                    pages.push({
                        Name: 'Page ' + (i + 1),
                        Id: '1234' + i,
                        success: false,
                        ContentType: 'png',
                        WebDavURL: '',
                        LockLost: false
                    });
                }
                var result = {
                    Success: true,
                    PageData: pages,
                    Total: 9
                };
                return JSON.stringify(result);
            }
        },
        {
            twoPages: function() {
                var pages = [];
                for (var i = 0; i < 2; i++) {
                    pages.push({
                        Name: 'Page ' + (i + 1),
                        Id: '1234' + i,
                        success: false,
                        ContentType: 'png',
                        WebDavURL: '',
                        LockLost: false
                    });
                }
                var result = {
                    Success: true,
                    PageData: pages,
                    Total: 2
                };
                return JSON.stringify(result);
            }
        },
        {
            scrollingPages: function() {
                var pages = [];
                for (var i = 0; i < 100; i++) {
                    pages.push({
                        Name: 'Page ' + (i + 1),
                        Id: '1234' + i,
                        success: false,
                        ContentType: 'png',
                        WebDavURL: '',
                        LockLost: false
                    });
                }
                var result = {
                    Success: true,
                    PageData: pages,
                    Total: 9
                };
                return JSON.stringify(result);
            }
        },
        {
            oga: function() {
                var pages = [];
                for (var i = 0; i < 100; i++) {
                    pages.push({
                        Name: 'Page ' + (i + 1),
                        Id: '1234' + i,
                        success: false,
                        ContentType: 'mp4',
                        WebDavURL: '',
                        LockLost: false
                    });
                }
                var result = {
                    Success: true,
                    PageData: pages,
                    Total: 9
                };
                return JSON.stringify(result);
            }
        },
        {
            webDavPages: function () {
                return '{' +
                    '	"Success": true,' +
                    '	"PageData": [' +
                    '		{' +
                    '			"Name": "doc.doc",' +
                    '			"Id": "17",' +
                    '			"success": true,' +
                    '            "ContentType" : "doc",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false' +
                    '		},' +
                    '		{' +
                    '			"Name": "docb.docb",' +
                    '			"Id": "93355",' +
                    '			"success": true,' +
                    '            "ContentType" : "docb",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false' +
                    '		},' +
                        '		{' +
                        '			"Name": "Sticky Note 2",' +
                        '			"Id": "1568",' +
                        '			"success": false,' +
                        '            "ContentType" : "xls",' +
                        '            "WebDavURL" : "",' +
                    '                "LockLost": false' +
                        '		},' +
                        '		{' +
                        '			"Name": "Sticky Note 2",' +
                        '			"Id": "178908",' +
                        '			"success": false,' +
                        '            "ContentType" : "xlsx",' +
                        '            "WebDavURL" : "ms-word:ofe|u|https://webdavserverurl/file.xlsx",' +
                    '               "LockLost": false' +
                        '		},' +
                        '		{' +
                        '			"Name": "Text From File",' +
                        '			"Id": "188",' +
                        '			"success": false,' +
                        '            "ContentType" : "doc",' +
                        '            "WebDavURL" : "ms-word:ofe|u|https://webdavserverurl/file.doc",' +
                    '               "LockLost": false' +
                        '		},' +
                        '		{' +
                        '			"Name": "Text From File",' +
                        '			"Id": "1445",' +
                        '			"success": false,' +
                        '            "ContentType" : "docx",' +
                        '            "WebDavURL" : "",' +
                    '               "LockLost": false' +
                        '		},' +
                        '		{' +
                        '			"Name": "Text From File",' +
                        '			"Id": "14355",' +
                        '			"success": false,' +
                        '            "ContentType" : "ppt",' +
                        '            "WebDavURL" : "",' +
                    '               "LockLost": false' +
                        '		},' +
                        '		{' +
                        '			"Name": "Text From File",' +
                        '			"Id": "14755",' +
                        '			"success": false,' +
                        '            "ContentType" : "pptx",' +
                        '            "WebDavURL" : "ms-word:ofe|u|https://webdavserverurl/file.pptx",' +
                    '               "LockLost": false' +
                        '		},' +
                    '		{' +
                    '			"Name": "Text From File",' +
                    '			"Id": "93355",' +
                    '			"success": false,' +
                    '            "ContentType" : "tiff",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false' +
                    '		},' +
                    '		{' +
                    '			"Name": "Secured Stamp (Pinned)",' +
                    '			"Id": "16",' +
                    '			"success": false,' +
                    '            "ContentType" : "tiff",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false' +
                    '		}' +
                    '	],' +
                    '	"Total": 10' +
                    '}';
            }
        },
        {
            allPrintableTypes: function() {
                return '{' +
                    '	"Success": true,' +
                    '	"PageData": [' +
                    '		{' +
                    '			"Name": "txt",' +
                    '			"Id": "17",' +
                    '			"success": false,' +
                    '            "ContentType" : "txt",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false' +
                    '		},' +
                    '		{' +
                    '			"Name": "gif",' +
                    '			"Id": "18",' +
                    '			"success": false,' +
                    '            "ContentType" : "gif",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false' +
                    '		},' +
                        '		{' +
                        '			"Name": "png",' +
                        '			"Id": "1568",' +
                        '			"success": false,' +
                        '            "ContentType" : "png",' +
                        '            "WebDavURL" : "",' +
                    '                "LockLost": false' +
                        '		},' +
                        '		{' +
                        '			"Name": "bmp",' +
                        '			"Id": "178908",' +
                        '			"success": false,' +
                        '            "ContentType" : "bmp",' +
                        '            "WebDavURL" : "",' +
                    '               "LockLost": false' +
                        '		},' +
                        '		{' +
                        '			"Name": "jpg",' +
                        '			"Id": "188",' +
                        '			"success": false,' +
                        '            "ContentType" : "jpg",' +
                        '            "WebDavURL" : "",' +
                    '               "LockLost": false' +
                        '		},' +
                        '		{' +
                        '			"Name": "jpeg",' +
                        '			"Id": "1445",' +
                        '			"success": false,' +
                        '            "ContentType" : "jpeg",' +
                        '            "WebDavURL" : "",' +
                    '               "LockLost": false' +
                        '		},' +
                        '		{' +
                        '			"Name": "tif",' +
                        '			"Id": "14355",' +
                        '			"success": false,' +
                        '            "ContentType" : "tif",' +
                        '            "WebDavURL" : "",' +
                    '               "LockLost": false' +
                        '		},' +
                        '		{' +
                        '			"Name": "tiff",' +
                        '			"Id": "14755",' +
                        '			"success": false,' +
                        '            "ContentType" : "tiff",' +
                        '            "WebDavURL" : "",' +
                    '               "LockLost": false' +
                        '		},' +
                    '		{' +
                    '			"Name": "psd",' +
                    '			"Id": "93355",' +
                    '			"success": false,' +
                    '            "ContentType" : "psd",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false' +
                    '		},' +
                    '		{' +
                    '			"Name": "pdf",' +
                    '			"Id": "16",' +
                    '			"success": false,' +
                    '            "ContentType" : "pdf",' +
                    '            "WebDavURL" : "",' +
                    '           "LockLost": false' +
                    '		}' +
                    '	],' +
                    '	"Total": 10' +
                    '}';
            }
        }
    ]
};
mocks.push(GetDocumentPages);

/**
 * @api {get} /FileTree/GetFileTree Get File Tree
 * @apiName GetFileTree
 * @apiGroup FileTree
 * @apiParam {String} fileTypeId
 * @apiParam {String} id
 * @apiParam {String} node
 */

/**
 * Sample GET Data
 * fileTypeId = 255
 * id = file_280
 * node = root
 */

var data = {
    states: ['AL', 'GA', 'NY', 'FL', 'SC']
};

/*
* If the current route is not allowing the adding of pages/documents to that particular node
* Check the effectivePermissions
 */
var GetFileTree = {
    name: 'GetFileTree',
    mockRoute: '/FileTree/GetFileTree',
    testScope: 'success', //success | fail | error
    testScenario: 'defaultRoute',
    jsonTemplate: [
        {
            //0
            defaultRoute: function () {
                return '[' +
                    '  {' +
                    '"data": "File Note",' +
                    '"attr": {' +
                    '"id": "311",' +
                    '"typeId": "114",' +
                    '"rel": "folder"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '      {' +
                    '"data": "10\/3\/2013 Note",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "1937722",' +
                    '"typeId": "156",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/5\/2014 Note",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6110",' +
                    '"typeId": "156",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/5\/2014 Note",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6138",' +
                    '"typeId": "156",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/5\/2014 Note",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6139",' +
                    '"typeId": "156",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/5\/2014 Note",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6140",' +
                    '"typeId": "156",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/10\/2014 Note",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6341",' +
                    '"typeId": "156",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '      }' +
                    '    ]' +
                    '},' +
                    '  {' +
                    '"data": "Policy Info",' +
                    '"attr": {' +
                    '"id": "395",' +
                    '"typeId": "115",' +
                    '"rel": "folder"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '      {' +
                    '"data": "11\/2\/2013 Original Policy",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "397",' +
                    '"typeId": "157",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '      }' +
                    '    ]' +
                    '},' +
                    '  {' +
                    '"data": "Reinsurance",' +
                    '"attr": {' +
                    '"id": "396",' +
                    '"typeId": "117",' +
                    '"rel": "folder"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '    ]' +
                    '},' +
                    '  {' +
                    '"data": "Premium Finance",' +
                    '"attr": {' +
                    '"id": "398",' +
                    '"typeId": "116",' +
                    '"rel": "folder"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '    ]' +
                    '},' +
                    '  {' +
                    '"data": "New Mail",' +
                    '"attr": {' +
                    '"id": "399",' +
                    '"typeId": "110",' +
                    '"rel": "folder"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '      {' +
                    '"data": "11\/2\/2013 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "400",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/2\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "1147",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/2\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "1189",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/3\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "1227",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/3\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "1270",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/4\/2014 Miscellaneous",' +
                    '"attr": {' +
                    '"id": "1298",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/4\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "1327",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/4\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "1369",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/5\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "1397",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/6\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "1427",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/6\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "1469",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/7\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "1497",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/7\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "1525",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/7\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "1567",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/8\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "1597",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/8\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "1627",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/8\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "1669",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/24\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "3162",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/27\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "3197",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/27\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "3239",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/28\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "3267",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/28\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "3295",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/28\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "3337",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/29\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "3367",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/29\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "3397",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/30\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "3425",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/30\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "3453",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/31\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "3497",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "1\/31\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "3608",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/5\/2014 12",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6066",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/9\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6314",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/9\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6315",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '      }' +
                    '    ]' +
                    '},' +
                    '  {' +
                    '"data": "Underwriting Info",' +
                    '"attr": {' +
                    '"id": "528",' +
                    '"typeId": "113",' +
                    '"rel": "folder"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '      {' +
                    '"data": "11\/27\/2013 Audit",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "529",' +
                    '"typeId": "167",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '      }' +
                    '    ]' +
                    '},' +
                    '  {' +
                    '"data": "Underwriting Info",' +
                    '"attr": {' +
                    '"id": "3860",' +
                    '"typeId": "113",' +
                    '"rel": "folder"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '      {' +
                    '"data": "2\/3\/2014 Miscellaneous",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "3861",' +
                    '"typeId": "155",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/9\/2014 Audit",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6320",' +
                    '"typeId": "167",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/18\/2014 Audit",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6793",' +
                    '"typeId": "167",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '      }' +
                    '    ]' +
                    '},' +
                    '  {' +
                    '"data": "Print",' +
                    '"attr": {' +
                    '"id": "6221",' +
                    '"typeId": "6220",' +
                    '"rel": "folder"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '      {' +
                    '"data": "6\/6\/2014 Mail",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6222",' +
                    '"typeId": "111",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/6\/2014 DOC_Fomat",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6229",' +
                    '"typeId": "6223",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/6\/2014 PDF_Format",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6230",' +
                    '"typeId": "6224",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/6\/2014 GIF_Format",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6231",' +
                    '"typeId": "6225",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/6\/2014 JPEG_Format",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6232",' +
                    '"typeId": "6226",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/6\/2014 TXT_Format",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6233",' +
                    '"typeId": "6227",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/6\/2014 HTML_Format",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6234",' +
                    '"typeId": "6228",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '},' +
                    '      {' +
                    '"data": "6\/11\/2014 TIFF_MultiFormat",' +
                    '"description": "Foo Bar",' +
                    '"attr": {' +
                    '"id": "6471",' +
                    '"typeId": "6470",' +
                    '"rel": "document"' +
                    '},' +
                    '"state": null,' +
                    '"children": [' +
                    '' +
                    '        ]' +
                    '      }' +
                    '    ]' +
                    '  }' +
                    ']';
            }
        },
        {
            //1
            singleFolderAndDoc: function () {
                var result = [
                    {
                        "data": "Folder",
                        "attr": {
                            "id": "311",
                            "typeId": "114",
                            "rel": "folder"
                        },
                        "state": null,
                        "children": [
                            {
                                "data": "10/3/2013 Note",
                                "description": "Foo Bar",
                                "attr": {
                                    "id": "312",
                                    "typeId": "156",
                                    "rel": "document"
                                },
                                "state": null,
                                "children": []
                            }
                        ]
                    }
                ];
                return JSON.stringify(result);
            }
        },
        {
            //2
            singleFolderMultiDoc: function () {
                var result = [
                    {
                        "data": "Folder",
                        "attr": {
                            "id": "311",
                            "typeId": "114",
                            "rel": "folder"
                        },
                        "state": null,
                        "children": [
                            {
                                "data": "10/3/2013 Doc1",
                                "description": "Foo Bar",
                                "attr": {
                                    "id": "312",
                                    "typeId": "156",
                                    "rel": "document"
                                },
                                "state": null,
                                "children": []
                            },
                            {
                                "data": "10/3/2013 Doc2",
                                "description": "Foo Bar2",
                                "attr": {
                                    "id": "6110",
                                    "typeId": "156",
                                    "rel": "document"
                                },
                                "state": null,
                                "children": []
                            }
                        ]
                    }
                ];
                return JSON.stringify(result);
            }
        },
        {
            //3
            addPageTestSingleFolderDocPage: function () {
                var result = [
                    {
                        "data": "Folder",
                        "attr": {
                            "id": "311",
                            "typeId": "114",
                            "rel": "folder"
                        },
                        "state": null,
                        "children": [
                            {
                                "data": "10/3/2013 Note",
                                "description": "Foo Bar",
                                "attr": {
                                    "id": "1234",
                                    "typeId": "156",
                                    "rel": "document"
                                },
                                "state": null,
                                "children": [],
                                "effectivePermissions": -1
                            }
                        ],
                        "effectivePermissions": -1
                    }
                ];
                return JSON.stringify(result);
            }
        },
        {
            //4
            singleDocument: function () {
                var result = [
                    {
                        "data": "10/3/2013 Foo Bar",
                        "description": "Foo Bar",
                        "attr": {
                            "id": "1234",
                            "typeId": "156",
                            "rel": "document"
                        },
                        "state": null,
                        "children": []
                    }
                ];
                return JSON.stringify(result);
            }
        },
        {
            //5
            singleFolderWithNotes: function () {
                var result = [
                    {
                        "parent":null,
                        "data":"Audit Information",
                        "description":null,
                        "id":"2724250",
                        "typeId":"110",
                        "expanded":false,
                        "depth":0,
                        "attr":{
                            "id":"2724250",
                            "typeId":"110",
                            "rel":"folder"
                        },
                        "state":null,
                        "children":[
                        ],
                        "loadingChildren":false,
                        "type":"folder",
                        "contentType":null,
                        "webDavUrl":null,
                        "lockLost":false,
                        "metadata":null,
                        "document":null,
                        "gotPages":false,
                        "gotNotes":true,
                        "canAddFolder":false,
                        "wasAdded":false,
                        "notes":[
                            {
                                "notes": [
                                    {
                                        "noteId": 457420,
                                        "isDefault": true,
                                        "status": 0,
                                        "items": [
                                            {
                                                "itemId": 201251,
                                                "replaced": null,
                                                "timeStamp": "2016-06-08T15:26:56.0070648Z",
                                                "text": "<p>ad</p>\n",
                                                "drawer": "UW",
                                                "fileNumber": "0600001",
                                                "isHidden": false,
                                                "userName": "Wang,Joshua (wangjo)"
                                            },
                                            {
                                                "itemId": 201252,
                                                "replaced": null,
                                                "timeStamp": "2016-06-08T15:35:11.895942Z",
                                                "text": "<p>this is a more specific note</p>\n",
                                                "drawer": "UW",
                                                "fileNumber": "0600001",
                                                "isHidden": false,
                                                "userName": "Wang,Joshua (wangjo)"
                                            }
                                        ],
                                        "notesVersion": null,
                                        "loading": false
                                    }
                                ]
                            }
                        ],
                        "pageInfo":null,
                        "noteItems":[

                        ],
                        "defaultSelectedPageId":null,
                        "index":0
                    }
                ];
                return JSON.stringify(result);
            }

        },
        {
            //6
            audioVideoTree: function () {
                var result = [
                    {
                        "data": "Audio",
                        "attr": {
                            "id": "311",
                            "typeId": "114",
                            "rel": "folder"
                        },
                        "state": null,
                        "children": [
                            {
                                "data": "10/3/2013 Video",
                                "description": "Video",
                                "attr": {
                                    "id": "312",
                                    "typeId": "156",
                                    "rel": "document"
                                },
                                "state": null,
                                "children": []
                            }
                        ]
                    }
                ];
                return JSON.stringify(result);
            }
        }
    ]
};

mocks.push(GetFileTree);

exports.mocks = mocks;