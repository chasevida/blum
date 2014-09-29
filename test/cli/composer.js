// Load modules

var Lab      = require('lab'),
    rewire   = require('rewire'),
    sinon    = require('sinon');


var composer = rewire('../../lib/cli/composer'),
    lab      = exports.lab = Lab.script();


// BDD style shortcuts

var after      = lab.after,
    afterEach  = lab.afterEach,
    before     = lab.before,
    beforeEach = lab.beforeEach,
    describe   = lab.describe,
    expect     = Lab.expect,
    it         = lab.it;


// Load fixtures

var criteria    = require('../fixtures/criteria'),
    manifest    = require('../fixtures/manifest');


// Tests
describe('lib/cli/', function() {

    var fsRevert;
    var fsMockFalse = {
        existsSync: function() {
            return false;
        },
        writeFile: function(path, data, next) {
            next();
        }
    };
    var fsMockTrue = {
        existsSync: function() {
            return true;
        },
        writeFile: function(path, data, next) {
            next();
        }
    };

    before(function(done) {

        sinon.stub(console, 'log').returns();
        done();
    });

    after(function(done) {

        console.log.restore();
        done();
    });

    beforeEach(function(done) {

        fsRevert = composer.__set__('fs', fsMockTrue);
        done();
    });

    afterEach(function(done) {

        fsRevert();
        done();
    });

    describe('composer.getFile()', function() {

        it('should throw error without valid file path', function(done){

            fsRevert = composer.__set__('fs', fsMockFalse);

            var err;

            try {

                composer.getFile('');
            }
            catch(e) {

                err = e;
            }

            expect(err).to.be.instanceof(Error);

            fsRevert();
            done();
        });

        it('should return file content', function(done) {

            var filecontent = composer.getFile('./test/fixtures/criteria.js');

            expect(filecontent).to.equal(criteria);

            done();
        });

    });

    describe('composer.composeConfigFile()', function() {

        it('should compose a valid json file', function(done) {

            var result = composer.composeConfigFile({}, {});

            expect(result).to.be.an('object');

            result = composer.composeConfigFile(manifest, criteria);

            expect(result).to.be.an('object');
            expect(result).to.include.keys('servers');
            expect(result).to.include.keys('plugins');

            done();
        });

    });

    describe('composer.createFile()', function() {

        it('should create file', function(done) {

            var counter = 0;
            var next = function() {
                counter ++;
            };

            expect(counter).to.equal(0);

            composer.createFile('test.config.json', {}, next);

            expect(counter).to.equal(1);

            done();
        });

    });

    describe('composer.compose()', function() {

        it('should throw error when failed to write file', function(done) {

            var createFile = function(filename, config, next) {

                next(new Error());
            };

            sinon.stub(composer, 'composeConfigFile').returns({});
            sinon.stub(composer, 'createFile', createFile);
            sinon.stub(composer, 'getFile').returns({});

            expect(composer.compose).to.throw(Error);

            composer.composeConfigFile.restore();
            composer.createFile.restore();
            composer.getFile.restore();
            done();
        });

        it('should compose file', function(done) {

            var args = {
                c: './test/fixtures/criteria.js',
                m: './test/fixtures/manifest.js',
                f: 'testconfig.json'
            };

            sinon.spy(composer, 'composeConfigFile');
            sinon.spy(composer, 'createFile');
            sinon.spy(composer, 'getFile');

            expect(composer.composeConfigFile.callCount).to.equal(0);
            expect(composer.createFile.callCount).to.equal(0);
            expect(composer.getFile.callCount).to.equal(0);

            composer.compose(args);

            expect(composer.composeConfigFile.callCount).to.equal(1);
            expect(composer.createFile.callCount).to.equal(1);
            expect(composer.getFile.callCount).to.equal(2);

            composer.composeConfigFile.restore();
            composer.createFile.restore();
            composer.getFile.restore();
            done();
        });

    });

});
