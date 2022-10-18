# Hiking Memory Backend
The backend for the Memory Trail web application as a NodeJS server, written in TypeScript. It handle different routes on incoming requests, which can be seen in /src/routes folder. The backend has been deployed on AWS EC2 and will act as a layer between the User and their data and file storage. The diagram below shows how data such as hike and audio recording information as well as files such like uploaded images are given to the user on request. At the backend, all API calls will be validated to ensure that no malicious requests are made.

![image](https://user-images.githubusercontent.com/86467852/196338017-7dca3755-e0ef-4657-8b1b-4c6c86cfc9e7.png)

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
