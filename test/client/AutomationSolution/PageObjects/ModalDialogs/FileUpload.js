var FileUpload = function () { };

FileUpload.prototype = Object.create({}, {

    //Button to navigate to the file upload NEW context
    fileUploadNewButton: {
        get: function(){
            return element(by.css("[ng-click=\"openUpload('new')\"]"));
        }},

    //Button to navigate to the file upload EXISTING context
    fileUploadExistingButton: {
        get: function(){
            return element(by.css("[ng-click=\"openUpload('existing')\"]"));
        }},

    addToBeginningCheckbox: {
        get: function(){
            return element(by.css("[value='beginning']"));
        }},

    addToEndCheckbox: {
        get: function(){
            return element.all(by.tagName('ir-file-upload-view')).get(0).all(by.id('inputPosition')).get(1);
        }},

    documentTypeDropDown: {
        get: function(){
            return element.all(by.tagName('ir-file-upload-view')).get(0).all(by.id('docType')).get(0);
        }},

    documentDescriptionField: {
        get: function(){
            return element.all(by.tagName('ir-file-upload-view')).get(0).all(by.id('docDesc')).get(0);
        }},

    documentDateField: {
        get: function(){
            return element.all(by.tagName('ir-file-upload-view')).get(0).all(by.id('docDate')).get(0);
        }},

    fileUploadField: {
        get: function(){
            return element.all(by.tagName('ir-file-upload-view')).get(0).all(by.css('input[type="file"]')).get(0);
        }},

    fileUploadNextButton: {
        get: function(){
            return element.all(by.tagName('ir-file-upload-view')).get(0).all(by.css('.btn-group')).get(1).all(by.css('.btn.btn-default')).get(0);
        }},

    fileUploadButton: {
        get: function(){
            return element.all(by.tagName('ir-file-upload-view')).get(0).all(by.css('.btn.btn-success')).get(0);
        }},

    fileUploadCancelButton: {
        get: function(){
            return element.all(by.tagName('ir-file-upload-view')).get(0).all(by.css('.btn.btn-danger')).get(0);
        }},

    fileUploadStatus: {
        get: function(){
            return element.all(by.tagName('ir-file-upload-view')).get(0).all(by.id('uploadStatus')).get(0);
        }}
});

module.exports = FileUpload;

