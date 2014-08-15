// Load modules

var Confidence  = require('confidence'),
    fs          = require('fs'),
    jsonFormat  = require('json-format'),
    minimist    = require('minimist'),
    path        = require('path');


// Declare internals

var internals = {};

internals.argv = minimist(process.argv.slice(2));


// Get file from flag

internals.getFile = function(key) {

    if ( !key ) {
        throw Error('Blum cannot get file without an argument key');
    }

    var filename = internals.argv[key];

    if ( !filename ) {
        throw Error('Blum requires valid -' + key + ' argument be passed');
    }

    var filepath = path.join( process.cwd(), filename );

    if ( !fs.existsSync(filepath) ) {
        throw Error('Blum cannot find module ' + internals.argv[key] + ' at - ' + filepath);
    }

    return require(filepath);

}

// Generate a Confidence style config file

internals.generateConfig = function(manifest, criteria) {

    var store = new Confidence.Store();
    store.load(manifest);
    return store.get('', criteria);
}


// FS write config.json

internals.writeConfigFile = function(config, next) {

    var filepath = path.join( process.cwd(), 'config.json' );

    fs.writeFile(filepath, jsonFormat(config), next);
}


// Generate a Confidence based confgi.json file

internals.generate = function() {

    var criteria = internals.getFile('c');
    var manifest = internals.getFile('m');
    var config   = internals.generateConfig(manifest, criteria);

    internals.writeConfigFile(config, function(err) {

        if (err) {
            throw err;
        }

        console.log('Blum successfully wrote Manifest file to ./config.json');
    });
}


module.exports = internals;

