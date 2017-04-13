var AddFolderModal = function () { };

var addFolderPopup = $('.modal-content');

AddFolderModal.prototype = Object.create({}, {

    //returns Add Folder pop--up's header
    addFolderHeader: {
        get: function () {
            return addFolderPopup.$('.vf-modal-header');
        }
    },

    //returns 'AddFolder" concluding button of 'AddFolder" popup object
    finalizeAddFolder: {
        get: function () {
            return addFolderPopup.element(by.buttonText("Done"));
        }
    },

    folderTypeDropdown: {
        get: function () {
            return addFolderPopup.element(by.css('.col-type2 button'));
        }
    },

    folderTypeDropdownElement: {
        value: function (index) {
            return addFolderPopup.all(by.css('.col-type2 .dropdown-menu a')).get(index);
        }
    },

    //Below function returns all the fileTypes elements in a  list
    folderTypeDropdownElements: {
        get: function () {
            return addFolderPopup.all(by.css('.col-type2 .dropdown-menu a'))
        }
    },

    folderTypeDropdownSelectedValue: {
        get: function () {
            return addFolderPopup.element(by.css('.col-type2 button span.filter-option'));
        }
    },

    folderDescriptionBox: {
        get: function () {
            return addFolderPopup.element(by.model('folderDescription'));
        }
    },

    folderNotesBox: {
        get: function () {
            return addFolderPopup.element(by.model('folderNotes'));
        }
    }
});

module.exports = AddFolderModal;