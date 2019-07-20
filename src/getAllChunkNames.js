function getAllChunkNames({ webpackStats }) {
  const entryPoints = webpackStats.entrypoints
  const chunks = []

  for (let entryPoint in entryPoints) {
    chunks.push(...entryPoints[entryPoint].chunks)
  }

  return new Set(chunks)
}

module.exports = getAllChunkNames
