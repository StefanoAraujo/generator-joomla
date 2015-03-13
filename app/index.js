var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	prompting       : function () {
		var done = this.async();
		var d = new Date();
		var projectTypes = {
			//'com': 'Component',
			'lib': 'Library',
			'mod': 'Module',
			//'pkg' : 'Package',
			'plg': 'Plugin'
			//'tpl' : 'Template'
		};

		// Initialize empty data
		this.data = {};

		// Determine the project type on the current folder name
		var defaultProjectType = this.destinationRoot().split(/\/|\\/).pop().split('_', 1)[0];

		// List all prompts
		var prompts = [
			{
				type   : 'list',
				name   : 'project',
				choices: this._getObjectValues(projectTypes),
				message: 'What\'s type of project you\'re about to create?',
				default: projectTypes[defaultProjectType] || projectTypes['mod']
			},
			{
				type   : 'list',
				name   : 'group',
				message: 'Which is the type of the plugin?',
				choices: [
					'custom',
					'authentication',
					'captcha',
					'content',
					'editors',
					'editors-xtd',
					'extension',
					'finder',
					'installer',
					'quickicon',
					'search',
					'system',
					'twofactorauth',
					'user'
				],
				when   : function (answers) {
					return answers.project == projectTypes['plg'];
				},
				default: 'custom'
			},
			{
				type    : 'input',
				name    : 'name',
				message : 'What\'s the name of the project?',
				default : this.appname, // Default to current folder name
				validate: function (answer) {
					if (!answer.match(/^(com|lib|mod|pkg|plg|tpl)_/)) {
						return 'Your project name must start with com_, lib_, mod_, pkg_, plg_ or tpl_ depending on the project type you chosen.';
					}

					return true;
				}
			},
			{
				type   : 'input',
				name   : 'description',
				message: 'A description for that project?'
			},
			{
				type    : 'input',
				name    : 'author',
				message : 'Who is the author?',
				validate: function (answer) {
					return answer.length > 0;
				},
				store   : true
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
				},
				store   : true
			},
			{
				type    : 'input',
				name    : 'authorUrl',
				message : 'Which is the author\'s website?',
				validate: function (answer) {
					if (!answer.match(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/)) {
						return 'Please provide a valid url address.';
					}

					return true;
				},
				store   : true
			},
			{
				type    : 'input',
				name    : 'languageTag',
				message : 'Which is the default language?',
				validate: function (answer) {
					if (!answer.match(/\w{2}-[A-Z]{2}/)) {
						return 'Please provide a compliant language tag (ex. en-GB).';
					}

					return true;
				},
				when    : function (answers) {
					return answers.project != projectTypes['lib'];
				},
				default : 'en-GB'
			},
			{
				type   : 'list',
				name   : 'license',
				message: 'How do you license the project?',
				choices: [
					'GNU General Public License version 2 or later'
				],
				store  : true
			},
			{
				type   : 'list',
				name   : 'updateServerType',
				message: 'Your have an update server?',
				choices: [
					'none',
					'collection',
					'extension'
				],
				when   : function (answers) {
					return answers.project == projectTypes['com'];
				},
				default: 'none'
			},
			{
				type    : 'input',
				name    : 'updateServerName',
				message : 'What\'s the update server name?',
				when    : function (answers) {
					return answers.updateServerType !== undefined && answers.updateServerType != 'none';
				},
				validate: function (answer) {
					return answer.length > 0;
				},
				store   : true
			},
			{
				type    : 'input',
				name    : 'updateServerUrl',
				message : 'What\'s the update server name?',
				when    : function (answers) {
					return answers.updateServerType !== undefined && answers.updateServerType != 'none';
				},
				validate: function (answer) {
					if (!answer.match(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/)) {
						return 'Please provide a valid url address.';
					}

					return true;
				},
				store   : true
			}
		];

		this.prompt(prompts, function (answers) {
			this.data.author = answers.author;
			this.data.authorEmail = answers.authorEmail;
			this.data.authorUrl = answers.authorUrl;
			this.data.description = answers.description;
			this.data.group = answers.group;
			this.data.languageTag = answers.languageTag;
			this.data.license = answers.license + '; see LICENSE.txt';
			this.data.name = answers.name.toLowerCase();
			this.data.project = answers.project;
			this.data.updateServerName = answers.updateServerName;
			this.data.updateServerType = answers.updateServerType;
			this.data.updateServerUrl = answers.updateServerUrl;

			// Transformations
			this.data.unprefixedName = this.data.name.split('_').slice(1).join('_');
			this.data.nameUppercase = this.data.name.toUpperCase();
			this.data.nameCamelcase = this.data.unprefixedName.capitalizeFirstLetter();

			if (this.data.group) {
				this.data.groupCamelcase = this.data.group.capitalizeFirstLetter();
			}

			done();
		}.bind(this));

		// Build the date for the manifest creation date
		this.data.creationDate = d.getDate() + ' ' + d.toLocaleString('en-us', {month: "long"}) + ' ' + d.getFullYear();
		this.data.creationYear = d.getFullYear();
	},
	writing         : function () {
		var source = this.data.project.toLowerCase();
		var root = this.sourceRoot() + '/' + source;
		var files = this.expandFiles('**', {dot: true, cwd: root});

		for (var i in files) {
			this.template(source + '/' + files[i], this._rename(files[i]), this.data);
		}
	},
	/**
	 * Replace the name of a file with all prompted placeholders.
	 *
	 * @param name The name of the path to replace.
	 * @returns {*}
	 * @private
	 */
	_rename         : function (name) {
		for (var key in this.data) {
			if (this.data.hasOwnProperty(key)) {
				name = name.replace(new RegExp(key, 'g'), this.data[key]);
			}
		}

		return name;
	},
	/**
	 * Returns the values of an objects, like associative arrays.
	 *
	 * @param obj The object to parse.
	 * @returns {Array} The list of the values.
	 * @private
	 */
	_getObjectValues: function (obj) {
		var values = [];

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				values.push(obj[key]);
			}
		}

		return values;
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