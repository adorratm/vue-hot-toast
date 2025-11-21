const { resolve } = require('path')

module.exports = function VueHotToastModule(moduleOptions) {
  const options = {
    ...this.options.vueHotToast,
    ...moduleOptions,
  }

  // Add plugin
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'vue-hot-toast.js',
    options,
  })

  // Add component
  this.addComponent({
    name: 'Toaster',
    path: 'vue-hot-toast',
  })
}

module.exports.meta = require('../package.json')

