const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const { optimize: { CommonsChunkPlugin }, ProvidePlugin } = require('webpack');
const { TsConfigPathsPlugin, CheckerPlugin } = require('awesome-typescript-loader');

// config helpers:
const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || []
const when = (condition, config, negativeConfig) =>
  condition ? ensureArray(config) : ensureArray(negativeConfig)

// primary config:
const title = 'Aurelia Navigation Skeleton';
const outDir = path.resolve(__dirname, 'dist');
const srcDir = path.resolve(__dirname, 'src');
const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const baseUrl = '/';

const cssRules = [
  { loader: 'css-loader' }
]

module.exports = () => ({
  resolve: {
    alias: {
      interact: path.resolve(__dirname, "node_modules", "interactjs", "dist", "interact.js")
    },
    extensions: ['.ts', '.js'],
    modules: [srcDir, 'node_modules'],
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  output: {
    path: outDir,
    publicPath: baseUrl,
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[hash].chunk.js',
  },
  module: {
    rules: [
      // CSS required in JS/TS files should use the style-loader that auto-injects it into the website
      // only when the issuer is a .js/.ts file, so the loaders are not applied inside html templates
      {
        test: /\.css$/i,
        issuer: [{ not: [{ test: /\.html$/i }] }],
        use: ['style-loader', ...cssRules]
      },
      {
        test: /\.css$/i,
        issuer: [{ test: /\.html$/i }],
        // CSS required in templates cannot be extracted safely
        // because Aurelia would try to require it again in runtime
        use: cssRules,
      },
      { test: /\.ts$/i, loader: 'awesome-typescript-loader' },
      { test: /\.html$/i, loader: 'html-loader' },
      { test: /\.json$/i, loader: 'json-loader' },
      // exposes jQuery globally as $ and as jQuery:
      { test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery' }
    ]
  },
  plugins: [
    new ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    }),
    new CheckerPlugin()
  ],
})