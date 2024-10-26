<p align="center">
  <a href="http://yourapp.com/" target="blank"><img src="https://yourapp.com/logo.svg" width="200" alt="Your App Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/yourusername/yourapp/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/yourusername/yourapp

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~yourapp" target="_blank"><img src="https://img.shields.io/npm/v/yourapp.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~yourapp" target="_blank"><img src="https://img.shields.io/npm/l/yourapp.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~yourapp" target="_blank"><img src="https://img.shields.io/npm/dm/yourapp.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/yourusername/yourapp" target="_blank"><img src="https://img.shields.io/circleci/build/github/yourusername/yourapp/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/yourusername/yourapp?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/yourusername/yourapp/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/yourdiscord" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/yourapp#backer" target="_blank"><img src="https://opencollective.com/yourapp/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/yourapp#sponsor" target="_blank"><img src="https://opencollective.com/yourapp/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/yourusername" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/yourapp#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/yourapp" target="_blank"><img src="https://img.shields.io/twitter/follow/yourapp.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/yourapp/backers/badge.svg)](https://opencollective.com/yourapp#backer)
  [![Sponsors on Open Collective](https://opencollective.com/yourapp/sponsors/badge.svg)](https://opencollective.com/yourapp#sponsor)-->

# Combination Generation Service 


## Prerequisites

Before running this application, you need to have one of the following setups:

1. MySQL and NestJS:
   - [MySQL](https://dev.mysql.com/downloads/mysql/)
   - [Node.js](https://nodejs.org/) (version 20 or later)
   - [NestJS CLI](https://docs.nestjs.com/cli/overview) (`npm i -g @nestjs/cli`)

2. Docker with Docker Compose:
   - [Docker](https://docs.docker.com/get-docker/)
   - [Docker Compose](https://docs.docker.com/compose/install/)

Choose the setup that best fits your development environment and system requirements.


## Installation

```bash
$ npm install
```
## Environment Variables

Create a `.env` file in the root of your project with the following example content:

```
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=your_database_name
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
PORT=3000
```

## Running the app

### Development

```bash
$ npm run start
```

### Watch Mode

```bash
$ npm run start:dev
```

### Running with Docker Compose

To run the application using Docker Compose, use the following command:

```bash
$ docker-compose up
```

### Cleanup

To stop and remove all containers, images, volumes, and orphaned containers, run:

```bash
$ docker-compose down --rmi all --volumes --remove-orphans
```


## License

Your App is [MIT licensed](LICENSE).
