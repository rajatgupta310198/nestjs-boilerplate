# NestJS - API Boilerplate with MongoDb


Nest JS API boilerplate with Redis and MongoDb configured

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them
* Install docker

That's it. 


### Installing

There are three different Docker & docker-compose files. So don't worry about operating system on which you are developing.

In order to run locally, follow below steps:


```
cp .example.env .development.env
docker-compose -f docker-compose-dev.yaml up
```

That's it. API service is up and running at port 3000



## Built With

* [Nestjs](https://nestjs.com/) - The web framework Nestjs
* [Docker](https://www.docker.com/) - Enterprise container platform
* [TypeScript](https://www.typescriptlang.org/) - Written in Typescript

## Authors

* **Rajat Gupta** - *Initial work* - [Rajat Gupta](https://github.com/rajatgupta310198)

