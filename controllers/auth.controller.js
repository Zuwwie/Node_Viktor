const User = require('../dataBase/User');
module.exports = {
    adminLogin: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({
                email,
                password,
            });

            if (!user) {
                throw new Error('Some wrong!');
            }

            res.json(`Hi, ${user.name}`);
        } catch (e) {
            res.json(e.message);
        }
    }
};
