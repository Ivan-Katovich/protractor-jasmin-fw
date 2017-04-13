var mocks = [];

/**
 * @api {post} /api/pages/{pageId:long}/properties RenamePage
 * @apiName rename
 * @apiGroup rename
 * @apiParam {string} Description
 */

/**
 * error code - reason
 * 17 - An unexpected error occurred. Please try again later.
 * 701 - Page was not found.
 * 401 - unauthorized - You do not have sufficient permissions to perform this action.
 * 400 - badRequest - Document structure exception received.
 * 704 - The requested page does not belong to the document.
 * */

var RenamePage = {
    name: 'RenamePage',
    mockRoute: '\/api\/pages\/.*\/properties',
    testScope: 'success',
    testScenario: 0,
    errorBody: '{"message":"500 SERVER ERROR!!!!!"}',
    //latency: '2000-7000',
    jsonTemplate: [

        //scenario 0
        function () {
            return '17'; //page id
        }
    ]
};
mocks.push(RenamePage);


/**
 * @api {post} /api/documents/{docId:long}/properties RenameDocument
 * @apiName rename
 * @apiGroup rename
 * @apiParam {string} Description
 */

/**
 * error code - reason
 * 17 - An unexpected error occurred. Please try again later.
 * 600 - Attribute not found.
 * 602 - Attribute is not allowed.
 * 601 - Attribute is required.
 * 603 - Attribute value is invalid.
 * 400 - badRequest - Document structure exception received.
 * 401 - unauthorized - You do not have sufficient permissions to perform this action.
 * 1002 - The type was not found.
 * 901 - Data is not valid for the template.
 */
var RenameDocument = {
    name: 'RenameDocument',
    mockRoute: '\/api\/documents\/.*\/properties',
    testScope: 'success',
    testScenario: 0,
    jsonTemplate: [

        //scenario 0
        function () {
            var data = {};
            return JSON.stringify(data);
        }
    ]
};
mocks.push(RenameDocument);

exports.mocks = mocks;