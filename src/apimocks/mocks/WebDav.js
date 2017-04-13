/**
 * Created by davissc on 4/13/2015.
 */

var mocks = [];


/**
 * @api {get} /WebDav/CheckOutPage Check Out Page
 * @apiName CheckOutPage
 * @apiGroup CheckOutPage
 * @apiParam {Long} pageId
 */
var CheckOutPage = {
    name: 'CheckOutPage',
    mockRoute: '/WebDav/CheckOutPage',
    testScope: 'success', //success | fail | error
    errorBody: '<!-- boohoo -->Something went wrong and this is the response',
    testScenario: 0,
    jsonTemplate: [function () {
        return '{' +
            '"webDavUrl": "ms-word:ofe|u|https://webdavserverurl/file.xlsx"' +
            '}';
    }]
};
mocks.push(CheckOutPage);

/**
 * @api {get} /WebDav/CheckInPage Check In Page
 * @apiName CheckInPage
 * @apiGroup CheckInPage
 * @apiParam {Long} pageId
 */
var CheckInPage = {
    name: 'CheckInPage',
    mockRoute: '/WebDav/CheckInPage',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [function () {
        return '{}';
    }]
};
mocks.push(CheckInPage);

/**
 * @api {get} /WebDav/CancelCheckOut Cancel Check Out
 * @apiName CancelCheckOut
 * @apiGroup CancelCheckOut
 * @apiParam {Long} pageId
 */
var CancelCheckOut = {
    name: 'CancelCheckOut',
    mockRoute: '/WebDav/CancelCheckOut',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [function () {
        return '{}';
    }]
};
mocks.push(CancelCheckOut);

/**
 * @api {get} /WebDav/CheckOutPage Check Out Page
 * @apiName CheckOutPage
 * @apiGroup CheckOutPage
 * @apiParam {Long} pageId
 */
var ViewOnly = {
    name: 'ViewOnly',
    mockRoute: '/WebDav/ViewOnly',
    testScope: 'success', //success | fail | error
    errorBody: '<!-- boohoo -->Something went wrong and this is the response',
    testScenario: 0,
    jsonTemplate: [function () {
        return '{' +
                '"webDavUrl": "ms-word:ofe|u|https://webdavserverurl/file.xlsx"' +
                '}';
    }]
};
mocks.push(ViewOnly);

exports.mocks = mocks;