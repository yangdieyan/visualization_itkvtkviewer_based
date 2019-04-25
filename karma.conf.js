/* eslint-disable global-require */
/* eslint-disable react/require-extension */
var path = require('path')

const vtkRules = require('vtk.js/Utilities/config/rules-vtk.js');

var webpack = require('webpack')

var sourcePath = path.join(__dirname, './src');

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test';

module.exports = function init(config) {
  config.set({
    plugins: [
      require('karma-webpack'),
      require('karma-tap'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-tap-pretty-reporter'),
      require('karma-junit-reporter'),
    ],

    basePath: '',
    frameworks: ['tap'],
    files: [
      './test/tests.js',
      { pattern: './dist/itk/ImageIOs/**', watched: true, served: true, included: false },
      { pattern: './dist/itk/MeshIOs/**', watched: true, served: true, included: false },
      { pattern: './dist/itk/WebWorkers/**', watched: true, served: true, included: false },
      { pattern: './dist/itk/Pipelines/**', watched: true, served: true, included: false },
      { pattern: './test/data/**', watched: false, served: true, included: false },
    ],

    preprocessors: {
      './test/tests.js': ['webpack'],
    },

    webpack: {
      mode: 'development',
      node: {
        fs: 'empty',
      },
      module: {
        rules: [
          { test: /\.(png|jpg)$/, use: 'url-loader?limit=81920' },
        ].concat(vtkRules),
      },
      resolve: {
        modules: [
          path.resolve(__dirname, 'node_modules'),
          sourcePath,
        ],
        alias: {
          './itkConfig$': path.resolve(__dirname, 'test', 'itkConfigBrowserTest.js'),
        },
      },
      plugins: [
        new webpack.DefinePlugin({
          __BASE_PATH__: "'/base'",
        }),
      ],
    },

    webpackMiddleware: {
      noInfo: true,
    },

    reporters: [
      'tap-pretty',
      'junit',
    ],

    tapReporter: {
      outputFile: 'test/output.html',
      prettifier: 'tap-markdown',
      separator: '\n=========================================================\n=========================================================\n',
    },

    junitReporter: {
      outputDir: 'test',
    },

    client: {
      useIframe: true,
    },

    // browserNoActivityTimeout: 600000,
    // browserDisconnectTimeout: 600000,

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
  });
};
