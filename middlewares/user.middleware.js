const User = require('../dataBase/User');
const {userValidator} = require('../validators/');

module.exports = {
    userEmailSearch: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new Error('Email already exist');
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    userIdSearchMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const userById = await User.findById(user_id).lean();

            if (!userById) {
                throw new Error('Id not found');
            }

            req.user = userById;
            next();
        } catch (e) {
            next(e);
        }
    },

    userIdValidationMiddleware: (req, res, next) => {
        try {
            const {user_id} = req.params;

            const {error, value} = userValidator.isUserIdValid.validate({_id: user_id});

            if (error) {
                throw new Error('Wrong id validation!' + error.details[0].message);
            }

            req.params.user_id = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const user = req.body;

            const {error, value} = userValidator.createUserValidator.validate(user);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserUpdateValid: (req, res, next) => {
        try {
            const user = req.body;

            const {error, value} = userValidator.updateUserValidator.validate(user);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};
