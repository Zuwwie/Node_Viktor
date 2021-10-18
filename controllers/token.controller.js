const {O_Auth} = require('../dataBase');

module.exports = {
    tokenDell: async () => {
        try {
            const nowDate = new Date().getDate();
            const tokens = await O_Auth.find();

            tokens.map(async (token) => {
                const timestamp = token._id.getTimestamp();
                const date = timestamp.getDate();
                if (nowDate - date > 1) {
                    await O_Auth.deleteOne({_id: token._id});
                }
            });

        } catch (e) {
            console.log('error delete token');
        }
    }
};
