'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
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
			files: ['test/spec/*.js', 'js/*.js', 'test/SpecRunner.js'],
			tasks: 'exec'
		},

		exec: {
			jasmine: {
				command: 'node_modules/grunt-lib-phantomjs/node_modules/phantomjs/lib/phantom/bin/phantomjs test/lib/run-jasmine.js http://localhost:8000/test',
				stdout: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-coffee');

	grunt.registerTask('default', ['connect:test', 'exec', 'watch']);

}