var ImageView = function () { };

ImageView.prototype = Object.create({}, {
    documentPreviewText: {
        get: function () {
            //return element(by.id('documentPreviewText'));
            return element(by.css('.text-center>div'));
        }
    }
});


module.exports = ImageView;