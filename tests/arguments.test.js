'use strict'

const { test, beforeEach, afterEach } = require('node:test')
const { join } = require('node:path')
const { execSync } = require('node:child_process')
const assert = require('node:assert')
const originalArgv = process.argv

test('arguments.js', async (t) => {
  let argsModule

  beforeEach(() => {
    process.argv = ['node', 'arguments.js']
    delete require.cache[require.resolve('../lib/arguments')]
  })

  afterEach(() => {
    process.argv = originalArgv
  })

  await Promise.all([
    test('should export args values', async () => {
      argsModule = require('../lib/arguments')
      assert.deepEqual(argsModule, { clean: false, model: 'gpt-3.5-turbo', minimum: '1', maximum: '10', port: '3000' })
    }),
    test('should parse arguments correctly', async () => {
      process.argv.push('--clean')
      argsModule = require('../lib/arguments')
      assert.strictEqual(argsModule.clean, true)
    }),
    test('should handle invalid arguments', async () => {
      try {
        execSync(`node ${join(__dirname, '..', 'lib', 'arguments.js')} --invalid`)
      } catch (error) {
        assert.strictEqual(error.status, 1)
        assert.ok(error.stderr.toString().includes('Error: Invalid arguments provided'))
      }
    })
  ])
})
