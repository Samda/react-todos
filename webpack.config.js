var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    "./src"
  ],
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'bundle.js'
  },
  resolve: {
    moduleDirectories: ['node_modules', 'src'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel?presets[]=react,presets[]=es2015']
      },

      {
        test: /\.css$/,
        loader: 'style!css?sourceMap'
      },

      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },

      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },

      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },

      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },

      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
}

