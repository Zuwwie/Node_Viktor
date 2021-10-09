const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const authValidator = require('../validators/auth.validator');

module.exports = {
    userAuthMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.user;

            const user = await User.findOne({
                email,
            }).lean();

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

            const userValid = authValidator.authValidator.validate(user);

            res.user = userValid;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
