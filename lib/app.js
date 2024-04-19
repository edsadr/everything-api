const fastify = require('fastify')

function createDefaultRoute (app) {
  // Define a root route
  app.get('/', async (req, reply) => {
    return { message: 'Welcome to the Everything API' }
  })
}

function createEverythingRoute (app, args, routeCache, openAIKey, getCompletion) {
  // Define the Everything route
  app.get('*', async (req, reply) => {
    // Check if the response is cached
    const cachedResponse = await routeCache.get(req.url)
    if (cachedResponse) {
      return { response: cachedResponse }
    }

    // Get the completion from OpenAI
    const messageText = await getCompletion(openAIKey, args, req.url)

    if (!messageText) {
      throw new Error('No API response was provided')
    }

    // Extracting the JSON part from the string wrapped in backticks
    const jsonPart = messageText.includes('```json') ? messageText.split('```json')[1].split('```')[0].trim() : messageText
    const response = JSON.parse(jsonPart)
    req.log.info(response)

    // caching the response
    routeCache.set(req.url, response)

    return { response }
  })
}

function buildFastify (args, routeCache, openAIKey, getCompletion) {
  // Create a new Fastify instance
  const app = fastify({
    logger: { transport: { target: 'pino-pretty' } }
  })
  app.log.info(args)

  createDefaultRoute(app)
  createEverythingRoute(app, args, routeCache, openAIKey, getCompletion)

  return app
}

module.exports = buildFastify
