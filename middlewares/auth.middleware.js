const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const authValidator = require('../validators/auth.validator');

module.exports = {
    userAuthMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email}).lean();

            if (!user) {
                throw new Error('Wrong email or password');
            }

            await passwordService.compare(password, user.password);

            req.user = user;
            next();
        } catch (e) {
            res.json(e.message);
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
            res.json(e.message);
        }
    }
};
