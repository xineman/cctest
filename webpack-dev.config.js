const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    main: './app/public/js/client.js',
    libs: ['redux', 'react-redux', 'react', 'react-dom', 'dateformat']
  },
  output: {
    path: path.resolve(__dirname, 'app/public/js'),
    publicPath: 'js/',
    filename: '[name].js'
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
      names: ["libs", "manifest"]
    })
    // new webpack.DefinePlugin({
    // 	'process.env': {
    // 		NODE_ENV: JSON.stringify('production')
    // 	}
    // }),
    // new webpack.optimize.UglifyJsPlugin()
  ]
  // devServer: {
  //   contentBase: path.join(__dirname, "app/public"),
  //   // compress: true,
  //   port: 3000,
  //   watchContentBase: true
  //   // watchOptions: {
  //   //   // aggregateTimeout: 2000
  //   //   ignored: [/scss/, /css/]
  //   //
  //   // }
  // }
};

module.exports = config;
