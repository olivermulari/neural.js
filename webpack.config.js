const nodeExternals = require('webpack-node-externals');
const path = require("path")

module.exports = {
  entry: './src/neural.ts',
  output: {
    filename: 'neural.js',
    path: path.resolve('build'),
    libraryExport: 'default',
    libraryTarget: 'this',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ]
  },
  externals: [nodeExternals()]
};