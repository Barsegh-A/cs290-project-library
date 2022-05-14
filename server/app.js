const errorHandler = require('./common/middlewares/error-handler.middleware');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

async function bootstrap() {
    console.log(process.env.MONGODB_URL);

    await mongoose.connect(process.env.MONGODB_URL);

    console.log('DB connected successfully.');

    app.listen(3030, () => {
        console.log('Server is running! 🚀');
    })
}

bootstrap().catch(err => console.log(err));


app.use(errorHandler);