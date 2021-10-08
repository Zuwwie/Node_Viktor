const User = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new Error('Email already exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    userIdSearchMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const userById = await User.findById(user_id);

            if (!userById) {
                throw new Error('Id not found');
            }

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
    }
};
