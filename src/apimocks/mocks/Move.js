var mocks = [];


/**
 * @api {post} /api/instances/2724232/children GetChildren
 * @apiName move
 * @apiGroup move
 */
var GetChildren = {
    name: 'GetChildren1',
    mockRoute: '\/api\/instances\/.*\/children',
    testScope: 'success',
    testScenario: 0,
    jsonTemplate: [
        {
            twoDocuments: function() {
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
                return JSON.stringify(docs);
            }
        }]
};
mocks.push(GetChildren);

/**
 * @api {post} /api/documents/move MoveDocument
 * @apiName move
 * @apiGroup move
 */
var MoveDocument = {
    name: 'MoveDocument',
    mockRoute: 'documents/move',
    testScope: 'success',
    latency: '3000-10000',
    testScenario: 0,
    jsonTemplate: [
        //success for single document - scenario 0
        function () {
            var data = {
                "documentIdMap": {"1222": 1224},
                "pageIdMap": {"430": 435},
                "failedDocuments": []
            };
            return JSON.stringify(data);
        }
    ]

};
mocks.push(MoveDocument);


/**
 * @api {post} /api/pages/move MovePage
 * @apiName move
 * @apiGroup move
 */
var MovePage = {
    name: 'MovePage',
    mockRoute: '/api/pages/move',
    testScope: 'badRequest',
    testScenario: 0,
    jsonTemplate: [
        //success for single page - scenario 0
        function () {
            var data = {};
            return JSON.stringify(data);
        }
    ]
};
mocks.push(MovePage);

exports.mocks = mocks;