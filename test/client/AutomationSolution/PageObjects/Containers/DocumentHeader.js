var DocumentHeader= function () { };

DocumentHeader.prototype = Object.create({}, {
    documentTitle: {
        get: function () {
            //return element(by.id('documentTitle'));
            return element(by.binding('file.selectedNode.data')).getText();
        }
    },
    documentType: {
        get: function () {
            //return element(by.id('documentType'));
            return element(by.css('.doc-attr-label.text-uppercase')).getText();
        }
    },
    documentActionButtons: {
        get: function () {
            //return element(by.id('documentActionButtons'));
            return element(by.buttonText('↵ Actions ↵ ')).getText();
        }
    },
    documentNumberOfPages: {
        get: function () {
            //return element(by.id('documentNumberOfPages'));
            return element(by.css('.doc-attr-label.text-uppercase')).getText();
        }
    }
});


module.exports = DocumentHeader;