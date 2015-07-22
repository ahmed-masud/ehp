# ehp
Simple Express HTML passthru view for those times when you need a quick static view
and express insists on jade or ejs

## Installation

	$ npm install ehp

## Features
	
	* in-memory caching of static pages

# Usage

```javascript

	app.engine('html', require('ehp'));
	app.set('view engine', 'html');
```
