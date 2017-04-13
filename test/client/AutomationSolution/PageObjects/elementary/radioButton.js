var q = require('q');
var Single = function (rootObj) {

    var config = {
        label: by.tagName('label'),
        input: by.tagName('input')
    };

    return {

        get container() {
            return rootObj;
        },

        getLabel: function(){
            return rootObj.element(config.label).getText()
                .then(function (text) {
                    if(!text || text === ' '){
                        return rootObj.element(by.xpath('.//../div/span')).getText();
                    }else{
                        return text;
                    }
                });
        },

        isRSelected: function(){
            return rootObj.element(config.input).isSelected();
        },

        select: function() {
            return rootObj.element(config.label).click();
        }
    };
};

var Set = function (rootObjList) {

    return {

        count: function(){
            return rootObjList.count();
        },

        getLabels: function(){
            var deferred = q.defer();
            var arr = [];
            rootObjList.each(function(elem){
                Single(elem).getLabel()
                    .then(function (label) {
                        return arr.push(label);
                    })
            });
            deferred.resolve(arr);
            return deferred.promise;
        },

        selectByNumber: function(n){
            return Single(rootObjList.get(n)).select();
        },

        getLabelByNumber: function(n){
            return Single(rootObjList.get(n)).getLabel();
        },

        isRSelectedByNumber: function(n){
            return Single(rootObjList.get(n)).isRSelected();
        },

        selectByLabel: function(label){
            return Single(rootObjList.filter(function (elem,index) {
                return elem.getText()
                    .then(function (text) {
                        if(!text || text === ' '){
                            return elem.element(by.xpath('.//../div/span')).getText()
                                .then(function (altText) {
                                    return altText === label;
                                });
                        }else{
                            return text === label;
                        }
                    });
            }).first()).select();
        },

        isRSelectedByLabel: function(label){
            return Single(rootObjList.filter(function (elem,index) {
                return elem.getText()
                    .then(function (text) {
                        if(!text || text === ' '){
                            return elem.element(by.xpath('.//../div/span')).getText()
                                .then(function (altText) {
                                    return altText === label;
                                });
                        }else{
                            return text === label;
                        }
                    });
            }).first()).isRSelected();
        }
    }
};



exports.Single = Single;
exports.Set = Set;