/**
 * Created by bkandiah on 9/19/2014.
 */


ConversionUtil = function(){

    //Convert rbg color to Hexadecimal
    this.colorToHex = function (rgb){
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    };

    this.isArraySortedAscending = function (array) {
        var isSorted = true;
        for (var i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                isSorted = false;
                break;
            }
        }
        return isSorted;
    }

    this.isArraySortedDescending = function (array) {
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
    this.getDate = function (date) {
        var d = date.getDate();
        var dd = (d < 10) ? '0' + d : d;
        var m = date.getMonth() + 1;
        var mm = (m < 10) ? '0' + m : m;
        var yyyy = date.getYear() + 1900 + "";
        return mm + "/" + dd + "/" + yyyy;
    }

    //Returns date in 'Tue Apr 07 2015' format
    this.getFullDate = function (dateObj) {     //toDateString()
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var dayOfWeek = days[dateObj.getDay()];
        var curMonth = months[dateObj.getMonth()];
        var curDate = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();
        var curYear = dateObj.getFullYear();
        return dayOfWeek + " " + curMonth + " " + curDate + " " + curYear;
    };

    this.isInteger = function (x) {
        return (typeof Number(x) === 'number') && (Number(x) % 1 === 0);
    };

    this.isFloat - function (x) {
        var flag = false;
        if (!isNaN(x) && x.toString().indexOf('.') !== -1) {
            flag = true;
        }
        return flag;
    };

    this.isArraysIdentical = function (array1, array2) {
        var i = array1.length;
        if (i != array2.length) return false;
        while (i--) {
            if (array1[i] !== array2[i]) return false;
        }
        return true;
    };

    this.isArraysEquivalent = function (arr1, arr2) {
        var isEquivalent = false;
        if ((arr2.every(function (val) { return arr1.indexOf(val) >= 0; }) &&
            arr1.every(function (val) { return arr2.indexOf(val) >= 0; })) === true)
            isEquivalent = true;
        return isEquivalent;
    }

};

module.exports = ConversionUtil;