const User = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        const email = req.body.email;

        try {
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new Error('Email already exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
