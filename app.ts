import express from 'express';
import bodyParser from 'body-parser';
import { cors } from './src/middleware/cors';
import routes from './src/routes';
import { setUpDatabase } from './src/services/database';
import { setUpS3 } from './src/services/s3';
import { setEmailHeader } from './src/middleware/setEmailHeader';
import { logRequest } from './src/middleware/logRequest';

const configure = async () => {
    // Express
    const app = express();

    // Middlewares
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(logRequest);
    app.use(cors);
    app.use(setEmailHeader);
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
