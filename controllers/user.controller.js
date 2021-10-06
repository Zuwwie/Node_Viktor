const userCreator = require('../helper/users.helper');

module.exports = {
    getUsers: async (req, res) => {
        const user = await userCreator.readFile();

        res.json(user);
    },

    getUserById: async (req, res) => {
        const {user_id} = req.params;
        const user = await userCreator.getUserById(user_id);

        res.json(user);
    },

    createUser: async (req, res) => {
        const newUser = req.body;
        const user = await userCreator.createUser(newUser);

        res.json(user);
    },

    updateUser: (req, res) => {
        res.json(`See Soon`);
    },

    deleteUser: async (req, res) => {
        const {user_id} = req.params;
        const user = await userCreator.deleteUser(user_id);

        res.json(user);
    }
};