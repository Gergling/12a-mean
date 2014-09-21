module.exports = function (grunt) {
    'use strict';

    var paths = {
            vendor: [
                'src/public_html/vendor/jquery/jquery.js',
                'src/public_html/vendor/quadrahedron/quadrahedron.js',
                'src/public_html/vendor/angular/angular.js',
                'src/public_html/vendor/lodash/lodash.compat.js',
                'src/public_html/vendor/*/*.js',
                '!src/public_html/vendor/angular-mocks/angular-mocks.js',
                'src/public_html/vendor/bootstrap/bootstrap.js'
            ],

            scripts: [
                'src/public_html/modules.js',          // QH module definitions.
                'src/public_html/module/fusepump/fusepump.js', // Fusepump lib.
                'src/public_html/module/**/module.js', // Module.js files.
                'src/public_html/module/**/*.js',      // Other source files.
                'src/public_html/angular.bootstrap.run.js' // Bootstrap.
            ],

            helpers: [ 'src/public_html/vendor/angular-mocks/*.js' ],
            specs: grunt.file.expand('specs/**/*.js')
        },

        css = {
            vendor: [ 'src/public_html/vendor/**/*.css' ],
            styles: [ 'src/public_html/module/**/*.css' ]
        },

        banner = '/* TBE */\n'
            + '/* <%= grunt.template.today("yyyy-mm-dd") %> */\n',

        version = (function () {
            var build = process.env.BUILD_NUMBER;
            return build ? '?v=' + build : '';
        }());

    grunt.initConfig({
        bower: {
            install: {
                options: {
                    targetDir: './src/public/views/vendor',
                    verbose: true,
                    layout: function (type, component, source) {
                        /*
                         * Make sure bootstrap CSS and fonts appear in correct
                         * directories relative to each other.
                         */
                        if (component === 'bootstrap') {
                            if (source.match('bootstrap.css')) {
                                return require('path').join(component, 'css');
                            }
                            if (source.match('glyphicons-halflings-regular')) {
                                return require('path').join(component, 'fonts');
                            }
                            return component;
                        }
                        return component;
                    }
                }
            }
        },

        jslint: {
            grunt: {
                src: [ 'Gruntfile.js' ],
                directives: {
                    unparam: true,
                    maxlen: 80,
                    predef: [ 'module', 'require', 'process' ]
                }
            },
            src: {
                src: paths.scripts,
                directives: {
                    predef: [
                        'FileReader',
                        'fusepump',
                        'jQuery',
                        'qh',
                        'angular',
                        'Keen',
                        '$',
                        'google'
                    ]
                },
                options: { checkstyle: 'build/logs/checkstyle.xml' }
            },
            specs: {
                src: paths.specs,
                directives: {
                    predef: [
                        'jasmine',
                        'google',
                        'angular',
                        'expect',
                        'it',
                        'inject',
                        'describe',
                        'module',
                        'beforeEach',
                        'afterEach'
                    ]
                }
            }
        },

        jsdoc: {
            dist: {
                src: 'src/public_html/module/**/*.js',
                options: {
                    destination: 'build/documentation'
                }
            }
        },

        template: {
            dev: {
                options: {
                    data: { paths: paths, css: css, expand: true }
                },
                files: {
                    'src/public_html/modules.js':
                        'src/public_html/modules.js.tpl',
                    'src/public_html/index.html':
                        'src/public_html/index.html.tpl'
                }
            },
            build: {
                options: {
                    data: {
                        paths: {
                            vendor:  'js/vendor.min.js'  + version,
                            scripts: 'js/scripts.min.js' + version
                        },
                        css: {
                            vendor: 'css/vendor.min.css' + version,
                            styles: 'css/styles.min.css' + version
                        },
                        expand: false
                    }
                },
                files: {
                    'build/public_html/index.html':
                        'src/public_html/index.html.tpl'
                }
            }
        },

        eol: {
            options: { replace: true },
            dev: {
                src: [
                    'src/public_html/index.html',
                    'src/public_html/modules.js'
                ]
            },
            build: {
                src: [
                    'build/public_html/index.html'
                ]
            }
        },

        jasmine: {
            options: {
                specs:   paths.specs,
                vendor:  paths.vendor,
                helpers: paths.helpers
            },
            test: {
                src: paths.scripts,
                options: {
                    outfile:    'specs/index.html',
                    keepRunner: true,
                    junit:      { path:  'build/logs/junit' }
                }
            },
            coverage: {
                src: paths.scripts,
                options: {
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'build/logs/coverage.json',
                        report: [
                            {
                                type: 'html',
                                options: { dir: 'build/coverage/' }
                            },
                            {
                                type: 'cobertura',
                                options: { dir: 'build/logs/' }
                            },
                            {
                                type: 'text-summary'
                            }
                        ]
                    },
                    display: 'none',
                    summary: true
                }
            }
        },

        karma: {
            unit: {
                options: {
                    frameworks: [ 'jasmine' ],
                    files: [ ]
                        .concat(paths.vendor)
                        .concat(paths.helpers)
                        .concat(paths.scripts)
                        .concat(paths.specs),
                    logLevel: 'INFO',
                    autoWatch: true,
                    browsers: [ 'PhantomJS' ],
                    captureTimeout: 60000,
                    singleRun: false
                }
            }
        },

        uglify: {
            vendor: {
                files: { 'build/public_html/js/vendor.min.js': paths.vendor }
            },
            scripts: {
                options: { banner: banner },
                files: { 'build/public_html/js/scripts.min.js': paths.scripts }
            }
        },

        cssmin: {
            vendor: {
                files: { 'build/public_html/css/vendor.min.css': css.vendor }
            },
            styles: {
                options: { banner: banner },
                files: { 'build/public_html/css/styles.min.css': css.styles }
            }
        },

        htmlmin: {
            options: {
                removeComments:       true,
                collapseWhitespace:   true,
                conservativeCollapse: true,
                preserveLineBreaks:   true
            },
            build: {
                files: [ {
                    expand: true,
                    cwd:    'src/public_html/module/',
                    src:    '**/partial/**/*.html',
                    dest:   'build/public_html/module/'
                } ]
            }
        },

        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd:    'src/public_html/module/',
                        src:    '**/img/**/*',
                        dest:   'build/public_html/module/'
                    },
                    {
                        expand: true,
                        cwd:    'src/public_html/vendor/bootstrap/fonts/',
                        src:    '*',
                        dest:   'build/public_html/fonts/'
                    }
                ]
            }
        },

        watch: {
            bower: {
                files: [ 'bower.json' ],
                tasks: [ 'bower' ]
            },
            gruntfile: {
                files: [ 'Gruntfile.js' ],
                tasks: [ 'jslint' ]
            },
            src: {
                files: [ ]
                    .concat(paths.scripts)
                    .concat(paths.specs),
                tasks: [ 'template:dev', 'jasmine', 'jslint' ]
            },
            jsdoc: {
                files: 'src/public_html/module/**/*.js',
                tasks: [ 'jsdoc' ]
            }
        },

        clean: {
            dev: [
                '.grunt/',
                'build/',
                'specs/test.html',
                'src/public_html/index.html',
                'src/public_html/modules.js'
            ],
            build: [
                'build/public_html/'
            ],
            extra: [
                'bower_components/',
                'src/public_html/vendor'
            ],
            junit: [ 'build/logs/junit/' ]
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-eol');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task
    grunt.registerTask('default', [ 'build' ]);

    grunt.registerTask('build', [
        'bower',       // Install dependencies with bower
        'jsdoc',       // Generate API documentation
        'template',    // Populate templates with lists of source files
        'eol',         // Standardise on LF (Unix) line endings
        'clean:junit', // Clean up old test results
        'jasmine',     // Run unit tests with Jasmine
        'jslint',      // Check code with JSLint
        'uglify',      // Concatenate and minify code
        'cssmin',      // Concatenate and minify styles
        'htmlmin',     // Copy and minify partials
        'copy'         // Copy images and fonts
    ]);
};
