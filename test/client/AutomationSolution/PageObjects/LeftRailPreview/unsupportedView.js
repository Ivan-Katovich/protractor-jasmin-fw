var IR = require('../ir.js');
var config = {
    isPreview: true
};
var unsupportedView = new IR.view(config);

unsupportedView.errorIcon = function(fileId)
{
    return unsupportedView.viewingArea(fileId).element(by.id('error-icon-'+fileId));
};
unsupportedView.errorMessage = function(fileId)
{
    return unsupportedView.viewingArea(fileId).element(by.id('error-message-'+fileId));
};
module.exports = unsupportedView;