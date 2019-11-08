const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATH = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
}
const extractSass = new ExtractTextPlugin({
    filename: "style.css",
    disable: process.env.NODE_ENV === "prd"
});

const commonConfig = {

    entry: {
        src: PATH.src
    },
    output: {
        path:  PATH.build,
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        extractSass

    ]
}

const devConfig = Object.assign({},commonConfig, {
    mode: 'development',
    devServer:{
        historyApiFallback: true,
        port: '8082',
        host: "127.1.1.1",
        stats: "errors-only",
        proxy: {
            "/api": {
                target: "http://localhost:8082",
                pathRewrite:{"^/api": ""}
            }
        }
    }
})
const prdConfig = Object.assign({},commonConfig,{
    mode: 'production'
})

module.exports = (env) => {
    if( env == 'dev' ){
        return devConfig;
    }else if( env == 'prd' ){
        return prdConfig
    }
}