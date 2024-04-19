# The Everything API

This is an API that is able to return almost any GET REST endpoint you want. Just provide the URL and the API will return the AI generated JSON for you inferring the content from the URL, it uses OpenAI completion API with GPT-3.5-Turbo by default to generate the JSON so it requires an OpenAI API key.

Once an endpoint is consumed, the data is stored in a cache that does not expire. This way, the API can return the same data without having to generate the original endpoint again.

## Use it from NPM

```bash
$ OPENAI_API_KEY="..." npx everything-api
```

After launching the API, you can consume it at `http://localhost:3000` and then access the URL you want to generate the JSON for at that server

```bash
$ curl http://localhost:3000/cities/colombia
```

## Install it locally

```bash
$ pnpm install -g everything-api
```

## Options available

- `port`: The port where the API will be available. Default is 3000
- `model`: The OpenAI model to use. Default is `gpt-3.5-turbo`
- `minimum`: The minimum number of items to return. Default is 1
- `maximum`: The maximum number of items to return. Default is 10
- `clean`: The cache will be cleaned before starting the API

## Development

This project uses pnpm for managing dependencies and running scripts. Here are some of the main scripts in the `package.json`:

- `pnpm start`: Launch the API server
- `pnpm test`: Run the tests
- `pnpm run dev`: Run the API server in development mode with `node --watch` loading the OpenAI API key from a `.env` file
- `pnpm run lint`: Lint the code
- `pnpm run lint-fix`: Format the code
- `pnpm run generate-help`: Build the help using as input the `resources/help.md` file

## License

MIT License

Copyright (c) 2024 Adrian Estrada

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
