'use strict'

const { test, beforeEach } = require('node:test')
const { join } = require('node:path')
const { execSync } = require('node:child_process')
const assert = require('node:assert')

test('validateKey.js', async () => {
  let validateKeyModule

  beforeEach(() => {
    delete process.env.OPENAI_API_KEY
    delete require.cache[require.resolve('../lib/validateKey')]
  })

  await Promise.all([
    test('should export key value', async () => {
      process.env.OPENAI_API_KEY = 'key'
      validateKeyModule = require('../lib/validateKey')
      assert.equal(validateKeyModule, 'key')
    }),
    test('should exit on key absence', async () => {
      try {
        execSync(`node ${join(__dirname, '..', 'lib', 'validateKey.js')}`)
      } catch (error) {
        // assert.strictEqual(error.status, 1)
        const message = error.stderr.toString()
        assert.ok(message.includes('Please provide an OpenAI API key using the OPENAI_API_KEY environment variable'))
      }
    })
  ])
})
