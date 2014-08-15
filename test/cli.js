// Load modules

var Lab         = require('lab'),
    fs          = require('fs'),
    rewire      = require('rewire');

var blum        = rewire('../lib'),
    lab         = exports.lab = Lab.script();


// BDD style shortcuts
var describe    = lab.describe,
    it          = lab.it,
    before      = lab.before,
    beforeEach  = lab.beforeEach,
    after       = lab.after,
    expect      = Lab.expect;


// Load fixtures
var criteria    = require('./fixtures/criteria'),
    manifest    = require('./fixtures/manifest');



// Tests
describe('Blum', function() {


    it('should have cli arguments property', function(done) {

        expect( blum.argv ).to.be.a('object');
        done();
    });

    // blum.getFile()
    describe('get file', function() {

        it('should throw error when getting file without argument', function(done){

            expect( blum.getFile ).to.throw(Error);
            expect( blum.getFile ).to.throw('Blum cannot get file without an argument key');
            done();
        });

        it('should throw error when getting file with improper key', function(done) {

            var err;

            try {
                blum.getFile('d')
            } catch(e) {
                err = e;
            }

            expect( err ).to.be.instanceof(Error);
            expect( err.message ).to.equal('Blum requires valid -d argument be passed');
            done();
        });

        it('should throw error when filepath does not exist', function(done) {

            var err;
            blum.argv = {
                c: 'config/criteria.js',
                m: 'config/manifest.js'
            };

            try {
                blum.getFile('c')
            } catch(e) {
                err = e;
            }

            expect( err ).to.be.instanceof(Error);
            expect( err.message ).to.contain('Blum cannot find module config/criteria.js at -');
            done();
        });

        it('should require and return config file', function(done) {

            blum.argv = {
                c: 'test/fixtures/criteria.js',
                m: 'test/fixtures/manifest.js'
            };

            expect( blum.getFile('c') ).to.equal( criteria );
            expect( blum.getFile('m') ).to.equal( manifest );
            done();
        });

    });


    // blum.generateConfig()
    describe('generate config', function() {

        it('should create a valid json file', function(done) {

            var result = blum.generateConfig({}, {});

            expect( result ).to.be.an('object');

            // generate result based on fixture data
            result = blum.generateConfig(manifest, criteria);

            expect( result ).to.be.an('object');
            expect( result ).to.include.keys('servers');
            expect( result ).to.include.keys('plugins');

            done();
        });

    });

    // blum.writeConfigFile()
    describe('write config file', function() {


        it('wite file', function(done) {

            // fs stub
            var fsStub = {
                writeFile: function(path, data, next) {
                    next();
                }
            };

            blum.__set__('fs', fsStub);

            var counter = 0;
            var next = function() {
                counter ++;
            };

            expect(counter).to.equal(0);

            blum.writeConfigFile({}, next);

            expect(counter).to.equal(1);

            done();
        });
    
    });


    // blum.generate()
    describe('generate', function() {


        it('should throw error when failed to write file', function(done) {

            // fs stub
            var fsStub = {
                existsSync: function() {
                    return true;
                },
                writeFile: function(path, data, next) {
                    next(new Error('Write File Error'));
                }
            };

            blum.__set__('fs', fsStub);

             blum.argv = {
                c: 'test/fixtures/criteria.js',
                m: 'test/fixtures/manifest.js'
            };

            expect( blum.generate ).to.throw(Error);
            done();
        });


        it('should generate config', function(done) {

            // fs stub
            var fsStub = {
                existsSync: function() {
                    return true;
                },
                writeFile: function(path, data, next) {
                    next();
                }
            };

            blum.__set__('fs', fsStub);

            blum.argv = {
                c: 'test/fixtures/criteria.js',
                m: 'test/fixtures/manifest.js'
            };

            expect( blum.generate ).to.not.throw(Error);
            done();
        });

    });

    
        

});