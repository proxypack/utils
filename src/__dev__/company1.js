const webpackStats = require('./__mocks__/company1/webpackStats.json')
const isFilepathWebpackChunk = require('./index')
const getAllChunkNames = require('./getAllChunkNames')

const webpackChunkNames = getAllChunkNames(webpackStats)
const filePath =
  'https://dhmmnd775wlnp.cloudfront.net/3398189b92/js/apps/dist/2fa~apps~authentication~beacons~connection-settings~custom-fields~customer-profile~customers~dashboa~aaa993df-234eecb673c7c303f4cf.js'

isFilepathWebpackChunk({ filePath, webpackChunkNames })

module.exports = isFilepathWebpackChunk
