/**
 * Run this to run your application.
 *
 * Everything in this file must follow es5.
 */

require('babel-register');
require('babel-preset-es2015');
var main = require('./src/main').default;

main([['Arie', 'blue'], ['Banafsheh', 'red']]);
