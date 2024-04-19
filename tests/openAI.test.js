const { test } = require('node:test')
const nock = require('nock')
const assert = require('assert')
const getCompletion = require('../lib/openAI')

process.env.OPENAI_API_KEY = 'key'

test('getCompletion', async () => {
  await Promise.all([
    test('should replace placeholders with default values when args are not provided', async () => {
      const openAIKey = 'key'
      const args = {}
      const url = '/fruits'

      nock('https://api.openai.com')
        .post('/v1/chat/completions')
        .reply(200, {
          choices: [{ message: { content: '{\n    "pagination": {\n        "total": 5,\n        "limit": 5,\n        "offset": 0\n    },\n    "fruits": [\n        {\n            "ID": 1,\n            "name": "apple",\n            "color": "red",\n            "size": "medium"\n        },\n        {\n            "ID": 2,\n            "name": "banana",\n            "color": "yellow",\n            "size": "medium"\n        },\n        {\n            "ID": 3,\n            "name": "orange",\n            "color": "orange",\n            "size": "medium"\n        },\n        {\n            "ID": 4,\n            "name": "grape",\n            "color": "purple",\n            "size": "small"\n        },\n        {\n            "ID": 5,\n            "name": "watermelon",\n            "color": "green",\n            "size": "large"\n        }\n    ]\n}' } }]
        })

      const result = await getCompletion(openAIKey, args, url)
      const content = JSON.parse(result)

      assert.equal(content.fruits.length, 5)
      assert.notEqual(content.pagination, null)
      assert.equal(content.pagination.limit, 5)
    }),

    test('should use the model with provided the provided args ', async () => {
      const openAIKey = 'test-key'
      const args = { minimum: 5, maximum: 15, model: 'gpt-4-turbo' }
      const url = '/fruits'

      nock('https://api.openai.com')
        .post('/v1/chat/completions')
        .reply((uri, requestBody) => {
          assert.strictEqual(requestBody.model, 'gpt-4-turbo')
          return [200, { choices: [{ message: { content: 'Test content' } }] }]
        })

      await getCompletion(openAIKey, args, url)
    })
  ])
})
