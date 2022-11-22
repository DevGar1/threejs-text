const path = require("path");
const { default: merge } = require("webpack-merge");
const webpackConfigCommon = require("./webpack.config.common");

const infoColor = (_message) => {
  return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`;
};

module.exports = merge(webpackConfigCommon, {
  stats: "errors-warnings",
  mode: "development",
  infrastructureLogging: {
    level: "warn",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 5000,

    host: "local-ip",
    open: true,
    https: false,
    allowedHosts: "all",
    hot: false,
    watchFiles: ["src/**", "static/**"],
    static: {
      watch: true,
      directory: path.join(__dirname, "../static"),
    },
    client: {
      logging: "none",
      overlay: true,
      progress: false,
    },
    setupMiddlewares: function (middlewares, devServer) {
      console.log("------------------------------------------------------------");
      console.log(devServer.options.host);
      const port = devServer.options.port;
      const https = devServer.options.https ? "s" : "";
      const domain1 = `http${https}://${devServer.options.host}:${port}`;
      const domain2 = `http${https}://localhost:${port}`;

      console.log(`Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`);

      return middlewares;
    },
  },
});
