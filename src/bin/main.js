'use strict'

const router = require('./router')

const showHelp = () => {
  console.log(require('./help'))
}

module.exports = main

/**
 * @param {string} action The action
 * @param {boolean} h Shows help message if true
 * @param {boolean} help Shows help message if true
 * @param {boolean} v Shows version if true
 * @param {boolean} version Shows version if true
 * @return {number} The exit code
 */
function main ({_: [action], h, help, v, version}) {
  if (h || help) {
    showHelp()
    return
  }

  if (v || version) {
    const pkg = require('../../package')
    console.log(`${pkg.name} v${pkg.version}`)
    return
  }

  if (!action) {
    action = 'info'
  }

  try {
    router(`${__dirname}/actions`, action, arguments[0])
  } catch (e) {
    if (e.code === 'NO_SUCH_ACTION') {
      showHelp()

      return 1
    }

    throw e
  }
}
