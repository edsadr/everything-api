# The Everything API

This is an API that is able to return almost any GET REST endpoint you want. Just provide the URL and the API will return the AI generated JSON for you inferring the content from the URL, it uses OpenAI completion API with GPT-3.5-Turbo by default to generate the JSON so it requires an OpenAI API key.

Once an endpoint is consumed, the data is stored in a cache that does not expire. This way, the API can return the same data without having to generate the original endpoint again.

## Usage

```bash
$ OPENAI_API_KEY="..." everything-api
```

After launching the API, you can consume it at `http://localhost:3000` and then access the URL you want to generate the JSON for at that server

```bash
$ curl http://localhost:3000/cities/colombia
```

## Options available

**--port**: The port where the API will be available. Default is 3000
**--model**: The OpenAI model to use. Default is `gpt-3.5-turbo`
**--minimum**: The minimum number of items to return. Default is 1
**--maximum**: The maximum number of items to return. Default is 10
**--clean**: The cache will be cleaned before starting the API




