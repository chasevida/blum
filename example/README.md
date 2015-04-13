# Blum - example



## Command Line

Use it straight from the command line. You will see a `manifest.config.json` file is generated in this directory with the output contents.

	$ ../bin/blum -c criteria.js -m manifest.js

Run as a package script:

	$ npm install
	$ npm start


## More
To generate the alternative config available in this example add an environment variable before calling **blum**.

	$ ENVIRONMENT=production npm start

You will see that this time a `manifest.config.json` file is generated with a server port of `3000` instead of `8080` and a view options for pretty are set to `false` as opposed to `true`.