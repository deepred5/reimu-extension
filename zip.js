const version = require('./package.json').version;
const name = require('./package.json').name;
const zipper = require('zip-local');

zipper.sync.zip("./dist").compress().save(`${name}_${version}.zip`);