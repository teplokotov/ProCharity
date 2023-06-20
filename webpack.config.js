const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/scripts/index.js',
        layout: './src/scripts/layout.js',
        content: './src/scripts/content.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '',
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        port: 8080
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: '/node_modules/'
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                    'postcss-loader'
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'ui-kit.html',
            template: './src/ui-kit.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'lk-competencies.html',
            template: './src/lk-competencies.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'lk-motivation.html',
            template: './src/lk-motivation.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'lk-personal-data.html',
            template: './src/lk-personal-data.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'lk-portfolio.html',
            template: './src/lk-portfolio.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'lk-social.html',
            template: './src/lk-social.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'registration.html',
            template: './src/registration.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'registration-first-step.html',
            template: './src/registration-first-step.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'registration-new-volunteer.html',
            template: './src/registration-new-volunteer.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'settings-change-password.html',
            template: './src/settings-change-password.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'settings-notifications.html',
            template: './src/settings-notifications.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'settings-profile.html',
            template: './src/settings-profile.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'registration-npo-contacts.html',
            template: './src/registration-npo-contacts.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'registration-npo-confirmation-email.html',
            template: './src/registration-npo-confirmation-email.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'registration-npo-legal.html',
            template: './src/registration-npo-legal.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'registration-npo-documents.html',
            template: './src/registration-npo-documents.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'registration-npo-decription.html',
            template: './src/registration-npo-decription.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'registration-npo-links.html',
            template: './src/registration-npo-links.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'registration-npo-final.html',
            template: './src/registration-npo-final.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'lk-npo-contacts.html',
            template: './src/lk-npo-contacts.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'lk-npo-legal.html',
            template: './src/lk-npo-legal.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'lk-npo-documents.html',
            template: './src/lk-npo-documents.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'lk-npo-description.html',
            template: './src/lk-npo-description.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'lk-npo-links.html',
            template: './src/lk-npo-links.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'lk-access.html',
            template: './src/lk-access.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'lk-change-password.html',
            template: './src/lk-change-password.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'lk-donations.html',
            template: './src/lk-donations.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'lk-access-item.html',
            template: './src/lk-access-item.html',
            inject: 'body'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ]
}