const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withCSS = require("@zeit/next-css");
const path = require("path");
const withAntdLess = require("next-plugin-antd-less");
const withImages = require("next-images");

module.exports = withImages({
  webpack(config, options) {
    return config;
  },
});

module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = withCSS({
  cssLoaderOptions: {
    url: false,
  },
});

module.exports = withBundleAnalyzer({
  target: "serverless",
  env: {
    IMAGE_API_URL: process.env.IMAGE_API_URL,
  },
  webpack(conf) {
    conf.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  // Enable figma's wrong mask-type attribute work
                  removeRasterImages: false,
                  removeStyleElement: false,
                  removeUnknownsAndDefaults: false,
                  // Enable svgr's svg to fill the size
                  removeViewBox: false,
                },
              ],
            },
          },
        },
      ],
    });
    // 절대경로
    // conf.resolve.modules.push(__dirname);
    return conf;
  },
});

module.exports = withAntdLess({
  // optional: you can modify antd less variables directly here
  modifyVars: { "@primary-color": "#3e5d8b", "@menu-item-active-bg": "#FFF" },
  // Or better still you can specify a path to a file
  lessVarsFilePath: "@src/styles/variables.less",
  // optional
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},

  // Other Config Here...

  webpack(config) {
    config.resolve = {
      alias: {
        "@src": path.resolve(__dirname, "./"),
        "@components/*": path.resolve(__dirname, "./components"),
      },
      ...config.resolve,
    };
    return config;
  },

  // ONLY for Next.js 10, if you use Next.js 11, delete this block
});
