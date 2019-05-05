
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
      },

      module: {
        rules: [
          {
            test: /\.js$/,
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

