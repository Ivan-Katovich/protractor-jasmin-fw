
var utils = {

    getTemplateFromRoute: function(mock, routeName, templateName) {
        var mocks = mock.mocks;
        for (var i = 0; i < mocks.length; i++) {
            if (mocks[i].name === routeName) {
                console.log('found mock', routeName);
                return JSON.parse(this.getTemplate(mocks[i].jsonTemplate, templateName));
            }
        }
        console.log('did not find mock', routeName);
        return null;
    },

    getTemplate: function (templates, templateName) {

        for (var i = 0; i < templates.length; i++) {
            if (typeof templates[i][templateName]==='function') {
                console.log('found template', templateName);
                return templates[i][templateName]();
            }
        }
        console.log('did not find template', templateName);
        return null;
    }

};

module.exports = utils;