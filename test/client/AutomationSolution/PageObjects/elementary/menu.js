var Menu = function(rootObj){
    var config = {
        actionList: {
            root: by.tagName('ul'),
            items: by.tagName('span')
        }
    };

    return {

        get container(){
            return rootObj;
        },

        get isPresent() {
            return rootObj.isDisplayed();
        },

        get actionList(){
            return rootObj.element(config.actionList.root);
        },
        getItemByPosition: function(n){
            return this.actionList.all(config.actionList.items).get(n);
        },
        getItemByDescription: function(descr){
            return this.actionList.all(config.actionList.items).filter(function(elem,index){
                return elem.getText()
                    .then(function (text) {
                        return text.includes(descr);
                    });
            }).first();
        },
        isEnabledByPosition: function(n){
            return this.getItemByPosition(n).element(by.xpath('./..')).getAttribute('class')
                .then(function (cl) {
                    return !cl.includes('disabled');
                });
        },
        isEnabledByDescription: function(descr){
            return this.getItemByDescription(descr).element(by.xpath('./..')).getAttribute('class')
                .then(function (cl) {
                    return !cl.includes('disabled');
                });
        },
        selectByPosition: function(n){
            return this.getItemByPosition(n).click();
        },
        getItemNameByPosition: function(n){
            return this.getItemByPosition(n).getText();
        },
        selectByDescription: function(descr){
            return this.getItemByDescription(descr).click();
        },
        getAllDescriptions: function(){
            return this.actionList.all(config.actionList.items).getText();
        },
        getItemsCount: function(){
            return this.actionList.all(config.actionList.items).count();
        }
    }
};

module.exports = Menu;
