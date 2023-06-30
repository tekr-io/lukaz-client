# Lukaz Client

## Introduction

This documentation provides information on how to use the client library for accessing an API in TypeScript. The library is designed to simplify the process of making requests to the API and handling responses, allowing developers to focus on implementing their business logic.

In this documentation, you will find information on how to install and set up the API client library, as well as examples of how to use it to make requests to the API. The documentation also provides information on the available configuration options and error handling mechanisms.

We recommend that you have a basic understanding of TypeScript and HTTP requests before using this library. If you have any questions or issues while using the library, please refer to the documentation or reach out to our support team for assistance.

## Instalation

The API client library can be installed using npm or yarn. Choose the package manager of your preference and run the following command in your terminal:

```sh
npm install @lukaz/client
```

or

```sh
yarn add @lukaz/client
```

This will install the API client library and its dependencies into your project's node_modules directory. Once the library is installed, you can import it into your TypeScript project and start using it to make requests to the API.

```typescript
import client from '@lukaz/client';
const lukaz = new client('<API_KEY>');

async function main() {
  const data = await lukaz.prompt('<BOARD_ID>', {
    prompt: 'What is this board about?',
    translateResult: false,
  });
  return data;
}
```

To use the client in development mode just need to add `'dev'` on the second parameter

```typescript
import client from '@lukaz/client';
const lukaz = new client('<API_KEY>', 'dev');
```

### API reference

You can find all the documentation of the api here: https://docs.lukaz.ai
