const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

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

            res.json(user);
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
