const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find().lean();
            users.forEach(user => userUtil.userNormalizator(user));

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }

    },

    getUserById: (req, res) => {
        try {
            const user = req.user;

            const utilUser = userUtil.userNormalizator(user);

            res.json(utilUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = req.body;

            const hashedPassword = await passwordService.hash(newUser.password);

            const user = await User.create({...newUser, password: hashedPassword});

            user.password = undefined;

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {_id} = req.user;
            const deleted = await User.deleteOne({_id});

            if (!deleted.deletedCount) {
                throw new Error(`User by ${_id} not found`);
            }

            res.json('Deleted done');
        } catch (e) {
            res.json(e.message);
        }
    },
    updateUser: async (req, res) => {
        try {
            const {name} = req.body;
            const {_id} = req.user;

            const newUser = await User.updateOne({_id}, {$set: {name}});

            if (!newUser.acknowledged) {
                throw new Error('Something wrong!');
            }

            res.json('Update done!');
        } catch (e) {
            res.json(e.message);
        }
    }
};
