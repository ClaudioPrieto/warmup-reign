# Warmup project Reign

## Run using Docker Compose

Before we run our container lets install dependecies locally.
For that let's run the following command

```bash
# install backend dependencies

cd backend && npm i

# instal client dependencies

cd ../frontend && npm i
```

Ensure that [Docker is installed](https://docs.docker.com/engine/install) on your work station and run:

```bash
# Build the docker image
$ docker-compose build

# Start the container
$ docker-compose up
```