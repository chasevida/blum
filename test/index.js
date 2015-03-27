// Load modules

var Code = require('code'),
    Lab  = require('lab'),
    blum = require('../lib');

var lab  = exports.lab = Lab.script();


// BDD style shortcuts
var describe = lab.describe,
    expect   = Code.expect,
    it       = lab.it;


// Tests
describe('Blum: lib', function() {


    it('should exist', function(done) {

        expect(blum).to.be.an.object();
        done();
    });

    it('should have a compose function', function(done) {

        expect(blum.compose).to.be.a.function();
        done();
    });

});
