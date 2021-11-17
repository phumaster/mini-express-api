const path = require("path");

module.exports = {
  target: "node",
  module: {
    rules: [
      {
        test: /.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      './package': './package.json',
    },
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js"
  },
  externals: {
    electron: "electron"
  },
};
