var DeleteTaskDialog = function () { };

DeleteTaskDialog.prototype = Object.create({}, {

    title: {
        get: function () {
            return element(by.css(".modal-dialog .vf-modal-header")).getText();
        }
    },

    deleteTaskMessage: {
        value: function (fn) {
            element(by.css("ng-include p:nth-child(1)")).getText().then(function(text1) {
                element(by.css("ng-include p:nth-child(2)")).getText().then(function (text2) {
                    return fn(text1 + " " + text2);
                });
            });
        }
    },

    keepTaskButton: {
        get: function () {
            return element(by.css(".vf-modal-footer button[ng-click='cancel()']"));
        }
    },

    deleteTaskButton: {
        get: function () {
            return element(by.css(".vf-modal-footer button[ng-click='ok();']"));
        }
    }
});

module.exports = DeleteTaskDialog;

