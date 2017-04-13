
var mocks = [];

var dashboardDefaultView = {
    name: 'default',
    // mockRoute: '/api/users/2729177/views/default',
    mockRoute: '\/api\/users\/.*\/views/default',
    testScope: 'success',
    testScenario: 0,
    jsonTemplate: [
        function () {
            return '101';
        }
    ]
};
mocks.push(dashboardDefaultView);

var dashboardViews = {
    name: 'dashboardViews',
    // mockRoute: '/api/users/2729177/views',
    mockRoute: '\/api\/users\/.*\/views',
    testScope: 'success',
    testScenario: 0,
    jsonTemplate: [
        function () {
            var data = [
                {
                    "id":101,
                    "name":"XP1 Process Dashboard",
                    "filter":{
                        "assignedTo":[],
                        "drawersAndFileTypes":{},
                        "workflowsAndSteps":{}
                    },
                    "slaIds":[377]
                }
            ];
            return JSON.stringify(data);
        }
    ]
};
mocks.push(dashboardViews);

// var dashboardSlas = {
//     name: 'dashboardSlas',
//     mockRoute: '/api/slas',
//     testScope: 'success',
//     testScenario: 0,
//     jsonTemplate: [
//         function () {
//             return '[]';
//         }
//     ]
// };
// mocks.push(dashboardSlas);

var dashboardDrawers = {
    name: 'dashboardDrawers',
    mockRoute: '/api/drawers',
    testScope: 'success',
    testScenario: 0,
    jsonTemplate: [
        function () {
            var data = [
                {
                    "id": 8436,
                    "drawerTypeId": 8434,
                    "parentId": -1,
                    "name": "Auto",
                    "description": "Auto",
                    "created": "2014-12-29T18:52:18.483",
                    "lastModified": "2015-04-28T11:29:22.67"
                },
                {
                    "id": 352,
                    "drawerTypeId": 52,
                    "parentId": -1,
                    "name": "HRDrawer",
                    "description": "Human Resource",
                    "created": "2013-10-31T23:14:13.24",
                    "lastModified": "2013-11-02T21:19:26.96"
                },
                {
                    "id": 351,
                    "drawerTypeId": 59,
                    "parentId": -1,
                    "name": "Investigations",
                    "description": "Investigations",
                    "created": "2013-10-31T23:13:44.237",
                    "lastModified": "2013-11-02T21:19:40.66"
                },
                {
                    "id": 8437,
                    "drawerTypeId": 8435,
                    "parentId": -1,
                    "name": "RentersHome",
                    "description": "RentersHome",
                    "created": "2014-12-29T18:52:36.993",
                    "lastModified": "2014-12-29T18:52:37.013"
                },
                {
                    "id": 159,
                    "drawerTypeId": 118,
                    "parentId": -1,
                    "name": "Underwriting Drawer",
                    "description": "Underwriting Drawer",
                    "created": "2013-10-02T20:39:59.32",
                    "lastModified": "2015-07-06T12:41:25.117"
                }
            ];
            return JSON.stringify(data);
        }
    ]
};
mocks.push(dashboardDrawers);

var dashboardFiles = {
    name: 'dashboardFiles',
    mockRoute: '/api/objecttypes/file',
    testScope: 'success',
    testScenario: 0,
    jsonTemplate: [
        function () {
            var data = [
                {
                    "classId": -3,
                    "id": 68,
                    "name": "Personal Client",
                    "description": "Personal Client",
                    "overlayId": -1,
                    "automationId": "PersC",
                    "dateLastModified": "2015-11-02T14:59:17.777",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -3,
                    "id": 74,
                    "name": "Workers Comp Claims",
                    "description": "Workers Comp Claims",
                    "overlayId": -1,
                    "automationId": "WorC",
                    "dateLastModified": "2015-11-02T14:59:17.813",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -3,
                    "id": 92,
                    "name": "P&C PL",
                    "description": "P&C PL",
                    "overlayId": -1,
                    "automationId": "P PL",
                    "dateLastModified": "2015-11-02T14:59:17.763",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -3,
                    "id": 98,
                    "name": "P&C CL",
                    "description": "P&C CL",
                    "overlayId": -1,
                    "automationId": "PCCL",
                    "dateLastModified": "2015-11-02T14:59:17.753",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -3,
                    "id": 104,
                    "name": "Events",
                    "description": "Events",
                    "overlayId": -1,
                    "automationId": "Events",
                    "dateLastModified": "2015-11-02T14:59:17.743",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -3,
                    "id": 125,
                    "name": "Renewal Policy",
                    "description": "Renewal Policy",
                    "overlayId": -1,
                    "automationId": "RP",
                    "dateLastModified": "2015-11-02T14:59:17.787",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -3,
                    "id": 15983,
                    "name": "type name",
                    "description": "type description",
                    "overlayId": -1,
                    "automationId": "type prog name",
                    "dateLastModified": "2015-11-02T14:59:17.8",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -3,
                    "id": 28844,
                    "name": "NoFileNotes",
                    "description": "NoFileNotes",
                    "overlayId": -1,
                    "automationId": "NoFileNotes",
                    "dateLastModified": "2015-12-16T18:44:50.37",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -3,
                    "id": 29890,
                    "name": "NoFolders",
                    "description": "NoFolders",
                    "overlayId": -1,
                    "automationId": "NoFolders",
                    "dateLastModified": "2016-01-11T13:58:04.85",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -3,
                    "id": 29896,
                    "name": "RepFile",
                    "description": "RepFile",
                    "overlayId": -1,
                    "automationId": "RepFile",
                    "dateLastModified": "2016-09-15T14:01:12.503",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -3,
                    "id": 29902,
                    "name": "NoDocsOnFile",
                    "description": "NoDocsOnFile",
                    "overlayId": -1,
                    "automationId": "NoDocsOnFile",
                    "dateLastModified": "2016-01-11T14:02:49.98",
                    "effectivePermissions": 2147483647
                }
            ];
            return JSON.stringify(data);
        }
    ]
};
mocks.push(dashboardFiles);

var dashboardDocuments = {
    name: 'dashboardDocuments',
    mockRoute: '/api/objecttypes/document',
    testScope: 'success',
    testScenario: 0,
    jsonTemplate: [
        function () {
            var data = [
                {
                    "classId": -1,
                    "id": 46,
                    "name": "InsurancePayRec",
                    "description": "Insurance Payments received",
                    "overlayId": -1,
                    "automationId": "medicalBill",
                    "dateLastModified": "2015-11-03T12:27:00.52",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 55,
                    "name": "Underwriting Documentt",
                    "description": "Underwriting Documentt",
                    "overlayId": -1,
                    "automationId": "UndWr",
                    "dateLastModified": "2015-11-03T12:27:00.817",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 56,
                    "name": "W-9",
                    "description": "W-9",
                    "overlayId": -1,
                    "automationId": "w9",
                    "dateLastModified": "2015-11-02T14:59:18.543",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 57,
                    "name": "Write- ups",
                    "description": "Write- ups",
                    "overlayId": -1,
                    "automationId": "WriteUp",
                    "dateLastModified": "2015-11-02T14:59:18.57",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 111,
                    "name": "Mail",
                    "description": "Mail",
                    "overlayId": -1,
                    "automationId": "Mail",
                    "dateLastModified": "2015-11-03T12:27:00.563",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 155,
                    "name": "Miscellaneous",
                    "description": "Miscellaneous",
                    "overlayId": -1,
                    "automationId": "MISC",
                    "dateLastModified": "2015-11-03T12:27:00.583",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 156,
                    "name": "Note",
                    "description": "Note",
                    "overlayId": -1,
                    "automationId": "Note",
                    "dateLastModified": "2015-11-04T16:04:12.477",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 157,
                    "name": "Original Policy",
                    "description": "Original Policy",
                    "overlayId": -1,
                    "automationId": "OriginalPol",
                    "dateLastModified": "2015-11-03T12:27:00.637",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 160,
                    "name": "Renewal Policy",
                    "description": "Renewal Policy",
                    "overlayId": -1,
                    "automationId": "RenewalPol",
                    "dateLastModified": "2015-11-03T12:27:00.76",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 161,
                    "name": "Endorsement DEC",
                    "description": "Endorsement DEC",
                    "overlayId": -1,
                    "automationId": "EndorsDEC",
                    "dateLastModified": "2015-11-03T12:27:00.397",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 162,
                    "name": "Cancellation Request from Insured",
                    "description": "Cancellation Request from Insured",
                    "overlayId": -1,
                    "automationId": "CancelReqInsured",
                    "dateLastModified": "2015-11-03T12:27:00.363",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 163,
                    "name": "Cancellation for nonpayment",
                    "description": "Cancellation for nonpayment",
                    "overlayId": -1,
                    "automationId": "Cancellnonpayment",
                    "dateLastModified": "2015-11-03T12:27:00.35",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 164,
                    "name": "Cancellation for noncompliance",
                    "description": "Cancellation for noncompliance",
                    "overlayId": -1,
                    "automationId": "Cancellnoncompliance",
                    "dateLastModified": "2015-11-03T12:27:00.343",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 165,
                    "name": "Reinistatement Request",
                    "description": "Reinistatement Request",
                    "overlayId": 20537,
                    "automationId": "ReinistRequest",
                    "dateLastModified": "2015-11-03T12:27:00.737",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 166,
                    "name": "Notice of Non-Renewal",
                    "description": "Notice of Non-Renewal",
                    "overlayId": -1,
                    "automationId": "NoticeNon-Renewal",
                    "dateLastModified": "2015-11-03T12:27:00.623",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 167,
                    "name": "Audit",
                    "description": "Audit",
                    "overlayId": -1,
                    "automationId": "Audit",
                    "dateLastModified": "2015-11-02T14:59:18.053",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 168,
                    "name": "Renewal Instructions",
                    "description": "Renewal Instructions",
                    "overlayId": -1,
                    "automationId": "RenewalInstruct",
                    "dateLastModified": "2015-11-03T12:27:00.75",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 169,
                    "name": "Change Request",
                    "description": "Change Request (added to Endorsement Dec when DEC is received)",
                    "overlayId": -1,
                    "automationId": "ChangeRequest",
                    "dateLastModified": "2015-11-03T12:27:00.373",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 170,
                    "name": "Bind Request",
                    "description": "Bind Request",
                    "overlayId": -1,
                    "automationId": "BindReq",
                    "dateLastModified": "2015-11-03T12:27:00.327",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 171,
                    "name": "Quote",
                    "description": "Quote",
                    "overlayId": -1,
                    "automationId": "Quote",
                    "dateLastModified": "2015-11-02T14:59:18.427",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 172,
                    "name": "Inspection",
                    "description": "Inspection",
                    "overlayId": -1,
                    "automationId": "Inspection",
                    "dateLastModified": "2015-11-03T12:27:00.5",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 173,
                    "name": "Rec Letter",
                    "description": "Rec Letter",
                    "overlayId": -1,
                    "automationId": "RecLetter",
                    "dateLastModified": "2015-11-02T14:59:18.447",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 174,
                    "name": "Loss Runs",
                    "description": "Loss Runs",
                    "overlayId": -1,
                    "automationId": "LossRuns",
                    "dateLastModified": "2015-11-02T14:59:18.263",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 175,
                    "name": "Financials",
                    "description": "Financials",
                    "overlayId": -1,
                    "automationId": "Financials",
                    "dateLastModified": "2015-11-03T12:27:00.41",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 176,
                    "name": "Worksheet",
                    "description": "Worksheet",
                    "overlayId": -1,
                    "automationId": "Worksheet",
                    "dateLastModified": "2015-11-02T14:59:18.56",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 177,
                    "name": "Application",
                    "description": "Application",
                    "overlayId": -1,
                    "automationId": "Application",
                    "dateLastModified": "2015-11-02T14:59:18.04",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 178,
                    "name": "Premium Finance Agreement",
                    "description": "Premium Finance Agreement",
                    "overlayId": -1,
                    "automationId": "PremiFinAgree",
                    "dateLastModified": "2015-11-03T12:27:00.723",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 179,
                    "name": "PF Statement",
                    "description": "PF Statement",
                    "overlayId": -1,
                    "automationId": "PFStatement",
                    "dateLastModified": "2015-11-02T14:59:18.407",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 180,
                    "name": "PF Payment",
                    "description": "PF Payment",
                    "overlayId": -1,
                    "automationId": "PF Payment",
                    "dateLastModified": "2015-11-03T12:27:00.69",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 181,
                    "name": "PF Refund",
                    "description": "PF Refund",
                    "overlayId": -1,
                    "automationId": "PF Refund",
                    "dateLastModified": "2015-11-03T12:27:00.707",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 182,
                    "name": "Fac",
                    "description": "Fac",
                    "overlayId": -1,
                    "automationId": "Fac",
                    "dateLastModified": "2015-11-03T12:17:24.473",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 183,
                    "name": "Non-Fac",
                    "description": "Non-Fac",
                    "overlayId": -1,
                    "automationId": "Non-Fac",
                    "dateLastModified": "2015-11-03T12:27:00.61",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 6223,
                    "name": "DOC_Fomat",
                    "description": "DOC_Fomat",
                    "overlayId": -1,
                    "automationId": "DOC_Doc",
                    "dateLastModified": "2015-11-03T12:27:00.387",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 6224,
                    "name": "PDF_Format",
                    "description": "PDF_Format",
                    "overlayId": -1,
                    "automationId": "PDF_Doc",
                    "dateLastModified": "2015-11-03T12:27:00.673",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 6225,
                    "name": "GIF_Format",
                    "description": "GIF_Format",
                    "overlayId": -1,
                    "automationId": "GIF_Doc",
                    "dateLastModified": "2015-11-03T12:27:00.47",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 6226,
                    "name": "JPEG_Format",
                    "description": "JPEG_Format",
                    "overlayId": -1,
                    "automationId": "JPEG_Doc",
                    "dateLastModified": "2015-11-03T12:27:00.547",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 6227,
                    "name": "TXT_Format",
                    "description": "TXT_Format",
                    "overlayId": -1,
                    "automationId": "TXT_Doc",
                    "dateLastModified": "2015-11-03T12:27:00.797",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 6228,
                    "name": "HTML_Format",
                    "description": "HTML_Format",
                    "overlayId": -1,
                    "automationId": "HTML_Doc",
                    "dateLastModified": "2015-11-03T12:27:00.487",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 6470,
                    "name": "TIFF_Multipage_Format",
                    "description": "TIFF_Multipage_Format",
                    "overlayId": -1,
                    "automationId": "TIFF_Multipage_Doc",
                    "dateLastModified": "2015-11-03T12:27:00.777",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 7331,
                    "name": "Format_withAnnotations",
                    "description": "Format_withAnnotations",
                    "overlayId": -1,
                    "automationId": "Format_withAnnotations",
                    "dateLastModified": "2015-11-03T12:27:00.433",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 7332,
                    "name": "Format_withoutAnnotations",
                    "description": "Format_withoutAnnotations",
                    "overlayId": -1,
                    "automationId": "Format_withoutAnnotations",
                    "dateLastModified": "2015-11-03T12:27:00.443",
                    "effectivePermissions": 2147483647
                },
                {
                    "classId": -1,
                    "id": 7333,
                    "name": "Format_Native",
                    "description": "Format_Native",
                    "overlayId": -1,
                    "automationId": "Format_Native",
                    "dateLastModified": "2015-11-03T12:27:00.423",
                    "effectivePermissions": 2147483647
                }
            ];
            return JSON.stringify(data);
        }
    ]
};
mocks.push(dashboardDocuments);

var dashboardDefinitions = {
    name: 'dashboardDefinitions',
    mockRoute: '/api/objecttypes/document',
    testScope: 'success',
    testScenario: 0,
    jsonTemplate: [
        function () {
            var data = [
                {
                    "id":48,
                    "name":"medicalBill",
                    "type":2,
                    "description":"Code for the Bill",
                    "displayName":"Billing Code",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":49,
                    "name":"Date",
                    "type":3,
                    "description":"Date of Bill",
                    "displayName":"Date of Bill",
                    "validationRule":null
                },
                {
                    "id":381,
                    "name":"C_name",
                    "type":2,
                    "description":"CustomerName",
                    "displayName":"CustomerName",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox>\r\n    <comboitem>Test1</comboitem>\r\n    <comboitem>Test2</comboitem>\r\n    <comboitem>Test3</comboitem>\r\n    <comboitem>Test4</comboitem>\r\n    <comboitem>Test5</comboitem>\r\n    <comboitem>Test6</comboitem>\r\n    <comboitem>Test7</comboitem>\r\n    <comboitem>Test8</comboitem>\r\n    <comboitem>Test9</comboitem>\r\n    <comboitem>Test10</comboitem>\r\n  </combobox>\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":382,
                    "name":"Is Agency",
                    "type":1,
                    "description":"IsAgency",
                    "displayName":"IsAgency",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox>TRUE</checkbox>\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":383,
                    "name":"Customer Bill",
                    "type":4,
                    "description":"CustomerBillAmount",
                    "displayName":"CustomerBillAmount",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit>\r\n    <minvalue>0</minvalue>\r\n    <maxvalue>100</maxvalue>\r\n  </spinedit>\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":384,
                    "name":"CustomerNo",
                    "type":0,
                    "description":"CustomerNo",
                    "displayName":"CustomerNo",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":385,
                    "name":"UserName",
                    "type":6,
                    "description":"UserName",
                    "displayName":"UserName",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<InputListData xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <required>true</required>\r\n  <rdonly>false</rdonly>\r\n  <separator>-</separator>\r\n  <allowNew>false</allowNew>\r\n  <order>0</order>\r\n  <nameVisible>true</nameVisible>\r\n  <descrVisible>false</descrVisible>\r\n  <shouldSort>false</shouldSort>\r\n  <flags>0</flags>\r\n  <inputList>\r\n    <inputlistitem>\r\n      <Value>xac25a267bb37e3448be568c3570a789e</Value>\r\n      <Description />\r\n      <Tag xsi:nil=\"true\" />\r\n    </inputlistitem>\r\n    <inputlistitem>\r\n      <Value>x96b275b563a2184884ba0004c4b2be4b</Value>\r\n      <Description />\r\n      <Tag xsi:nil=\"true\" />\r\n    </inputlistitem>\r\n    <inputlistitem>\r\n      <Value>m32</Value>\r\n      <Description />\r\n      <Tag xsi:nil=\"true\" />\r\n    </inputlistitem>\r\n    <inputlistitem>\r\n      <Value>x1298ea2898f9af4f933284f391bee496</Value>\r\n      <Description />\r\n      <Tag xsi:nil=\"true\" />\r\n    </inputlistitem>\r\n    <inputlistitem>\r\n      <Value>xf0d54c663dc24b4580c06e9adac6de95</Value>\r\n      <Description />\r\n      <Tag xsi:nil=\"true\" />\r\n    </inputlistitem>\r\n    <inputlistitem>\r\n      <Value>xfbdfc9fd25c9124c90f97988ce34673a</Value>\r\n      <Description />\r\n      <Tag xsi:nil=\"true\" />\r\n    </inputlistitem>\r\n  </inputList>\r\n</InputListData>"
                },
                {
                    "id":581,
                    "name":"C_no",
                    "type":0,
                    "description":"Customer number",
                    "displayName":"Cust No",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit>\r\n    <minvalue>0</minvalue>\r\n    <maxvalue>100</maxvalue>\r\n  </spinedit>\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":467,
                    "name":"Mandatory Attributes",
                    "type":0,
                    "description":"Mandatory Attributes",
                    "displayName":"Mandatory Attributes",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":563,
                    "name":"$_FROM_STEP_$",
                    "type":5,
                    "description":"Autogenerated. Do not change",
                    "displayName":"$_FROM_STEP_$",
                    "validationRule":null
                },
                {
                    "id":8225,
                    "name":"FORM",
                    "type":0,
                    "description":"FORM",
                    "displayName":"FORM",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8476,
                    "name":"newAttr",
                    "type":1,
                    "description":"NewAttr",
                    "displayName":"NewAttr",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox>TRUE</checkbox>\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8744,
                    "name":"Vehicle name",
                    "type":4,
                    "description":"Vehicle name",
                    "displayName":"Vehicle name",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8745,
                    "name":"Vegicle Buying date",
                    "type":3,
                    "description":"Vegicle Buying date",
                    "displayName":"Vegicle Buying date",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker>TRUE</datetimepicker>\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8746,
                    "name":"Home Type",
                    "type":2,
                    "description":"Home Type",
                    "displayName":"Home Type",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8747,
                    "name":"Test long Name Test long Name Test long Name Test",
                    "type":0,
                    "description":"Test long Name Test long Name Test long Name Test 4353434534534534534534343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343",
                    "displayName":"Test long Name Test long Name Test long Name Test",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit>\r\n    <minvalue>0</minvalue>\r\n    <maxvalue>100</maxvalue>\r\n  </spinedit>\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8748,
                    "name":"Location",
                    "type":0,
                    "description":"Location",
                    "displayName":"Location",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit>\r\n    <minvalue>0</minvalue>\r\n    <maxvalue>100</maxvalue>\r\n  </spinedit>\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8749,
                    "name":"test2",
                    "type":1,
                    "description":"test2",
                    "displayName":"test2",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox>TRUE</checkbox>\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8750,
                    "name":"test3",
                    "type":2,
                    "description":"test2",
                    "displayName":"test2",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8751,
                    "name":"test4",
                    "type":2,
                    "description":"test2",
                    "displayName":"test2",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8752,
                    "name":"test5",
                    "type":3,
                    "description":"test3",
                    "displayName":"test3",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker>TRUE</datetimepicker>\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8753,
                    "name":"test6",
                    "type":1,
                    "description":"test6",
                    "displayName":"test6",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox>TRUE</checkbox>\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8754,
                    "name":"test7",
                    "type":2,
                    "description":"test7",
                    "displayName":"test7",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8755,
                    "name":"test8",
                    "type":6,
                    "description":"test8",
                    "displayName":"test8",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<InputListData xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <required>true</required>\r\n  <rdonly>false</rdonly>\r\n  <separator>-</separator>\r\n  <allowNew>false</allowNew>\r\n  <order>0</order>\r\n  <nameVisible>true</nameVisible>\r\n  <descrVisible>false</descrVisible>\r\n  <shouldSort>false</shouldSort>\r\n  <flags>0</flags>\r\n  <inputList>\r\n    <inputlistitem>\r\n      <Value>x5a3437326f844c4fa6a1c6af68c72440</Value>\r\n      <Description />\r\n      <Tag xsi:nil=\"true\" />\r\n    </inputlistitem>\r\n    <inputlistitem>\r\n      <Value>x42ae83478858584789c03135c8d07e57</Value>\r\n      <Description />\r\n      <Tag xsi:nil=\"true\" />\r\n    </inputlistitem>\r\n    <inputlistitem>\r\n      <Value>xd1d8173959b3774685c173116038e881</Value>\r\n      <Description />\r\n      <Tag xsi:nil=\"true\" />\r\n    </inputlistitem>\r\n  </inputList>\r\n</InputListData>"
                },
                {
                    "id":8762,
                    "name":"test9",
                    "type":0,
                    "description":"test6",
                    "displayName":"test6",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8763,
                    "name":"test10",
                    "type":4,
                    "description":"test10",
                    "displayName":"test10",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox>\r\n    <comboitem>1.2</comboitem>\r\n    <comboitem>2.3</comboitem>\r\n    <comboitem>3.4</comboitem>\r\n  </combobox>\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8764,
                    "name":"test11",
                    "type":2,
                    "description":"test11",
                    "displayName":"test11",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox>\r\n    <comboitem>qwe</comboitem>\r\n    <comboitem>asd</comboitem>\r\n    <comboitem>zxc</comboitem>\r\n  </combobox>\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8765,
                    "name":"test105",
                    "type":4,
                    "description":"test105",
                    "displayName":"test105",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8766,
                    "name":"test106",
                    "type":1,
                    "description":"test106",
                    "displayName":"test106",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox>TRUE</checkbox>\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8767,
                    "name":"test107dfgdfgdfggggggggggggggggggggggggggggggggggg",
                    "type":1,
                    "description":"test1078979999999999999999999999999999999999999999",
                    "displayName":"test1078979999999999999999999999999999999999999999",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox>TRUE</checkbox>\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8910,
                    "name":"Int with min-max",
                    "type":0,
                    "description":"Int with min-max",
                    "displayName":"Int with min-max",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit>\r\n    <minvalue>50</minvalue>\r\n    <maxvalue>100</maxvalue>\r\n  </spinedit>\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":8911,
                    "name":"float with min-max",
                    "type":4,
                    "description":"float with min-max",
                    "displayName":"float with min-max",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit>\r\n    <minvalue>100</minvalue>\r\n    <maxvalue>200</maxvalue>\r\n  </spinedit>\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":9290,
                    "name":"FP",
                    "type":4,
                    "description":"FP",
                    "displayName":"FP",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit>\r\n    <minvalue>5</minvalue>\r\n    <maxvalue>100</maxvalue>\r\n  </spinedit>\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":9303,
                    "name":"Int Textbox 255 length",
                    "type":0,
                    "description":"Int Textbox 255 length",
                    "displayName":"Int Textbox 255 length",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":9304,
                    "name":"Str Textbox 255 length",
                    "type":2,
                    "description":"Str Textbox 255 length",
                    "displayName":"Str Textbox 255 length",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":9305,
                    "name":"Float Textbox 255 length",
                    "type":4,
                    "description":"Float Textbox 255 length",
                    "displayName":"Float Textbox 255 length",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":9306,
                    "name":"Float Textbox 15 length",
                    "type":4,
                    "description":"Float Textbox 15 length",
                    "displayName":"Float Textbox 15 length",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>15</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":9307,
                    "name":"Int Textbox 15 length",
                    "type":0,
                    "description":"Int Textbox 15 length",
                    "displayName":"Int Textbox 15 length",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>15</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":9308,
                    "name":"Str Textbox 15 length",
                    "type":2,
                    "description":"Str Textbox 15 length",
                    "displayName":"Str Textbox 15 length",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>15</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":9309,
                    "name":"date-time picker(date-time picker)",
                    "type":3,
                    "description":"date-time picker",
                    "displayName":"date-time picker",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker>TRUE</datetimepicker>\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":9310,
                    "name":"date-time picker(none)",
                    "type":3,
                    "description":"date-time picker(none)",
                    "displayName":"date-time picker(none)",
                    "validationRule":null
                },
                {
                    "id":9311,
                    "name":"float with min(50)-max(200)",
                    "type":4,
                    "description":"float with min(50)-max(200)",
                    "displayName":"float with min(50)-max(200)",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit>\r\n    <minvalue>50</minvalue>\r\n    <maxvalue>200</maxvalue>\r\n  </spinedit>\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":9312,
                    "name":"int with min(10) and max(20)",
                    "type":0,
                    "description":"int with min(10) and max(20)",
                    "displayName":"int with min(10) and max(20)",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit>\r\n    <minvalue>10</minvalue>\r\n    <maxvalue>20</maxvalue>\r\n  </spinedit>\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":16040,
                    "name":"test12",
                    "type":0,
                    "description":"test12",
                    "displayName":"test12",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox>\r\n    <comboitem>123</comboitem>\r\n    <comboitem>345</comboitem>\r\n    <comboitem>567</comboitem>\r\n  </combobox>\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":16631,
                    "name":"ADJUSTER",
                    "type":2,
                    "description":"ADJUSTER",
                    "displayName":"ADJUSTER",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":16632,
                    "name":"TYPE-OF-LOSS",
                    "type":2,
                    "description":"Indicates the type of loss associated with a claim",
                    "displayName":"TYPE OF LOSS",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":16633,
                    "name":"CLAIM-ASSIGNMENT-TYPE",
                    "type":2,
                    "description":"Indicates type of claim that will be opened",
                    "displayName":"CLAIM ASSIGNMENT TYPE",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":16634,
                    "name":"SKIP_WORK",
                    "type":1,
                    "description":"SKIP_WORK",
                    "displayName":"SKIP_WORK",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox>TRUE</checkbox>\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox xsi:nil=\"true\" />\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                },
                {
                    "id":16635,
                    "name":"CLAIMS-ADJUSTER",
                    "type":6,
                    "description":"Stores Claims Adjuster UserNames",
                    "displayName":"CLAIMS ADJUSTER",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<InputListData xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <required>true</required>\r\n  <rdonly>false</rdonly>\r\n  <separator>-</separator>\r\n  <allowNew>false</allowNew>\r\n  <order>0</order>\r\n  <nameVisible>true</nameVisible>\r\n  <descrVisible>false</descrVisible>\r\n  <shouldSort>false</shouldSort>\r\n  <flags>0</flags>\r\n  <inputList xsi:nil=\"true\" />\r\n</InputListData>"
                },
                {
                    "id":16636,
                    "name":"Notify-Agent",
                    "type":2,
                    "description":"Do you want to notify the agent of a claim?",
                    "displayName":"Notify Agent",
                    "validationRule":"<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<FieldProperties xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n  <checkbox xsi:nil=\"true\" />\r\n  <datetimepicker xsi:nil=\"true\" />\r\n  <combobox xsi:nil=\"true\" />\r\n  <textbox>\r\n    <mask />\r\n    <length>255</length>\r\n  </textbox>\r\n  <spinedit xsi:nil=\"true\" />\r\n  <validators xsi:nil=\"true\" />\r\n</FieldProperties>"
                }
            ];
            return JSON.stringify(data);
        }
    ]
};
mocks.push(dashboardDefinitions);


exports.mocks = mocks;