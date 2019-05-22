const path = require('path')

module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      {pattern: 'test/*.spec.js', watched: false}
    ],

    exclude: [],

    preprocessors: {
      'test/*.spec.js': ['webpack']
    },

    webpack: {
      mode: 'development',

      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src')
        }
      },

      module: {
        rules: [
          {
            test: /\.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.jsx$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          }
        ]
      },

      plugins: [],

      devtool: '#inline-source-map'
    },

    webpackMiddleware: {
      stats: 'error-only'
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false,

    concurrency: Infinity
  })
}

