'use strict';

// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    // assetsSubDirectory: '',
    // assetsPublicPath: '/hot/',
    productionSourceMap: true,


    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],


    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 9000,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {

      '/wuliuApi': {
        target: 'http://m.kuaidi100.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/wuliuApi': ''
        }
      },
      '/SpiderServerApi': {
        target: 'http://111.230.27.166:27777',
        changeOrigin: true,
        pathRewrite: {
          '^/SpiderServerApi': '/'
        }
      },
      '/CetServerApi': {
        target: 'http://cet.neea.edu.cn/cet',
        changeOrigin: true,
        pathRewrite: {
          '^/CetServerApi': '/'
        }
      },

      '/phpServer': {

        target: 'https://pocket.ykhuo.com',
        changeOrigin: true,
        pathRewrite: {
          '^/phpServer': ''
        }


      }




    },



    cssSourceMap: false
  }
}
