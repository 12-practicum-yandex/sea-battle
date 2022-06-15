import { RequestHandler } from 'express';

import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

export const webpackMiddleware = (config: webpack.Configuration): RequestHandler[] => {
  const compiler = webpack({ ...config, mode: 'development' });

  return [
    devMiddleware(compiler, {
      publicPath: config.output!.publicPath!,
      serverSideRender: true,
    }),
    hotMiddleware(compiler, { log: console.log, path: `/__webpack_hmr` }),
  ];
};
