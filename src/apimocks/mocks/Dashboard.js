/* 
    name: Dashboard.js
    descr: custom backend mocks dashboard testing. provides responces on api/taskcount calls;
    created: 6/2/2016;
    by: navasaal;
*/

exports.getTaskCount = function (req, res) {

    var responce = null,
        groupBy = req.body['GroupBy'],
        assignedTo = req.body['TaskFilter']['assignedTo'];

    if (groupBy.indexOf('Group') > -1) {
        responce = {
            "items":
                [{ "id": 25, "ageModel": { "id": 2, "from": 43200, "to": 86400}, "ageCalculationAlgorithm": 0, "count": 4, "name": "G1" },
                    { "id": 25, "ageModel": { "id": 1, "from": 2880, "to": 43200}, "ageCalculationAlgorithm": 0, "count": 5, "name": "G1" },
                    { "id": 25, "ageModel": { "id": 0, "from": null, "to": 2880}, "ageCalculationAlgorithm": 0, "count": 3, "name": "G1" },
                    { "id": 25, "ageModel": { "id": 3, "from": 86400, "to": null}, "ageCalculationAlgorithm": 0, "count": 6, "name": "G1" },
                    { "id": 110, "ageModel": { "id": 2, "from": 43200, "to": 86400}, "ageCalculationAlgorithm": 0, "count": 6, "name": "G2" },
                    { "id": 110, "ageModel": { "id": 0, "from": null, "to": 2880}, "ageCalculationAlgorithm": 0, "count": 3, "name": "G2" },
                    { "id": 111, "ageModel": { "id": 1, "from": 2880, "to": 43200}, "ageCalculationAlgorithm": 0, "count": 7, "name": "G3" },
                    { "id": 112, "ageModel": { "id": 0, "from": null, "to": 2880}, "ageCalculationAlgorithm": 0, "count": 4, "name": "G4" },
                    { "id": 112, "ageModel": { "id": 1, "from": 2880, "to": 43200}, "ageCalculationAlgorithm": 0, "count": 9, "name": "G4" },
                    { "id": 112, "ageModel": { "id": 3, "from": 86400, "to": null}, "ageCalculationAlgorithm": 0, "count": 1, "name": "G4" }],
            "nextPageLink": null, "count": 10
        };
    }
    else if (groupBy.indexOf('None') > -1) {
        responce = {
            "items":
                [{ "id": null, "ageModel": { "id": 0, "from": null, "to": 2880}, "ageCalculationAlgorithm": 0, "count": 10, "name": null },
                    { "id": null, "ageModel": { "id": 1, "from": 2880, "to": 43200}, "ageCalculationAlgorithm": 0, "count": 25, "name": null },
                    { "id": null, "ageModel": { "id": 2, "from": 43200, "to": 86400}, "ageCalculationAlgorithm": 0, "count": 14, "name": null },
                    { "id": null, "ageModel": { "id": 3, "from": 86400, "to": null}, "ageCalculationAlgorithm": 0, "count": 7, "name": null }],
            "nextPageLink": null, "count": 4
        };
    }
    else if (groupBy.indexOf('User') > -1 && assignedTo.length === 0) {
        responce = {
            "items":
                [{ "id": null, "ageModel": { "id": 1, "from": 2880, "to": 43200}, "ageCalculationAlgorithm": 0, "count": 2, "name": null }],
            "nextPageLink": null, "count": 1
        };
    }
    else if (groupBy.indexOf('User') > -1 && assignedTo.length != null) {
        responce = {
            "items":
                [{ "id": 4, "ageModel": { "id": 2, "from": 43200, "to": 86400}, "ageCalculationAlgorithm": 0, "count": 4, "name": "kennedar" },
                    { "id": 393, "ageModel": { "id": 0, "from": null, "to": 2880}, "ageCalculationAlgorithm": 0, "count": 2, "name": "agresspe" },
                    { "id": 393, "ageModel": { "id": 2, "from": 43200, "to": 86400}, "ageCalculationAlgorithm": 0, "count": 1, "name": "agresspe" },
                    { "id": -2, "ageModel": { "id": 0, "from": null, "to": 2880}, "ageCalculationAlgorithm": 0, "count": 2, "name": "Admin" },
                    { "id": -2, "ageModel": { "id": 1, "from": 2880, "to": 43200}, "ageCalculationAlgorithm": 0, "count": 1, "name": "Admin" },
                    { "id": -2, "ageModel": { "id": 2, "from": 43200, "to": 86400}, "ageCalculationAlgorithm": 0, "count": 1, "name": "Admin" },
                    { "id": -2, "ageModel": { "id": 2, "from": 86400, "to": null}, "ageCalculationAlgorithm": 0, "count": 1, "name": "Admin" },
                    { "id": 25, "ageModel": { "id": 1, "from": 2880, "to": 43200}, "ageCalculationAlgorithm": 0, "count": 1, "name": "G1" },
                    { "id": 25, "ageModel": { "id": 1, "from": 86400, "to": null}, "ageCalculationAlgorithm": 0, "count": 2, "name": "G1" }],
            "nextPageLink": null, "count": 9
        };
    }

    else if (groupBy.indexOf('Flow') > -1) {
        responce = {
            "items":
                [{ "id": -2147483638, "ageModel": { "id": 2, "from": 43200, "to": 86400}, "ageCalculationAlgorithm": 0, "count": 2, "name": "Diary" },
                    { "id": -2147483638, "ageModel": { "id": 3, "from": 86400, "to": null}, "ageCalculationAlgorithm": 0, "count": 3, "name": "Diary" },
                    { "id": -2147483638, "ageModel": { "id": 1, "from": 2880, "to": 43200}, "ageCalculationAlgorithm": 0, "count": 1, "name": "Diary" },
                    { "id": -2147483638, "ageModel": { "id": 0, "from": null, "to": 2880}, "ageCalculationAlgorithm": 0, "count": 4, "name": "Diary" },
                    { "id": 0, "ageModel": { "id": 1, "from": 2880, "to": 43200}, "ageCalculationAlgorithm": 0, "count": 2, "name": "wf1" },
                    { "id": 0, "ageModel": { "id": 0, "from": null, "to": 2880}, "ageCalculationAlgorithm": 0, "count": 1, "name": "wf1" }],
            "nextPageLink": null, "count": 6
        };
    }

    else if (groupBy.indexOf('Step') > -1) {
        responce = {
            "items":
                [{ "id": 1, "ageModel": { "id": 0, "from": null, "to": 2880}, "ageCalculationAlgorithm": 0, "count": 1, "name": "Manual 1" },
                    { "id": 1, "ageModel": { "id": 1, "from": 2880, "to": 43200}, "ageCalculationAlgorithm": 0, "count": 3, "name": "Manual 1" },
                    { "id": 1, "ageModel": { "id": 2, "from": 43200, "to": 86400}, "ageCalculationAlgorithm": 0, "count": 1, "name": "Manual 1" },
                    { "id": 1, "ageModel": { "id": 3, "from": 86400, "to": null}, "ageCalculationAlgorithm": 0, "count": 2, "name": "Manual 1" },
                    { "id": 2, "ageModel": { "id": 0, "from": null, "to": 2880}, "ageCalculationAlgorithm": 0, "count": 3, "name": "N-Manual" },
                    { "id": 3, "ageModel": { "id": 0, "from": null, "to": 2880}, "ageCalculationAlgorithm": 0, "count": 1, "name": "O-Manual" },
                    { "id": 4, "ageModel": { "id": 0, "from": null, "to": 2880}, "ageCalculationAlgorithm": 0, "count": 2, "name": "P-Manual" }],
            "nextPageLink": null, "count": 7
        };
    }
    
    var result = JSON.stringify(responce);
    res.send(result);
    res.end();
};