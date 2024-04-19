'use strict'

const { writeFileSync, readFileSync } = require('node:fs')
const { join } = require('node:path')
const { marked } = require('marked')
const { markedTerminal } = require('marked-terminal')

function processAssets () {
  // Processing the help
  const helpContent = readFileSync(join(__dirname, 'help.md'), 'utf-8')
  marked.use(markedTerminal())
  writeFileSync(join(__dirname, 'help.txt'), marked.parse(helpContent))
}

processAssets()
