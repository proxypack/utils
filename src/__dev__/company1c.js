const methods = require('../index')
const isFilepathWebpackChunk = methods.isFilePathWebpackChunk
const webpackStats = require('../__mocks__/company1/webpackStats')
const getAllChunkNames = methods.getAllChunkNames

const fullTemplate = '[name]-[contenthash]-[contenthash]'
const hashDigestLength = 8
const webpackChunkNames = getAllChunkNames(webpackStats)

const filePath =
  'https://dhmmnd775wlnp.cloudfront.net/3398189b92/js/apps/dist/2fa~apps~authentication~beacons~connection-settings~custom-fields~customer-profile~customers~dashboa-5ad78fdf-28fdb9de.js'
const result = isFilepathWebpackChunk({
  filePath,
  fullTemplate,
  hashDigestLength,
  webpackChunkNames,
})
