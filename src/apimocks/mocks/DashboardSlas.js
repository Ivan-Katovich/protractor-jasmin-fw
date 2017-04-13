/**
 * Created by Ivan_Katovich on 3/3/2017.
 */

var slasForDashboard = function(req, res){
    var response = null;

    if(req.method === 'GET'){
        response =[
            {
                "id":377,
                "name":"New Service Level 1",
                "algorithm":0,
                "timeUnit":0,
                "ageModelSets":[
                    {
                        "from":null,
                        "to":2880,
                        "level":0
                    },
                    {
                        "from":2880,
                        "to":43200,
                        "level":1
                    },
                    {
                        "from":43200,
                        "to":86400,
                        "level":2
                    },
                    {
                        "from":86400,
                        "to":null,
                        "level":3
                    }
                ],
                "filter":{
                    "assignedTo":[
                        -3,
                        -2,
                        -1,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        13,
                        17,
                        18,
                        19,
                        393,
                        394,
                        2729177,
                        null
                    ],
                    "drawersAndFileTypes":{
                        "1":[
                            5,
                            5,
                            0
                        ],
                        "2":[
                            0,
                            4,
                            2,
                            0,
                            4
                        ],
                        "3":[
                            4,
                            2,
                            5,
                            2,
                            3
                        ]
                    },
                    "workflowsAndSteps":{
                        "8179":[
                            7192,
                            7942,
                            7953,
                            8102
                        ]
                    }
                }
            }
        ];
    }else{
        response = 340;
    }

    var result = JSON.stringify(response);
    res.send(result);
    res.end();
};

exports.slasForDashboard = slasForDashboard;