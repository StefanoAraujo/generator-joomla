var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	prompting        : function () {
		var done = this.async();
		var d = new Date();
		var projectTypes = {
			//'com': 'Component',
			//'lib': 'Library',
			'mod' : 'Module',
			//'pkg' : 'Package',
			'plg' : 'Plugin'
			//'tpl' : 'Template'
		};
		var licenses = {
			'GNU GPL v2.0' : 'GNU General Public License version 2 or later; see LICENSE.txt'
		};

		// Determine the project type on the current folder name
		var defaultProjectType = this.destinationRoot().split(/\/|\\/).pop().split('_', 1)[0];

		// List all prompts
		var prompts = [
			{
				type    : 'list',
				name    : 'project',
				choices : this._getObjectValues(projectTypes),
				message : 'What\'s type of project you\'re about to create?',
				default : projectTypes[defaultProjectType] || projectTypes['mod']
			},
			{
				type    : 'list',
				name    : 'group',
				message : 'Which is the type of the plugin?',
				choices : [
					//'authentication',
					//'captcha',
					//'content',
					'custom'
					//'editors',
					//'editors-xtd',
					//'extension',
					//'finder',
					//'installer',
					//'quickicon',
					//'search',
					//'system',
					//'twofactorauth',
					//'user'
				],
				when    : function (answers) {
					return answers.project == projectTypes['plg'];
				},
				default : 'custom'
			},
			{
				type     : 'input',
				name     : 'name',
				message  : 'What\'s the name of the project?',
				default  : this.appname, // Default to current folder name
				validate : function (answer) {
					if (!answer.match(/^(com|lib|mod|pkg|plg|tpl)_/)) {
						return 'Your project name must start with com_, lib_, mod_, pkg_, plg_ or tpl_ depending on the project type you chosen.';
					}

					return true;
				}
			},
			{
				type    : 'input',
				name    : 'description',
				message : 'A description for that project?'
			},
			{
				type     : 'input',
				name     : 'author',
				message  : 'Who is the author?',
				validate : function (answer) {
					return answer.length > 0;
				},
				store    : true
			},
			{
				type     : 'input',
				name     : 'authorEmail',
				message  : 'Which is the author\'s email?',
				validate : function (answer) {
					if (!answer.match(/([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/)) {
						return 'Please provide a valid email address.';
					}

					return true;
				},
				store    : true
			},
			{
				type     : 'input',
				name     : 'authorUrl',
				message  : 'Which is the author\'s website?',
				validate : function (answer) {
					if (!answer.match(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/)) {
						return 'Please provide a valid email address.';
					}

					return true;
				},
				store    : true
			},
			{
				type     : 'input',
				name     : 'languageTag',
				message  : 'Which is the default language?',
				validate : function (answer) {
					if (!answer.match(/\w{2}-[A-Z]{2}/)) {
						return 'Please provide a compliant language tag (ex. en-GB).';
					}

					return true;
				},
				default  : 'en-GB'
			},
			{
				type    : 'list',
				name    : 'license',
				message : 'How do you license the project?',
				choices : Object.keys(licenses),
				default : licenses[0]
			}
		];

		this.prompt(prompts, function (answers) {
			this.author = answers.author;
			this.authorEmail = answers.authorEmail;
			this.authorUrl = answers.authorUrl;
			this.description = answers.description;
			this.group = answers.group;
			this.languageTag = answers.languageTag;
			this.name = answers.name;
			this.project = answers.project;
			this.license = licenses[answers.license];

			// Build main project class name for Joomla
			this.shortName = this.name.split('_').slice(1).join('_');
			this.className = this.realName = this.shortName.capitalizeFirstLetter();

			done();
		}.bind(this));

		// Prompt independent data
		this.creationDate = d.getDate() + ' ' + d.toLocaleString('en-us', {month : "long"}) + ' ' + d.getFullYear();
		this.year = d.getFullYear();
	},
	writing          : function () {
		var source = this.project.toLowerCase();
		var root = this.sourceRoot() + '/' + source;
		var files = this.expandFiles('**', {dot : true, cwd : root});

		for (var i in files) {
			this.copy(source + '/' + files[i], this._rename(files[i]));
		}
	},
	/**
	 * Replace the name of a file with all prompted placeholders.
	 *
	 * @param name The name of the path to replace.
	 * @returns {*}
	 * @private
	 */
	_rename          : function (name) {
		var replaces = {
			'group'       : this.group,
			'languageTag' : this.languageTag,
			'name'        : this.name,
			'shortName'   : this.shortName
		};

		for (var placeholder in replaces) {
			name = name.replace(new RegExp(placeholder, 'g'), replaces[placeholder]);
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
	_getObjectValues : function (obj) {
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