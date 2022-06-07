import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack, { Configuration, Entry } from 'webpack';
const { InjectManifest } = require('workbox-webpack-plugin');

import { DIST_DIR, IS_DEV, SRC_DIR, IS_PROD } from './env';
import { cssLoader, fileLoader, jsLoader } from './loaders';

const webpackPlugins = [
  new MiniCssExtractPlugin({ filename: '[name].css' }),
  new webpack.HotModuleReplacementPlugin(),
];

if (IS_PROD) {
  webpackPlugins.push(
    new InjectManifest({
      swSrc: './src/src-sw.js',
      swDest: 'sw.js',
    }),
  );
}

export const clientConfig: Configuration = {
  output: {
    path: DIST_DIR,
    filename: '[name].js',
    publicPath: '/',
  },
  entry: [
    IS_DEV && 'react-hot-loader/patch',
    IS_DEV && 'webpack-hot-middleware/client',
    IS_DEV && 'css-hot-loader/hotModuleReplacement',
    path.join(SRC_DIR, 'index'),
  ].filter(Boolean) as Entry,
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    fallback: { url: false },
  },
  plugins: webpackPlugins,
  module: {
    rules: [jsLoader.client, cssLoader.client, fileLoader.client],
  },
};
