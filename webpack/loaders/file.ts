const fileRegex = /^(?!.*\.inline).*\.(svg|jpe?g|png|gif|eot|woff2?|ttf)$/;

export const fileLoader = {
  client: {
    loader: 'file-loader',
    test: fileRegex,
  },
  server: {
    type: 'asset/resource',
    test: fileRegex,
  },
};
