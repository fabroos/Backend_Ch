import yargs from 'yargs'

export const { port, mode } = yargs(process.argv)
  .options({
    port: {
      alias: 'p',
      default: 3000,
      describe: 'Port to run the server on'
    },
    mode: {
      alias: 'm',
      default: 'fork',
      describe: 'Mode to run the server in'
    }
  })
  .usage('Usage: $0 [options]')
  .parse()
