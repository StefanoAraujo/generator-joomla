module.exports = function (grunt) {
    var pkg = grunt.file.readJSON('package.json');

    // Target extension type and get the correct manifest name
    var type = pkg.name.match(/^(\w+)_/)[1];
    var name = pkg.name.replace(/^(plg|com|tpl)_/, '');

    // Read the extension manifest
    var xml = grunt.file.read('source/' + (type == 'com' ? 'administrator/' : '') + (type == 'tpl' ? 'templateDetails' : name) + '.xml');
    var manifest = {
        version: xml.match(/<version>(.+?)<\/version>/)[1],
        copyright: xml.match(/<copyright>(.+?)<\/copyright>/)[1],
        author: xml.match(/<author>(.+?)<\/author>/)[1],
        authorEmail: xml.match(/<authorEmail>(.+?)<\/authorEmail>/)[1],
        license: xml.match(/<license>(.+?)<\/license>/)[1]
    };

    // Project configuration.
    grunt.initConfig({
        sync: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'source',
                    src: ['**/*', '!**/{less,sass,scss}/**', '!**/*.map', '!administrator/{' + name + '.xml,script.php}'],
                    dest: 'dist/.cache/source'
                }, {
                    expand: true,
                    cwd: 'source/administrator',
                    src: [name + '.xml', 'script.php'],
                    dest: 'dist/.cache/source'
                }],
                updateAndDelete: true
            }
        },
        uglify: {
            target: {
                expand: true,
                src: 'dist/.cache/source/**/*.js'
            }
        },
        cssmin: {
            target: {
                expand: true,
                src: 'dist/.cache/source/**/*.css'
            }
        },
        imagemin: {
            target: {
                expand: true,
                src: 'dist/.cache/source/**/*.{jpe?g,png,gif,svg}'
            }
        },
        imageEmbed: {
            target: {
                expand: true,
                src: 'dist/.cache/source/**/*.css',
                options: {
                    deleteAfterEncoding: true
                }
            }
        },
        copy: {
            main: {
                expand: true,
                src: 'dist/.cache/source/**/*.php',
                options: {
                    process: function (content) {
                        return content.replace(/@copyright(.|[\r\n])+?\*\//, '@package   ' + pkg.name + '\n' +
                        ' * @author    ' + manifest.author + ' <' + manifest.authorEmail + '>\n' +
                        ' * @copyright ' + manifest.copyright + '\n' +
                        ' * @license   ' + manifest.license + '\n' +
                        ' */');
                    }
                }
            }
        },
        compress: {
            options: {
                archive: 'dist/' + pkg.name + '-' + manifest.version + '.tgz'
            },
            main: {
                expand: true,
                cwd: 'dist/.cache/source',
                src: '**/*'
            }
        }
    });

    // Load the tasks to run
    require('load-grunt-tasks')(grunt);

    // Registering tasks
    grunt.registerTask('default', ['sync', 'optimizing', 'compress']);
    grunt.registerTask('optimizing', ['newer:uglify:target', 'newer:cssmin:target', 'newer:imageEmbed:target', 'newer:imagemin:target', 'newer:copy:main']);
};