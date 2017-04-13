/*
    ir_structure.js

    the list of existing groups, flows, steps, any other string values;
    could be used in tests instead of hardcoded strings;
    
    example: 
    var data = require('./ir_structure.js');
    expect(data.groups.unassigned).to....;
    
    Created: 10/28/2016, navasaal
*/

var metadata = {

    groups: {
        administrators: 'Administrators groups',
        xp1_test: 'xp1_test',
        unassigned: 'Unassigned'
    },
    users: {
        xp1: 'xp1',
        ezhovakr: 'ezhovakr',
        khvashma: 'khvashma',
        xp1_test: 'xp1_test'
    },

    flows: {
        diary: 'Diary',
        jamieWf: 'Jamies Workflow Test',
        wf: 'WF',
        wf1: 'wf1',
        wfRelease: 'WFRelease'
    }
}