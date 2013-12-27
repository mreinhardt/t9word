'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			test: {
				port: 8000,
				middleware: function(connect) {
					return [
						mountFolder(connect, 'test')
					];
				}
			}
		},

		watch: {
			jasmine: {
				files: ['test/spec/*.js', 'js/*.js', 'test/SpecRunner.js'],
				tasks: 'exec'
			},
			coffee: {
				files: ['js/*.coffee'],
				tasks: 'exec'
			}
		},

		exec: {
			bower: {
				command: 'node_modules/bower/bin/bower install'
			},
			coffee: {
				command: 'node_modules/coffee-script/bin/coffee -c -b js/'
			},
			jasmine:{
				command: 'node_modules/grunt-lib-phantomjs/node_modules/phantomjs/lib/phantom/bin/phantomjs test/lib/run-jasmine.js http://localhost:8000/test &'
			}
		}

	});

	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('default', ['connect:test', 'exec', 'watch']);
	grunt.registerTask('coffee', ['exec:coffee']);
	grunt.registerTask('bower', ['exec:bower']);

}