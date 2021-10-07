module.exports = {
    login: (req, res) => {
        try {

            res.json('Hi, user');
        } catch (e) {

            res.json(e.message);
        }
    }
};
