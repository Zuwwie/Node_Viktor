const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const { User, Remember_Base } = require('../dataBase');

dayJs.extend(utc);

module.exports = async () => {

    const lessTime = dayJs.utc().subtract(9, 'day');
    const grateTime = dayJs.utc().subtract(11, 'day');

    const rememberUser = await User.find({
        lastIn: { $lt: lessTime, $gt: grateTime }
    });

    await Remember_Base.insertMany(rememberUser);
};
