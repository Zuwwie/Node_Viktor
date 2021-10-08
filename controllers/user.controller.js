const User = require('../dataBase/User');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }

    },

    getUserById: async (req, res) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id);

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = req.body;
            const users = await User.create(newUser);

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {email} = req.params;
            const deleted = await User.deleteOne({email});

            if (!deleted.deletedCount) {
                throw new Error(`User by ${email} not found`);
            }

            res.json('Deleted done');
        } catch (e) {
            res.json(e.message);
        }
    }
};
