const {Server} = require('hapi')
const Queue = require('bee-queue')
const axios = require('axios')

const queueMap = {}

/**
 * The server entry point.
 * @param {number} port The port number
 */
const main = port => {

  const server = new Server()

  server.connection({port})

  server.route({
    method: 'POST',
    path: '/jobs/{name}/payloads',
    handler: (request, reply) => {
      let payloads = request.payload

      if (!Array.isArray(payloads)) {
        payloads = [payloads]
      }

      const name = request.params.name
      const queue = queueMap[name]

      if (!queue) {
        return reply({code: 'NO_SUCH_JOB'})
      }

      payloads.forEach(payload => queue.createJob(payload).save())

      reply({ok: true})
    }
  })

  server.route({
    method: 'POST',
    path: '/jobs/{name}',
    handler: (request, reply) => {
      const job = request.payload

      const name = request.params.name

      if (queueMap[name]) {
        return reply({
          code: 'JOB_NAME_UNAVALABLE',
          description: `There is already an job with the same name: ${name}.`
        })
      }

      if (job == null) {
        return reply({
          code: 'INVALID_JOB',
          description: 'A job should be an object. null is given.'
        })
      }

      if (!/GET|POST|PUT|DELETE|HEAD/.test(job.method)) {
        return reply({
          code: 'INVALID_JOB',
          description: `The job method is invalid: ${job.method}`
        })
      }

      const method = job.method
      const url = job.url

      const queue = queueMap[name] = new Queue(name)

      console.log('Creating job: ' + name)

      queue.process((job, done) => {
        const data = job.data
        console.log(`processing ${name} ${data}`)
        axios({method, url, data})
        .then(data => done(url, data))
        .catch(err => {console.log(err.stack); done(err)})
      })

      reply({
        ok: true,
        description: `A job is created. The name is '${name}'.`,
        job: {name, method, url}
      })
    }
  })

  server.start(err => {
    if (err) {
      throw err
    }

    console.log('Server running at:', server.info.uri)
  })
}

module.exports = main
