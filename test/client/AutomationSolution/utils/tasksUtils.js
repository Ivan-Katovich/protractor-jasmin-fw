/**
 * Created by ezhovakr on 2/12/2015.
 */
var dataBaseHelper = require('./dataBaseHelper.js');
var restHelper = require('./RESThelper.js');

function rescheduleTask(taskDeskription, fileName, startTime, dateAvailable) {
    return dataBaseHelper.executeVoidCommand("UPDATE Task SET starttime = " + startTime + ", dateavailable = " + dateAvailable +
                    " WHERE fileid = (select [fileid] from [dbo].[Files] where filename = '" + fileName + "') and description = '" + taskDeskription + "'");
}

function rescheduleTask(file, task, start_datepart, start_number, available_datepart, available_number) {
    return dataBaseHelper.executeVoidCommand("UPDATE Task SET starttime = DATEADD(" + start_datepart + " , " + start_number + " , GETDATE()), dateavailable = DATEADD(" + available_datepart + ", " + available_number + ", GETDATE())" +
               " WHERE fileid = (select [fileid] from [dbo].[Files] where filename = '" + file + "') and description = '" + task + "'");
}

function rescheduleTaskById(taskId, startTime, dateAvailable) {
    return dataBaseHelper.executeVoidCommand("UPDATE Task SET starttime = " + startTime + ", dateavailable = " + dateAvailable +
                    " WHERE taskid = " + taskId);
}

function lockTaskByDescription(taskDeskription, name) {
    return dataBaseHelper.executeVoidCommand("UPDATE Task SET lockby = (select top (1) accountid from SecurityAccount where name='" + name +
        "'), lockexpiration = DATEADD(minute, 605 , GETDATE()) " +
                "WHERE description = '" + taskDeskription + "'");
}

function unlockTaskByDescription(taskDeskription) {
    return dataBaseHelper.executeVoidCommand("UPDATE Task SET lockby = null, lockexpiration = null WHERE description = '" + taskDeskription + "'");
}

function routeTaskToStep(taskDeskription, stepid) {
    return dataBaseHelper.executeVoidCommand("update task set stepid = " + stepid + " where description = '" + taskDeskription + "'");
}

function routeTask(task, flow, step) {
    return dataBaseHelper.executeVoidCommand("update task set stepid = (select steprootid from StepRootDef where flowid = " +
                                    "(select flowid from FlowDef where flowname = '" + flow + "') and stepname = '" + step + "') " +
                                    "where description = '" + task + "'");
}

function reassignTask(taskDeskription, name) {
    return dataBaseHelper.executeVoidCommand("update task set assignedto = (select top (1) accountid from SecurityAccount where name='" + name +
        "') where description = '" + taskDeskription + "'");
}

function unassignTask(taskDeskription) {
    return dataBaseHelper.executeVoidCommand("  update task set assignedto = null where description = '" + taskDeskription + "'");
}


function getAssignment(taskDeskription, fn) {
    var assignment;
    return dataBaseHelper.executeStringCommand("select top(1) assignedto from task where description = '" + taskDeskription + "'", function (result) {
        if (result != "" && result != 'null') {
            getUser(result, function (user) {
                assignment = user;
                fn(assignment);
            });
        }
        else {
            assignment = "Unassigned";
            fn(assignment);
        }
    });
}


function getUser(id, fn) {
    var user = "";
    dataBaseHelper.executeStringCommand("select top(1) name from SecurityAccount where accountid = " + id, function (result) {
        if (result != "" && result != null) {
            user = result;
        }
        fn(user);
    });
}


function countAssignedToTasks(assignedTo, fn) {
    var count = 0;
    dataBaseHelper.executeStringCommand("select count(*) from task where assignedto = (select top (1) accountid from SecurityAccount where name='" + assignedTo + "') and stepid <>-2147483628", function (result) {
        count = parseInt(result);
        fn(count);
    });
}
function countUnassignedTasks(fn) {
    var count = 0;
    dataBaseHelper.executeStringCommand("select count(*) from task where assignedto IS NULL and stepid <>-2147483628", function (result) {
        count = parseInt(result);
        fn(count);
    });
}

function changePriority(taskDescription, priority) {
    return dataBaseHelper.executeVoidCommand("update task set priority = " + priority + " where description = '" + taskDescription + "'");
}

function deleteFilerNote(fileName) {
    return dataBaseHelper.executeVoidCommand("update ObjectNotesDetail set hidden = 1 where noteid = (select noteid from ObjectNotes where objectid = " +
        "(select fileid from Files where filename = '" + fileName + "' and isdeleted = 0))");
}

function deleteFolderNote(folderName) {
    dataBaseHelper.executeVoidCommand("update ObjectNotesDetail set hidden = 1 where noteid = (select noteid from ObjectNotes where objectid = " +
        "(select docfolderid from DocFolder where description = '" + folderName + "' and isdeleted = 0))");
}

function deleteAllTaskAttributes(taskName) {
    return dataBaseHelper.executeVoidCommand("delete from TaskAttrBinary where taskid in (select taskid from Task where description = '" + taskName + "')" +
                                             "delete from TaskAttrDate where taskid in (select taskid from Task where description = '" + taskName + "')" +
                                             "delete from TaskAttrChar where taskid in (select taskid from Task where description = '" + taskName + "')" +
                                             "delete from TaskAttrFloat where taskid in (select taskid from Task where description = '" + taskName + "')" +
                                             "delete from TaskAttrInt where taskid in (select taskid from Task where description = '" + taskName + "')");
}

function ifTaskExistInDB(taskDeskription, fn) {
    var exist = true;
    dataBaseHelper.executeStringCommand("select taskid from Task where description = '" + taskDeskription + "'", function (result) {
        if (result == "" || result == null) {
            exist = false;
        }
        fn(exist);
    });
}

function getTaskId(taskDeskription, fn) {
    var id = 0;
    dataBaseHelper.executeStringCommand("select taskid from Task where description = '" + taskDeskription + "'", function (result) {
        if (result != "" && result != null) {
            id = result;
        }
        fn(id);
    });
}

function ifTaskLocked(taskDeskription, fn) {
    var locked = true;
    return dataBaseHelper.executeStringCommand("select lockby from task where description = '" + taskDeskription + "'", function (result) {
        if (result == "null") {
            locked = false;
        }
        return fn(locked);
    });
}

function ifDiaryLocked(diaryDeskription, fn) {
    var locked = true;
    dataBaseHelper.executeStringCommand("select lockby from task where description = '" + diaryDeskription + "' and stepid = -2147483628", function (result) {
        if (result == "null") {
            locked = false;
        }
        fn(locked);
    });
}

function createTask(taskDescription, url, data, fn) {
    restHelper.restPOST(url, data, function (response) {
        if (response != 200) {
            throw new Error("Task was not created!");
        }
        fn();
    });
}

function getFileId(fileName, fn) {
    dataBaseHelper.executeStringCommand("select fileid from Files where filename = '" + fileName + "'", function (result) {
        fn(result);
    });
}

function getStepId(flowName, stepName, fn) {
    dataBaseHelper.executeStringCommand("(select steprootid from StepRootDef where flowid = (select flowid from FlowDef where flowname = '" + flowName + "') and stepname = '" + stepName + "')", function (stepId) {
        if (stepId == "" || stepId == null) {
            throw new Error("The step data were not obtained");
        } else {
            fn(stepId);
        }
    });
}

function getTaskData(taskDescription, fileName, flow, step, date, priority, fn) {
    var taskData;
    var objectId;
    getFileId(fileName, function (objectId) {
        getStepId(flow, step, function (stepId) {
            taskData = {
                "ObjectId": objectId,
                "StepId": stepId,
                "Priority": priority,
                "Description": taskDescription,
                "AvailableDate": date
            };
            fn(taskData);
        });
    });
}

function getDiaryData(diaryDescription, fileName, date, priority, fn) {
    var taskData;
    var objectId;
    getFileId(fileName, function (objectId) {
        taskData = {
            "ObjectId": objectId,
            "StepId": -2147483628,
            "Priority": priority,
            "Description": diaryDescription,
            "AvailableDate": date
        };
        fn(taskData);
    });
}

function createTaskOrDiaryRequest(data) {
    restHelper.restPOST("api/tasks", data, function (response) {
        if (response != 200) {
            console.error("Task or diary was not created!");
        }
    });
}

function createTaskOnFile(taskDescription, fileName, flow, step, date, priority) {
    ifTaskExistInDB(taskDescription, function (exist) {
        if (!exist) {
            getTaskData(taskDescription, fileName, flow, step, date, priority, function (taskData) {
                flow = protractor.promise.controlFlow();
                flow.await(createTaskOrDiaryRequest(taskData)).then(function (result) {
                    console.log(result);
                });
            });
        }
    });
}

function createDiaryOnFile(diaryDescription, fileName, date, priority) {
    ifTaskExistInDB(diaryDescription, function (exist) {
        if (!exist) {
            getDiaryData(diaryDescription, fileName, date, priority, function (diaryData) {
                flow = protractor.promise.controlFlow();
                flow.await(createTaskOrDiaryRequest(diaryData)).then(function (result) {
                    console.log(result);
                });
            });
        }
    });
}

function getTaskCountOnStep(flowName, stepName, fn) {
    dataBaseHelper.executeStringCommand("select count(*) from task where stepid = (select steprootid from StepRootDef where flowid = " +
        "(select flowid from FlowDef where flowname = '" + flowName + "') and stepname = '" + stepName + "') and stepid <>-2147483628", function (result) {
            if (result == "" || result == null) {
                throw new Error("Count of tasks was not get!");
            } else {
                fn(result);
            }
        });
}

function getAvailableDate(task, fn) {
    dataBaseHelper.executeStringCommand("select dateavailable from Task where description = '" + task + "'", function (availableDate) {
        if (availableDate == "" || availableDate == null) {
            console.error("Available date was not retrieved!");
            fn(false);
        } else {
            var date = new Date(availableDate);
            fn(date);
        }
    });
}

function unlockTasks(fileName) {
    return dataBaseHelper.executeVoidCommand("UPDATE Task SET lockby = NULL, lockexpiration = NULL WHERE fileid = " +
        "(select fileid from Files where filename = '" + fileName + "') and stepid != -2147483628");
}

function unlockDiaries(fileName) {
    return dataBaseHelper.executeVoidCommand("UPDATE Task SET lockby = NULL, lockexpiration = NULL WHERE fileid = " +
        "(select fileid from Files where filename = '" + fileName + "') and stepid = -2147483628");
}

function deleteTaskByDescription(taskDescription) {
    return dataBaseHelper.executeVoidCommand("delete from TaskAttrBinary where taskid in (select taskid from Task where description = '" + taskDescription + "')" +
                                             "delete from TaskAttrDate where taskid in (select taskid from Task where description = '" + taskDescription + "')" +
                                             "delete from TaskAttrChar where taskid in (select taskid from Task where description = '" + taskDescription + "')" +
                                             "delete from TaskAttrFloat where taskid in (select taskid from Task where description = '" + taskDescription + "')" +
                                             "delete from TaskAttrInt where taskid in (select taskid from Task where description = '" + taskDescription + "')" +
                                             "delete from Task where description = '" + taskDescription + "'");
}

function deleteDiaryByDescription(diaryDescription) {
    return dataBaseHelper.executeVoidCommand("delete from Task where description = '" + diaryDescription + "' and stepid = -2147483628");
}

function changeTaskDescription(initialDescription, finalDescription) {
    return dataBaseHelper.executeVoidCommand("update task set description = '" + finalDescription + "' where description = '" + initialDescription + "'");
}

function changeDiaryDescription(initialDescription, finalDescription) {
    return dataBaseHelper.executeVoidCommand("update task set description = '" + finalDescription + "' where description = '" + initialDescription + "' and stepid = -2147483628");
}


exports.rescheduleTask = rescheduleTask;
exports.rescheduleTaskById = rescheduleTaskById;
exports.lockTaskByDescription = lockTaskByDescription;
exports.unlockTaskByDescription = unlockTaskByDescription;
exports.routeTaskToStep = routeTaskToStep;
exports.reassignTask = reassignTask;
exports.unassignTask = unassignTask;
exports.deleteFilerNote = deleteFilerNote;
exports.deleteFolderNote = deleteFolderNote;
exports.deleteAllTaskAttributes = deleteAllTaskAttributes;
exports.routeTask = routeTask;
exports.countAssignedToTasks = countAssignedToTasks;
exports.countUnassignedTasks = countUnassignedTasks;
exports.ifTaskExistInDB = ifTaskExistInDB;
exports.ifTaskLocked = ifTaskLocked;
exports.ifDiaryLocked = ifDiaryLocked;
exports.createTask = createTask;
exports.createTaskOnFile = createTaskOnFile;
exports.createDiaryOnFile = createDiaryOnFile;
exports.getFileId = getFileId;
exports.getStepId = getStepId;
exports.getTaskId = getTaskId;
exports.getTaskCountOnStep = getTaskCountOnStep;
exports.changePriority = changePriority;
exports.getAssignment = getAssignment;
exports.getAvailableDate = getAvailableDate;
exports.unlockTasks = unlockTasks;
exports.unlockDiaries = unlockDiaries;
exports.deleteTaskByDescription = deleteTaskByDescription;
exports.deleteDiaryByDescription = deleteDiaryByDescription;
exports.changeTaskDescription = changeTaskDescription;
exports.changeDiaryDescription = changeDiaryDescription;

