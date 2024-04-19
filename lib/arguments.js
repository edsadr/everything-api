const { parseArgs } = require('node:util')
const { join } = require('node:path')
const { readFileSync } = require('node:fs')
const { red, bold } = require('colorette')
const help = readFileSync(join(__dirname, '..', 'resources', 'help.txt'), 'utf-8')

const options = {
  clean: {
    type: 'boolean',
    alias: 'c',
    default: false
  },
  model: {
    type: 'string',
    alias: 'm',
    default: 'gpt-3.5-turbo'
  },
  minimum: {
    type: 'string',
    alias: 'min',
    default: '1'
  },
  maximum: {
    type: 'string',
    alias: 'max',
    default: '10'
  },
  port: {
    type: 'string',
    alias: 'p',
    default: '3000'
  }
}

let args
console.log(help)

try {
  args = parseArgs({ args: process.argv.slice(2), options })
} catch (error) {
  console.error(
    bold(
      red('Error: Invalid arguments provided')
    )
  )
  process.exit(1)
}

module.exports = args.values
