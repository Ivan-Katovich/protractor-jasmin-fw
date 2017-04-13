/**
 * Created by Jeff on 3/2/2015.
 */
var mocks = [];


/**
 * @api {post} /api/folders Create Folder
 * @apiName folders
 * @apiGroup folders
 * @apiParam {String} folderTypeId
 * @apiParam {String} parentId
 * @apiParam {String} description
 * @apiParam {Array} attributes - example: [ { "name":name, "value":val }, more attribute objects if necessary ]
 */
var CreateFolder = {
    name: 'CreateFolder',
    mockRoute: '/api/folders',
    testScope: 'success',
    testScenario: 0,
    jsonTemplate: [function() {
        return '311'; //toDo: regex thing method should return id of newly created folder.
    }]
};
mocks.push(CreateFolder);

exports.mocks = mocks;