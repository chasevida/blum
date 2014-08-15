#Blum

**Blum** is a configuration document generator used to create [Hapi](https://github.com/hapijs/hapi) manifest json files using [Confidence](https://github.com/hapijs/confidence). It creates a `config.json` manifest file through a npm `prestart` script that Hapi can consume on the command line with `hapi -c config.json`. This could be used for quick A/B testing at a high level or for simple things such as environment based server configuration. Whether this is at all a good idea, well I'm not sure.

[![Build Status](https://travis-ci.org/chasevida/blum.svg)](https://travis-ci.org/chasevida/blum)

### Command Line
**Blum** requires the following flag options be passed along:

*	`-c` - a criteria.js file to be used by confidence.
*	`-m` - a manifest.js file to be edited by confidence and consumed by Hapi.

##Example

	// form inside this module directly
	$ node index.js -c test/fixtures/criteria.js -m test/fixtures/manifest.js
	
	// external call
	& blum -c criteria.js -m manifest.js
	
	// package.json script and then run hapi
	"prestart": "blum -c config/criteria.js -m config/manifest.js"
	"start": "hapi -c config.json"
	

### Criteria & Manifest files
Ensure that your `criteria.js` and `manifest.js` files both export a valid object that can be consumed by [Confidence](https://github.com/hapijs/confidence). Please check their docs for more details on this.

#### Example Criteria.js


	module.exports = {
    	env: process.env.ENVIRONMENT
	};

#### Example Manifest.js
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