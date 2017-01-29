import path from 'path'
import express from 'express'
import chalk from 'chalk'
import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import historyApiFallback from 'connect-history-api-fallback'
import config from '../config'
import webpackConfig from '../webpack/dev'

const app = express()
const compiler = webpack(webpackConfig)
const hotMiddlewareInstance = hotMiddleware(compiler)
const devMiddlewareInstance = devMiddleware(compiler, {
  publicPath: config.publicPath,
  index: config.indexPath,
  stats: {
    colors: true,
    chunks: false
  }
})

compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, done) => {
    hotMiddlewareInstance.publish({ action: 'reload' })
    done()
  })
})

app.use(historyApiFallback())
app.use(hotMiddlewareInstance)
app.use(devMiddlewareInstance)
app.use('/assets', express.static(path.join(__dirname, '..', '..', config.assetsPath)))

export default app.listen(config.server.port, (error) => {
  const uri = 'http://localhost:' + config.server.port

  if (error) {
    console.warn(chalk.red(error))

    return
  }

  console.log(chalk.blue(`\nListening at ${uri}\n`))
})
