import path from 'path'
import webpack from 'webpack'
import eslintFormatter from 'eslint-friendly-formatter'
import config from '../config'

export default {
  entry: {
    app: './src/app/index.js'
  },
  output: {
    path: config.rootPath,
    publicPath: config.publicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.vue', '.js'],
    fallback: [config.nodePath],
    alias: {
      stylesheets: path.resolve(__dirname, '../../src/app/stylesheets'),
      services: path.resolve(__dirname, '../../src/app/services'),
      assets: path.resolve(__dirname, '../../src/assets')
    }
  },
  resolveLoader: {
    fallback: [config.nodePath]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: config.projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: config.projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: config.projectRoot,
        exclude: /node_modules/,
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        loader: 'vue-style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: 'vue-style-loader!css-loader!sass-loader'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpg|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '/assets/images/[name].[ext]'
        }
      }
    ]
  },
  eslint: {
    fix: true,
    formatter: eslintFormatter
  },
  vue: {
    loaders: {
      css: 'vue-style-loader!css-loader',
      scss: 'vue-style-loader!css-loader!sass-loader'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.env
    })
  ]
}
