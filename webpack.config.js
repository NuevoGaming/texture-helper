const path = require('path');
const webpack = require('webpack');

var externals = [
  'reflect-metadata',
  'rxjs',
  'zone.js',
  'angular2/core',
  'angular2/common',
  'angular2/router',
  'angular2/http',
  'angular2/platform/browser',
  'electron',
  'path'
];
var externalsHash = getExternalsHash(externals);

module.exports = {
  target: 'atom',
  entry: {
    'back-end/back-end': path.join(__dirname, 'src/back-end/main.js'),
    'front-end/welcome': path.join(__dirname, 'src/front-end/WelcomeBootstrap.js'),
    'front-end/project': path.join(__dirname, 'src/front-end/ProjectBootstrap.js')
  },
  output: {
    path: path.join(__dirname, 'built'),
    filename: '[name]-bundle.js',
    sourceMapFilename: '[file].map'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.js']
  },
  externals: [
    externalsHash
  ],
  node: {
    process: false,
    __dirname: false
  },
  //devtool: 'source-map',
  module: {
    //noParse: [ /node_modules/ ],
    loaders: [
      //{
      //  test: /^angular2/,
      //  loader: 'null'
      //},
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: [
            'angular2-annotations',
            'transform-decorators-legacy',
            'transform-class-properties',
            'transform-flow-strip-types'
          ]
        }
      }
    ]
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({
    //  sourceMap: true,
    //  mangle: false
    //})
  ]
};

function getExternalsHash(externals) {
  var hash = {};
  externals.forEach(function(lib) {
      hash[lib] = 'commonjs ' + lib;
  });
  return hash;
}
