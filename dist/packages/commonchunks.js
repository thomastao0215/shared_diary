exports.ids = ["packages/commonchunks"];
exports.modules = {

/***/ "./node_modules/underscore/underscore.js":
/*!***********************************************!*\
  !*** ./node_modules/underscore/underscore.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {}

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return _;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/packages/address/edit/api.js":
/*!******************************************!*\
  !*** ./src/packages/address/edit/api.js ***!
  \******************************************/
/*! exports provided: getAddressInfo, createAddress, updateAddress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAddressInfo", function() { return getAddressInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAddress", function() { return createAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateAddress", function() { return updateAddress; });
/* harmony import */ var weapp_zx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! weapp-zx */ "./node_modules/weapp-zx/index.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


function getAddressInfo(id) {
  return weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].get('address', id);
}
function createAddress(data) {
  return weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].get('user', 'me').then(function (res) {
    var id = res.data.id;
    return weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].create('address', _extends({}, data, {
      user_id: id,
      is_delete: false
    }));
  });
}
function updateAddress(id, data) {
  return weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].update('address', id, data);
}

/***/ }),

/***/ "./src/packages/address/edit/area.js":
/*!*******************************************!*\
  !*** ./src/packages/address/edit/area.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  province_list: {
    110000: '北京市',
    120000: '天津市',
    130000: '河北省',
    140000: '山西省',
    150000: '内蒙古自治区',
    210000: '辽宁省',
    220000: '吉林省',
    230000: '黑龙江省',
    310000: '上海市',
    320000: '江苏省',
    330000: '浙江省',
    340000: '安徽省',
    350000: '福建省',
    360000: '江西省',
    370000: '山东省',
    410000: '河南省',
    420000: '湖北省',
    430000: '湖南省',
    440000: '广东省',
    450000: '广西壮族自治区',
    460000: '海南省',
    500000: '重庆市',
    510000: '四川省',
    520000: '贵州省',
    530000: '云南省',
    540000: '西藏自治区',
    610000: '陕西省',
    620000: '甘肃省',
    630000: '青海省',
    640000: '宁夏回族自治区',
    650000: '新疆维吾尔自治区',
    710000: '台湾省',
    810000: '香港特别行政区',
    820000: '澳门特别行政区',
    900000: '海外'
  },
  city_list: {
    110100: '北京市',
    120100: '天津市',
    130100: '石家庄市',
    130200: '唐山市',
    130300: '秦皇岛市',
    130400: '邯郸市',
    130500: '邢台市',
    130600: '保定市',
    130700: '张家口市',
    130800: '承德市',
    130900: '沧州市',
    131000: '廊坊市',
    131100: '衡水市',
    140100: '太原市',
    140200: '大同市',
    140300: '阳泉市',
    140400: '长治市',
    140500: '晋城市',
    140600: '朔州市',
    140700: '晋中市',
    140800: '运城市',
    140900: '忻州市',
    141000: '临汾市',
    141100: '吕梁市',
    150100: '呼和浩特市',
    150200: '包头市',
    150300: '乌海市',
    150400: '赤峰市',
    150500: '通辽市',
    150600: '鄂尔多斯市',
    150700: '呼伦贝尔市',
    150800: '巴彦淖尔市',
    150900: '乌兰察布市',
    152200: '兴安盟',
    152500: '锡林郭勒盟',
    152900: '阿拉善盟',
    210100: '沈阳市',
    210200: '大连市',
    210300: '鞍山市',
    210400: '抚顺市',
    210500: '本溪市',
    210600: '丹东市',
    210700: '锦州市',
    210800: '营口市',
    210900: '阜新市',
    211000: '辽阳市',
    211100: '盘锦市',
    211200: '铁岭市',
    211300: '朝阳市',
    211400: '葫芦岛市',
    220100: '长春市',
    220200: '吉林市',
    220300: '四平市',
    220400: '辽源市',
    220500: '通化市',
    220600: '白山市',
    220700: '松原市',
    220800: '白城市',
    222400: '延边朝鲜族自治州',
    230100: '哈尔滨市',
    230200: '齐齐哈尔市',
    230300: '鸡西市',
    230400: '鹤岗市',
    230500: '双鸭山市',
    230600: '大庆市',
    230700: '伊春市',
    230800: '佳木斯市',
    230900: '七台河市',
    231000: '牡丹江市',
    231100: '黑河市',
    231200: '绥化市',
    232700: '大兴安岭地区',
    310100: '上海市',
    320100: '南京市',
    320200: '无锡市',
    320300: '徐州市',
    320400: '常州市',
    320500: '苏州市',
    320600: '南通市',
    320700: '连云港市',
    320800: '淮安市',
    320900: '盐城市',
    321000: '扬州市',
    321100: '镇江市',
    321200: '泰州市',
    321300: '宿迁市',
    330100: '杭州市',
    330200: '宁波市',
    330300: '温州市',
    330400: '嘉兴市',
    330500: '湖州市',
    330600: '绍兴市',
    330700: '金华市',
    330800: '衢州市',
    330900: '舟山市',
    331000: '台州市',
    331100: '丽水市',
    340100: '合肥市',
    340200: '芜湖市',
    340300: '蚌埠市',
    340400: '淮南市',
    340500: '马鞍山市',
    340600: '淮北市',
    340700: '铜陵市',
    340800: '安庆市',
    341000: '黄山市',
    341100: '滁州市',
    341200: '阜阳市',
    341300: '宿州市',
    341500: '六安市',
    341600: '亳州市',
    341700: '池州市',
    341800: '宣城市',
    350100: '福州市',
    350200: '厦门市',
    350300: '莆田市',
    350400: '三明市',
    350500: '泉州市',
    350600: '漳州市',
    350700: '南平市',
    350800: '龙岩市',
    350900: '宁德市',
    360100: '南昌市',
    360200: '景德镇市',
    360300: '萍乡市',
    360400: '九江市',
    360500: '新余市',
    360600: '鹰潭市',
    360700: '赣州市',
    360800: '吉安市',
    360900: '宜春市',
    361000: '抚州市',
    361100: '上饶市',
    370100: '济南市',
    370200: '青岛市',
    370300: '淄博市',
    370400: '枣庄市',
    370500: '东营市',
    370600: '烟台市',
    370700: '潍坊市',
    370800: '济宁市',
    370900: '泰安市',
    371000: '威海市',
    371100: '日照市',
    371200: '莱芜市',
    371300: '临沂市',
    371400: '德州市',
    371500: '聊城市',
    371600: '滨州市',
    371700: '菏泽市',
    410100: '郑州市',
    410200: '开封市',
    410300: '洛阳市',
    410400: '平顶山市',
    410500: '安阳市',
    410600: '鹤壁市',
    410700: '新乡市',
    410800: '焦作市',
    410900: '濮阳市',
    411000: '许昌市',
    411100: '漯河市',
    411200: '三门峡市',
    411300: '南阳市',
    411400: '商丘市',
    411500: '信阳市',
    411600: '周口市',
    411700: '驻马店市',
    419000: '省直辖县',
    420100: '武汉市',
    420200: '黄石市',
    420300: '十堰市',
    420500: '宜昌市',
    420600: '襄阳市',
    420700: '鄂州市',
    420800: '荆门市',
    420900: '孝感市',
    421000: '荆州市',
    421100: '黄冈市',
    421200: '咸宁市',
    421300: '随州市',
    422800: '恩施土家族苗族自治州',
    429000: '省直辖县',
    430100: '长沙市',
    430200: '株洲市',
    430300: '湘潭市',
    430400: '衡阳市',
    430500: '邵阳市',
    430600: '岳阳市',
    430700: '常德市',
    430800: '张家界市',
    430900: '益阳市',
    431000: '郴州市',
    431100: '永州市',
    431200: '怀化市',
    431300: '娄底市',
    433100: '湘西土家族苗族自治州',
    440100: '广州市',
    440200: '韶关市',
    440300: '深圳市',
    440400: '珠海市',
    440500: '汕头市',
    440600: '佛山市',
    440700: '江门市',
    440800: '湛江市',
    440900: '茂名市',
    441200: '肇庆市',
    441300: '惠州市',
    441400: '梅州市',
    441500: '汕尾市',
    441600: '河源市',
    441700: '阳江市',
    441800: '清远市',
    441900: '东莞市',
    442000: '中山市',
    445100: '潮州市',
    445200: '揭阳市',
    445300: '云浮市',
    450100: '南宁市',
    450200: '柳州市',
    450300: '桂林市',
    450400: '梧州市',
    450500: '北海市',
    450600: '防城港市',
    450700: '钦州市',
    450800: '贵港市',
    450900: '玉林市',
    451000: '百色市',
    451100: '贺州市',
    451200: '河池市',
    451300: '来宾市',
    451400: '崇左市',
    460100: '海口市',
    460200: '三亚市',
    460300: '三沙市',
    460400: '儋州市',
    469000: '省直辖县',
    500100: '重庆市',
    500200: '县',
    510100: '成都市',
    510300: '自贡市',
    510400: '攀枝花市',
    510500: '泸州市',
    510600: '德阳市',
    510700: '绵阳市',
    510800: '广元市',
    510900: '遂宁市',
    511000: '内江市',
    511100: '乐山市',
    511300: '南充市',
    511400: '眉山市',
    511500: '宜宾市',
    511600: '广安市',
    511700: '达州市',
    511800: '雅安市',
    511900: '巴中市',
    512000: '资阳市',
    513200: '阿坝藏族羌族自治州',
    513300: '甘孜藏族自治州',
    513400: '凉山彝族自治州',
    520100: '贵阳市',
    520200: '六盘水市',
    520300: '遵义市',
    520400: '安顺市',
    520500: '毕节市',
    520600: '铜仁市',
    522300: '黔西南布依族苗族自治州',
    522600: '黔东南苗族侗族自治州',
    522700: '黔南布依族苗族自治州',
    530100: '昆明市',
    530300: '曲靖市',
    530400: '玉溪市',
    530500: '保山市',
    530600: '昭通市',
    530700: '丽江市',
    530800: '普洱市',
    530900: '临沧市',
    532300: '楚雄彝族自治州',
    532500: '红河哈尼族彝族自治州',
    532600: '文山壮族苗族自治州',
    532800: '西双版纳傣族自治州',
    532900: '大理白族自治州',
    533100: '德宏傣族景颇族自治州',
    533300: '怒江傈僳族自治州',
    533400: '迪庆藏族自治州',
    540100: '拉萨市',
    540200: '日喀则市',
    540300: '昌都市',
    540400: '林芝市',
    540500: '山南市',
    540600: '那曲市',
    542500: '阿里地区',
    610100: '西安市',
    610200: '铜川市',
    610300: '宝鸡市',
    610400: '咸阳市',
    610500: '渭南市',
    610600: '延安市',
    610700: '汉中市',
    610800: '榆林市',
    610900: '安康市',
    611000: '商洛市',
    620100: '兰州市',
    620200: '嘉峪关市',
    620300: '金昌市',
    620400: '白银市',
    620500: '天水市',
    620600: '武威市',
    620700: '张掖市',
    620800: '平凉市',
    620900: '酒泉市',
    621000: '庆阳市',
    621100: '定西市',
    621200: '陇南市',
    622900: '临夏回族自治州',
    623000: '甘南藏族自治州',
    630100: '西宁市',
    630200: '海东市',
    632200: '海北藏族自治州',
    632300: '黄南藏族自治州',
    632500: '海南藏族自治州',
    632600: '果洛藏族自治州',
    632700: '玉树藏族自治州',
    632800: '海西蒙古族藏族自治州',
    640100: '银川市',
    640200: '石嘴山市',
    640300: '吴忠市',
    640400: '固原市',
    640500: '中卫市',
    650100: '乌鲁木齐市',
    650200: '克拉玛依市',
    650400: '吐鲁番市',
    650500: '哈密市',
    652300: '昌吉回族自治州',
    652700: '博尔塔拉蒙古自治州',
    652800: '巴音郭楞蒙古自治州',
    652900: '阿克苏地区',
    653000: '克孜勒苏柯尔克孜自治州',
    653100: '喀什地区',
    653200: '和田地区',
    654000: '伊犁哈萨克自治州',
    654200: '塔城地区',
    654300: '阿勒泰地区',
    659000: '自治区直辖县级行政区划',
    710100: '台北市',
    710200: '高雄市',
    710300: '台南市',
    710400: '台中市',
    710500: '金门县',
    710600: '南投县',
    710700: '基隆市',
    710800: '新竹市',
    710900: '嘉义市',
    711100: '新北市',
    711200: '宜兰县',
    711300: '新竹县',
    711400: '桃园县',
    711500: '苗栗县',
    711700: '彰化县',
    711900: '嘉义县',
    712100: '云林县',
    712400: '屏东县',
    712500: '台东县',
    712600: '花莲县',
    712700: '澎湖县',
    712800: '连江县',
    810100: '香港岛',
    810200: '九龙',
    810300: '新界',
    820100: '澳门半岛',
    820200: '离岛',
    900400: '阿富汗',
    900800: '阿尔巴尼亚',
    901000: '南极洲',
    901200: '阿尔及利亚',
    901600: '美属萨摩亚',
    902000: '安道尔',
    902400: '安哥拉',
    902800: '安提瓜和巴布达',
    903100: '阿塞拜疆',
    903200: '阿根廷',
    903600: '澳大利亚',
    904000: '奥地利',
    904400: '巴哈马',
    904800: '巴林',
    905000: '孟加拉',
    905100: '亚美尼亚',
    905200: '巴巴多斯',
    905600: '比利时',
    906000: '百慕大',
    906400: '不丹',
    906800: '玻利维亚',
    907000: '波黑',
    907200: '博茨瓦纳',
    907400: '布韦岛',
    907600: '巴西',
    908400: '伯利兹',
    908600: '英属印度洋领地',
    909000: '所罗门群岛',
    909200: '英属维尔京群岛',
    909600: '文莱',
    910000: '保加利亚',
    910400: '缅甸',
    910800: '布隆迪',
    911200: '白俄罗斯',
    911600: '柬埔寨',
    912000: '喀麦隆',
    912400: '加拿大',
    913200: '佛得角',
    913600: '开曼群岛',
    914000: '中非',
    914400: '斯里兰卡',
    914800: '乍得',
    915200: '智利',
    916200: '圣诞岛',
    916600: '科科斯群岛',
    917000: '哥伦比亚',
    917400: '科摩罗',
    917500: '马约特',
    917800: '刚果（布）',
    918000: '刚果（金）',
    918400: '库克群岛',
    918800: '哥斯达黎加',
    919100: '克罗地亚',
    919200: '古巴',
    919600: '塞浦路斯',
    920300: '捷克',
    920400: '贝宁',
    920800: '丹麦',
    921200: '多米尼克',
    921400: '多米尼加',
    921800: '厄瓜多尔',
    922200: '萨尔瓦多',
    922600: '赤道几内亚',
    923100: '埃塞俄比亚',
    923200: '厄立特里亚',
    923300: '爱沙尼亚',
    923400: '法罗群岛',
    923800: '马尔维纳斯群岛（ 福克兰）',
    923900: '南乔治亚岛和南桑威奇群岛',
    924200: '斐济群岛',
    924600: '芬兰',
    924800: '奥兰群岛',
    925000: '法国',
    925400: '法属圭亚那',
    925800: '法属波利尼西亚',
    926000: '法属南部领地',
    926200: '吉布提',
    926600: '加蓬',
    926800: '格鲁吉亚',
    927000: '冈比亚',
    927500: '巴勒斯坦',
    927600: '德国',
    928800: '加纳',
    929200: '直布罗陀',
    929600: '基里巴斯',
    930000: '希腊',
    930400: '格陵兰',
    930800: '格林纳达',
    931200: '瓜德罗普',
    931600: '关岛',
    932000: '危地马拉',
    932400: '几内亚',
    932800: '圭亚那',
    933200: '海地',
    933400: '赫德岛和麦克唐纳群岛',
    933600: '梵蒂冈',
    934000: '洪都拉斯',
    934800: '匈牙利',
    935200: '冰岛',
    935600: '印度',
    936000: '印尼',
    936400: '伊朗',
    936800: '伊拉克',
    937200: '爱尔兰',
    937600: '以色列',
    938000: '意大利',
    938400: '科特迪瓦',
    938800: '牙买加',
    939200: '日本',
    939800: '哈萨克斯坦',
    940000: '约旦',
    940400: '肯尼亚',
    940800: '朝鲜 北朝鲜',
    941000: '韩国',
    941400: '科威特',
    941700: '吉尔吉斯斯坦',
    941800: '老挝',
    942200: '黎巴嫩',
    942600: '莱索托',
    942800: '拉脱维亚',
    943000: '利比里亚',
    943400: '利比亚',
    943800: '列支敦士登',
    944000: '立陶宛',
    944200: '卢森堡',
    945000: '马达加斯加',
    945400: '马拉维',
    945800: '马来西亚',
    946200: '马尔代夫',
    946600: '马里',
    947000: '马耳他',
    947400: '马提尼克',
    947800: '毛里塔尼亚',
    948000: '毛里求斯',
    948400: '墨西哥',
    949200: '摩纳哥',
    949600: '蒙古国',
    949800: '摩尔多瓦',
    949900: '黑山',
    950000: '蒙塞拉特岛',
    950400: '摩洛哥',
    950800: '莫桑比克',
    951200: '阿曼',
    951600: '纳米比亚',
    952000: '瑙鲁',
    952400: '尼泊尔',
    952800: '荷兰',
    953300: '阿鲁巴',
    953500: '荷兰加勒比区',
    954000: '新喀里多尼亚',
    954800: '瓦努阿图',
    955400: '新西兰',
    955800: '尼加拉瓜',
    956200: '尼日尔',
    956600: '尼日利亚',
    957000: '纽埃',
    957400: '诺福克岛',
    957800: '挪威',
    958000: '北马里亚纳群岛',
    958100: '美国本土外小岛屿',
    958300: '密克罗尼西亚联邦',
    958400: '马绍尔群岛',
    958500: '帕劳',
    958600: '巴基斯坦',
    959100: '巴拿马',
    959800: '巴布亚新几内亚',
    960000: '巴拉圭',
    960400: '秘鲁',
    960800: '菲律宾',
    961200: '皮特凯恩群岛',
    961600: '波兰',
    962000: '葡萄牙',
    962400: '几内亚比绍',
    962600: '东帝汶',
    963000: '波多黎各',
    963400: '卡塔尔',
    963800: '留尼汪',
    964200: '罗马尼亚',
    964300: '俄罗斯',
    964600: '卢旺达',
    965200: '圣巴泰勒米岛',
    965400: '圣赫勒拿',
    965900: '圣基茨和尼维斯',
    966000: '安圭拉',
    966200: '圣卢西亚',
    966300: '法属圣马丁',
    966600: '圣皮埃尔和密克隆',
    967000: '圣文森特和格林纳丁斯',
    967400: '圣马力诺',
    967800: '圣多美和普林西比',
    968200: '沙特阿拉伯',
    968600: '塞内加尔',
    968800: '塞尔维亚',
    969000: '塞舌尔',
    969400: '塞拉利昂',
    970200: '新加坡',
    970300: '斯洛伐克',
    970400: '越南',
    970500: '斯洛文尼亚',
    970600: '索马里',
    971000: '南非',
    971600: '津巴布韦',
    972400: '西班牙',
    972800: '南苏丹',
    972900: '苏丹',
    973200: '西撒哈拉',
    974000: '苏里南',
    974400: '斯瓦尔巴群岛和 扬马延岛',
    974800: '斯威士兰',
    975200: '瑞典',
    975600: '瑞士',
    976000: '叙利亚',
    976200: '塔吉克斯坦',
    976400: '泰国',
    976800: '多哥',
    977200: '托克劳',
    977600: '汤加',
    978000: '特立尼达和多巴哥',
    978400: '阿联酋',
    978800: '突尼斯',
    979200: '土耳其',
    979500: '土库曼斯坦',
    979600: '特克斯和凯科斯群岛',
    979800: '图瓦卢',
    980000: '乌干达',
    980400: '乌克兰',
    980700: '马其顿',
    981800: '埃及',
    982600: '英国',
    983100: '根西岛',
    983200: '泽西岛',
    983300: '马恩岛',
    983400: '坦桑尼亚',
    984000: '美国',
    985000: '美属维尔京群岛',
    985400: '布基纳法索',
    985800: '乌拉圭',
    986000: '乌兹别克斯坦',
    986200: '委内瑞拉',
    987600: '瓦利斯和富图纳',
    988200: '萨摩亚',
    988700: '也门',
    989400: '赞比亚'
  },
  county_list: {
    110101: '东城区',
    110102: '西城区',
    110105: '朝阳区',
    110106: '丰台区',
    110107: '石景山区',
    110108: '海淀区',
    110109: '门头沟区',
    110111: '房山区',
    110112: '通州区',
    110113: '顺义区',
    110114: '昌平区',
    110115: '大兴区',
    110116: '怀柔区',
    110117: '平谷区',
    110118: '密云区',
    110119: '延庆区',
    120101: '和平区',
    120102: '河东区',
    120103: '河西区',
    120104: '南开区',
    120105: '河北区',
    120106: '红桥区',
    120110: '东丽区',
    120111: '西青区',
    120112: '津南区',
    120113: '北辰区',
    120114: '武清区',
    120115: '宝坻区',
    120116: '滨海新区',
    120117: '宁河区',
    120118: '静海区',
    120119: '蓟州区',
    130102: '长安区',
    130104: '桥西区',
    130105: '新华区',
    130107: '井陉矿区',
    130108: '裕华区',
    130109: '藁城区',
    130110: '鹿泉区',
    130111: '栾城区',
    130121: '井陉县',
    130123: '正定县',
    130125: '行唐县',
    130126: '灵寿县',
    130127: '高邑县',
    130128: '深泽县',
    130129: '赞皇县',
    130130: '无极县',
    130131: '平山县',
    130132: '元氏县',
    130133: '赵县',
    130181: '辛集市',
    130183: '晋州市',
    130184: '新乐市',
    130202: '路南区',
    130203: '路北区',
    130204: '古冶区',
    130205: '开平区',
    130207: '丰南区',
    130208: '丰润区',
    130209: '曹妃甸区',
    130224: '滦南县',
    130225: '乐亭县',
    130227: '迁西县',
    130229: '玉田县',
    130281: '遵化市',
    130283: '迁安市',
    130284: '滦州市',
    130302: '海港区',
    130303: '山海关区',
    130304: '北戴河区',
    130306: '抚宁区',
    130321: '青龙满族自治县',
    130322: '昌黎县',
    130324: '卢龙县',
    130390: '经济技术开发区',
    130402: '邯山区',
    130403: '丛台区',
    130404: '复兴区',
    130406: '峰峰矿区',
    130407: '肥乡区',
    130408: '永年区',
    130423: '临漳县',
    130424: '成安县',
    130425: '大名县',
    130426: '涉县',
    130427: '磁县',
    130430: '邱县',
    130431: '鸡泽县',
    130432: '广平县',
    130433: '馆陶县',
    130434: '魏县',
    130435: '曲周县',
    130481: '武安市',
    130502: '桥东区',
    130503: '桥西区',
    130521: '邢台县',
    130522: '临城县',
    130523: '内丘县',
    130524: '柏乡县',
    130525: '隆尧县',
    130526: '任县',
    130527: '南和县',
    130528: '宁晋县',
    130529: '巨鹿县',
    130530: '新河县',
    130531: '广宗县',
    130532: '平乡县',
    130533: '威县',
    130534: '清河县',
    130535: '临西县',
    130581: '南宫市',
    130582: '沙河市',
    130602: '竞秀区',
    130606: '莲池区',
    130607: '满城区',
    130608: '清苑区',
    130609: '徐水区',
    130623: '涞水县',
    130624: '阜平县',
    130626: '定兴县',
    130627: '唐县',
    130628: '高阳县',
    130629: '容城县',
    130630: '涞源县',
    130631: '望都县',
    130632: '安新县',
    130633: '易县',
    130634: '曲阳县',
    130635: '蠡县',
    130636: '顺平县',
    130637: '博野县',
    130638: '雄县',
    130681: '涿州市',
    130682: '定州市',
    130683: '安国市',
    130684: '高碑店市',
    130702: '桥东区',
    130703: '桥西区',
    130705: '宣化区',
    130706: '下花园区',
    130708: '万全区',
    130709: '崇礼区',
    130722: '张北县',
    130723: '康保县',
    130724: '沽源县',
    130725: '尚义县',
    130726: '蔚县',
    130727: '阳原县',
    130728: '怀安县',
    130730: '怀来县',
    130731: '涿鹿县',
    130732: '赤城县',
    130802: '双桥区',
    130803: '双滦区',
    130804: '鹰手营子矿区',
    130821: '承德县',
    130822: '兴隆县',
    130824: '滦平县',
    130825: '隆化县',
    130826: '丰宁满族自治县',
    130827: '宽城满族自治县',
    130828: '围场满族蒙古族自治县',
    130881: '平泉市',
    130902: '新华区',
    130903: '运河区',
    130921: '沧县',
    130922: '青县',
    130923: '东光县',
    130924: '海兴县',
    130925: '盐山县',
    130926: '肃宁县',
    130927: '南皮县',
    130928: '吴桥县',
    130929: '献县',
    130930: '孟村回族自治县',
    130981: '泊头市',
    130982: '任丘市',
    130983: '黄骅市',
    130984: '河间市',
    131002: '安次区',
    131003: '广阳区',
    131022: '固安县',
    131023: '永清县',
    131024: '香河县',
    131025: '大城县',
    131026: '文安县',
    131028: '大厂回族自治县',
    131081: '霸州市',
    131082: '三河市',
    131090: '开发区',
    131102: '桃城区',
    131103: '冀州区',
    131121: '枣强县',
    131122: '武邑县',
    131123: '武强县',
    131124: '饶阳县',
    131125: '安平县',
    131126: '故城县',
    131127: '景县',
    131128: '阜城县',
    131182: '深州市',
    140105: '小店区',
    140106: '迎泽区',
    140107: '杏花岭区',
    140108: '尖草坪区',
    140109: '万柏林区',
    140110: '晋源区',
    140121: '清徐县',
    140122: '阳曲县',
    140123: '娄烦县',
    140181: '古交市',
    140212: '新荣区',
    140213: '平城区',
    140214: '云冈区',
    140215: '云州区',
    140221: '阳高县',
    140222: '天镇县',
    140223: '广灵县',
    140224: '灵丘县',
    140225: '浑源县',
    140226: '左云县',
    140302: '城区',
    140303: '矿区',
    140311: '郊区',
    140321: '平定县',
    140322: '盂县',
    140403: '潞州区',
    140404: '上党区',
    140405: '屯留区',
    140406: '潞城区',
    140423: '襄垣县',
    140425: '平顺县',
    140426: '黎城县',
    140427: '壶关县',
    140428: '长子县',
    140429: '武乡县',
    140430: '沁县',
    140431: '沁源县',
    140502: '城区',
    140521: '沁水县',
    140522: '阳城县',
    140524: '陵川县',
    140525: '泽州县',
    140581: '高平市',
    140602: '朔城区',
    140603: '平鲁区',
    140621: '山阴县',
    140622: '应县',
    140623: '右玉县',
    140681: '怀仁市',
    140702: '榆次区',
    140721: '榆社县',
    140722: '左权县',
    140723: '和顺县',
    140724: '昔阳县',
    140725: '寿阳县',
    140726: '太谷县',
    140727: '祁县',
    140728: '平遥县',
    140729: '灵石县',
    140781: '介休市',
    140802: '盐湖区',
    140821: '临猗县',
    140822: '万荣县',
    140823: '闻喜县',
    140824: '稷山县',
    140825: '新绛县',
    140826: '绛县',
    140827: '垣曲县',
    140828: '夏县',
    140829: '平陆县',
    140830: '芮城县',
    140881: '永济市',
    140882: '河津市',
    140902: '忻府区',
    140921: '定襄县',
    140922: '五台县',
    140923: '代县',
    140924: '繁峙县',
    140925: '宁武县',
    140926: '静乐县',
    140927: '神池县',
    140928: '五寨县',
    140929: '岢岚县',
    140930: '河曲县',
    140931: '保德县',
    140932: '偏关县',
    140981: '原平市',
    141002: '尧都区',
    141021: '曲沃县',
    141022: '翼城县',
    141023: '襄汾县',
    141024: '洪洞县',
    141025: '古县',
    141026: '安泽县',
    141027: '浮山县',
    141028: '吉县',
    141029: '乡宁县',
    141030: '大宁县',
    141031: '隰县',
    141032: '永和县',
    141033: '蒲县',
    141034: '汾西县',
    141081: '侯马市',
    141082: '霍州市',
    141102: '离石区',
    141121: '文水县',
    141122: '交城县',
    141123: '兴县',
    141124: '临县',
    141125: '柳林县',
    141126: '石楼县',
    141127: '岚县',
    141128: '方山县',
    141129: '中阳县',
    141130: '交口县',
    141181: '孝义市',
    141182: '汾阳市',
    150102: '新城区',
    150103: '回民区',
    150104: '玉泉区',
    150105: '赛罕区',
    150121: '土默特左旗',
    150122: '托克托县',
    150123: '和林格尔县',
    150124: '清水河县',
    150125: '武川县',
    150202: '东河区',
    150203: '昆都仑区',
    150204: '青山区',
    150205: '石拐区',
    150206: '白云鄂博矿区',
    150207: '九原区',
    150221: '土默特右旗',
    150222: '固阳县',
    150223: '达尔罕茂明安联合旗',
    150302: '海勃湾区',
    150303: '海南区',
    150304: '乌达区',
    150402: '红山区',
    150403: '元宝山区',
    150404: '松山区',
    150421: '阿鲁科尔沁旗',
    150422: '巴林左旗',
    150423: '巴林右旗',
    150424: '林西县',
    150425: '克什克腾旗',
    150426: '翁牛特旗',
    150428: '喀喇沁旗',
    150429: '宁城县',
    150430: '敖汉旗',
    150502: '科尔沁区',
    150521: '科尔沁左翼中旗',
    150522: '科尔沁左翼后旗',
    150523: '开鲁县',
    150524: '库伦旗',
    150525: '奈曼旗',
    150526: '扎鲁特旗',
    150581: '霍林郭勒市',
    150602: '东胜区',
    150603: '康巴什区',
    150621: '达拉特旗',
    150622: '准格尔旗',
    150623: '鄂托克前旗',
    150624: '鄂托克旗',
    150625: '杭锦旗',
    150626: '乌审旗',
    150627: '伊金霍洛旗',
    150702: '海拉尔区',
    150703: '扎赉诺尔区',
    150721: '阿荣旗',
    150722: '莫力达瓦达斡尔族自治旗',
    150723: '鄂伦春自治旗',
    150724: '鄂温克族自治旗',
    150725: '陈巴尔虎旗',
    150726: '新巴尔虎左旗',
    150727: '新巴尔虎右旗',
    150781: '满洲里市',
    150782: '牙克石市',
    150783: '扎兰屯市',
    150784: '额尔古纳市',
    150785: '根河市',
    150802: '临河区',
    150821: '五原县',
    150822: '磴口县',
    150823: '乌拉特前旗',
    150824: '乌拉特中旗',
    150825: '乌拉特后旗',
    150826: '杭锦后旗',
    150902: '集宁区',
    150921: '卓资县',
    150922: '化德县',
    150923: '商都县',
    150924: '兴和县',
    150925: '凉城县',
    150926: '察哈尔右翼前旗',
    150927: '察哈尔右翼中旗',
    150928: '察哈尔右翼后旗',
    150929: '四子王旗',
    150981: '丰镇市',
    152201: '乌兰浩特市',
    152202: '阿尔山市',
    152221: '科尔沁右翼前旗',
    152222: '科尔沁右翼中旗',
    152223: '扎赉特旗',
    152224: '突泉县',
    152501: '二连浩特市',
    152502: '锡林浩特市',
    152522: '阿巴嘎旗',
    152523: '苏尼特左旗',
    152524: '苏尼特右旗',
    152525: '东乌珠穆沁旗',
    152526: '西乌珠穆沁旗',
    152527: '太仆寺旗',
    152528: '镶黄旗',
    152529: '正镶白旗',
    152530: '正蓝旗',
    152531: '多伦县',
    152921: '阿拉善左旗',
    152922: '阿拉善右旗',
    152923: '额济纳旗',
    210102: '和平区',
    210103: '沈河区',
    210104: '大东区',
    210105: '皇姑区',
    210106: '铁西区',
    210111: '苏家屯区',
    210112: '浑南区',
    210113: '沈北新区',
    210114: '于洪区',
    210115: '辽中区',
    210123: '康平县',
    210124: '法库县',
    210181: '新民市',
    210190: '经济技术开发区',
    210202: '中山区',
    210203: '西岗区',
    210204: '沙河口区',
    210211: '甘井子区',
    210212: '旅顺口区',
    210213: '金州区',
    210214: '普兰店区',
    210224: '长海县',
    210281: '瓦房店市',
    210283: '庄河市',
    210302: '铁东区',
    210303: '铁西区',
    210304: '立山区',
    210311: '千山区',
    210321: '台安县',
    210323: '岫岩满族自治县',
    210381: '海城市',
    210390: '高新区',
    210402: '新抚区',
    210403: '东洲区',
    210404: '望花区',
    210411: '顺城区',
    210421: '抚顺县',
    210422: '新宾满族自治县',
    210423: '清原满族自治县',
    210502: '平山区',
    210503: '溪湖区',
    210504: '明山区',
    210505: '南芬区',
    210521: '本溪满族自治县',
    210522: '桓仁满族自治县',
    210602: '元宝区',
    210603: '振兴区',
    210604: '振安区',
    210624: '宽甸满族自治县',
    210681: '东港市',
    210682: '凤城市',
    210702: '古塔区',
    210703: '凌河区',
    210711: '太和区',
    210726: '黑山县',
    210727: '义县',
    210781: '凌海市',
    210782: '北镇市',
    210793: '经济技术开发区',
    210802: '站前区',
    210803: '西市区',
    210804: '鲅鱼圈区',
    210811: '老边区',
    210881: '盖州市',
    210882: '大石桥市',
    210902: '海州区',
    210903: '新邱区',
    210904: '太平区',
    210905: '清河门区',
    210911: '细河区',
    210921: '阜新蒙古族自治县',
    210922: '彰武县',
    211002: '白塔区',
    211003: '文圣区',
    211004: '宏伟区',
    211005: '弓长岭区',
    211011: '太子河区',
    211021: '辽阳县',
    211081: '灯塔市',
    211102: '双台子区',
    211103: '兴隆台区',
    211104: '大洼区',
    211122: '盘山县',
    211202: '银州区',
    211204: '清河区',
    211221: '铁岭县',
    211223: '西丰县',
    211224: '昌图县',
    211281: '调兵山市',
    211282: '开原市',
    211302: '双塔区',
    211303: '龙城区',
    211321: '朝阳县',
    211322: '建平县',
    211324: '喀喇沁左翼蒙古族自治县',
    211381: '北票市',
    211382: '凌源市',
    211402: '连山区',
    211403: '龙港区',
    211404: '南票区',
    211421: '绥中县',
    211422: '建昌县',
    211481: '兴城市',
    220102: '南关区',
    220103: '宽城区',
    220104: '朝阳区',
    220105: '二道区',
    220106: '绿园区',
    220112: '双阳区',
    220113: '九台区',
    220122: '农安县',
    220182: '榆树市',
    220183: '德惠市',
    220192: '经济技术开发区',
    220202: '昌邑区',
    220203: '龙潭区',
    220204: '船营区',
    220211: '丰满区',
    220221: '永吉县',
    220281: '蛟河市',
    220282: '桦甸市',
    220283: '舒兰市',
    220284: '磐石市',
    220302: '铁西区',
    220303: '铁东区',
    220322: '梨树县',
    220323: '伊通满族自治县',
    220381: '公主岭市',
    220382: '双辽市',
    220402: '龙山区',
    220403: '西安区',
    220421: '东丰县',
    220422: '东辽县',
    220502: '东昌区',
    220503: '二道江区',
    220521: '通化县',
    220523: '辉南县',
    220524: '柳河县',
    220581: '梅河口市',
    220582: '集安市',
    220602: '浑江区',
    220605: '江源区',
    220621: '抚松县',
    220622: '靖宇县',
    220623: '长白朝鲜族自治县',
    220681: '临江市',
    220702: '宁江区',
    220721: '前郭尔罗斯蒙古族自治县',
    220722: '长岭县',
    220723: '乾安县',
    220781: '扶余市',
    220802: '洮北区',
    220821: '镇赉县',
    220822: '通榆县',
    220881: '洮南市',
    220882: '大安市',
    222401: '延吉市',
    222402: '图们市',
    222403: '敦化市',
    222404: '珲春市',
    222405: '龙井市',
    222406: '和龙市',
    222424: '汪清县',
    222426: '安图县',
    230102: '道里区',
    230103: '南岗区',
    230104: '道外区',
    230108: '平房区',
    230109: '松北区',
    230110: '香坊区',
    230111: '呼兰区',
    230112: '阿城区',
    230113: '双城区',
    230123: '依兰县',
    230124: '方正县',
    230125: '宾县',
    230126: '巴彦县',
    230127: '木兰县',
    230128: '通河县',
    230129: '延寿县',
    230183: '尚志市',
    230184: '五常市',
    230202: '龙沙区',
    230203: '建华区',
    230204: '铁锋区',
    230205: '昂昂溪区',
    230206: '富拉尔基区',
    230207: '碾子山区',
    230208: '梅里斯达斡尔族区',
    230221: '龙江县',
    230223: '依安县',
    230224: '泰来县',
    230225: '甘南县',
    230227: '富裕县',
    230229: '克山县',
    230230: '克东县',
    230231: '拜泉县',
    230281: '讷河市',
    230302: '鸡冠区',
    230303: '恒山区',
    230304: '滴道区',
    230305: '梨树区',
    230306: '城子河区',
    230307: '麻山区',
    230321: '鸡东县',
    230381: '虎林市',
    230382: '密山市',
    230402: '向阳区',
    230403: '工农区',
    230404: '南山区',
    230405: '兴安区',
    230406: '东山区',
    230407: '兴山区',
    230421: '萝北县',
    230422: '绥滨县',
    230502: '尖山区',
    230503: '岭东区',
    230505: '四方台区',
    230506: '宝山区',
    230521: '集贤县',
    230522: '友谊县',
    230523: '宝清县',
    230524: '饶河县',
    230602: '萨尔图区',
    230603: '龙凤区',
    230604: '让胡路区',
    230605: '红岗区',
    230606: '大同区',
    230621: '肇州县',
    230622: '肇源县',
    230623: '林甸县',
    230624: '杜尔伯特蒙古族自治县',
    230702: '伊春区',
    230703: '南岔区',
    230704: '友好区',
    230705: '西林区',
    230706: '翠峦区',
    230707: '新青区',
    230708: '美溪区',
    230709: '金山屯区',
    230710: '五营区',
    230711: '乌马河区',
    230712: '汤旺河区',
    230713: '带岭区',
    230714: '乌伊岭区',
    230715: '红星区',
    230716: '上甘岭区',
    230722: '嘉荫县',
    230781: '铁力市',
    230803: '向阳区',
    230804: '前进区',
    230805: '东风区',
    230811: '郊区',
    230822: '桦南县',
    230826: '桦川县',
    230828: '汤原县',
    230881: '同江市',
    230882: '富锦市',
    230883: '抚远市',
    230902: '新兴区',
    230903: '桃山区',
    230904: '茄子河区',
    230921: '勃利县',
    231002: '东安区',
    231003: '阳明区',
    231004: '爱民区',
    231005: '西安区',
    231025: '林口县',
    231081: '绥芬河市',
    231083: '海林市',
    231084: '宁安市',
    231085: '穆棱市',
    231086: '东宁市',
    231102: '爱辉区',
    231121: '嫩江县',
    231123: '逊克县',
    231124: '孙吴县',
    231181: '北安市',
    231182: '五大连池市',
    231202: '北林区',
    231221: '望奎县',
    231222: '兰西县',
    231223: '青冈县',
    231224: '庆安县',
    231225: '明水县',
    231226: '绥棱县',
    231281: '安达市',
    231282: '肇东市',
    231283: '海伦市',
    232701: '漠河市',
    232721: '呼玛县',
    232722: '塔河县',
    232790: '松岭区',
    232791: '呼中区',
    232792: '加格达奇区',
    232793: '新林区',
    310101: '黄浦区',
    310104: '徐汇区',
    310105: '长宁区',
    310106: '静安区',
    310107: '普陀区',
    310109: '虹口区',
    310110: '杨浦区',
    310112: '闵行区',
    310113: '宝山区',
    310114: '嘉定区',
    310115: '浦东新区',
    310116: '金山区',
    310117: '松江区',
    310118: '青浦区',
    310120: '奉贤区',
    310151: '崇明区',
    320102: '玄武区',
    320104: '秦淮区',
    320105: '建邺区',
    320106: '鼓楼区',
    320111: '浦口区',
    320113: '栖霞区',
    320114: '雨花台区',
    320115: '江宁区',
    320116: '六合区',
    320117: '溧水区',
    320118: '高淳区',
    320205: '锡山区',
    320206: '惠山区',
    320211: '滨湖区',
    320213: '梁溪区',
    320214: '新吴区',
    320281: '江阴市',
    320282: '宜兴市',
    320302: '鼓楼区',
    320303: '云龙区',
    320305: '贾汪区',
    320311: '泉山区',
    320312: '铜山区',
    320321: '丰县',
    320322: '沛县',
    320324: '睢宁县',
    320381: '新沂市',
    320382: '邳州市',
    320391: '工业园区',
    320402: '天宁区',
    320404: '钟楼区',
    320411: '新北区',
    320412: '武进区',
    320413: '金坛区',
    320481: '溧阳市',
    320505: '虎丘区',
    320506: '吴中区',
    320507: '相城区',
    320508: '姑苏区',
    320509: '吴江区',
    320581: '常熟市',
    320582: '张家港市',
    320583: '昆山市',
    320585: '太仓市',
    320590: '工业园区',
    320591: '高新区',
    320602: '崇川区',
    320611: '港闸区',
    320612: '通州区',
    320623: '如东县',
    320681: '启东市',
    320682: '如皋市',
    320684: '海门市',
    320685: '海安市',
    320691: '高新区',
    320703: '连云区',
    320706: '海州区',
    320707: '赣榆区',
    320722: '东海县',
    320723: '灌云县',
    320724: '灌南县',
    320803: '淮安区',
    320804: '淮阴区',
    320812: '清江浦区',
    320813: '洪泽区',
    320826: '涟水县',
    320830: '盱眙县',
    320831: '金湖县',
    320890: '经济开发区',
    320902: '亭湖区',
    320903: '盐都区',
    320904: '大丰区',
    320921: '响水县',
    320922: '滨海县',
    320923: '阜宁县',
    320924: '射阳县',
    320925: '建湖县',
    320981: '东台市',
    321002: '广陵区',
    321003: '邗江区',
    321012: '江都区',
    321023: '宝应县',
    321081: '仪征市',
    321084: '高邮市',
    321090: '经济开发区',
    321102: '京口区',
    321111: '润州区',
    321112: '丹徒区',
    321181: '丹阳市',
    321182: '扬中市',
    321183: '句容市',
    321202: '海陵区',
    321203: '高港区',
    321204: '姜堰区',
    321281: '兴化市',
    321282: '靖江市',
    321283: '泰兴市',
    321302: '宿城区',
    321311: '宿豫区',
    321322: '沭阳县',
    321323: '泗阳县',
    321324: '泗洪县',
    330102: '上城区',
    330103: '下城区',
    330104: '江干区',
    330105: '拱墅区',
    330106: '西湖区',
    330108: '滨江区',
    330109: '萧山区',
    330110: '余杭区',
    330111: '富阳区',
    330112: '临安区',
    330122: '桐庐县',
    330127: '淳安县',
    330182: '建德市',
    330203: '海曙区',
    330205: '江北区',
    330206: '北仑区',
    330211: '镇海区',
    330212: '鄞州区',
    330213: '奉化区',
    330225: '象山县',
    330226: '宁海县',
    330281: '余姚市',
    330282: '慈溪市',
    330302: '鹿城区',
    330303: '龙湾区',
    330304: '瓯海区',
    330305: '洞头区',
    330324: '永嘉县',
    330326: '平阳县',
    330327: '苍南县',
    330328: '文成县',
    330329: '泰顺县',
    330381: '瑞安市',
    330382: '乐清市',
    330402: '南湖区',
    330411: '秀洲区',
    330421: '嘉善县',
    330424: '海盐县',
    330481: '海宁市',
    330482: '平湖市',
    330483: '桐乡市',
    330502: '吴兴区',
    330503: '南浔区',
    330521: '德清县',
    330522: '长兴县',
    330523: '安吉县',
    330602: '越城区',
    330603: '柯桥区',
    330604: '上虞区',
    330624: '新昌县',
    330681: '诸暨市',
    330683: '嵊州市',
    330702: '婺城区',
    330703: '金东区',
    330723: '武义县',
    330726: '浦江县',
    330727: '磐安县',
    330781: '兰溪市',
    330782: '义乌市',
    330783: '东阳市',
    330784: '永康市',
    330802: '柯城区',
    330803: '衢江区',
    330822: '常山县',
    330824: '开化县',
    330825: '龙游县',
    330881: '江山市',
    330902: '定海区',
    330903: '普陀区',
    330921: '岱山县',
    330922: '嵊泗县',
    331002: '椒江区',
    331003: '黄岩区',
    331004: '路桥区',
    331022: '三门县',
    331023: '天台县',
    331024: '仙居县',
    331081: '温岭市',
    331082: '临海市',
    331083: '玉环市',
    331102: '莲都区',
    331121: '青田县',
    331122: '缙云县',
    331123: '遂昌县',
    331124: '松阳县',
    331125: '云和县',
    331126: '庆元县',
    331127: '景宁畲族自治县',
    331181: '龙泉市',
    340102: '瑶海区',
    340103: '庐阳区',
    340104: '蜀山区',
    340111: '包河区',
    340121: '长丰县',
    340122: '肥东县',
    340123: '肥西县',
    340124: '庐江县',
    340181: '巢湖市',
    340190: '高新技术开发区',
    340191: '经济技术开发区',
    340202: '镜湖区',
    340203: '弋江区',
    340207: '鸠江区',
    340208: '三山区',
    340221: '芜湖县',
    340222: '繁昌县',
    340223: '南陵县',
    340225: '无为县',
    340302: '龙子湖区',
    340303: '蚌山区',
    340304: '禹会区',
    340311: '淮上区',
    340321: '怀远县',
    340322: '五河县',
    340323: '固镇县',
    340402: '大通区',
    340403: '田家庵区',
    340404: '谢家集区',
    340405: '八公山区',
    340406: '潘集区',
    340421: '凤台县',
    340422: '寿县',
    340503: '花山区',
    340504: '雨山区',
    340506: '博望区',
    340521: '当涂县',
    340522: '含山县',
    340523: '和县',
    340602: '杜集区',
    340603: '相山区',
    340604: '烈山区',
    340621: '濉溪县',
    340705: '铜官区',
    340706: '义安区',
    340711: '郊区',
    340722: '枞阳县',
    340802: '迎江区',
    340803: '大观区',
    340811: '宜秀区',
    340822: '怀宁县',
    340824: '潜山县',
    340825: '太湖县',
    340826: '宿松县',
    340827: '望江县',
    340828: '岳西县',
    340881: '桐城市',
    341002: '屯溪区',
    341003: '黄山区',
    341004: '徽州区',
    341021: '歙县',
    341022: '休宁县',
    341023: '黟县',
    341024: '祁门县',
    341102: '琅琊区',
    341103: '南谯区',
    341122: '来安县',
    341124: '全椒县',
    341125: '定远县',
    341126: '凤阳县',
    341181: '天长市',
    341182: '明光市',
    341202: '颍州区',
    341203: '颍东区',
    341204: '颍泉区',
    341221: '临泉县',
    341222: '太和县',
    341225: '阜南县',
    341226: '颍上县',
    341282: '界首市',
    341302: '埇桥区',
    341321: '砀山县',
    341322: '萧县',
    341323: '灵璧县',
    341324: '泗县',
    341390: '经济开发区',
    341502: '金安区',
    341503: '裕安区',
    341504: '叶集区',
    341522: '霍邱县',
    341523: '舒城县',
    341524: '金寨县',
    341525: '霍山县',
    341602: '谯城区',
    341621: '涡阳县',
    341622: '蒙城县',
    341623: '利辛县',
    341702: '贵池区',
    341721: '东至县',
    341722: '石台县',
    341723: '青阳县',
    341802: '宣州区',
    341821: '郎溪县',
    341822: '广德县',
    341823: '泾县',
    341824: '绩溪县',
    341825: '旌德县',
    341881: '宁国市',
    350102: '鼓楼区',
    350103: '台江区',
    350104: '仓山区',
    350105: '马尾区',
    350111: '晋安区',
    350112: '长乐区',
    350121: '闽侯县',
    350122: '连江县',
    350123: '罗源县',
    350124: '闽清县',
    350125: '永泰县',
    350128: '平潭县',
    350181: '福清市',
    350203: '思明区',
    350205: '海沧区',
    350206: '湖里区',
    350211: '集美区',
    350212: '同安区',
    350213: '翔安区',
    350302: '城厢区',
    350303: '涵江区',
    350304: '荔城区',
    350305: '秀屿区',
    350322: '仙游县',
    350402: '梅列区',
    350403: '三元区',
    350421: '明溪县',
    350423: '清流县',
    350424: '宁化县',
    350425: '大田县',
    350426: '尤溪县',
    350427: '沙县',
    350428: '将乐县',
    350429: '泰宁县',
    350430: '建宁县',
    350481: '永安市',
    350502: '鲤城区',
    350503: '丰泽区',
    350504: '洛江区',
    350505: '泉港区',
    350521: '惠安县',
    350524: '安溪县',
    350525: '永春县',
    350526: '德化县',
    350527: '金门县',
    350581: '石狮市',
    350582: '晋江市',
    350583: '南安市',
    350602: '芗城区',
    350603: '龙文区',
    350622: '云霄县',
    350623: '漳浦县',
    350624: '诏安县',
    350625: '长泰县',
    350626: '东山县',
    350627: '南靖县',
    350628: '平和县',
    350629: '华安县',
    350681: '龙海市',
    350702: '延平区',
    350703: '建阳区',
    350721: '顺昌县',
    350722: '浦城县',
    350723: '光泽县',
    350724: '松溪县',
    350725: '政和县',
    350781: '邵武市',
    350782: '武夷山市',
    350783: '建瓯市',
    350802: '新罗区',
    350803: '永定区',
    350821: '长汀县',
    350823: '上杭县',
    350824: '武平县',
    350825: '连城县',
    350881: '漳平市',
    350902: '蕉城区',
    350921: '霞浦县',
    350922: '古田县',
    350923: '屏南县',
    350924: '寿宁县',
    350925: '周宁县',
    350926: '柘荣县',
    350981: '福安市',
    350982: '福鼎市',
    360102: '东湖区',
    360103: '西湖区',
    360104: '青云谱区',
    360105: '湾里区',
    360111: '青山湖区',
    360112: '新建区',
    360121: '南昌县',
    360123: '安义县',
    360124: '进贤县',
    360190: '经济技术开发区',
    360192: '高新区',
    360202: '昌江区',
    360203: '珠山区',
    360222: '浮梁县',
    360281: '乐平市',
    360302: '安源区',
    360313: '湘东区',
    360321: '莲花县',
    360322: '上栗县',
    360323: '芦溪县',
    360402: '濂溪区',
    360403: '浔阳区',
    360404: '柴桑区',
    360423: '武宁县',
    360424: '修水县',
    360425: '永修县',
    360426: '德安县',
    360428: '都昌县',
    360429: '湖口县',
    360430: '彭泽县',
    360481: '瑞昌市',
    360482: '共青城市',
    360483: '庐山市',
    360490: '经济技术开发区',
    360502: '渝水区',
    360521: '分宜县',
    360602: '月湖区',
    360603: '余江区',
    360681: '贵溪市',
    360702: '章贡区',
    360703: '南康区',
    360704: '赣县区',
    360722: '信丰县',
    360723: '大余县',
    360724: '上犹县',
    360725: '崇义县',
    360726: '安远县',
    360727: '龙南县',
    360728: '定南县',
    360729: '全南县',
    360730: '宁都县',
    360731: '于都县',
    360732: '兴国县',
    360733: '会昌县',
    360734: '寻乌县',
    360735: '石城县',
    360781: '瑞金市',
    360802: '吉州区',
    360803: '青原区',
    360821: '吉安县',
    360822: '吉水县',
    360823: '峡江县',
    360824: '新干县',
    360825: '永丰县',
    360826: '泰和县',
    360827: '遂川县',
    360828: '万安县',
    360829: '安福县',
    360830: '永新县',
    360881: '井冈山市',
    360902: '袁州区',
    360921: '奉新县',
    360922: '万载县',
    360923: '上高县',
    360924: '宜丰县',
    360925: '靖安县',
    360926: '铜鼓县',
    360981: '丰城市',
    360982: '樟树市',
    360983: '高安市',
    361002: '临川区',
    361003: '东乡区',
    361021: '南城县',
    361022: '黎川县',
    361023: '南丰县',
    361024: '崇仁县',
    361025: '乐安县',
    361026: '宜黄县',
    361027: '金溪县',
    361028: '资溪县',
    361030: '广昌县',
    361102: '信州区',
    361103: '广丰区',
    361121: '上饶县',
    361123: '玉山县',
    361124: '铅山县',
    361125: '横峰县',
    361126: '弋阳县',
    361127: '余干县',
    361128: '鄱阳县',
    361129: '万年县',
    361130: '婺源县',
    361181: '德兴市',
    370102: '历下区',
    370103: '市中区',
    370104: '槐荫区',
    370105: '天桥区',
    370112: '历城区',
    370113: '长清区',
    370114: '章丘区',
    370115: '济阳区',
    370124: '平阴县',
    370126: '商河县',
    370190: '高新区',
    370202: '市南区',
    370203: '市北区',
    370211: '黄岛区',
    370212: '崂山区',
    370213: '李沧区',
    370214: '城阳区',
    370215: '即墨区',
    370281: '胶州市',
    370283: '平度市',
    370285: '莱西市',
    370290: '开发区',
    370302: '淄川区',
    370303: '张店区',
    370304: '博山区',
    370305: '临淄区',
    370306: '周村区',
    370321: '桓台县',
    370322: '高青县',
    370323: '沂源县',
    370402: '市中区',
    370403: '薛城区',
    370404: '峄城区',
    370405: '台儿庄区',
    370406: '山亭区',
    370481: '滕州市',
    370502: '东营区',
    370503: '河口区',
    370505: '垦利区',
    370522: '利津县',
    370523: '广饶县',
    370602: '芝罘区',
    370611: '福山区',
    370612: '牟平区',
    370613: '莱山区',
    370634: '长岛县',
    370681: '龙口市',
    370682: '莱阳市',
    370683: '莱州市',
    370684: '蓬莱市',
    370685: '招远市',
    370686: '栖霞市',
    370687: '海阳市',
    370690: '开发区',
    370702: '潍城区',
    370703: '寒亭区',
    370704: '坊子区',
    370705: '奎文区',
    370724: '临朐县',
    370725: '昌乐县',
    370781: '青州市',
    370782: '诸城市',
    370783: '寿光市',
    370784: '安丘市',
    370785: '高密市',
    370786: '昌邑市',
    370790: '开发区',
    370791: '高新区',
    370811: '任城区',
    370812: '兖州区',
    370826: '微山县',
    370827: '鱼台县',
    370828: '金乡县',
    370829: '嘉祥县',
    370830: '汶上县',
    370831: '泗水县',
    370832: '梁山县',
    370881: '曲阜市',
    370883: '邹城市',
    370890: '高新区',
    370902: '泰山区',
    370911: '岱岳区',
    370921: '宁阳县',
    370923: '东平县',
    370982: '新泰市',
    370983: '肥城市',
    371002: '环翠区',
    371003: '文登区',
    371082: '荣成市',
    371083: '乳山市',
    371091: '经济技术开发区',
    371102: '东港区',
    371103: '岚山区',
    371121: '五莲县',
    371122: '莒县',
    371202: '莱城区',
    371203: '钢城区',
    371302: '兰山区',
    371311: '罗庄区',
    371312: '河东区',
    371321: '沂南县',
    371322: '郯城县',
    371323: '沂水县',
    371324: '兰陵县',
    371325: '费县',
    371326: '平邑县',
    371327: '莒南县',
    371328: '蒙阴县',
    371329: '临沭县',
    371402: '德城区',
    371403: '陵城区',
    371422: '宁津县',
    371423: '庆云县',
    371424: '临邑县',
    371425: '齐河县',
    371426: '平原县',
    371427: '夏津县',
    371428: '武城县',
    371481: '乐陵市',
    371482: '禹城市',
    371502: '东昌府区',
    371521: '阳谷县',
    371522: '莘县',
    371523: '茌平县',
    371524: '东阿县',
    371525: '冠县',
    371526: '高唐县',
    371581: '临清市',
    371602: '滨城区',
    371603: '沾化区',
    371621: '惠民县',
    371622: '阳信县',
    371623: '无棣县',
    371625: '博兴县',
    371681: '邹平市',
    371702: '牡丹区',
    371703: '定陶区',
    371721: '曹县',
    371722: '单县',
    371723: '成武县',
    371724: '巨野县',
    371725: '郓城县',
    371726: '鄄城县',
    371728: '东明县',
    410102: '中原区',
    410103: '二七区',
    410104: '管城回族区',
    410105: '金水区',
    410106: '上街区',
    410108: '惠济区',
    410122: '中牟县',
    410181: '巩义市',
    410182: '荥阳市',
    410183: '新密市',
    410184: '新郑市',
    410185: '登封市',
    410190: '高新技术开发区',
    410191: '经济技术开发区',
    410202: '龙亭区',
    410203: '顺河回族区',
    410204: '鼓楼区',
    410205: '禹王台区',
    410212: '祥符区',
    410221: '杞县',
    410222: '通许县',
    410223: '尉氏县',
    410225: '兰考县',
    410302: '老城区',
    410303: '西工区',
    410304: '瀍河回族区',
    410305: '涧西区',
    410306: '吉利区',
    410311: '洛龙区',
    410322: '孟津县',
    410323: '新安县',
    410324: '栾川县',
    410325: '嵩县',
    410326: '汝阳县',
    410327: '宜阳县',
    410328: '洛宁县',
    410329: '伊川县',
    410381: '偃师市',
    410402: '新华区',
    410403: '卫东区',
    410404: '石龙区',
    410411: '湛河区',
    410421: '宝丰县',
    410422: '叶县',
    410423: '鲁山县',
    410425: '郏县',
    410481: '舞钢市',
    410482: '汝州市',
    410502: '文峰区',
    410503: '北关区',
    410505: '殷都区',
    410506: '龙安区',
    410522: '安阳县',
    410523: '汤阴县',
    410526: '滑县',
    410527: '内黄县',
    410581: '林州市',
    410590: '开发区',
    410602: '鹤山区',
    410603: '山城区',
    410611: '淇滨区',
    410621: '浚县',
    410622: '淇县',
    410702: '红旗区',
    410703: '卫滨区',
    410704: '凤泉区',
    410711: '牧野区',
    410721: '新乡县',
    410724: '获嘉县',
    410725: '原阳县',
    410726: '延津县',
    410727: '封丘县',
    410728: '长垣县',
    410781: '卫辉市',
    410782: '辉县市',
    410802: '解放区',
    410803: '中站区',
    410804: '马村区',
    410811: '山阳区',
    410821: '修武县',
    410822: '博爱县',
    410823: '武陟县',
    410825: '温县',
    410882: '沁阳市',
    410883: '孟州市',
    410902: '华龙区',
    410922: '清丰县',
    410923: '南乐县',
    410926: '范县',
    410927: '台前县',
    410928: '濮阳县',
    411002: '魏都区',
    411003: '建安区',
    411024: '鄢陵县',
    411025: '襄城县',
    411081: '禹州市',
    411082: '长葛市',
    411102: '源汇区',
    411103: '郾城区',
    411104: '召陵区',
    411121: '舞阳县',
    411122: '临颍县',
    411202: '湖滨区',
    411203: '陕州区',
    411221: '渑池县',
    411224: '卢氏县',
    411281: '义马市',
    411282: '灵宝市',
    411302: '宛城区',
    411303: '卧龙区',
    411321: '南召县',
    411322: '方城县',
    411323: '西峡县',
    411324: '镇平县',
    411325: '内乡县',
    411326: '淅川县',
    411327: '社旗县',
    411328: '唐河县',
    411329: '新野县',
    411330: '桐柏县',
    411381: '邓州市',
    411402: '梁园区',
    411403: '睢阳区',
    411421: '民权县',
    411422: '睢县',
    411423: '宁陵县',
    411424: '柘城县',
    411425: '虞城县',
    411426: '夏邑县',
    411481: '永城市',
    411502: '浉河区',
    411503: '平桥区',
    411521: '罗山县',
    411522: '光山县',
    411523: '新县',
    411524: '商城县',
    411525: '固始县',
    411526: '潢川县',
    411527: '淮滨县',
    411528: '息县',
    411602: '川汇区',
    411621: '扶沟县',
    411622: '西华县',
    411623: '商水县',
    411624: '沈丘县',
    411625: '郸城县',
    411626: '淮阳县',
    411627: '太康县',
    411628: '鹿邑县',
    411681: '项城市',
    411690: '经济开发区',
    411702: '驿城区',
    411721: '西平县',
    411722: '上蔡县',
    411723: '平舆县',
    411724: '正阳县',
    411725: '确山县',
    411726: '泌阳县',
    411727: '汝南县',
    411728: '遂平县',
    411729: '新蔡县',
    419001: '济源市',
    420102: '江岸区',
    420103: '江汉区',
    420104: '硚口区',
    420105: '汉阳区',
    420106: '武昌区',
    420107: '青山区',
    420111: '洪山区',
    420112: '东西湖区',
    420113: '汉南区',
    420114: '蔡甸区',
    420115: '江夏区',
    420116: '黄陂区',
    420117: '新洲区',
    420202: '黄石港区',
    420203: '西塞山区',
    420204: '下陆区',
    420205: '铁山区',
    420222: '阳新县',
    420281: '大冶市',
    420302: '茅箭区',
    420303: '张湾区',
    420304: '郧阳区',
    420322: '郧西县',
    420323: '竹山县',
    420324: '竹溪县',
    420325: '房县',
    420381: '丹江口市',
    420502: '西陵区',
    420503: '伍家岗区',
    420504: '点军区',
    420505: '猇亭区',
    420506: '夷陵区',
    420525: '远安县',
    420526: '兴山县',
    420527: '秭归县',
    420528: '长阳土家族自治县',
    420529: '五峰土家族自治县',
    420581: '宜都市',
    420582: '当阳市',
    420583: '枝江市',
    420590: '经济开发区',
    420602: '襄城区',
    420606: '樊城区',
    420607: '襄州区',
    420624: '南漳县',
    420625: '谷城县',
    420626: '保康县',
    420682: '老河口市',
    420683: '枣阳市',
    420684: '宜城市',
    420702: '梁子湖区',
    420703: '华容区',
    420704: '鄂城区',
    420802: '东宝区',
    420804: '掇刀区',
    420822: '沙洋县',
    420881: '钟祥市',
    420882: '京山市',
    420902: '孝南区',
    420921: '孝昌县',
    420922: '大悟县',
    420923: '云梦县',
    420981: '应城市',
    420982: '安陆市',
    420984: '汉川市',
    421002: '沙市区',
    421003: '荆州区',
    421022: '公安县',
    421023: '监利县',
    421024: '江陵县',
    421081: '石首市',
    421083: '洪湖市',
    421087: '松滋市',
    421102: '黄州区',
    421121: '团风县',
    421122: '红安县',
    421123: '罗田县',
    421124: '英山县',
    421125: '浠水县',
    421126: '蕲春县',
    421127: '黄梅县',
    421181: '麻城市',
    421182: '武穴市',
    421202: '咸安区',
    421221: '嘉鱼县',
    421222: '通城县',
    421223: '崇阳县',
    421224: '通山县',
    421281: '赤壁市',
    421303: '曾都区',
    421321: '随县',
    421381: '广水市',
    422801: '恩施市',
    422802: '利川市',
    422822: '建始县',
    422823: '巴东县',
    422825: '宣恩县',
    422826: '咸丰县',
    422827: '来凤县',
    422828: '鹤峰县',
    429004: '仙桃市',
    429005: '潜江市',
    429006: '天门市',
    429021: '神农架林区',
    430102: '芙蓉区',
    430103: '天心区',
    430104: '岳麓区',
    430105: '开福区',
    430111: '雨花区',
    430112: '望城区',
    430121: '长沙县',
    430181: '浏阳市',
    430182: '宁乡市',
    430202: '荷塘区',
    430203: '芦淞区',
    430204: '石峰区',
    430211: '天元区',
    430212: '渌口区',
    430223: '攸县',
    430224: '茶陵县',
    430225: '炎陵县',
    430281: '醴陵市',
    430302: '雨湖区',
    430304: '岳塘区',
    430321: '湘潭县',
    430381: '湘乡市',
    430382: '韶山市',
    430405: '珠晖区',
    430406: '雁峰区',
    430407: '石鼓区',
    430408: '蒸湘区',
    430412: '南岳区',
    430421: '衡阳县',
    430422: '衡南县',
    430423: '衡山县',
    430424: '衡东县',
    430426: '祁东县',
    430481: '耒阳市',
    430482: '常宁市',
    430502: '双清区',
    430503: '大祥区',
    430511: '北塔区',
    430521: '邵东县',
    430522: '新邵县',
    430523: '邵阳县',
    430524: '隆回县',
    430525: '洞口县',
    430527: '绥宁县',
    430528: '新宁县',
    430529: '城步苗族自治县',
    430581: '武冈市',
    430602: '岳阳楼区',
    430603: '云溪区',
    430611: '君山区',
    430621: '岳阳县',
    430623: '华容县',
    430624: '湘阴县',
    430626: '平江县',
    430681: '汨罗市',
    430682: '临湘市',
    430702: '武陵区',
    430703: '鼎城区',
    430721: '安乡县',
    430722: '汉寿县',
    430723: '澧县',
    430724: '临澧县',
    430725: '桃源县',
    430726: '石门县',
    430781: '津市市',
    430802: '永定区',
    430811: '武陵源区',
    430821: '慈利县',
    430822: '桑植县',
    430902: '资阳区',
    430903: '赫山区',
    430921: '南县',
    430922: '桃江县',
    430923: '安化县',
    430981: '沅江市',
    431002: '北湖区',
    431003: '苏仙区',
    431021: '桂阳县',
    431022: '宜章县',
    431023: '永兴县',
    431024: '嘉禾县',
    431025: '临武县',
    431026: '汝城县',
    431027: '桂东县',
    431028: '安仁县',
    431081: '资兴市',
    431102: '零陵区',
    431103: '冷水滩区',
    431121: '祁阳县',
    431122: '东安县',
    431123: '双牌县',
    431124: '道县',
    431125: '江永县',
    431126: '宁远县',
    431127: '蓝山县',
    431128: '新田县',
    431129: '江华瑶族自治县',
    431202: '鹤城区',
    431221: '中方县',
    431222: '沅陵县',
    431223: '辰溪县',
    431224: '溆浦县',
    431225: '会同县',
    431226: '麻阳苗族自治县',
    431227: '新晃侗族自治县',
    431228: '芷江侗族自治县',
    431229: '靖州苗族侗族自治县',
    431230: '通道侗族自治县',
    431281: '洪江市',
    431302: '娄星区',
    431321: '双峰县',
    431322: '新化县',
    431381: '冷水江市',
    431382: '涟源市',
    433101: '吉首市',
    433122: '泸溪县',
    433123: '凤凰县',
    433124: '花垣县',
    433125: '保靖县',
    433126: '古丈县',
    433127: '永顺县',
    433130: '龙山县',
    440103: '荔湾区',
    440104: '越秀区',
    440105: '海珠区',
    440106: '天河区',
    440111: '白云区',
    440112: '黄埔区',
    440113: '番禺区',
    440114: '花都区',
    440115: '南沙区',
    440117: '从化区',
    440118: '增城区',
    440203: '武江区',
    440204: '浈江区',
    440205: '曲江区',
    440222: '始兴县',
    440224: '仁化县',
    440229: '翁源县',
    440232: '乳源瑶族自治县',
    440233: '新丰县',
    440281: '乐昌市',
    440282: '南雄市',
    440303: '罗湖区',
    440304: '福田区',
    440305: '南山区',
    440306: '宝安区',
    440307: '龙岗区',
    440308: '盐田区',
    440309: '龙华区',
    440310: '坪山区',
    440311: '光明区',
    440402: '香洲区',
    440403: '斗门区',
    440404: '金湾区',
    440507: '龙湖区',
    440511: '金平区',
    440512: '濠江区',
    440513: '潮阳区',
    440514: '潮南区',
    440515: '澄海区',
    440523: '南澳县',
    440604: '禅城区',
    440605: '南海区',
    440606: '顺德区',
    440607: '三水区',
    440608: '高明区',
    440703: '蓬江区',
    440704: '江海区',
    440705: '新会区',
    440781: '台山市',
    440783: '开平市',
    440784: '鹤山市',
    440785: '恩平市',
    440802: '赤坎区',
    440803: '霞山区',
    440804: '坡头区',
    440811: '麻章区',
    440823: '遂溪县',
    440825: '徐闻县',
    440881: '廉江市',
    440882: '雷州市',
    440883: '吴川市',
    440890: '经济技术开发区',
    440902: '茂南区',
    440904: '电白区',
    440981: '高州市',
    440982: '化州市',
    440983: '信宜市',
    441202: '端州区',
    441203: '鼎湖区',
    441204: '高要区',
    441223: '广宁县',
    441224: '怀集县',
    441225: '封开县',
    441226: '德庆县',
    441284: '四会市',
    441302: '惠城区',
    441303: '惠阳区',
    441322: '博罗县',
    441323: '惠东县',
    441324: '龙门县',
    441402: '梅江区',
    441403: '梅县区',
    441422: '大埔县',
    441423: '丰顺县',
    441424: '五华县',
    441426: '平远县',
    441427: '蕉岭县',
    441481: '兴宁市',
    441502: '城区',
    441521: '海丰县',
    441523: '陆河县',
    441581: '陆丰市',
    441602: '源城区',
    441621: '紫金县',
    441622: '龙川县',
    441623: '连平县',
    441624: '和平县',
    441625: '东源县',
    441702: '江城区',
    441704: '阳东区',
    441721: '阳西县',
    441781: '阳春市',
    441802: '清城区',
    441803: '清新区',
    441821: '佛冈县',
    441823: '阳山县',
    441825: '连山壮族瑶族自治县',
    441826: '连南瑶族自治县',
    441881: '英德市',
    441882: '连州市',
    441901: '中堂镇',
    441903: '南城街道办事处',
    441904: '长安镇',
    441905: '东坑镇',
    441906: '樟木头镇',
    441907: '莞城街道办事处',
    441908: '石龙镇',
    441909: '桥头镇',
    441910: '万江街道办事处',
    441911: '麻涌镇',
    441912: '虎门镇',
    441913: '谢岗镇',
    441914: '石碣镇',
    441915: '茶山镇',
    441916: '东城街道办事处',
    441917: '洪梅镇',
    441918: '道滘镇',
    441919: '高埗镇',
    441920: '企石镇',
    441921: '凤岗镇',
    441922: '大岭山镇',
    441923: '松山湖管委会',
    441924: '清溪镇',
    441925: '望牛墩镇',
    441926: '厚街镇',
    441927: '常平镇',
    441928: '寮步镇',
    441929: '石排镇',
    441930: '横沥镇',
    441931: '塘厦镇',
    441932: '黄江镇',
    441933: '大朗镇',
    441934: '东莞港',
    441935: '东莞生态园',
    441990: '沙田镇',
    442001: '南头镇',
    442002: '神湾镇',
    442003: '东凤镇',
    442004: '五桂山街道办事处',
    442005: '黄圃镇',
    442006: '小榄镇',
    442007: '石岐区街道办事处',
    442008: '横栏镇',
    442009: '三角镇',
    442010: '三乡镇',
    442011: '港口镇',
    442012: '沙溪镇',
    442013: '板芙镇',
    442015: '东升镇',
    442016: '阜沙镇',
    442017: '民众镇',
    442018: '东区街道办事处',
    442019: '火炬开发区街道办事处',
    442020: '西区街道办事处',
    442021: '南区街道办事处',
    442022: '古镇镇',
    442023: '坦洲镇',
    442024: '大涌镇',
    442025: '南朗镇',
    445102: '湘桥区',
    445103: '潮安区',
    445122: '饶平县',
    445202: '榕城区',
    445203: '揭东区',
    445222: '揭西县',
    445224: '惠来县',
    445281: '普宁市',
    445302: '云城区',
    445303: '云安区',
    445321: '新兴县',
    445322: '郁南县',
    445381: '罗定市',
    450102: '兴宁区',
    450103: '青秀区',
    450105: '江南区',
    450107: '西乡塘区',
    450108: '良庆区',
    450109: '邕宁区',
    450110: '武鸣区',
    450123: '隆安县',
    450124: '马山县',
    450125: '上林县',
    450126: '宾阳县',
    450127: '横县',
    450202: '城中区',
    450203: '鱼峰区',
    450204: '柳南区',
    450205: '柳北区',
    450206: '柳江区',
    450222: '柳城县',
    450223: '鹿寨县',
    450224: '融安县',
    450225: '融水苗族自治县',
    450226: '三江侗族自治县',
    450302: '秀峰区',
    450303: '叠彩区',
    450304: '象山区',
    450305: '七星区',
    450311: '雁山区',
    450312: '临桂区',
    450321: '阳朔县',
    450323: '灵川县',
    450324: '全州县',
    450325: '兴安县',
    450326: '永福县',
    450327: '灌阳县',
    450328: '龙胜各族自治县',
    450329: '资源县',
    450330: '平乐县',
    450332: '恭城瑶族自治县',
    450381: '荔浦市',
    450403: '万秀区',
    450405: '长洲区',
    450406: '龙圩区',
    450421: '苍梧县',
    450422: '藤县',
    450423: '蒙山县',
    450481: '岑溪市',
    450502: '海城区',
    450503: '银海区',
    450512: '铁山港区',
    450521: '合浦县',
    450602: '港口区',
    450603: '防城区',
    450621: '上思县',
    450681: '东兴市',
    450702: '钦南区',
    450703: '钦北区',
    450721: '灵山县',
    450722: '浦北县',
    450802: '港北区',
    450803: '港南区',
    450804: '覃塘区',
    450821: '平南县',
    450881: '桂平市',
    450902: '玉州区',
    450903: '福绵区',
    450921: '容县',
    450922: '陆川县',
    450923: '博白县',
    450924: '兴业县',
    450981: '北流市',
    451002: '右江区',
    451021: '田阳县',
    451022: '田东县',
    451023: '平果县',
    451024: '德保县',
    451026: '那坡县',
    451027: '凌云县',
    451028: '乐业县',
    451029: '田林县',
    451030: '西林县',
    451031: '隆林各族自治县',
    451081: '靖西市',
    451102: '八步区',
    451103: '平桂区',
    451121: '昭平县',
    451122: '钟山县',
    451123: '富川瑶族自治县',
    451202: '金城江区',
    451203: '宜州区',
    451221: '南丹县',
    451222: '天峨县',
    451223: '凤山县',
    451224: '东兰县',
    451225: '罗城仫佬族自治县',
    451226: '环江毛南族自治县',
    451227: '巴马瑶族自治县',
    451228: '都安瑶族自治县',
    451229: '大化瑶族自治县',
    451302: '兴宾区',
    451321: '忻城县',
    451322: '象州县',
    451323: '武宣县',
    451324: '金秀瑶族自治县',
    451381: '合山市',
    451402: '江州区',
    451421: '扶绥县',
    451422: '宁明县',
    451423: '龙州县',
    451424: '大新县',
    451425: '天等县',
    451481: '凭祥市',
    460105: '秀英区',
    460106: '龙华区',
    460107: '琼山区',
    460108: '美兰区',
    460202: '海棠区',
    460203: '吉阳区',
    460204: '天涯区',
    460205: '崖州区',
    460321: '西沙群岛',
    460322: '南沙群岛',
    460323: '中沙群岛的岛礁及其海域',
    460401: '那大镇',
    460402: '和庆镇',
    460403: '南丰镇',
    460404: '大成镇',
    460405: '雅星镇',
    460406: '兰洋镇',
    460407: '光村镇',
    460408: '木棠镇',
    460409: '海头镇',
    460410: '峨蔓镇',
    460411: '王五镇',
    460412: '白马井镇',
    460413: '中和镇',
    460414: '排浦镇',
    460415: '东成镇',
    460416: '新州镇',
    460417: '洋浦经济开发区',
    460418: '华南热作学院',
    469001: '五指山市',
    469002: '琼海市',
    469005: '文昌市',
    469006: '万宁市',
    469007: '东方市',
    469021: '定安县',
    469022: '屯昌县',
    469023: '澄迈县',
    469024: '临高县',
    469025: '白沙黎族自治县',
    469026: '昌江黎族自治县',
    469027: '乐东黎族自治县',
    469028: '陵水黎族自治县',
    469029: '保亭黎族苗族自治县',
    469030: '琼中黎族苗族自治县',
    500101: '万州区',
    500102: '涪陵区',
    500103: '渝中区',
    500104: '大渡口区',
    500105: '江北区',
    500106: '沙坪坝区',
    500107: '九龙坡区',
    500108: '南岸区',
    500109: '北碚区',
    500110: '綦江区',
    500111: '大足区',
    500112: '渝北区',
    500113: '巴南区',
    500114: '黔江区',
    500115: '长寿区',
    500116: '江津区',
    500117: '合川区',
    500118: '永川区',
    500119: '南川区',
    500120: '璧山区',
    500151: '铜梁区',
    500152: '潼南区',
    500153: '荣昌区',
    500154: '开州区',
    500155: '梁平区',
    500156: '武隆区',
    500229: '城口县',
    500230: '丰都县',
    500231: '垫江县',
    500233: '忠县',
    500235: '云阳县',
    500236: '奉节县',
    500237: '巫山县',
    500238: '巫溪县',
    500240: '石柱土家族自治县',
    500241: '秀山土家族苗族自治县',
    500242: '酉阳土家族苗族自治县',
    500243: '彭水苗族土家族自治县',
    510104: '锦江区',
    510105: '青羊区',
    510106: '金牛区',
    510107: '武侯区',
    510108: '成华区',
    510112: '龙泉驿区',
    510113: '青白江区',
    510114: '新都区',
    510115: '温江区',
    510116: '双流区',
    510117: '郫都区',
    510121: '金堂县',
    510129: '大邑县',
    510131: '蒲江县',
    510132: '新津县',
    510181: '都江堰市',
    510182: '彭州市',
    510183: '邛崃市',
    510184: '崇州市',
    510185: '简阳市',
    510191: '高新区',
    510302: '自流井区',
    510303: '贡井区',
    510304: '大安区',
    510311: '沿滩区',
    510321: '荣县',
    510322: '富顺县',
    510402: '东区',
    510403: '西区',
    510411: '仁和区',
    510421: '米易县',
    510422: '盐边县',
    510502: '江阳区',
    510503: '纳溪区',
    510504: '龙马潭区',
    510521: '泸县',
    510522: '合江县',
    510524: '叙永县',
    510525: '古蔺县',
    510603: '旌阳区',
    510604: '罗江区',
    510623: '中江县',
    510681: '广汉市',
    510682: '什邡市',
    510683: '绵竹市',
    510703: '涪城区',
    510704: '游仙区',
    510705: '安州区',
    510722: '三台县',
    510723: '盐亭县',
    510725: '梓潼县',
    510726: '北川羌族自治县',
    510727: '平武县',
    510781: '江油市',
    510791: '高新区',
    510802: '利州区',
    510811: '昭化区',
    510812: '朝天区',
    510821: '旺苍县',
    510822: '青川县',
    510823: '剑阁县',
    510824: '苍溪县',
    510903: '船山区',
    510904: '安居区',
    510921: '蓬溪县',
    510922: '射洪县',
    510923: '大英县',
    511002: '市中区',
    511011: '东兴区',
    511024: '威远县',
    511025: '资中县',
    511083: '隆昌市',
    511102: '市中区',
    511111: '沙湾区',
    511112: '五通桥区',
    511113: '金口河区',
    511123: '犍为县',
    511124: '井研县',
    511126: '夹江县',
    511129: '沐川县',
    511132: '峨边彝族自治县',
    511133: '马边彝族自治县',
    511181: '峨眉山市',
    511302: '顺庆区',
    511303: '高坪区',
    511304: '嘉陵区',
    511321: '南部县',
    511322: '营山县',
    511323: '蓬安县',
    511324: '仪陇县',
    511325: '西充县',
    511381: '阆中市',
    511402: '东坡区',
    511403: '彭山区',
    511421: '仁寿县',
    511423: '洪雅县',
    511424: '丹棱县',
    511425: '青神县',
    511502: '翠屏区',
    511503: '南溪区',
    511504: '叙州区',
    511523: '江安县',
    511524: '长宁县',
    511525: '高县',
    511526: '珙县',
    511527: '筠连县',
    511528: '兴文县',
    511529: '屏山县',
    511602: '广安区',
    511603: '前锋区',
    511621: '岳池县',
    511622: '武胜县',
    511623: '邻水县',
    511681: '华蓥市',
    511702: '通川区',
    511703: '达川区',
    511722: '宣汉县',
    511723: '开江县',
    511724: '大竹县',
    511725: '渠县',
    511781: '万源市',
    511802: '雨城区',
    511803: '名山区',
    511822: '荥经县',
    511823: '汉源县',
    511824: '石棉县',
    511825: '天全县',
    511826: '芦山县',
    511827: '宝兴县',
    511902: '巴州区',
    511903: '恩阳区',
    511921: '通江县',
    511922: '南江县',
    511923: '平昌县',
    512002: '雁江区',
    512021: '安岳县',
    512022: '乐至县',
    513201: '马尔康市',
    513221: '汶川县',
    513222: '理县',
    513223: '茂县',
    513224: '松潘县',
    513225: '九寨沟县',
    513226: '金川县',
    513227: '小金县',
    513228: '黑水县',
    513230: '壤塘县',
    513231: '阿坝县',
    513232: '若尔盖县',
    513233: '红原县',
    513301: '康定市',
    513322: '泸定县',
    513323: '丹巴县',
    513324: '九龙县',
    513325: '雅江县',
    513326: '道孚县',
    513327: '炉霍县',
    513328: '甘孜县',
    513329: '新龙县',
    513330: '德格县',
    513331: '白玉县',
    513332: '石渠县',
    513333: '色达县',
    513334: '理塘县',
    513335: '巴塘县',
    513336: '乡城县',
    513337: '稻城县',
    513338: '得荣县',
    513401: '西昌市',
    513422: '木里藏族自治县',
    513423: '盐源县',
    513424: '德昌县',
    513425: '会理县',
    513426: '会东县',
    513427: '宁南县',
    513428: '普格县',
    513429: '布拖县',
    513430: '金阳县',
    513431: '昭觉县',
    513432: '喜德县',
    513433: '冕宁县',
    513434: '越西县',
    513435: '甘洛县',
    513436: '美姑县',
    513437: '雷波县',
    520102: '南明区',
    520103: '云岩区',
    520111: '花溪区',
    520112: '乌当区',
    520113: '白云区',
    520115: '观山湖区',
    520121: '开阳县',
    520122: '息烽县',
    520123: '修文县',
    520181: '清镇市',
    520201: '钟山区',
    520203: '六枝特区',
    520221: '水城县',
    520281: '盘州市',
    520302: '红花岗区',
    520303: '汇川区',
    520304: '播州区',
    520322: '桐梓县',
    520323: '绥阳县',
    520324: '正安县',
    520325: '道真仡佬族苗族自治县',
    520326: '务川仡佬族苗族自治县',
    520327: '凤冈县',
    520328: '湄潭县',
    520329: '余庆县',
    520330: '习水县',
    520381: '赤水市',
    520382: '仁怀市',
    520402: '西秀区',
    520403: '平坝区',
    520422: '普定县',
    520423: '镇宁布依族苗族自治县',
    520424: '关岭布依族苗族自治县',
    520425: '紫云苗族布依族自治县',
    520502: '七星关区',
    520521: '大方县',
    520522: '黔西县',
    520523: '金沙县',
    520524: '织金县',
    520525: '纳雍县',
    520526: '威宁彝族回族苗族自治县',
    520527: '赫章县',
    520602: '碧江区',
    520603: '万山区',
    520621: '江口县',
    520622: '玉屏侗族自治县',
    520623: '石阡县',
    520624: '思南县',
    520625: '印江土家族苗族自治县',
    520626: '德江县',
    520627: '沿河土家族自治县',
    520628: '松桃苗族自治县',
    522301: '兴义市',
    522302: '兴仁市',
    522323: '普安县',
    522324: '晴隆县',
    522325: '贞丰县',
    522326: '望谟县',
    522327: '册亨县',
    522328: '安龙县',
    522601: '凯里市',
    522622: '黄平县',
    522623: '施秉县',
    522624: '三穗县',
    522625: '镇远县',
    522626: '岑巩县',
    522627: '天柱县',
    522628: '锦屏县',
    522629: '剑河县',
    522630: '台江县',
    522631: '黎平县',
    522632: '榕江县',
    522633: '从江县',
    522634: '雷山县',
    522635: '麻江县',
    522636: '丹寨县',
    522701: '都匀市',
    522702: '福泉市',
    522722: '荔波县',
    522723: '贵定县',
    522725: '瓮安县',
    522726: '独山县',
    522727: '平塘县',
    522728: '罗甸县',
    522729: '长顺县',
    522730: '龙里县',
    522731: '惠水县',
    522732: '三都水族自治县',
    530102: '五华区',
    530103: '盘龙区',
    530111: '官渡区',
    530112: '西山区',
    530113: '东川区',
    530114: '呈贡区',
    530115: '晋宁区',
    530124: '富民县',
    530125: '宜良县',
    530126: '石林彝族自治县',
    530127: '嵩明县',
    530128: '禄劝彝族苗族自治县',
    530129: '寻甸回族彝族自治县',
    530181: '安宁市',
    530302: '麒麟区',
    530303: '沾益区',
    530304: '马龙区',
    530322: '陆良县',
    530323: '师宗县',
    530324: '罗平县',
    530325: '富源县',
    530326: '会泽县',
    530381: '宣威市',
    530402: '红塔区',
    530403: '江川区',
    530422: '澄江县',
    530423: '通海县',
    530424: '华宁县',
    530425: '易门县',
    530426: '峨山彝族自治县',
    530427: '新平彝族傣族自治县',
    530428: '元江哈尼族彝族傣族自治县',
    530502: '隆阳区',
    530521: '施甸县',
    530523: '龙陵县',
    530524: '昌宁县',
    530581: '腾冲市',
    530602: '昭阳区',
    530621: '鲁甸县',
    530622: '巧家县',
    530623: '盐津县',
    530624: '大关县',
    530625: '永善县',
    530626: '绥江县',
    530627: '镇雄县',
    530628: '彝良县',
    530629: '威信县',
    530681: '水富市',
    530702: '古城区',
    530721: '玉龙纳西族自治县',
    530722: '永胜县',
    530723: '华坪县',
    530724: '宁蒗彝族自治县',
    530802: '思茅区',
    530821: '宁洱哈尼族彝族自治县',
    530822: '墨江哈尼族自治县',
    530823: '景东彝族自治县',
    530824: '景谷傣族彝族自治县',
    530825: '镇沅彝族哈尼族拉祜族自治县',
    530826: '江城哈尼族彝族自治县',
    530827: '孟连傣族拉祜族佤族自治县',
    530828: '澜沧拉祜族自治县',
    530829: '西盟佤族自治县',
    530902: '临翔区',
    530921: '凤庆县',
    530922: '云县',
    530923: '永德县',
    530924: '镇康县',
    530925: '双江拉祜族佤族布朗族傣族自治县',
    530926: '耿马傣族佤族自治县',
    530927: '沧源佤族自治县',
    532301: '楚雄市',
    532322: '双柏县',
    532323: '牟定县',
    532324: '南华县',
    532325: '姚安县',
    532326: '大姚县',
    532327: '永仁县',
    532328: '元谋县',
    532329: '武定县',
    532331: '禄丰县',
    532501: '个旧市',
    532502: '开远市',
    532503: '蒙自市',
    532504: '弥勒市',
    532523: '屏边苗族自治县',
    532524: '建水县',
    532525: '石屏县',
    532527: '泸西县',
    532528: '元阳县',
    532529: '红河县',
    532530: '金平苗族瑶族傣族自治县',
    532531: '绿春县',
    532532: '河口瑶族自治县',
    532601: '文山市',
    532622: '砚山县',
    532623: '西畴县',
    532624: '麻栗坡县',
    532625: '马关县',
    532626: '丘北县',
    532627: '广南县',
    532628: '富宁县',
    532801: '景洪市',
    532822: '勐海县',
    532823: '勐腊县',
    532901: '大理市',
    532922: '漾濞彝族自治县',
    532923: '祥云县',
    532924: '宾川县',
    532925: '弥渡县',
    532926: '南涧彝族自治县',
    532927: '巍山彝族回族自治县',
    532928: '永平县',
    532929: '云龙县',
    532930: '洱源县',
    532931: '剑川县',
    532932: '鹤庆县',
    533102: '瑞丽市',
    533103: '芒市',
    533122: '梁河县',
    533123: '盈江县',
    533124: '陇川县',
    533301: '泸水市',
    533323: '福贡县',
    533324: '贡山独龙族怒族自治县',
    533325: '兰坪白族普米族自治县',
    533401: '香格里拉市',
    533422: '德钦县',
    533423: '维西傈僳族自治县',
    540102: '城关区',
    540103: '堆龙德庆区',
    540104: '达孜区',
    540121: '林周县',
    540122: '当雄县',
    540123: '尼木县',
    540124: '曲水县',
    540127: '墨竹工卡县',
    540202: '桑珠孜区',
    540221: '南木林县',
    540222: '江孜县',
    540223: '定日县',
    540224: '萨迦县',
    540225: '拉孜县',
    540226: '昂仁县',
    540227: '谢通门县',
    540228: '白朗县',
    540229: '仁布县',
    540230: '康马县',
    540231: '定结县',
    540232: '仲巴县',
    540233: '亚东县',
    540234: '吉隆县',
    540235: '聂拉木县',
    540236: '萨嘎县',
    540237: '岗巴县',
    540302: '卡若区',
    540321: '江达县',
    540322: '贡觉县',
    540323: '类乌齐县',
    540324: '丁青县',
    540325: '察雅县',
    540326: '八宿县',
    540327: '左贡县',
    540328: '芒康县',
    540329: '洛隆县',
    540330: '边坝县',
    540402: '巴宜区',
    540421: '工布江达县',
    540422: '米林县',
    540423: '墨脱县',
    540424: '波密县',
    540425: '察隅县',
    540426: '朗县',
    540502: '乃东区',
    540521: '扎囊县',
    540522: '贡嘎县',
    540523: '桑日县',
    540524: '琼结县',
    540525: '曲松县',
    540526: '措美县',
    540527: '洛扎县',
    540528: '加查县',
    540529: '隆子县',
    540530: '错那县',
    540531: '浪卡子县',
    540602: '色尼区',
    540621: '嘉黎县',
    540622: '比如县',
    540623: '聂荣县',
    540624: '安多县',
    540625: '申扎县',
    540626: '索县',
    540627: '班戈县',
    540628: '巴青县',
    540629: '尼玛县',
    540630: '双湖县',
    542521: '普兰县',
    542522: '札达县',
    542523: '噶尔县',
    542524: '日土县',
    542525: '革吉县',
    542526: '改则县',
    542527: '措勤县',
    610102: '新城区',
    610103: '碑林区',
    610104: '莲湖区',
    610111: '灞桥区',
    610112: '未央区',
    610113: '雁塔区',
    610114: '阎良区',
    610115: '临潼区',
    610116: '长安区',
    610117: '高陵区',
    610118: '鄠邑区',
    610122: '蓝田县',
    610124: '周至县',
    610202: '王益区',
    610203: '印台区',
    610204: '耀州区',
    610222: '宜君县',
    610302: '渭滨区',
    610303: '金台区',
    610304: '陈仓区',
    610322: '凤翔县',
    610323: '岐山县',
    610324: '扶风县',
    610326: '眉县',
    610327: '陇县',
    610328: '千阳县',
    610329: '麟游县',
    610330: '凤县',
    610331: '太白县',
    610402: '秦都区',
    610403: '杨陵区',
    610404: '渭城区',
    610422: '三原县',
    610423: '泾阳县',
    610424: '乾县',
    610425: '礼泉县',
    610426: '永寿县',
    610428: '长武县',
    610429: '旬邑县',
    610430: '淳化县',
    610431: '武功县',
    610481: '兴平市',
    610482: '彬州市',
    610502: '临渭区',
    610503: '华州区',
    610522: '潼关县',
    610523: '大荔县',
    610524: '合阳县',
    610525: '澄城县',
    610526: '蒲城县',
    610527: '白水县',
    610528: '富平县',
    610581: '韩城市',
    610582: '华阴市',
    610602: '宝塔区',
    610603: '安塞区',
    610621: '延长县',
    610622: '延川县',
    610623: '子长县',
    610625: '志丹县',
    610626: '吴起县',
    610627: '甘泉县',
    610628: '富县',
    610629: '洛川县',
    610630: '宜川县',
    610631: '黄龙县',
    610632: '黄陵县',
    610702: '汉台区',
    610703: '南郑区',
    610722: '城固县',
    610723: '洋县',
    610724: '西乡县',
    610725: '勉县',
    610726: '宁强县',
    610727: '略阳县',
    610728: '镇巴县',
    610729: '留坝县',
    610730: '佛坪县',
    610802: '榆阳区',
    610803: '横山区',
    610822: '府谷县',
    610824: '靖边县',
    610825: '定边县',
    610826: '绥德县',
    610827: '米脂县',
    610828: '佳县',
    610829: '吴堡县',
    610830: '清涧县',
    610831: '子洲县',
    610881: '神木市',
    610902: '汉滨区',
    610921: '汉阴县',
    610922: '石泉县',
    610923: '宁陕县',
    610924: '紫阳县',
    610925: '岚皋县',
    610926: '平利县',
    610927: '镇坪县',
    610928: '旬阳县',
    610929: '白河县',
    611002: '商州区',
    611021: '洛南县',
    611022: '丹凤县',
    611023: '商南县',
    611024: '山阳县',
    611025: '镇安县',
    611026: '柞水县',
    620102: '城关区',
    620103: '七里河区',
    620104: '西固区',
    620105: '安宁区',
    620111: '红古区',
    620121: '永登县',
    620122: '皋兰县',
    620123: '榆中县',
    620201: '市辖区',
    620290: '雄关区',
    620291: '长城区',
    620292: '镜铁区',
    620293: '新城镇',
    620294: '峪泉镇',
    620295: '文殊镇',
    620302: '金川区',
    620321: '永昌县',
    620402: '白银区',
    620403: '平川区',
    620421: '靖远县',
    620422: '会宁县',
    620423: '景泰县',
    620502: '秦州区',
    620503: '麦积区',
    620521: '清水县',
    620522: '秦安县',
    620523: '甘谷县',
    620524: '武山县',
    620525: '张家川回族自治县',
    620602: '凉州区',
    620621: '民勤县',
    620622: '古浪县',
    620623: '天祝藏族自治县',
    620702: '甘州区',
    620721: '肃南裕固族自治县',
    620722: '民乐县',
    620723: '临泽县',
    620724: '高台县',
    620725: '山丹县',
    620802: '崆峒区',
    620821: '泾川县',
    620822: '灵台县',
    620823: '崇信县',
    620825: '庄浪县',
    620826: '静宁县',
    620881: '华亭市',
    620902: '肃州区',
    620921: '金塔县',
    620922: '瓜州县',
    620923: '肃北蒙古族自治县',
    620924: '阿克塞哈萨克族自治县',
    620981: '玉门市',
    620982: '敦煌市',
    621002: '西峰区',
    621021: '庆城县',
    621022: '环县',
    621023: '华池县',
    621024: '合水县',
    621025: '正宁县',
    621026: '宁县',
    621027: '镇原县',
    621102: '安定区',
    621121: '通渭县',
    621122: '陇西县',
    621123: '渭源县',
    621124: '临洮县',
    621125: '漳县',
    621126: '岷县',
    621202: '武都区',
    621221: '成县',
    621222: '文县',
    621223: '宕昌县',
    621224: '康县',
    621225: '西和县',
    621226: '礼县',
    621227: '徽县',
    621228: '两当县',
    622901: '临夏市',
    622921: '临夏县',
    622922: '康乐县',
    622923: '永靖县',
    622924: '广河县',
    622925: '和政县',
    622926: '东乡族自治县',
    622927: '积石山保安族东乡族撒拉族自治县',
    623001: '合作市',
    623021: '临潭县',
    623022: '卓尼县',
    623023: '舟曲县',
    623024: '迭部县',
    623025: '玛曲县',
    623026: '碌曲县',
    623027: '夏河县',
    630102: '城东区',
    630103: '城中区',
    630104: '城西区',
    630105: '城北区',
    630121: '大通回族土族自治县',
    630122: '湟中县',
    630123: '湟源县',
    630202: '乐都区',
    630203: '平安区',
    630222: '民和回族土族自治县',
    630223: '互助土族自治县',
    630224: '化隆回族自治县',
    630225: '循化撒拉族自治县',
    632221: '门源回族自治县',
    632222: '祁连县',
    632223: '海晏县',
    632224: '刚察县',
    632321: '同仁县',
    632322: '尖扎县',
    632323: '泽库县',
    632324: '河南蒙古族自治县',
    632521: '共和县',
    632522: '同德县',
    632523: '贵德县',
    632524: '兴海县',
    632525: '贵南县',
    632621: '玛沁县',
    632622: '班玛县',
    632623: '甘德县',
    632624: '达日县',
    632625: '久治县',
    632626: '玛多县',
    632701: '玉树市',
    632722: '杂多县',
    632723: '称多县',
    632724: '治多县',
    632725: '囊谦县',
    632726: '曲麻莱县',
    632801: '格尔木市',
    632802: '德令哈市',
    632803: '茫崖市',
    632821: '乌兰县',
    632822: '都兰县',
    632823: '天峻县',
    640104: '兴庆区',
    640105: '西夏区',
    640106: '金凤区',
    640121: '永宁县',
    640122: '贺兰县',
    640181: '灵武市',
    640202: '大武口区',
    640205: '惠农区',
    640221: '平罗县',
    640302: '利通区',
    640303: '红寺堡区',
    640323: '盐池县',
    640324: '同心县',
    640381: '青铜峡市',
    640402: '原州区',
    640422: '西吉县',
    640423: '隆德县',
    640424: '泾源县',
    640425: '彭阳县',
    640502: '沙坡头区',
    640521: '中宁县',
    640522: '海原县',
    650102: '天山区',
    650103: '沙依巴克区',
    650104: '新市区',
    650105: '水磨沟区',
    650106: '头屯河区',
    650107: '达坂城区',
    650109: '米东区',
    650121: '乌鲁木齐县',
    650202: '独山子区',
    650203: '克拉玛依区',
    650204: '白碱滩区',
    650205: '乌尔禾区',
    650402: '高昌区',
    650421: '鄯善县',
    650422: '托克逊县',
    650502: '伊州区',
    650521: '巴里坤哈萨克自治县',
    650522: '伊吾县',
    652301: '昌吉市',
    652302: '阜康市',
    652323: '呼图壁县',
    652324: '玛纳斯县',
    652325: '奇台县',
    652327: '吉木萨尔县',
    652328: '木垒哈萨克自治县',
    652701: '博乐市',
    652702: '阿拉山口市',
    652722: '精河县',
    652723: '温泉县',
    652801: '库尔勒市',
    652822: '轮台县',
    652823: '尉犁县',
    652824: '若羌县',
    652825: '且末县',
    652826: '焉耆回族自治县',
    652827: '和静县',
    652828: '和硕县',
    652829: '博湖县',
    652901: '阿克苏市',
    652922: '温宿县',
    652923: '库车县',
    652924: '沙雅县',
    652925: '新和县',
    652926: '拜城县',
    652927: '乌什县',
    652928: '阿瓦提县',
    652929: '柯坪县',
    653001: '阿图什市',
    653022: '阿克陶县',
    653023: '阿合奇县',
    653024: '乌恰县',
    653101: '喀什市',
    653121: '疏附县',
    653122: '疏勒县',
    653123: '英吉沙县',
    653124: '泽普县',
    653125: '莎车县',
    653126: '叶城县',
    653127: '麦盖提县',
    653128: '岳普湖县',
    653129: '伽师县',
    653130: '巴楚县',
    653131: '塔什库尔干塔吉克自治县',
    653201: '和田市',
    653221: '和田县',
    653222: '墨玉县',
    653223: '皮山县',
    653224: '洛浦县',
    653225: '策勒县',
    653226: '于田县',
    653227: '民丰县',
    654002: '伊宁市',
    654003: '奎屯市',
    654004: '霍尔果斯市',
    654021: '伊宁县',
    654022: '察布查尔锡伯自治县',
    654023: '霍城县',
    654024: '巩留县',
    654025: '新源县',
    654026: '昭苏县',
    654027: '特克斯县',
    654028: '尼勒克县',
    654201: '塔城市',
    654202: '乌苏市',
    654221: '额敏县',
    654223: '沙湾县',
    654224: '托里县',
    654225: '裕民县',
    654226: '和布克赛尔蒙古自治县',
    654301: '阿勒泰市',
    654321: '布尔津县',
    654322: '富蕴县',
    654323: '福海县',
    654324: '哈巴河县',
    654325: '青河县',
    654326: '吉木乃县',
    659001: '石河子市',
    659002: '阿拉尔市',
    659003: '图木舒克市',
    659004: '五家渠市',
    659005: '北屯市',
    659006: '铁门关市',
    659007: '双河市',
    659008: '可克达拉市',
    659009: '昆玉市',
    710101: '中正区',
    710102: '大同区',
    710103: '中山区',
    710104: '松山区',
    710105: '大安区',
    710106: '万华区',
    710107: '信义区',
    710108: '士林区',
    710109: '北投区',
    710110: '内湖区',
    710111: '南港区',
    710112: '文山区',
    710199: '其它区',
    710201: '新兴区',
    710202: '前金区',
    710203: '芩雅区',
    710204: '盐埕区',
    710205: '鼓山区',
    710206: '旗津区',
    710207: '前镇区',
    710208: '三民区',
    710209: '左营区',
    710210: '楠梓区',
    710211: '小港区',
    710241: '苓雅区',
    710242: '仁武区',
    710243: '大社区',
    710244: '冈山区',
    710245: '路竹区',
    710246: '阿莲区',
    710247: '田寮区',
    710248: '燕巢区',
    710249: '桥头区',
    710250: '梓官区',
    710251: '弥陀区',
    710252: '永安区',
    710253: '湖内区',
    710254: '凤山区',
    710255: '大寮区',
    710256: '林园区',
    710257: '鸟松区',
    710258: '大树区',
    710259: '旗山区',
    710260: '美浓区',
    710261: '六龟区',
    710262: '内门区',
    710263: '杉林区',
    710264: '甲仙区',
    710265: '桃源区',
    710266: '那玛夏区',
    710267: '茂林区',
    710268: '茄萣区',
    710299: '其它区',
    710301: '中西区',
    710302: '东区',
    710303: '南区',
    710304: '北区',
    710305: '安平区',
    710306: '安南区',
    710339: '永康区',
    710340: '归仁区',
    710341: '新化区',
    710342: '左镇区',
    710343: '玉井区',
    710344: '楠西区',
    710345: '南化区',
    710346: '仁德区',
    710347: '关庙区',
    710348: '龙崎区',
    710349: '官田区',
    710350: '麻豆区',
    710351: '佳里区',
    710352: '西港区',
    710353: '七股区',
    710354: '将军区',
    710355: '学甲区',
    710356: '北门区',
    710357: '新营区',
    710358: '后壁区',
    710359: '白河区',
    710360: '东山区',
    710361: '六甲区',
    710362: '下营区',
    710363: '柳营区',
    710364: '盐水区',
    710365: '善化区',
    710366: '大内区',
    710367: '山上区',
    710368: '新市区',
    710369: '安定区',
    710399: '其它区',
    710401: '中区',
    710402: '东区',
    710403: '南区',
    710404: '西区',
    710405: '北区',
    710406: '北屯区',
    710407: '西屯区',
    710408: '南屯区',
    710431: '太平区',
    710432: '大里区',
    710433: '雾峰区',
    710434: '乌日区',
    710435: '丰原区',
    710436: '后里区',
    710437: '石冈区',
    710438: '东势区',
    710439: '和平区',
    710440: '新社区',
    710441: '潭子区',
    710442: '大雅区',
    710443: '神冈区',
    710444: '大肚区',
    710445: '沙鹿区',
    710446: '龙井区',
    710447: '梧栖区',
    710448: '清水区',
    710449: '大甲区',
    710450: '外埔区',
    710451: '大安区',
    710499: '其它区',
    710507: '金沙镇',
    710508: '金湖镇',
    710509: '金宁乡',
    710510: '金城镇',
    710511: '烈屿乡',
    710512: '乌坵乡',
    710614: '南投市',
    710615: '中寮乡',
    710616: '草屯镇',
    710617: '国姓乡',
    710618: '埔里镇',
    710619: '仁爱乡',
    710620: '名间乡',
    710621: '集集镇',
    710622: '水里乡',
    710623: '鱼池乡',
    710624: '信义乡',
    710625: '竹山镇',
    710626: '鹿谷乡',
    710701: '仁爱区',
    710702: '信义区',
    710703: '中正区',
    710704: '中山区',
    710705: '安乐区',
    710706: '暖暖区',
    710707: '七堵区',
    710799: '其它区',
    710801: '东区',
    710802: '北区',
    710803: '香山区',
    710899: '其它区',
    710901: '东区',
    710902: '西区',
    710999: '其它区',
    711130: '万里区',
    711132: '板桥区',
    711133: '汐止区',
    711134: '深坑区',
    711135: '石碇区',
    711136: '瑞芳区',
    711137: '平溪区',
    711138: '双溪区',
    711139: '贡寮区',
    711140: '新店区',
    711141: '坪林区',
    711142: '乌来区',
    711143: '永和区',
    711144: '中和区',
    711145: '土城区',
    711146: '三峡区',
    711147: '树林区',
    711148: '莺歌区',
    711149: '三重区',
    711150: '新庄区',
    711151: '泰山区',
    711152: '林口区',
    711153: '芦洲区',
    711154: '五股区',
    711155: '八里区',
    711156: '淡水区',
    711157: '三芝区',
    711158: '石门区',
    711287: '宜兰市',
    711288: '头城镇',
    711289: '礁溪乡',
    711290: '壮围乡',
    711291: '员山乡',
    711292: '罗东镇',
    711293: '三星乡',
    711294: '大同乡',
    711295: '五结乡',
    711296: '冬山乡',
    711297: '苏澳镇',
    711298: '南澳乡',
    711299: '钓鱼台',
    711387: '竹北市',
    711388: '湖口乡',
    711389: '新丰乡',
    711390: '新埔镇',
    711391: '关西镇',
    711392: '芎林乡',
    711393: '宝山乡',
    711394: '竹东镇',
    711395: '五峰乡',
    711396: '横山乡',
    711397: '尖石乡',
    711398: '北埔乡',
    711399: '峨眉乡',
    711414: '中坜区',
    711415: '平镇区',
    711417: '杨梅区',
    711418: '新屋区',
    711419: '观音区',
    711420: '桃园区',
    711421: '龟山区',
    711422: '八德区',
    711423: '大溪区',
    711425: '大园区',
    711426: '芦竹区',
    711487: '中坜市',
    711488: '平镇市',
    711489: '龙潭乡',
    711490: '杨梅市',
    711491: '新屋乡',
    711492: '观音乡',
    711493: '桃园市',
    711494: '龟山乡',
    711495: '八德市',
    711496: '大溪镇',
    711497: '复兴乡',
    711498: '大园乡',
    711499: '芦竹乡',
    711520: '头份市',
    711582: '竹南镇',
    711583: '头份镇',
    711584: '三湾乡',
    711585: '南庄乡',
    711586: '狮潭乡',
    711587: '后龙镇',
    711588: '通霄镇',
    711589: '苑里镇',
    711590: '苗栗市',
    711591: '造桥乡',
    711592: '头屋乡',
    711593: '公馆乡',
    711594: '大湖乡',
    711595: '泰安乡',
    711596: '铜锣乡',
    711597: '三义乡',
    711598: '西湖乡',
    711599: '卓兰镇',
    711736: '员林市',
    711774: '彰化市',
    711775: '芬园乡',
    711776: '花坛乡',
    711777: '秀水乡',
    711778: '鹿港镇',
    711779: '福兴乡',
    711780: '线西乡',
    711781: '和美镇',
    711782: '伸港乡',
    711783: '员林镇',
    711784: '社头乡',
    711785: '永靖乡',
    711786: '埔心乡',
    711787: '溪湖镇',
    711788: '大村乡',
    711789: '埔盐乡',
    711790: '田中镇',
    711791: '北斗镇',
    711792: '田尾乡',
    711793: '埤头乡',
    711794: '溪州乡',
    711795: '竹塘乡',
    711796: '二林镇',
    711797: '大城乡',
    711798: '芳苑乡',
    711799: '二水乡',
    711982: '番路乡',
    711983: '梅山乡',
    711984: '竹崎乡',
    711985: '阿里山乡',
    711986: '中埔乡',
    711987: '大埔乡',
    711988: '水上乡',
    711989: '鹿草乡',
    711990: '太保市',
    711991: '朴子市',
    711992: '东石乡',
    711993: '六脚乡',
    711994: '新港乡',
    711995: '民雄乡',
    711996: '大林镇',
    711997: '溪口乡',
    711998: '义竹乡',
    711999: '布袋镇',
    712180: '斗南镇',
    712181: '大埤乡',
    712182: '虎尾镇',
    712183: '土库镇',
    712184: '褒忠乡',
    712185: '东势乡',
    712186: '台西乡',
    712187: '仑背乡',
    712188: '麦寮乡',
    712189: '斗六市',
    712190: '林内乡',
    712191: '古坑乡',
    712192: '莿桐乡',
    712193: '西螺镇',
    712194: '二仑乡',
    712195: '北港镇',
    712196: '水林乡',
    712197: '口湖乡',
    712198: '四湖乡',
    712199: '元长乡',
    712451: '崁顶乡',
    712467: '屏东市',
    712468: '三地门乡',
    712469: '雾台乡',
    712470: '玛家乡',
    712471: '九如乡',
    712472: '里港乡',
    712473: '高树乡',
    712474: '盐埔乡',
    712475: '长治乡',
    712476: '麟洛乡',
    712477: '竹田乡',
    712478: '内埔乡',
    712479: '万丹乡',
    712480: '潮州镇',
    712481: '泰武乡',
    712482: '来义乡',
    712483: '万峦乡',
    712484: '莰顶乡',
    712485: '新埤乡',
    712486: '南州乡',
    712487: '林边乡',
    712488: '东港镇',
    712489: '琉球乡',
    712490: '佳冬乡',
    712491: '新园乡',
    712492: '枋寮乡',
    712493: '枋山乡',
    712494: '春日乡',
    712495: '狮子乡',
    712496: '车城乡',
    712497: '牡丹乡',
    712498: '恒春镇',
    712499: '满州乡',
    712584: '台东市',
    712585: '绿岛乡',
    712586: '兰屿乡',
    712587: '延平乡',
    712588: '卑南乡',
    712589: '鹿野乡',
    712590: '关山镇',
    712591: '海端乡',
    712592: '池上乡',
    712593: '东河乡',
    712594: '成功镇',
    712595: '长滨乡',
    712596: '金峰乡',
    712597: '大武乡',
    712598: '达仁乡',
    712599: '太麻里乡',
    712686: '花莲市',
    712687: '新城乡',
    712688: '太鲁阁',
    712689: '秀林乡',
    712690: '吉安乡',
    712691: '寿丰乡',
    712692: '凤林镇',
    712693: '光复乡',
    712694: '丰滨乡',
    712695: '瑞穗乡',
    712696: '万荣乡',
    712697: '玉里镇',
    712698: '卓溪乡',
    712699: '富里乡',
    712794: '马公市',
    712795: '西屿乡',
    712796: '望安乡',
    712797: '七美乡',
    712798: '白沙乡',
    712799: '湖西乡',
    712896: '南竿乡',
    712897: '北竿乡',
    712898: '东引乡',
    712899: '莒光乡',
    810101: '中西区',
    810102: '湾仔区',
    810103: '东区',
    810104: '南区',
    810201: '九龙城区',
    810202: '油尖旺区',
    810203: '深水埗区',
    810204: '黄大仙区',
    810205: '观塘区',
    810301: '北区',
    810302: '大埔区',
    810303: '沙田区',
    810304: '西贡区',
    810305: '元朗区',
    810306: '屯门区',
    810307: '荃湾区',
    810308: '葵青区',
    810309: '离岛区',
    820101: '澳门半岛',
    820201: '离岛'
  }
});

/***/ }),

/***/ "./src/packages/address/list/api.js":
/*!******************************************!*\
  !*** ./src/packages/address/list/api.js ***!
  \******************************************/
/*! exports provided: fetchData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchData", function() { return fetchData; });
/* harmony import */ var weapp_zx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! weapp-zx */ "./node_modules/weapp-zx/index.js");

function fetchData(options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      limit = _options.limit,
      offset = _options.offset;
  return weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].get('user', 'me').then(function (res) {
    var id = res.data.id;
    return weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].find('address', {
      limit: limit,
      offset: offset,
      fn: function fn(query) {
        query.compare('user_id', '=', id);
        query.compare('is_delete', '!=', true);
      }
    });
  });
}

/***/ }),

/***/ "./src/packages/back/utils.js":
/*!************************************!*\
  !*** ./src/packages/back/utils.js ***!
  \************************************/
/*! exports provided: getDateStr, getWeekStr, getTimeStr, checkSelectTime, getItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDateStr", function() { return getDateStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWeekStr", function() { return getWeekStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimeStr", function() { return getTimeStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkSelectTime", function() { return checkSelectTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getItems", function() { return getItems; });
function getDateStr(AddDayCount, dd) {
  if (dd === void 0) {
    dd = null;
  }

  dd = dd || new Date();
  dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期

  var y = dd.getFullYear();
  var m = dd.getMonth() + 1; // 获取当前月份的日期

  var d = dd.getDate();
  y = y > 9 ? '' + y : '0' + y;
  m = m > 9 ? '' + m : '0' + m;
  d = d > 9 ? '' + d : '0' + d;
  return y + '-' + m + '-' + d;
}
function getWeekStr(AddDayCount, dd) {
  if (dd === void 0) {
    dd = null;
  }

  dd = dd || new Date();
  var s = '日一二三四五六'.charAt(dd.getDay() + AddDayCount);
  return "\u661F\u671F" + s;
}
function getTimeStr(dd) {
  var h = dd.getHours();
  var hh = h + 2;
  h = h > 9 ? '' + h : '0' + h;
  hh = hh > 9 ? '' + hh : '0' + hh;
  return h + ':00-' + hh + ':00';
}

function checkTime() {
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();

  if (h > 16 || h === 16 && m > 30) {
    return false;
  }

  if (h <= 7 || h === 7 && m < 30) {
    return 8;
  }

  if (m < 30) {
    return h + 1;
  }

  if (m > 30) {
    return h + 2;
  }
}

function checkSelectTime(day, sh) {
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = Number(getDateStr(0).split('-').join(''));

  if (day > s) {
    return true;
  }

  if (sh === h && m > 30) {
    return false;
  }

  if (sh === h + 1 && m > 30) {
    return false;
  }

  if (sh < h) {
    return false;
  }

  return true;
}
function getItems() {
  var items = [];
  var id = 0;
  var minHours = 8;
  var maxHours = 18;
  ['今天', '明天', '后天'].forEach(function (text, index) {
    var dateStr = getDateStr(index);
    var weekStr = getWeekStr(index);
    var children = [];
    var startHours = minHours;

    if (text === '今天') {
      var checkResult = checkTime();

      if (!checkResult) {
        return;
      }

      startHours = checkResult;
    }

    for (var i = startHours; i + 2 <= maxHours; i += 2) {
      var ii = i + 2;
      var is = i > 9 ? '' + i : '0' + i;
      var iis = ii > 9 ? '' + ii : '0' + ii;
      children.push({
        text: i + ":00-" + ii + ":00",
        id: id++,
        dateStr: dateStr,
        weekStr: weekStr,
        timeStr: is + ":00-" + iis + ":00"
      });
    }

    items.push({
      text: text,
      children: children
    });
  });
  return items;
}

/***/ }),

/***/ "./src/packages/product/api.js":
/*!*************************************!*\
  !*** ./src/packages/product/api.js ***!
  \*************************************/
/*! exports provided: fetchData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchData", function() { return fetchData; });
/* harmony import */ var weapp_zx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! weapp-zx */ "./node_modules/weapp-zx/index.js");

function fetchData(id) {
  return weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].get('product', id, {
    expand: ['brand']
  }).then(function (res) {
    return res;
  });
}

/***/ }),

/***/ "./src/packages/wallet/utils.js":
/*!**************************************!*\
  !*** ./src/packages/wallet/utils.js ***!
  \**************************************/
/*! exports provided: filterFetchData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterFetchData", function() { return filterFetchData; });
var filterFetchData = function filterFetchData(couponList) {
  if (couponList === void 0) {
    couponList = [];
  }

  return couponList.map(function (coupon) {
    var type = coupon.type,
        discount = coupon.discount,
        amount = coupon.amount,
        createTime = coupon.create_time,
        expiredTime = coupon.expired_time,
        id = coupon.id;
    var title = type === 1 ? '爱戴小盒·专享折扣' : '爱戴小盒·礼金券';
    var valueContent = type === 1 ? discount : amount;
    var timeScope = createTime.slice(0, 10).replace(/-/g, '/') + '-' + expiredTime.slice(0, 10).replace(/-/g, '/');
    return {
      id: id,
      title: title,
      timeScope: timeScope,
      valueContent: valueContent,
      valueType: type
    };
  });
};

/***/ }),

/***/ "./src/utils/api.js":
/*!**************************!*\
  !*** ./src/utils/api.js ***!
  \**************************/
/*! exports provided: api, request */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "api", function() { return api; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "request", function() { return request; });
/* harmony import */ var utils_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/config */ "./src/utils/config.js");
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js");
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var BASE_URL = utils_config__WEBPACK_IMPORTED_MODULE_0__["default"].baseUrl;
var api = {
  "on_login": {
    desc: "用户登录",
    url: BASE_URL + "v1/user/on_login/",
    method: "post"
  },
  "info": {
    desc: "用户信息",
    url: BASE_URL + "v1/user/info/",
    method: "get"
  },
  "survey_info": {
    desc: "加载提交过了的问卷",
    url: BASE_URL + "v1/user/survey/info/",
    method: "get"
  },
  "survey_submit": {
    desc: "提交问卷",
    url: BASE_URL + "v1/user/survey/submit/",
    method: "post"
  },
  "get_coupon_for_subscribe": {
    desc: "购买会员时输入打折码",
    url: BASE_URL + "v1/user/coupon_for_subscribe/get",
    method: "get"
  },
  "subscribe_pay": {
    desc: "支付会员",
    url: BASE_URL + "v1/user/subscribe/pay/",
    method: "post"
  },
  "post_arrived": {
    desc: "确认收货",
    url: BASE_URL + "v1/user/post_arrived/",
    method: "post"
  },
  "order_box": {
    desc: "获取盒子信息",
    url: BASE_URL + "v1/user/order/box/",
    method: "get"
  },
  "pre_post_back": {
    // /api/v1/user/order/pre_post_back/:order_id
    desc: "预约寄回某产品",
    url: BASE_URL + "v1/user/order/pre_post_back/",
    method: "post"
  },
  "pre_post_back_cancel": {
    desc: "取消预约寄回某产品",
    url: BASE_URL + "v1/user/order/pre_post_back_cancel/",
    method: "post"
  },
  "order_update": {
    // /api/v1/user/order/update/:order_id
    desc: "修改盒子信息",
    url: BASE_URL + "v1/user/order/update/",
    method: "post"
  },
  "order_post_back": {
    // /user/order/post_back/:order_id/:product_id/
    desc: "寄回某产品",
    url: BASE_URL + "v1/user/order/post_back/",
    method: "post"
  },
  "order_post_back_cancel": {
    // /user/order/post_back_cancel/:order_id/:product_id/
    desc: "取消寄回",
    url: BASE_URL + "v1/user/order/post_back_cancel/",
    method: "post"
  },
  "order_pay": {
    desc: "支付盒子订单",
    url: BASE_URL + "v1/user/order/pay/",
    method: "post"
  },
  "order_feedback": {
    desc: "订单结束后反馈信息",
    url: BASE_URL + "v1/user/order/feedback/:order_id/",
    method: "post"
  },
  "coupon_list": {
    desc: "优惠券列表（我的钱包）",
    url: BASE_URL + "v1/user/coupon/list/",
    method: "get"
  },
  "coupon_exchange": {
    desc: "优惠码兑换成券",
    url: BASE_URL + "v1/user/coupon/exchange/",
    method: "post"
  },
  "address_list": {
    desc: "用户收件地址列表",
    url: BASE_URL + "v1/user/address/list/",
    method: "get"
  },
  "address_delete": {
    desc: "用户收件地址删除",
    url: BASE_URL + "v1/user/address/delete/",
    method: "post"
  },
  "address_create": {
    desc: "用户新增收件地址",
    url: BASE_URL + "v1/user/address/create/",
    method: "post"
  },
  "address_update": {
    desc: "用户编辑收件地址",
    url: BASE_URL + "v1/user/address/update/",
    method: "post"
  },
  "phone_send_sm": {
    desc: "用户发送手机验证码",
    url: BASE_URL + "v1/user/phone/send_sm/",
    method: "post"
  },
  "phone_bind": {
    desc: "用户绑定手机",
    url: BASE_URL + "v1/user/phone/bind/",
    method: "post"
  },
  "phone_unbind": {
    desc: "用户解绑手机",
    url: BASE_URL + "v1/user/phone/unbind/",
    method: "post"
  },
  "pay_nothing": {
    desc: "支付盒子空订单",
    url: BASE_URL + "v1/user/order/pay_nothing/",
    method: "post"
  }
};
function request(options, data) {
  if (data === void 0) {
    data = {};
  }

  options = underscore__WEBPACK_IMPORTED_MODULE_1___default.a.clone(options);

  if (options.id !== undefined) {
    // 只要传入了id，自动在url结尾加上id
    options.url += String(options.id);
    delete options.id;
  } else if (options.ids !== undefined) {
    options.ids.forEach(function (item) {
      options.url += String(item) + '/';
    });
    delete options.ids;
  }

  console.log(options);
  return new Promise(function (resolve, reject) {
    var header = {
      'content-type': 'application/json'
    };
    var token = wx.getStorageSync('token');

    if (token) {
      header['Auth-Token'] = token;
    }

    wx.request(_extends({
      header: header
    }, options, {
      data: data,
      success: function success(res) {
        if (res.data.status !== 200) {
          reject(res.data.error);
        }

        resolve(res.data.data);
      },
      fail: function fail(err) {
        reject(err);
      }
    }));
  });
}

/***/ }),

/***/ "./src/utils/image.js":
/*!****************************!*\
  !*** ./src/utils/image.js ***!
  \****************************/
/*! exports provided: getImageUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getImageUrl", function() { return getImageUrl; });
/* harmony import */ var utils_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/config */ "./src/utils/config.js");

var uploadUrl = utils_config__WEBPACK_IMPORTED_MODULE_0__["default"].uploadUrl;
/**
 * 获取远程图片地址
 * 如，const icon1 = getImageUrl('slice/location/icon_location.png')
 * @param {*} path slice/location/icon_location.png
 */

function getImageUrl(path) {
  return "" + uploadUrl + path;
}

/***/ }),

/***/ "./src/utils/underscore.js":
/*!*********************************!*\
  !*** ./src/utils/underscore.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function () {
  // Baseline setup
  // --------------
  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self || typeof global == 'object' && global.global === global && global || this || {}; // Save the previous value of the `_` variable.

  var previousUnderscore = root._; // Save bytes in the minified (but not gzipped) version:

  var ArrayProto = Array.prototype,
      ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null; // Create quick reference variables for speed access to core prototypes.

  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty; // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.

  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create; // Naked function reference for surrogate-prototype-swapping.

  var Ctor = function Ctor() {}; // Create a safe reference to the Underscore object for use below.


  var _ = function _(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  }; // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for their old module API. If we're in
  // the browser, add `_` as a global object.
  // (`nodeType` is checked to ensure that `module`
  // and `exports` are not HTML elements.)


  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }

    exports._ = _;
  } else {
    root._ = _;
  } // Current version.


  _.VERSION = '1.8.3'; // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.

  var optimizeCb = function optimizeCb(func, context, argCount) {
    if (context === void 0) return func;

    switch (argCount) {
      case 1:
        return function (value) {
          return func.call(context, value);
        };
      // The 2-parameter case has been omitted only because no current consumers
      // made use of it.

      case null:
      case 3:
        return function (value, index, collection) {
          return func.call(context, value, index, collection);
        };

      case 4:
        return function (accumulator, value, index, collection) {
          return func.call(context, accumulator, value, index, collection);
        };
    }

    return function () {
      return func.apply(context, arguments);
    };
  };

  var builtinIteratee; // An internal function to generate callbacks that can be applied to each
  // element in a collection, returning the desired result — either `identity`,
  // an arbitrary callback, a property matcher, or a property accessor.

  var cb = function cb(value, context, argCount) {
    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
    return _.property(value);
  }; // External wrapper for our callback generator. Users may customize
  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
  // This abstraction hides the internal-only argCount argument.


  _.iteratee = builtinIteratee = function builtinIteratee(value, context) {
    return cb(value, context, Infinity);
  }; // Similar to ES6's rest param (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
  // This accumulates the arguments passed into an array, after a given index.


  var restArgs = function restArgs(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function () {
      var length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length),
          index = 0;

      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }

      switch (startIndex) {
        case 0:
          return func.call(this, rest);

        case 1:
          return func.call(this, arguments[0], rest);

        case 2:
          return func.call(this, arguments[0], arguments[1], rest);
      }

      var args = Array(startIndex + 1);

      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }

      args[startIndex] = rest;
      return func.apply(this, args);
    };
  }; // An internal function for creating a new object that inherits from another.


  var baseCreate = function baseCreate(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor();
    Ctor.prototype = null;
    return result;
  };

  var shallowProperty = function shallowProperty(key) {
    return function (obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  var deepGet = function deepGet(obj, path) {
    var length = path.length;

    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }

    return length ? obj : void 0;
  }; // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object.
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094


  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = shallowProperty('length');

  var isArrayLike = function isArrayLike(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  }; // Collection Functions
  // --------------------
  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.


  _.each = _.forEach = function (obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;

    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);

      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }

    return obj;
  }; // Return the results of applying the iteratee to each element.


  _.map = _.collect = function (obj, iteratee, context) {
    iteratee = cb(iteratee, context);

    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);

    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }

    return results;
  }; // Create a reducing function iterating left or right.


  var createReduce = function createReduce(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function reducer(obj, iteratee, memo, initial) {
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;

      if (!initial) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }

      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }

      return memo;
    };

    return function (obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  }; // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.


  _.reduce = _.foldl = _.inject = createReduce(1); // The right-associative version of reduce, also known as `foldr`.

  _.reduceRight = _.foldr = createReduce(-1); // Return the first value which passes a truth test. Aliased as `detect`.

  _.find = _.detect = function (obj, predicate, context) {
    var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  }; // Return all the elements that pass a truth test.
  // Aliased as `select`.


  _.filter = _.select = function (obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);

    _.each(obj, function (value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });

    return results;
  }; // Return all the elements for which a truth test fails.


  _.reject = function (obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  }; // Determine whether all of the elements match a truth test.
  // Aliased as `all`.


  _.every = _.all = function (obj, predicate, context) {
    predicate = cb(predicate, context);

    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;

    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }

    return true;
  }; // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.


  _.some = _.any = function (obj, predicate, context) {
    predicate = cb(predicate, context);

    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;

    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }

    return false;
  }; // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.


  _.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  }; // Invoke a method (with arguments) on every item in a collection.


  _.invoke = restArgs(function (obj, path, args) {
    var contextPath, func;

    if (_.isFunction(path)) {
      func = path;
    } else if (_.isArray(path)) {
      contextPath = path.slice(0, -1);
      path = path[path.length - 1];
    }

    return _.map(obj, function (context) {
      var method = func;

      if (!method) {
        if (contextPath && contextPath.length) {
          context = deepGet(context, contextPath);
        }

        if (context == null) return void 0;
        method = context[path];
      }

      return method == null ? method : method.apply(context, args);
    });
  }); // Convenience version of a common use case of `map`: fetching a property.

  _.pluck = function (obj, key) {
    return _.map(obj, _.property(key));
  }; // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.


  _.where = function (obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  }; // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.


  _.findWhere = function (obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  }; // Return the maximum element (or element-based computation).


  _.max = function (obj, iteratee, context) {
    var result = -Infinity,
        lastComputed = -Infinity,
        value,
        computed;

    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);

      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];

        if (value != null && value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);

      _.each(obj, function (v, index, list) {
        computed = iteratee(v, index, list);

        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }

    return result;
  }; // Return the minimum element (or element-based computation).


  _.min = function (obj, iteratee, context) {
    var result = Infinity,
        lastComputed = Infinity,
        value,
        computed;

    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);

      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];

        if (value != null && value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);

      _.each(obj, function (v, index, list) {
        computed = iteratee(v, index, list);

        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }

    return result;
  }; // Shuffle a collection.


  _.shuffle = function (obj) {
    return _.sample(obj, Infinity);
  }; // Sample **n** random values from a collection using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.


  _.sample = function (obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }

    var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
    var length = getLength(sample);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;

    for (var index = 0; index < n; index++) {
      var rand = _.random(index, last);

      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
    }

    return sample.slice(0, n);
  }; // Sort the object's values by a criterion produced by an iteratee.


  _.sortBy = function (obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function (value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function (left, right) {
      var a = left.criteria;
      var b = right.criteria;

      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }

      return left.index - right.index;
    }), 'value');
  }; // An internal function used for aggregate "group by" operations.


  var group = function group(behavior, partition) {
    return function (obj, iteratee, context) {
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);

      _.each(obj, function (value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });

      return result;
    };
  }; // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.


  _.groupBy = group(function (result, value, key) {
    if (_.has(result, key)) result[key].push(value);else result[key] = [value];
  }); // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.

  _.indexBy = group(function (result, value, key) {
    result[key] = value;
  }); // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.

  _.countBy = group(function (result, value, key) {
    if (_.has(result, key)) result[key]++;else result[key] = 1;
  });
  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g; // Safely create a real, live array from anything iterable.

  _.toArray = function (obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);

    if (_.isString(obj)) {
      // Keep surrogate pair characters together
      return obj.match(reStrSymbol);
    }

    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  }; // Return the number of elements in an object.


  _.size = function (obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  }; // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.


  _.partition = group(function (result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true); // Array Functions
  // ---------------
  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.

  _.first = _.head = _.take = function (array, n, guard) {
    if (array == null || array.length < 1) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  }; // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.


  _.initial = function (array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  }; // Get the last element of an array. Passing **n** will return the last N
  // values in the array.


  _.last = function (array, n, guard) {
    if (array == null || array.length < 1) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  }; // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.


  _.rest = _.tail = _.drop = function (array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  }; // Trim out all falsy values from an array.


  _.compact = function (array) {
    return _.filter(array, Boolean);
  }; // Internal implementation of a recursive `flatten` function.


  var flatten = function flatten(input, shallow, strict, output) {
    output = output || [];
    var idx = output.length;

    for (var i = 0, length = getLength(input); i < length; i++) {
      var value = input[i];

      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        // Flatten current level of array or arguments object.
        if (shallow) {
          var j = 0,
              len = value.length;

          while (j < len) {
            output[idx++] = value[j++];
          }
        } else {
          flatten(value, shallow, strict, output);
          idx = output.length;
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }

    return output;
  }; // Flatten out an array, either recursively (by default), or just one level.


  _.flatten = function (array, shallow) {
    return flatten(array, shallow, false);
  }; // Return a version of the array that does not contain the specified value(s).


  _.without = restArgs(function (array, otherArrays) {
    return _.difference(array, otherArrays);
  }); // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.

  _.uniq = _.unique = function (array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }

    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];

    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;

      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }

    return result;
  }; // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.


  _.union = restArgs(function (arrays) {
    return _.uniq(flatten(arrays, true, true));
  }); // Produce an array that contains every item shared between all the
  // passed-in arrays.

  _.intersection = function (array) {
    var result = [];
    var argsLength = arguments.length;

    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      var j;

      for (j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }

      if (j === argsLength) result.push(item);
    }

    return result;
  }; // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.


  _.difference = restArgs(function (array, rest) {
    rest = flatten(rest, true, true);
    return _.filter(array, function (value) {
      return !_.contains(rest, value);
    });
  }); // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices.

  _.unzip = function (array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }

    return result;
  }; // Zip together multiple lists into a single array -- elements that share
  // an index go together.


  _.zip = restArgs(_.unzip); // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values. Passing by pairs is the reverse of _.pairs.

  _.object = function (list, values) {
    var result = {};

    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }

    return result;
  }; // Generator function to create the findIndex and findLastIndex functions.


  var createPredicateIndexFinder = function createPredicateIndexFinder(dir) {
    return function (array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;

      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }

      return -1;
    };
  }; // Returns the first index on an array-like that passes a predicate test.


  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1); // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.

  _.sortedIndex = function (array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0,
        high = getLength(array);

    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
    }

    return low;
  }; // Generator function to create the indexOf and lastIndexOf functions.


  var createIndexFinder = function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function (array, item, idx) {
      var i = 0,
          length = getLength(array);

      if (typeof idx == 'number') {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }

      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }

      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }

      return -1;
    };
  }; // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.


  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex); // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).

  _.range = function (start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }

    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  }; // Split an **array** into several arrays containing **count** or less elements
  // of initial array.


  _.chunk = function (array, count) {
    if (count == null || count < 1) return [];
    var result = [];
    var i = 0,
        length = array.length;

    while (i < length) {
      result.push(slice.call(array, i, i += count));
    }

    return result;
  }; // Function (ahem) Functions
  // ------------------
  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments.


  var executeBound = function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  }; // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.


  _.bind = restArgs(function (func, context, args) {
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArgs(function (callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  }); // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder by default, allowing any combination of arguments to be
  // pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.

  _.partial = restArgs(function (func, boundArgs) {
    var placeholder = _.partial.placeholder;

    var bound = function bound() {
      var position = 0,
          length = boundArgs.length;
      var args = Array(length);

      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }

      while (position < arguments.length) {
        args.push(arguments[position++]);
      }

      return executeBound(func, bound, this, this, args);
    };

    return bound;
  });
  _.partial.placeholder = _; // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.

  _.bindAll = restArgs(function (obj, keys) {
    keys = flatten(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');

    while (index--) {
      var key = keys[index];
      obj[key] = _.bind(obj[key], obj);
    }
  }); // Memoize an expensive function by storing its results.

  _.memoize = function (func, hasher) {
    var memoize = function memoize(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };

    memoize.cache = {};
    return memoize;
  }; // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.


  _.delay = restArgs(function (func, wait, args) {
    return setTimeout(function () {
      return func.apply(null, args);
    }, wait);
  }); // Defers a function, scheduling it to run after the current call stack has
  // cleared.

  _.defer = _.partial(_.delay, _, 1); // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.

  _.throttle = function (func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function later() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function throttled() {
      var now = _.now();

      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;

      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }

        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }

      return result;
    };

    throttled.cancel = function () {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  }; // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.


  _.debounce = function (func, wait, immediate) {
    var timeout, result;

    var later = function later(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArgs(function (args) {
      if (timeout) clearTimeout(timeout);

      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function () {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  }; // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.


  _.wrap = function (func, wrapper) {
    return _.partial(wrapper, func);
  }; // Returns a negated version of the passed-in predicate.


  _.negate = function (predicate) {
    return function () {
      return !predicate.apply(this, arguments);
    };
  }; // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.


  _.compose = function () {
    var args = arguments;
    var start = args.length - 1;
    return function () {
      var i = start;
      var result = args[start].apply(this, arguments);

      while (i--) {
        result = args[i].call(this, result);
      }

      return result;
    };
  }; // Returns a function that will only be executed on and after the Nth call.


  _.after = function (times, func) {
    return function () {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  }; // Returns a function that will only be executed up to (but not including) the Nth call.


  _.before = function (times, func) {
    var memo;
    return function () {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }

      if (times <= 1) func = null;
      return memo;
    };
  }; // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.


  _.once = _.partial(_.before, 2);
  _.restArgs = restArgs; // Object Functions
  // ----------------
  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.

  var hasEnumBug = !{
    toString: null
  }.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  var collectNonEnumProps = function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto; // Constructor is a special case.

    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];

      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }; // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`.


  _.keys = function (obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];

    for (var key in obj) {
      if (_.has(obj, key)) keys.push(key);
    } // Ahem, IE < 9.


    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  }; // Retrieve all the property names of an object.


  _.allKeys = function (obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];

    for (var key in obj) {
      keys.push(key);
    } // Ahem, IE < 9.


    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  }; // Retrieve the values of an object's properties.


  _.values = function (obj) {
    var keys = _.keys(obj);

    var length = keys.length;
    var values = Array(length);

    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }

    return values;
  }; // Returns the results of applying the iteratee to each element of the object.
  // In contrast to _.map it returns an object.


  _.mapObject = function (obj, iteratee, context) {
    iteratee = cb(iteratee, context);

    var keys = _.keys(obj),
        length = keys.length,
        results = {};

    for (var index = 0; index < length; index++) {
      var currentKey = keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }

    return results;
  }; // Convert an object into a list of `[key, value]` pairs.
  // The opposite of _.object.


  _.pairs = function (obj) {
    var keys = _.keys(obj);

    var length = keys.length;
    var pairs = Array(length);

    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }

    return pairs;
  }; // Invert the keys and values of an object. The values must be serializable.


  _.invert = function (obj) {
    var result = {};

    var keys = _.keys(obj);

    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }

    return result;
  }; // Return a sorted list of the function names available on the object.
  // Aliased as `methods`.


  _.functions = _.methods = function (obj) {
    var names = [];

    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }

    return names.sort();
  }; // An internal function for creating assigner functions.


  var createAssigner = function createAssigner(keysFunc, defaults) {
    return function (obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;

      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;

        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }

      return obj;
    };
  }; // Extend a given object with all the properties in passed-in object(s).


  _.extend = createAssigner(_.allKeys); // Assigns a given object with all the own properties in the passed-in object(s).
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

  _.extendOwn = _.assign = createAssigner(_.keys); // Returns the first key on an object that passes a predicate test.

  _.findKey = function (obj, predicate, context) {
    predicate = cb(predicate, context);

    var keys = _.keys(obj),
        key;

    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  }; // Internal pick helper function to determine if `obj` has key `key`.


  var keyInObj = function keyInObj(value, key, obj) {
    return key in obj;
  }; // Return a copy of the object only containing the whitelisted properties.


  _.pick = restArgs(function (obj, keys) {
    var result = {},
        iteratee = keys[0];
    if (obj == null) return result;

    if (_.isFunction(iteratee)) {
      if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
      keys = _.allKeys(obj);
    } else {
      iteratee = keyInObj;
      keys = flatten(keys, false, false);
      obj = Object(obj);
    }

    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }

    return result;
  }); // Return a copy of the object without the blacklisted properties.

  _.omit = restArgs(function (obj, keys) {
    var iteratee = keys[0],
        context;

    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
      if (keys.length > 1) context = keys[1];
    } else {
      keys = _.map(flatten(keys, false, false), String);

      iteratee = function iteratee(value, key) {
        return !_.contains(keys, key);
      };
    }

    return _.pick(obj, iteratee, context);
  }); // Fill in a given object with default properties.

  _.defaults = createAssigner(_.allKeys, true); // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.

  _.create = function (prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  }; // Create a (shallow-cloned) duplicate of an object.


  _.clone = function (obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  }; // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.


  _.tap = function (obj, interceptor) {
    interceptor(obj);
    return obj;
  }; // Returns whether an object has a given set of `key:value` pairs.


  _.isMatch = function (object, attrs) {
    var keys = _.keys(attrs),
        length = keys.length;

    if (object == null) return !length;
    var obj = Object(object);

    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }

    return true;
  }; // Internal recursive comparison function for `isEqual`.


  var eq, deepEq;

  eq = function eq(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b; // `null` or `undefined` only equal to itself (strict comparison).

    if (a == null || b == null) return false; // `NaN`s are equivalent, but non-reflexive.

    if (a !== a) return b !== b; // Exhaust primitive checks

    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  }; // Internal recursive comparison function for `isEqual`.


  deepEq = function deepEq(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped; // Compare `[[Class]]` names.

    var className = toString.call(a);
    if (className !== toString.call(b)) return false;

    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]': // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')

      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;

      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b; // An `egal` comparison is performed for other numeric values.

        return +a === 0 ? 1 / +a === 1 / b : +a === +b;

      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;

      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
    }

    var areArrays = className === '[object Array]';

    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false; // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.

      var aCtor = a.constructor,
          bCtor = b.constructor;

      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
        return false;
      }
    } // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.


    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;

    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    } // Add the first object to the stack of traversed objects.


    aStack.push(a);
    bStack.push(b); // Recursively compare objects and arrays.

    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false; // Deep compare the contents, ignoring non-numeric properties.

      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a),
          key;

      length = keys.length; // Ensure that both objects contain the same number of properties before comparing deep equality.

      if (_.keys(b).length !== length) return false;

      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    } // Remove the first object from the stack of traversed objects.


    aStack.pop();
    bStack.pop();
    return true;
  }; // Perform a deep comparison to check if two objects are equal.


  _.isEqual = function (a, b) {
    return eq(a, b);
  }; // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.


  _.isEmpty = function (obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  }; // Is a given value a DOM element?


  _.isElement = function (obj) {
    return !!(obj && obj.nodeType === 1);
  }; // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray


  _.isArray = nativeIsArray || function (obj) {
    return toString.call(obj) === '[object Array]';
  }; // Is a given variable an object?


  _.isObject = function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }; // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.


  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function (name) {
    _['is' + name] = function (obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  }); // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.


  if (!_.isArguments(arguments)) {
    _.isArguments = function (obj) {
      return _.has(obj, 'callee');
    };
  } // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).


  var nodelist = root.document && root.document.childNodes;

  if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
    _.isFunction = function (obj) {
      return typeof obj == 'function' || false;
    };
  } // Is a given object a finite number?


  _.isFinite = function (obj) {
    return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
  }; // Is the given value `NaN`?


  _.isNaN = function (obj) {
    return _.isNumber(obj) && isNaN(obj);
  }; // Is a given value a boolean?


  _.isBoolean = function (obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  }; // Is a given value equal to null?


  _.isNull = function (obj) {
    return obj === null;
  }; // Is a given variable undefined?


  _.isUndefined = function (obj) {
    return obj === void 0;
  }; // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).


  _.has = function (obj, path) {
    if (!_.isArray(path)) {
      return obj != null && hasOwnProperty.call(obj, path);
    }

    var length = path.length;

    for (var i = 0; i < length; i++) {
      var key = path[i];

      if (obj == null || !hasOwnProperty.call(obj, key)) {
        return false;
      }

      obj = obj[key];
    }

    return !!length;
  }; // Utility Functions
  // -----------------
  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.


  _.noConflict = function () {
    root._ = previousUnderscore;
    return this;
  }; // Keep the identity function around for default iteratees.


  _.identity = function (value) {
    return value;
  }; // Predicate-generating functions. Often useful outside of Underscore.


  _.constant = function (value) {
    return function () {
      return value;
    };
  };

  _.noop = function () {};

  _.property = function (path) {
    if (!_.isArray(path)) {
      return shallowProperty(path);
    }

    return function (obj) {
      return deepGet(obj, path);
    };
  }; // Generates a function for a given object that returns a given property.


  _.propertyOf = function (obj) {
    if (obj == null) {
      return function () {};
    }

    return function (path) {
      return !_.isArray(path) ? obj[path] : deepGet(obj, path);
    };
  }; // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.


  _.matcher = _.matches = function (attrs) {
    attrs = _.extendOwn({}, attrs);
    return function (obj) {
      return _.isMatch(obj, attrs);
    };
  }; // Run a function **n** times.


  _.times = function (n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);

    for (var i = 0; i < n; i++) {
      accum[i] = iteratee(i);
    }

    return accum;
  }; // Return a random integer between min and max (inclusive).


  _.random = function (min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }

    return min + Math.floor(Math.random() * (max - min + 1));
  }; // A (possibly faster) way to get the current timestamp as an integer.


  _.now = Date.now || function () {
    return new Date().getTime();
  }; // List of HTML entities for escaping.


  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };

  var unescapeMap = _.invert(escapeMap); // Functions for escaping and unescaping strings to/from HTML interpolation.


  var createEscaper = function createEscaper(map) {
    var escaper = function escaper(match) {
      return map[match];
    }; // Regexes for identifying a key that needs to be escaped.


    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function (string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };

  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap); // Traverses the children of `obj` along `path`. If a child is a function, it
  // is invoked with its parent as context. Returns the value of the final
  // child, or `fallback` if any child is undefined.

  _.result = function (obj, path, fallback) {
    if (!_.isArray(path)) path = [path];
    var length = path.length;

    if (!length) {
      return _.isFunction(fallback) ? fallback.call(obj) : fallback;
    }

    for (var i = 0; i < length; i++) {
      var prop = obj == null ? void 0 : obj[path[i]];

      if (prop === void 0) {
        prop = fallback;
        i = length; // Ensure we don't continue iterating.
      }

      obj = _.isFunction(prop) ? prop.call(obj) : prop;
    }

    return obj;
  }; // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.


  var idCounter = 0;

  _.uniqueId = function (prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  }; // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.


  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  }; // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.

  var noMatch = /(.)^/; // Certain characters need to be escaped so that they can be put into a
  // string literal.

  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    "\u2028": 'u2028',
    "\u2029": 'u2029'
  };
  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function escapeChar(match) {
    return '\\' + escapes[match];
  }; // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.


  _.template = function (text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings); // Combine delimiters into one regular expression via alternation.

    var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g'); // Compile the template source, escaping string literals appropriately.

    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      } // Adobe VMs need the match returned to produce the correct offset.


      return match;
    });
    source += "';\n"; // If a variable is not specified, place data values in local scope.

    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
    source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + 'return __p;\n';
    var render;

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function template(data) {
      return render.call(this, data, _);
    }; // Provide the compiled source as a convenience for precompilation.


    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';
    return template;
  }; // Add a "chain" function. Start chaining a wrapped Underscore object.


  _.chain = function (obj) {
    var instance = _(obj);

    instance._chain = true;
    return instance;
  }; // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  // Helper function to continue chaining intermediate results.


  var chainResult = function chainResult(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  }; // Add your own custom functions to the Underscore object.


  _.mixin = function (obj) {
    _.each(_.functions(obj), function (name) {
      var func = _[name] = obj[name];

      _.prototype[name] = function () {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });

    return _;
  }; // Add all of the Underscore functions to the wrapper object.


  _.mixin(_); // Add all mutator Array functions to the wrapper.


  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
    var method = ArrayProto[name];

    _.prototype[name] = function () {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return chainResult(this, obj);
    };
  }); // Add all accessor Array functions to the wrapper.


  _.each(['concat', 'join', 'slice'], function (name) {
    var method = ArrayProto[name];

    _.prototype[name] = function () {
      return chainResult(this, method.apply(this._wrapped, arguments));
    };
  }); // Extracts the result from a wrapped and chained object.


  _.prototype.value = function () {
    return this._wrapped;
  }; // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.


  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function () {
    return String(this._wrapped);
  }; // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.


  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return _;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/utils/util.js":
/*!***************************!*\
  !*** ./src/utils/util.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _ = __webpack_require__(/*! ./underscore */ "./src/utils/underscore.js");

var V = __webpack_require__(/*! ./v.js */ "./src/utils/v.js");

var formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

var formatTime = function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

function isValidateCellphoneNumber(cellphone) {
  if (cellphone.match(/^(((13[0-9]{1})|159|153)+\d{8})$/)) {
    return true;
  } else {
    return false;
  }
}

function findObjectFromArrayByProp(arr, val, prop) {
  if (prop === undefined) prop = 'id';
  return _.find(arr, function (e) {
    return e[prop] === val;
  });
}

function findIndexInArrayByProp(arr, val, prop) {
  if (prop === undefined) prop = 'id';
  return _.findIndex(arr, function (e) {
    return e[prop] === val;
  });
}

function calLength(str) {
  var len = 0;

  for (var i = 0; i < str.length; i++) {
    var a = str.charAt(i);

    if (a.match(/[^\x00-\xff]/ig) != null) {
      len += 2;
    } else {
      len += 1;
    }
  }

  return len;
}

var sysInfo = wx.getSystemInfoSync();

function isIphoneX() {
  return sysInfo.model.indexOf('iPhone X') >= 0;
}

function isHighScreen() {
  return 1.0 * sysInfo.screenWidth / sysInfo.screenHeight < 1.0 * 375 / 690;
}

function getScreenHeight(cut) {
  return sysInfo.windowHeight * 750 / sysInfo.windowWidth - cut || 0;
}

function getPxToRpx(px) {
  return getPxRpxRate() * px;
}

function getPxRpxRate() {
  return 750.0 / sysInfo.windowWidth || 2;
}

function getPx(px, windowWidth) {
  // if (px == 375) return windowWidth;
  return parseInt(px * windowWidth * 1.0 / 375);
}

function getPxByRpx(rpx, windowWidth) {
  return getPx(rpx * 1.0 / 2, windowWidth);
}
/**
 * 绘制多行文本，并返回高度差
 * @param  CanvasContext ctx
 * @param  string text
 * @param  int x            [description]
 * @param  int y            [description]
 * @param  int maxWidth     [description]
 * @param  int lineHeight   [description]
 * @param  int defaultLines [description]
 * @param  boolean forceLine    固定内容行数
 * @return int              实际绘制高度-计划高度
 */


var drawText = function drawText(ctx, text, x, y, maxWidth, lineHeight, defaultLines, forceLine) {
  if (defaultLines === void 0) {
    defaultLines = 1;
  }

  var lineWidth = 0;
  var lineCount = 1;
  var initHeight = y; //绘制字体距离canvas顶部初始的高度

  var lastSubStrIndex = 0; //每次开始截取的字符串的索引

  for (var i = 0; i < text.length; i++) {
    lineWidth += ctx.measureText(text[i]).width;

    if (lineWidth > maxWidth) {
      if (forceLine) {
        ctx.fillText(text.substring(lastSubStrIndex, i - 3) + '...', x, initHeight); //绘制截取部分

        return 0;
      }

      ctx.fillText(text.substring(lastSubStrIndex, i), x, initHeight); //绘制截取部分

      initHeight += lineHeight || 24; //20为字体的高度

      lineWidth = 0;
      lastSubStrIndex = i;
      lineCount += 1;
    } // console.log(lineCount, defaultLines, lineHeight);


    if (i == text.length - 1) {
      //绘制剩余部分
      ctx.fillText(text.substring(lastSubStrIndex, i + 1), x, initHeight);
    }
  }

  return (lineCount - defaultLines) * (lineHeight || 24);
};

function setData(context, data) {
  if (!context || !context.setData || typeof context.setData !== 'function') return;

  var _data = _.extend({
    isIphoneX: isIphoneX(),
    isHighScreen: isHighScreen()
  }, data);

  context.setData(_data);
}

function toFixedFloat(f, n) {
  if (n === void 0) {
    n = 2;
  }

  return parseFloat(parseFloat(f).toFixed(n));
}

function getPositiveIndex(index, part) {
  return (part + index % part) % part;
}

function getTextLength(str) {
  if (!str) return 0;
  return str.match(/[^ -~]/g) == null ? str.length : str.length + str.match(/[^ -~]/g).length;
}

function tipNetworkException() {
  wx.showModal({
    title: '网络异常',
    content: '请确认网络状态',
    showCancel: false,
    confirmText: '好'
  });
}

function tipSystemException() {
  wx.showModal({
    title: '系统异常',
    content: '请联系客服',
    showCancel: false,
    confirmText: '好'
  });
}

function showLoading(title) {
  wx.showLoading({
    icon: 'loading',
    mask: true,
    title: title || '...'
  });
}

function hideLoading() {
  wx.hideLoading();
}

function warning(title) {
  wx.showToast({
    icon: 'none',
    title: title
  });
}

function success(title) {
  wx.showToast({
    icon: 'success',
    title: title
  });
}

function showModal(content, yFunc, title, showCancel, nFunc, cancelText) {
  if (!content) return;
  wx.showModal({
    title: title || '提示',
    content: content,
    success: function success(res) {
      return res.confirm ? yFunc && yFunc() : nFunc && nFunc();
    },
    showCancel: showCancel,
    cancelText: cancelText || '取消'
  });
}

function getOptions(options) {
  //scene=k1:v1;k2:v2;
  if (options.scene) {
    var scene = decodeURIComponent(options.scene); // 官方要求一定要先decodeURIComponent才能正常使用scene

    scene = scene.split(';');
    var obj = {};

    for (var i = 0; i < scene.length; i++) {
      var item = scene[i].split(':');
      obj[item[0]] = item[1];
    } // 将options.id 替换为scene中提取的id 以保证后续业务不受影响


    return obj;
  } else if (options.q) {
    //q={k1:v1,k2:v2};
    try {
      return JSON.parse(decodeURIComponent(options.q));
    } catch (e) {
      console.error(e);
      return {};
    }
  } else {
    return options;
  }
}

function toQueryString(obj) {
  return _.map(obj, function (v, k) {
    return k + "=" + v;
  }).join('&');
}

function encodeOptions(obj) {
  var q = encodeURIComponent(JSON.stringify(obj));
  return {
    q: q
  };
}

function isLastInArray(index, arr) {
  return arr && arr.length - 1 === index;
}

function downloadImage(url) {
  return new Promise(function (resolve, reject) {
    return wx.downloadFile({
      url: url,
      //仅为示例，并非真实的资源
      success: function success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) return resolve(res.tempFilePath);
        return reject(res);
      },
      fail: reject
    });
  });
}

function downloadAllImage(urls) {
  return Promise.all(_.map(urls, function (url) {
    return downloadImage(url);
  }));
}

/* harmony default export */ __webpack_exports__["default"] = ({
  formatNumber: formatNumber,
  formatTime: formatTime,
  isValidateCellphoneNumber: isValidateCellphoneNumber,
  findObjectFromArrayByProp: findObjectFromArrayByProp,
  findIndexInArrayByProp: findIndexInArrayByProp,
  calLength: calLength,
  setData: setData,
  isIphoneX: isIphoneX,
  isHighScreen: isHighScreen,
  getPositiveIndex: getPositiveIndex,
  getTextLength: getTextLength,
  getScreenHeight: getScreenHeight,
  toFixedFloat: toFixedFloat,
  tipSystemException: tipSystemException,
  tipNetworkException: tipNetworkException,
  showModal: showModal,
  success: success,
  warning: warning,
  showLoading: showLoading,
  hideLoading: hideLoading,
  encodeOptions: encodeOptions,
  toQueryString: toQueryString,
  getOptions: getOptions,
  isLastInArray: isLastInArray,
  getPx: getPx,
  getPxByRpx: getPxByRpx,
  drawText: drawText,
  downloadImage: downloadImage,
  downloadAllImage: downloadAllImage
});

/***/ }),

/***/ "./src/utils/v.js":
/*!************************!*\
  !*** ./src/utils/v.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

//ENV
module.exports.ENV = {
  DEV: 'dev',
  STAGING: 'staging',
  PROD: 'prod'
}; //HEADER AUTH TOKEN

module.exports.HEADER_AUTH_KEY = 'AUTH-TOKEN'; //PAGE PATH

module.exports.PATH = {
  HOME: '/pages/group_list/index',
  SHARE_INDEX: 'http://static.wx.qiaqiabox.com/images/include/share/share_index.png',
  SHARE_TEST: 'http://static.wx.qiaqiabox.com/images/include/share/share_test.png'
}; // RES STATUS

module.exports.RS = {
  SUCCESS: 200
}; //LANG

module.exports.LANG = {
  CN_ZH: 0,
  EN_US: 1
}; //GENDER

module.exports.GENDER = {
  UNKNOWN: 0,
  MALE: 1,
  FEMALE: 2
}; //STORAGE_KEY

module.exports.SK = {
  TOKEN: "TOKEN",
  LOGIN_CODE: "LOGIN_CODE",
  USER_INFO: "USER_INFO",
  GENDER: "GENDER"
};

/***/ })

};;