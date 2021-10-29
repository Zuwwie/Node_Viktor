const cors = require('cors');
const express = require('express');
const rateLimit = require('express-rate-limit');
const fileUploud = require('express-fileupload');
const helmet = require('helmet');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');

require('dotenv').config();

const startCron = require('./cron');
const { MONGO_CONNECT_URL, PORT, ALLOWED_ORIGIN, NODE_ENV } = require('./configs/config');
const ErrorHandler = require('./errors/ErrorHandler');
const { userRouter, authRouter } = require('./routes');
const { checkDefaultData } = require('./util/');
const swaggerJson = require('./docs/swagger.json');

const app = express();

mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongo start');
});

app.use(helmet());
app.use(cors({ origin: _configureCors }));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

if ( NODE_ENV === 'dev' ) {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(fileUploud({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use('/users', userRouter);
app.use('/auth', authRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', ( error, req, res, next ) => {
    res
        .status(error.status || 500)
        .json({ message: error.message });
});

app.listen(PORT, () => {
    console.log(`Im here = ${PORT}`);
    checkDefaultData();
    startCron();
});

function _configureCors( origin, callback ) {
    const whiteList = ALLOWED_ORIGIN.split(';');
    if ( NODE_ENV === 'dev' ) {
        return callback(null, true);
    }

    if ( !whiteList.includes(origin) ) {
        return callback(new ErrorHandler('CORS is not allowed'), false);
    }
    return callback(null, true);
}
