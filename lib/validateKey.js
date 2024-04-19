const { red, bold } = require('colorette')

const openAIKey = process.env.OPENAI_API_KEY
if (!openAIKey) {
  console.error(
    red(
      bold('Please provide an OpenAI API key using the OPENAI_API_KEY environment variable')
    )
  )
  process.exit(1)
}

module.exports = openAIKey
