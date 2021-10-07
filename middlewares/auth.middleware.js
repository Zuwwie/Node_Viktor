const User = require('../dataBase/User');

module.exports = {
    userAuthMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({
                email,
                password,
            });

            if (!user) {
                throw new Error('Some wrong!');
            }

            next();
        } catch (e) {

            res.json(e.message);
        }
    }
};
