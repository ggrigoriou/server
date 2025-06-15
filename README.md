# EducationalApp Server

This is the backend for the EducationalApp project. It is built with Node.js, Express, and MongoDB, and provides the API that powers the frontend Angular application.

## Installation

Before running the server, install the dependencies with:

`npm i`

## Start the server

Run `npm start` to start the server.

## Project structure

- `src/controllers`: Express controllers
- `src/models`: Mongoose schemas and models
- `src/routes`: API route handlers
- `src/services`: Logic for adaptive tests and tracking
- `src/scripts/seed.js`: Seeding script
- `src/server.js`: App entry point

## API Endpoints (example)

- `POST /api/auth/login`: User login
- `GET /api/units`: Fetch learning units
- `POST /api/test/start`: Begin a test
- `POST /api/test/submit`: Submit answers
- `POST /api/progress/navigation`: Log navigation
- `POST /api/progress/answers`: Record answer data


## Further help

For Express guidance, see [Express Docs](https://expressjs.com).  
For MongoDB usage, see [MongoDB Docs](https://www.mongodb.com/docs).  
For working with Mongoose, visit [Mongoose Docs](https://mongoosejs.com).
