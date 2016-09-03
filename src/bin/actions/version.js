module.exports = () => {
  const pkg = require('../../../package')
  console.log(`${pkg.name} v${pkg.version}`)
}
