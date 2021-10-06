const db = require(`../dataBase/users`);

const userCreator = require(`../users.helper`);

module.exports = {
    getUsers: (req, res) => {
        res.json(db);
    },

    getUserById: (req, res) => {

        const {user_id} = req.params;

        for (let i = 0; i < db.length; i++) {

            const user = db[i];

            if (user_id == user.id) {
                res.json(db.splice(i, 1)[0])
                break;
            }
        }
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