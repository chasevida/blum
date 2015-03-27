# Blum

**Blum** is a configuration document generator used to create [Hapi](https://github.com/hapijs/hapi) manifest json files using [Confidence](https://github.com/hapijs/confidence). It creates a `config.json` manifest file through a npm `prestart` script that Hapi (or something else) can consume on the command line with `hapi -c config.json`.

This could be used for quick A/B testing at a high level or for simple things such as environment based server configuration.

While this was developed to be used in conjunction with a Hapi server pack it can be used anywhere to auto generate a `config.json` file based on the [Confidence](https://github.com/hapijs/confidence) style criteria.

[![Build Status](https://travis-ci.org/chasevida/blum.svg)](https://travis-ci.org/chasevida/blum)
[![Coverage Status](https://coveralls.io/repos/chasevida/blum/badge.svg?branch=master)](https://coveralls.io/r/chasevida/blum?branch=master)

## Command Line
**Blum** takes the following flag options:

*	`-c` - a *required* file path for `criteria.js` to be used by confidence.
*	`-m` - a *required* file path for `manifest.js` to be edited by confidence and consumed by Hapi.
*	`-f` - an *optional* output file name/path, defaults to `./config.json`

## Example

Use it straight from the command line:

	$ blum -c criteria.js -m manifest.js -f config.json

Use it as a script in your package.json before calling Hapi:

	"prestart":  "blum -c config/criteria.js -m config/manifest.js -f config.json"
	"start": 	"hapi -c config.json"

## More examples
There is an example directory which contains a mock `package.json` file. Running `$ npm start` from within this folder will generate a config file based on the details being passed from the `package.json` file. After it's created it will then run the Hapi pack.


You can modify these settings as you like. If you add a environment variable before the call you will see a different config file generated, this is the magic of [Confidence](https://github.com/hapijs/confidence).

## Criteria & Manifest files
Ensure that your `criteria.js` and `manifest.js` files both export a valid object that can be consumed by [Confidence](https://github.com/hapijs/confidence). Please check their docs for more details on this.

### Example Criteria.js


	module.exports = {
    	env: process.env.ENVIRONMENT
	};

### Example Manifest.js
The below example prettifies the jade html by default but when run in a production environment the html is minified.

	module.exports = {
    	servers: [{
        	port: 8080,
        	options: {
            	labels: ['web'],
            	views: {
                	path: './views',
                	engines: {
                   		jade: 'jade'
                	},
                	compileOptions: {
                    	$filter: 'env',
                    	production: {
                    	    pretty: false
                    	},
                    	$default: {
                    	    pretty: true
                    	}
                	}
            	}
        	}
    	}],
    	plugins: {}
	};
