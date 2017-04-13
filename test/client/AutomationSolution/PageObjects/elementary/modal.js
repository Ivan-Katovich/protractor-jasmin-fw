var Modal = function (n) {

    var container = element.all(by.css('.modal-content')).get(n),
        config = {
            header: {
                root: by.css('.vf-modal-header'),
                name: by.id('modal-title'),
                xBtn: by.id('btnClose')
            },
            body: by.css('.modal-body'),
            footer: {
                root: by.css('.vf-modal-footer'),
                okBtn: by.id('btnOk'),
                cancelBtn: by.id('btnCancel'),
                resetBtn: by.id('btnReset')
            }
        };

    return {

        get container() {
            return container;
        },

        get header() {
            var root = container.element(config.header.root);
            return {
                get itself(){
                    return root.click();
                },
                getName: function() {
                    return root.element(config.header.name).getText();
                },
                close: function(){
                    return root.element(config.header.xBtn).click()
                    .then(function () {
                        return browser.waitForAngular();
                    });
                }
            }
        },

        getBodyText: function(){
            return container.element(config.body).getText();
        },

        get footer() {
            var root = container.element(config.footer.root);
            return {
                get okBtn(){
                    return root.element(config.footer.okBtn);
                },
                get cancelBtn(){
                    return root.element(config.footer.cancelBtn);
                },
                get resetBtn(){
                    return root.element(config.footer.resetBtn);
                },
                accept: function(){
                    return root.element(config.footer.okBtn).click();
                },
                cancel: function(){
                    return root.element(config.footer.cancelBtn).click();
                },
                reset: function(){
                    return root.element(config.footer.resetBtn).click();
                },
                isBtnPresent: function(btn) {
                    return root.element(config.footer[btn]).isPresent();
                }
            }
        },

        save: function (name) {
            return browser.pixDiff.saveRegion(container, name);
        },

        compare: function (image) {
            return browser.pixDiff.checkRegion(container, image);
        },

        isVisible: function(){
            return container.isDisplayed()
                .then(function (is) {
                    return is
                },function(e){
                    return false;
                });
        },

        isPresentOnPage: function(){
            return element.all(by.css('.modal-content')).count()
                .then(function (count) {
                    return count > n;
                });
        }

    };
};

module.exports = Modal;