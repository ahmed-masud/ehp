/* jshint mocha: true */

var ehp = require('..')
  , assert = require('assert')
  , fs = require('fs')
  , path = require('path')
  ;


/* shamelessly copied from ejs/test/ejs.js */

/**
 * Load fixture `name`.
 */

function fixture(name) {
   return fs.readFileSync('test/fixtures/' + name, 'utf8');
}


describe('testing ehp.renderFile', function() {
	it('should read a file and return its content', function(done) {
		ehp.renderFile('test/fixtures/tag.html', function(err, html) {
      if(err) {
        throw err;
      }
      assert.equal(html, fixture('tag.html'));
      done();
    });
	});
});
