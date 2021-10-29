module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',
    NODE_ADMIN_PASSWORD: process.env.NODE_ADMIN_PASSWORD || 'Admin1',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/home',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'xxx',
    JWT_REFRESH_SECRET: process.env.JWT_ACCESS_SECRET || 'zzz',
    JWT_PASSWORD_SECRET: process.env.JWT_PASSWORD_SECRET_SECRET || '1q2w3e',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',

    AWS_S3_REGION:process.env.AWS_S3_REGION,
    AWS_S3_NAME:process.env.AWS_S3_NAME,
    AWS_S3_ACCESS_KEY:process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY:process.env.AWS_S3_SECRET_KEY,
};
