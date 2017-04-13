/**
 * Created by bkandiah on 9/19/2014.
 */

//Convert rbg color to Hexadecimal
var q = require('q');

function colorToHex(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function isArraySortedAscending(array) {
    var isSorted = true;
    for (var i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {  
            isSorted = false;
            break;
        }
    }
    return isSorted;
}

function isArraySortedDescending(array) {
    var isSorted = true;
    for (var i = 0; i < array.length - 1; i++) {
        if (array[i] < array[i + 1]) {  
            isSorted = false;
            break;
        }
    }
    return isSorted;
}

//Returns date in mm-dd-yyyy format
function getDate(date) {
    var d = date.getDate();
    var dd = (d < 10) ? '0' + d : d;
    var m = date.getMonth() + 1;
    var mm = (m < 10) ? '0' + m : m;
    var yyyy = date.getFullYear();
    return mm + "/" + dd + "/" + yyyy;
}

//Returns date in 'Tue Apr 07 2015' format
function getFullDate(dateObj) {     //toDateString()
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var dayOfWeek = days[dateObj.getDay()];
    var curMonth = months[dateObj.getMonth()];
    var curDate = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate(); 
    var curYear = dateObj.getFullYear();
    return dayOfWeek + " " + curMonth + " " + curDate + " " + curYear;
}

function isInteger(x) {    
    return (typeof Number(x) === 'number') && (Number(x) % 1 === 0);
}

function isFloat(x) {
    var flag = false;
    if (!isNaN(x) && x.toString().indexOf('.') !== -1) {
        flag = true;
    }
    return flag;
}

function isArraysIdentical(array1, array2) {
    var i = array1.length;
    if (i != array2.length) return false;
    while (i--) {
        if (array1[i] !== array2[i]) return false;
    }
    return true;
}

function isArraysEquivalent(arr1, arr2) {
    var isEquivalent = false;
    if ((arr2.every(function (val) { return arr1.indexOf(val) >= 0; }) &&
        arr1.every(function (val) { return arr2.indexOf(val) >= 0; })) === true)
        isEquivalent = true;
    return isEquivalent;
}

function asyncLoop(length, func) {
    var deferred = q.defer();
    var i = 0,
        loop = function () {
            if (i++ === length) {
                deferred.resolve();
                return deferred.promise;
            }
            return func(loop, i);
        };
    return loop();
}

exports.colorToHex = colorToHex;
exports.isArraySortedAscending = isArraySortedAscending;
exports.isArraySortedDescending = isArraySortedDescending;
exports.getDate = getDate;
exports.getFullDate = getFullDate;
exports.isInteger = isInteger;
exports.isFloat = isFloat;
exports.isArraysIdentical = isArraysIdentical;
exports.isArraysEquivalent = isArraysEquivalent;
exports.asyncLoop = asyncLoop;