//6412dd86-29ed-46e3-a4ba-79bb1d2222a0

var mocks = [];

/**
 * @api {post} api/licensing/WebClient/login login to licensing service
 * @apiName login
 * @apiGroup licensing
 */

var Login = {
    name: 'login',
    mockRoute: '/api/licensing/WebClient/Desktop_Login_Full/login',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [ function(){ return '{' +
        '"loginId":"dd689355-4919-42dd-b582-ebb50cfd9ed0",' +
        '"isLicensed":true,' +
        '"licenseMessages":[]' +
        '}';}]
};
mocks.push(Login);

/**
 * @api {post} api/licensing/WebClient/login login to licensing service
 * @apiName login
 * @apiGroup licensing
 */

var Login2 = {
            name: 'login',
            mockRoute: 'api/licensing/BrowserClient/Desktop_Login_Limited/login',
            testScope: 'success', //success | fail | error
            testScenario: 0,
            jsonTemplate: [ function(){ return '{' +
                    '"loginId":"dd689355-4919-42dd-b582-ebb50cfd9ed0",' +
                    '"isLicensed":true,' +
                    '"licenseMessages":[]' +
                    '}';}]
        };
mocks.push(Login2);

/**
 * @api {post} api/licensing/dd689355-4919-42dd-b582-ebb50cfd9ed0/WebClient/logout logout of licensing service
 * @apiName logout
 * @apiGroup licensing
 */

var Logout = {
    name: 'logout',
    mockRoute: '/api/licensing/dd689355-4919-42dd-b582-ebb50cfd9ed0/Desktop_Login_Full/logout',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [ function(){ return '{}'; }]
};
mocks.push(Logout);

/**
 * @api {post} api/licensing/dd689355-4919-42dd-b582-ebb50cfd9ed0/WebClient/stillalive keeping login session alive
 * @apiName stillalive
 * @apiGroup licensing
 */

var StillAlive = {
    name: 'stillalive',
    mockRoute: '/api/licensing/dd689355-4919-42dd-b582-ebb50cfd9ed0/WebClient/Desktop_Login_Full/stillalive',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [ function(){ return '{' +
        '"self":"dd689355-4919-42dd-b582-ebb50cfd9ed0",' +
        '"pendingMessageCount": 0' +
        '}';}]
};
mocks.push(StillAlive);

/**
 * @api {get} api/licensing/getmessages get licensing messages
 * @apiName getmessages
 * @apiGroup licensing
 */

var GetMessages = {
    name: 'getmessages',
    mockRoute: '/api/licensing/getmessages',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [ function(){ return '{}';}]
};
mocks.push(GetMessages);

/**
 * @api {get} api/licensing/ValidateLicense/OCR validate the license for OCR
 * @apiName ValidateLicense
 * @apiGroup licensing
 */

var ValidateLicenseOCR = {
    name: 'ValidateLicenseOCR',
    mockRoute: '/api/licensing/ValidateLicense/OCR',
    testScope: 'success', //success | fail | error
    testScenario: 'isLicensed', //isLicensed, isNotLicensed, isNotDefined
    jsonTemplate: [
        {
            isLicensed: function(){
                return '{"isLicensed": true}';
            }
        },
        {
            isNotLicensed: function(){
                return '{"isLicensed": false}';
            }
        },
        {
            isNotDefined: function(){
                return '{"isLicensed": false}';
            }
        }
    ]
};
mocks.push(ValidateLicenseOCR);

/**
 * @api {get} api/licensing/ValidateLicense/YourFeature validate the license for YourFeature
 * @apiName ValidateLicense
 * @apiGroup licensing
 */

var ValidateLicense = {
    name: 'ValidateLicense',
    mockRoute: '/api/licensing/ValidateLicense/*',
    testScope: 'success', //success | fail | error
    testScenario: 'isLicensed', //isLicensed, isNotLicensed, isNotDefined
    jsonTemplate: [
        {
            isLicensed: function(){
                return '{"isLicensed": true}';
            }
        },
        {
            isNotLicensed: function(){
                return '{"isLicensed": false}';
            }
        },
        {
            isNotDefined: function(){
                return '{"isLicensed": false}';
            }
        }
    ]
};
mocks.push(ValidateLicense);

exports.mocks = mocks;