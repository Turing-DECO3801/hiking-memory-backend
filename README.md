# Hiking Memory Backend
The backend for the Memory Trail app. It handle different routes on incoming requests, which can be seen in /src/routes folder

## Side Effects
It interacts with the MySQL database and S3 Bucket which are both hosted on the cloud. For testing purposes, a .env.development file can be added at root level which specifies DB_HOST and S3_BUCKET_NAME to point these interactions to a testing environment.

## Debugging
Incoming requests will be logged out on the console

## Scripts

### `npm i`

Installs all dependencies that the application requires 

### `npm start`

Runs the app in the development mode. This will handle incoming REST API requests

### `npm test`

Launches the test runner
