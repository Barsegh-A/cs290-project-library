const errorHandler = require('./common/middlewares/error-handler.middleware');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./controllers/users.controller')
const bookRouter = require('./controllers/books.controller')
dotenv.config();

const app = express();

app.use(express.json());

app.use(userRouter);

app.use('/books', bookRouter);

async function bootstrap() {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log('DB connected successfully.');

    app.listen(3030, () => {
        console.log('Server is running! 🚀');
    })
}

bootstrap().catch(err => console.log(err));


app.use(errorHandler);