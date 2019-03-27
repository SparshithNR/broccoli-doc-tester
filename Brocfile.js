var babel = require('broccoli-babel-transpiler');
var merge = require('broccoli-merge-trees');
var EslintValidationFilter = require('broccoli-lint-eslint');
var mv = require('broccoli-stew').mv;

module.exports = merge([
  mv(babel(EslintValidationFilter.create('tests')), 'tests'),
  babel(EslintValidationFilter.create('src'))
]);
