// @ts-ignore
const { merge } = require('webpack-merge');
// @ts-ignore
const base = require('./webpack.base');

module.exports = merge(base, {
  entry: ["./src/main.ts"],
  mode: 'production',
  watch: false,
});
