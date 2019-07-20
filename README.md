## ProxyPack Utils

### Install
`$ npm install @proxypack/utils`

### Usage

```
const proxyPackUtils= require('@proxypack/utils')
const webpackChunksNames = proxyPackUtils.getAllChunkNames({ webpackStats })
// returns array of webpackChunkNames

proxyPackUtils.isFilePathWebpackChunk({
    filePath: 'https://dhmmnd775wlnp.cloudfront.net/3398189b92/js/apps/dist/2fa~apps~authentication~beacons~connection-settings~custom-fields~customer-profile~customers~dashboa~aaa993df-234eecb673c7c303f4cf.js',
  webpackChunkNames: webpackChunkNames,
  fullTemplate = '[name]-[contenthash]',
  hashDigestLength = 20,
})
```

Can be used with webpack-stats-plugin:
https://www.npmjs.com/package/webpack-stats-plugin

And used internally in ProxyPack:
https://github.com/helpscout/proxypack
