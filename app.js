const express = require('express');
const mongoose = require('mongoose');

const {MONGO_CONECT_URL, PORT} = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userRouter = require('./routes/user.router');
const authRouter = require('./routes/auth.router');

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Im here = ${PORT}`);
});
