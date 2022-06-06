module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/transform-runtime'],
    ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
    '@babel/plugin-proposal-class-properties',
  ],
};
