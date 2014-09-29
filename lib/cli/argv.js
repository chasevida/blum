// Load modules

var fs    = require('fs'),
    path  = require('path'),
    yargs = require('yargs');


// Load text files

var startText = fs.readFileSync(path.join(__dirname, '../../doc/start.txt'), 'utf8'),
    usageText = fs.readFileSync(path.join(__dirname, '../../doc/usage.txt'), 'utf8');


// Export argv

exports.argv = yargs
    .usage(startText + '\n \n' + usageText)
    .option('c', {
        alias:      'criteria',
        describe:   'a criteria.js file to be used by Confidence',
        requiresArg: true,
        demand:      true
    })
    .option('m', {
        alias:      'manifest',
        describe:   'a manifest.js file to processed and consumed by Hapi',
        requiresArg: true,
        demand:      true
    })
    .option('f', {
        alias:      'filename',
        describe:   'the output path for the composed configuration json',
        requiresArg: true
    })
    .argv;
