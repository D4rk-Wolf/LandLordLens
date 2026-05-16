const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
require('dotenv').config();

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction
        ? 'js/[name].[contenthash:8].js'
        : 'js/[name].js',
      chunkFilename: isProduction
        ? 'js/[name].[contenthash:8].chunk.js'
        : 'js/[name].chunk.js',
      publicPath: '/',
      clean: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        'react-native$': 'react-native-web',
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [],
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        minify: isProduction
          ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
          : false,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode || 'development'),
        'process.env.REACT_APP_API_URL': JSON.stringify(
          process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
        ),
        'process.env.STRIPE_PRICING_TABLE_ID': JSON.stringify(process.env.STRIPE_PRICING_TABLE_ID),
        'process.env.STRIPE_PUBLISHABLE_KEY': JSON.stringify(process.env.STRIPE_PUBLISHABLE_KEY),
      }),
      ...(isProduction
        ? [
          new webpack.optimize.ModuleConcatenationPlugin(),
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
          }),
        ]
        : []),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: isProduction
        ? [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info'],
              },
              mangle: true,
              format: {
                comments: false,
              },
            },
            extractComments: false,
          }),
        ]
        : [],
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          // Extract React and Core libs to a separate chunk (cached longer)
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-native-web|scheduler)[\\/]/,
            name: 'react-core',
            priority: 40,
            chunks: 'all',
            enforce: true,
          },
          // Extract React Query separately for better caching
          reactQuery: {
            test: /[\\/]node_modules[\\/](@tanstack[\\/]react-query)[\\/]/,
            name: 'react-query',
            priority: 35,
            chunks: 'all',
            enforce: true,
          },
          // Extract Navigation libs
          navigation: {
            test: /[\\/]node_modules[\\/](@react-navigation|react-router-dom)[\\/]/,
            name: 'navigation',
            priority: 30,
            chunks: 'all',
            enforce: true,
          },
          // Rest of node_modules
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: 20,
            chunks: 'all',
            reuseExistingChunk: true,
          },
          // Common code shared between chunks (components, utils)
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
      runtimeChunk: {
        name: 'runtime',
      },
      usedExports: true,
      sideEffects: true, // Allow tree shaking
      moduleIds: 'deterministic',
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3000,
      historyApiFallback: {
        index: '/index.html',
      },
      hot: true,
      open: false,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      ],
    },
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
