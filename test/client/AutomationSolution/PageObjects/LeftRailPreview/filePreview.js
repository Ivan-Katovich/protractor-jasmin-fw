var IR_fileFolderPreviewBase = require('./_fileFolderPreviewBase.js');

//filePreview
var filePreview = new IR_fileFolderPreviewBase();
filePreview.title = function(fileId)
{
    return filePreview.viewingArea(fileId).element(by.id('title-file-'+fileId));
};
filePreview.fileMarks = function(fileId)
{
    return filePreview.viewingArea(fileId).element(by.id('file-marks-'+fileId));
};

module.exports = filePreview;
