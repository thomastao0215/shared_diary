const subpackageNames = [
  'example'
]

const groups = {
  commons: {
    name: 'commons',
    chunks: 'initial',
    minSize: 0,
    minChunks: 2,
    priority: 1,
    maxInitialRequests: 10
  },

  vendors: {
    test: module => !module.isEntryModule() && /\.js$/.test(module.resource) && /[\\/]node_modules[\\/]/.test(module.resource),
    name: 'vendors',
    chunks: 'all',
    maxInitialRequests: 10,
    priority: 1
  }
}

module.exports = groups
