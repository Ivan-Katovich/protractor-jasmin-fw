var IR_fileFolderPreviewBase = require('./_fileFolderPreviewBase.js');

//folderPreview
var folderPreview = new IR_fileFolderPreviewBase();
folderPreview.title = function(fileId)
    {
        return folderPreview.viewingArea(fileId).element(by.id('title-folder-'+fileId));
};

module.exports = folderPreview;
