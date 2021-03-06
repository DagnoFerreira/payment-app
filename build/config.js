import path from 'path'

const config = {
  projectRoot: path.join(__dirname, '../'),
  rootPath: path.join(__dirname, '../dist'),
  nodePath: path.join(__dirname, '../node_modules'),
  srcPath: 'src',
  indexPath: 'src/index.html',
  publicPath: '/',
  assetsPath: 'src/assets',
  server: {
    port: process.env.PORT || '8080'
  },
  env: {
    API_URL: '"https://weathered-lake-9133.getsandbox.com/"'
  }
}

export default config
