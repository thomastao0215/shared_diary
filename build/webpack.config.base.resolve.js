const path = require('path');

module.exports = {
  alias: {
    src: path.resolve(__dirname, '../src'),
    pages: path.resolve(__dirname, '../src/pages'),
    utils: path.resolve(__dirname, '../src/utils'),
    components: path.resolve(__dirname, '../src/components')
  }
};
