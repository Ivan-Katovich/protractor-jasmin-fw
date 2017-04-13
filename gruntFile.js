module.exports = function(grunt) {

    var tspec = grunt.option('tspec'),
        tcRun = grunt.option('tcrun'),
        tbrowser = grunt.option('tbrowser'),
        tenv = grunt.option('tenv'),
        conf = grunt.option('conf'),
        postfix = grunt.option('postfix'),

        fsp = require('fs-promise'),
        exec = require('child-process-promise').exec,
        execFile = require('child-process-promise').execFile,
        spawn = require('child-process-promise').spawn;

    //load plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-apidoc');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-protractor-webdriver');
    grunt.loadNpmTasks('grunt-jasmine-nodejs');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //create config object
    var config = {
        pkg: grunt.file.readJSON('package.json'),

        //directories
        tempdir: 'temp',
        srcdir: 'src',
        testdir: 'test',
        releasedir: 'release',
        appdir: 'public',
        assetsdir: 'assets',

        //banner
        banner:
			'/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> ' +
			'- Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>; */\n',

        //ngdocs
        ngdocs: {
            all: ['<%= srcdir %>/**/*.js','!<%= srcdir %>/<%= assetsdir %>/**/*.js'],
            options: {
                html5Mode: false,
                dest: '<%= docsdir %>',
                scripts: [
                    '<%= srcdir %>/<%= assetsdir %>/js/vertafore-ui-core-all-debug.js',
                    '<%= srcdir %>/<%= assetsdir %>/js/vertafore-ui-jq-ng-bs-all-debug.js'
                ],
                styles: [
                    '<%= srcdir %>/<%= assetsdir %>/css/vertafore-theme-bs-osf.css',
                    '<%= docsdir %>/custom.css'
                ]
            }
        },

        //apidocs
        apidoc: {
            apimocks: {
                src: '<%= srcdir %>/apimocks/',
                dest: '<%= appdir %>/apidocs/'
            }
        },

        qunit: {
          all: ['test/qunit/html/*.html']
        },
        // clean
        clean: {
            temp: [
                '<%= tempdir %>'
            ],
            app: [
                '<%= appdir %>'
            ],
            templates: [
                '<%= tempdir %>/templates'
            ]
        },

        // copy
        copy: {
            debug: {
                files: [
                    {
                        cwd: '<%= srcdir %>/<%= assetsdir %>/ckeditor/',
                        src: ['**'],
                        dest: '<%= appdir %>/ckeditor/',
                        expand: true
                    },
                    {
                        cwd: '<%= srcdir %>/<%= assetsdir %>/help/',
                        src: ['**'],
                        dest: '<%= appdir %>/help/',
                        expand: true
                    },
                    {
                        cwd: '<%= srcdir %>/<%= assetsdir %>/Batch_1/',
                        src: ['**'],
                        dest: '<%= appdir %>/Batch_1/',
                        expand: true
                    },
                    {
                        cwd: '<%= srcdir %>/<%= assetsdir %>/css/font-awesome/fonts/',
                        src: ['**'],
                        dest: '<%= appdir %>/fonts/',
                        expand: true
                    },
                    {
                        cwd: '<%= srcdir %>/<%= assetsdir %>/css/noConcat/',
                        src: ['**'],
                        dest: '<%= appdir %>/css/',
                        expand: true
                    },
                    {
                        cwd: '<%= srcdir %>/<%= assetsdir %>/fonts/',
                        src: ['**'],
                        dest: '<%= appdir %>/fonts/',
                        expand: true
                    },
                    {
                        cwd: '<%= srcdir %>/<%= assetsdir %>/Images/',
                        src: ['**'],
                        dest: '<%= appdir %>/images/',
                        expand: true
                    },
                    {
                        cwd: '<%= srcdir %>/<%= assetsdir %>/js/',
                        src: ['**'],
                        dest: '<%= appdir %>/js/',
                        expand: true
                    },
                    {
                        cwd: '<%= srcdir %>/<%= assetsdir %>/LeadToolsViewer/',
                        src: ['**'],
                        dest: '<%= appdir %>/LeadToolsViewer/',
                        expand: true
                    },
                    { //This is to copy up a dir for the iis version
                        cwd: '<%= srcdir %>/<%= assetsdir %>/LeadToolsViewer/',
                        src: ['**'],
                        dest: '<%= appdir %>/../LeadToolsViewer/',
                        expand: true
                    },
                    {   // is it still needed?
                        cwd: '<%= srcdir %>/<%= assetsdir %>/',
                        src: ['ImageViewerLoader.html'],
                        dest: '<%= appdir %>/',
                        expand: true
                    },
                    {   // is it still needed?
                        cwd: '<%= srcdir %>/',
                        src: ['download.html'],
                        dest: '<%= appdir %>/',
                        expand: true
                    },
                    {
                        cwd: '<%= srcdir %>/views/',
                        src: ['**'],
                        dest: '<%= appdir %>/views/',
                        expand: true
                    },
                    {
                        cwd: '<%= tempdir %>/',
                        src: ['**'],
                        dest: '<%= appdir %>/',
                        expand: true
                    },
                    {
                        cwd: '<%= srcdir %>/<%= assetsdir %>/browser/',
                        src: ['Unsupported.html'],
                        dest: '<%= appdir %>/browser/',
                        expand: true
                    }
                ]
            },
            viewer: {
              files: [
                  {
                      cwd: '<%= tempdir %>/',
                      src: ['**'],
                      dest: '<%= appdir %>/viewer_min/',
                      expand: true
                  }
              ]
            },
            release: {
                files: [
                    {
                        cwd: '<%= srcdir %>/',
                        src: '**',
                        dest: '<%= releasedir %>/',
                        expand: true
                    }
                ]
            },
            apptoiis: {
                files: [
                    {
                        cwd: '<%= appdir %>/',
                        src: '**',
                        dest: '<%= appdir %>/../',
                        expand: true
                    }
                ]
            },
            css: {
                files: [
                    {
                        cwd: '<%= tempdir %>/css/',
                        src: ['app.css'],
                        dest: '<%= appdir %>/css/',
                        expand: true
                    }
                ]
            }
        },

        // js hint
        jshint: {
            src_all: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: [
                    'gruntFile.js',
                    '<%= srcdir %>/**/*.js',
                    '!<%= srcdir %>/<%= assetsdir %>/**/*.js',
                    '!<%= srcdir %>/LeadtoolsViewer/**/*.js'
                ]
            },
            test_ui_all: {
                options: {
                    globals: {
                        'protractor': false, //readonly
                        'browser': false, //readonly
                        '$httpBackend': false, //readonly
                        'module': false, //readonly
                        'angular': false, //readonly
                        'require': false //readonly
                    }
                },
                src: [
                    '<%= testdir %>/client/config/*.conf.js',
                    '<%= testdir %>/client/frontEnd/functionality/**/*.spec.js',
                    '<%= testdir %>/client/frontEnd/modals/**/*.spec.js',
                    '<%= testdir %>/client/frontEnd/pageObjects/**/*.js',
                    '<%= testdir %>/client/frontEnd/utilities/**/*.js',
                    '<%= testdir %>/client/api/controllers/**/*.spec.js',
                    '<%= testdir %>/client/api/utilities/**/*.js'
                ]
            }
        },


        // html2js
        html2js: {
            options: {
                base: './'
            },
            templates: {
                options: {
                    base: '<%= srcdir %>'
                },
                src: ['<%= srcdir %>/**/*.tpl.html'],
                dest: '<%= tempdir %>/templates/templates.js',
                module: 'vcp.templates'
            }
        },

        //concat
        concat: {
            app: {
                options: {
                    sourceMap: true
                    //sourceMapStyle: 'link' // Determines the type of source map that is generated. The default value, embed, places the content of the sources directly into the map. link will reference the original sources in the map as links. inline will store the entire map as a data URI in the destination file.
                },
                files: [
                    {
                        src: [
                            '<%= tempdir %>/templates/templates.js',
                            '<%= srcdir %>/index.js',
                            '<%= srcdir %>/**/*.js',
                            '!<%= srcdir %>/apimocks/**/*.js',
                            '!<%= srcdir %>/<%= assetsdir %>/**/*.*'
                            ],
                        dest: '<%= tempdir %>/js/app.js'
                    }
                ]
            },
            css: {
                files: [
                    {
                        src: [
                            '!<%= srcdir %>/<%= assetsdir %>/css/noConcat/**/*.*',
                            '!<%= srcdir %>/<%= assetsdir %>/css/font-awesome/**/*.*',
                            '<%= srcdir %>/<%= assetsdir %>/css/*.*',
                            '<%= srcdir %>/<%= assetsdir %>/css/app/*.*'
                        ],
                        dest: '<%= tempdir %>/css/app.css'
                    }
                ]
            }
            /*viewercss: {
                files: [
                    {
                        src: [
                            '<%= srcdir %>/<%= assetsdir %>/LeadToolsViewer/css*//*.css'
                        ],
                        dest: '<%= tempdir %>/css/viewer.css'
                    }
                ]
            },*/
            /*viewerjs: {
                files: [
                    {
                        src: [
                            '<%= srcdir %>/<%= assetsdir %>/LeadToolsViewer/js/IRAnnotationProperties.js',
                            '<%= srcdir %>/<%= assetsdir %>/LeadToolsViewer/js/toolbar.js',
                            '<%= srcdir %>/<%= assetsdir %>/LeadToolsViewer/js/Config.js',
                            '<%= srcdir %>/<%= assetsdir %>/LeadToolsViewer/IRImageViewer.js'
                        ],
                        dest: '<%= tempdir %>/js/viewer.full.js'
                    }
                ]
            }*/
        },

        // uglify
        uglify: {
            options: {
                mangle: false
            },
            common: {
                files: {
                    '<%= tempdir %>/js/app.min.js': [
                        '<%= tempdir %>/js/app.js'
                    ]
                }
            },
            viewer: {
                files: {
                    '<%= tempdir %>/js/viewer.min.js': [
                        '<%= tempdir %>/js/viewer.full.js'
                    ]
                }
            }
        },

        // node-sass
        sass: {
            dev: {
                options: {
                    outputStyle: 'expanded'
                },

                files: {
                    '<%= srcdir %>/<%= assetsdir %>/css/app/_app.css': '<%= srcdir %>/<%= assetsdir %>/css/sass/index.scss'
                }
            },

            min: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: false
                },
                files: {
                    '<%= srcdir %>/<%= assetsdir %>/css/app/_app.min.css': '<%= srcdir %>/<%= assetsdir %>/css/sass/index.scss'
                }
            }
        },


        // compress css
        cssmin: {
            release: {
                files: [
                    {
                        cwd: '<%= tempdir %>/css/',
                        src: ['*.css', '!*.min.css'],
                        dest: '<%= tempdir %>/css/',
                        ext: '.min.css',
                        expand: true
                    }
                ]
            }
            /*viewer: {
                files: [
                    {
                        cwd: '<%= tempdir %>/css/',
                        src: ['viewer.css'],
                        dest: '<%= tempdir %>/css/',
                        ext: '.min.css',
                        expand: true
                    }
                ]
            }*/
        },

        // watcher
        watch: {
            css: {
                files: [
                    '<%= srcdir %>/<%= assetsdir %>/css/sass/**/*.scss'
                ],
                tasks: ['sass:dev', 'concat:css', 'copy:css', 'clean:temp'],
                options: {
                   // livereload: true
                }
            }
        },

        //karma
        karma: {
            client_unit: {
                configFile: 'test/config/client.unit.conf.js'
            }
        },

        //protractor
        protractor: {
            options: {
                configFile: 'node_modules/protractor/referenceConf.js', // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            client_usability: {
                options: {
                    configFile: 'test/client/config/client.usability.conf.js', // Target-specific config file
                    args: {} // Target-specific arguments
                }
            },
            client_usability_spec: {
                options: {
                    configFile: 'test/config/' + '<%= conf.name%>' + '.conf.js'
                }
            },
            //todo: are these still needed?
            client_e2e: {
                configFile: 'tests/config/client.e2e.conf.js'
            },
            api: {
                configFile: 'tests/config/server.api.conf.js'
            },

            old_e2e_ts: {
                options: {
                    configFile: 'test/config/'+'<%= conf.name%>'+'.conf.js'
                }
            },

            old_e2e: {
                options: {
                    configFile: 'test/config/client.e2e.work.conf.js',
                    args: {
                        // specs: ['test/client/AutomationSolution/FunctionalTests/*/' + '<%= spec.filename%>' + '.spec.js',
                        //     'test/client/AutomationSolution/FunctionalTests/*/*/' + '<%= spec.filename%>' + '.spec.js'],
                        // seleniumAddress: 'http://localhost:4443/wd/hub'
                    }
                }
            },

            old_e2e_tc: {
                options: {
                    configFile: 'test/config/teamCity.conf.js'
                }
            }
        },

        protractor_webdriver: {
            options: {
                path: 'node_modules/webdriver-manager/bin/',
                keepAlive: true
            },
            update: {
                options: {
                    //role: 'hub',
                    command: 'webdriver-manager update' // --role=hub, which will work if args are passed!
                }
            },
            start: {
                options: {
                    //role: 'hub',
                    command: 'webdriver-manager start' // --role=hub, which will work if args are passed!
                }
            },
            stop: {
                options: {
                    //role: 'hub',
                    command: 'webdriver-manager shutdown' // --role=hub, which will work if args are passed!
                }
            }
        },

        jasmine_nodejs: {
            // task specific (default) options
            options: {
                specNameSuffix: "spec.js", // also accepts an array
                useHelpers: false,
                random: false,
                seed: null,
                defaultTimeout: null, // defaults to 5000
                stopOnFailure: false,
                traceFatal: true,
                // configure one or more built-in reporters
                reporters: {
                    console: {
                        colors: true,        // (0|false)|(1|true)|2
                        cleanStack: 1,       // (0|false)|(1|true)|2|3
                        verbosity: 4,        // (0|false)|1|2|3|(4|true)
                        listStyle: "indent", // "flat"|"indent"
                        activity: false
                    }
                },
                // add custom Jasmine reporter(s)
                customReporters: []
            },
            test_api: {
                //spec files
                specs: [
                    //'test/client/api/controllers/*/*.spec.js'
                    //'test/client/api/controllers/addContent/addDocument.spec.js'
                    'test/client/api/controllers/addContent/addPage.spec.js'
                ]
            }
        },

        //jade
        jade: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    '<%= tempdir %>/index.html': "src/views/index.jade"
                }
            }
        }

    };



    //configure project
    grunt.initConfig(config);

    grunt.registerTask('build-mocks', 'build mocks for unit test', function() {
        var done = this.async();
        var apiMocks = require('./src/apimocks/mockRoutes.js');
        var fs = require('fs');
        var dir = './temp';
        var mocks = [];
        //todo: refactor to support rendering of multiple api mocks
        var data = apiMocks.mockRoutes.filter(function(mock){
            return mock.name==='GetPreview';
        });
        //render mock that is defined with a key
        for (var m in data) {
            var mock = data[m];
            for (var t in mock.jsonTemplate) {
                var template = mock.jsonTemplate[t];
                var keys = Object.keys(template);
                for (var k in keys) {
                    var key = keys[k];
                    var render = template[key]();
                    mock.jsonTemplate[t][key] = render;
                }
            }
            mocks.push(mock);
        }
        //create temp file
        var content = JSON.stringify(mocks);
        var script = 'var mocks = ' + content + ';';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        fs.writeFile(dir+'/apimocks.js', script, function(err){
            if (err) {
                console.log('_________mock_err',err);
            } else {
                console.log('mock temp file created');
            }
            done(true);
        });
    });

    grunt.registerTask('cleaner', 'Clean source', function() {
        var done = this.async();
        fsp.emptyDir('test/client/AutomationSolution/screenshots')
            // .then(function () {
            //     return exec('PowerShell -Command "&{&"netstat" -ano | Select-String "4444" | % {$a = $_ -split \' {3,}\'; New-Object \'PSObject\' -Property @{Original=$_;Fields=$a}} | ? {$_.Fields[1] -match \'4444$\'}}"');
            // })
            .then(function () {
                var child = spawn('PowerShell',['netstat -ano | Select-String "4444" | % {$a = $_ -split \' {3,}\'; New-Object \'PSObject\' -Property @{Original=$_;Fields=$a}} | ? {$_.Fields[1] -match \'4444$\'} | % {taskkill /F /PID $_.Fields[4] }']);
                child.stdout.on("data",function(data){
                    console.log("Powershell Data: " + data);
                });
                child.stderr.on("data",function(data){
                    console.log("Powershell Errors: " + data);
                });
                child.on("exit",function(){
                    console.log("Powershell Script finished");
                });
                child.stdin.end();
            })
            // .then(function (results) {
            //     console.log('res!!!!!!! '+results.stdout);
            //     if(results){
            //         return exec('PowerShell -Command "&{&"netstat" -ano | Select-String "4444" | % {$a = $_ -split \' {3,}\'; New-Object \'PSObject\' -Property @{Original=$_;Fields=$a}} | ? {$_.Fields[1] -match \'4444$\'} | % {taskkill /F /PID $_.Fields[4] }}"');
            //     }
            // })
            // .then(function (results) {
            //     console.log('res!!!!!!! '+results.stdout);
            //     if(results){
            //         return execFile('PowerShell',['netstat -ano | Select-String "4444" | % {$a = $_ -split \' {3,}\'; New-Object \'PSObject\' -Property @{Original=$_;Fields=$a}} | ? {$_.Fields[1] -match \'4444$\'} | % {taskkill /F /PID $_.Fields[4] }']);
            //     }
            // })
            .then(function (results) {
                if(results.stdout){
                    console.log(results.stdout);
                }
            })
            .catch(function (err) {
                console.error('ERROR: ', err);
            })
            .then(function () {
                return fsp.exists('mock-json-api/store.json');
            })
            .then(function (is) {
                if(is){
                    return fsp.remove('mock-json-api/store.json');
                }
            })
            .then(function () {
                done(true);
            });
    });

    //task for old e2e protractor tests (can be expanded on new tests)
    grunt.registerTask('prot', 'Run protractor tests', function(target, server) {

        if(tenv !== 'local' && tenv !== 'work' && tenv !== 'mock'){
            process.env.ENVIRONMENT = 'ad';
        }else{
            process.env.ENVIRONMENT = tenv;
        }

        if(postfix){
            process.env.POSTFIX = postfix;
        }else{
            if(tenv === 'mock'){
                process.env.POSTFIX = 'mockSpec';
            }else {
                process.env.POSTFIX = 'spec';
            }
        }

        if(tbrowser){
            process.env.BROWSER = tbrowser;
        }else{
            process.env.BROWSER = 'chrome';
        }

        if(tcRun){
            process.env.RUN = tcRun;
        }

        if(tspec){
            process.env.SPEC = tspec;
        }

        target = target || 'old_e2e';

        if (server) {
            grunt.task.run(['server-start']);
        }
        grunt.task.run(['cleaner', 'protractor_webdriver:start', 'protractor:' + target]);
    });

    // default task
    grunt.registerTask('default', ['build']);

    // build tasks
    grunt.registerTask('build', ['jshint:src_all', 'clean', 'html2js:templates', 'concat', 'uglify:common', 'uglify:viewer', 'clean:templates', 'copy:debug', 'clean:temp', 'apidoc:apimocks']);
    grunt.registerTask('build-test-ui', ['jshint:test_ui_all']);

    //local build
    grunt.registerTask('build-local', ['jshint:src_all', 'clean', 'html2js:templates', 'concat', 'uglify:common', 'clean:templates', 'copy:debug', 'clean:temp', 'copy:apptoiis']);

    grunt.registerTask('build-non-node', ['jshint:src_all', 'clean', 'html2js:templates', 'concat', 'uglify:common', 'clean:templates', 'copy:debug', 'clean:temp']);

    grunt.registerTask('build-qa', ['build-debug']);

    // builds for iis environment
    grunt.registerTask('build-debug', ['newer:jshint:src_all', 'clean:app', 'html2js:templates', 'concat', 'clean:templates', 'copy:debug', 'clean:temp']);
    grunt.registerTask('build-release', ['jshint:src_all', 'clean', 'html2js:templates', 'concat', 'uglify:common', 'cssmin', 'clean:templates', 'copy:debug', 'clean:temp']);

    grunt.registerTask('build-viewer', ['jshint:src_all', 'clean', 'concat:viewerjs', 'concat:viewercss', 'uglify:viewer']);

    // livereload css task
    grunt.registerTask('reload', ['watch']);

    // compile sass
    grunt.registerTask('build-css', ['clean:temp', 'sass:dev', 'concat:css', 'copy:css', 'clean:temp']);

    //// test tasks
    grunt.registerTask('test', ['build', 'server-start', 'karma:client_unit', 'protractor:client_usability', 'protractor:client_e2e']);
    grunt.registerTask('test-unit', ['build', 'build-mocks', 'server-start', 'karma:client_unit']);
    grunt.registerTask('test-unit-nobuild', ['server-start', 'karma:client_unit']);
    grunt.registerTask('test-qunit', ['qunit']);
    grunt.registerTask('test-usability', ['build', 'build-test-ui', 'server-start', 'protractor:client_usability']);
    grunt.registerTask('test-e2e', ['build', 'server-start', 'protractor:client_e2e']);
    grunt.registerTask('test-api', ['build-test-ui', 'jasmine_nodejs:test_api']);
    //grunt.registerTask('test', ['build', 'server-start', 'karma:unit', 'karma:e2e']);

    //// release
    //grunt.registerTask('release', ['build', 'uglify']);

    //// server task
    //grunt.registerTask('server', ['clean', 'copy', 'build-css', 'build-js', 'open:iis', 'watch']);

    ////this task will build the contents in the QA environment
    //grunt.registerTask('qaBuild', ['release', 'karma:unit', 'karma:e2e', 'compress']);

    grunt.registerTask('server-start', 'Start a custom web server', function () {
        require('./server.js');
    });
};