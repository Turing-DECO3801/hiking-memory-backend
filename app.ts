import express from 'express';
import bodyParser from 'body-parser';
import { cors } from './src/middleware/cors';
import routes from './src/routes';

// Express
const app = express ();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors)
app.use('/', routes);

// Database


// Start
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
