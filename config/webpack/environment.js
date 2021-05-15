const { environment } = require('@rails/webpacker')
const jquery = require('./plugins/jquery')

environment.plugins.prepend('jquery', jquery)
module.exports = environment

const nodeModulesLoader = environment.loaders.get('nodeModules')

if (!Array.isArray(nodeModulesLoader.exclude)) {
  nodeModulesLoader.exclude = (nodeModulesLoader.exclude == null) ? [] : [nodeModulesLoader.exclude]
}
nodeModulesLoader.exclude.push(/react-table/)