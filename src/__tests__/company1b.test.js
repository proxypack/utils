const methods = require('../index')
const getAllChunkNames = methods.getAllChunkNames
const isFilepathWebpackChunk = methods.isFilePathWebpackChunk
const webpackStats = require('../__mocks__/company1/webpackStats')

const fullTemplate = '[contenthash]-[name]'
const hashDigestLength = 20
const webpackChunkNames = getAllChunkNames(webpackStats)

describe('detect if file path is webpack chunk', () => {
  it('should return true, because hash is at start', () => {
    const filePath =
      'https://dhmmnd775wlnp.cloudfront.net/3398189b92/js/apps/dist/234eecb673c7c303f4cf-2fa~apps~authentication~beacons~connection-settings~custom-fields~customer-profile~customers~dashboa~aaa993df.js'
    expect(
      isFilepathWebpackChunk({
        filePath,
        fullTemplate,
        hashDigestLength,
        webpackChunkNames,
      }),
    ).toEqual(true)
  })

  it('should return false, because the hash is at end', () => {
    const filePath =
      'https://dhmmnd775wlnp.cloudfront.net/3398189b92/js/apps/dist/2fa~apps~authentication~beacons~connection-settings~custom-fields~customer-profile~customers~dashboa~aaa993df-234eecb673c7c303f4cf.js'
    expect(
      isFilepathWebpackChunk({
        filePath,
        fullTemplate,
        hashDigestLength,
        webpackChunkNames,
      }),
    ).toEqual(false)
  })
})
