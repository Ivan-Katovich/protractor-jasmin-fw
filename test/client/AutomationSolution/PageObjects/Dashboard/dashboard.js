/* 
    name: dashboard.js
    descr: extension for dashboard base class;
    created: 6/2/2016;
    by: navasaal, katovii;
    comments:  
        - all locators are put into config. values: id, css, null; 
        - sla chart is not implemented -> null;
*/

/* reqs; */
var Header = require('./header.js'),
    Chart = require('./chart.js'),
    Sla = require('./sla.js'),
    AddSlaModal = require('./../ModalDialogs/addSlaModal'),
    TaskList = require('./tasklist.js'),
    Filters = require('./filters.js');

var Dashboard = function(){

    var container = element(by.id('db-main-chart')),
        config = {
            header: by.id('dashboard-header'),
            chart: {
                groups: by.id('db-main-chart'),
                subgroups: by.id('db-chart-subgroup'),
                users: by.id('db-chart-users'),
                flows: by.css('.db-chart-panel'),
                steps: by.css('.db-chart-panel')
            },
            sla: by.id('db-main-view-sla'),
            tasklist: by.id('tasks-chart')
        };

    return {

        get container() {
            return container;
        },

        get filters() {
            return Filters();
        },

        get header() {
            return Header(config.header);
        },

        get groups() {
            return Chart(config.chart.groups, true);
        },

        get subgroups() {
            return Chart(config.chart.subgroups);
        },

        get users() {
            return Chart(config.chart.users);
        },

        get flows() {
            return Chart(config.chart.flows);
        },

        get steps() {
            return Chart(config.chart.steps);
        },

        get sla() {
            return Sla(config.sla);
        },

        get addSlaModal() {
            return AddSlaModal();
        },

        get taskList() {
            return TaskList(config.tasklist);
        }
    };
};

module.exports = Dashboard;