'use strict'

const { test } = require('node:test')
const assert = require('node:assert')
const getCompletion = require('../lib/openAI')
const getCompletionStub = async () => {
  return '{\n    "pagination": {\n        "total": 5,\n        "limit": 5,\n        "offset": 0\n    },\n    "fruits": [\n        {\n            "ID": 1,\n            "name": "apple",\n            "color": "red",\n            "size": "medium"\n        },\n        {\n            "ID": 2,\n            "name": "banana",\n            "color": "yellow",\n            "size": "medium"\n        },\n        {\n            "ID": 3,\n            "name": "orange",\n            "color": "orange",\n            "size": "medium"\n        },\n        {\n            "ID": 4,\n            "name": "grape",\n            "color": "purple",\n            "size": "small"\n        },\n        {\n            "ID": 5,\n            "name": "watermelon",\n            "color": "green",\n            "size": "large"\n        }\n    ]\n}'
}

test('app.js', async () => {
  const appModule = require('../lib/app')
  const app = appModule({ minimum: 1, maximum: 10 }, {
    get: (url) => { if (url === '/cars') return { pagination: { limit: 1 }, cars: {} } },
    set: () => {}
  }, 'key', getCompletion)

  await Promise.all([
    test('should build a Fastify server', async () => {
      assert.ok(app)
    }),
    test('should respond in the root route', async () => {
      const response = await app.inject({ method: 'GET', url: '/' })
      assert.equal(response.statusCode, 200)
      assert.equal(response.json().message, 'Welcome to the Everything API')
    }),
    test('should respond an error at the Everything route without key', async () => {
      const response = await app.inject({ method: 'GET', url: '/fruits' })
      assert.equal(response.statusCode, 500)
      assert.equal(response.json().message.includes('The OPENAI_API_KEY environment variable is missing'), true)
    }),
    test('should respond from the cache at the Everything route', async () => {
      const response = await app.inject({ method: 'GET', url: '/cars' })
      assert.equal(response.statusCode, 200)
      assert.equal(response.json().response.pagination.limit, 1)
    }),
    test('should respond a valid output at the Everything route', async () => {
      const appStub = appModule({ minimum: 1, maximum: 10 }, { get: () => {}, set: () => {} }, 'key', getCompletionStub)
      const response = await appStub.inject({ method: 'GET', url: '/fruits' })
      assert.equal(response.statusCode, 200)
      assert.equal(response.json().response.pagination.total, 5)
    }),
    test('should response with an error at the Everything route', async () => {
      const appStub = appModule({ minimum: 1, maximum: 10 }, { get: () => {}, set: () => {} }, 'key', () => { return null })
      const response = await appStub.inject({ method: 'GET', url: '/fruits' })
      assert.equal(response.statusCode, 500)
    })
  ])
})
