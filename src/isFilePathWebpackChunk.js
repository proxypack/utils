const path = require('path')
const stringSimilarity = require('string-similarity')

function checkIfFileNameIsWebpackChunk({ filename, regexParts }) {
  const head = `^${regexParts[0].content}`
  const body = regexParts.reduce((regexStr, part, index) => {
    if (index === 0 || index === regexParts.length - 1) {
      return regexStr
    }
    return regexStr + part.content
  }, '')
  const tail = `${regexParts[regexParts.length - 1].content}$`
  const expression = head + body + tail
  const _test = new RegExp(`${head}${body}${tail}`)
  return _test.test(filename)
}

function makeRegexPart({ part, webpackChunkName, hashDigestLength }) {
  if (part === 'name') {
    return `(${webpackChunkName})`
  } else if (part === 'contenthash') {
    return `([0-9a-fA-F]{${hashDigestLength}})`
  } else {
    return `(${part})`
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

  const closestString = stringSimilarity.findBestMatch(
    filename,
    webpackChunkNames,
  )

  // if yes continue to verify against regex if it is really a match
  if (
    closestString &&
    closestString.bestMatch &&
    closestString.bestMatch.rating > 0.8 &&
    filename.includes(closestString.bestMatch.target)
  ) {
    const webpackChunkName = closestString.bestMatch.target

    // converts all the webpack and fileinfo we have to regex pieces
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

    const isChunk = checkIfFileNameIsWebpackChunk({
      filename,
      regexParts,
    })

    return isChunk
  }
  return false
}

module.exports = isFilepathWebpackChunk
