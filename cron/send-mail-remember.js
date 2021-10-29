const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const { Remember_Base, User } = require('../dataBase');
const { emailService } = require('../service');
const { REMEMBER } = require('../configs/email-actions.enum');

dayJs.extend(utc);

module.exports = async () => {

    const time = dayJs.utc().subtract(9, 'day');

    const sendUsers = await Remember_Base.find();

    sendUsers.map(async ( user ) => {

        const checkUser = await User.findById(user._id);

        if ( checkUser.lastIn < time && time.format('HH') === checkUser.lastIn.getHours().toString() ) {
            await emailService.sendMail(checkUser.email, REMEMBER, checkUser);
        }

        await Remember_Base.deleteOne({ _id: user._id });

    });

};
