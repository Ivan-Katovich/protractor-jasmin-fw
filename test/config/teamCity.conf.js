var webBrowser = require('./configOptions/capabilities.js'),
    q = require('q'),
    PixDiff = require('pix-diff'),
    specsForTc = require('./configOptions/tcSpecs.js'),
    env = require('./configOptions/environments.js'),
    IR_LoginPage = require('./../client/AutomationSolution/PageObjects/LoginPage.js'),
    HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter'),
    loginPage = new IR_LoginPage(),
    jasmineReporters = require('jasmine-reporters'),
    htmlReporter = new HtmlScreenshotReporter({
        dest: './test/client/AutomationSolution/reports/',
        filename: 'jasmineReport.html',
        cleanDestination: true,
        ignoreSkippedSpecs: true,
        // captureOnlyFailedSpecs: true,
        pathBuilder: function(currentSpec, suites, browserCapabilities) {
            var name = currentSpec.fullName.match(/.*\d/) ? currentSpec.fullName.match(/.*\d/)[0] : currentSpec.fullName.match(/.{70}/)[0];
            return 'image/'+name;
        }
    });

exports.config = {

    plugins: [{
        path: '../client/AutomationSolution/utils/protractorExtensions.js'
    }],

    seleniumAddress: 'http://localhost:4444/wd/hub',
    multiCapabilities: webBrowser[process.env.BROWSER],

    baseUrl:
        'http://localhost:3000/#/',

    params: env[process.env.ENVIRONMENT].params,
    specs: specsForTc[process.env.RUN].include,
    exclude: specsForTc[process.env.RUN].exclude,

    beforeLaunch: function() {
        var deferred = q.defer();
        htmlReporter.beforeLaunch(function(){
            deferred.resolve();
            return deferred.promise;
        });
    },

    onPrepare: function () {

        require('protractor-linkuisref-locator')(protractor);

        /* header; */
        console.log('\n"' + process.env.ENVIRONMENT + '" environment has set up\n');
        console.log('\n"' + process.env.RUN + '" Team City spec has run\n');

        /* pix-diff configuration; */
        browser.pixDiff = new PixDiff(
            {
                width: 1680,
                height: 1050,
                dpr: 1,
                basePath: './test/client/AutomationSolution/Metadata/Screens/Dashboard/',
                diffPath: './test/client/AutomationSolution/Metadata/Screens/Dashboard/diff/'
            }
        );

        /* TC reporters; */
        var jasmineReporters = require('jasmine-reporters');
        if (process.env.TEAMCITY_VERSION) {
            jasmine.getEnv().addReporter(new jasmineReporters.TeamCityReporter());
        }
        jasmine.getEnv().addReporter(htmlReporter);
        jasmine.getEnv().addReporter(new jasmineReporters.TapReporter());

        /* initial login; */
        browser.driver.get(browser.params.defaultUrl)
            .then(function () {
                if(process.env.BROWSER === 'ie') {
                    return browser.sleep(1000);
                }
            })
            .then(function () {
                if(process.env.BROWSER === 'ie') {
                    return browser.driver.getTitle()
                        .then(function (title) {
                            if(title == 'Certificate Error: Navigation Blocked'){
                                browser.ignoreSynchronization = true;
                                return browser.driver.get("javascript:document.getElementById('overridelink').click();")
                                    .then(function () {
                                        return browser.ignoreSynchronization = false;
                                    });
                            }
                        });
                }
            })
            .then(function () {
                return loginPage.login(browser.params.defaultUserName, browser.params.defaultPassword);
            });

        /* animations; */
        var disableNgAnimate = function () {
            angular
                .module('disableNgAnimate', [])
                .run(['$animate', function($animate) {
                    $animate.enabled(false);
                }]);
        };
        var disableCssAnimate = function() {
            angular
                .module('disableCssAnimate', [])
                .run(function() {
                    var style = document.createElement('style');
                    style.type = 'text/css';
                    style.innerHTML = '* {' +
                        '-webkit-transition: none !important;' +
                        '-moz-transition: none !important' +
                        '-o-transition: none !important' +
                        '-ms-transition: none !important' +
                        'transition: none !important' +
                        '}';
                    document.getElementsByTagName('head')[0].appendChild(style);
                });
        };
        browser.addMockModule('disableNgAnimate', disableNgAnimate);
        browser.addMockModule('disableCssAnimate', disableCssAnimate);

    },

    afterLaunch: function(exitCode) {
        var deferred = q.defer();
        htmlReporter.afterLaunch((function(){
            deferred.resolve();
            return deferred.promise;
        }).bind(this, exitCode));
    },

    ignoreUncaughtExceptions: true,

    framework: 'jasmine2',

    jasmineNodeOpts: {
        showColors: true,
        isVerbose: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 120000
    },

    allScriptsTimeout: 120000
};