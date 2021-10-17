const {jwtService} = require('../service');
const O_Auth = require('../dataBase/O_Auth');

module.exports = {
    login: async (req, res, next) => {
        try {
            const user = req.user;

            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair, user_id: user._id
            });

            res.json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logout: (req,res, next) => {
        try {
            res.json('Logout successfully');
        } catch (e) {
            next(e);
        }
    },

    logoutAllDevices: (req, res, next) => {
        try{
            res.json('Logout All Devices success');
        } catch (e) {
            next(e);
        }
    }
};
