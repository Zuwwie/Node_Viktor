const User = require('../dataBase/User');
const userValidator = require('../validators/user.validator');

module.exports = {
    userEmailSearch: async (req, res, next) => {
        try {
            const {email, name} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail && !name) {
                throw new Error('Email already exist');
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            res.json(e.message);
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
            res.json(e.message);
        }
    },
    userIdValidationMiddleware: (req, res, next) => {
        try {
            const {user_id} = req.params;

            if (user_id.length !== 24) {
                throw new Error('Wrong id validation!');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    isUserBodyValid: (req, res, next) => {
        try {
            const user = req.body;

            const {err, value} = userValidator.createUserValidator.validate(user);

            if (err) {
                throw new Error(err.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
