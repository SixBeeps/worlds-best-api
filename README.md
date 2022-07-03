# World's Best API, no doubt about it.

## Short Description

This API is intended to serve smiley faces. Requesters must first register an API key, which the server admin enters in `db/keys.txt`. After the key has been approved, the owner of the key may make a request to /api/(key) to mint a token. Once a token has been minted, the owner of the token may make a request to /api/smile/(token) within 30 seconds of getting the token to recieve a smiley face :)

## Technologies Used

The core of this API runs on Next.js with TypeScript, and Yarn to handle packaging.

## Installation

You'll need the latest version of Node as well as the Yarn Package Manager. First, install all the required dependencies:

```sh
yarn install --force
```

Then, start the server:

```sh
yarn dev
```