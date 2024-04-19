const fs = require('node:fs')
const { join } = require('node:path')

let prompt

async function getCompletion (openAIKey, args, url) {
  // Import the OpenAI API and create a new instance
  const { OpenAI } = require('openai')
  const openai = new OpenAI(openAIKey)

  // Read the prompt and replace the placeholders with the args values
  if (!prompt) {
    prompt = fs.readFileSync(join(__dirname, '..', 'resources', 'rest.md'), 'utf8')
      .replace('{{minimum}}', parseInt(args.minimum, 10) || 1)
      .replace('{{maximum}}', parseInt(args.maximum, 10) || 10)
  }
  // Generate a response using the OpenAI API
  const apiResponse = await openai.chat.completions.create({
    messages: [{ role: 'system', content: prompt.replace('{{input}}', url) }],
    model: args.model
  })

  const messageText = apiResponse?.choices[0]?.message?.content

  return messageText
}

module.exports = getCompletion
