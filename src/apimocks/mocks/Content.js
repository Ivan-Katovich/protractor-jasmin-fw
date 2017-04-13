/**
 * Created by davissc on 3/4/2015.
 */

var mocks = [];

/**
 * @api {post} Content/Download Download Content
 * @apiName GetDownloadUrl
 * @apiGroup Content
 * @apiParam {String[]} pages              array of page id's
 * @apiParam {Boolean} includeAnnotations               include annotations
 * @apiParam {Integer} dpiX                             DPI/PPI X value
 * @apiParam {Integer} dpiY                             DPI/PPI Y value
 * @apiParam {String="download","email"} deliveryMethod delivery method
 */

var IsWebDavEnabled = {
    name: 'IsWebDavEnabled',
    mockRoute: 'WebDav/IsWebDavEnabled',
    testScope: 'success',
    testScenario: 0,
    jsonTemplate: [function() {
        return '{"IsWebDavEnabled": true}';
    },
        function() {
            return '{"IsWebDavEnabled": false}';
        }]
};

mocks.push(IsWebDavEnabled);

var GetDownloadUrl = {
    name: 'GetDownloadUrl',
    mockRoute: 'Content/Download',
    testScope: 'success',
    testScenario: 0,
    jsonTemplate: [function() {
        return '{}';
    }]
};

mocks.push(GetDownloadUrl);

var GetTemplates = {
    name: 'GetTemplates',
    mockRoute: '\/api\/objecttypes\/.*\/template',
    testScope: 'success',
    testScenario: 'addDocumentTestRoute',
    jsonTemplate: [
        {
            defaultRoute: function () {
                var templates = {
                    "folderTypeDataResults": [
                        {
                            "id": 114,
                            "name": "File Note",
                            "description": "File Note",
                            "overlayId": -1,
                            "automationId": "FileNote",
                            "dateLastModified": "2013-10-02T19:31:28.913",
                            "isRepeatable": false,
                            "notesAllowed": true,
                            "calculateNotesAllowed": true,
                            "folderTypeDataResults": [],
                            "documentTypeDataResults": [
                                {
                                    "id": 168,
                                    "name": "Renewal Instructions",
                                    "description": "Renewal Instructions",
                                    "overlayId": -1,
                                    "automationId": "RenewalInstruct",
                                    "dateLastModified": "2013-10-02T21:03:20.797",
                                    "effectivePermissions": 196641
                                }
                            ]
                        },
                        {
                            "id": 110,
                            "name": "New Mail",
                            "description": "New Mail",
                            "overlayId": -1,
                            "automationId": "NewMail",
                            "dateLastModified": "2015-01-13T17:43:39.277",
                            "isRepeatable": false,
                            "notesAllowed": true,
                            "calculateNotesAllowed": true,
                            "folderTypeDataResults": [
                                {
                                    "id": 115,
                                    "name": "Policy Info",
                                    "description": "Policy Info",
                                    "overlayId": -1,
                                    "automationId": "PoLNfo",
                                    "dateLastModified": "2015-01-09T15:02:43.68",
                                    "isRepeatable": false,
                                    "notesAllowed": true,
                                    "calculateNotesAllowed": true,
                                    "folderTypeDataResults": [],
                                    "documentTypeDataResults": [
                                        {
                                            "id": 160,
                                            "name": "Renewal Policy",
                                            "description": "Renewal Policy",
                                            "overlayId": -1,
                                            "automationId": "RenewalPol",
                                            "dateLastModified": "2013-10-02T20:54:23.563",
                                            "effectivePermissions": 196641
                                        },
                                        {
                                            "id": 161,
                                            "name": "Endorsement DEC",
                                            "description": "Endorsement DEC",
                                            "overlayId": -1,
                                            "automationId": "EndorsDEC",
                                            "dateLastModified": "2015-01-09T15:06:05.157",
                                            "effectivePermissions": 196641
                                        },
                                        {
                                            "id": 157,
                                            "name": "Original Policy",
                                            "description": "Original Policy",
                                            "overlayId": -1,
                                            "automationId": "OriginalPol",
                                            "dateLastModified": "2013-10-02T20:24:16.557",
                                            "effectivePermissions": 196641
                                        }
                                    ]
                                },
                                {
                                    "id": 112,
                                    "name": "Cancellation/Reinstatement",
                                    "description": "Cancellation/Reinstatement",
                                    "overlayId": -1,
                                    "automationId": "CancRein",
                                    "dateLastModified": "2013-10-02T18:48:50.803",
                                    "isRepeatable": false,
                                    "notesAllowed": true,
                                    "calculateNotesAllowed": true,
                                    "folderTypeDataResults": [],
                                    "documentTypeDataResults": [
                                        {
                                            "id": 162,
                                            "name": "Cancellation Request from Insured",
                                            "description": "Cancellation Request from Insured",
                                            "overlayId": -1,
                                            "automationId": "CancelReqInsured",
                                            "dateLastModified": "2013-10-02T20:56:30.643",
                                            "effectivePermissions": 196641
                                        },
                                        {
                                            "id": 163,
                                            "name": "Cancellation for nonpayment",
                                            "description": "Cancellation for nonpayment",
                                            "overlayId": -1,
                                            "automationId": "Cancellnonpayment",
                                            "dateLastModified": "2013-10-02T20:57:25.16",
                                            "effectivePermissions": 196641
                                        },
                                        {
                                            "id": 164,
                                            "name": "Cancellation for noncompliance",
                                            "description": "Cancellation for noncompliance",
                                            "overlayId": -1,
                                            "automationId": "Cancellnoncompliance",
                                            "dateLastModified": "2013-10-02T20:59:51.813",
                                            "effectivePermissions": 196641
                                        },
                                        {
                                            "id": 165,
                                            "name": "Reinistatement Request",
                                            "description": "Reinistatement Request",
                                            "overlayId": -1,
                                            "automationId": "ReinistRequest",
                                            "dateLastModified": "2013-10-02T21:00:39.657",
                                            "effectivePermissions": 196641
                                        },
                                        {
                                            "id": 166,
                                            "name": "Notice of Non-Renewal",
                                            "description": "Notice of Non-Renewal",
                                            "overlayId": -1,
                                            "automationId": "NoticeNon-Renewal",
                                            "dateLastModified": "2013-10-02T21:01:47.687",
                                            "effectivePermissions": 196641
                                        },
                                        {
                                            "id": 155,
                                            "name": "Miscellaneous",
                                            "description": "Miscellaneous",
                                            "overlayId": -1,
                                            "automationId": "MISC",
                                            "dateLastModified": "2013-10-02T20:22:56.393",
                                            "effectivePermissions": 196641
                                        }
                                    ]
                                }

                            ],
                            "documentTypeDataResults": [
                                {
                                    "id": 155,
                                    "name": "Miscellaneous",
                                    "description": "Miscellaneous",
                                    "overlayId": -1,
                                    "automationId": "MISC",
                                    "dateLastModified": "2013-10-02T20:22:56.393",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 162,
                                    "name": "Cancellation Request from Insured",
                                    "description": "Cancellation Request from Insured",
                                    "overlayId": -1,
                                    "automationId": "CancelReqInsured",
                                    "dateLastModified": "2013-10-02T20:56:30.643",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 163,
                                    "name": "Cancellation for nonpayment",
                                    "description": "Cancellation for nonpayment",
                                    "overlayId": -1,
                                    "automationId": "Cancellnonpayment",
                                    "dateLastModified": "2013-10-02T20:57:25.16",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 164,
                                    "name": "Cancellation for noncompliance",
                                    "description": "Cancellation for noncompliance",
                                    "overlayId": -1,
                                    "automationId": "Cancellnoncompliance",
                                    "dateLastModified": "2013-10-02T20:59:51.813",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 165,
                                    "name": "Reinistatement Request",
                                    "description": "Reinistatement Request",
                                    "overlayId": -1,
                                    "automationId": "ReinistRequest",
                                    "dateLastModified": "2013-10-02T21:00:39.657",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 166,
                                    "name": "Notice of Non-Renewal",
                                    "description": "Notice of Non-Renewal",
                                    "overlayId": -1,
                                    "automationId": "NoticeNon-Renewal",
                                    "dateLastModified": "2013-10-02T21:01:47.687",
                                    "effectivePermissions": 196641
                                }
                            ]
                        },
                        {
                            "id": 115,
                            "name": "Policy Info",
                            "description": "Policy Info",
                            "overlayId": -1,
                            "automationId": "PoLNfo",
                            "dateLastModified": "2015-01-09T15:02:43.68",
                            "isRepeatable": false,
                            "notesAllowed": true,
                            "calculateNotesAllowed": true,
                            "folderTypeDataResults": [],
                            "documentTypeDataResults": [
                                {
                                    "id": 160,
                                    "name": "Renewal Policy",
                                    "description": "Renewal Policy",
                                    "overlayId": -1,
                                    "automationId": "RenewalPol",
                                    "dateLastModified": "2013-10-02T20:54:23.563",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 161,
                                    "name": "Endorsement DEC",
                                    "description": "Endorsement DEC",
                                    "overlayId": -1,
                                    "automationId": "EndorsDEC",
                                    "dateLastModified": "2015-01-09T15:06:05.157",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 157,
                                    "name": "Original Policy",
                                    "description": "Original Policy",
                                    "overlayId": -1,
                                    "automationId": "OriginalPol",
                                    "dateLastModified": "2013-10-02T20:24:16.557",
                                    "effectivePermissions": 196641
                                }
                            ]
                        },
                        {
                            "id": 112,
                            "name": "Cancellation/Reinstatement",
                            "description": "Cancellation/Reinstatement",
                            "overlayId": -1,
                            "automationId": "CancRein",
                            "dateLastModified": "2013-10-02T18:48:50.803",
                            "isRepeatable": false,
                            "notesAllowed": true,
                            "calculateNotesAllowed": true,
                            "folderTypeDataResults": [],
                            "documentTypeDataResults": [
                                {
                                    "id": 162,
                                    "name": "Cancellation Request from Insured",
                                    "description": "Cancellation Request from Insured",
                                    "overlayId": -1,
                                    "automationId": "CancelReqInsured",
                                    "dateLastModified": "2013-10-02T20:56:30.643",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 163,
                                    "name": "Cancellation for nonpayment",
                                    "description": "Cancellation for nonpayment",
                                    "overlayId": -1,
                                    "automationId": "Cancellnonpayment",
                                    "dateLastModified": "2013-10-02T20:57:25.16",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 164,
                                    "name": "Cancellation for noncompliance",
                                    "description": "Cancellation for noncompliance",
                                    "overlayId": -1,
                                    "automationId": "Cancellnoncompliance",
                                    "dateLastModified": "2013-10-02T20:59:51.813",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 165,
                                    "name": "Reinistatement Request",
                                    "description": "Reinistatement Request",
                                    "overlayId": -1,
                                    "automationId": "ReinistRequest",
                                    "dateLastModified": "2013-10-02T21:00:39.657",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 166,
                                    "name": "Notice of Non-Renewal",
                                    "description": "Notice of Non-Renewal",
                                    "overlayId": -1,
                                    "automationId": "NoticeNon-Renewal",
                                    "dateLastModified": "2013-10-02T21:01:47.687",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 155,
                                    "name": "Miscellaneous",
                                    "description": "Miscellaneous",
                                    "overlayId": -1,
                                    "automationId": "MISC",
                                    "dateLastModified": "2013-10-02T20:22:56.393",
                                    "effectivePermissions": 196641
                                }
                            ]
                        },
                        {
                            "id": 113,
                            "name": "Underwriting Info",
                            "description": "Underwriting Info",
                            "overlayId": -1,
                            "automationId": "Undw",
                            "dateLastModified": "2013-10-02T19:33:31.747",
                            "isRepeatable": false,
                            "notesAllowed": true,
                            "calculateNotesAllowed": true,
                            "folderTypeDataResults": [],
                            "documentTypeDataResults": [
                                {
                                    "id": 167,
                                    "name": "Audit",
                                    "description": "Audit",
                                    "overlayId": -1,
                                    "automationId": "Audit",
                                    "dateLastModified": "2013-10-02T21:02:34.457",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 168,
                                    "name": "Renewal Instructions",
                                    "description": "Renewal Instructions",
                                    "overlayId": -1,
                                    "automationId": "RenewalInstruct",
                                    "dateLastModified": "2013-10-02T21:03:20.797",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 155,
                                    "name": "Miscellaneous",
                                    "description": "Miscellaneous",
                                    "overlayId": -1,
                                    "automationId": "MISC",
                                    "dateLastModified": "2013-10-02T20:22:56.393",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 169,
                                    "name": "Change Request",
                                    "description": "Change Request (added to Endorsement Dec when DEC is received)",
                                    "overlayId": -1,
                                    "automationId": "ChangeRequest",
                                    "dateLastModified": "2013-10-02T21:05:04.33",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 170,
                                    "name": "Bind Request",
                                    "description": "Bind Request",
                                    "overlayId": -1,
                                    "automationId": "BindReq",
                                    "dateLastModified": "2013-10-02T21:05:39.94",
                                    "effectivePermissions": 196641
                                }
                            ]
                        },
                        {
                            "id": 116,
                            "name": "Premium Finance",
                            "description": "Premium Finance",
                            "overlayId": -1,
                            "automationId": "PremFin",
                            "dateLastModified": "2013-10-02T19:35:44.407",
                            "isRepeatable": false,
                            "notesAllowed": true,
                            "calculateNotesAllowed": true,
                            "folderTypeDataResults": [],
                            "documentTypeDataResults": []
                        },
                        {
                            "id": 117,
                            "name": "Reinsurance",
                            "description": "Reinsurance",
                            "overlayId": -1,
                            "automationId": "Reinsur",
                            "dateLastModified": "2013-10-02T19:36:22.533",
                            "isRepeatable": false,
                            "notesAllowed": true,
                            "calculateNotesAllowed": true,
                            "folderTypeDataResults": [],
                            "documentTypeDataResults": []
                        },
                        {
                            "id": 6220,
                            "name": "Print",
                            "description": "Print",
                            "overlayId": -1,
                            "automationId": "Print",
                            "dateLastModified": "2014-06-06T10:29:01.9",
                            "isRepeatable": false,
                            "notesAllowed": true,
                            "calculateNotesAllowed": true,
                            "folderTypeDataResults": [],
                            "documentTypeDataResults": [
                                {
                                    "id": 6223,
                                    "name": "DOC_Fomat",
                                    "description": "DOC_Fomat",
                                    "overlayId": -1,
                                    "automationId": "DOC_Doc",
                                    "dateLastModified": "2014-06-06T10:04:08.833",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 6225,
                                    "name": "GIF_Format",
                                    "description": "GIF_Format",
                                    "overlayId": -1,
                                    "automationId": "GIF_Doc",
                                    "dateLastModified": "2014-06-06T10:03:19.063",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 6228,
                                    "name": "HTML_Format",
                                    "description": "HTML_Format",
                                    "overlayId": -1,
                                    "automationId": "HTML_Doc",
                                    "dateLastModified": "2014-06-06T10:02:51.083",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 6224,
                                    "name": "PDF_Format",
                                    "description": "PDF_Format",
                                    "overlayId": -1,
                                    "automationId": "PDF_Doc",
                                    "dateLastModified": "2014-06-06T10:04:31.123",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 6226,
                                    "name": "JPEG_Format",
                                    "description": "JPEG_Format",
                                    "overlayId": -1,
                                    "automationId": "JPEG_Doc",
                                    "dateLastModified": "2014-06-06T10:03:46.693",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 6227,
                                    "name": "TXT_Format",
                                    "description": "TXT_Format",
                                    "overlayId": -1,
                                    "automationId": "TXT_Doc",
                                    "dateLastModified": "2014-06-06T10:02:04.52",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 6470,
                                    "name": "TIFF_Multipage_Format",
                                    "description": "TIFF_Multipage_Format",
                                    "overlayId": -1,
                                    "automationId": "TIFF_Multipage_Doc",
                                    "dateLastModified": "2014-06-11T08:46:58.793",
                                    "effectivePermissions": 196641
                                }
                            ]
                        },
                        {
                            "id": 7330,
                            "name": "Download",
                            "description": "Download",
                            "overlayId": -1,
                            "automationId": "Download",
                            "dateLastModified": "2014-07-10T10:52:40.69",
                            "isRepeatable": false,
                            "notesAllowed": false,
                            "calculateNotesAllowed": false,
                            "folderTypeDataResults": [],
                            "documentTypeDataResults": [
                                {
                                    "id": 7333,
                                    "name": "Format_Native",
                                    "description": "Format_Native",
                                    "overlayId": -1,
                                    "automationId": "Format_Native",
                                    "dateLastModified": "2014-07-10T11:01:13.797",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 7331,
                                    "name": "Format_withAnnotations",
                                    "description": "Format_withAnnotations",
                                    "overlayId": -1,
                                    "automationId": "Format_withAnnotations",
                                    "dateLastModified": "2014-07-10T10:59:19.2",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 7332,
                                    "name": "Format_withoutAnnotations",
                                    "description": "Format_withoutAnnotations",
                                    "overlayId": -1,
                                    "automationId": "Format_withoutAnnotations",
                                    "dateLastModified": "2014-07-10T11:00:21.567",
                                    "effectivePermissions": 196641
                                }
                            ]
                        }
                    ],
                    "documentTypeDataResults": [],
                    "id": 104
                };
                return JSON.stringify(templates);
            }
        },
        {
            addDocumentTestRoute: function () {
                var templates = {
                    "folderTypeDataResults": [
                        {
                            "id": 114,
                            "name": "File Note",
                            "description": "File Note",
                            "overlayId": -1,
                            "automationId": "FileNote",
                            "dateLastModified": "2013-10-02T19:31:28.913",
                            "isRepeatable": false,
                            "notesAllowed": true,
                            "calculateNotesAllowed": true,
                            "folderTypeDataResults": [],
                            "documentTypeDataResults": [
                                {
                                    "id": 168,
                                    "name": "Renewal Instructions",
                                    "description": "Renewal Instructions",
                                    "overlayId": -1,
                                    "automationId": "RenewalInstruct",
                                    "dateLastModified": "2013-10-02T21:03:20.797",
                                    "effectivePermissions": 196641
                                }
                            ]
                        },
                        {
                            "id": 110,
                            "name": "New Mail",
                            "description": "New Mail",
                            "overlayId": -1,
                            "automationId": "NewMail",
                            "dateLastModified": "2015-01-13T17:43:39.277",
                            "isRepeatable": false,
                            "notesAllowed": true,
                            "calculateNotesAllowed": true,
                            "folderTypeDataResults": [
                                {
                                    "id": 115,
                                    "name": "Policy Info",
                                    "description": "Policy Info",
                                    "overlayId": -1,
                                    "automationId": "PoLNfo",
                                    "dateLastModified": "2015-01-09T15:02:43.68",
                                    "isRepeatable": false,
                                    "notesAllowed": true,
                                    "calculateNotesAllowed": true,
                                    "folderTypeDataResults": [],
                                    "documentTypeDataResults": [
                                        {
                                            "id": 160,
                                            "name": "Renewal Policy",
                                            "description": "Renewal Policy",
                                            "overlayId": -1,
                                            "automationId": "RenewalPol",
                                            "dateLastModified": "2013-10-02T20:54:23.563",
                                            "effectivePermissions": 196641
                                        },
                                        {
                                            "id": 161,
                                            "name": "Endorsement DEC",
                                            "description": "Endorsement DEC",
                                            "overlayId": -1,
                                            "automationId": "EndorsDEC",
                                            "dateLastModified": "2015-01-09T15:06:05.157",
                                            "effectivePermissions": 196641
                                        },
                                        {
                                            "id": 157,
                                            "name": "Original Policy",
                                            "description": "Original Policy",
                                            "overlayId": -1,
                                            "automationId": "OriginalPol",
                                            "dateLastModified": "2013-10-02T20:24:16.557",
                                            "effectivePermissions": 196641
                                        }
                                    ]
                                },
                                {
                                    "id": 112,
                                    "name": "Cancellation/Reinstatement",
                                    "description": "Cancellation/Reinstatement",
                                    "overlayId": -1,
                                    "automationId": "CancRein",
                                    "dateLastModified": "2013-10-02T18:48:50.803",
                                    "isRepeatable": false,
                                    "notesAllowed": true,
                                    "calculateNotesAllowed": true,
                                    "folderTypeDataResults": [],
                                    "documentTypeDataResults": [
                                        {
                                            "id": 162,
                                            "name": "Cancellation Request from Insured",
                                            "description": "Cancellation Request from Insured",
                                            "overlayId": -1,
                                            "automationId": "CancelReqInsured",
                                            "dateLastModified": "2013-10-02T20:56:30.643",
                                            "effectivePermissions": 196641
                                        },
                                        {
                                            "id": 163,
                                            "name": "Cancellation for nonpayment",
                                            "description": "Cancellation for nonpayment",
                                            "overlayId": -1,
                                            "automationId": "Cancellnonpayment",
                                            "dateLastModified": "2013-10-02T20:57:25.16",
                                            "effectivePermissions": 196641
                                        },
                                        {
                                            "id": 164,
                                            "name": "Cancellation for noncompliance",
                                            "description": "Cancellation for noncompliance",
                                            "overlayId": -1,
                                            "automationId": "Cancellnoncompliance",
                                            "dateLastModified": "2013-10-02T20:59:51.813",
                                            "effectivePermissions": 196641
                                        },
                                        {
                                            "id": 165,
                                            "name": "Reinistatement Request",
                                            "description": "Reinistatement Request",
                                            "overlayId": -1,
                                            "automationId": "ReinistRequest",
                                            "dateLastModified": "2013-10-02T21:00:39.657",
                                            "effectivePermissions": 196641
                                        },
                                        {
                                            "id": 166,
                                            "name": "Notice of Non-Renewal",
                                            "description": "Notice of Non-Renewal",
                                            "overlayId": -1,
                                            "automationId": "NoticeNon-Renewal",
                                            "dateLastModified": "2013-10-02T21:01:47.687",
                                            "effectivePermissions": 196641
                                        },
                                        {
                                            "id": 155,
                                            "name": "Miscellaneous",
                                            "description": "Miscellaneous",
                                            "overlayId": -1,
                                            "automationId": "MISC",
                                            "dateLastModified": "2013-10-02T20:22:56.393",
                                            "effectivePermissions": 196641
                                        }
                                    ]
                                }

                            ],
                            "documentTypeDataResults": [
                                {
                                    "id": 155,
                                    "name": "Miscellaneous",
                                    "description": "Miscellaneous",
                                    "overlayId": -1,
                                    "automationId": "MISC",
                                    "dateLastModified": "2013-10-02T20:22:56.393",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 162,
                                    "name": "Cancellation Request from Insured",
                                    "description": "Cancellation Request from Insured",
                                    "overlayId": -1,
                                    "automationId": "CancelReqInsured",
                                    "dateLastModified": "2013-10-02T20:56:30.643",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 163,
                                    "name": "Cancellation for nonpayment",
                                    "description": "Cancellation for nonpayment",
                                    "overlayId": -1,
                                    "automationId": "Cancellnonpayment",
                                    "dateLastModified": "2013-10-02T20:57:25.16",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 164,
                                    "name": "Cancellation for noncompliance",
                                    "description": "Cancellation for noncompliance",
                                    "overlayId": -1,
                                    "automationId": "Cancellnoncompliance",
                                    "dateLastModified": "2013-10-02T20:59:51.813",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 165,
                                    "name": "Reinistatement Request",
                                    "description": "Reinistatement Request",
                                    "overlayId": -1,
                                    "automationId": "ReinistRequest",
                                    "dateLastModified": "2013-10-02T21:00:39.657",
                                    "effectivePermissions": 196641
                                },
                                {
                                    "id": 166,
                                    "name": "Notice of Non-Renewal",
                                    "description": "Notice of Non-Renewal",
                                    "overlayId": -1,
                                    "automationId": "NoticeNon-Renewal",
                                    "dateLastModified": "2013-10-02T21:01:47.687",
                                    "effectivePermissions": 196641
                                }
                            ]
                        }
                    ],
                    "documentTypeDataResults": [
                        {
                            "id": 168,
                            "name": "Renewal Instructions",
                            "description": "Renewal Instructions",
                            "overlayId": -1,
                            "automationId": "RenewalInstruct",
                            "dateLastModified": "2013-10-02T21:03:20.797",
                            "effectivePermissions": 196641
                        },
                        {
                            "id": 160,
                            "name": "Renewal Policy",
                            "description": "Renewal Policy",
                            "overlayId": -1,
                            "automationId": "RenewalPol",
                            "dateLastModified": "2013-10-02T20:54:23.563",
                            "effectivePermissions": 196641
                        }
                    ],
                    "id": 104
                };
                return JSON.stringify(templates);
            }
        },
        {
            oneFolderTypeTestRoute: function () {
                var templates = {
                    "folderTypeDataResults": [
                        {
                            "id": 114,
                            "name": "File Note",
                            "description": "File Note",
                            "overlayId": -1,
                            "automationId": "FileNote",
                            "dateLastModified": "2013-10-02T19:31:28.913",
                            "isRepeatable": false,
                            "notesAllowed": true,
                            "calculateNotesAllowed": true,
                            "folderTypeDataResults": [],
                            "documentTypeDataResults": [
                                {
                                    "id": 168,
                                    "name": "Renewal Instructions",
                                    "description": "Renewal Instructions",
                                    "overlayId": -1,
                                    "automationId": "RenewalInstruct",
                                    "dateLastModified": "2013-10-02T21:03:20.797",
                                    "effectivePermissions": 196641
                                }
                            ]
                        }
                    ],
                    "documentTypeDataResults": [
                        {
                            "id": 168,
                            "name": "Renewal Instructions",
                            "description": "Renewal Instructions",
                            "overlayId": -1,
                            "automationId": "RenewalInstruct",
                            "dateLastModified": "2013-10-02T21:03:20.797",
                            "effectivePermissions": 196641
                        },
                        {
                            "id": 160,
                            "name": "Renewal Policy",
                            "description": "Renewal Policy",
                            "overlayId": -1,
                            "automationId": "RenewalPol",
                            "dateLastModified": "2013-10-02T20:54:23.563",
                            "effectivePermissions": 196641
                        }
                    ],
                    "id": 104
                };
                return JSON.stringify(templates);
            }
        },
        {
            oneRepitableFolderTestRoute: function () {
                var templates = {
                    "folderTypeDataResults": [
                        {
                            "id": 114,
                            "name": "File Note",
                            "description": "File Note",
                            "overlayId": -1,
                            "automationId": "FileNote",
                            "dateLastModified": "2013-10-02T19:31:28.913",
                            "isRepeatable": true,
                            "notesAllowed": true,
                            "calculateNotesAllowed": true,
                            "folderTypeDataResults": [],
                            "documentTypeDataResults": [
                                {
                                    "id": 168,
                                    "name": "Renewal Instructions",
                                    "description": "Renewal Instructions",
                                    "overlayId": -1,
                                    "automationId": "RenewalInstruct",
                                    "dateLastModified": "2013-10-02T21:03:20.797",
                                    "effectivePermissions": 196641
                                }
                            ]
                        }
                    ],
                    "id": 104
                };
                return JSON.stringify(templates);
            }
        }
    ]
};

mocks.push(GetTemplates);
exports.mocks = mocks;
