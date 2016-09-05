'use strict'

const minirocket = require('minirocket')

/**
 * @param {string} action The action
 * @param {boolean} h Shows help message if true
 * @param {boolean} help Shows help message if true
 * @param {boolean} v Shows version if true
 * @param {boolean} version Shows version if true
 */
module.exports = function ({_: [action], h, help, v, version}) {
  minirocket({
    help: h || help,
    version: v || version,
    info: !action,
    [action]: true
  }, arguments[0]).on('no-action', () => {
    console.log(`No such command: ${action}`)
    process.exit(1)
  })
}
