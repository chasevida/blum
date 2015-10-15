# Blum

**Blum** is a configuration document generator used to create [Hapi](https://github.com/hapijs/hapi) manifest json files using [Confidence](https://github.com/hapijs/confidence). It creates a `manifest.config.json` file through an npm `prestart` script that [Rejoice](https://github.com/hapijs/rejoice) (the Hapi CLI) can consume on the command line with `rejoice -c manifest.config.json`.

This could be used for quick A/B testing at a high level or for simple things such as environment based server configuration.

While this was developed to be used in conjunction with a Hapi it can be used anywhere to auto generate a `configuration.json` based on the [Confidence](https://github.com/hapijs/confidence) style criteria.

[![Version npm](https://img.shields.io/npm/v/blum.svg?style=flat-square)](https://www.npmjs.com/package/blum)
[![Build Status](https://img.shields.io/travis/chasevida/blum/master.svg?style=flat-square)](https://travis-ci.org/chasevida/blum)
[![Coveralls branch](https://img.shields.io/coveralls/chasevida/blum/master.svg?style=flat-square)](https://coveralls.io/r/chasevida/blum?branch=master)
[![Dependencies](https://img.shields.io/david/chasevida/blum.svg?style=flat-square)](https://david-dm.org/chasevida/blum)

---

## Command Line
**Blum** takes the following flag options:

*	`-c` - a *required* file path for `criteria.js` to be used by confidence.
*	`-m` - a *required* file path for `manifest.js` to be edited by confidence and consumed by Hapi.
*	`-f` - an *optional* output file name/path, defaults to `./manifest.config.json`

## Example

Use it straight from the command line:

	$ blum -c criteria.js -m manifest.js -f manifest.config.json

Use it as a script in your package.json before calling Hapi:

	"prestart":  "blum -c config/criteria.js -m config/manifest.js -f config.json"
	"start": 	 "rejoice -c manifest.config.json"

## More examples
There is an example directory which contains a mock `package.json` file. Running `$ npm start` from within this folder will generate a manifest config file based on the details being passed from the `package.json` file. After it's created it will then run a Hapi server via the Rejoice CLI.


You can modify these settings as you like. If you add an environment variable before the call you will see a different manifest config file generated, this is the magic of [Confidence](https://github.com/hapijs/confidence).

## Criteria & Manifest files
Ensure that your `criteria.js` and `manifest.js` files both export a valid object that can be consumed by [Confidence](https://github.com/hapijs/confidence). Please check their docs for more details on this.

### Example Criteria.js


	module.exports = {
    	env: process.env.ENVIRONMENT
	};

### Example Manifest.js
The below example prettifies the jade html by default but when run in a production environment the html is minified.

	module.exports = {
    	connections: [
        	{
            	port: 3000,
            	labels: [
                	'http'
            	]
        	}
    	],
    	server: {},
    	plugins: {
    		visionary: {
            	engines: {
                	jade: 'jade'
            	},
            	path: './views',
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
	};
