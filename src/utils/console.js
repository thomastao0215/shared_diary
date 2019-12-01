var CONFIG = require('./config');
if (CONFIG.env !== 'dev') {
  let _log = console.log;
  console.log = function(...args) {
    if (CONFIG.debug) _log.call(console, args);
  }
}