const db = require(`../dataBase/users`);

const userCreator = require(`../users.helper`);

module.exports = {
    getUsers: (req, res) => {
        res.json(db);
    },

    getUserById: async (req, res) => {

        const {user_id} = req.params;

        res.json(await userCreator.getUserById(user_id));
    },

    createUser: (req, res) => {

        const newUser = req.body;

        userCreator.createUser(newUser);
        res.json(db);
    },

    updateUser: (req, res) => {
        res.json(`See Soon`);
    },

    deleteUser: (req, res) => {

        const {user_id} = req.params;

        userCreator.deleteUser(user_id);
        res.json(`Success done`);
    }
};