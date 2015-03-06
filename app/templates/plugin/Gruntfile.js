module.exports = function (grunt) {
	var pkg = grunt.file.readJSON('package.json');

	// Obtain the manifest name (for plugins, without prefix)
	var name = pkg.name.replace(/^plg_/, '');

	// Read version from the Joomla manifest
	var manifest = grunt.file.read('source/' + name + '.xml');
	var version = manifest.match(/<version>(.+?)<\/version>/)[1];

	// Project configuration.
	grunt.initConfig({
		compress : {
			options : {
				archive : 'dist/' + pkg.name + '-' + version + '.tar.gz'
			},
			main    : {
				expand : true,
				cwd    : 'source/',
				src    : ['**/*', '!**/sass/**', '!**/less/**', '!**/*.map'] // Exclude CSS preprocessors folders
			}
		}
	});

	// Load the tasks to run
	grunt.loadNpmTasks('grunt-contrib-compress');

	// Default task(s).
	grunt.registerTask('default', ['compress']);
};