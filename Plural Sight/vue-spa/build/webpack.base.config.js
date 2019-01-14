const path = require("path");
const { VueLoaderPlugin } = require('vue-loader');

const config = {
    entry: {
        app: path.resolve(__dirname, "../src/client-entry.js")
    },
    module: {
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options:{
                    css: 'css-loader',
                    scss: 'css-loader|sass-loader',
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]
    },
    /*resolve:{
        alias:{
            vue: "vue/dist/vue.js"
        }
    },*/
    output:{
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",
        filename: "assets/js/[name].js"
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
      ]
};

module.exports = config;