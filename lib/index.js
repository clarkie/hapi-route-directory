var _ = require('lodash');
var internals = {};

exports.register = function (plugin, options, next) {

	internals.path = options.path || '/';
	// allow supplying options.auth=false or other auth scheme
	// to override a default auth scheme
	internals.config = {};
	if(typeof options.auth !== 'undefined'){
		internals.config.auth = options.auth;
	}
	plugin.servers.forEach(function (server) {

		plugin.route({
			method: 'GET',
			path: internals.path,
			config: internals.config,
			handler: function(request, reply) {

			var apiDirectory = {methods: {}, paths: []};

			server.table().forEach(function(a) {

				var thisPath = a.path;
				var thisMethod = a.method.toUpperCase();

				var m = apiDirectory.methods[thisMethod] || [];
				m.push(thisPath);
				apiDirectory.methods[thisMethod] = m;

				var p = {};
				p[thisPath] = [];

				var existingPath = _.find(apiDirectory.paths, function(element, index) {
					var keys = _.keys(element);
					return keys[0] === thisPath;
				});

				if (existingPath) {
					p = existingPath;
				}

				p[thisPath].push(thisMethod);

				if (!existingPath) {
					apiDirectory.paths.push(p);
				}

			});

			// sort paths array on first key
			apiDirectory.paths.sort(function(a, b){
				return (Object.keys(a)[0] > Object.keys(b)[0]) - 0.5;
			});

			// sort each method array of paths
			_.forEach(apiDirectory.methods, function(item, index) {
				item.sort();
			});

			reply(apiDirectory);

		}});

	});

	next();

};

exports.register.attributes = {
	pkg: require('../package.json')
};
