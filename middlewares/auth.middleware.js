const authValidator = require('../validators/auth.validator');
const ErrorHandler = require("../errors/ErrorHandler");
const passwordService = require('../service/password.service');
const User = require('../dataBase/User');

module.exports = {
    userAuthMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email}).lean();

            if (!user) {
                throw new ErrorHandler('Wrong email or password', 404);
            }

            await passwordService.compare(password, user.password);

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    userAuthValidMiddleware: (req, res, next) => {
        try {
            const user = req.body;

            const {error, value} = authValidator.authValidator.validate(user);

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
