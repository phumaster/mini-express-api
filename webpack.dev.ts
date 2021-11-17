// @ts-ignore
const { merge } = require('webpack-merge');
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
// @ts-ignore
const base = require('./webpack.base');

module.exports = merge(base, {
  entry: ["webpack/hot/poll?100", "./src/main.ts"],
  mode: 'development',
  watch: true,
  externals: [
    nodeExternals({
      allowlist: ["webpack/hot/poll?100"]
    })
  ],
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
