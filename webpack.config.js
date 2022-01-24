const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");

  module.exports = {
  entry: './src/app.ts',
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
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/views', to: 'views' },
        { from: 'src/public', to: 'public' }
      ],
    }),
  ],
  target: 'node'
};