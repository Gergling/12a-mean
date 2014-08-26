module.exports = function (grunt) {
    'use strict';

    var tasks = {}, paths = {
        bower: [
            "src/bower_components/angular/angular.js",
            "src/bower_components/lodash/dist/lodash.js",
            "src/bower_components/angular-route/angular-route.js",
            "src/bower_components/restangular/dist/restangular.js"
        ],
        qh: (function () {
            var modules = grunt.file.readJSON('src/public_html/module/modules.json'),
                modfile = "",
                modulesFile = 'build/quadrahedron/modules.js',
                module = [],
                component = {};

            modules.list.forEach(function (mod) {
                modfile += 'qh.moduleManager.qhModules.add("' + mod + '", "module");\n';
            });
            grunt.file.write(modulesFile, modfile);

            /*jslint unparam: true*/
            grunt.file.recurse('src/public_html/module/', function (abs, root, sub, file) {
                if (sub) {
                    if (file === "module.js") {
                        module.push(root + sub + "/module.js");
                    } else {
                        component[sub] = root + sub + "/*.js";
                    }
                }
            });
            /*jslint unparam: false*/
            return [modulesFile]
                .concat(module)
                .concat(grunt.util.toArray(component));
        }())
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        http: {
            requirejs: {
                options: {url: 'http://requirejs.org/docs/release/2.1.8/minified/require.js'},
                dest: 'src/public_html/vendor/requirejs/requirejs.2.1.8.js'
            },
            keen: {
                options: {url: 'http://dc8na2hxrj29i.cloudfront.net/code/keen-2.1.2-min.js'},
                dest: 'build/keen/keen-2.1.2-min.js'
            },
            jsapi: {
                options: {url: 'https://www.google.com/jsapi'},
                dest: 'build/google/jsapi.js'
            },
            pkg: {
                options: {url: 'https://www.google.com/uds/?file=visualization&v=1.0&packages=corechart&async=2'},
                dest: 'build/google/pkg.js'
            },
            corechart: {
                options: {url: 'https://www.google.com/uds/api/visualization/1.0/ce05bcf99b897caacb56a7105ca4b6ed/format+en_GB,default+en_GB,ui+en_GB,corechart+en_GB.I.js'},
                dest: 'build/google/corechart.js'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    "build/keen/keen-2.1.2-min.js",
                    "src/public_html/keen.config.js",
                    "build/google/jsapi.js",
                    "build/google/pkg.js",
                    "build/google/corechart.js"
                ]
                    .concat(paths.bower)
                    .concat(paths.qh),
                dest: 'build/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        shell: {
            documentation: {
                command: "jsdoc ./src/public_html/module/ --recurse --destination ./documentation MODULES.md"
            }
        },
        jslint: { // configure the task
            client: {
                src: [
                    'Gruntfile.js',
                    'src/public_html/module/**/*.js',
                    'specs/*.js',
                    'specs/**/*.js'
                ],
                directives: {
                    browser: true,
                    predef: [
                        // Source:
                        'jQuery',
                        'qh',
                        'angular',
                        'Keen',
                        '$',
                        'google',

                        // Gruntfile:
                        'module',

                        // Jasmine Specs:
                        'expect',
                        'it',
                        'inject',
                        'describe',
                        'beforeEach',

                        // Spec utils
                        'FactoryChecklist'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-http');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    tasks.build = ['http:keen', 'http:jsapi', 'http:pkg', 'http:corechart', 'concat', 'uglify'];
    grunt.registerTask('default', tasks.build);
    grunt.registerTask('build', tasks.build);
    grunt.registerTask('dev', ['shell:documentation', 'jslint:client']);
    grunt.registerTask('setup', ['http:requirejs']);
};