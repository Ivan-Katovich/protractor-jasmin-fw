var SetTaskAttributesModal = function () { };

SetTaskAttributesModal.prototype = Object.create({}, {

    container: { writable: true, configurable: true, value: "" },

    title: {
        get: function () {
            return element(by.css(".modal-dialog .vf-modal-header")).getText();
        }
    },

    taskDescription: {
        get: function() {
            return element(by.css(".fixed-col7[title]")).getText();
        }
    },

    userNameAttr: {
        get: function() {
            return element(by.css("[id='attr385']~div button"));
        }
    },

    //param 'index' should start from 1
    userNameDropdownElement: {
        value: function(index) {
            return element.all(by.css("[id='attr385']~div button~div ul li")).get(index);
        }
    },

    custNameAttr: {
        get: function() {
            return element(by.css("[id='attr381']~div button"));
        }
    },

    //param 'index' should start from 1
    custNameDropdownElement: {
        value: function(index) {
            return element.all(by.css("[id='attr381']~div ul li")).get(index);
        }
    },

    custNoAttr: {
        get: function() {
            return element(by.id("attr581"));
        }
    },

    customerBillAmountAttr: {
        get: function() {
            return element(by.id("attr383"));
        }
    },

    dateOfBillAttr_Input: {
        get: function() {
            return element(by.id("attr49"));
        }
    },

    datepicker_Icon: {
        get: function() {
            return element(by.css(this.container + ".input-group-addon"));
        }
    },

    formAttr: {
        get: function() {
            return element(by.id("attr8225"));
        }
    },

    customerNoAttr: {
        get: function () {
            return element(by.id("attr384"));
        }
    },
    
    homeTypeAttr: {
        get: function () {
            return element(by.id("attr8746"));
        }
    },

    isAgencyAttr: {
        get: function () {
            return element(by.css("input[id='attr382']~label"));
        }
    },

    locationAttr: {
        get: function () {
            return element(by.id("attr8748"));
        }
    },

    billingCodeAttr: {
        get: function () {
            return element(by.id("attr48"));
        }
    },

    newAttr: {
        get: function () {
            return element(by.css("input[id='attr8476']~label"));
         }
    },

    isAgencyChecked: {
        get: function () {
            return element(by.id("attr382")).getAttribute('checked');
        }
    },

    isNewAttrChecked: {
        get: function () {
            return element(by.id("attr8476")).getAttribute('checked');
        }
    },

    vehicleNameAttr: {
        get: function () {
            return element(by.id("attr8744"));
        }
    },

    nextStepDropdown: {
        get: function () {
            return element(by.css("[data-id='releaseSteps']"));
        }
    },

    //param 'index' should start from 1
    nextStepDropdownElement: {
        value: function (index) {
            return element.all(by.css("[id='releaseSteps']~div button~div ul li")).get(index);
        }
    },

    buttonSetAttributes: { 
        get: function () {
            return element(by.id("btnSetAttributes"));
        }
    },

    buttonSetAndRelease: {
        get: function () {
            return element(by.id("btnSetRelease"));
        }
    },
    
    buttonRelease: {
        get: function () {
            return element(by.id("btnRelease"));
        }
    },
    
    buttonCancel: {
        get: function () {
            return element(by.id("btnCancel"));
        }
    },

    noAttrMessage: {
        get: function () {
            return element(by.css("[ng-show='noAttributes']")).getText();
        }
    },

    invalidTypeMessage: {
        get: function () {
            return element(by.css(".invalid-type-message:not(.ng-hide)")).getText();
        }
    },

    getClassOfUserNameAttr: {
        get: function () {
            return element(by.css("[id='attr385']~div")).getAttribute("class");
        }
    },
    
    youMustSetAttrMessage: {
        get: function () {
            return element(by.css(".ir-modal-title")).getText();
        }
    },
    
    attributeGroups: {
        get: function () {
            return element.all(by.css(".attr-window-list .form-group"));
        }
    }
});

module.exports = SetTaskAttributesModal;

