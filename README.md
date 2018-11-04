# Push Data to Frontends
Simple example that shows how to develop a SSE API that pushes data to clients. It also includes a configuration of NGINX that proxys the backend with HTTP2, so that the client benefits from multiplexing and not hit the 6 max connections limit of browsers.

## Setup
- Install Docker

## Usage
Start server and NGINX containers:

    docker-compose up

Open https://localhost:8443/ in your browser and ignore the SSL error.