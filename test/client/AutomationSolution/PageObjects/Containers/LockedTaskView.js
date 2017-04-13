var LockedTaskView = function () { };

LockedTaskView.prototype = Object.create({}, {
    
    container: { value: ".task-focus-box " },
    
    taskViewBox: {
        get: function () {
                return element(by.css(".viewbox-bottom"));
        }
    },

    taskDetailsExpander: {
        get: function () {
            return element(by.css(".task-toggle-button i"));
        }
    },

    taskDescriptionLabel: {
        get: function () {
            return element.all(by.css(".task-toggle-button span")).get(1);
        }
    },

    taskDescription: {
        get: function () {
            return element(by.css(".active .task-description-expanded"));
        }
    },
    
    activeTaskDescription: {
        get: function () {
            return $('.vf-tab-pane.active .task-description-expanded');
        }
    },

    getTaskDetails: {
        value: function (value) {
            var elems = element.all(by.css('.active .task-focus-box .todo-detail-row div'));
            switch (value) {
                case "Flow":
                    return elems.get(0);
                case "Step":
                    return elems.get(1);
                case "Assigned to":
                    return elems.get(2);
                case "Status":
                    return elems.get(3);
                case "Sent by":
                    return elems.get(4);
                case "Sent on":
                    return elems.get(5);
                case "Available":
                    return elems.get(6);
                default:
                    return null;
            }
        }
    },

    taskActionsIcon: {
        get: function () {
            return element.all(by.css('.task-focus-box .task-focus-actions i')).get(0);
        }
    }
});

module.exports = LockedTaskView;