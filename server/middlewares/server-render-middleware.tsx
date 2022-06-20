import { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';

import { StaticRouter } from 'react-router-dom/server';

import { App } from '../../src/app';
import { Provider } from 'react-redux';
import { create } from '../../src/store';

type GetHtmlProps = { reactHtml: string; scriptPath: string; preloadedState: string };

const getHtml = ({ reactHtml, scriptPath, preloadedState }: GetHtmlProps) => {
  const helmet = Helmet.renderStatic();
  return `
  <!DOCTYPE html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    </head>
    <body>
      <script>window.__PRELOADED_STATE__=${preloadedState}</script>
      <div id="root">${reactHtml}</div>
      <script src="${scriptPath}"></script>
    </body>
  </html>
  `;
};

export const serverRenderMiddleware = (req: Request, res: Response) => {
  const { devMiddleware } = res.locals.webpack;
  const { assetsByChunkName } = devMiddleware.stats.toJson();
  const scriptPath = assetsByChunkName.main[0];

  const store = create({});

  const jsx = (
    <StaticRouter location={req.url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );

  const preloadedState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
  const reactHtml = renderToString(jsx);

  res.status(200).send(getHtml({ reactHtml, scriptPath, preloadedState }));
};
