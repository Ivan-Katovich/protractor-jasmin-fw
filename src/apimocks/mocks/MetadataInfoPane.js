/**
 * Created by flaterje on 5/13/2014.
 */
var mocks = [];


/**
 * @api {get} /MetadataInfoPane/GetInstanceMetadata Get Instance Metadata
 * @apiName GetInstanceMetadata
 * @apiGroup MetadataInfoPane
 * @apiParam {String} id
 */
var GetInstanceMetadata = {
    name: 'GetInstanceMetadata',
    mockRoute: '/MetadataInfoPane/GetInstanceMetadata',
    testScope: 'success', //success | fail | error
    testScenario: 'defaultRoute',
    jsonTemplate: [{
        defaultRoute: function () { //Success:Scenario 0
            return '{' +
                '    "TypeTitle": "Document",' +
                '    "Description": "6/2/2014 New Mail",' +
                '    "PropertyTitle": "Properties",' +
                '    "Properties": [' +
                '        {' +
                '            "Label": "Modified Date",' +
                '            "Data": "7/14/2014 11:49:43 AM",' +
                '            "Tag": "TODO",' +
                '            "Editable": false' +
                '        },' +
                '        {' +
                '            "Label": "Created Date",' +
                '            "Data": "6/2/2014 3:11:03 PM",' +
                '            "Tag": "TODO",' +
                '            "Editable": false' +
                '        }' +
                '    ],' +
                '    "InformationTitle": "Information",' +
                '    "Information": [' +
                '        {' +
                '            "Label": "Document Date",' +
                '            "Data": "6/2/2014",' +
                '            "DataType": "string",' +
                '            "Tag": "TODO",' +
                '            "Editable": true' +
                '        },' +
                '        {' +
                '            "Label": "Received Date",' +
                '            "Data": "6/2/2014 3:10:55 PM",' +
                '            "DataType": "string",' +
                '            "Tag": "TODO",' +
                '            "Editable": true' +
                '        },' +
                '        {' +
                '            "Label": "Type",' +
                '            "Data": "New Mail",' +
                '            "DataType": "string",' +
                '            "Tag": "TODO",' +
                '            "Editable": true' +
                '        },' +
                '        {' +
                '            "Label": "Description",' +
                '            "Data": "New Mail",' +
                '            "DataType": "string",' +
                '            "Tag": "TODO",' +
                '            "Editable": true' +
                '        }' +
                '    ],' +
                '    "AttributesTitle": "Attributes",' +
                '    "Attributes":[' +
                '       {' +
                '           "Label":"PolicyYear",' +
                '           "Data":"2008",' +
                '           "DataType": "string",' +
                '           "Tag":"TODO",' +
                '           "Editable":true' +
                '       },' +
                '       {' +
                '           "Label":"PolicyMonth",' +
                '           "Data":"Foobar",' +
                '           "DataType": "string",' +
                '           "Tag":"TODO",' +
                '           "Editable":true' +
                '       }' +
                '    ]' +
                '}';
        }
    }
    ]
};
mocks.push(GetInstanceMetadata);

/**
 * @api {get} /MetadataInfoPane/GetFileInfoPaneData Get File Info Pane Data
 * @apiName GetFileInfoPaneData
 * @apiGroup MetadataInfoPane
 * @apiParam {String} fileId
 */
var GetFileInfoPaneData = {
    name: 'GetFileInfoPaneData',
    mockRoute: '/MetadataInfoPane/GetFileInfoPaneData',
    testScope: 'success', //success | fail | error
    testScenario: 'defaultRoute',
    jsonTemplate: [
        {
            defaultRoute: function () {
                var data = {
                    "IsErrored": false,
                    "Error": null,
                    "LocationLabel": "",
                    "Location": "",
                    "HasLocation": false,
                    "DrawerLabel": "Drawer",
                    "Drawer": "Underwriting Drawer",
                    "FileTypeLabel": "File Type",
                    "FileType": "P\u0026C Underwriting Files",
                    "FileTypeId": "626650",
                    "FileNumberLabel": "Policy Number",
                    "FileNumber": "0600001",
                    "FileNameLabel": "Policy Name",
                    "FileName": "Java the Cup",
                    "FileMarkSize": 16,
                    "FileMarksLabel": "File Marks",
                    "FileMarks": [],
                    "HasAttributes": true,
                    "Attributes": [{
                        "displayName": "Effective Date",
                        "displayValue": "05/01/2008"
                    }, {"displayName": "Expiration Date", "displayValue": "05/01/2009"}, {
                        "displayName": "Agency Name",
                        "displayValue": "Hilb Rogal \u0026 Hobbs Arizona"
                    }, {"displayName": "DBA", "displayValue": "Java the Cup"}, {
                        "displayName": "Type",
                        "displayValue": "GL"
                    }],
                    "FileId": "2724232",
                    "LockedTasks": null
                };
                return JSON.stringify(data);
            }
        }

    ]
};
mocks.push(GetFileInfoPaneData);

/**
 * @api {get} /MetadataInfoPane/GetInstanceMetadata Get Instance Metadata
 * @apiName GetInstanceMetadata
 * @apiGroup MetadataInfoPane
 * @apiParam {String} id
 */
var extensions = ["jpg", "tif", "doc", "pdf", "msg", "txt", "mp3", "xlxs", "xml", "ppt", "xls"];
var GetMsgMetadata = {
    name: 'getMsgMetadata',
    mockRoute: 'MetadataInfoPane/GetMsgMetadata',
    testScope: 'success', //success | fail | error
    testScenario: 'textEmailWithManyRecipientsAndAttachments',
    jsonTemplate: [{
        textEmailWithAttachments: function () { //Success:Scenario 0
            var data = {
                "to": ["jeff@test.com"],
                "from": "scott@test.com",
                "cc": ["corey@test.com"],
                "bcc": ["jeff@test.com"],
                "subject": "Test email",
                "bodyText": "This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.",
                "attachments": [{name: "one.zip", extension: "zip"}],
                "date": "3/1/2016 5:06:00 PM UTC"
            };
            return JSON.stringify(data);
        }
    }, {
        htmlEmailWithAttachments: function () { //Success:Scenario 1 html
            var data = {
                "to": ["scott@test.com"],
                "from": "jeff@test.com",
                "cc": [],
                "bcc": [],
                "subject": "Test email with 10 attachments and html body",
                "bodyText": "Hello there buddy\r\n\r\n",
                "bodyHtml": "\u003chtml xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" xmlns:m=\"http://schemas.microsoft.com/office/2004/12/omml\" xmlns=\"http://www.w3.org/TR/REC-html40\"\u003e\r\n\u003chead\u003e\r\n\u003cmeta name=Generator content=\"Microsoft Word 15 (filtered medium)\"\u003e\r\n\u003cstyle\u003e\r\n\u003c!--\r\n/* Font Definitions */\r\n@font-face\r\n\t{font-family:\"Cambria Math\";\r\n\tpanose-1:2 4 5 3 5 4 6 3 2 4;}\r\n@font-face\r\n\t{font-family:Calibri;\r\n\tpanose-1:2 15 5 2 2 2 4 3 2 4;}\r\n@font-face\r\n\t{font-family:Consolas;\r\n\tpanose-1:2 11 6 9 2 2 4 3 2 4;}\r\n/* Style Definitions */\r\np.MsoNormal, li.MsoNormal, div.MsoNormal\r\n\t{margin:0in;\r\n\tmargin-bottom:.0001pt;\r\n\tfont-size:11.0pt;\r\n\tfont-family:\"Calibri\",sans-serif;}\r\na:link, span.MsoHyperlink\r\n\t{mso-style-priority:99;\r\n\tcolor:#0563C1;\r\n\ttext-decoration:underline;}\r\na:visited, span.MsoHyperlinkFollowed\r\n\t{mso-style-priority:99;\r\n\tcolor:#954F72;\r\n\ttext-decoration:underline;}\r\np.MsoPlainText, li.MsoPlainText, div.MsoPlainText\r\n\t{mso-style-priority:99;\r\n\tmso-style-link:\"Plain Text Char\";\r\n\tmargin:0in;\r\n\tmargin-bottom:.0001pt;\r\n\tfont-size:11.0pt;\r\n\tfont-family:\"Calibri\",sans-serif;}\r\nspan.EmailStyle17\r\n\t{mso-style-type:personal;\r\n\tfont-family:\"Calibri\",sans-serif;\r\n\tcolor:windowtext;}\r\nspan.PlainTextChar\r\n\t{mso-style-name:\"Plain Text Char\";\r\n\tmso-style-priority:99;\r\n\tmso-style-link:\"Plain Text\";\r\n\tfont-family:\"Calibri\",sans-serif;}\r\n.MsoChpDefault\r\n\t{mso-style-type:export-only;\r\n\tfont-family:\"Calibri\",sans-serif;}\r\n@page WordSection1\r\n\t{size:8.5in 11.0in;\r\n\tmargin:1.0in 1.0in 1.0in 1.0in;}\r\ndiv.WordSection1\r\n\t{page:WordSection1;}\r\n--\u003e\r\n\u003c/style\u003e\r\n\u003c!--[if gte mso 9]\u003e\u003cxml\u003e\r\n\u003co:shapedefaults v:ext=\"edit\" spidmax=\"1026\" /\u003e\r\n\u003c/xml\u003e\u003c![endif]--\u003e\r\n\u003c!--[if gte mso 9]\u003e\u003cxml\u003e\r\n\u003co:shapelayout v:ext=\"edit\"\u003e\r\n\u003co:idmap v:ext=\"edit\" data=\"1\" /\u003e\r\n\u003c/o:shapelayout\u003e\u003c/xml\u003e\u003c![endif]--\u003e\r\n\u003c/head\u003e\r\n\u003cbody lang=EN-US link=\"#0563C1\" vlink=\"#954F72\"\u003e\r\n\u003cdiv class=WordSection1\u003e\r\n\u003cp class=MsoPlainText\u003e\r\n\u003cb\u003e\r\n\u003cspan style=\u0027font-size:28.0pt;color:red\u0027\u003e\r\nThis is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/b\u003e\r\n\u003c/p\u003e\r\n\u003c/div\u003e\r\n\u003c/body\u003e\r\n\u003c/html\u003e",
                "attachments": [],
                "date": "3/1/2016 5:06:00 PM UTC"
            };

            for (var i = 0; i < 10; i++) {
                var attachment = {name: "attachment " + i + "." + extensions[i], extension: extensions[i]};
                data.attachments.push(attachment);
            }
            return JSON.stringify(data);
        }
    }, {
        htmlEmailWithManyAttachments: function () { //Success:Scenario 1 html
            var data = {
                "to": ["jeff@test.com"],
                "from": "corey@test.com",
                "cc": [],
                "bcc": [],
                "subject": "Test email with 50 attachments and html body",
                "bodyText": "Hello there buddy\r\n\r\n",
                "bodyHtml": "\u003chtml xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" xmlns:m=\"http://schemas.microsoft.com/office/2004/12/omml\" xmlns=\"http://www.w3.org/TR/REC-html40\"\u003e\r\n\u003chead\u003e\r\n\u003cmeta name=Generator content=\"Microsoft Word 15 (filtered medium)\"\u003e\r\n\u003cstyle\u003e\r\n\u003c!--\r\n/* Font Definitions */\r\n@font-face\r\n\t{font-family:\"Cambria Math\";\r\n\tpanose-1:2 4 5 3 5 4 6 3 2 4;}\r\n@font-face\r\n\t{font-family:Calibri;\r\n\tpanose-1:2 15 5 2 2 2 4 3 2 4;}\r\n@font-face\r\n\t{font-family:Consolas;\r\n\tpanose-1:2 11 6 9 2 2 4 3 2 4;}\r\n/* Style Definitions */\r\np.MsoNormal, li.MsoNormal, div.MsoNormal\r\n\t{margin:0in;\r\n\tmargin-bottom:.0001pt;\r\n\tfont-size:11.0pt;\r\n\tfont-family:\"Calibri\",sans-serif;}\r\na:link, span.MsoHyperlink\r\n\t{mso-style-priority:99;\r\n\tcolor:#0563C1;\r\n\ttext-decoration:underline;}\r\na:visited, span.MsoHyperlinkFollowed\r\n\t{mso-style-priority:99;\r\n\tcolor:#954F72;\r\n\ttext-decoration:underline;}\r\np.MsoPlainText, li.MsoPlainText, div.MsoPlainText\r\n\t{mso-style-priority:99;\r\n\tmso-style-link:\"Plain Text Char\";\r\n\tmargin:0in;\r\n\tmargin-bottom:.0001pt;\r\n\tfont-size:11.0pt;\r\n\tfont-family:\"Calibri\",sans-serif;}\r\nspan.EmailStyle17\r\n\t{mso-style-type:personal;\r\n\tfont-family:\"Calibri\",sans-serif;\r\n\tcolor:windowtext;}\r\nspan.PlainTextChar\r\n\t{mso-style-name:\"Plain Text Char\";\r\n\tmso-style-priority:99;\r\n\tmso-style-link:\"Plain Text\";\r\n\tfont-family:\"Calibri\",sans-serif;}\r\n.MsoChpDefault\r\n\t{mso-style-type:export-only;\r\n\tfont-family:\"Calibri\",sans-serif;}\r\n@page WordSection1\r\n\t{size:8.5in 11.0in;\r\n\tmargin:1.0in 1.0in 1.0in 1.0in;}\r\ndiv.WordSection1\r\n\t{page:WordSection1;}\r\n--\u003e\r\n\u003c/style\u003e\r\n\u003c!--[if gte mso 9]\u003e\u003cxml\u003e\r\n\u003co:shapedefaults v:ext=\"edit\" spidmax=\"1026\" /\u003e\r\n\u003c/xml\u003e\u003c![endif]--\u003e\r\n\u003c!--[if gte mso 9]\u003e\u003cxml\u003e\r\n\u003co:shapelayout v:ext=\"edit\"\u003e\r\n\u003co:idmap v:ext=\"edit\" data=\"1\" /\u003e\r\n\u003c/o:shapelayout\u003e\u003c/xml\u003e\u003c![endif]--\u003e\r\n\u003c/head\u003e\r\n\u003cbody lang=EN-US link=\"#0563C1\" vlink=\"#954F72\"\u003e\r\n\u003cdiv class=WordSection1\u003e\r\n\u003cp class=MsoPlainText\u003e\r\n\u003cb\u003e\r\n\u003cspan style=\u0027font-size:28.0pt;color:red\u0027\u003e\r\nThis is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email This is the body of the email\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/b\u003e\r\n\u003c/p\u003e\r\n\u003c/div\u003e\r\n\u003c/body\u003e\r\n\u003c/html\u003e",
                "attachments": [],
                "date": "3/1/2016 5:06:00 PM UTC"
            };

            for (var i = 0; i < 50; i++) {
                var attachment = {name: "attachment " + i + "." + extensions[i % 10], extension: extensions[i % 10]};
                data.attachments.push(attachment);
            }
            return JSON.stringify(data);
        }
    }, {
        textEmailWithManyRecipients: function () {
            var data = {
                to: [],
                from: "scott@test.com",
                cc: [],
                bcc: [],
                subject: 'Test email with 100 to, bcc, and cc recipients and text body',
                date: '12/01/2015 1:01 PM UTC',
                bodyText: "This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  Th" +
                "is is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.",
                attachments: []
            };

            for (var i = 0; i < 100; i++) {
                var email = i + "@test.com";
                data.to.push(email);
                data.bcc.push(email);
                data.cc.push(email);
            }
            return JSON.stringify(data);
        }
    }, {
        htmlEmailWithInlineImages: function () {
            var data = {
                "to": ["jeff@test.com", "corey@test.com", "scott@test.com"],
                "from": "scott@test.com",
                "cc": ["jeff@test.com", "corey@test.com", "scott@test.com"],
                "bcc": ["jeff@test.com", "corey@test.com", "scott@test.com"],
                "subject": "Html Email with Inline Images",
                "bodyHtml": "\u003chtml xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" xmlns:m=\"http://schemas.microsoft.com/office/2004/12/omml\" xmlns=\"http://www.w3.org/TR/REC-html40\"\u003e\r\n\u003chead\u003e\r\n\u003cmeta name=\"Generator\" content=\"Microsoft Word 15 (filtered medium)\"\u003e\r\n\u003c!--[if !mso]\u003e\u003cstyle\u003ev\\:* {behavior:url(#default#VML);}\r\no\\:* {behavior:url(#default#VML);}\r\nw\\:* {behavior:url(#default#VML);}\r\n.shape {behavior:url(#default#VML);}\r\n\u003c/style\u003e\u003c![endif]--\u003e\r\n\u003cstyle\u003e\r\n\u003c!--\r\n/* Font Definitions */\r\n@font-face\r\n\t{font-family:\"Cambria Math\";\r\n\tpanose-1:2 4 5 3 5 4 6 3 2 4;}\r\n@font-face\r\n\t{font-family:Calibri;\r\n\tpanose-1:2 15 5 2 2 2 4 3 2 4;}\r\n/* Style Definitions */\r\np.MsoNormal, li.MsoNormal, div.MsoNormal\r\n\t{margin:0in;\r\n\tmargin-bottom:.0001pt;\r\n\tfont-size:11.0pt;\r\n\tfont-family:\"Calibri\",sans-serif;}\r\na:link, span.MsoHyperlink\r\n\t{mso-style-priority:99;\r\n\tcolor:#0563C1;\r\n\ttext-decoration:underline;}\r\na:visited, span.MsoHyperlinkFollowed\r\n\t{mso-style-priority:99;\r\n\tcolor:#954F72;\r\n\ttext-decoration:underline;}\r\nspan.EmailStyle17\r\n\t{mso-style-type:personal;\r\n\tfont-family:\"Calibri\",sans-serif;\r\n\tcolor:windowtext;}\r\nspan.EmailStyle18\r\n\t{mso-style-type:personal-reply;\r\n\tfont-family:\"Calibri\",sans-serif;\r\n\tcolor:#1F497D;}\r\n.MsoChpDefault\r\n\t{mso-style-type:export-only;\r\n\tfont-size:10.0pt;}\r\n@page WordSection1\r\n\t{size:8.5in 11.0in;\r\n\tmargin:1.0in 1.0in 1.0in 1.0in;}\r\ndiv.WordSection1\r\n\t{page:WordSection1;}\r\n--\u003e\r\n\u003c/style\u003e\r\n\u003c!--[if gte mso 9]\u003e\u003cxml\u003e\r\n\u003co:shapedefaults v:ext=\"edit\" spidmax=\"1026\" /\u003e\r\n\u003c/xml\u003e\u003c![endif]--\u003e\r\n\u003c!--[if gte mso 9]\u003e\u003cxml\u003e\r\n\u003co:shapelayout v:ext=\"edit\"\u003e\r\n\u003co:idmap v:ext=\"edit\" data=\"1\" /\u003e\r\n\u003c/o:shapelayout\u003e\u003c/xml\u003e\u003c![endif]--\u003e\r\n\u003c/head\u003e\r\n\u003cbody lang=\"EN-US\" link=\"#0563C1\" vlink=\"#954F72\"\u003e\r\n\u003cdiv class=\"WordSection1\"\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003cspan style=\u0027color:#1F497D\u0027\u003e\r\nTruthfully I believe that I like the way that you implemented it better.\u0026nbsp;\r\n It is confusing to me that a deselection can actually work as a selection in different cases.\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003cspan style=\u0027color:#1F497D\u0027\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/p\u003e\r\n\u003cdiv\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003cb\u003e\r\n\u003cspan style=\u0027font-size:10.0pt;font-family:\"Arial\",sans-serif;color:#333333\u0027\u003e\r\nThank You,\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/b\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003cb\u003e\r\n\u003cspan style=\u0027font-family:\"Arial\",sans-serif;color:#333333\u0027\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/b\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003cb\u003e\r\n\u003cspan style=\u0027font-size:10.0pt;font-family:\"Arial\",sans-serif;color:#333333\u0027\u003e\r\nKevin\u0026nbsp;\r\nBlazina\u003c/span\u003e\r\n\u003c/b\u003e\r\n\u003cspan style=\u0027font-size:12.0pt;font-family:\"Times New Roman\",serif;color:#1F497D\u0027\u003e\r\n\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\" style=\u0027line-height:90%\u0027\u003e\r\n\u003ci\u003e\r\n\u003cspan style=\u0027font-size:10.0pt;line-height:90%;font-family:\"Arial\",sans-serif;color:#333333\u0027\u003e\r\nSr. QA Analyst\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/i\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\" style=\u0027line-height:90%\u0027\u003e\r\n\u003ci\u003e\r\n\u003cspan style=\u0027font-size:10.0pt;line-height:90%;font-family:\"Arial\",sans-serif;color:#333333\u0027\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/i\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003cspan style=\u0027font-size:9.0pt;font-family:\"Arial\",sans-serif;color:gray\u0027\u003e\r\n1510 Klondike Road Suite 400, Conyers, Georgia, 30094\u003c/span\u003e\r\n\u003cspan style=\u0027color:#1F497D\u0027\u003e\r\n\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003cspan style=\u0027font-size:9.0pt;font-family:\"Arial\",sans-serif;color:gray\u0027\u003e\r\nT\u0026nbsp;\r\n770-285-2374 | M\u0026nbsp;\r\n404 309 4240\u0026nbsp;\r\n\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003cspan style=\u0027font-size:9.0pt;font-family:\"Arial\",sans-serif;color:#7F7F7F\u0027\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003ca href=\"http://www.vertafore.com/\"\u003e\r\n\u003cspan style=\u0027color:#1F497D;text-decoration:none\u0027\u003e\r\n\u003cimg border=\"0\" width=\"200\" height=\"66\" id=\"Picture_x0020_1\" src=\"data:image/png;base64,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\" alt=\"cid:image001.png@01CFCF25.C6CE6B70\"\u003e\r\n\u003c/span\u003e\r\n\u003c/a\u003e\r\n\u003cspan style=\u0027color:#1F497D\u0027\u003e\r\n\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003cspan style=\u0027color:#1F497D\u0027\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003cspan style=\u0027font-size:8.0pt;font-family:\"Arial\",sans-serif;color:#53565A\u0027\u003e\r\nThis email contains information that may be privileged and confidential. If you are not the intended recipient please delete this email and notify us immediately.\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003cspan style=\u0027color:#1F497D\u0027\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003cspan style=\u0027color:#1F497D\u0027\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/p\u003e\r\n\u003c/div\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003cspan style=\u0027color:#1F497D\u0027\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/span\u003e\r\n\u003c/p\u003e\r\n\u003cdiv\u003e\r\n\u003cdiv style=\u0027border:none;border-top:solid #E1E1E1 1.0pt;padding:3.0pt 0in 0in 0in\u0027\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003cb\u003e\r\nFrom:\u003c/b\u003e\r\n Emmert,Corey \u003cbr\u003e\r\n\u003cb\u003e\r\nSent:\u003c/b\u003e\r\n Wednesday, May 27, 2015 3:44 PM\u003cbr\u003e\r\n\u003cb\u003e\r\nTo:\u003c/b\u003e\r\n Davis,Scott; Blazina,Kevin; Flater,Jeff; DeWolf,Yuehli; Barnwell,Jamie; Fatmi,Nadeem\u003cbr\u003e\r\n\u003cb\u003e\r\nCc:\u003c/b\u003e\r\n Mondal,Amit; Chi,Derek\u003cbr\u003e\r\n\u003cb\u003e\r\nSubject:\u003c/b\u003e\r\n Ctrl/Shift Mouse selection functionality question\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003c/div\u003e\r\n\u003c/div\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\nThere is a behavior when mixing selection using ctrl and shift that I wanted to get an opinion on before implementing. Do we feel that this is a necessary behavior to implement in the multi-select?\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\nHere is the functionality in question shown in windows explorer:\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003ca href=\"http://screencast.com/t/LsodHpPW4Hf\"\u003e\r\nhttp://screencast.com/t/LsodHpPW4Hf\u003c/a\u003e\r\n\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\nSelect a group of items while pressing the shift key\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\nDeselect an item from the middle of that group while pressing the ctrl key\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\nSelect an item further down the list which pressing the shift key\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\nYou will see that the shift selection starts at and includes the item you last \u0026#8220;\r\nselected\u0026#8221;\r\n even though it had been deselected. \u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\nBefore I noticed this behavior I had implemented the shift selection so that it always starts with the item that was selected first as shown in the video below:\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003ca href=\"http://screencast.com/t/TvftXAuxGm\"\u003e\r\nhttp://screencast.com/t/TvftXAuxGm\u003c/a\u003e\r\n\u003co:p\u003e\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003cp class=\"MsoNormal\"\u003e\r\n\u003co:p\u003e\r\n\u0026nbsp;\r\n\u003c/o:p\u003e\r\n\u003c/p\u003e\r\n\u003c/div\u003e\r\n\u003c/body\u003e\r\n\u003c/html\u003e",
                "attachments": [{name: "one.zip", extension: "zip"}, {
                    name: "two.mp3",
                    extension: "mp3"
                }, {name: "3.doc", extension: "doc"}],
                "date": "3/1/2016 1:06:00 AM UTC"
            };
            return JSON.stringify(data);
        }
    }, {
            utcTimeTest: function () { //Testing UT
                var data = {
                    "to": ["jeff@test.com", "corey@test.com", "scott@test.com"],
                    "from": "scott@test.com",
                    "cc": ["jeff@test.com", "corey@test.com", "scott@test.com"],
                    "bcc": ["jeff@test.com", "corey@test.com", "scott@test.com"],
                    "subject": "Test email",
                    "bodyText": "This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.",
                    "attachments": [{name: "one.zip", extension: "zip"}, {
                        name: "two.mp3",
                        extension: "mp3"
                    }, {name: "3.doc", extension: "doc"}],
                    "date": "3/1/2016 5:06:00 PM UTC"
                };
                return JSON.stringify(data);
            }
    }, {
        textEmailWithManyRecipientsAndAttachments: function () {
            var data = {
                to: [],
                from: "scott@test.com",
                cc: [],
                bcc: [],
                subject: 'Test email with 100 to, bcc, and cc recipients and text body',
                date: '12/01/2015 1:01 PM UTC',
                bodyText: "This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  Th" +
                "is is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.",
                attachments: []
            };

            for (var i = 0; i < 100; i++) {
                var email = i + "@test.com";
                data.to.push(email);
                data.bcc.push(email);
                data.cc.push(email);

                var attachment = {name: "attachment " + i + "." + extensions[i % 11], extension: extensions[i % 11]};
                data.attachments.push(attachment);
            }

            return JSON.stringify(data);
        }
    }, {
        textEmailWithoutCcBccValues: function () { //Success:Scenario 0
            var data = {
                "to": ["jeff@test.com", "corey@test.com", "scott@test.com"],
                "from": "scott@test.com",
                "cc": [],
                "bcc": [],
                "subject": "Test email",
                "bodyText": "This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.",
                "date": "3/1/2016 5:06:00 PM UTC"
            };
            return JSON.stringify(data);
        }
    }, {
        textEmailWithoutDateValue: function () { //Success:Scenario 0
            var data = {
                "to": ["jeff@test.com", "corey@test.com", "scott@test.com"],
                "from": "scott@test.com",
                "cc": [],
                "bcc": [],
                "subject": "Test email",
                "bodyText": "This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.  This is the body of the email.",
                "date": ""
            };
            return JSON.stringify(data);
        }
    }, {
        textEmailWithoutAttachments: function () { //Success:Scenario 1 html
            var data = {
                "to": ["jeff@test.com"],
                "from": "corey@test.com",
                "cc": [],
                "bcc": [],
                "subject": "Test email with 50 attachments and html body",
                "bodyText": "Hello there buddy\r\n\r\n",
                "attachments": [],
                "date": "3/1/2016 5:06:00 PM UTC"
            };
            return JSON.stringify(data);
        }
    }, {
        emailWithError: function() {
            var data = {"Success":false,"Error":null};
            return JSON.stringify(data);
        }
    }, {
        emailWithoutResponse: function() {
            return null;
        }
    }
    ]
};
mocks.push(GetMsgMetadata);

exports.mocks = mocks;