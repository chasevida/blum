// Load modules

var Lab  = require('lab'),
    blum = require('../lib');

var lab  = exports.lab = Lab.script();


// BDD style shortcuts
var describe = lab.describe,
    expect   = Lab.expect,
    it       = lab.it;


// Tests
describe('Blum: lib', function() {


    it('should exist', function(done) {

        expect(blum).to.be.a('object');
        done();
    });

    it('should have a compose function', function(done) {

        expect(blum.compose).to.be.a('function');
        done();
    });

});
