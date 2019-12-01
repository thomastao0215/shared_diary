/* eslint-disable */
'use strict';

exports.__esModule = true;
exports.default = get;

var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;

function isDef(val) {
  return val !== null && val !== undefined;
}

function stringToPath(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
}

function get(object, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (!object) {
    return defaultValue;
  }

  var keys = stringToPath(path);
  var result = object;

  keys.forEach(function (key) {
    result = isDef(result) && isDef(result[key]) ? result[key] : undefined;
  });

  return isDef(result) ? result : defaultValue;
}