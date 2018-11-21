const webpack = require('webpack');
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MinifyPlugin = require("babel-minify-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');


module.exports = ({mode} = {mode:'development'}) => (
  {
    entry: './src/index.js',
    output:{
      path:path.resolve(__dirname, 'build'),
      filename: '[name].[hash].js'
    },
    mode,
    module: {
     rules: [
       {
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' }
        },
       {
      test: /\.(js|jsx)$/,
       exclude: /(node_modules|bower_components)/,
       use: {
         loader: 'babel-loader',
         options: {
           presets: ['@babel/preset-env', "@babel/preset-react"],
           plugins:['@babel/plugin-proposal-object-rest-spread', "@babel/plugin-transform-runtime","babel-plugin-styled-components",
           "@babel/plugin-proposal-class-properties","@babel/plugin-syntax-class-properties",
           "@babel/plugin-syntax-dynamic-import"
          ]
         }
       }
     },
     {
         test: /\.less$/,
         use: [  MiniCssExtractPlugin.loader,'css-loader', 'less-loader',"postcss-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
         use: [
           {
             loader: 'url-loader',
             options: {
               limit: 8192
             }
           }
         ]
       }
     ]
   },
   resolve: {
     extensions: ['*', '.js', '.jsx']
   },
   optimization: {
        splitChunks: {
            cacheGroups: {
                commons: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" }
            }
        }
    },
   plugins:[
     new MiniCssExtractPlugin({
     filename: "[name].[hash].css",
      }),
      new HtmlWebpackPlugin({
        filename:'index.html',
        title:"React app-dev",
        hash:false,
        template:'public/index.html'
      }),
      new PreloadWebpackPlugin({
        rel: 'preload',
        as(entry) {
          if (/\.css$/.test(entry)) return 'style';
          if (/\.woff$/.test(entry)) return 'font';
          if (/\.png$/.test(entry)) return 'image';
          return 'script';
        }
      }),
      new CompressionPlugin({
         algorithm: 'gzip'
      }),
      new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, 'src/sw.js'),
      }),
      new BundleAnalyzerPlugin(),
      new MinifyPlugin({}, {comments:false}),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true
      })
   ],
   devServer: {
   historyApiFallback: true
    }
  }
)
