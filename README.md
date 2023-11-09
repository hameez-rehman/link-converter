## Description

Link Converter API which converts weblink to deeplinks and vice versa

## Installation

```bash
$ npm ci
```

## Running the db instance
```bash
$ docker compose up washmen-db -d
```


## Running the app
copy sample.env to .env

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the production app using docker

```bash
$ docker compose up -d
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Project Description
Project has 2 implementations related to conversion API.

1. Using a simple parser class and schema. It analyses and parses the schema and them uses that to generate deep and web links
2. Using a parser factory and parser class. It uses factory and inversion control to parse links based on their url.

## Prefered Implementation
I prefer 1st implementation as it doesnot require coding each and every link parsing. You just need to provide schema from any data source and it will parse and generate link