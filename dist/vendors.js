exports.ids = ["vendors"];
exports.modules = {

/***/ "./node_modules/_lin-ui@0.6.13@lin-ui/dist/behaviors/scrollCenter.js":
/*!***************************************************************************!*\
  !*** ./node_modules/_lin-ui@0.6.13@lin-ui/dist/behaviors/scrollCenter.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// eslint-disable-next-line no-undef
/* harmony default export */ __webpack_exports__["default"] = (Behavior({
  methods: {
    getRect(selector, all = false) {
      return new Promise((resolve, reject) => {
        const query = wx.createSelectorQuery().in(this);
        const type = all ? query.selectAll(selector) : query.select(selector);
        type.boundingClientRect((res) => {
          if (!res) return reject('找不到元素');
          resolve(res);
        }).exec();
      });
    },
    queryScrollNode(res, currentIndex, type = 'width') {
      const currentRect = res[currentIndex];

      this.getRect('.l-tabsscroll').then(_ => {
        const scrollWidth = _[type];

        let transformDistance = res
          .slice(0, currentIndex)
          .reduce((prev, curr) => prev + curr[type], 0);

        transformDistance += (currentRect[type] - scrollWidth) / 2;

        if (type === 'width') {
          this.setData({
            transformX: transformDistance,
            transformY: 0
          });
        } else {
          this.setData({
            transformX: 0,
            transformY: transformDistance
          });
        }
      });
    },
    queryMultipleNodes() {
      const {
        placement,
        currentIndex
      } = this.data;
      this.getRect('.l-tabs-item', true)
        .then((res) => {
          if (['top', 'bottom'].indexOf(placement) !== -1) {
            this.queryScrollNode(res, currentIndex);
          } else {
            this.queryScrollNode(res, currentIndex, 'height');
          }
        });
    }
  }
}));

/***/ }),

/***/ "./node_modules/_minapp-sdk@2.9.0@minapp-sdk/lib/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/_minapp-sdk@2.9.0@minapp-sdk/lib/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=64)}([function(t,e,n){(function(e){var r=e.BaaS||{};r._config=n(22),r._polyfill=n(23),r.use=function(t){return t(r)},t.exports=r}).call(this,n(11))},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(){return(o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}var i=n(4),a=n(2),u=n(0),s=n(3),c=n(25),f=n(12);Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(t,e){if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),r=n.length>>>0;if(0===r)return!1;var o,i,a=0|e,u=Math.max(a>=0?a:r-Math.abs(a),0);for(;u<r;){if((o=n[u])===(i=t)||"number"==typeof o&&"number"==typeof i&&isNaN(o)&&isNaN(i))return!0;u++}return!1}});var l=function(t,e){e=e||{};var n=function(n){var r=new RegExp("(&?)"+n+"=:"+n,"g"),o=encodeURIComponent(e[n]);t="undefined"!==o?t.replace(r,function(t,e){return e+n+"="+o}):t.replace(r,"");var i=new RegExp(":"+n,"g");t=t.replace(i,encodeURIComponent(e[n]))};for(var r in e)n(r);return t.replace(/([^:])\/\//g,function(t,e){return e+"/"})},h=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=u._config.REQUEST_PARAMS_MAP,n=o({},t);return Object.keys(t).map(function(r){Object.keys(e).map(function(o){if(r.startsWith(o)){var i=r.replace(o,e[o]);delete n[r],n[i]=t[r]}})}),n},p=function(t){var e="";return 404===t.statusCode?e="not found":t.data.error_msg?e=t.data.error_msg:t.data.message&&(e=t.data.message),e},d=function(t){return"[object Array]"===Object.prototype.toString.call(t)},_=function t(e){if(null==e)return Object.create(null);var n=d(e)?[]:Object.create(Object.getPrototypeOf(e));for(var o in e)e.hasOwnProperty(o)&&(e[o]&&"object"===r(e[o])?(n[o]=d(e[o])?[]:{},n[o]=t(e[o])):n[o]=e[o]);return n};var y=function(t,e){return t.replace(/:(\w*)/g,function(t,n){void 0!==e[n]&&delete e[n]}),e};t.exports={mergeRequestHeader:function(t){var e={"X-Hydrogen-Client-ID":u._config.CLIENT_ID,"X-Hydrogen-Client-Version":u._config.VERSION,"X-Hydrogen-Client-Platform":u._polyfill.CLIENT_PLATFORM,"X-Hydrogen-Client-SDK-Type":u._polyfill.SDK_TYPE},n=u.getAuthToken();return n&&(e.Authorization=u._config.AUTH_PREFIX+" "+n),o({},t||{},e)},log:f.log,setLogLevel:f.setLogLevel,format:l,getSysPlatform:function(){var t="UNKNOWN";try{t=u._polyfill.getSystemInfoSync().platform}catch(t){}return t},getFileNameFromPath:function(t){var e=t.lastIndexOf("/");return t.slice(e+1)},parseRegExp:function(t){var e=[],n=t.toString(),r=n.lastIndexOf("/");return e.push(n.substring(1,r)),r!==n.length-1&&e.push(n.substring(r+1)),e},replaceQueryParams:h,extractErrorMsg:p,isArray:d,isString:function(t){return"[object String]"===Object.prototype.toString.call(t)},isObject:function(t){var e=r(t);return null!=t&&"object"==e},isFunction:function(t){var e=r(t);return null!=t&&"function"==e},cloneDeep:_,isSessionExpired:function(){return Date.now()/1e3>=(i.get(a.STORAGE_KEY.EXPIRES_AT)||0)},excludeParams:y,doCreateRequestMethod:function(t){for(var e in t)t.hasOwnProperty(e)&&(u[e]=function(e){var n=t[e];return function(t){var e=_(t),r=n.method||"GET";n.defaultParams&&(e=o(_(n.defaultParams),e));var i=l(n.url,e),a={};return e.data?a=e.data:(a=y(n.url,e),a=h(a)),u._baasRequest({url:i,method:r,data:a})}}(e))},validateStatusCode:function(t){var e=parseInt(t.status||t.statusCode);if(e>=200&&e<300)return t;throw new s(e,p(t))},rateLimit:function(t){var e=null;return function(){return e||(e=t.apply(this,arguments).then(function(t){return e=null,t},function(t){throw e=null,t})),e}},fnUnsupportedHandler:function(){throw new s(611)},compareVersion:function(t,e){try{if("string"!=typeof t||"string"!=typeof e)return 0;t=t.replace(/^[^0-9]/,""),e=e.replace(/^[^0-9]/,"");for(var n=t.split("."),r=e.split("."),o=Math.max(n.length,r.length),i=0;i<o;i++){var a=n[i]?parseInt(n[i]):0,u=r[i]?parseInt(r[i]):0;if(a>u)return 1;if(a<u)return-1}return 0}catch(t){return 0}},makeReportTicketParam:function(t){if(!t)throw new s(605);var e={submission_type:"form_id"};return e.submission_value=t,e},extend:function(){return o.apply(void 0,arguments)},getUpdateUserProfileParam:function(t){var e;return Object.keys(a.UPDATE_USERPROFILE_VALUE).forEach(function(n){t===a.UPDATE_USERPROFILE_VALUE[n]&&(e=t)}),e||(e=a.UPDATE_USERPROFILE_VALUE.SETNX),e},ticketReportThrottle:c,getLimitationWithEnableTigger:n(30)}},function(t,e){t.exports={QUERY_LIMITATION_DEFAULT:20,STORAGE_KEY:{AUTH_TOKEN:"auth_token",USERINFO:"userinfo",UID:"uid",OPENID:"openid",UNIONID:"unionid",IS_LOGINED_BAAS:"is_logined_baas",IS_ANONYMOUS_USER:"is_anonymous_user",EXPIRES_AT:"session_expires_at",ALIPAY_USER_ID:"alipay_user_id",LATEST_VERSION_CHECK_MILLISECONDS:"latest_version_check_milliseconds",REPORT_TICKET_INVOKE_RECORD:"report_ticket_invoke_record"},VERSION_MIN_CHECK_INTERVAL:"86400000",STATUS_CODE:{CREATED:201,SUCCESS:200,UPDATE:200,PATCH:200,DELETE:204,UNAUTHORIZED:401,NOT_FOUND:404,SERVER_ERROR:500},UPLOAD:{UPLOAD_FILE_KEY:"file",HEADER_AUTH:"Authorization",HEADER_CLIENT:"X-Hydrogen-Client-ID",HEADER_AUTH_VALUE:"Hydrogen-r1 ",UA:"Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"},USER_PROFILE_BUILD_IN_FIELDS:["id","created_at","created_by","updated_at","country","nickname","province","city","language","openid","unionid","avatar","is_authorized","gender"],httpMethodCodeMap:{GET:200,POST:201,PUT:200,PATCH:200,DELETE:204},LOG_LEVEL:{DEBUG:"debug",INFO:"info",WARN:"warn",ERROR:"error"},UPDATE_USERPROFILE_VALUE:{OVERWRITE:"overwrite",SETNX:"setnx",FALSE:"false"},TICKET_REPORT_INVOKE_LIMIT:{MIN_INTERVAL_PRE_TIME:1e3,TIMES_LIMIT:{MAX_TIMES_PER_CYCLE:20,CYCLE:864e5}},THIRD_PARTY_AUTH_MODE:{POPUP_IFRAME:"popup-iframe",POPUP_WINDOW:"popup-window",REDIRECT:"redirect"},THIRD_PARTY_AUTH_STATUS:{SUCCESS:"success",FAIL:"fail"},THIRD_PARTY_AUTH_HANDLER:{LOGIN:"login",ASSOCIATE:"associate"},THIRD_PARTY_AUTH_PROVIDER:{WECHAT_MP:"oauth-wechat-mp",WECHAT_WEB:"oauth-wechat-web",WEIBO:"oauth-weibo"},THIRD_PARTY_AUTH_URL_PARAM:{PROVIDER:"provider",REFERER:"referer",MODE:"mode",DEBUG:"debug",CREATE_USER:"create_user",UPDATE_USER_PROFILE:"update_userprofile",WECHAT_IFRAME_CONTENT_STYLE:"wechat_iframe_content_style",HANDLER:"handler",TOKEN:"token",AUTH_RESULT:"auth-result"},PLATFORM:{WECHAT:"wechat_miniapp",ALIPAY:"alipay_miniapp",QQ:"qq_miniapp",BAIDU:"baidu_miniapp"}}},function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var r=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var r=new Error;return r.code=e,r.message=n?"".concat(e,": ").concat(n):"".concat(e,": ").concat(this.mapErrorMessage(e)),r}var e,r,o;return e=t,(r=[{key:"mapErrorMessage",value:function(t){switch(t){case 600:return"network disconnected";case 601:return"request timeout";case 602:return"uninitialized";case 603:return"unauthorized";case 604:return"session missing";case 605:return"incorrect parameter type";case 607:return"payment cancelled";case 608:return"payment failed";case 609:return"wxExtend function should be executed to allow plugin use wx.login, wx.getUserInfo, wx.requestPayment";case 610:return"errorTracker uninitialized";case 611:return"unsupported function";case 612:return"anonymous user is not allowed";case 613:return"third party auth denied";case 614:return"third party auth failed";case 615:return'gateway type "weixin_tenpay_js" works in WeChat builtin browser only';default:return"unknown error"}}}])&&n(e.prototype,r),o&&n(e,o),t}();t.exports=r},function(t,e,n){var r=n(0);t.exports={set:function(t,e){r._polyfill.setStorageSync("ifx_baas_"+t,e)},get:function(t){return r._polyfill.getStorageSync("ifx_baas_"+t)}}},function(t,e,n){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var o=n(3),i=n(6),a=n(1),u=n(2),s=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._initQueryParams()}var e,n,s;return e=t,(n=[{key:"_initQueryParams",value:function(){this._queryObject={},this._limit=null,this._offset=0,this._orderBy=null,this._keys=null,this._expand=null}},{key:"setQuery",value:function(t){if(!(t instanceof i))throw new o(605);return this._queryObject=a.cloneDeep(t.queryObject),this}},{key:"select",value:function(t){return t instanceof Array?this._keys=t.join(","):this._keys=t,this}},{key:"expand",value:function(t){return t instanceof Array?this._expand=t.join(","):this._expand=t,this}},{key:"limit",value:function(t){if(!Number.isInteger(t))throw new o(605);return this._limit=t,this}},{key:"offset",value:function(t){if(!Number.isInteger(t))throw new o(605);return this._offset=t,this}},{key:"orderBy",value:function(t){return t instanceof Array?this._orderBy=t.join(","):this._orderBy=t,this}},{key:"_handleAllQueryConditions",value:function(){var t={};return t.limit=null===this._limit?u.QUERY_LIMITATION_DEFAULT:this._limit,t.offset=this._offset,this._orderBy&&(t.order_by=this._orderBy),this._keys&&(t.keys=this._keys),this._expand&&(t.expand=this._expand),t.where=JSON.stringify(this._queryObject),t}}])&&r(e.prototype,n),s&&r(e,s),t}();t.exports=s},function(t,e,n){function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var i=n(8),a=n(9),u=n(3),s=n(1),c=n(7)._serializeValueFuncFactory(["BaseRecord"]),f=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.queryObject={}}var e,n,f;return e=t,f=[{key:"and",value:function(){for(var e=new t,n={$and:[]},r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return o.forEach(function(t){n.$and.push(t.queryObject)}),e._setQueryObject(n),e}},{key:"or",value:function(){for(var e=new t,n={$or:[]},r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return o.forEach(function(t){n.$or.push(t.queryObject)}),e._setQueryObject(n),e}}],(n=[{key:"compare",value:function(t,e,n){var o="eq";switch(e){case"=":o="eq";break;case"!=":o="ne";break;case"<":o="lt";break;case"<=":o="lte";break;case">":o="gt";break;case">=":o="gte";break;default:throw new u(605)}return this._addQueryObject(t,r({},o,c(n))),this}},{key:"contains",value:function(t,e){if(e&&s.isString(e))return this._addQueryObject(t,{contains:e}),this;throw new u(605)}},{key:"matches",value:function(t,e){if(e&&e instanceof RegExp){var n=s.parseRegExp(e);return n.length>1?this._addQueryObject(t,{regex:n[0],options:n[1]}):this._addQueryObject(t,{regex:n[0]}),this}throw new u(605)}},{key:"in",value:function(t,e){if(e&&e instanceof Array)return this._addQueryObject(t,{in:e.map(function(t){return c(t)})}),this;throw new u(605)}},{key:"notIn",value:function(t,e){if(e&&e instanceof Array)return this._addQueryObject(t,{nin:e.map(function(t){return c(t)})}),this;throw new u(605)}},{key:"arrayContains",value:function(t,e){if(e&&e instanceof Array)return this._addQueryObject(t,{all:e}),this;throw new u(605)}},{key:"isNull",value:function(t){var e=this;return t&&t instanceof Array?t.forEach(function(t){e._addQueryObject(t,{isnull:!0})}):this._addQueryObject(t,{isnull:!0}),this}},{key:"isNotNull",value:function(t){var e=this;return t&&t instanceof Array?t.forEach(function(t){e._addQueryObject(t,{isnull:!1})}):this._addQueryObject(t,{isnull:!1}),this}},{key:"exists",value:function(t){var e=this;return t&&t instanceof Array?t.forEach(function(t){e._addQueryObject(t,{exists:!0})}):this._addQueryObject(t,{exists:!0}),this}},{key:"notExists",value:function(t){var e=this;return t&&t instanceof Array?t.forEach(function(t){e._addQueryObject(t,{exists:!1})}):this._addQueryObject(t,{exists:!1}),this}},{key:"include",value:function(t,e){if(e&&e instanceof i)return this._addQueryObject(t,{intersects:e.toGeoJSON()}),this;throw new u(605)}},{key:"within",value:function(t,e){if(e&&e instanceof a)return this._addQueryObject(t,{within:e.toGeoJSON()}),this;throw new u(605)}},{key:"withinCircle",value:function(t,e,n){if(e&&e instanceof i){var r={radius:n,coordinates:[e.longitude,e.latitude]};return this._addQueryObject(t,{center:r}),this}throw new u(605)}},{key:"withinRegion",value:function(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;if(e&&e instanceof i){var o={geometry:e.toGeoJSON(),min_distance:r};return n&&(o.max_distance=n),this._addQueryObject(t,{nearsphere:o}),this}throw new u(605)}},{key:"hasKey",value:function(t,e){if("string"!=typeof t||"string"!=typeof e)throw u(605);return this._addQueryObject(t,{has_key:e}),this}},{key:"_setQueryObject",value:function(t){this.queryObject=t}},{key:"_addQueryObject",value:function(t,e){if(e.constructor!==Object)throw new u(605);var n=r({},t,{});Object.keys(e).forEach(function(r){n[t]["$".concat(r)]=e[r]}),this.queryObject.$and||(this.queryObject.$and=[]),this.queryObject.$and.push(n)}}])&&o(e.prototype,n),f&&o(e,f),t}();t.exports=f},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var i=n(3);function a(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["BaseRecord"],e=n(8),r=n(9);return function(n){return t.includes("Geo")&&(n instanceof e||n instanceof r)?n.toGeoJSON():t.includes("BaseRecord")&&n instanceof u?null==n._recordID?"":n._recordID.toString():n}}var u=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._recordID=e,this._recordValueInit()}var e,n,u;return e=t,(n=[{key:"_recordValueInit",value:function(){this._record={$set:{},$unset:{}}}},{key:"set",value:function(){for(var t=this,e=a(["BaseRecord","Geo"]),n=a(["Geo"]),o=arguments.length,u=new Array(o),s=0;s<o;s++)u[s]=arguments[s];if(1===u.length){if("object"!==r(u[0]))throw new i(605);var c=u[0],f={};Object.keys(u[0]).forEach(function(r){if(t._record.$unset.hasOwnProperty(r))throw new i(605);var o=c[r];Array.isArray(o)?f[r]=o.map(function(t){return n(t)}):f[r]=e(o)}),this._record.$set=f}else{if(2!==u.length)throw new i(605);if(this._record.$unset.hasOwnProperty(u[0]))throw new i(605);var l=u[1];Array.isArray(l)?this._record.$set[u[0]]=l.map(function(t){return n(t)}):this._record.$set[u[0]]=e(l)}return this}},{key:"unset",value:function(){for(var t=this,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];if("object"===r(n[0])){var a={};Object.keys(n[0]).forEach(function(e){if(t._record.$set.hasOwnProperty(e))throw new i(605);a[e]=""}),this._record.$unset=a}else{if("string"!=typeof n[0])throw new i(605);if(this._record.$set.hasOwnProperty(n[0]))throw new i(605);this._record.$unset[n[0]]=""}return this}},{key:"incrementBy",value:function(t,e){return this._record.$set[t]={$incr_by:e},this}},{key:"append",value:function(t,e){var n=a(["Geo"]);return e instanceof Array||(e=[e]),e=e.map(function(t){return n(t)}),this._record.$set[t]={$append:e},this}},{key:"uAppend",value:function(t,e){var n=a(["Geo"]);return e instanceof Array||(e=[e]),e=e.map(function(t){return n(t)}),this._record.$set[t]={$append_unique:e},this}},{key:"remove",value:function(t,e){var n=a(["Geo"]);return e instanceof Array||(e=[e]),e=e.map(function(t){return n(t)}),this._record.$set[t]={$remove:e},this}},{key:"patchObject",value:function(t,e){if("[object Object]"!==Object.prototype.toString.call(e))throw new i(605);return this._record.$set[t]={$update:e},this}}])&&o(e.prototype,n),u&&o(e,u),t}();u._serializeValueFuncFactory=a,t.exports=u},function(t,e,n){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var o=n(1),i=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.longitude=e,this.latitude=n,this.geoJSON={type:"Point",coordinates:[this.longitude,this.latitude]}}var e,n,i;return e=t,(n=[{key:"toGeoJSON",value:function(){return o.cloneDeep(this.geoJSON)}}])&&r(e.prototype,n),i&&r(e,i),t}();t.exports=i},function(t,e,n){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var o=n(8),i=n(3),a=n(1),u=function(){function t(e){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),!(e&&e instanceof Array))throw new i(605);if(e.length<4)throw new i(605);this.points=e,this.geoJSON={type:"Polygon",coordinates:[]}}var e,n,u;return e=t,(n=[{key:"toGeoJSON",value:function(){var t=[];return this.points.forEach(function(e){if(e instanceof o)t.push([e.longitude,e.latitude]);else{if(!(e instanceof Array&&2===e.length))throw new i(605);t.push(e)}}),this.geoJSON.coordinates=[t],a.cloneDeep(this.geoJSON)}}])&&r(e.prototype,n),u&&r(e,u),t}();t.exports=u},,function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){var r=n(2),o=n(26),i=function(t){return o({level:t})},a=i(r.LOG_LEVEL.ERROR);t.exports={log:function(t,e){a[t]&&a[t](e)},setLogLevel:function(t){Object.keys(r.LOG_LEVEL).forEach(function(e){r.LOG_LEVEL[e]===t&&(a=i(t))})}}},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(){return(o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var c=n(0),f=n(7),l=n(1),h=n(2).USER_PROFILE_BUILD_IN_FIELDS,p=n(3),d=c._config.API,_=function(t){function e(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),a(this,u(e).call(this,t))}var n,r,h;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(e,f),n=e,(r=[{key:"update",value:function(){var t=l.cloneDeep(this._record);return this._recordValueInit(),c.updateUser({data:t.$set})}},{key:"linkWechat",value:function(){return this._anonymous?Promise.reject(new p(612)):c._polyfill.linkWechat?c._polyfill.linkWechat.apply(null,arguments):Promise.reject(new p(605,"linkWechat 方法未定义"))}},{key:"linkAlipay",value:function(){return this._anonymous?Promise.reject(new p(612)):c._polyfill.linkAlipay?c._polyfill.linkAlipay.apply(null,arguments):Promise.reject(new p(605,"linkAlipay 方法未定义"))}},{key:"linkQQ",value:function(){return this._anonymous?Promise.reject(new p(612)):c._polyfill.linkQQ?c._polyfill.linkQQ.apply(null,arguments):Promise.reject(new p(605,"linkQQ 方法未定义"))}},{key:"linkBaidu",value:function(){return this._anonymous?Promise.reject(new p(612)):c._polyfill.linkBaidu?c._polyfill.linkBaidu.apply(null,arguments):Promise.reject(new p(605,"linkBaidu 方法未定义"))}},{key:"linkThirdParty",value:function(){return this._anonymous?Promise.reject(new p(612)):c._polyfill.linkThirdParty?c._polyfill.linkThirdParty.apply(null,arguments):Promise.reject(new p(605,"linkThirdParty 方法未定义"))}},{key:"updatePassword",value:function(t){var e=this,n=t.password,r=t.newPassword;return this._anonymous?Promise.reject(new p(612)):c._baasRequest({url:d.ACCOUNT_INFO,method:"PUT",data:{password:n,new_password:r}}).then(function(){return e})}},{key:"setEmail",value:function(t){var e=this,n=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).sendVerificationEmail,r=void 0!==n&&n;return this._anonymous?Promise.reject(new p(612)):c._baasRequest({url:d.ACCOUNT_INFO,method:"PUT",data:{email:t}}).then(function(n){return r&&e.requestEmailVerification(t),o(e._attribute,n.data),e})}},{key:"setUsername",value:function(t){var e=this;return this._anonymous?Promise.reject(new p(612)):c._baasRequest({url:d.ACCOUNT_INFO,method:"PUT",data:{username:t}}).then(function(t){return o(e._attribute,t.data),e})}},{key:"requestEmailVerification",value:function(){var t=this;return this._anonymous?Promise.reject(new p(612)):c._baasRequest({url:d.EMAIL_VERIFY,method:"POST"}).then(function(){return t})}},{key:"setAccount",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this._anonymous?Promise.reject(new p(612)):(e.password&&(e.new_password=e.password,delete e.password),c._baasRequest({url:d.ACCOUNT_INFO,method:"PUT",data:e}).then(function(e){return o(t._attribute,e.data),t}))}},{key:"setMobilePhone",value:function(t){var e=this;return this._anonymous?Promise.reject(new p(612)):c._baasRequest({url:d.ACCOUNT_INFO,method:"PUT",data:{phone:t}}).then(function(t){return o(e._attribute,t.data),e})}},{key:"verifyMobilePhone",value:function(t){var e=this;return this._anonymous?Promise.reject(new p(612)):c._baasRequest({url:d.VERIFY_MOBILE,method:"POST",data:{code:t}}).then(function(){return e})}}])&&i(n.prototype,r),h&&i(n,h),e}();_.initCurrentUser=function(t){if(!l.isObject(t))return new p(605);var e=new _;return e._attribute=o({},t),e.toJSON=function(){return this._attribute},e.get=function(t){return this._attribute[t]},Object.keys(t).forEach(function(n){("_"===n[0]||h.includes(n))&&(e[n]=t[n])}),e},t.exports=_},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var s=n(0),c=n(5),f=n(13),l=n(1),h=n(3),p=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,a(e).call(this))}var n,r,p;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(e,c),n=e,(r=[{key:"get",value:function(t){var e={userID:t};return this._expand&&(e.expand=this._expand),this._keys&&(e.keys=this._keys),this._initQueryParams(),s.getUserDetail(e)}},{key:"getWithoutData",value:function(t){if(l.isString(t)||Number.isInteger(t))return new f(t);throw new h(605)}},{key:"getCurrentUserWithoutData",value:function(){return new f}},{key:"find",value:function(){var t=this._handleAllQueryConditions();return this._initQueryParams(),s.getUserList(t)}}])&&o(n.prototype,r),p&&o(n,p),e}();t.exports=p},function(t,e,n){var r=n(0),o=n(3),i=r._config.API;t.exports=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(!t)throw new o(605);var a={function_name:t,sync:n};return void 0!==e&&(a.data=e),r._baasRequest({url:i.CLOUD_FUNCTION,method:"POST",data:a}).then(function(t){return t.data})}},,function(t,e,n){var r=n(0),o=n(2),i=n(3),a=n(4),u=n(1),s=n(13),c=n(14),f=r._config.API;function l(t,e){return t.phone?e?f.LOGIN_PHONE:f.REGISTER_PHONE:t.email?e?f.LOGIN_EMAIL:f.REGISTER_EMAIL:e?f.LOGIN_USERNAME:f.REGISTER_USERNAME}function h(t){return t.phone?{phone:t.phone,password:t.password}:t.email?{email:t.email,password:t.password}:{username:t.username||"",password:t.password}}var p=function(){var t=a.get(o.STORAGE_KEY.UID),e=a.get(o.STORAGE_KEY.EXPIRES_AT);return t&&e&&!u.isSessionExpired()?(new c).get(t).then(function(t){var n=s.initCurrentUser(t.data);return n.user_id=t.data.id,n.session_expires_at=e,n}):Promise.reject(new i(604))};t.exports={login:u.rateLimit(function(t){var e=l(t,!0),n=h(t);return r.request({url:e,method:"POST",data:n}).then(u.validateStatusCode).then(function(t){return r._polyfill.handleLoginSuccess(t),p()})}),logout:function(){return r.request({url:f.LOGOUT,method:"POST"}).then(u.validateStatusCode).then(function(t){return r.clearSession(),t})},silentLogin:function(){return Promise.reject(new i(605,"silentLogin 方法未定义"))},loginWithSmsVerificationCode:u.rateLimit(function(t,e){var n=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).createUser,o=void 0===n||n;return r.request({url:f.LOGIN_SMS,data:{phone:t,code:e,create_user:o},method:"POST"}).then(u.validateStatusCode).then(function(t){return r._polyfill.handleLoginSuccess(t,!1),p()})}),anonymousLogin:u.rateLimit(function(){return r.request({url:f.ANONYMOUS_LOGIN,method:"POST"}).then(u.validateStatusCode).then(function(t){return r._polyfill.handleLoginSuccess(t,!0),p()})}),requestPasswordReset:function(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).email;return r.request({url:f.PASSWORD_RESET,method:"POST",data:{email:t}}).then(u.validateStatusCode)},register:u.rateLimit(function(t){var e=l(t),n=h(t);return r.request({url:e,method:"POST",data:n}).then(u.validateStatusCode).then(function(t){return r._polyfill.handleLoginSuccess(t),p()})}),getCurrentUser:u.rateLimit(p)}},function(t,e,n){var r=n(0),o=n(2),i=n(1),a=[],u=!1;t.exports={pushStats:function(t){i.log(o.LOG_LEVEL.DEBUG,"<receive-stats> ".concat(t)),a.includes(t)||(a.push(t),i.log(o.LOG_LEVEL.DEBUG,"<push-stats> ".concat(t,", [").concat(a,"]")))},reportStats:function(){return u||!a.length?Promise.resolve():!r.storage.get(o.STORAGE_KEY.AUTH_TOKEN)||i.isSessionExpired()?Promise.resolve():(u=!0,i.log(o.LOG_LEVEL.DEBUG,"<report-stats> begin"),function t(){var e=a[0];i.log(o.LOG_LEVEL.DEBUG,"<report-stats> [".concat(e,"]: begin"));var n=o.PLATFORM.WECHAT;switch(r._polyfill.CLIENT_PLATFORM){case"ALIPAY":n=o.PLATFORM.ALIPAY;break;case"QQ":n=o.PLATFORM.QQ;break;case"BAIDU":n=o.PLATFORM.BAIDU;break;default:n=o.PLATFORM.WECHAT}return r._baasRequest({url:r._config.API.TEMPLATE_MESSAGE_EVENT_REPORT,method:"POST",data:{stats_id:e,platform:n}}).then(function(){if(i.log(o.LOG_LEVEL.DEBUG,"<report-stats> [".concat(e,"]: finish")),a.shift(),a.length)return t()})}().then(function(){i.log(o.LOG_LEVEL.DEBUG,"<report-stats> finish"),u=!1}).catch(function(t){throw i.log(o.LOG_LEVEL.DEBUG,"<report-stats> fail",t,a),u=!1,t}))}}},function(t,e){var n,r,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function u(t){if(n===setTimeout)return setTimeout(t,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(t){n=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(t){r=a}}();var s,c=[],f=!1,l=-1;function h(){f&&s&&(f=!1,s.length?c=s.concat(c):l=-1,c.length&&p())}function p(){if(!f){var t=u(h);f=!0;for(var e=c.length;e;){for(s=c,c=[];++l<e;)s&&s[l].run();l=-1,e=c.length}s=null,f=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function d(t,e){this.fun=t,this.array=e}function _(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];c.push(new d(t,e)),1!==c.length||f||u(p)},d.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=_,o.addListener=_,o.once=_,o.off=_,o.removeListener=_,o.removeAllListeners=_,o.emit=_,o.prependListener=_,o.prependOnceListener=_,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},,,function(t,e){var n={REGISTER_USERNAME:"/hserve/v2.1/register/username/",REGISTER_EMAIL:"/hserve/v2.1/register/email/",REGISTER_PHONE:"/hserve/v2.1/register/phone/",LOGIN_USERNAME:"/hserve/v2.1/login/username/",LOGIN_EMAIL:"/hserve/v2.1/login/email/",LOGIN_PHONE:"/hserve/v2.1/login/phone/",LOGIN_SMS:"/hserve/v2.1/login/sms/",EMAIL_VERIFY:"/hserve/v2.0/user/email-verify/",VERIFY_MOBILE:"/hserve/v2.1/sms-phone-verification/",ACCOUNT_INFO:"/hserve/v2.1/user/account/",PASSWORD_RESET:"/hserve/v2.0/user/password/reset/",ANONYMOUS_LOGIN:"/hserve/v2.0/login/anonymous/",LOGOUT:"/hserve/v2.0/session/destroy/",UPLOAD:"/hserve/v2.1/upload/",CLOUD_FUNCTION:"/hserve/v1/cloud-function/job/",USER_DETAIL:"/hserve/v2.0/user/info/:userID/",USER_LIST:"/hserve/v2.0/user/info/",UPDATE_USER:"/hserve/v2.0/user/info/",TABLE_LIST:"/hserve/v2.0/table/",TABLE_DETAIL:"/hserve/v2.0/table/:tableID/",RECORD_LIST:"/hserve/v2.0/table/:tableID/record/",QUERY_RECORD_LIST:"/hserve/v2.0/table/:tableID/record/",CREATE_RECORD_LIST:"/hserve/v2.0/table/:tableID/record/?enable_trigger=:enable_trigger",RECORD_DETAIL:"/hserve/v2.0/table/:tableID/record/:recordID/",CREATE_RECORD:"/hserve/v2.0/table/:tableID/record/",UPDATE_RECORD:"/hserve/v2.0/table/:tableID/record/:recordID/",UPDATE_RECORD_LIST:"/hserve/v2.0/table/:tableID/record/?limit=:limit&offset=:offset&where=:where&enable_trigger=:enable_trigger",DELETE_RECORD:"/hserve/v2.0/table/:tableID/record/:recordID/",DELETE_RECORD_LIST:"/hserve/v2.0/table/:tableID/record/?limit=:limit&offset=:offset&where=:where&enable_trigger=:enable_trigger",LAGECY_CONTENT_LIST:"/hserve/v1/content/detail/",CONTENT_LIST:"/hserve/v2.0/content/detail/",CONTENT_GROUP_LIST:"/hserve/v2.0/content/group/",CONTENT_DETAIL:"/hserve/v2.0/content/detail/:richTextID/",CONTENT_GROUP_DETAIL:"/hserve/v2.0/content/group/",CONTENT_CATEGORY_LIST:"/hserve/v2.0/content/category/",CONTENT_CATEGORY_DETAIL:"/hserve/v2.0/content/category/:categoryID/",FILE_DETAIL:"/hserve/v2.1/uploaded-file/:fileID/",FILE_LIST:"/hserve/v2.1/uploaded-file/",DELETE_FILE:"/hserve/v2.1/uploaded-file/:fileID/",DELETE_FILES:"/hserve/v2.1/uploaded-file/",FILE_CATEGORY_DETAIL:"/hserve/v1.3/file-category/:categoryID/",FILE_CATEGORY_LIST:"/hserve/v1.3/file-category/",CENSOR_IMAGE:"/hserve/v1.7/censor-image/",CENSOR_MSG:"/hserve/v1.7/censor-msg/",SEND_SMS_CODE:"/hserve/v2.2/sms-verification-code/",VERIFY_SMS_CODE:"/hserve/v1.8/sms-verification-code/verify/",PAY:"/hserve/v2.2/idp/pay/order/",ORDER:"/hserve/v2.0/idp/pay/order/:transactionID/",TEMPLATE_MESSAGE_EVENT_REPORT:"/hserve/v2.0/template-message/event-report/",WEB:{THIRD_PARTY_AUTH:"/hserve/v2.0/idp/:provider/redirect/",THIRD_PARTY_LOGIN:"/hserve/v2.0/idp/:provider/authenticate/",THIRD_PARTY_ASSOCIATE:"/hserve/v2.0/idp/:provider/user-association/"},WECHAT:{SILENT_LOGIN:"/hserve/v2.1/idp/wechat/silent-login/",AUTHENTICATE:"/hserve/v2.1/idp/wechat/authenticate/",USER_ASSOCIATE:"/hserve/v2.0/idp/wechat/user-associate/",TEMPLATE_MESSAGE:"/hserve/v2.0/template-message-ticket/",SUBSCRIBE_MESSAGE:"/hserve/v2.2/subscription-message/relationship-report/",DECRYPT:"/hserve/v1/wechat/decrypt/",WXACODE:"/hserve/v1.4/miniappcode/",CENSOR_IMAGE:"/hserve/v1.7/censor-image/",CENSOR_MSG:"/hserve/v1.7/censor-msg/",CENSOR_ASYNC:"/hserve/v2.2/async-censor/"},QQ:{SILENT_LOGIN:"/hserve/v2.0/idp/qq/silent-login/",AUTHENTICATE:"/hserve/v2.0/idp/qq/authenticate/",USER_ASSOCIATE:"/hserve/v2.0/idp/qq/user-association/",TEMPLATE_MESSAGE:"/hserve/v2.0/template-message-ticket/",DECRYPT:"/hserve/v2.0/qq/decrypt/",CENSOR_IMAGE:"/hserve/v2.2/qq/censor-image/",CENSOR_MSG:"/hserve/v2.2/qq/censor-msg/"},BAIDU:{SILENT_LOGIN:"/hserve/v2.1/idp/baidu/silent-login/",AUTHENTICATE:"/hserve/v2.1/idp/baidu/authenticate/",USER_ASSOCIATE:"/hserve/v2.1/idp/baidu/user-association/",TEMPLATE_MESSAGE:"/hserve/v2.0/template-message-ticket/"},ALIPAY:{SILENT_LOGIN:"/hserve/v2.1/idp/alipay/silent-login/",AUTHENTICATE:"/hserve/v2.1/idp/alipay/authenticate/",USER_ASSOCIATE:"/hserve/v2.0/idp/alipay/user-associate/",TEMPLATE_MESSAGE:"/hserve/v2.0/template-message-ticket/",MINIAPP_QR_CODE:"/hserve/v2.0/idp/alipay/miniapp-qr-code/"},VIDEO_SNAPSHOT:"/hserve/v1/media/video-snapshot/",M3U8_CONCAT:"/hserve/v1/media/m3u8-concat/",M3U8_CLIP:"/hserve/v1/media/m3u8-clip/",M3U8_META:"/hserve/v1/media/m3u8-meta/",VIDEO_AUDIO_META:"/hserve/v1/media/audio-video-meta/",GET_ASYNC_JOB_RESULT:"/hserve/v1/bulk-operation/:id/",LATEST_VERSION:"/hserve/v1/latest-sdk-version/"},r=[{getUserInfo:{url:n.USER_DETAIL,defaultParams:{userID:""}},getUserDetail:{url:n.USER_DETAIL},getUserList:{url:n.USER_LIST},updateUser:{url:n.UPDATE_USER,method:"PUT"}},{getTableList:{url:n.TABLE_LIST},getTable:{url:n.TABLE_DETAIL},getRecordList:{url:n.RECORD_LIST},queryRecordList:{url:n.QUERY_RECORD_LIST},getRecord:{url:n.RECORD_DETAIL},createRecord:{url:n.CREATE_RECORD,method:"POST"},createRecordList:{url:n.CREATE_RECORD_LIST,method:"POST"},updateRecord:{url:n.UPDATE_RECORD,method:"PUT"},updateRecordList:{url:n.UPDATE_RECORD_LIST,method:"PUT"},deleteRecord:{url:n.DELETE_RECORD,method:"DELETE"},deleteRecordList:{url:n.DELETE_RECORD_LIST,method:"DELETE"}},{getContentList:{url:n.LAGECY_CONTENT_LIST},getContentList2:{url:n.CONTENT_LIST},getContent:{url:n.CONTENT_DETAIL},getContentGroupList:{url:n.CONTENT_GROUP_LIST},getContentGroup:{url:n.CONTENT_GROUP_DETAIL},getContentCategoryList:{url:n.CONTENT_CATEGORY_LIST},getContentCategory:{url:n.CONTENT_CATEGORY_DETAIL}},{getFileDetail:{url:n.FILE_DETAIL},getFileList:{url:n.FILE_LIST},deleteFile:{url:n.DELETE_FILE,method:"DELETE"},deleteFiles:{url:n.DELETE_FILES,method:"DELETE"},getFileCategoryDetail:{url:n.FILE_CATEGORY_DETAIL},getFileCategoryList:{url:n.FILE_CATEGORY_LIST},sendSmsCode:{url:n.SEND_SMS_CODE,method:"POST"},verifySmsCode:{url:n.VERIFY_SMS_CODE,method:"POST"}},{getOrderList:{url:n.PAY}}];t.exports={API_HOST:"https://api.myminapp.com",API:n,AUTH_PREFIX:"Hydrogen-r1",METHOD_MAP_LIST:r,DEBUG:!1,RANDOM_OPTION:{max:100},REQUEST_PARAMS_MAP:{contentGroupID:"content_group_id",categoryID:"category_id",recordID:"id",submissionType:"submission_type",submissionValue:"submission_value",categoryName:"category_name",signatureID:"signature_id"},SDK_DOWNLOAD_PAGE:"https://doc.minapp.com/js-sdk/download-sdk.html",VERSION:"v2.0.1-a"}},function(t,e,n){t.exports={getAPIHost:function(){return"https://".concat(n(0)._config.CLIENT_ID,".myminapp.com")},SDK_TYPE:"file",CLIENT_PLATFORM:"UNKNOWN",checkLatestVersion:function(){return null}}},function(t,e,n){var r=n(2),o=n(4),i=n(3),a=n(1);t.exports=function(t){t.init=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.autoLogin,o=void 0!==r&&r,u=n.logLevel,s=void 0===u?"":u;if(!a.isString(e))throw new i(605);s&&a.setLogLevel(s),t._config.AUTO_LOGIN=o,t._config.CLIENT_ID=e,t._config.API_HOST=t._polyfill.getAPIHost(e),t._polyfill.checkLatestVersion()},t.getAuthToken=function(){return o.get(r.STORAGE_KEY.AUTH_TOKEN)},t.checkVersion=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.platform,i=e.onSuccess,u=e.onError;i||(i=function(e){var o=e.statusCode||e.status;parseInt(o)!==r.STATUS_CODE.SUCCESS?u&&u(e):-1===a.compareVersion(t._config.VERSION,e.data[n])&&a.log(r.LOG_LEVEL.WARN,"【知晓云 SDK 更新提示】当前 SDK 版本为 ".concat(t._config.VERSION," 最新版本为 ").concat(e.data[n],"，请前往 ").concat(t._config.SDK_DOWNLOAD_PAGE," 下载。"))});var s=Date.now(),c=o.get(r.STORAGE_KEY.LATEST_VERSION_CHECK_MILLISECONDS);c&&c-s<=r.VERSION_MIN_CHECK_INTERVAL||(o.set(r.STORAGE_KEY.LATEST_VERSION_CHECK_MILLISECONDS,s),t.request({url:t._config.API.LATEST_VERSION}).then(i,u))},t.clearSession=function(){o.set(r.STORAGE_KEY.AUTH_TOKEN,""),o.set(r.STORAGE_KEY.IS_LOGINED_BAAS,""),o.set(r.STORAGE_KEY.IS_ANONYMOUS_USER,""),o.set(r.STORAGE_KEY.USERINFO,""),o.set(r.STORAGE_KEY.UID,"")},t._createRequestMethod=function(){t._config.METHOD_MAP_LIST.map(function(t){a.doCreateRequestMethod(t)})},t.auth=n(17),t.ContentGroup=n(31),t.File=n(32),t.FileCategory=n(33),t.GeoPoint=n(8),t.GeoPolygon=n(9),t.invokeFunction=n(15),t.invoke=n(15),t.Query=n(6),t.storage=n(4),t.TableObject=n(34),t.User=n(14),t.Order=n(36),t.getAsyncJobResult=n(37)}},function(t,e,n){var r,o=n(2),i=n(4),a=n(12).log;t.exports=function(t){return function(e){var n=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).enableThrottle;if(void 0===n||!n)return t(e);var u=o.LOG_LEVEL,s=o.TICKET_REPORT_INVOKE_LIMIT,c=o.STORAGE_KEY,f=Date.now();if(a(u.DEBUG,"<ticket-report> last: ".concat(r,", now: ").concat(f)),r&&f-r<=s.MIN_INTERVAL_PRE_TIME)return Promise.resolve();var l=i.get(c.REPORT_TICKET_INVOKE_RECORD),h=l&&f-l.timestamp>s.TIMES_LIMIT.CYCLE;return a(u.DEBUG,"<ticket-report> record: ".concat(JSON.stringify(l),", now: ").concat(f)),l&&l.invokeTimes>=s.TIMES_LIMIT.MAX_TIMES_PER_CYCLE&&!h?Promise.resolve():(!l||h||function(t){return isNaN(t.invokeTimes)||isNaN(t.timestamp)}(l)?l={invokeTimes:1,timestamp:Date.now()}:l.invokeTimes+=1,t&&"function"==typeof t?(r=f,i.set(c.REPORT_TICKET_INVOKE_RECORD,l),t(e).then(function(t){return a(u.DEBUG,"<ticket-report> invoke success ".concat(Date.now()-f,"ms")),t}).catch(function(t){throw l.invokeTimes-=1,i.set(c.REPORT_TICKET_INVOKE_RECORD,l),a(u.DEBUG,"<ticket-report> invoke fail ".concat(Date.now()-f,"ms err: ").concat(t)),t})):(a(u.DEBUG,"<ticket-report> invoke fail"),void a(u.ERROR,new TypeError('"ticketReportFn" must be Function type'))))}}},function(t,e,n){"use strict";var r=n(27),o=["trace","debug","info","warn","error","fatal"],i=function(){};t.exports=function(t){(t=t||{}).level=t.level||"info";var e={};return o.forEach(function(n){e[n]=function(e){return o.indexOf(e)>=o.indexOf(t.level)}(n)?function(){var e,o=t.prefix;if(t.stderr)e="error";else switch(n){case"trace":case"debug":e="info";break;case"fatal":e="error";break;default:e=n}o&&("function"==typeof o&&(o=o(n)),arguments[0]=r.format(o,arguments[0]));console[e](r.format.apply(r,arguments))}:i}),e}},function(t,e,n){(function(t,r){var o=/%[sdj%]/g;e.format=function(t){if(!g(t)){for(var e=[],n=0;n<arguments.length;n++)e.push(u(arguments[n]));return e.join(" ")}n=1;for(var r=arguments,i=r.length,a=String(t).replace(o,function(t){if("%%"===t)return"%";if(n>=i)return t;switch(t){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(t){return"[Circular]"}default:return t}}),s=r[n];n<i;s=r[++n])_(s)||!b(s)?a+=" "+s:a+=" "+u(s);return a},e.deprecate=function(n,o){if(v(t.process))return function(){return e.deprecate(n,o).apply(this,arguments)};if(!0===r.noDeprecation)return n;var i=!1;return function(){if(!i){if(r.throwDeprecation)throw new Error(o);r.traceDeprecation?console.trace(o):console.error(o),i=!0}return n.apply(this,arguments)}};var i,a={};function u(t,n){var r={seen:[],stylize:c};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),d(n)?r.showHidden=n:n&&e._extend(r,n),v(r.showHidden)&&(r.showHidden=!1),v(r.depth)&&(r.depth=2),v(r.colors)&&(r.colors=!1),v(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=s),f(r,t,r.depth)}function s(t,e){var n=u.styles[e];return n?"["+u.colors[n][0]+"m"+t+"["+u.colors[n][1]+"m":t}function c(t,e){return t}function f(t,n,r){if(t.customInspect&&n&&O(n.inspect)&&n.inspect!==e.inspect&&(!n.constructor||n.constructor.prototype!==n)){var o=n.inspect(r,t);return g(o)||(o=f(t,o,r)),o}var i=function(t,e){if(v(e))return t.stylize("undefined","undefined");if(g(e)){var n="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(n,"string")}if(y(e))return t.stylize(""+e,"number");if(d(e))return t.stylize(""+e,"boolean");if(_(e))return t.stylize("null","null")}(t,n);if(i)return i;var a=Object.keys(n),u=function(t){var e={};return t.forEach(function(t,n){e[t]=!0}),e}(a);if(t.showHidden&&(a=Object.getOwnPropertyNames(n)),w(n)&&(a.indexOf("message")>=0||a.indexOf("description")>=0))return l(n);if(0===a.length){if(O(n)){var s=n.name?": "+n.name:"";return t.stylize("[Function"+s+"]","special")}if(E(n))return t.stylize(RegExp.prototype.toString.call(n),"regexp");if(m(n))return t.stylize(Date.prototype.toString.call(n),"date");if(w(n))return l(n)}var c,b="",T=!1,S=["{","}"];(p(n)&&(T=!0,S=["[","]"]),O(n))&&(b=" [Function"+(n.name?": "+n.name:"")+"]");return E(n)&&(b=" "+RegExp.prototype.toString.call(n)),m(n)&&(b=" "+Date.prototype.toUTCString.call(n)),w(n)&&(b=" "+l(n)),0!==a.length||T&&0!=n.length?r<0?E(n)?t.stylize(RegExp.prototype.toString.call(n),"regexp"):t.stylize("[Object]","special"):(t.seen.push(n),c=T?function(t,e,n,r,o){for(var i=[],a=0,u=e.length;a<u;++a)I(e,String(a))?i.push(h(t,e,n,r,String(a),!0)):i.push("");return o.forEach(function(o){o.match(/^\d+$/)||i.push(h(t,e,n,r,o,!0))}),i}(t,n,r,u,a):a.map(function(e){return h(t,n,r,u,e,T)}),t.seen.pop(),function(t,e,n){if(t.reduce(function(t,e){return 0,e.indexOf("\n")>=0&&0,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0)>60)return n[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+n[1];return n[0]+e+" "+t.join(", ")+" "+n[1]}(c,b,S)):S[0]+b+S[1]}function l(t){return"["+Error.prototype.toString.call(t)+"]"}function h(t,e,n,r,o,i){var a,u,s;if((s=Object.getOwnPropertyDescriptor(e,o)||{value:e[o]}).get?u=s.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):s.set&&(u=t.stylize("[Setter]","special")),I(r,o)||(a="["+o+"]"),u||(t.seen.indexOf(s.value)<0?(u=_(n)?f(t,s.value,null):f(t,s.value,n-1)).indexOf("\n")>-1&&(u=i?u.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+u.split("\n").map(function(t){return"   "+t}).join("\n")):u=t.stylize("[Circular]","special")),v(a)){if(i&&o.match(/^\d+$/))return u;(a=JSON.stringify(""+o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(a=a.substr(1,a.length-2),a=t.stylize(a,"name")):(a=a.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),a=t.stylize(a,"string"))}return a+": "+u}function p(t){return Array.isArray(t)}function d(t){return"boolean"==typeof t}function _(t){return null===t}function y(t){return"number"==typeof t}function g(t){return"string"==typeof t}function v(t){return void 0===t}function E(t){return b(t)&&"[object RegExp]"===T(t)}function b(t){return"object"==typeof t&&null!==t}function m(t){return b(t)&&"[object Date]"===T(t)}function w(t){return b(t)&&("[object Error]"===T(t)||t instanceof Error)}function O(t){return"function"==typeof t}function T(t){return Object.prototype.toString.call(t)}function S(t){return t<10?"0"+t.toString(10):t.toString(10)}e.debuglog=function(t){if(v(i)&&(i=r.env.NODE_DEBUG||""),t=t.toUpperCase(),!a[t])if(new RegExp("\\b"+t+"\\b","i").test(i)){var n=r.pid;a[t]=function(){var r=e.format.apply(e,arguments);console.error("%s %d: %s",t,n,r)}}else a[t]=function(){};return a[t]},e.inspect=u,u.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},u.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},e.isArray=p,e.isBoolean=d,e.isNull=_,e.isNullOrUndefined=function(t){return null==t},e.isNumber=y,e.isString=g,e.isSymbol=function(t){return"symbol"==typeof t},e.isUndefined=v,e.isRegExp=E,e.isObject=b,e.isDate=m,e.isError=w,e.isFunction=O,e.isPrimitive=function(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||void 0===t},e.isBuffer=n(28);var A=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function I(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.log=function(){var t,n;console.log("%s - %s",(t=new Date,n=[S(t.getHours()),S(t.getMinutes()),S(t.getSeconds())].join(":"),[t.getDate(),A[t.getMonth()],n].join(" ")),e.format.apply(e,arguments))},e.inherits=n(29),e._extend=function(t,e){if(!e||!b(e))return t;for(var n=Object.keys(e),r=n.length;r--;)t[n[r]]=e[n[r]];return t}}).call(this,n(11),n(19))},function(t,e){t.exports=function(t){return t&&"object"==typeof t&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}},function(t,e){"function"==typeof Object.create?t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,e){t.super_=e;var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},function(t,e,n){var r=n(2);t.exports=function(t,e){return null!=t?t:e?r.QUERY_LIMITATION_DEFAULT:void 0}},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var s=n(0),c=n(5),f=n(6),l=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=i(this,a(e).call(this)))._contentGroupID=t,n}var n,r,l;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(e,c),n=e,(r=[{key:"getContent",value:function(t){var e={richTextID:t};return this._expand&&(e.expand=this._expand),this._keys&&(e.keys=this._keys),this._initQueryParams(),s.getContent(e)}},{key:"find",value:function(){var t=this._handleAllQueryConditions();return t.contentGroupID=this._contentGroupID,this._initQueryParams(),s.getContentList2(t)}},{key:"getCategoryList",value:function(){return s.getContentCategoryList({contentGroupID:this._contentGroupID,limit:100})}},{key:"getCategory",value:function(t){var e=new f;return e.compare("group_id","=",this._contentGroupID),s.getContentCategory({categoryID:t,where:JSON.stringify(e.queryObject)})}}])&&o(n.prototype,r),l&&o(n,l),e}();t.exports=l},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var s=n(0),c=n(5),f=s._config.API,l=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,a(e).call(this))}var n,r,l;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(e,c),n=e,(r=[{key:"upload",value:function(t,e){return s.uploadFile(t,e,"json")}},{key:"delete",value:function(t){return t instanceof Array?s.deleteFiles({id__in:t}):s.deleteFile({fileID:t})}},{key:"get",value:function(t){return s.getFileDetail({fileID:t})}},{key:"find",value:function(){var t=this._handleAllQueryConditions();return this._initQueryParams(),s.getFileList(t)}},{key:"genVideoSnapshot",value:function(t){return s._baasRequest({url:f.VIDEO_SNAPSHOT,method:"POST",data:t}).then(function(t){return t.data})}},{key:"videoConcat",value:function(t){return s._baasRequest({url:f.M3U8_CONCAT,method:"POST",data:t}).then(function(t){return t.data})}},{key:"videoClip",value:function(t){return s._baasRequest({url:f.M3U8_CLIP,method:"POST",data:t}).then(function(t){return t.data})}},{key:"videoMeta",value:function(t){return s._baasRequest({url:f.M3U8_META,method:"POST",data:t}).then(function(t){return t.data})}},{key:"videoAudioMeta",value:function(t){return s._baasRequest({url:f.VIDEO_AUDIO_META,method:"POST",data:t}).then(function(t){return t.data})}}])&&o(n.prototype,r),l&&o(n,l),e}();t.exports=l},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var s=n(0),c=n(5),f=n(6),l=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,a(e).call(this))}var n,r,l;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(e,c),n=e,(r=[{key:"get",value:function(t){return s.getFileCategoryDetail({categoryID:t})}},{key:"getFileList",value:function(t){var e=new f;return e.in("category_id",[t]),s.getFileList({where:JSON.stringify(e.queryObject)})}},{key:"find",value:function(){var t=this._handleAllQueryConditions();return this._initQueryParams(),s.getFileCategoryList(t)}}])&&o(n.prototype,r),l&&o(n,l),e}();t.exports=l},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t,e,n){return(a="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=u(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var c=n(0),f=n(5),l=n(3),h=n(6),p=n(35),d=n(1),_=n(7),y=(n(2),function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=i(this,u(e).call(this)))._tableID=t,n}var n,r,y;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(e,f),n=e,(r=[{key:"create",value:function(){return new p(this._tableID)}},{key:"createMany",value:function(t){var e=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).enableTrigger,n=void 0===e||e,r=_._serializeValueFuncFactory(["BaseRecord"]);if(d.isArray(t)){var o={tableID:this._tableID,data:t.map(function(t){return Object.keys(t).forEach(function(e){t[e]=r(t[e])}),t}),enable_trigger:n?1:0};return c.createRecordList(o)}throw new l(605)}},{key:"delete",value:function(t){var e=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).enableTrigger,n=void 0===e||e;if(d.isString(t)||Number.isInteger(t))return c.deleteRecord({tableID:this._tableID,recordID:t});if(t instanceof h){var r={tableID:this._tableID,limit:d.getLimitationWithEnableTigger(this._limit,n),offset:this._offset,where:JSON.stringify(t.queryObject),enable_trigger:n?1:0};return this._initQueryParams(),c.deleteRecordList(r)}throw new l(605)}},{key:"getWithoutData",value:function(t){if(d.isString(t)||Number.isInteger(t))return new p(this._tableID,t);if(t instanceof h){var e={};return e.limit=this._limit,e.offset=this._offset,e.where=d.cloneDeep(t.queryObject),this._initQueryParams(),new p(this._tableID,null,e)}throw new l(605)}},{key:"get",value:function(t){var e={tableID:this._tableID,recordID:t};return this._expand&&(e.expand=this._expand),this._keys&&(e.keys=this._keys),this._initQueryParams(),c.getRecord(e)}},{key:"_handleAllQueryConditions",value:function(){var t=a(u(e.prototype),"_handleAllQueryConditions",this).call(this);return t.tableID=this._tableID,t}},{key:"find",value:function(){var t=this._handleAllQueryConditions();return this._initQueryParams(),c.queryRecordList(t)}},{key:"count",value:function(){return this.limit(1).find().then(function(t){return t.data.meta.total_count})}}])&&o(n.prototype,r),y&&o(n,y),e}());t.exports=y},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var s=n(0),c=n(7),f=n(1),l=function(t){function e(t,n){var r,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(r=i(this,a(e).call(this,n)))._tableID=t,r._queryObject=o,r}var n,r,l;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(e,c),n=e,(r=[{key:"save",value:function(){var t=f.cloneDeep(this._record);return this._recordValueInit(),s.createRecord({tableID:this._tableID,data:t.$set})}},{key:"update",value:function(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).enableTrigger,e=void 0===t||t,n=f.cloneDeep(this._record);if(this._recordValueInit(),this._recordID)return s.updateRecord({tableID:this._tableID,recordID:this._recordID,data:n});var r={tableID:this._tableID,data:n,where:JSON.stringify(this._queryObject.where),limit:f.getLimitationWithEnableTigger(this._queryObject.limit,e),offset:this._queryObject.offset,enable_trigger:e?1:0};return this._queryObject={},s.updateRecordList(r)}}])&&o(n.prototype,r),l&&o(n,l),e}();t.exports=l},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(){return(o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var c=n(0),f=n(1),l=n(5),h=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),a(this,u(e).apply(this,arguments))}var n,r,h;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(e,l),n=e,(r=[{key:"get",value:function(t){var e=c._config.API,n=f.format(e.ORDER,{transactionID:t});return c._baasRequest({url:n})}},{key:"getOrderList",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=o({},this._handleAllQueryConditions(),t);return this._initQueryParams(),c.getOrderList(o(e,t))}}])&&i(n.prototype,r),h&&i(n,h),e}();t.exports=h},function(t,e,n){var r=n(0),o=n(1),i=r._config.API;t.exports=function(t){return r._baasRequest({url:o.format(i.GET_ASYNC_JOB_RESULT,{id:t})})}},function(t,e,n){var r=n(0),o=n(2),i=n(1);t.exports={getUploadFileConfig:function(t,e){return e.filename=t,r._baasRequest({url:r._polyfill.getAPIHost()+r._config.API.UPLOAD,method:"POST",data:e})},getUploadHeaders:function(){return{Authorization:o.UPLOAD.HEADER_AUTH_VALUE+r.getAuthToken(),"X-Hydrogen-Client-Version":r._config.VERSION,"X-Hydrogen-Client-Platform":i.getSysPlatform(),"X-Hydrogen-Client-ID":r._config.CLIENT_ID,"User-Agent":o.UPLOAD.UA}}}},,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){var r=n(0),o=n(24),i=n(65),a=n(66),u=n(67),s=n(68),c=n(69);r._config.VERSION="v2.9.0",r.use(o),r.use(a),r.use(i),r.use(u),r.use(s),r.use(c),r.pay=n(70),r.order=n(71),r.request=n(72),r._baasRequest=n(73),r.uploadFile=n(74),r.getWXACode=n(75),r.wxDecryptData=n(76),r.wxReportTicket=n(77),r.ErrorTracker=n(78),r._createRequestMethod(),"undefined"!=typeof wx&&(wx.BaaS=r),t.exports=r},function(t,e,n){function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}var o=n(2),i=n(3),a=n(4),u=n(1),s=n(17);t.exports=function(t){var e=t._polyfill,n=t._config.API,c=function(){return new Promise(function(n,r){e.wxLogin({success:function(t){n(t.code)},fail:function(){t.request.wxRequestFail(r)}})})},f=function(e,r,o){var i=e.code,a=e.createUser;return t.request({url:n.WECHAT.SILENT_LOGIN,method:"POST",data:{create_user:a,code:i}}).then(u.validateStatusCode).then(function(e){t._polyfill.handleLoginSuccess(e),r(e)},o)},l=u.rateLimit(function(){return a.get(o.STORAGE_KEY.AUTH_TOKEN)&&!u.isSessionExpired()?Promise.resolve():function(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).createUser,e=void 0===t||t;return new Promise(function(t,n){c().then(function(r){f({code:r,createUser:e},t,n)},n)})}.apply(void 0,arguments)}),h=function(e){if(!e||!e.detail)throw new i(603);var n=e.detail,s=!!e.createUser,f=e.syncUserProfile;return n.userInfo?c().then(function(t){return d({lang:n.userInfo.language}).then(function(e){var n={code:t,create_user:s,rawData:e.rawData,signature:e.signature,encryptedData:e.encryptedData,iv:e.iv,update_userprofile:u.getUpdateUserProfileParam(f)},r=e.userInfo;return r.id=a.get(o.STORAGE_KEY.UID),r.openid=a.get(o.STORAGE_KEY.OPENID),r.unionid=a.get(o.STORAGE_KEY.UNIONID),a.set(o.STORAGE_KEY.USERINFO,r),p(n)})}).then(function(e){t._polyfill.handleLoginSuccess(e)}):Promise.reject(r(new i(603),{id:a.get(o.STORAGE_KEY.UID),openid:a.get(o.STORAGE_KEY.OPENID),unionid:a.get(o.STORAGE_KEY.UNIONID)}))},p=function(e){return t.request({url:n.WECHAT.AUTHENTICATE,method:"POST",data:e}).then(u.validateStatusCode)},d=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).lang;return new Promise(function(n,r){t._polyfill.wxGetUserInfo({lang:e,success:n,fail:r})})};r(t.auth,{silentLogin:l,loginWithWechat:u.rateLimit(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.createUser,i=void 0===n||n,a=e.syncUserProfile,u=void 0===a?o.UPDATE_USERPROFILE_VALUE.SETNX:a;return(t&&t.detail?h(r(t,{createUser:i,syncUserProfile:u})):l({createUser:i})).then(function(){return s.getCurrentUser()})}),handleUserInfo:u.rateLimit(h),linkWechat:u.rateLimit(function(e){var r=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).syncUserProfile,i=void 0===r?o.UPDATE_USERPROFILE_VALUE.SETNX:r,a=!1;return e&&e.detail&&e.detail.userInfo&&(a=!0),c().then(function(r){return(a?d({lang:e.detail.userInfo.language}):Promise.resolve(null)).then(function(e){var o=e?{rawData:e.rawData,signature:e.signature,encryptedData:e.encryptedData,iv:e.iv,update_userprofile:u.getUpdateUserProfileParam(i),code:r}:{code:r};return t._baasRequest({method:"POST",url:n.WECHAT.USER_ASSOCIATE,data:o})})})})}),t.login=function(t){return!1===t?l().then(function(){return t={id:a.get(o.STORAGE_KEY.UID),openid:a.get(o.STORAGE_KEY.OPENID),unionid:a.get(o.STORAGE_KEY.UNIONID)},e=o.STORAGE_KEY.EXPIRES_AT,n=a.get(o.STORAGE_KEY.EXPIRES_AT),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t;var t,e,n}):Promise.reject(new i(605))},t.handleUserInfo=function(e){return t.auth.handleUserInfo(e).then(function(){return s.getCurrentUser()}).then(function(t){return t.toJSON()})},t.logout=t.auth.logout}},function(t,e,n){function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}var o=n(18),i=n(2);t.exports=function(t){r(t._polyfill,{wxLogin:function(){var t;return(t=wx).login.apply(t,arguments)},wxGetUserInfo:function(){var t;return(t=wx).getUserInfo.apply(t,arguments)},wxPaymentRequest:function(){var t;return(t=wx).requestPayment.apply(t,arguments)},CLIENT_PLATFORM:"WECHAT",setStorageSync:function(t,e){try{return wx.setStorageSync(t,e)}catch(n){return wx.setStorageSync(t,e)}},getStorageSync:function(t){try{return wx.getStorageSync(t)}catch(e){return wx.getStorageSync(t)}},getSystemInfoSync:function(){return wx.getSystemInfoSync()},linkWechat:function(){var e;return(e=t.auth).linkWechat.apply(e,arguments)},checkLatestVersion:function(){"devtools"===wx.getSystemInfoSync().platform&&t.checkVersion({platform:i.PLATFORM.WECHAT})},handleLoginSuccess:function(e,n){t.storage.set(i.STORAGE_KEY.UID,e.data.user_id),t.storage.set(i.STORAGE_KEY.OPENID,e.data.openid||""),t.storage.set(i.STORAGE_KEY.UNIONID,e.data.unionid||""),t.storage.set(i.STORAGE_KEY.AUTH_TOKEN,e.data.token),e.data.openid&&t.storage.set(i.STORAGE_KEY.USERINFO,{id:e.data.user_id,openid:e.data.openid,unionid:e.data.unionid}),t.storage.set(i.STORAGE_KEY.EXPIRES_AT,Math.floor(Date.now()/1e3)+e.data.expires_in-30),n?t.storage.set(i.STORAGE_KEY.IS_ANONYMOUS_USER,1):(t.storage.set(i.STORAGE_KEY.IS_ANONYMOUS_USER,0),o.reportStats())}})}},function(t,e,n){var r=n(2),o=n(3),i=n(1);t.exports=function(t){t.wxCensorImage=function(e){return new Promise(function(n,o){wx.uploadFile({url:t._polyfill.getAPIHost()+t._config.API.WECHAT.CENSOR_IMAGE,filePath:e,name:r.UPLOAD.UPLOAD_FILE_KEY,header:{Authorization:r.UPLOAD.HEADER_AUTH_VALUE+t.getAuthToken(),"X-Hydrogen-Client-Version":t._config.VERSION,"X-Hydrogen-Client-Platform":i.getSysPlatform(),"X-Hydrogen-Client-ID":t._config.CLIENT_ID,"User-Agent":r.UPLOAD.UA},success:function(t){var e=t.statusCode,i=t.data;if(parseInt(e)!==r.STATUS_CODE.SUCCESS)return o(t);n(JSON.parse(i))},fail:function(){t.request.wxRequestFail(o)}})})},t.wxCensorText=function(e){return e&&"string"==typeof e?t._baasRequest({url:t._config.API.WECHAT.CENSOR_MSG,method:"POST",data:{content:e}}):Promise.reject(new o(605))},t.censorAsync=function(e){return t._baasRequest({url:t._config.API.WECHAT.CENSOR_ASYNC,method:"POST",data:{file_id:e}})},t.getCensorResult=function(e){return t._baasRequest({url:"".concat(t._config.API.WECHAT.CENSOR_ASYNC).concat(e,"/")})}}},function(t,e,n){function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}var o=n(18);t.exports=function(t){r(t,{reportTemplateMsgAnalytics:function(t){1014==t.scene&&t.query&&t.query._H_utm_campaign&&o.pushStats(t.query._H_utm_campaign),o.reportStats()}})}},function(t,e,n){var r=n(0)._config.API;t.exports=function(t){t.subscribeMessage=function(e){return t._baasRequest({url:r.WECHAT.SUBSCRIBE_MESSAGE,method:"POST",data:e})}}},function(t,e,n){var r=n(0),o=n(3),i=r._polyfill,a=r._config.API,u={merchandiseSchemaID:"merchandise_schema_id",merchandiseRecordID:"merchandise_record_id",merchandiseSnapshot:"merchandise_snapshot",profitSharing:"profit_sharing",merchandiseDescription:"merchandise_description",totalCost:"total_cost"};t.exports=function(t){var e={};for(var n in t)e[u[n]]=t[n];return e.gateway_type="weixin_tenpay",r._baasRequest({url:a.PAY,method:"POST",data:e}).then(function(t){var e=t.data||{};return new Promise(function(t,n){i.wxPaymentRequest({appId:e.appId,timeStamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,signType:"MD5",paySign:e.paySign,success:function(n){return n.transaction_no=e.transaction_no,n.trade_no=e.trade_no,t(n)},complete:function(t){"requestPayment:fail cancel"==t.errMsg&&n(new o(607))},fail:function(t){"requestPayment:fail cancel"==t.errMsg?n(new o(607)):n(new o(608,t.errMsg))}})})})}},function(t,e,n){var r=n(0);t.exports=function(t){return(new r.Order).get(t.transactionID)}},function(t,e,n){var r=n(0),o=n(3),i=n(1),a=n(2),u=function(t){wx.getNetworkType({success:function(e){"none"===e.networkType?t(new o(600)):t(new o(601))}})};t.exports=function(t){var e=t.url,n=t.method,s=void 0===n?"GET":n,c=t.data,f=void 0===c?{}:c,l=t.header,h=void 0===l?{}:l,p=t.dataType,d=void 0===p?"json":p;return new Promise(function(t,n){if(!r._config.CLIENT_ID)return n(new o(602));var c=i.mergeRequestHeader(h);if(!/https?:\/\//.test(e)){var l=r._config.DEBUG?r._config.API_HOST:r._polyfill.getAPIHost();e=l.replace(/\/$/,"")+"/"+e.replace(/^\//,"")}wx.request({method:s,url:e,data:f,header:c,dataType:d,success:t,fail:function(){u(n)}}),i.log(a.LOG_LEVEL.INFO,"Request => "+e)})},t.exports.wxRequestFail=u},function(t,e,n){var r=n(1),o=n(0),i=n(2),a=n(4);t.exports=function(t){var e=arguments,n=t.url,u=t.method,s=void 0===u?"GET":u,c=t.data,f=void 0===c?{}:c,l=t.header,h=void 0===l?{}:l,p=t.dataType,d=void 0===p?"json":p;return(o._config.AUTO_LOGIN?o.auth.silentLogin():Promise.resolve()).then(function(){return o.request.apply(null,e)}).then(function(t){return t.statusCode===i.STATUS_CODE.UNAUTHORIZED&&o._config.AUTO_LOGIN?(e={header:h,method:s,url:n,data:f,dataType:d},a.get(i.STORAGE_KEY.AUTH_TOKEN)&&o.clearSession(),void o.auth.silentLogin().then(function(){return o.request(e).then(r.validateStatusCode)})):r.validateStatusCode(t);var e})}},function(t,e,n){function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var i=n(2),a=n(3),u=n(1),s=n(38),c=s.getUploadFileConfig,f=s.getUploadHeaders;t.exports=function(t,e,n){if(!t||"object"!==o(t)||!t.filePath)throw new a(605);if(e){if("object"!==o(e))throw new a(605)}else e={};var s,l,h,p,d=null,_=new Promise(function(t,e){s=t,l=e}),y=function(t){return d?d.onProgressUpdate(t):h=t,this},g=function(){return d&&d.abort(),p=!0,this};!function t(e){return r(e,{catch:function(){for(var e,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];var i=(e=Promise.prototype.catch).call.apply(e,[this].concat(r));return t(i),i},then:function(){for(var e,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];var i=(e=Promise.prototype.then).call.apply(e,[this].concat(r));return t(i),i},abort:g,onProgressUpdate:y})}(_);var v=u.getFileNameFromPath(t.filePath);return c(v,u.replaceQueryParams(e)).then(function(e){if(p)return l(new Error("aborted"));var r={id:e.data.id,fileName:v,policy:e.data.policy,authorization:e.data.authorization,uploadUrl:e.data.upload_url,filePath:t.filePath,destLink:e.data.path};d=function(t,e,n,r){return wx.uploadFile({url:t.uploadUrl,filePath:t.filePath,name:i.UPLOAD.UPLOAD_FILE_KEY,formData:{authorization:t.authorization,policy:t.policy},header:f(),success:function(o){var i={},a=JSON.parse(o.data);i.status="ok",i.path=t.destLink,i.file={id:t.id,path:t.destLink,name:t.fileName,created_at:a.time,mime_type:a.mimetype,cdn_path:a.url,size:a.file_size},delete o.data,o.data=r&&"json"===r?i:JSON.stringify(i);try{e(u.validateStatusCode(o))}catch(t){n(t)}},fail:function(){BaaS.request.wxRequestFail(n)}})}(r,function(t){if(p)return l(new Error("aborted"));s(t)},l,n),h&&d.onProgressUpdate(h)},l),_}},function(t,e,n){var r=n(0),o=n(3),i=n(1),a=r._config.API;t.exports=function(t,e,n,u){var s=function(t,e,n,r){var a={},u=["wxacode","wxacodeunlimit","wxaqrcode"].indexOf(t);if(!i.isString(t)||-1===u)throw new o(605,'type 为字符串类型且只接受 "wxacode", "wxacodeunlimit", "wxaqrcode" 其中一种');if(a.code_type=["miniapp_permanent","miniapp_temporary","miniapp_qr"][u],!e||e.constructor!==Object)throw new o(605,"params 为 Object 类型");if("wxacode"===t||"wxaqrcode"===t){if(!e.hasOwnProperty("path"))throw new o(605,'当 type 为 "wxacode" 或 "wxaqrcode" 时，params 中必须带有 "path" 属性');a.path=e.path}if("wxacodeunlimit"===t){if(!e.hasOwnProperty("scene"))throw new o(605,'当 type 为 "wxacodeunlimit" 时，params 中必须带有 "scene" 属性');a.scene=e.scene,e.hasOwnProperty("page")&&(a.path=e.page)}return a.options={},e.hasOwnProperty("width")&&(a.options.width=e.width),e.hasOwnProperty("auto_color")&&(a.options.auto_color=e.auto_color),e.hasOwnProperty("line_color")&&(a.options.line_color=e.line_color),e.hasOwnProperty("is_hyaline")&&(a.options.is_hyaline=e.is_hyaline),!0===n&&(a.upload_to_cdn=!0,r&&(a.category_name=r)),a}(t,e,n,u);return r._baasRequest({url:a.WECHAT.WXACODE,method:"POST",data:s}).then(function(t){return t.data})}},function(t,e,n){var r=n(0),o=n(3),i=r._config.API,a=function(t){if(!(t instanceof Array)||t.length<3)return!1;return-1!==["we-run-data","open-gid","phone-number"].indexOf(t[2])};t.exports=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];if(!a(e))throw new o(605);var u={encryptedData:e[0],iv:e[1]};return r._baasRequest({url:i.WECHAT.DECRYPT+e[2]+"/",method:"POST",data:u}).then(function(t){return t.data},function(t){if(403===t.code)throw new o(403,"微信解密插件未开启");throw t})}},function(t,e,n){var r=n(0),o=n(1),i=r._config.API;t.exports=o.ticketReportThrottle(function(t){var e=o.makeReportTicketParam(t);return r._baasRequest({url:i.WECHAT.TEMPLATE_MESSAGE,method:"POST",data:e})})},function(t,e,n){var r=n(0),o=n(3),i=r._config,a=r._polyfill,u=n(79),s=!1;t.exports={enable:function(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).usePlugins,e=void 0!==t&&t;if(!r._config||!r._config.CLIENT_ID)throw new o(602);return u.usePlugins="plugin"===a.SDK_TYPE||e,s=!0,u.init(!0,{clientId:r._config.CLIENT_ID},i.VERSION)},track:function(){if(!s)throw new o(610);return u.track.apply(u,arguments)},metaData:function(){if(!s)throw new o(610);return u.metaData.apply(u,arguments)}}},function(t,e,n){(function(r){var o,i,a;function u(){return(u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}a=function(){var t={url:{sdkDown:"https://dataapi.testin.cn/sdkDown",track:"https://dataapi.testin.cn/sendEvents"},sdkDown:{pid:"",pl:"miniPrograms",sv:"1.1.1",testin_id:"",testin_time:0,testin_type:"track",testin_name:"testin_bug",testin_first:!0,di:{testin_schan:["testin_schan_bugout"],testin_av:"",testin_wechat_ver:"",testin_tm:0,testin_pa:"",testin_brand:"",testin_model:"",testin_os:"",testin_ov:"",testin_dh:0,testin_dw:0,testin_lan:"",testin_net:"",testin_bug_type:1,testin_bug_lan:4,testin_component_ver:"",testin_bug_bn:"",testin_bug_pr:"",testin_bug_ww:0,testin_bug_wh:0,testin_bug_sbh:"",testin_bug_fss:"",testin_bus:2}},record:{testin_pid:"",testin_id:"",testin_pl:"miniPrograms",testin_time:0,testin_type:"track",testin_name:"testin_bug",testin_sv:"1.1.1",attrs:{testin_av:"",testin_wechat_ver:"",testin_tm:0,testin_pa:"",testin_brand:"",testin_model:"",testin_os:"",testin_ov:"",testin_dh:0,testin_dw:0,testin_lan:"",testin_url:"",testin_net:"",testin_bug_type:1,testin_bug_lan:4,testin_component_ver:"",testin_bug_bn:"",testin_bug_stack:"",testin_bug_sv:"1.1.1",testin_bug_pr:"0",testin_bug_ww:0,testin_bug_wh:0,testin_bug_sbh:"",testin_bug_fss:"",testin_bug_rea:"",testin_bug_slog:"",testin_bug_name:"",testin_bus:2}},breadcrumb:[],sdkInitComplete:!1},e={uuid:function(){var t,e;!function(){if(!t){var n=new Array(16);e=t=function(){for(var t,e=0;e<16;e++)0==(3&e)&&(t=4294967296*Math.random()),n[e]=t>>>((3&e)<<3)&255;return n}}}();for(var n="function"==typeof r?r:Array,o=[],i={},a=0;a<256;a++)o[a]=(a+256).toString(16).substr(1),i[o[a]]=a;function u(t,e){var n=e||0,r=o;return r[t[n++]]+r[t[n++]]+r[t[n++]]+r[t[n++]]+"-"+r[t[n++]]+r[t[n++]]+"-"+r[t[n++]]+r[t[n++]]+"-"+r[t[n++]]+r[t[n++]]+"-"+r[t[n++]]+r[t[n++]]+r[t[n++]]+r[t[n++]]+r[t[n++]]+r[t[n++]]}function s(e,r,o){var i=r&&o||0;"string"==typeof e&&(r="binary"===e?new n(16):null,e=null);var a=(e=e||{}).random||(e.rng||t)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,r)for(var s=0;s<16;s++)r[i+s]=a[s];return r||u(a)}var c=s;return c.v4=s,c.parse=function(t,e,n){var r=e&&n||0,o=0;for(e=e||[],t.toLowerCase().replace(/[0-9a-f]{2}/g,function(t){o<16&&(e[r+o++]=i[t])});o<16;)e[r+o++]=0;return e},c.unparse=u,c.BufferClass=n,c._rng=t,c._mathRNG=e,c._nodeRNG=void 0,c._whatwgRNG=void 0,c()},getCurrentPageUrl:function(){var t=getCurrentPages();if(t.length)return t[t.length-1]},getAesKey:function(){var t,e="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",n=e.length,r="";for(t=0;t<16;t++)r+=e.charAt(Math.floor(Math.random()*n));return r},reWriteApp:function(e){var n=App,r=this;App=function(o){return["onLaunch","onShow","onHide","onError"].forEach(function(n){var i=o[n];o[n]=function(o){"onLaunch"===n&&(t.sdkDown.di.testin_chan=t.record.attrs.testin_chan=o.scene);var a={};"onError"===n?(a.testin_bug_s_time=r.nowTime(),a.testin_bug_s_tit="⬆⬆⬆⬆⬆BUG在此⬆⬆⬆⬆⬆",a.testin_bug_s_con="App: "+n):(a.testin_bug_s_time=r.nowTime(),a.testin_bug_s_tit=o&&o.path||"",a.testin_bug_s_con="App: "+n),r.pushToBreadcrumb(a),"onError"===n&&e.track(o),i&&i.call(this,o)}}),n(o)}},reWritePage:function(){var t=this,e=Page;Page=function(n){return Object.keys(n).forEach(function(e){"function"==typeof n[e]&&t.recordPageFn(n,e)}),n.onReady||t.recordPageFn(n,"onReady"),n.onLoad||t.recordPageFn(n,"onLoad"),e(n)}},reWriteWxRequest:function(){var e=this,n=wx.request;try{Object.defineProperty(wx,"request",{configurable:!0,enumerable:!0,writable:!0,value:function(){var r=arguments[0]||{},o=e.nowTime();return r.url.indexOf(t.url.sdkDown)>-1||r.url.indexOf(t.url.track)>-1?n.apply(wx,arguments):(r.complete?e.reWriteComplete(r,o):r.complete=function(t){e.pushToBreadcrumb({testin_bug_s_time:e.nowTime(),testin_bug_s_tit:r.url,testin_bug_s_con:r.method+", status: "+t.statusCode})},n.apply(wx,arguments))}})}catch(t){console.log(t,"此内容为bugout所有~~")}},reWriteComplete:function(t,e){var n=this,r=t.complete;t.complete=function(e){return n.pushToBreadcrumb({testin_bug_s_time:n.nowTime(),testin_bug_s_tit:t.url,testin_bug_s_con:t.method+", status: "+e.statusCode}),r(e)}},reWriteConsole:function(){var t={log:"L",info:"I",error:"E",warn:"W",debug:"D"},e=this;this.consoleList=[],["debug","error","info","log","warn"].forEach(function(n){var r;r=console[n],console[n]=function(o){e.consoleList.push(e.nowTimeTrans()+" "+t[n]+"/console(0): "+o),e.consoleList.length>100&&e.consoleList.shift(),r.apply(console,arguments)}})},recordPageFn:function(t,e){var n=t[e],r=this;t[e]=function(){"onLoad"!==e&&"onShow"!==e||(r.activePage=r.getCurrentPageUrl());var t={testin_bug_s_time:r.nowTime(),testin_bug_s_tit:r.activePage?r.activePage.route:"-",testin_bug_s_con:"Page: "+e};return"onLoad"===e&&(t.args=arguments),r.pushToBreadcrumb(t),n&&n.apply(this,arguments)}},nowTime:function(){return(new Date).getTime()},timeZone:function(){return(new Date).getTimezoneOffset()/60},nowTimeTrans:function(){var t=new Date;return(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-"+(t.getDate()<10?"0"+t.getDate():t.getDate())+" "+(t.getHours()<10?"0"+t.getHours():t.getHours())+":"+(t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+":"+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds())+"."+(t.getTime()+"").slice(-3)},pushToBreadcrumb:function(e){t.breadcrumb.push(e),t.breadcrumb.length>100&&t.breadcrumb.shift()},getStorage:function(){var e=this;wx.getStorage({key:"testin_id",success:function(e){t.sdkDown.testin_first=!1,t.sdkDown.testin_id=t.record.testin_eid=t.record.testin_id=e.data},fail:function(){var n=e.uuid();wx.setStorage({key:"testin_id",data:n}),t.sdkDown.testin_first=!0,t.sdkDown.testin_id=t.record.testin_eid=t.record.testin_id=n}})}},n="function"==typeof Symbol&&"symbol"==s(Symbol.iterator)?function(t){return s(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":s(t)};return{init:function(r,o,i){var a=void 0,u=this;function s(n,o){if(e.reWriteConsole(),n.usePlugins||(e.reWriteWxRequest(),e.reWritePage(),e.reWriteApp(u)),"boolean"==typeof r){if(t.sdkDown.di.testin_zone=t.record.attrs.testin_zone=e.timeZone(),t.sdkDown.di.testin_av=t.record.attrs.testin_av=i,e.bugOutPower=r,wx.getAccountInfoSync){var a=wx.getAccountInfoSync();t.sdkDown.di.testin_pa=t.record.attrs.testin_pa=a.miniProgram.appId}t.sdkDown.pid=t.record.testin_pid=o,t.sdkDown.testin_time=e.nowTime(),e.getStorage(),wx.getSystemInfo({success:function(e){var n=e.system.split(" ");t.record.attrs.testin_wechat_ver=t.sdkDown.di.testin_wechat_ver=e.version,t.record.attrs.testin_brand=t.sdkDown.di.testin_brand=e.brand,t.record.attrs.testin_model=t.sdkDown.di.testin_model=e.model,t.record.attrs.testin_os=t.sdkDown.di.testin_os=n[0],t.record.attrs.testin_ov=t.sdkDown.di.testin_ov=n[1],t.record.attrs.testin_dh=t.sdkDown.di.testin_dh=e.screenHeight,t.record.attrs.testin_dw=t.sdkDown.di.testin_dw=e.screenWidth,t.record.attrs.testin_lan=t.sdkDown.di.testin_lan=e.language,t.record.attrs.testin_bug_bn=t.sdkDown.di.testin_bug_bn=e.platform,t.record.attrs.testin_component_ver=t.sdkDown.di.testin_component_ver=e.SDKVersion,t.record.attrs.testin_bug_pr=t.sdkDown.di.testin_bug_pr=e.pixelRatio.toFixed(1),t.record.attrs.testin_bug_ww=t.sdkDown.di.testin_bug_ww=e.windowWidth,t.record.attrs.testin_bug_wh=t.sdkDown.di.testin_bug_wh=e.windowHeight,t.record.attrs.testin_bug_sbh=t.sdkDown.di.testin_bug_sbh=e.statusBarHeight,t.record.attrs.testin_bug_fss=t.sdkDown.di.testin_bug_fss=e.fontSizeSetting,e.batteryLevel&&(t.record.attrs.testin_bat_rem=t.sdkDown.di.testin_bat_rem=e.batteryLevel)},complete:function(){wx.getNetworkType({success:function(e){t.record.attrs.testin_net=t.sdkDown.di.testin_net=e.networkType},complete:function(){wx.request({url:t.url.sdkDown,method:"POST",data:t.sdkDown})}})}})}else console.log("请按照集成文档正确集成SDK")}"object"===(void 0===o?"undefined":n(o))?wx.request({url:"https://dataapi.testin.cn/api/getappkey/"+o.clientId,header:{"Content-Type":"text/html;charset=UTF-8"},success:function(t){a=t.data?t.data:"noPid",s(u,a)}}):"string"==typeof o&&s(u,a=o)},track:function(r){if(e.bugOutPower){"string"==typeof r&&(t.record.attrs.testin_bug_rea=r.split("\n")[1],t.record.attrs.testin_bug_name=r.split("\n")[0],t.record.attrs.testin_bug_stack=r),"object"===(void 0===r?"undefined":n(r))&&(t.record.attrs.testin_bug_rea=r.message,t.record.attrs.testin_bug_name=r.name,t.record.attrs.testin_bug_stack=r.stack),t.record.attrs.testin_bug_slog=e.consoleList.join("\n"),t.record.attrs.testin_url=e.getCurrentPageUrl()?e.getCurrentPageUrl().route:"",t.record.testin_time=e.nowTime(),t.record.attrs.testin_bug_steps=JSON.stringify(t.breadcrumb);var o=[];o.push(t.record),wx.request({url:t.url.track,method:"POST",data:o})}},usePlugins:!1,metaData:function(e){return t.record.attrs.testin_bug_user=JSON.stringify(u({},e))}}},"object"==s(e)&&void 0!==t?t.exports=a():void 0===(i="function"==typeof(o=a)?o.call(e,n,e,t):o)||(t.exports=i)}).call(this,n(80).Buffer)},function(t,e,n){"use strict";(function(t){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
var r=n(81),o=n(82),i=n(83);function a(){return s.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function u(t,e){if(a()<e)throw new RangeError("Invalid typed array length");return s.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e)).__proto__=s.prototype:(null===t&&(t=new s(e)),t.length=e),t}function s(t,e,n){if(!(s.TYPED_ARRAY_SUPPORT||this instanceof s))return new s(t,e,n);if("number"==typeof t){if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return l(this,t)}return c(this,t,e,n)}function c(t,e,n,r){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?function(t,e,n,r){if(e.byteLength,n<0||e.byteLength<n)throw new RangeError("'offset' is out of bounds");if(e.byteLength<n+(r||0))throw new RangeError("'length' is out of bounds");e=void 0===n&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,n):new Uint8Array(e,n,r);s.TYPED_ARRAY_SUPPORT?(t=e).__proto__=s.prototype:t=h(t,e);return t}(t,e,n,r):"string"==typeof e?function(t,e,n){"string"==typeof n&&""!==n||(n="utf8");if(!s.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');var r=0|d(e,n),o=(t=u(t,r)).write(e,n);o!==r&&(t=t.slice(0,o));return t}(t,e,n):function(t,e){if(s.isBuffer(e)){var n=0|p(e.length);return 0===(t=u(t,n)).length?t:(e.copy(t,0,0,n),t)}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||(r=e.length)!=r?u(t,0):h(t,e);if("Buffer"===e.type&&i(e.data))return h(t,e.data)}var r;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,e)}function f(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function l(t,e){if(f(e),t=u(t,e<0?0:0|p(e)),!s.TYPED_ARRAY_SUPPORT)for(var n=0;n<e;++n)t[n]=0;return t}function h(t,e){var n=e.length<0?0:0|p(e.length);t=u(t,n);for(var r=0;r<n;r+=1)t[r]=255&e[r];return t}function p(t){if(t>=a())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+a().toString(16)+" bytes");return 0|t}function d(t,e){if(s.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var n=t.length;if(0===n)return 0;for(var r=!1;;)switch(e){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return Y(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return B(t).length;default:if(r)return Y(t).length;e=(""+e).toLowerCase(),r=!0}}function _(t,e,n){var r=t[e];t[e]=t[n],t[n]=r}function y(t,e,n,r,o){if(0===t.length)return-1;if("string"==typeof n?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,isNaN(n)&&(n=o?0:t.length-1),n<0&&(n=t.length+n),n>=t.length){if(o)return-1;n=t.length-1}else if(n<0){if(!o)return-1;n=0}if("string"==typeof e&&(e=s.from(e,r)),s.isBuffer(e))return 0===e.length?-1:g(t,e,n,r,o);if("number"==typeof e)return e&=255,s.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(t,e,n):Uint8Array.prototype.lastIndexOf.call(t,e,n):g(t,[e],n,r,o);throw new TypeError("val must be string, number or Buffer")}function g(t,e,n,r,o){var i,a=1,u=t.length,s=e.length;if(void 0!==r&&("ucs2"===(r=String(r).toLowerCase())||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(t.length<2||e.length<2)return-1;a=2,u/=2,s/=2,n/=2}function c(t,e){return 1===a?t[e]:t.readUInt16BE(e*a)}if(o){var f=-1;for(i=n;i<u;i++)if(c(t,i)===c(e,-1===f?0:i-f)){if(-1===f&&(f=i),i-f+1===s)return f*a}else-1!==f&&(i-=i-f),f=-1}else for(n+s>u&&(n=u-s),i=n;i>=0;i--){for(var l=!0,h=0;h<s;h++)if(c(t,i+h)!==c(e,h)){l=!1;break}if(l)return i}return-1}function v(t,e,n,r){n=Number(n)||0;var o=t.length-n;r?(r=Number(r))>o&&(r=o):r=o;var i=e.length;if(i%2!=0)throw new TypeError("Invalid hex string");r>i/2&&(r=i/2);for(var a=0;a<r;++a){var u=parseInt(e.substr(2*a,2),16);if(isNaN(u))return a;t[n+a]=u}return a}function E(t,e,n,r){return F(Y(e,t.length-n),t,n,r)}function b(t,e,n,r){return F(function(t){for(var e=[],n=0;n<t.length;++n)e.push(255&t.charCodeAt(n));return e}(e),t,n,r)}function m(t,e,n,r){return b(t,e,n,r)}function w(t,e,n,r){return F(B(e),t,n,r)}function O(t,e,n,r){return F(function(t,e){for(var n,r,o,i=[],a=0;a<t.length&&!((e-=2)<0);++a)n=t.charCodeAt(a),r=n>>8,o=n%256,i.push(o),i.push(r);return i}(e,t.length-n),t,n,r)}function T(t,e,n){return 0===e&&n===t.length?r.fromByteArray(t):r.fromByteArray(t.slice(e,n))}function S(t,e,n){n=Math.min(t.length,n);for(var r=[],o=e;o<n;){var i,a,u,s,c=t[o],f=null,l=c>239?4:c>223?3:c>191?2:1;if(o+l<=n)switch(l){case 1:c<128&&(f=c);break;case 2:128==(192&(i=t[o+1]))&&(s=(31&c)<<6|63&i)>127&&(f=s);break;case 3:i=t[o+1],a=t[o+2],128==(192&i)&&128==(192&a)&&(s=(15&c)<<12|(63&i)<<6|63&a)>2047&&(s<55296||s>57343)&&(f=s);break;case 4:i=t[o+1],a=t[o+2],u=t[o+3],128==(192&i)&&128==(192&a)&&128==(192&u)&&(s=(15&c)<<18|(63&i)<<12|(63&a)<<6|63&u)>65535&&s<1114112&&(f=s)}null===f?(f=65533,l=1):f>65535&&(f-=65536,r.push(f>>>10&1023|55296),f=56320|1023&f),r.push(f),o+=l}return function(t){var e=t.length;if(e<=A)return String.fromCharCode.apply(String,t);var n="",r=0;for(;r<e;)n+=String.fromCharCode.apply(String,t.slice(r,r+=A));return n}(r)}e.Buffer=s,e.SlowBuffer=function(t){+t!=t&&(t=0);return s.alloc(+t)},e.INSPECT_MAX_BYTES=50,s.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return!1}}(),e.kMaxLength=a(),s.poolSize=8192,s._augment=function(t){return t.__proto__=s.prototype,t},s.from=function(t,e,n){return c(null,t,e,n)},s.TYPED_ARRAY_SUPPORT&&(s.prototype.__proto__=Uint8Array.prototype,s.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&s[Symbol.species]===s&&Object.defineProperty(s,Symbol.species,{value:null,configurable:!0})),s.alloc=function(t,e,n){return function(t,e,n,r){return f(e),e<=0?u(t,e):void 0!==n?"string"==typeof r?u(t,e).fill(n,r):u(t,e).fill(n):u(t,e)}(null,t,e,n)},s.allocUnsafe=function(t){return l(null,t)},s.allocUnsafeSlow=function(t){return l(null,t)},s.isBuffer=function(t){return!(null==t||!t._isBuffer)},s.compare=function(t,e){if(!s.isBuffer(t)||!s.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var n=t.length,r=e.length,o=0,i=Math.min(n,r);o<i;++o)if(t[o]!==e[o]){n=t[o],r=e[o];break}return n<r?-1:r<n?1:0},s.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},s.concat=function(t,e){if(!i(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return s.alloc(0);var n;if(void 0===e)for(e=0,n=0;n<t.length;++n)e+=t[n].length;var r=s.allocUnsafe(e),o=0;for(n=0;n<t.length;++n){var a=t[n];if(!s.isBuffer(a))throw new TypeError('"list" argument must be an Array of Buffers');a.copy(r,o),o+=a.length}return r},s.byteLength=d,s.prototype._isBuffer=!0,s.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)_(this,e,e+1);return this},s.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)_(this,e,e+3),_(this,e+1,e+2);return this},s.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)_(this,e,e+7),_(this,e+1,e+6),_(this,e+2,e+5),_(this,e+3,e+4);return this},s.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?S(this,0,t):function(t,e,n){var r=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if((n>>>=0)<=(e>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return P(this,e,n);case"utf8":case"utf-8":return S(this,e,n);case"ascii":return I(this,e,n);case"latin1":case"binary":return R(this,e,n);case"base64":return T(this,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return D(this,e,n);default:if(r)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),r=!0}}.apply(this,arguments)},s.prototype.equals=function(t){if(!s.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===s.compare(this,t)},s.prototype.inspect=function(){var t="",n=e.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,n).match(/.{2}/g).join(" "),this.length>n&&(t+=" ... ")),"<Buffer "+t+">"},s.prototype.compare=function(t,e,n,r,o){if(!s.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=0),void 0===n&&(n=t?t.length:0),void 0===r&&(r=0),void 0===o&&(o=this.length),e<0||n>t.length||r<0||o>this.length)throw new RangeError("out of range index");if(r>=o&&e>=n)return 0;if(r>=o)return-1;if(e>=n)return 1;if(this===t)return 0;for(var i=(o>>>=0)-(r>>>=0),a=(n>>>=0)-(e>>>=0),u=Math.min(i,a),c=this.slice(r,o),f=t.slice(e,n),l=0;l<u;++l)if(c[l]!==f[l]){i=c[l],a=f[l];break}return i<a?-1:a<i?1:0},s.prototype.includes=function(t,e,n){return-1!==this.indexOf(t,e,n)},s.prototype.indexOf=function(t,e,n){return y(this,t,e,n,!0)},s.prototype.lastIndexOf=function(t,e,n){return y(this,t,e,n,!1)},s.prototype.write=function(t,e,n,r){if(void 0===e)r="utf8",n=this.length,e=0;else if(void 0===n&&"string"==typeof e)r=e,n=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e|=0,isFinite(n)?(n|=0,void 0===r&&(r="utf8")):(r=n,n=void 0)}var o=this.length-e;if((void 0===n||n>o)&&(n=o),t.length>0&&(n<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");for(var i=!1;;)switch(r){case"hex":return v(this,t,e,n);case"utf8":case"utf-8":return E(this,t,e,n);case"ascii":return b(this,t,e,n);case"latin1":case"binary":return m(this,t,e,n);case"base64":return w(this,t,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return O(this,t,e,n);default:if(i)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),i=!0}},s.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var A=4096;function I(t,e,n){var r="";n=Math.min(t.length,n);for(var o=e;o<n;++o)r+=String.fromCharCode(127&t[o]);return r}function R(t,e,n){var r="";n=Math.min(t.length,n);for(var o=e;o<n;++o)r+=String.fromCharCode(t[o]);return r}function P(t,e,n){var r=t.length;(!e||e<0)&&(e=0),(!n||n<0||n>r)&&(n=r);for(var o="",i=e;i<n;++i)o+=G(t[i]);return o}function D(t,e,n){for(var r=t.slice(e,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function L(t,e,n){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>n)throw new RangeError("Trying to access beyond buffer length")}function C(t,e,n,r,o,i){if(!s.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<i)throw new RangeError('"value" argument is out of bounds');if(n+r>t.length)throw new RangeError("Index out of range")}function U(t,e,n,r){e<0&&(e=65535+e+1);for(var o=0,i=Math.min(t.length-n,2);o<i;++o)t[n+o]=(e&255<<8*(r?o:1-o))>>>8*(r?o:1-o)}function N(t,e,n,r){e<0&&(e=4294967295+e+1);for(var o=0,i=Math.min(t.length-n,4);o<i;++o)t[n+o]=e>>>8*(r?o:3-o)&255}function k(t,e,n,r,o,i){if(n+r>t.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function j(t,e,n,r,i){return i||k(t,0,n,4),o.write(t,e,n,r,23,4),n+4}function x(t,e,n,r,i){return i||k(t,0,n,8),o.write(t,e,n,r,52,8),n+8}s.prototype.slice=function(t,e){var n,r=this.length;if((t=~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),(e=void 0===e?r:~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t),s.TYPED_ARRAY_SUPPORT)(n=this.subarray(t,e)).__proto__=s.prototype;else{var o=e-t;n=new s(o,void 0);for(var i=0;i<o;++i)n[i]=this[i+t]}return n},s.prototype.readUIntLE=function(t,e,n){t|=0,e|=0,n||L(t,e,this.length);for(var r=this[t],o=1,i=0;++i<e&&(o*=256);)r+=this[t+i]*o;return r},s.prototype.readUIntBE=function(t,e,n){t|=0,e|=0,n||L(t,e,this.length);for(var r=this[t+--e],o=1;e>0&&(o*=256);)r+=this[t+--e]*o;return r},s.prototype.readUInt8=function(t,e){return e||L(t,1,this.length),this[t]},s.prototype.readUInt16LE=function(t,e){return e||L(t,2,this.length),this[t]|this[t+1]<<8},s.prototype.readUInt16BE=function(t,e){return e||L(t,2,this.length),this[t]<<8|this[t+1]},s.prototype.readUInt32LE=function(t,e){return e||L(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},s.prototype.readUInt32BE=function(t,e){return e||L(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},s.prototype.readIntLE=function(t,e,n){t|=0,e|=0,n||L(t,e,this.length);for(var r=this[t],o=1,i=0;++i<e&&(o*=256);)r+=this[t+i]*o;return r>=(o*=128)&&(r-=Math.pow(2,8*e)),r},s.prototype.readIntBE=function(t,e,n){t|=0,e|=0,n||L(t,e,this.length);for(var r=e,o=1,i=this[t+--r];r>0&&(o*=256);)i+=this[t+--r]*o;return i>=(o*=128)&&(i-=Math.pow(2,8*e)),i},s.prototype.readInt8=function(t,e){return e||L(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},s.prototype.readInt16LE=function(t,e){e||L(t,2,this.length);var n=this[t]|this[t+1]<<8;return 32768&n?4294901760|n:n},s.prototype.readInt16BE=function(t,e){e||L(t,2,this.length);var n=this[t+1]|this[t]<<8;return 32768&n?4294901760|n:n},s.prototype.readInt32LE=function(t,e){return e||L(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},s.prototype.readInt32BE=function(t,e){return e||L(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},s.prototype.readFloatLE=function(t,e){return e||L(t,4,this.length),o.read(this,t,!0,23,4)},s.prototype.readFloatBE=function(t,e){return e||L(t,4,this.length),o.read(this,t,!1,23,4)},s.prototype.readDoubleLE=function(t,e){return e||L(t,8,this.length),o.read(this,t,!0,52,8)},s.prototype.readDoubleBE=function(t,e){return e||L(t,8,this.length),o.read(this,t,!1,52,8)},s.prototype.writeUIntLE=function(t,e,n,r){(t=+t,e|=0,n|=0,r)||C(this,t,e,n,Math.pow(2,8*n)-1,0);var o=1,i=0;for(this[e]=255&t;++i<n&&(o*=256);)this[e+i]=t/o&255;return e+n},s.prototype.writeUIntBE=function(t,e,n,r){(t=+t,e|=0,n|=0,r)||C(this,t,e,n,Math.pow(2,8*n)-1,0);var o=n-1,i=1;for(this[e+o]=255&t;--o>=0&&(i*=256);)this[e+o]=t/i&255;return e+n},s.prototype.writeUInt8=function(t,e,n){return t=+t,e|=0,n||C(this,t,e,1,255,0),s.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=255&t,e+1},s.prototype.writeUInt16LE=function(t,e,n){return t=+t,e|=0,n||C(this,t,e,2,65535,0),s.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):U(this,t,e,!0),e+2},s.prototype.writeUInt16BE=function(t,e,n){return t=+t,e|=0,n||C(this,t,e,2,65535,0),s.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):U(this,t,e,!1),e+2},s.prototype.writeUInt32LE=function(t,e,n){return t=+t,e|=0,n||C(this,t,e,4,4294967295,0),s.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t):N(this,t,e,!0),e+4},s.prototype.writeUInt32BE=function(t,e,n){return t=+t,e|=0,n||C(this,t,e,4,4294967295,0),s.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):N(this,t,e,!1),e+4},s.prototype.writeIntLE=function(t,e,n,r){if(t=+t,e|=0,!r){var o=Math.pow(2,8*n-1);C(this,t,e,n,o-1,-o)}var i=0,a=1,u=0;for(this[e]=255&t;++i<n&&(a*=256);)t<0&&0===u&&0!==this[e+i-1]&&(u=1),this[e+i]=(t/a>>0)-u&255;return e+n},s.prototype.writeIntBE=function(t,e,n,r){if(t=+t,e|=0,!r){var o=Math.pow(2,8*n-1);C(this,t,e,n,o-1,-o)}var i=n-1,a=1,u=0;for(this[e+i]=255&t;--i>=0&&(a*=256);)t<0&&0===u&&0!==this[e+i+1]&&(u=1),this[e+i]=(t/a>>0)-u&255;return e+n},s.prototype.writeInt8=function(t,e,n){return t=+t,e|=0,n||C(this,t,e,1,127,-128),s.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[e]=255&t,e+1},s.prototype.writeInt16LE=function(t,e,n){return t=+t,e|=0,n||C(this,t,e,2,32767,-32768),s.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):U(this,t,e,!0),e+2},s.prototype.writeInt16BE=function(t,e,n){return t=+t,e|=0,n||C(this,t,e,2,32767,-32768),s.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):U(this,t,e,!1),e+2},s.prototype.writeInt32LE=function(t,e,n){return t=+t,e|=0,n||C(this,t,e,4,2147483647,-2147483648),s.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):N(this,t,e,!0),e+4},s.prototype.writeInt32BE=function(t,e,n){return t=+t,e|=0,n||C(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),s.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):N(this,t,e,!1),e+4},s.prototype.writeFloatLE=function(t,e,n){return j(this,t,e,!0,n)},s.prototype.writeFloatBE=function(t,e,n){return j(this,t,e,!1,n)},s.prototype.writeDoubleLE=function(t,e,n){return x(this,t,e,!0,n)},s.prototype.writeDoubleBE=function(t,e,n){return x(this,t,e,!1,n)},s.prototype.copy=function(t,e,n,r){if(n||(n=0),r||0===r||(r=this.length),e>=t.length&&(e=t.length),e||(e=0),r>0&&r<n&&(r=n),r===n)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(r<0)throw new RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),t.length-e<r-n&&(r=t.length-e+n);var o,i=r-n;if(this===t&&n<e&&e<r)for(o=i-1;o>=0;--o)t[o+e]=this[o+n];else if(i<1e3||!s.TYPED_ARRAY_SUPPORT)for(o=0;o<i;++o)t[o+e]=this[o+n];else Uint8Array.prototype.set.call(t,this.subarray(n,n+i),e);return i},s.prototype.fill=function(t,e,n,r){if("string"==typeof t){if("string"==typeof e?(r=e,e=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),1===t.length){var o=t.charCodeAt(0);o<256&&(t=o)}if(void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string");if("string"==typeof r&&!s.isEncoding(r))throw new TypeError("Unknown encoding: "+r)}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<n)throw new RangeError("Out of range index");if(n<=e)return this;var i;if(e>>>=0,n=void 0===n?this.length:n>>>0,t||(t=0),"number"==typeof t)for(i=e;i<n;++i)this[i]=t;else{var a=s.isBuffer(t)?t:Y(new s(t,r).toString()),u=a.length;for(i=0;i<n-e;++i)this[i+e]=a[i%u]}return this};var M=/[^+\/0-9A-Za-z-_]/g;function G(t){return t<16?"0"+t.toString(16):t.toString(16)}function Y(t,e){var n;e=e||1/0;for(var r=t.length,o=null,i=[],a=0;a<r;++a){if((n=t.charCodeAt(a))>55295&&n<57344){if(!o){if(n>56319){(e-=3)>-1&&i.push(239,191,189);continue}if(a+1===r){(e-=3)>-1&&i.push(239,191,189);continue}o=n;continue}if(n<56320){(e-=3)>-1&&i.push(239,191,189),o=n;continue}n=65536+(o-55296<<10|n-56320)}else o&&(e-=3)>-1&&i.push(239,191,189);if(o=null,n<128){if((e-=1)<0)break;i.push(n)}else if(n<2048){if((e-=2)<0)break;i.push(n>>6|192,63&n|128)}else if(n<65536){if((e-=3)<0)break;i.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;i.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return i}function B(t){return r.toByteArray(function(t){if((t=function(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}(t).replace(M,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function F(t,e,n,r){for(var o=0;o<r&&!(o+n>=e.length||o>=t.length);++o)e[o+n]=t[o];return o}}).call(this,n(11))},function(t,e,n){"use strict";e.byteLength=function(t){var e=c(t),n=e[0],r=e[1];return 3*(n+r)/4-r},e.toByteArray=function(t){for(var e,n=c(t),r=n[0],a=n[1],u=new i(function(t,e,n){return 3*(e+n)/4-n}(0,r,a)),s=0,f=a>0?r-4:r,l=0;l<f;l+=4)e=o[t.charCodeAt(l)]<<18|o[t.charCodeAt(l+1)]<<12|o[t.charCodeAt(l+2)]<<6|o[t.charCodeAt(l+3)],u[s++]=e>>16&255,u[s++]=e>>8&255,u[s++]=255&e;2===a&&(e=o[t.charCodeAt(l)]<<2|o[t.charCodeAt(l+1)]>>4,u[s++]=255&e);1===a&&(e=o[t.charCodeAt(l)]<<10|o[t.charCodeAt(l+1)]<<4|o[t.charCodeAt(l+2)]>>2,u[s++]=e>>8&255,u[s++]=255&e);return u},e.fromByteArray=function(t){for(var e,n=t.length,o=n%3,i=[],a=0,u=n-o;a<u;a+=16383)i.push(f(t,a,a+16383>u?u:a+16383));1===o?(e=t[n-1],i.push(r[e>>2]+r[e<<4&63]+"==")):2===o&&(e=(t[n-2]<<8)+t[n-1],i.push(r[e>>10]+r[e>>4&63]+r[e<<2&63]+"="));return i.join("")};for(var r=[],o=[],i="undefined"!=typeof Uint8Array?Uint8Array:Array,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",u=0,s=a.length;u<s;++u)r[u]=a[u],o[a.charCodeAt(u)]=u;function c(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var n=t.indexOf("=");return-1===n&&(n=e),[n,n===e?0:4-n%4]}function f(t,e,n){for(var o,i,a=[],u=e;u<n;u+=3)o=(t[u]<<16&16711680)+(t[u+1]<<8&65280)+(255&t[u+2]),a.push(r[(i=o)>>18&63]+r[i>>12&63]+r[i>>6&63]+r[63&i]);return a.join("")}o["-".charCodeAt(0)]=62,o["_".charCodeAt(0)]=63},function(t,e){e.read=function(t,e,n,r,o){var i,a,u=8*o-r-1,s=(1<<u)-1,c=s>>1,f=-7,l=n?o-1:0,h=n?-1:1,p=t[e+l];for(l+=h,i=p&(1<<-f)-1,p>>=-f,f+=u;f>0;i=256*i+t[e+l],l+=h,f-=8);for(a=i&(1<<-f)-1,i>>=-f,f+=r;f>0;a=256*a+t[e+l],l+=h,f-=8);if(0===i)i=1-c;else{if(i===s)return a?NaN:1/0*(p?-1:1);a+=Math.pow(2,r),i-=c}return(p?-1:1)*a*Math.pow(2,i-r)},e.write=function(t,e,n,r,o,i){var a,u,s,c=8*i-o-1,f=(1<<c)-1,l=f>>1,h=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,p=r?0:i-1,d=r?1:-1,_=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(u=isNaN(e)?1:0,a=f):(a=Math.floor(Math.log(e)/Math.LN2),e*(s=Math.pow(2,-a))<1&&(a--,s*=2),(e+=a+l>=1?h/s:h*Math.pow(2,1-l))*s>=2&&(a++,s/=2),a+l>=f?(u=0,a=f):a+l>=1?(u=(e*s-1)*Math.pow(2,o),a+=l):(u=e*Math.pow(2,l-1)*Math.pow(2,o),a=0));o>=8;t[n+p]=255&u,p+=d,u/=256,o-=8);for(a=a<<o|u,c+=o;c>0;t[n+p]=255&a,p+=d,a/=256,c-=8);t[n+p-d]|=128*_}},function(t,e){var n={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==n.call(t)}}])});
//# sourceMappingURL=sdk-wechat.2.9.0.js.map

/***/ }),

/***/ "./node_modules/_underscore@1.8.3@underscore/underscore.js":
/*!*****************************************************************!*\
  !*** ./node_modules/_underscore@1.8.3@underscore/underscore.js ***!
  \*****************************************************************/
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

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/common/color.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/common/color.js ***!
  \*******************************************************************************/
/*! exports provided: RED, BLUE, WHITE, GREEN, ORANGE, GRAY, GRAY_DARK */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RED", function() { return RED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLUE", function() { return BLUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WHITE", function() { return WHITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GREEN", function() { return GREEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORANGE", function() { return ORANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GRAY", function() { return GRAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GRAY_DARK", function() { return GRAY_DARK; });
const RED = '#ee0a24';
const BLUE = '#1989fa';
const WHITE = '#fff';
const GREEN = '#07c160';
const ORANGE = '#ff976a';
const GRAY = '#323233';
const GRAY_DARK = '#969799';


/***/ }),

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/common/component.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/common/component.js ***!
  \***********************************************************************************/
/*! exports provided: VantComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VantComponent", function() { return VantComponent; });
/* harmony import */ var _mixins_basic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mixins/basic */ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/basic.js");
/* harmony import */ var _mixins_observer_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mixins/observer/index */ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/observer/index.js");


function mapKeys(source, target, map) {
    Object.keys(map).forEach(key => {
        if (source[key]) {
            target[map[key]] = source[key];
        }
    });
}
function VantComponent(vantOptions = {}) {
    const options = {};
    mapKeys(vantOptions, options, {
        data: 'data',
        props: 'properties',
        mixins: 'behaviors',
        methods: 'methods',
        beforeCreate: 'created',
        created: 'attached',
        mounted: 'ready',
        relations: 'relations',
        destroyed: 'detached',
        classes: 'externalClasses'
    });
    const { relation } = vantOptions;
    if (relation) {
        options.relations = Object.assign(options.relations || {}, {
            [`../${relation.name}/index`]: relation
        });
    }
    // add default externalClasses
    options.externalClasses = options.externalClasses || [];
    options.externalClasses.push('custom-class');
    // add default behaviors
    options.behaviors = options.behaviors || [];
    options.behaviors.push(_mixins_basic__WEBPACK_IMPORTED_MODULE_0__["basic"]);
    // map field to form-field behavior
    if (vantOptions.field) {
        options.behaviors.push('wx://form-field');
    }
    // add default options
    options.options = {
        multipleSlots: true,
        addGlobalClass: true
    };
    Object(_mixins_observer_index__WEBPACK_IMPORTED_MODULE_1__["observe"])(vantOptions, options);
    Component(options);
}



/***/ }),

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/common/utils.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/common/utils.js ***!
  \*******************************************************************************/
/*! exports provided: isDef, isObj, isNumber, range, nextTick, getSystemInfoSync, addUnit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDef", function() { return isDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObj", function() { return isObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "range", function() { return range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nextTick", function() { return nextTick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSystemInfoSync", function() { return getSystemInfoSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addUnit", function() { return addUnit; });
function isDef(value) {
    return value !== undefined && value !== null;
}
function isObj(x) {
    const type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
}
function isNumber(value) {
    return /^\d+(\.\d+)?$/.test(value);
}
function range(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
function nextTick(fn) {
    setTimeout(() => {
        fn();
    }, 1000 / 30);
}
let systemInfo = null;
function getSystemInfoSync() {
    if (systemInfo == null) {
        systemInfo = wx.getSystemInfoSync();
    }
    return systemInfo;
}
function addUnit(value) {
    if (!isDef(value)) {
        return undefined;
    }
    value = String(value);
    return isNumber(value) ? `${value}px` : value;
}


/***/ }),

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/dialog/dialog.js":
/*!********************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/dialog/dialog.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let queue = [];
function getContext() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
}
const Dialog = options => {
    options = Object.assign(Object.assign({}, Dialog.currentOptions), options);
    return new Promise((resolve, reject) => {
        const context = options.context || getContext();
        const dialog = context.selectComponent(options.selector);
        delete options.context;
        delete options.selector;
        if (dialog) {
            dialog.setData(Object.assign({ onCancel: reject, onConfirm: resolve }, options));
            queue.push(dialog);
        }
        else {
            console.warn('未找到 van-dialog 节点，请确认 selector 及 context 是否正确');
        }
    });
};
Dialog.defaultOptions = {
    show: true,
    title: '',
    width: null,
    message: '',
    zIndex: 100,
    overlay: true,
    selector: '#van-dialog',
    className: '',
    asyncClose: false,
    transition: 'scale',
    customStyle: '',
    messageAlign: '',
    overlayStyle: '',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    showConfirmButton: true,
    showCancelButton: false,
    closeOnClickOverlay: false,
    confirmButtonOpenType: ''
};
Dialog.alert = Dialog;
Dialog.confirm = options => Dialog(Object.assign({ showCancelButton: true }, options));
Dialog.close = () => {
    queue.forEach(dialog => {
        dialog.close();
    });
    queue = [];
};
Dialog.stopLoading = () => {
    queue.forEach(dialog => {
        dialog.stopLoading();
    });
};
Dialog.setDefaultOptions = options => {
    Object.assign(Dialog.currentOptions, options);
};
Dialog.resetDefaultOptions = () => {
    Dialog.currentOptions = Object.assign({}, Dialog.defaultOptions);
};
Dialog.resetDefaultOptions();
/* harmony default export */ __webpack_exports__["default"] = (Dialog);


/***/ }),

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/basic.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/basic.js ***!
  \*******************************************************************************/
/*! exports provided: basic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "basic", function() { return basic; });
const basic = Behavior({
    methods: {
        $emit(...args) {
            this.triggerEvent(...args);
        },
        getRect(selector, all) {
            return new Promise(resolve => {
                wx.createSelectorQuery()
                    .in(this)[all ? 'selectAll' : 'select'](selector)
                    .boundingClientRect(rect => {
                    if (all && Array.isArray(rect) && rect.length) {
                        resolve(rect);
                    }
                    if (!all && rect) {
                        resolve(rect);
                    }
                })
                    .exec();
            });
        }
    }
});


/***/ }),

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/button.js":
/*!********************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/button.js ***!
  \********************************************************************************/
/*! exports provided: button */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "button", function() { return button; });
const button = Behavior({
    externalClasses: ['hover-class'],
    properties: {
        id: String,
        lang: {
            type: String,
            value: 'en'
        },
        businessId: Number,
        sessionFrom: String,
        sendMessageTitle: String,
        sendMessagePath: String,
        sendMessageImg: String,
        showMessageCard: Boolean,
        appParameter: String,
        ariaLabel: String
    }
});


/***/ }),

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/link.js":
/*!******************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/link.js ***!
  \******************************************************************************/
/*! exports provided: link */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "link", function() { return link; });
const link = Behavior({
    properties: {
        url: String,
        linkType: {
            type: String,
            value: 'navigateTo'
        }
    },
    methods: {
        jumpLink(urlKey = 'url') {
            const url = this.data[urlKey];
            if (url) {
                wx[this.data.linkType]({ url });
            }
        }
    }
});


/***/ }),

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/observer/behavior.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/observer/behavior.js ***!
  \*******************************************************************************************/
/*! exports provided: behavior */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "behavior", function() { return behavior; });
const behavior = Behavior({
    methods: {
        set(data, callback) {
            return new Promise(resolve => {
                this.setData(data, () => {
                    if (callback && typeof callback === 'function') {
                        callback.call(this);
                    }
                    resolve();
                });
            });
        }
    }
});


/***/ }),

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/observer/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/observer/index.js ***!
  \****************************************************************************************/
/*! exports provided: observe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observe", function() { return observe; });
/* harmony import */ var _behavior__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./behavior */ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/observer/behavior.js");

function observe(vantOptions, options) {
    const { watch } = vantOptions;
    options.behaviors.push(_behavior__WEBPACK_IMPORTED_MODULE_0__["behavior"]);
    if (watch) {
        const props = options.properties || {};
        Object.keys(watch).forEach(key => {
            if (key in props) {
                let prop = props[key];
                if (prop === null || !('type' in prop)) {
                    prop = { type: prop };
                }
                prop.observer = watch[key];
                props[key] = prop;
            }
        });
        options.properties = props;
    }
}


/***/ }),

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/open-type.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/open-type.js ***!
  \***********************************************************************************/
/*! exports provided: openType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openType", function() { return openType; });
const openType = Behavior({
    properties: {
        openType: String
    },
    methods: {
        bindGetUserInfo(event) {
            this.$emit('getuserinfo', event.detail);
        },
        bindContact(event) {
            this.$emit('contact', event.detail);
        },
        bindGetPhoneNumber(event) {
            this.$emit('getphonenumber', event.detail);
        },
        bindError(event) {
            this.$emit('error', event.detail);
        },
        bindLaunchApp(event) {
            this.$emit('launchapp', event.detail);
        },
        bindOpenSetting(event) {
            this.$emit('opensetting', event.detail);
        },
    }
});


/***/ }),

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/touch.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/touch.js ***!
  \*******************************************************************************/
/*! exports provided: touch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "touch", function() { return touch; });
const touch = Behavior({
    methods: {
        touchStart(event) {
            const touch = event.touches[0];
            this.direction = '';
            this.deltaX = 0;
            this.deltaY = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.startX = touch.clientX;
            this.startY = touch.clientY;
        },
        touchMove(event) {
            const touch = event.touches[0];
            this.deltaX = touch.clientX - this.startX;
            this.deltaY = touch.clientY - this.startY;
            this.offsetX = Math.abs(this.deltaX);
            this.offsetY = Math.abs(this.deltaY);
            this.direction =
                this.offsetX > this.offsetY
                    ? 'horizontal'
                    : this.offsetX < this.offsetY
                        ? 'vertical'
                        : '';
        }
    }
});


/***/ }),

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/transition.js":
/*!************************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/mixins/transition.js ***!
  \************************************************************************************/
/*! exports provided: transition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transition", function() { return transition; });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils */ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/common/utils.js");

const getClassNames = (name) => ({
    enter: `van-${name}-enter van-${name}-enter-active enter-class enter-active-class`,
    'enter-to': `van-${name}-enter-to van-${name}-enter-active enter-to-class enter-active-class`,
    leave: `van-${name}-leave van-${name}-leave-active leave-class leave-active-class`,
    'leave-to': `van-${name}-leave-to van-${name}-leave-active leave-to-class leave-active-class`
});
const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30));
const transition = function (showDefaultValue) {
    return Behavior({
        properties: {
            customStyle: String,
            // @ts-ignore
            show: {
                type: Boolean,
                value: showDefaultValue,
                observer: 'observeShow'
            },
            // @ts-ignore
            duration: {
                type: null,
                value: 300,
                observer: 'observeDuration'
            },
            name: {
                type: String,
                value: 'fade'
            }
        },
        data: {
            type: '',
            inited: false,
            display: false
        },
        attached() {
            if (this.data.show) {
                this.enter();
            }
        },
        methods: {
            observeShow(value) {
                value ? this.enter() : this.leave();
            },
            enter() {
                const { duration, name } = this.data;
                const classNames = getClassNames(name);
                const currentDuration = Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["isObj"])(duration) ? duration.enter : duration;
                this.status = 'enter';
                this.$emit('before-enter');
                Promise.resolve()
                    .then(nextTick)
                    .then(() => {
                    this.checkStatus('enter');
                    this.$emit('enter');
                    this.setData({
                        inited: true,
                        display: true,
                        classes: classNames.enter,
                        currentDuration
                    });
                })
                    .then(nextTick)
                    .then(() => {
                    this.checkStatus('enter');
                    this.transitionEnded = false;
                    this.setData({
                        classes: classNames['enter-to']
                    });
                })
                    .catch(() => { });
            },
            leave() {
                if (!this.data.display) {
                    return;
                }
                const { duration, name } = this.data;
                const classNames = getClassNames(name);
                const currentDuration = Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["isObj"])(duration) ? duration.leave : duration;
                this.status = 'leave';
                this.$emit('before-leave');
                Promise.resolve()
                    .then(nextTick)
                    .then(() => {
                    this.checkStatus('leave');
                    this.$emit('leave');
                    this.setData({
                        classes: classNames.leave,
                        currentDuration
                    });
                })
                    .then(nextTick)
                    .then(() => {
                    this.checkStatus('leave');
                    this.transitionEnded = false;
                    setTimeout(() => this.onTransitionEnd(), currentDuration);
                    this.setData({
                        classes: classNames['leave-to']
                    });
                })
                    .catch(() => { });
            },
            checkStatus(status) {
                if (status !== this.status) {
                    throw new Error(`incongruent status: ${status}`);
                }
            },
            onTransitionEnd() {
                if (this.transitionEnded) {
                    return;
                }
                this.transitionEnded = true;
                this.$emit(`after-${this.status}`);
                const { show, display } = this.data;
                if (!show && display) {
                    this.setData({ display: false });
                }
            }
        }
    });
};


/***/ }),

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/picker/shared.js":
/*!********************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/picker/shared.js ***!
  \********************************************************************************/
/*! exports provided: pickerProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pickerProps", function() { return pickerProps; });
const pickerProps = {
    title: String,
    loading: Boolean,
    showToolbar: Boolean,
    cancelButtonText: {
        type: String,
        value: '取消'
    },
    confirmButtonText: {
        type: String,
        value: '确认'
    },
    visibleItemCount: {
        type: Number,
        value: 5
    },
    itemHeight: {
        type: Number,
        value: 44
    }
};


/***/ }),

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/toast/toast.js":
/*!******************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/toast/toast.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils */ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/common/utils.js");

const defaultOptions = {
    type: 'text',
    mask: false,
    message: '',
    show: true,
    zIndex: 1000,
    duration: 2000,
    position: 'middle',
    forbidClick: false,
    loadingType: 'circular',
    selector: '#van-toast'
};
let queue = [];
let currentOptions = Object.assign({}, defaultOptions);
function parseOptions(message) {
    return Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["isObj"])(message) ? message : { message };
}
function getContext() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
}
function Toast(toastOptions) {
    const options = Object.assign(Object.assign({}, currentOptions), parseOptions(toastOptions));
    const context = options.context || getContext();
    const toast = context.selectComponent(options.selector);
    if (!toast) {
        console.warn('未找到 van-toast 节点，请确认 selector 及 context 是否正确');
        return;
    }
    delete options.context;
    delete options.selector;
    toast.clear = () => {
        toast.setData({ show: false });
        if (options.onClose) {
            options.onClose();
        }
    };
    queue.push(toast);
    toast.setData(options);
    clearTimeout(toast.timer);
    if (options.duration > 0) {
        toast.timer = setTimeout(() => {
            toast.clear();
            queue = queue.filter(item => item !== toast);
        }, options.duration);
    }
    return toast;
}
const createMethod = (type) => (options) => Toast(Object.assign({ type }, parseOptions(options)));
Toast.loading = createMethod('loading');
Toast.success = createMethod('success');
Toast.fail = createMethod('fail');
Toast.clear = () => {
    queue.forEach(toast => {
        toast.clear();
    });
    queue = [];
};
Toast.setDefaultOptions = (options) => {
    Object.assign(currentOptions, options);
};
Toast.resetDefaultOptions = () => {
    currentOptions = Object.assign({}, defaultOptions);
};
/* harmony default export */ __webpack_exports__["default"] = (Toast);


/***/ }),

/***/ "./node_modules/_weapp-zx@1.1.0@weapp-zx/index.js":
/*!********************************************************!*\
  !*** ./node_modules/_weapp-zx@1.1.0@weapp-zx/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/user */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/user/index.js");
/* harmony import */ var _src_tables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/tables */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/tables/index.js");
/* harmony import */ var _src_yun__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/yun */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/yun/index.js");
/* harmony import */ var _src_file__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/file */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/file/index.js");
__webpack_require__(/*! minapp-sdk */ "./node_modules/_minapp-sdk@2.9.0@minapp-sdk/lib/index.js")





const ZX = {
  // user 模块
  login: _src_user__WEBPACK_IMPORTED_MODULE_0__["login"],
  logout: _src_user__WEBPACK_IMPORTED_MODULE_0__["logout"],
  handleUserInfo: _src_user__WEBPACK_IMPORTED_MODULE_0__["handleUserInfo"],
  user: _src_user__WEBPACK_IMPORTED_MODULE_0__["user"],
  id: _src_user__WEBPACK_IMPORTED_MODULE_0__["id"],
  // tables 模块
  create: _src_tables__WEBPACK_IMPORTED_MODULE_1__["create"],
  get: _src_tables__WEBPACK_IMPORTED_MODULE_1__["get"],
  find: _src_tables__WEBPACK_IMPORTED_MODULE_1__["find"],
  count: _src_tables__WEBPACK_IMPORTED_MODULE_1__["count"],
  update: _src_tables__WEBPACK_IMPORTED_MODULE_1__["update"],
  getQuery: _src_tables__WEBPACK_IMPORTED_MODULE_1__["getQuery"],
  getWithoutData: _src_tables__WEBPACK_IMPORTED_MODULE_1__["getWithoutData"],
  // 云函数
  yun: _src_yun__WEBPACK_IMPORTED_MODULE_2__["yun"],
  // 文件
  upload: _src_file__WEBPACK_IMPORTED_MODULE_3__["upload"],
}

ZX.init = function (clientID, tables = {}) {
  wx.BaaS.init(clientID)
  ZX.tables = tables
  Object.keys(tables).forEach(key => {
    const tableName = tables[key]
    key = key[0].toUpperCase + key.slice(1)
    ZX[`t${key}`] = function () {
      return new wx.BaaS.TableObject(tableName)
    }
  })
}

ZX.Query = wx.BaaS.Query

/* harmony default export */ __webpack_exports__["default"] = (ZX);

/***/ }),

/***/ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/file/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/_weapp-zx@1.1.0@weapp-zx/src/file/index.js ***!
  \*****************************************************************/
/*! exports provided: upload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _upload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./upload */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/file/upload.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "upload", function() { return _upload__WEBPACK_IMPORTED_MODULE_0__["upload"]; });




/***/ }),

/***/ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/file/upload.js":
/*!******************************************************************!*\
  !*** ./node_modules/_weapp-zx@1.1.0@weapp-zx/src/file/upload.js ***!
  \******************************************************************/
/*! exports provided: upload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "upload", function() { return upload; });
function upload(filePath, categoryName) {
  let MyFile = new wx.BaaS.File()
  let fileParams = { filePath: filePath }
  let metaData = {}
  if (categoryName) {
    metaData.categoryName = categoryName
  }
  return MyFile.upload(fileParams, metaData)
}

/***/ }),

/***/ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/tables/c.js":
/*!***************************************************************!*\
  !*** ./node_modules/_weapp-zx@1.1.0@weapp-zx/src/tables/c.js ***!
  \***************************************************************/
/*! exports provided: create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/util/index.js");


function handleError(err) {
  let maybe
  let { code, message: msg } = err
  switch(code) {
    case 400:
      maybe = '1. 提交的 ACL 权限不合法 2. 提交的数据的字段类型不匹配 3. 提交的数据中没有包含必填项 4. 重复创建数据（设置了唯一索引）'
    case 403:
      maybe = '没有权限写入数据'
    case 404:
      maybe = '写入的数据表不存在'
    default:
      maybe = ''
  }
  return Promise.reject({
    msg,
    code,
    maybe
  })
}

/**
 * creat 新增数据项
 * @param {String} tableName 表名
 * @param {Object|Array} data 要新增的数据
 *  1. 不批量
 *    data = {
 *      name: 'apple',
 *      price: 1,
 *      desc: ['good'],
 *      amount: 0
 *    }
 *  2. 批量
 *    data = [
 *      { a: 2, b: 3 },
 *      { a: 99, b: 88 }
 *    ]
 * @param {Object} options 其他配置
 */
function create(tableName, data, options = {}) {
  if (typeof data !== 'object') {
    return Promise.reject('data 必须是 object or array')
  }
  let Product = new wx.BaaS.TableObject(tableName)
  let product = Product.create()
  let call = Object(_util__WEBPACK_IMPORTED_MODULE_0__["isArray"])(data) ? 'createMany' : 'set'
  return product[call](data)
    .save()
    .then(res => {
      let { statusCode: code, data } = res
      return { code, data }
    }, err => {
      return handleError(err)
    })
}

/***/ }),

/***/ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/tables/g.js":
/*!***************************************************************!*\
  !*** ./node_modules/_weapp-zx@1.1.0@weapp-zx/src/tables/g.js ***!
  \***************************************************************/
/*! exports provided: get, getWithoutData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWithoutData", function() { return getWithoutData; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/util/index.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/user/index.js");



function matchFunction(Product, options = {}) {
  let { select, expand } = options;
  let isExpand = typeof expand === 'string' || Object(_util__WEBPACK_IMPORTED_MODULE_0__["isArray"])(expand)
  let isSelect = typeof select === 'string' || Object(_util__WEBPACK_IMPORTED_MODULE_0__["isArray"])(select)
  let result = Product
  if (isExpand) {
    result = result.expand(expand)
  }
  if (isSelect) {
    result = result.select(select)
  }
  return result
}

function matchProduct(tableName) {
  if (tableName === 'user') {
    return new wx.BaaS.User()
  } else {
    return new wx.BaaS.TableObject(tableName)
  }
}

/**
 * get 获取数据项
 * @param {String} tableName 表名
 * @param {String} recordID 记录 ID
 * @param {Object} options 使用 select 来控制请求返回的字段
 */
function get(tableName, recordID, options = {}) {
  if (typeof options !== 'object' || Object(_util__WEBPACK_IMPORTED_MODULE_0__["isArray"])(options)) {
    return Promise.reject('options 必须为 object')
  }
  let Product = matchProduct(tableName)

  // 如果 tableName 是 'user' 且 recordID = 'me'
  if (tableName === 'user' && recordID === 'me') {
    return Object(_user__WEBPACK_IMPORTED_MODULE_1__["id"])()
      .then(res => {
        return matchFunction(Product, options)
          .get(res)
          .then(res => {
            let { statusCode: code, data } = res
            return { code, data }
          }, err => {
            let { code, message } = err;
            return Promise.reject({ code, msg: message })
          })
      })
  }

  return matchFunction(Product, options)
    .get(recordID)
    .then(res => {
      let { statusCode: code, data } = res
      return { code, data }
    }, err => {
      let { code, message } = err;
      return Promise.reject({ code, msg: message })
    })
}

/**
 * 
 * @param {String} tableName 表名
 * @param {object | string / integer} query
 *  - wx.BaaS.Query 实例，返回的 TableRecord 指向多个数据行
 *  - 数据行 id，返回的 TableRecord 对象指向指定的数据行
 */
function getWithoutData(tableName, query) {
  let Product = matchProduct(tableName)
  if (query === 'me' && tableName === 'user') {
    return Object(_user__WEBPACK_IMPORTED_MODULE_1__["id"])().then(res => {
      return Product.getWithoutData(res)
    })
  }
  let q = query
  if (typeof query === 'function') {
    q = new wx.BaaS.Query()
    q = query(q) || q
  }
  return Product.getWithoutData(q)
}

/***/ }),

/***/ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/tables/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/_weapp-zx@1.1.0@weapp-zx/src/tables/index.js ***!
  \*******************************************************************/
/*! exports provided: create, get, getWithoutData, update, find, count, getQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./c */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/tables/c.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "create", function() { return _c__WEBPACK_IMPORTED_MODULE_0__["create"]; });

/* harmony import */ var _g__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./g */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/tables/g.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "get", function() { return _g__WEBPACK_IMPORTED_MODULE_1__["get"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getWithoutData", function() { return _g__WEBPACK_IMPORTED_MODULE_1__["getWithoutData"]; });

/* harmony import */ var _u__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./u */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/tables/u.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "update", function() { return _u__WEBPACK_IMPORTED_MODULE_2__["update"]; });

/* harmony import */ var _q__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./q */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/tables/q.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "find", function() { return _q__WEBPACK_IMPORTED_MODULE_3__["find"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "count", function() { return _q__WEBPACK_IMPORTED_MODULE_3__["count"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQuery", function() { return _q__WEBPACK_IMPORTED_MODULE_3__["getQuery"]; });






/***/ }),

/***/ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/tables/q.js":
/*!***************************************************************!*\
  !*** ./node_modules/_weapp-zx@1.1.0@weapp-zx/src/tables/q.js ***!
  \***************************************************************/
/*! exports provided: find, count, getQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "find", function() { return find; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "count", function() { return count; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQuery", function() { return getQuery; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/util/index.js");


function handleError(err) {
  let maybe
  let { code, message: msg } = err
  switch(code) {
    case 400:
      maybe = '1. 指定/过滤输出字段的字段名有误、2. GEO 查询参数有误、3. 查询语法错误'
    case 404:
      maybe = '数据表不存在'
    default:
      maybe = ''
  }
  return Promise.reject({
    msg,
    code,
    maybe
  })
}

function matchFunction(Product, options = {}) {
  let { fn, limit, offset, orderBy, expand, select } = options;
  let isExpand = typeof expand === 'string' || Object(_util__WEBPACK_IMPORTED_MODULE_0__["isArray"])(expand)
  let isSelect = typeof select === 'string' || Object(_util__WEBPACK_IMPORTED_MODULE_0__["isArray"])(select)
  let isQuery = typeof fn === 'function'
  let isPageable = typeof limit === 'number' && typeof offset === 'number'
  let isOrder = typeof orderBy === 'string' || Object(_util__WEBPACK_IMPORTED_MODULE_0__["isArray"])(orderBy)
  let result = Product;
  if (isQuery) {
    let defaultQuery = new wx.BaaS.Query()
    let query = fn(defaultQuery) || defaultQuery
    result = result.setQuery(query)
  }
  if (isSelect) {
    result = result.select(select)
  }
  if (isExpand) {
    result = result.expand(expand)
  }
  if (isPageable) {
    result = result.limit(limit).offset(offset)
  }
  if (isOrder) {
    result = result.orderBy(orderBy)
  }
  return result
}

function matchProduct(tableName) {
  if (tableName === 'user') {
    return new wx.BaaS.User()
  } else {
    return new wx.BaaS.TableObject(tableName)
  }
}

/**
 * 查询
 * @param {String} tableName 表名
 * @param {Object} options 配置项
 *  1. 不传, 或传空对象, 则直接进行 find
 *  2. fn 无 return, 则使用默认的 query
 *      fn: (query) => {
 *        query.compare('amount', '>=', 1)
 *        query.compare('amount', '<', 10)
 *      }
 *  3. fn 有 return myQuery, 则使用自定义的 query
 *      fn: (query) => {
 *        query.compare('price', '>', 10)
 *        let query1 = new wx.BaaS.Query()
 *        query1.isNull('name')
 *        let orQuery = wx.BaaS.Query.or(query, query1)
 *        return orQuery
 *      }
 *  4. limit, offset 分页
 *  5. orderBy 排序
 *      - 普通 '-created_at' or ['-created_at']
 *      - 多重 ['-created_at', 'created_by']
 *  6. expend 扩展, 返回中扩展该字段所对应关联表中的行信息
 *      - 'created_by'
 *      - ['created_by', 'pointer_value']
 * @return {Promise}
 *  - res: { code, data }
 *  - err: { msg, code, maybe }, 其中, maybe 为发生错误的可能原因
 */
function find(tableName, options = {}) {
  if (typeof options !== 'object' || Object(_util__WEBPACK_IMPORTED_MODULE_0__["isArray"])(options)) {
    return Promise.reject('options 必须为 object')
  }
  let Product = matchProduct(tableName)

  return matchFunction(Product, options)
    .find()
    .then(res => {
      let { statusCode: code, data } = res
      return { code, data }
    }, err => {
      return handleError(err)
    })
}

/**
 * 查询数据总数
 * @param {String} tableName 表名
 * @param {Object} options 同 find
 * @return {Promise} res: num 总数
 */
function count(tableName, options = {}) {
  if (typeof options !== 'object' || Object(_util__WEBPACK_IMPORTED_MODULE_0__["isArray"])(options)) {
    return Promise.reject('options 必须为 object')
  }
  let Product = matchProduct(tableName)

  return matchFunction(Product, options)
    .count()
    .then(num => {
      return num
    }, err => {
      return handleError(err)
    })
}


function getQuery() {
  return new wx.BaaS.Query()
}

/***/ }),

/***/ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/tables/u.js":
/*!***************************************************************!*\
  !*** ./node_modules/_weapp-zx@1.1.0@weapp-zx/src/tables/u.js ***!
  \***************************************************************/
/*! exports provided: update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/util/index.js");
/* harmony import */ var _g__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./g */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/tables/g.js");



function handleError(err) {
  let maybe
  let { code, message: msg } = err
  switch(code) {
    case 400:
      maybe = '1. 提交的数据不合法、2. 重复创建数据（设置了唯一索引）'
    case 403:
      maybe = '没有权限更新数据'
    case 404:
      maybe = '数据行不存在'
    default:
      maybe = ''
  }
  return Promise.reject({
    msg,
    code,
    maybe
  })
}

function matchProduct(tableName) {
  if (tableName === 'user') {
    return new wx.BaaS.User()
  } else {
    return new wx.BaaS.TableObject(tableName)
  }
}

/**
 * update 更新数据项
 * @param {String} tableName 表名
 * @param {String} recordID 数据行 ID
 * @param {Object|Array} data 更新的数据
 *  1. 普通更新
 *    data = {
 *      name: 'apple',
 *      price: 1,
 *      desc: ['good'],
 *      amount: 0
 *    }
 */
function update(tableName, recordID, data) {
  if (typeof data !== 'object') {
    return Promise.reject('data must be an Object or Array')
  }

  if (tableName === 'user' && recordID === 'me') {
    return Object(_g__WEBPACK_IMPORTED_MODULE_1__["getWithoutData"])(tableName, recordID)
      .then(res => {
        let product = res
        product.set(data)
        return product.update(data)
          .then(res => {
            let { statusCode: code, data } = res
            return { code, data }
          }, err => {
            return handleError(err)
          })
      })
  }

  let product = Object(_g__WEBPACK_IMPORTED_MODULE_1__["getWithoutData"])(tableName, recordID)
  product.set(data)
  return product.update(data)
    .then(res => {
      let { statusCode: code, data } = res
      return { code, data }
    }, err => {
      return handleError(err)
    })
}

/***/ }),

/***/ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/user/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/_weapp-zx@1.1.0@weapp-zx/src/user/index.js ***!
  \*****************************************************************/
/*! exports provided: login, handleUserInfo, logout, id, user */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleUserInfo", function() { return handleUserInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "id", function() { return id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "user", function() { return user; });
// 简单登录
function login() {
  return wx.BaaS.auth.loginWithWechat()
}

// 获取用户授权
function handleUserInfo(data) {
  return wx.BaaS.auth.loginWithWechat(data)
}

// 登出
function logout() {
  return wx.BaaS.auth.logout()
}

// 获取自己的用户 id
function id() {
  return user('json').then(res => {
    return res.id
  })
}

// 获取用户信息
function user(option = '', data = {}) {
  if (!option) { // 不传 option：获取 currentUser 对象
    return wx.BaaS.auth.getCurrentUser()
  } else if (option === 'get') { // option === "get"：获取用户的单个字段(包括内置字段和自定义字段)
    return new Promise((resolve, reject) => {
      if (!data) {
        reject('请传入第二个参数 key')
      }
      wx.BaaS.auth.getCurrentUser().then(user => {
        resolve(user.get(data))
      }).catch(err => {
        reject(err)
      })
    })
  } else if (option === 'json') { // option === "json"：一次性获取完整的用户信息
    return wx.BaaS.auth.getCurrentUser().then(user => {
      return user.toJSON()
    })
  } else if (option === 'update') { // 更新用户自定义字段
    return new Promise((resolve, reject) => {
      if (!data) {
        reject('请传入第二个参数 data')
      } else if (typeof data !== 'object') {
        reject('类型错误，二个参数应该是一个对象')
      }
      wx.BaaS.auth.getCurrentUser().then(user => {
        // 只支持一次性赋值，即 data 是个对象
        return user.set(data).update()
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

/***/ }),

/***/ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/util/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/_weapp-zx@1.1.0@weapp-zx/src/util/index.js ***!
  \*****************************************************************/
/*! exports provided: isArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
function isArray(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  } else{
    return Object.prototype.toString.call(value) === '[object Array]'
  }
}

/***/ }),

/***/ "./node_modules/_weapp-zx@1.1.0@weapp-zx/src/yun/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/_weapp-zx@1.1.0@weapp-zx/src/yun/index.js ***!
  \****************************************************************/
/*! exports provided: yun */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yun", function() { return yun; });
// 调用云函数
function yun(funcName, data) {
  return wx.BaaS.invokeFunction(funcName, data)
}


/***/ })

};;