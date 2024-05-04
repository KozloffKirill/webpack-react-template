import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import 'webpack-dev-server'; //https://webpack.js.org/configuration/configuration-languages/#typescript
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

type EnvType = {
  mode: 'production' | 'development';
  port: number;
};

const config: (env: EnvType) => webpack.Configuration = ({
  mode = 'development',
  port = 3000,
}) => ({
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: mode === 'development' ? '[path][name]__[local]' : '[hash:base64]',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' }), new MiniCssExtractPlugin()],
  devServer: {
    port,
    static: './build',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
});

export default config;
