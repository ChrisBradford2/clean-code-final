# Installation

- Clone the repository and go to the main directory
- Run `docker compose up -d` to start the server

You'll have access to the frontend at `http://localhost:80` and the backend at `http://localhost:8080`

# Tests

- run `docker exec express npm test` to execute the tests
- run `docker exec express npm coverage` to get a coverage report