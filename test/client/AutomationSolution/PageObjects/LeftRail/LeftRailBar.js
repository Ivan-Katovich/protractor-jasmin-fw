var LeftRailBar = function () { };

LeftRailBar.prototype = Object.create({}, {

    toDoList: {
            get: function () {
                return element(by.css("button[title='To Do List'] i"));
            }
        },
        
    diaryList: {
            get: function () {
                return element(by.css("button[title='Diaries'] i"));
            }
    },

    importList: {
        get: function () {
            return element(by.css("button[title='Import Bin'] i"));
        }
    },

    openFilesDropdown: {
            get: function () {
                return element(by.css("button[title='Open Files'] i"));
            }
        },
});
module.exports = LeftRailBar;