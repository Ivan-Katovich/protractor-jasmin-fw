var tcSpecs = require('./tcSpecs.js');

var webBrowser = {
    get chrome(){
        return {
            browserName: 'chrome',
            chromeOptions : {
                args: ['disable-infobars'],
                prefs: {
                    credentials_enable_service: false,
                    profile: {
                        password_manager_enabled: false
                    }
                }
            }
        };
    },
    get phantomjs(){
        return {
            'browserName': 'phantomjs',
            'phantomjs.binary.path': require('phantomjs').path,
            'phantomjs.cli.args': ['--ignore-ssl-errors=true', '--web-security=false']
        };
    },
    get firefox(){
        return {
            'browserName' : 'firefox',
            'acceptSslCerts': true
        };
    },
    get ie(){
        return {
            'browserName': 'internet explorer',
            'ensureCleanSession': true,
            // 'ignoreZoomLevel': false,
            'acceptSslCerts': true,
            'javascriptEnabled': true,
            // 'nativeEvents': false,
            // 'enableElementCacheCleanup': false,
            // 'ignoreZoomSetting': true,
            'allowBlockedContent': true,
            'ignoreProtectedModeSettings': true,
            // 'initialBrowserUrl': 'https://www.google.by/',
            'ie.ensureCleanSession': true,
            'platform': 'ANY',
            'version': '11'
        };
    },
    get edge(){ //MicrosofdWebDriver should be installed on you PC
        return {
            browserName: 'MicrosoftEdge',
            javascriptEnabled: true,
            platform: 'Windows 10',
            version: '13.10586'
        }
    },
    get multichrome(){
        return {
            browserName: 'chrome',
            chromeOptions : {
                args: ['--disable-extensions']
            },
            shardTestFiles: true,
            maxInstances: process.env.COUNT
        };
    },
    multiCapsBuilder: function(tspec, tcrun, tbrowser){
        var self = this;
        var multiCap = [];
        var tspecArr = [];
        var tcrunArr = [];
        var tbrowserArr = tbrowser.split('/');
        if(tspec){
            tspecArr = tspec.split('/');
        }
        if(tcrun){
            tcrunArr = tcrun.split('/');
        }
        console.log('Single specs: '+tspecArr);
        for (var i = 0; i<tspecArr.length; i+=1){
            if(tbrowserArr[i]){
                if(tbrowserArr[i].match(/\d+/g)){
                    multiCap[i] = self[tbrowserArr[i].replace(/\d+/g,'')];
                    // multiCap[i].shardTestFiles = true;
                    // multiCap[i].maxInstances = tbrowserArr[i].match(/\d+/g)[0];
                }else{
                    multiCap[i] = self[tbrowserArr[i]];
                }
                multiCap[i].specs = [];
                multiCap[i].specs.push('../client/AutomationSolution/FunctionalTests/*/' + tspecArr[i].split('.')[0] + '.spec.js');
                multiCap[i].specs.push('../client/AutomationSolution/FunctionalTests/*/*/' + tspecArr[i].split('.')[0] + '.spec.js');
            }else{
                multiCap[i] = self['chrome'];
                multiCap[i].specs = [];
                multiCap[i].specs.push('../client/AutomationSolution/FunctionalTests/*/' + tspecArr[i].split('.')[0] + '.spec.js');
                multiCap[i].specs.push('../client/AutomationSolution/FunctionalTests/*/*/' + tspecArr[i].split('.')[0] + '.spec.js');
            }
        }
        console.log('Test suits: '+tcrunArr);
        for (var j = 0; j<tcrunArr.length; j+=1){
            if(tbrowserArr[j+tspecArr.length]){
                if(tbrowserArr[j+tspecArr.length].match(/\d+/g)){
                    multiCap[j+tspecArr.length] = self[tbrowserArr[j+tspecArr.length].replace(/\d+/g,'')];
                    multiCap[j+tspecArr.length].shardTestFiles = true;
                    multiCap[j+tspecArr.length].maxInstances = tbrowserArr[j+tspecArr.length].match(/\d+/g)[0];
                }else{
                    multiCap[j+tspecArr.length] = self[tbrowserArr[j+tspecArr.length]];
                }
                multiCap[j+tspecArr.length].specs = tcSpecs[tcrunArr[j]].include;
                multiCap[j+tspecArr.length].exclude = tcSpecs[tcrunArr[j]].exclude;

            }else{
                multiCap[j+tspecArr.length] = self['chrome'];
                multiCap[j+tspecArr.length].specs = tcSpecs[tcrunArr[j]].include;
                multiCap[j+tspecArr.length].exclude = tcSpecs[tcrunArr[j]].exclude;
            }
        }
        console.log('MultiCapabilities for tests:');
        console.log(multiCap);
        console.log('\n');
        return multiCap;
    },
    multiCapsBuilder2: function(tspec, tcrun, tbrowser){
        var self = this;
        var postfix = process.env.POSTFIX;
        var multiCap = [];
        var tspecArr = [];
        var tcrunArr = [];
        var tbrowserArr = tbrowser.split('/');
        if(tspec){
            tspecArr = tspec.split('/');
        }
        if(tcrun){
            tcrunArr = tcrun.split('/');
        }

        console.log('Single specs: '+tspecArr);
        console.log('Test suits: '+tcrunArr);
        for(var i = 0; i<tbrowserArr.length; i+=1){
            if(tbrowserArr[i].match(/\d+/g)){
                multiCap[i] = self[tbrowserArr[i].replace(/\d+/g,'')];
                if(i>=tspecArr.length){
                    multiCap[i].shardTestFiles = true;
                    multiCap[i].maxInstances = tbrowserArr[i].match(/\d+/g)[0];
                }
            }else{
                multiCap[i] = self[tbrowserArr[i]];
            }
            if(i<tspecArr.length){
                multiCap[i].specs = [];
                multiCap[i].specs.push('../client/AutomationSolution/FunctionalTests/*/' + tspecArr[i].split('.')[0] + '.'+postfix+'.js');
                multiCap[i].specs.push('../client/AutomationSolution/FunctionalTests/*/*/' + tspecArr[i].split('.')[0] + '.'+postfix+'.js');
                multiCap[i].specs.push('../client/AutomationSolution/FunctionalTests/*/*/*/' + tspecArr[i].split('.')[0] + '.'+postfix+'.js');
            }else{
                if(i<tspecArr.length+tcrunArr.length){
                    multiCap[i].specs = tcSpecs[tcrunArr[i-tspecArr.length]].include;
                    if(tcSpecs[tcrunArr[i-tspecArr.length]].exclude){
                        multiCap[i].exclude = tcSpecs[tcrunArr[i-tspecArr.length]].exclude;
                    }else{
                        multiCap[i].exclude = [];
                    }

                }
            }
            if(i === tbrowserArr.length-1){
                for(var j = tbrowserArr.length; j < tspecArr.length; j+=1){
                    multiCap[i].specs.push('../client/AutomationSolution/FunctionalTests/*/' + tspecArr[j].split('.')[0] + '.'+postfix+'.js');
                    multiCap[i].specs.push('../client/AutomationSolution/FunctionalTests/*/*/' + tspecArr[j].split('.')[0] + '.'+postfix+'.js');
                    multiCap[i].specs.push('../client/AutomationSolution/FunctionalTests/*/*/*/' + tspecArr[j].split('.')[0] + '.'+postfix+'.js');
                }
                for(var k = tbrowserArr.length>tspecArr.length ? tbrowserArr.length-tspecArr.length : 0; k < tcrunArr.length; k+=1){
                    if(tcSpecs[tcrunArr[k]]){
                        console.log(multiCap[i].exclude);
                        multiCap[i].specs = multiCap[i].specs.concat(tcSpecs[tcrunArr[k]].include);
                        if(multiCap[i].exclude && tcSpecs[tcrunArr[k]].exclude){
                            multiCap[i].exclude = multiCap[i].exclude.concat(tcSpecs[tcrunArr[k]].exclude);
                        }
                    }
                }
            }
        }
        console.log('MultiCapabilities for tests:');
        console.log(multiCap);
        console.log('\n');
        return multiCap;
    }


};

module.exports = webBrowser;