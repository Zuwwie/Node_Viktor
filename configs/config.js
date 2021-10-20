module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/home',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'xxx',
    JWT_REFRESH_SECRET: process.env.JWT_ACCESS_SECRET || 'zzz',
    JWT_PASSWORD_SECRET: process.env.JWT_PASSWORD_SECRET_SECRET || '1q2w3e',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
};
