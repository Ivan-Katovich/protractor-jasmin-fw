/* confirmation dialog for removing files from Import Bin; */

var DeleteFileDialog = function () { };

DeleteFileDialog.prototype = Object.create({}, {

    title: {
        get: function () {
            return element(by.css(".modal-dialog .vf-modal-header h3"));
        }
    },

    message: {
        get: function () {
            return element(by.css(".modal-body p"));
        
        }
    },

    deleteButton: {
        get: function () {
            return element(by.css(".modal-dialog #btnOk")); 
        }
    },

    cancelButton: {
        get: function () {
            return element(by.css(".modal-dialog #btnCancel"));
        }
    }
});

module.exports = DeleteFileDialog;