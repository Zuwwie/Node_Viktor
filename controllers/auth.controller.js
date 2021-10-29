const { jwtService } = require('../service');
const O_Auth = require('../dataBase/O_Auth');
const { emailService, passwordService } = require('../service/');
const { LOGIN, LOGOUT, CHANGE_PASSWORD } = require('../configs/email-actions.enum');
const { O_Password } = require('../dataBase');
const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');
const { errorsEnumMessage, errorsEnumCode } = require('../errors');
const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

module.exports = {
    login: async ( req, res, next ) => {
        try {
            const user = req.user;
            const { _id } = req.user;

            if ( !req.token ) {
                await emailService.sendMail(user.email, LOGIN, user);
            }
            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair, user_id: user._id
            });
            const data = dayJs.utc().format();

            await User.updateOne({ _id }, { lastIn: data });

            res.json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    // refresh: async ( req, res, next ) => {
    //     try {
    //         const user = req.user;
    //
    //         const tokenPair = jwtService.generateTokenPair();
    //
    //         await O_Auth.create({
    //             ...tokenPair, user_id: user._id
    //         });
    //
    //         res.json({
    //             user,
    //             ...tokenPair
    //         });
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    logout: async ( req, res, next ) => {
        try {
            const user = req.user;
            const token = req.token;

            await O_Auth.deleteOne({ access_token: token });

            await emailService.sendMail(user.email, LOGOUT, user);

            res.json('Logout successfully');
        } catch (e) {
            next(e);
        }
    },

    logoutAllDevices: async ( req, res, next ) => {
        try {
            const userSingIn = req.user;

            await O_Auth.deleteMany({ user_id: userSingIn._id });

            res.json('Logout All Devices success');
        } catch (e) {
            next(e);
        }
    },

    changePasswordSendMail: async ( req, res, next ) => {
        try {
            const user = req.user;

            const password_token = jwtService.generatePasswordToken();

            await O_Password.create({
                password_token,
                user_id: user._id
            });
            user.token = password_token;

            await emailService.sendMail(user.email, CHANGE_PASSWORD, user);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    changeUserPassword: async ( req, res, next ) => {
        try {
            const user = req.user;
            const { _id } = user;
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            const updateUser = await User.updateOne({ _id }, { $set: { password: hashedPassword } });

            if ( !updateUser.acknowledged ) {
                throw new ErrorHandler(errorsEnumMessage.WRONG_SOMETHING, errorsEnumCode.NOT_FOUND);
            }

            await O_Auth.deleteMany({ user_id: _id });

            await O_Password.deleteMany({ user_id: _id }); // many бо користувач може нарегенити дофіга

            res.json('Pass update success');
        } catch (e) {
            next(e);
        }
    },
};
