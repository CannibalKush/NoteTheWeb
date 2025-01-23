const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/notetheweb.ts",
  output: {
    filename: "notetheweb.bundle.js",
    path: path.resolve(__dirname, "."),
  },
  mode: "development",
  devtool: "source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.IS_PREACT": JSON.stringify("true"),
    }),
  ],
};
