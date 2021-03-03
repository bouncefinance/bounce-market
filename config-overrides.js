const { override, addWebpackAlias } = require('customize-cra');
const path = require("path");
 
// console.log('path')
module.exports = override(
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "src"),
        ["@assets"]: path.resolve(__dirname, "src/assets"),
        ["@component"]: path.resolve(__dirname, "src/component")
    }),
);