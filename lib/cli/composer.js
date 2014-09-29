// Load modules

var Confidence  = require('confidence'),
    fs          = require('fs'),
    jsonFormat  = require('json-format'),
    path        = require('path');


// Load text files

var doneText  = fs.readFileSync(path.join(__dirname, '../../doc/done.txt'), 'utf8'),
    startText = fs.readFileSync(path.join(__dirname, '../../doc/start.txt'), 'utf8');


// Declare internals

var internals = {};

internals.getFile = function(filepath) {

    var fullpath = path.join(process.cwd(), filepath);

    if (!fs.existsSync(fullpath)) {

        var err = 'Cannot find the file \''
            + filepath
            + '\' at: '
            + fullpath;

        throw Error(err);
    }

    return require(fullpath);
};

internals.composeConfigFile = function(manifest, criteria) {

    var store = new Confidence.Store();
    store.load(manifest);
    return store.get('', criteria);
};

internals.createFile = function(filename, config, next) {

    var filepath = path.join(process.cwd(), filename);
    fs.writeFile(filepath, jsonFormat(config), next);
};

internals.compose = function(argv) {

    var args     = argv || {},
        filename = args.f || 'config.json';

    console.log(startText.replace('config.json', filename));

    var criteria = internals.getFile(args.c),
        manifest = internals.getFile(args.m);

    var config = internals.composeConfigFile(manifest, criteria);

    internals.createFile(filename, config, function(err) {

        if (err) {

            throw err;
        }

        console.log(doneText);
    });
};

module.exports = internals;
