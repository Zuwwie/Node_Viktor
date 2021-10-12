const ErrorHandler = require("../errors/ErrorHandler");

module.exports = {
    login: (req, res) => {
        try {
            const user = req.user;

            res.json(`Hi, ${user.name}`);
        } catch (e) {
            throw new ErrorHandler(e.message, 400);
        }
    }
};
