var q = require('q');
var Single = function (rootObj) {

    var config = {
            label: by.css('label:not(.fa)'),
            box: by.css('label.fa'),
            input: by.tagName('input')
        };

    return {

        get container() {
            return rootObj;
        },

        get input(){
            return rootObj.element(config.input);
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

        isChecked: function(){
            return rootObj.element(config.input).isSelected();
        },

        isPartChecked: function(){
            return rootObj.getAttribute('class')
                .then(function (text) {
                    return text.includes('part-checked');
                })
        },

        check: function() {
            var self = this;
            return self.isChecked()
                .then(function (isC) {
                    if(!isC) {
                        return rootObj.element(config.label).click()
                            .then(function(){return null;},function(){
                                return rootObj.click();
                            });
                    }else{
                        return self.isPartChecked()
                            .then(function (isPC) {
                                if(isPC) {
                                    return rootObj.element(config.label).click()
                                        .then(function(){return null;},function(){
                                            return rootObj.click();
                                        });
                                }
                            })
                    }


                });
        },

        uncheck: function() {
            var self = this;
            return this.isChecked()
                .then(function (isC) {
                    if(isC) {
                        return self.isPartChecked()
                            .then(function (isPC) {
                                if(!isPC){
                                    return rootObj.element(config.label).click()
                                        .then(function(){return null;},function(){
                                            return rootObj.click();
                                        });
                                } else {
                                    return rootObj.element(config.label).click()
                                        .then(function () {
                                            return browser.sleep(100);
                                        })
                                        .then(rootObj.element(config.label).click,function() {
                                            return rootObj.click()
                                                .then(function () {
                                                    return browser.sleep(100);
                                                })
                                                .then(function () {
                                                    return rootObj.click();
                                                });
                                        });
                                }
                            })
                    }
                });
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
                    });
            });
            deferred.resolve(arr);
            return deferred.promise;
        },

        checkAll: function(){
            return rootObjList.each(function(elem){
                Single(elem).check();
            });
        },

        uncheckAll: function(){
            return rootObjList.each(function(elem){
                Single(elem).uncheck();
            });
        },

        isAllChecked: function(){
            var deferred = q.defer();
            var isAll = true;
            rootObjList.each(function(elem){
                Single(elem).isChecked()
                    .then(function (is) {
                        return isAll = is;
                    });
            });
            deferred.resolve(isAll);
            return deferred.promise;
        },

        isAllUnchecked: function(){
            var deferred = q.defer();
            var isAll = true;
            rootObjList.each(function(elem){
                Single(elem).isChecked()
                    .then(function (is) {
                        return isAll = !is;
                    });
            });
            deferred.resolve(isAll);
            return deferred.promise;
        },

        checkByNumber: function(n){
            return Single(rootObjList.get(n)).check();
        },

        uncheckByNumber: function(n){
            return Single(rootObjList.get(n)).uncheck();
        },

        getLabelByNumber: function(n){
            return Single(rootObjList.get(n)).getLabel();
        },

        isCheckedByNumber: function(n){
            return Single(rootObjList.get(n)).isChecked();
        },

        isPartCheckedByNumber: function(n){
            return Single(rootObjList.get(n)).isPartChecked();
        },
        
        checkByLabel: function(label){
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
            }).first()).check();
        },

        uncheckByLabel: function(label){
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
            }).first()).uncheck();
        },

        isCheckedByLabel: function(label){
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
            }).first()).isChecked();
        },

        isPartCheckedByLabel: function(label){
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
            }).first()).isPartChecked();
        }
    }
};



exports.Single = Single;
exports.Set = Set;