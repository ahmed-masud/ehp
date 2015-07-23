// A simple pass-thru template engine for static files 

'use strict';

var fs = require('fs')
  , __VERSION_STRING = require('./package.json').version
;

/**
 * a dumb in-process cache that just grows
 */

exports.cache = {} 


exports.renderFile = function() {

	var args = Array.prototype.slice.call(arguments); /* call slice with args */
	var path = args.shift(),
		cb = args.pop(),
		data = args.shift() || {};
	
	var result;

	var cacheLocation = path + ':cache';
	if(typeof module.exports.cache[cacheLocation] === "string") {
		if ( typeof(cb) === 'function' ) {
			result = cb(null, module.exports.cache[cacheLocation]);
		}
		else result = data;
		return result;
	}
	fs.readFile(path, 'utf8', function(err, data) {
		if(err) {
			return (result = cb(err));
		}
		if ( typeof (cb) === 'function') {
			return result = cb(null, module.exports.cache[cacheLocation] = data);
		}
		else
			return result = data;
	});
	return result;
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
