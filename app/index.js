var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	prompting: function () {
		var done = this.async();
		var d = new Date();
		var suffixes = {
			'Component': 'com',
			'Library'  : 'lib',
			'Module'   : 'mod',
			'Package'  : 'pkg',
			'Plugin'   : 'plg',
			'Template' : 'tpl'
		};

		var prompts = [
			{
				type   : 'list',
				name   : 'project',
				choices: Object.keys(suffixes),
				message: 'What\'s type of project you\'re about to create?',
				default: Object.keys(suffixes)[2] // todo select the default based on actual folder prefix (mod, com, etc.)
			},
			{
				type    : 'input',
				name    : 'name',
				message : 'What\'s the name of the project?',
				default : this.appname, // Default to current folder name
				validate: function (answer) {
					if (!answer.match(/(com|lib|mod|pkg|plg|tpl)_/)) {
						return 'Your project name must start with com_, lib_, mod_, pkg_, plg_ or tpl_ depending on the project type you chosen.';
					}

					return true;
				}
			},
			{
				type    : 'input',
				name    : 'author',
				message : 'Who is the author?', // todo store values and use them as next default
				validate: function (answer) {
					return answer.length > 0;
				}
			},
			{
				type    : 'input',
				name    : 'authorEmail',
				message : 'Which is the author\'s email?',
				validate: function (answer) {
					if (!answer.match(/([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/)) {
						return 'Please provide a valid email address.';
					}

					return true;
				}
			},
			{
				type    : 'input',
				name    : 'authorUrl',
				message : 'Which is the author\'s website?',
				validate: function (answer) {
					if (!answer.match(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/)) {
						return 'Please provide a valid email address.';
					}

					return true;
				}
			}
		];

		this.prompt(prompts, function (answers) {
			this.project = answers.project;
			this.author = answers.author;
			this.authorEmail = answers.authorEmail;
			this.authorUrl = answers.authorUrl;
			this.name = answers.name;

			// Build main project class name for Joomla
			this.mainClassName = this.name.split('_');
			this.mainClassName = this.mainClassName[0] + this.mainClassName[1].capitalizeFirstLetter();

			done();
		}.bind(this));

		// Prompt independent data
		this.creationDate = d.getDate() + ' ' + d.toLocaleString('en-us', {month: "long"}) + ' ' + d.getFullYear();
		this.year = d.getFullYear();
	},
	writing  : function () {
		//this.directory(this.project.toLowerCase(), './'); // todo the native method with a callback to rename the files name

		if (this.project != 'Module') {
			this.log('Project type no yet supported. Stay tuned or join the project on Github.');
		}

		var source = this.project.toLowerCase();
		var root = this.sourceRoot() + '/' + source;
		var files = this.expandFiles('**', {dot: true, cwd: root});

		for (var i in files) {
			this.copy(source + '/' + files[i], files[i].replace(/(mod|com|plg|pkg|lib)_foobar/g, this.name));
		}
	}
});

/**
 * Return a string with the first letter capitalized.
 *
 * @returns {string}
 */
String.prototype.capitalizeFirstLetter = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};