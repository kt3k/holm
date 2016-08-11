module.exports = `

Usage: holm [--version] [--help] <command> [<param>...]

Usage:
  holm --help       Shows the help message
  holm --version    Shows the version
  holm              Checks 'holm.yml' and shows the info
  holm info         Checks 'holm.yml' and shows the info
  holm up           Uploads the current git repo to holm server and set up jobs
  holm load [-s <num>] <jobname> <payload>...
                    Loads the payloads to the holm server
  holm server       Starts the holm server

`.trim()
