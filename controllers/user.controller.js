const db = require(`../dataBase/users`);

const userCreator = require(`../users.helper`);

module.exports = {
    getUsers: (req, res) => {
        console.log(`get work`);

        res.json(db);
    },
    getUserById: (req, res) => {

        const {user_id} = req.params;

        let user = userCreator.getUserById(user_id);
        console.log(`_________________`)
        console.log(user);
        console.log(`_________________`)
        user = db[user_id]

        res.json({user});
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

        for (let i = 0; i < users.length; i++) {

            const user = users[i];

            if (user.id == user_id) {
                users.splice(i, 1);
                break;
            }
        }

        res.json(db);
    }
};