# Imagine

![demo](demo/homepage.png)

Imagine is an AI image generation application using DALL-E 2 API allows users to generate beautiful and surprising images based on specified prompt.

## Features

- [x] Generate image base on prompt
- [x] Generate image variant
- [x] Share generated images with others
- [x] Image tags
- [x] Image search
- [x] Download your favorite images

## Setup development

**Note**: The Go server currently has some bugs in generating image variant due to the package `go-openai`, I will fix it ASAP

### Setup environment variables

For the environment variables required, see `env.sample`

### Run the server

For Node.js server:

```bash
cd server && npm start
```

For Go server:

```bash
cd go-server
go mod tidy
go run main.go
```

### Run the client

```bash
cd client && npm run dev
```
