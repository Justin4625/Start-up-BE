import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/userRouter.js";
import classroomRouter from "./routes/classroomRouter.js";
import sortingGameRouter from "./routes/sortingGameRouter.js";
import avatarRouter from "./routes/avatarRouter.js";
import petRouter from "./routes/PetRoutes.js";

dotenv.config();

const app = express();

try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
}

mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established');
});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

app.use((req, res, next) => {
    const acceptHeader = req.headers['accept'] || '';
    if (acceptHeader.includes('application/json') || req.method === 'OPTIONS') {
        next();
    } else {
        res.status(406).send('This webservice only accepts JSON');
    }
});

app.use('/sortingGame', sortingGameRouter)
app.use('/avatar', avatarRouter)
app.use('/pet', petRouter)
app.use('/user', userRouter);
app.use('/classroom', classroomRouter);

const port = process.env.EXPRESS_PORT || 8000;

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`);
});

app.get('/test', (req, res) => {
    res.json({ message: 'Server is online' });
});

