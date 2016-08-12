module.exports = `

Usage: holm [--version] [--help] <command> [<param>...]

Usage:
  holm --help       Shows the help message
  holm --version    Shows the version
  holm [info]       Checks 'holm.yml' and shows the current info
  holm up           Uploads the current settings to the holm server
  holm load <jobname> <payload>...
                    Loads the payloads to the holm server
  holm server       Starts the holm server

`.trim()
