const path = require("path");

function isFilepathWebpackChunk(filePath, _webpackChunkNames) {
  const filename = path.basename(filePath, ".js");
  const webpackChunkNames = Array.from(_webpackChunkNames);

  // simple check to see if it's a possible match
  const chunkNameIndex = webpackChunkNames.findIndex(webpackChunkName => {
    return filename.indexOf(webpackChunkName) !== -1;
  });

  // if yes continue to verify match,
  if (chunkNameIndex) {
    const webpackChunkName = webpackChunkNames[chunkNameIndex];
    // now we need pattern maching
    console.log(webpackChunkName, chunkNameIndex);
  }

  return false;
}

module.exports = isFilepathWebpackChunk;
