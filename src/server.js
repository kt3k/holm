const {Server} = require('hapi')
const Queue = require('bee-queue')

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
    path: '/repos/:repo/jobs/:job/payloads',
    handler: (request, reply) => {
      let payloads = request.payload

      if (!Array.isArray(payloads)) {
        payloads = [payloads]
      }

      const repo = request.param.repo
      const job = request.param.job

      const queueName = `${repo}/${job}`
      const queue = queueMap[queueName]

      if (!queue) {
        return replay({code: 'NO_SUCH_JOB'})
      }

      payloads.forEach(payload => queue.createJob(payload).save())

      reply({ok: true})
    }
  })

  server.route({
    method: 'POST',
    path: '/repos/:repo/jobs',
    handler: (request, reply) => {
      const job = request.payload

      const queueName = `${request.param.repo}/${job.name}`
      const queue = new Queue(queueName)
      queueMap[queueName] = queue

      const workdir = `${process.cwd()}/${request.param.repo}`

      queue.process((payload, done) => {
        const child = spawn(job.cmd, payload, {cwd: workdir})

        // call done when child finished
      })
    }
  })

  server.route({
    method: 'POST',
    path: '/repos',
    handler: (request, reply) => {
      const repo = request.payload

      // TODO: Setting up the repo under `${process.cwd()}/repos/${repo.name}`
      // does git clone repo.url
      // does cd repo.name
      // does git checkout repo.commit
      // does npm install
    }
  })

  server.start(err => {
    if (err) {
      throw err
    }

    console.log('Server running at:', server.info.uri);
  })
}

module.exports = main
