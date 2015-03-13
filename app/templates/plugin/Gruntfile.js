module.exports = function (grunt) {
	var pkg = grunt.file.readJSON('package.json');

	// Remove the name suffix to target the manifest
	var name = pkg.name.replace(/^plg_/, '');

	// Read version from the Joomla manifest
	var manifest = grunt.file.read('source/' + name + '.xml');
	var version = manifest.match(/<version>(.+?)<\/version>/)[1];

	// Project configuration.
	grunt.initConfig({
		compress: {
			options: {
				archive: 'dist/' + pkg.name + '-' + version + '.tgz'
			},
			main   : {
				expand: true,
				cwd   : 'source/',
				src   : ['**/*', '!**/scss/**', '!**/sass/**', '!**/less/**', '!**/*.map']
			}
		}
	});

	// Load the tasks to run
	grunt.loadNpmTasks('grunt-contrib-compress');

	// Default task(s).
	grunt.registerTask('default', ['compress']);
};