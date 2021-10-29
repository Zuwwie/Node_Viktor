const cron = require('node-cron');

const removeOldTokens = require('./old-token-remove.job');
const mailRemember = require('./mail-remember');
const sendMailRemember = require('./send-mail-remember');
const { O_Auth, O_Password } = require('../dataBase');

module.exports = () => {
    cron.schedule('0 0 * * *', () => {
        // cron.schedule('*/10 * * * * *', () => {
        console.log('CRON running a task');
        removeOldTokens(O_Auth, 2);
        removeOldTokens(O_Password, 1);
    });
    cron.schedule('0 2 * * *', () => {
        // cron.schedule('*/30 * * * * *', () => {
        console.log('Cron remember DB include');
        mailRemember();
    });
    cron.schedule('0 0 * * * *', () => {
        // cron.schedule('*/10 * * * * *', () => {
        console.log('Remember mail send');
        sendMailRemember();
    });
};
