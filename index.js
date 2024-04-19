#!/usr/bin/env node
'use strict'
const { join } = require('node:path')

// Validate and import the OpenAI API key
const openAIKey = require('./lib/validateKey')

// Parse the command line arguments
const args = require('./lib/arguments')

// Creating a cache instance
const { Cache } = require('file-system-cache')
const routeCache = new Cache({
  basePath: join(__dirname, '.cache'),
  hash: 'sha1',
  ttl: 0
})

if (args.clean) {
  console.log('Cleaning the cache')
  routeCache.clear()
}

// Build the Fastify server
const getCompletion = require('./lib/openAI')
const buildFastify = require('./lib/app')
const app = buildFastify(args, routeCache, openAIKey, getCompletion)

// Start the server
const start = async () => {
  try {
    const port = parseInt(args.port, 10) || 3000
    await app.listen({ port, host: '0.0.0.0' })
    console.log(`Server is running on http://0.0.0.0:${port}`)
  } catch (err) {
    console.error('Error starting server:', err)
    process.exit(1)
  }
}

start()
