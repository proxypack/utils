const path = require('path')

function checkIfFileNameIsWebpackChunk({ filename, regexParts }) {
  const head = `^${regexParts[0].content}`
  const body = regexParts.reduce((regexStr, part, index) => {
    if (index === 0 || index === regexParts.length - 1) {
      return regexStr
    }
    return regexStr + part.content
  }, '')
  const tail = `${regexParts[regexParts.length - 1].content}$`
  const _test = new RegExp(`${head}${body}${tail}`)

  return _test.test(filename)
}

function makeRegexPart({ part, webpackChunkName, hashDigestLength }) {
  if (part === 'name') {
    return `(${webpackChunkName})`
  } else if (part === 'contenthash') {
    return `(?:[0-9a-fA-F]{${hashDigestLength}})`
  } else {
    return `(?:${part})`
  }
}

function isFilepathWebpackChunk({
  filePath,
  webpackChunkNames: _webpackChunkNames,
  fullTemplate = '[name]-[contenthash]',
  hashDigestLength = 20,
}) {
  const filename = path.basename(filePath, '.js')
  const webpackChunkNames = Array.from(_webpackChunkNames)

  const possibleChunks = webpackChunkNames.filter(chunkName => {
    return filename.includes(chunkName)
  })

  return possibleChunks.some(webpackChunkName => {
    const regexParts = fullTemplate.match(/[^\[]\w+[^\]]|-/g).map(part => {
      return {
        name: part,
        content: makeRegexPart({
          part,
          webpackChunkName,
          hashDigestLength,
        }),
      }
    })
    return checkIfFileNameIsWebpackChunk({ filename, regexParts })
  })
}

module.exports = isFilepathWebpackChunk
