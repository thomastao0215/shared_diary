/* eslint-disable */
export default function (obj, iterator, context) {
  if (obj == null) return;
  if (obj.length === +obj.length) {
    for (var i = 0, length = obj.length; i < length; i++) {
      iterator.call(context, obj[i], i, obj);
    }
  } else {
    var keys = Object.keys(obj);
    for (var _i = 0, _length = keys.length; _i < _length; _i++) {
      iterator.call(context, obj[keys[_i]], keys[_i], obj);
    }
  }
}