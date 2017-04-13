
var Cog = function(rootObj){
    var config = {
        button: by.tagName('button'),
        actionList: {
            root: by.tagName('ul')
        }
    };

    var menu = require('./menu')(rootObj);

    return Object.assign(menu,{
        get button(){
            return rootObj.all(config.button).filter(function(elem,index){
                return elem.isDisplayed();
            }).first();
        },

        expand: function(){
            var self = this;
            return self.button.click()
                .then(function () {
                    return rootObj.element(config.actionList.root).waitToBeCompletelyVisibleAndStable();
                });
        }
    });
};

module.exports = Cog;