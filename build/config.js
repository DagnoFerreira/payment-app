import path from 'path'

const config = {
  projectRoot: path.resolve(__dirname, '../'),
  rootPath: path.resolve(__dirname, '../dist'),
  nodePath: path.resolve(__dirname, '../node_modules'),
  srcPath: 'src',
  indexPath: 'src/index.html',
  publicPath: '/',
  assetsPath: 'src/assets'
}

const dev = {
  server: {
    port: '8080'
  },
  env: {
    NODE_ENV: '"development"',
    API_URL: '"http://weathered-lake-9133.getsandbox.com/"'
  }
}

const prod = {
  env: {
    NODE_ENV: '"production"',
    API_URL: '"http://weathered-lake-9133.getsandbox.com/"'
  }
}

if (process.env.NODE_ENV === 'production') {
  Object.assign(config, prod)
} else {
  Object.assign(config, dev)
}

export default config
