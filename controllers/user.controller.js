const ErrorHandler = require('../errors/ErrorHandler');
const { passwordService, emailService } = require('../service/');
const User = require('../dataBase/User');
const userUtil = require('../util/user.util');
const { errorsEnumCode, errorsEnumMessage } = require('../errors');
const { O_Auth } = require('../dataBase');
const { DELETE, WELCOME, UPDATE } = require('../configs/email-actions.enum');

module.exports = {
    getUsers: async ( req, res, next ) => {
        try {
            const users = await User.find().lean();
            users.forEach(user => userUtil.userNormalizator(user));

            res.json(users);
        } catch (e) {
            next(e);
        }

    },

    getUserById: ( req, res, next ) => {
        try {
            const user = req.user;

            const utilUser = userUtil.userNormalizator(user);

            res.json(utilUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async ( req, res, next ) => {
        try {
            const newUser = req.body;

            const hashedPassword = await passwordService.hash(newUser.password);

            const user = await User.create({ ...newUser, password: hashedPassword });

            const utilUser = userUtil.userNormalizator(user.toObject());

            await emailService.sendMail(newUser.email, WELCOME, utilUser);

            res.status(201).json(utilUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async ( req, res, next ) => {
        try {
            const token = req.token;
            const user = req.user;
            const _id = user._id;

            const deleted = await User.deleteOne({ _id });
            await O_Auth.deleteOne({ access_token: token });

            if ( !deleted.deletedCount ) {
                throw new ErrorHandler(errorsEnumMessage.WRONG_ID, errorsEnumCode.NOT_FOUND);
            }

            await emailService.sendMail(user.email, DELETE, user);

            res.status(204).json('Deleted done');
        } catch (e) {
            next(e);
        }
    },

    updateUser: async ( req, res, next ) => {
        try {
            const user = req.user;
            const { name } = req.body;
            const { _id } = req.user;

            const newUser = await User.updateOne({ _id }, { $set: { name } });

            if ( !newUser.acknowledged ) {
                throw new ErrorHandler(errorsEnumMessage.WRONG_SOMETHING, errorsEnumCode.NOT_FOUND);
            }

            await emailService.sendMail(user.email, UPDATE, user);

            res.status(201).json('Update done!');
        } catch (e) {
            next(e);
        }
    },

};
