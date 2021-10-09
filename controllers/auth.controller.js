module.exports = {
    login: (req, res) => {
        try {
            const user = req.user;

            res.json(`Hi, ${user.name}`);
        } catch (e) {
            res.json(e.message);
        }
    }
};
