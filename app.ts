import express from 'express';
import bodyParser from 'body-parser';
import { cors } from './src/middleware/cors';
import routes from './src/routes';
import { setUpDatabase } from './src/services/database';
import { setUpS3 } from './src/services/s3';

const configure = async () => {
    // Express
    const app = express();

    // Middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors);
    app.use('/', routes);

    // Database
    await setUpDatabase();

    // S3
    await setUpS3();

    // Start
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    });
}

configure();
