/**
 * Created by flaterje on 5/13/2014.
 */
var mocks = [];


/**
 * @api {post} /AddContent/CreateBatch Create Batch
 * @apiName CreateBatch
 * @apiGroup AddContent
 */
var CreateBatch = {
    name: 'CreateBatch',
    mockRoute: '/AddContent/CreateBatch',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [function () {
        return '{' +
            '"objectId":"203370"' +
            '}';
    }]
};
mocks.push(CreateBatch);

/**
 * @api {get} /AddContent/AddPage Add Page
 * @apiName AddPage
 * @apiGroup AddContent
 * @apiParam {HttpPostedFileBase} file HttpPostedFileBase is an object of integer ContentLength, string ContentType,
 * string FileName, object InputStream (object Stream)
 * @apiParam {String} documentId
 * @apiParam {String} pageId
 * @apiParam {String} after
 * @apiParam {String} batchId
 */
var AddPage = {
    name: 'AddPage',
    mockRoute: '/AddContent/AddPage',
    testScope: 'success', //success | fail | error | badRequest
    testScenario: 'addTwoPageTestWithIdMatchingTreePage',
    //latency: 1000,
    jsonTemplate: [
        {
            defaultRoute: function () {
                var result = {
                    Pages: [
                        {
                            DeleteOpType: 0,
                            Deleted: false,
                            Description: 'imgRight_theme.css',
                            Id: 381632,
                            //LatestImages is an object with the ImageMetadata
                            LatestImages: {},
                            Marks: [],
                            Pagenumber: 4,
                            Version: 0
                        }
                    ],
                    SplitResult: 1
                };

                return JSON.stringify(result);
            }
        },
        {
            addPageTestWithIdMatchingTreePage: function () {
                var result = {
                    Pages: [
                        {
                            DeleteOpType: 0,
                            Deleted: false,
                            Description: 'imgRight_theme.css',
                            DocumentId: 1234,
                            Id: 12345,
                            //LatestImages is an object with the ImageMetadata
                            LatestImages: {},
                            Marks: [],
                            Pagenumber: 4,
                            Version: 0
                        }
                    ],
                    SplitResult: 1
                };

                return JSON.stringify(result);
            }
        },
        {
            addTwoPageTestWithIdMatchingTreePage: function () {
                var result = {
                    Pages: [
                        {
                            DeleteOpType: 0,
                            Deleted: false,
                            Description: 'imgRight_theme.css',
                            DocumentId: 1234,
                            Id: 12345,
                            //LatestImages is an object with the ImageMetadata
                            LatestImages: {},
                            Marks: [],
                            Pagenumber: 4,
                            Version: 0
                        },
                        {
                            DeleteOpType: 0,
                            Deleted: false,
                            Description: 'imgRight_theme.css',
                            DocumentId: 1234,
                            Id: 12346,
                            //LatestImages is an object with the ImageMetadata
                            LatestImages: {},
                            Marks: [],
                            Pagenumber: 4,
                            Version: 0
                        }
                    ],
                    SplitResult: 2
                };
                return JSON.stringify(result);
            }
        }

    ]
};
mocks.push(AddPage);

/**
 * @api {get} /AddContent/AddDocument Add Document
 * @apiName AddDocument
 * @apiGroup AddContent
 * @apiParam {CreateDocumentModel} documentModel CreateDocumentModel is an object of string ParentID, string Description,
 * string Type, object DateTime, object AllowedDocTypesModel
 * @apiParam {AttributesModel} attributesModel AttributesModel is an object of object AttributeInfo (an array of objects),
 * object attributesInfo (array of objects)
 */
var AddDocument = {
    name: 'AddDocument',
    mockRoute: '/AddContent/AddDocument',
    testScope: 'success', //success | fail | error
    testScenario: 'addDocumentTestRoute',
    jsonTemplate: [
        {
            defaultRoute: function () {
                return '{' +
                    '"objectId":"404",' +
                    '"extension":null' +
                    '}';
            }
        },
        {
            permissionsFailureRoute: function () {
                var response = {
                    "Success": false,
                    "Error": "You do not have rights to create a document of the selected type."
                };
                return JSON.stringify(response);
            }
        },
        {
            addDocumentTestRoute: function () {
                var result = {
                    objectId: '1234'
                };
                return JSON.stringify(result);
            }
        }
    ]
};
mocks.push(AddDocument);

exports.mocks = mocks;