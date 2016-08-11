# holm v0.1.0

> Async job loader and DSL

Holm is a tool for defining the async background job using a git repository and the yaml file in it.

# Install

    npm install holm

# Get started

## holm.yml

First you need to set up `holm.yml` at the top of your git repository. `holm.yml` defines the tasks you want to process in the background.

It looks like the following:

```yml
prepare:
- npm intall
---
download-files:
  job: ./bin/download-file
  options:
    delay: 1000
---
solve-problem:
  job: ./bin/solver
---
visualize-problem:
  job: ./bin/problem-to-svg
```

## Start processing


# The commands
