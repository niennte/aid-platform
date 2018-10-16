import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { WDS_PORT } from './src/shared/config';
import { isProd } from './src/shared/util';

export default {
  // Here the application starts executing
  // and webpack starts bundling
  entry: [
    'react-hot-loader/patch',
    './src/client',
  ],
  // options related to how webpack emits results
  output: {
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    // the filename template for entry chunks
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '/static' : `http://localhost:${WDS_PORT}/dist/`,
  },
  module: {
    // Webpack uses a regular expression
    // to determine which files it should look
    // for and serve to a specific loader
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
          // fallback to style-loader in development
          loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }],
      },
    ],
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: WDS_PORT,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isProd ? 'css/[name].css' : 'css/[name].css',
      chunkFilename: isProd ? 'css/[id].css' : 'css/[id].css',
    }),
  ],
};
