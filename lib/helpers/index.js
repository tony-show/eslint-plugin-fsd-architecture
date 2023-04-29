const { layers } = require('../consts/global')

function isPathRelative(path) {
  return path === '.' || path.startsWith('./') || path.startsWith('../')
}

function isOneLayer(path_1, path_2) {
  return layers.some(layer => ~path_1.indexOf(layer) && ~path_2.indexOf(layer))
}

function cutRelative(path) {
  return path.replace(/(\.{1,2}\/)/g, '')
}

module.exports = {
  isPathRelative,
  isOneLayer,
  cutRelative,
}
