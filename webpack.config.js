const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const MediaQueryPlugin = require('media-query-plugin');

module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    },

    devServer: {
        before: function(app, server) {
            server._watch('./app/**/*.html')
        },

        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0'
    },

    plugins:[
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
        // new MediaQueryPlugin({
        //     queries: {
        //         '@media screen and (min-width: 720px)' : 'tablet'
        //     }
        // })
    ],

    module: {
        rules: [
            {
                test: /\.scss$/i,
                exclude: /node_modules/,
                use: [ 
                    'style-loader',
                    // MiniCssExtractPlugin.loader,
                    'css-loader',    
                    // MediaQueryPlugin.loader,
                    {
                        loader: 'group-css-media-queries-loader'
                    },
                    'sass-loader'
                ],
            },
        ]
    },

    mode: 'development'
}