hapi-route-directory
====================

Provides a route directory for your hapi application.
```
{
	"methods": {
		"GET": [
			"/accounts",
			"/accounts/{id}",
			"/api"
		],
		"POST": [
			"/accounts"
		],
		"PUT": [
			"/accounts/{id}"
		],
		"DELETE": [
			"/accounts/{id}"
		]
	},
	"paths": [
		{
			"/accounts": [
				"GET",
				"POST"
			]
		},
		{
			"/accounts/{id}": [
				"GET",
				"PUT",
				"DELETE"
			]
		},
		{
			"/api": [
				"GET"
			]
		}
	]
}
```

# Usage

```
server.pack.register({ plugin: require('hapi-route-directory'), options: {path:'/api'}}, function(err, a){
	if (err) throw err;
} );
```
## Options
### path
This defines the route where you'd like to put your api directory (default = '/')
