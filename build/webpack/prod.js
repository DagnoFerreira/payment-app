import webpack from 'webpack'
import path from 'path'
import merge from 'webpack-merge'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import config from '../config'
import baseConfig from './base'

export default merge(baseConfig, {
  output: {
    path: path.join(config.rootPath),
    publicPath: '/',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js'
  },
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract('css'),
      scss: ExtractTextPlugin.extract(['css', 'sass'])
    },
    postcss: [
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR']
      })
    ]
  },
  plugins: [
    new webpack.WatchIgnorePlugin([config.nodePath]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name].[chunkhash:8].css'),
    new CopyWebpackPlugin([
      {
        context: config.assetsPath,
        from: '**/*',
        to: path.join(config.rootPath, 'assets')
      },
      {
        context: config.srcPath,
        from: '*.{json,xml}',
        to: config.rootPath
      }
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.indexPath,
      inject: true,
      minify: {
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        preventAttributesEscaping: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeCommentsFromCDATA: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        const resource = module.resource

        return resource && (/\.js$/).test(resource) && resource.indexOf(config.nodePath) === 0
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
})
