var LvlSlider = function (rootObj) {

    var config = {
        pointer: by.css('.rz-pointer-min'),
        pointerText: by.css('[class="rz-bubble"][style*="opacity: 1"]'),
        floor: by.css('.rz-floor'),
        ceil: by.css('.rz-ceil')
    };

    return {

        get container() {
            return rootObj;
        },

        isVisible: function(){
            return rootObj.isDisplayed();
        },
        isActive: function(){
            return rootObj.element(by.tagName('div')).getAttribute('class')
                .then(function (text) {
                    return !text.includes('item-disabled');
                });
        },
        isHighlighted: function(){
            return rootObj.element(by.tagName('div')).getAttribute('disabled')
                .then(function (t) {
                    return !(t === 'true');
                });
        },
        get pointer(){
            return rootObj.element(config.pointer);
        },
        getPointerText: function(){
            return rootObj.element(config.pointerText).getText();
        },
        getMaxAmount: function(){
            return rootObj.element(config.ceil).getText();
        },
        getMinAmount: function(){
            return rootObj.element(config.floor).getText();
        },
        movePointer: function(px){
            return browser.actions().dragAndDrop(this.pointer,{x:px, y:0}).perform();
        }

    };
};

exports.LvlSlider = LvlSlider;