require.config({
	baseUrl: "../js",
	urlArgs: 'cb=' + Math.random(),
	paths: {
		jquery: '../components/jquery/jquery.min',
		angular: '../components/angular/angular.min',
		spec: '../test/spec'
	},
	shim: {
		angular: {
			exports: 'angular'
		},
		jquery: {
			exports: 'jQuery'
		}
	}
});

require([ 'jquery', 'spec/index' ], function($, index) {
	var jasmineEnv = jasmine.getEnv(),
		htmlReporter = new jasmine.HtmlReporter();

	jasmineEnv.addReporter(htmlReporter);

	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};

	$(function() {
		require(index.specs, function() {
			jasmineEnv.execute();
		});
	});
});
