module.exports = {
    login: (req, res, next) => {
        try {
            const user = req.user;

            res.json(`Hi, ${user.name}`);
        } catch (e) {
            next(e);
        }
    }
};
