var CreateTaskDiaryDropdown = function () { };

var activeFile = $('.vf-tab-pane.active');

CreateTaskDiaryDropdown.prototype = Object.create({}, {

    createTaskAction: {
        get: function () {
            return activeFile.$('[ng-click="createTask()"]');
        }
    },

    createDiaryAction: {
        get: function () {
            return activeFile.$('[ng-click="createDiary()"]');
        }
    }
});

module.exports = CreateTaskDiaryDropdown;

