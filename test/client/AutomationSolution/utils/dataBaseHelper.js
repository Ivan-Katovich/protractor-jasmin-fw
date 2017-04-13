
// var sql = require('mssql');
//
// var config = {
//     user: browser.params.defaultDBUser,
//     password: browser.params.defaultDBPassword,
//     server: browser.params.defaultDBServer,
//     database: browser.params.defaultDatabase
// };
//
// var connection = new sql.Connection(config, function (err) {
//     if (err !== null)
//         throw new Error('Connection error: ' + err);
// });
//
//
// function executeVoidCommand(commandText) {
//     var request = new sql.Request(connection);
//     request.query(commandText, function (err) {
//         if (typeof err !== 'undefined')
//             console.log('SQL request error: ' + err);
//     });
// }
//
//
// // This Function returns string value of one column
// // and can be called like this: executeStringCommand(commandText, function (result) {  ..doSomethingWithResult(result)});
//
// function executeStringCommand(commandText, fn) {
//     var request = new sql.Request(connection);
//     return request.query(commandText, function (err, recordset) {
//         if (typeof err !== 'undefined')
//             throw new Error('SQL request error: ' + err);
//
//         var result;
//         JSON.stringify(recordset, replacer);
//         function replacer(key, value) {
//             result = String(value);
//             return value;
//         }
//         fn(result);
//     });
// }
// exports.executeVoidCommand = executeVoidCommand;
// exports.executeStringCommand = executeStringCommand;


var sql = require('mssql');
var config = {
        user: browser.params.defaultDBUser,
        password: browser.params.defaultDBPassword,
        server: browser.params.defaultDBServer,
        database: browser.params.defaultDatabase
    };

sql.connect(config);

var dbHelper = {
    executeVoidCommand: function(commandText) {
        return new sql.Request().query(commandText)
            .catch(function (err) {
                console.log('SQL request error: '+err);
            });
    },
    executeStringCommand: function(commandText){
        return new sql.Request().query(commandText)
            .then(function (recordset) {
                var result;
                JSON.stringify(recordset, replacer);
                function replacer(key, value) {
                    result = String(value);
                    return value;
                }
                return result;
            })
            .catch(function(err){
                console.log('SQL request error: '+err);
            });
    },
    executeJsonCommand: function(commandText){
        return new sql.Request().query(commandText)
            .catch(function(err){
                console.log('SQL request error: '+err);
            });
    }
};

module.exports = dbHelper;