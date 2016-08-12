const server = require('../../server')

/**
 * @param {number} [port=7017] The port
 */
module.exports = ({port = 7017}) => {
  server(port)
}
