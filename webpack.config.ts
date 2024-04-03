import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import 'webpack-dev-server'; //https://webpack.js.org/configuration/configuration-languages/#typescript

type EnvType = {
    mode: 'production' | 'development';
    port: number;
};

const config: (env: EnvType) => webpack.Configuration = ({ mode = 'development', port = 3000 }) => ({
    mode,
    entry: './src/index.tsx',
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    }
                ],
            }
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
    devServer: {
        port,
        static: './build',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    }
});

export default config;
