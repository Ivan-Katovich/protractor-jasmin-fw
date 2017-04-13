/*
    DB commands for Process Dashboard: clean, adjust flows/steps/users, tasks/diaries; 
    Created: 11/18/2016, navasaal
*/

var dbHelper = require('./dataBaseHelper.js');

var dashboardHelper = {

    cleanSystemConfig: function() {
        return dbHelper.executeVoidCommand("delete from SystemConfig where parentid not in(select parentid from SystemConfig where keyname='LICENSE')");
    },

    cleanDashboardSettings: function() {
        return dbHelper.executeVoidCommand("delete from FilterAccount " +
                                           "delete from FilterLocation " +
                                           "delete from FilterObjectType " +
                                           "delete from FilterFlow " +
                                           "delete from FilterStep " +
                                           "delete from AgeBucket " +
                                           "delete from DashboardViewServiceLevel " +
                                           "delete from DashboardView " +
                                           "delete from ServiceLevel");
    },


    /* 
        status values: 
        0: Active
        1: Disabled
        2: Deactivated
    */
    setFlowStatus: function (flowName, status) {
        return dbHelper.executeVoidCommand("update FlowDef set status='" + status + "' where flowname='" + flowName + "'");
    },

    /* 
        status values: 
        0: normal
        1: to be deleted
        2: deleted
        3: stopped
    */
    setStepStatus: function (flow, step, status) {
        return dbHelper.executeVoidCommand("update StepRootDef set status='" + status + "' from StepRootDef " +
                                           "where flowid=(select flowid from FlowDef where flowname='" + flow + "') and stepname='" + step + "'");
    },

    /* 
        status values:
        0 Ready
        1 Hold
        2 Locked
        3 Uncommitted or Waiting
        4 Completed
        5 Error
        6 Un-doable
        7 One Step
    */
    setDiaryStatus: function (description, status) {
        return dbHelper.executeVoidCommand("update Task set status='" + status + "' where description='" + description + "' and stepid='-2147483628'");
    },

    /* 
        status values:
        0 Ready
        1 Hold
        2 Locked
        3 Uncommitted or Waiting
        4 Completed
        5 Error
        6 Un-doable
        7 One Step
    */
    setTaskStatus: function (description, status) {
        return dbHelper.executeVoidCommand("update Task set status='" + status + "' where description='" + description + "' and stepid<>'-2147483628'");
    }
};

module.exports = dashboardHelper;