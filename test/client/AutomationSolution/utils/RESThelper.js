
var request = require('request');
var authCookie = ".ASPXAUTH";

function restPOST(url, data, fn) {
    var jar = request.jar();
    var cookie;
    browser.manage().getCookie(authCookie).then(function (irCookie) {
        cookie = request.cookie(authCookie + "=" + irCookie.value);
        jar.setCookie(cookie, browser.params.defaultUrl, function (error, _cookie) {
            if (error == null || _cookie != null) {

                request({
                    method: "POST",
                    uri: browser.params.defaultUrl + url,
                    jar: jar,
                    body: data,
                    json: true,
                    rejectUnauthorized: false
                },
                function (error, response, body) {
                    if (error || response.statusCode >= 400) {
                        throw new Error("Invalid recuest! Response cod: " + response.statusCode + ". Response message: " + response.statusMessage);
                    } else {
                        fn(response.statusCode);
                    };
                });
            } else {
                throw new Error("Invalid cookie! Error: " + error);
            }

        });
    });
}

exports.restPOST = restPOST;