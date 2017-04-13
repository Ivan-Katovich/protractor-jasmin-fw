var ImageViewer = function () { };

//Overall image viewer
ImageViewer.prototype = Object.create({}, {
    editMode: {
        get: function(){
            return element(by.css('.btn-action.annotate-mode-toggle'));
        }
    }
});
//MSG Viewer
ImageViewer.prototype.msgViewer = {
    fromLabel: function(fileId) {
        return element(by.id('emailFromAddress-' + fileId));
    },
    fromElement: function(fileId) {
        return element(by.id('emailFromAddress-value-' + fileId));
    },
    msgBody: function(fileId){
        return element(by.id('messageBody-' + fileId));
    },
    emailTitle: function(fileId){
        return element(by.id('email-title-' + fileId));
    },
    htmlMsgBody: function(fileId){
        return browser.switchTo().frame(element(by.tagName('iframe')).getWebElement()).then(function(){
            return browser.driver.findElement(protractor.By.css('.WordSection1')).getText().then(
                function(text){
                    return browser.switchTo().defaultContent().then(function(){
                        return text.trim();
                    });

                }
            );
        });
    },
    htmlMsgBodyElement: function(fileId) {
        return element(by.id("msg-frame-" + fileId + "-preview"));
    },
    inlineImageIsDisplayed: function(fileId){
        return browser.switchTo().frame(element(by.tagName('iframe')).getWebElement()).then(function(){
            return browser.driver.findElement(protractor.By.tagName('img')).isDisplayed().then(function(isDisplayed){
                return browser.switchTo().defaultContent().then(function(){
                    return isDisplayed;
                });

            });

        });
    }
};

ImageViewer.prototype.msgViewer.date = {
    element: function(fileId) {
        return element(by.id('date-' + fileId));
    },
    label: function(fileId) {
        return element(by.id('dateLabel-' + fileId));
    }
};

ImageViewer.prototype.msgViewer.attachmentsList = {
    element: function(fileId) {
        return element(by.css('.msg-attachment-list'));
        //return element.all(by.id('attachmentsList')).getText();
    },
    label: function(fileId) {
        return element(by.id('attachmentsLabel-' + fileId));
    },
    items: function(fileId) {
        return element.all(by.id('attachmentsList-' + fileId));
    },
    iconByIndex: function(fileId, index)
    {
        return element(by.id('attachment-icon-' +fileId+ '-' +index));
    },
    downloadLink: function(fileId)
    {
        return element.all(by.id('attachment-href-' +fileId));
    }
};

ImageViewer.prototype.msgViewer.toList = {
    element: function(fileId) {
        return element(by.id('toList-' + fileId));
    },
    labelPresent: function(fileId) {
        return element(by.id('toListLabel-' + fileId));
    },
    toAddresses: function(fileId){
        return element.all(by.id('toAddress-' +fileId));
    }
};

ImageViewer.prototype.msgViewer.ccList = {
    element: function(fileId) {
        return element(by.id('ccList-' + fileId));
        //return element.all(by.id('attachmentsList')).getText();
    },
    label: function(fileId) {
        return element(by.id('ccListLabel-' + fileId));
    },
    ccAddresses: function(fileId){
        return element.all(by.id('ccAddress-'+ fileId));
    }
};

ImageViewer.prototype.msgViewer.bccList = {
    element: function(fileId) {
        return element(by.id('bccList-' + fileId));
        //return element.all(by.id('attachmentsList')).getText();
    },
    label: function(fileId) {
        return element(by.id('bccListLabel-' + fileId));
    },
    bccAddresses: function(fileId){
        return element.all(by.id('bccAddress-'+ fileId));
    }
};


ImageViewer.prototype.multiselectView = Object.create({}, {
    icons: {
        get: function () {
            return element.all(by.css('.multi-select-stack .stacked-item'));
        }
    },
    label: {
        get: function () {
            return element(by.css('.multi-select-title > span > span'));
        }
    },
    actionButton: {
        get: function () {
            return element(by.css('.multi-select-actions'));
        }
    },
    numberOfItemsSelected: {
        get: function () {
            return element(by.id('number-of-items-selected'));
        }
    }
});


module.exports = ImageViewer;