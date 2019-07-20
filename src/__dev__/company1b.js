const isFilepathWebpackChunk = require('../isFilePathWebpackChunk')
const webpackStats = require('../__mocks__/company1/webpackStats')
const getAllChunkNames = methods.getAllChunkNames

const fullTemplate = '[contenthash]-[name]'
const hashDigestLength = 20
const webpackChunkNames = getAllChunkNames(webpackStats)

const filePath =
  'https://dhmmnd775wlnp.cloudfront.net/3398189b92/js/apps/dist/234eecb673c7c303f4cf-2fa~apps~authentication~beacons~connection-settings~custom-fields~customer-profile~customers~dashboa.js'

const result = isFilepathWebpackChunk({
  filePath,
  fullTemplate,
  hashDigestLength,
  webpackChunkNames,
})
