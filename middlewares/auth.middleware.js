const {authValidator} = require('../validators/');
const ErrorHandler = require('../errors/ErrorHandler');
const passwordService = require('../service/password.service');
const User = require('../dataBase/User');
const {errorsEnumCode, errorsEnumMessage} = require('../errors');


module.exports = {
    userAuthMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email}).lean();

            if (!user) {
                throw new ErrorHandler(errorsEnumMessage.WRONG_EMAIL_OR_PASSWORD, errorsEnumCode.BAD_REQUEST);
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
                throw new ErrorHandler(errorsEnumMessage.WRONG_EMAIL_OR_PASSWORD, errorsEnumCode.NOT_FOUND);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
};
