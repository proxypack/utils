const isFilepathWebpackChunk = require('../index')
const webpackStats = require('../__mocks__/company1/webpackStats')
const getAllChunkNames = require('../getAllChunkNames')

const fullTemplate = '[name]-[contenthash]-[contenthash]'
const hashDigestLength = 8
const webpackChunkNames = getAllChunkNames(webpackStats)

describe('detect if file path is webpack chunk', () => {
  it('should return true, because double hash is at end', () => {
    const filePath =
      'https://dhmmnd775wlnp.cloudfront.net/3398189b92/js/apps/dist/2fa~apps~authentication~beacons~connection-settings~custom-fields~customer-profile~customers~dashboa~aaa993df-5ad78fdf-28fdb9de.js'
    expect(
      isFilepathWebpackChunk({
        filePath,
        fullTemplate,
        hashDigestLength,
        webpackChunkNames,
      }),
    ).toEqual(true)
  })

  it('should return false, because the double hash is at start', () => {
    const filePath =
      'https://dhmmnd775wlnp.cloudfront.net/3398189b92/js/apps/dist/234eecb6-234eecb6-2fa~apps~authentication~beacons~connection-settings~custom-fields~customer-profile~customers~dashboa~aaa993df-234eecb673c7c303f4cf.js'
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
