const errorHandler = require('./common/middlewares/error-handler.middleware');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const dbURI = "mongodb+srv://admin:library-cs290@cs290-project.4wmcs.mongodb.net/library?retryWrites=true&w=majority";

async function bootstrap() {
    await mongoose.connect(dbURI);
    console.log('DB connected successfully.');
    app.listen(3000, () => {
        console.log('Server is running! 🚀');
    })
}

bootstrap().catch(err => console.log(err));


app.use(errorHandler);