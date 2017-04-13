/**
 * Created by flaterje on 5/13/2014.
 */
var mocks = [];



/**
 * @api {get} /Page/Lock Lock
 * @apiName Lock
 * @apiGroup Page
 * @apiParam {String} pageId
 */
var Lock = {
    name: 'Lock',
    mockRoute: '/Page/Lock',
    testScope: 'success', //success | fail | error
    testScenario: 'lockFailure',
    jsonTemplate: [ { lockSuccess: function(){ return '{' +
        '"Success":true,' +
        '"Error":"null"' +
        '}';} },
        { lockFailure: function(){ return '{' +
            '"Success":false,' +
            '"Error":"An error has occured while attempting to edit the page because it has been deleted."' +
            '}';}}]
};
mocks.push(Lock);

/**
 * @api {get} /Page/UnLock UnLock
 * @apiName UnLock
 * @apiGroup Page
 * @apiParam {String} pageId
 */
var UnLock = {
    name: 'UnLock',
    mockRoute: '/Page/UnLock',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [ function(){ return '{' +
        '"Success":true,' +
        '"Error":null' +
        '}';}]
};
mocks.push(UnLock);

/**
 * @api {get} /Page/Rotate Rotate
 * @apiName Rotate
 * @apiGroup Page
 * @apiParam {String} pageId
 */
var Rotate = {
    name: 'Rotate',
    mockRoute: '/Page/UnLock',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [ function(){ return '{' +
        '"Success":true,' +
        '"Error":null' +
        '}';}]
};
mocks.push(Rotate);

exports.mocks = mocks;