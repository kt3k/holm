
const path = require('path')
const fs = require('fs')

module.exports = router

/**
 */
function router(base, action, argv) {
  const actionPath = path.join(base, action)
  let actionFunc

  try {
    actionFunc = require(actionPath)
  } catch (e) {
    const err = new Error(`No such action: ${action}`)
    err.code = 'NO_SUCH_ACTION'

    throw err
  }

  actionFunc(argv)
}
