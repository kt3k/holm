'use strict'

const dispatch = require('cli-dispatch')

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
    action = 'help'
  }

  if (v || version) {
    action = 'version'
  }

  if (!action) {
    action = 'info'
  }

  dispatch(action, arguments[0]).on('no-action', () => {
    console.log(`No such command: ${action}`)
    process.exit(1)
  })
}
