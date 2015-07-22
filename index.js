// A simple pass-thru template engine for static files 

'use strict';

var fs = require('fs')
  , __VERSION_STRING = require('./package.json').version
;

/**
 * a dumb in-process cache that just grows
 */

exports.cache = {} 


exports.renderFile = function(path, cb) {
	var result;
	var cacheLocation = path + ':cache';
	if(typeof module.exports.cache[cacheLocation] === "string") {
		return cb(null, module.exports.cache[cacheLocation]);
	}
	fs.readFile(path, 'utf8', function(err, data) {
		if(err) {
			return(cb(err));
		}
		return cb(null, module.exports.cache[cacheLocation] = data);
	});
}


exports.clearCache = function() {
	exports.cache = {};
}

/** 
 * Add Express.js support.
 */


exports.__express = exports.renderFile;

exports.VERSION = __VERSION_STRING;


if(typeof window != 'undefined') {
	window.ehp = exports;
}
