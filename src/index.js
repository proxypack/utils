const path = require('path')

function checkIfFileNameIsWebpackChunk({
  filename,
  hashDigestLength,
  seperator,
  webpackChunkName,
  isHashAtStart,
}) {
  let _test = ''

  const assembleRegularExpression = () => {}

  if (isHashAtStart) {
    _test = new RegExp(
      `(?<=[0-9a-fA-F]{${hashDigestLength}})${seperator}${webpackChunkName}`,
    )
  } else {
    _test = new RegExp(
      `${webpackChunkName}${seperator}(?=[0-9a-fA-F]){${hashDigestLength}}`,
    )
  }
  return _test.test(filename)
}

function isFilepathWebpackChunk({
  filePath,
  webpackChunkNames: _webpackChunkNames,
  fullTemplate = '[name]-[contenthash]',
  hashDigestLength = 20,
}) {
  const filename = path.basename(filePath, '.js')
  const webpackChunkNames = Array.from(_webpackChunkNames)

  // simple check to see if it's a possible match
  const chunkNameIndex = webpackChunkNames.findIndex(webpackChunkName => {
    return filename.indexOf(webpackChunkName) !== -1
  })

  // if yes continue to verify if it is really a match
  if (chunkNameIndex) {
    const webpackChunkName = webpackChunkNames[chunkNameIndex]

    // matches parts of fullTemplate
    const parts = fullTemplate.match(/[^\[]\w+[^\]]|-/g)

    const nameIndex = parts.indexOf('name')
    const contentHashIndex = parts.indexOf('contenthash')

    const isChunk = checkIfFileNameIsWebpackChunk({
      filename,
      hashDigestLength,
      seperator: parts[1],
      webpackChunkName,
      isHashAtStart: contentHashIndex < nameIndex,
    })

    return isChunk
  }
  return false
}

module.exports = isFilepathWebpackChunk
// https://github.com/webpack/webpack/blob/master/examples/aggressive-merging/webpack.config.js
// filename: "[name].bundle.js",
// chunkFilename: "[id].chunk.js"

// https://github.com/webpack/webpack/blob/master/examples/chunkhash/webpack.config.js
// filename: "[name].chunkhash.js",
// 		chunkFilename: "[name].chunkhash.js"
