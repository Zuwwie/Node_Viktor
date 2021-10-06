const userCreator = require(`../users.helper`);

module.exports = {
    getUsers: async (req, res) => {
        res.json(await userCreator.readFile());
    },

    getUserById: async (req, res) => {

        const {user_id} = req.params;

        res.json(await userCreator.getUserById(user_id));
    },

    createUser: async (req, res) => {

        const newUser = req.body;

        res.json(await userCreator.createUser(newUser));
    },

    updateUser: (req, res) => {
        res.json(`See Soon`);
    },

    deleteUser: async (req, res) => {

        const {user_id} = req.params;

        res.json(await userCreator.deleteUser(user_id));
    }
};