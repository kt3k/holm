# holm v0.1.0 (SUSPENDED)

> REST API base task processor

Holm is a tool for defining the async background job by the yaml file. Holm assumes that each task is implemented as a REST API endpoint. So you need to implement your tasks as REST APIs to use `holm`.

# Install

    npm install -g holm

# Get started

## Set up Redis

You need redis to run `holm` server.

```
redis-server
```

## Run holm server

The following command starts the `holm` server:

```
holm server
```

This starts the `holm` server at the port `7010`.

## holm.yml

You need to set up `holm.yml` to define your tasks.

It looks like the following:

```yml
host: localhost
port: 7010
job:
  host: localhost
  port: 7070
---
name: dl-problem
method: POST
url: /dl-problem
options:
  delay: 1000
---
name: solve-problem:
method: POST
url: /problems/solve
---
name: visualize-problem
method: POST
url: /problems/visualize
```

## Set up jobs

Then send the jobs to the `holm` server.

## Job server

Then you need to run the job processing server at `localhost:7070`.

`holm` assumes that your task is, for example in the above example, implemented as the REST endpoint `POST /dl-problem` and request to it with the given payloads.

## Loads the actual tasks

Finally you can loads the actual task by the following command:

```
holm load dl-problem '{"id":1}' '{"id":2}' ...
```

where `dl-problem` is the job name. This autocatically starts processing the given payloads with the given job definitions.


# The commands

## holm [info]

Shows the holm server status.

## holm up

Send job definitions.

## holm load

Loads the payloads.

## holm server

Starts the holm (queueu) server.

# License

MIT
