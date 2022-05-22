const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development',
  entry: './src/server.ts',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.ts'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}
