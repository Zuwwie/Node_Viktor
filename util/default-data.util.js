const { User } = require('../dataBase/');
const { ADMIN } = require('../configs/user-roles.enum');

module.exports = async () => {
    const user = await User.findOne({ role: ADMIN });

    if ( !user ) {
        await User.createUserWithHashPassword({
            name: 'Nazar',
            role: ADMIN,
            email: 'nazar.gavronsky.mail@gmail.com',
            password: '22'
        });
    }
};
