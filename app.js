const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');

require('dotenv').config();

const {MONGO_CONNECT_URL, PORT} = require('./configs/config');
const {userRouter, authRouter} = require('./routes');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth', authRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (error, req, res, next) => {
    res
        .status(error.status || 500)
        .json({message: error.message});
});

app.listen(PORT, () => {
    console.log(`Im here = ${PORT}`);
});

const {tokenController} = require('./controllers/');
cron.schedule('* * * */2 * *', () => {
    console.log('running a task');
    tokenController.tokenDell();

});

