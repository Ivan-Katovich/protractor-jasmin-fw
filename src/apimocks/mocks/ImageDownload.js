/**
 * Created by flaterje on 5/13/2014.
 */
var mocks = [];


/**
 * @api {get} /ImageDownload/DownloadImage Download Image
 * @apiName DownloadImage
 * @apiGroup ImageDownload
 * @apiParam {String} pageId
 * @apiParam {Boolean} includeAnnotations
 */
var DownloadImage = {
    name: 'DownloadImage',
    mockRoute: '/ImageDownload/DownloadImage',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [function () {
        return '{}';
    }]
};
mocks.push(DownloadImage);

/**
 * @api {get} /ImageDownload/DownLoadError DownLoad Error
 * @apiName DownLoadError
 * @apiGroup ImageDownload
 */
var DownLoadError = {
    name: 'DownLoadError',
    mockRoute: '/ImageDownload/DownLoadError',
    testScope: 'success', //success | fail | error
    testScenario: 0,
    jsonTemplate: [function () {
        return '{}';
    }]
};
mocks.push(DownLoadError);

exports.mocks = mocks;