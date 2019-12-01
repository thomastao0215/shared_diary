/* eslint-disable */
import each from './each';

function _strToSnakeCase(str) {
  if (/^\d+$/.test(str)) {
    return str;
  }

  return str.replace(/[A-Z]/g, function (item) {
    return '_' + item.toLowerCase();
  });
}

function _toCamelCase(str) {
  if (/^\d+$/.test(str)) {
    return str;
  }

  return str.replace(/_[a-z]/g, function (item) {
    return item[1].toUpperCase();
  });
}

export function toSnakeCase(obj) {
  if (typeof obj === 'string') {
    return _strToSnakeCase(obj);
  }
  if (typeof obj === 'object') {
    var newObj = {};
    if (obj instanceof Array) {
      newObj = [];
    }
    each(obj, function (value, key) {
      if (typeof value === 'object') {
        newObj[_strToSnakeCase(key)] = toSnakeCase(value);
      } else {
        newObj[_strToSnakeCase(key)] = value;
      }
    });
    return newObj;
  }
  return obj;
}

export function toCamelCase(obj) {
  if (obj === null) {
    return null
  }
  if (typeof obj === 'string') {
    return _toCamelCase(obj);
  }
  if (typeof obj === 'object') {
    var newObj = {};
    if (obj instanceof Array) {
      newObj = [];
    }
    each(obj, function (value, key) {
      if (typeof value === 'object') {
        newObj[_toCamelCase(key)] = toCamelCase(value);
      } else {
        newObj[_toCamelCase(key)] = value;
      }
    });
    return newObj;
  }
  return obj;
}

export default {
  toSnakeCase,
  toCamelCase
};