const { override, addWebpackAlias } = require('customize-cra');
const path = require("path");

// console.log('path')
module.exports = override(
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "src"),
        ["@assets"]: path.resolve(__dirname, "src/assets"),
        ["@components"]: path.resolve(__dirname, "src/components"),
        ["@utils"]: path.resolve(__dirname, "src/utils")
    }),
);