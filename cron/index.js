const cron = require('node-cron');

const removeOldTokens = require('./old-token-remove.job');
const { O_Auth, O_Password } = require('../dataBase');

module.exports = () => {
    cron.schedule('0 0 * * *', () => {
        //     cron.schedule('*/10 * * * * *', () => {
        console.log('CRON running a task');
        removeOldTokens(O_Auth, 2).then(); // не дає запушити без then
        removeOldTokens(O_Password, 1).then();
    });
};
