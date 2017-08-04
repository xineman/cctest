const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    main: './app/public/js/client.js',
    libs: ['react', 'react-dom', 'react-redux', 'redux']
  },
  output: {
    path: path.resolve(__dirname, 'app/public/js'),
    publicPath: 'js/',
    filename: '[name].min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({React: 'react', ReactDOM: 'react-dom'}),
    new webpack.optimize.CommonsChunkPlugin({
      names: [
        "libs", "manifest"
      ],
      filename: "[name].min.js"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};

module.exports = config;
