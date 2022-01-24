const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require("copy-webpack-plugin");

  module.exports = {
  mode: 'development',
  entry: './src/server.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/views', to: 'views' },
        { from: 'src/public', to: 'public' },
        { from: 'src/config/environments', to: 'config/environments' }
      ],
    }),
  ],
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: true
  }  
};