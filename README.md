# sandbox-chrome-ext

## Getting Started

### Project setup

Use the same node version:

```sh
nvm use
```

Install exact dependencies' versions:

```sh
npm ci
```

### Environment variables

Rename `.env.local.example` file to `.env.<YOUR_LOCAL_ENVIRONMENT>.local`, fill in the values.

```sh
mv .env.[mode].local.example .env.<YOUR_LOCAL_ENVIRONMENT>.local.example
```

### Development

```sh
npm run dev
```

### Build

Run build for your local environment, e.g:

```sh
npm run compose-build:production
```
