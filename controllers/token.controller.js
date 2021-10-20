const { O_Auth, O_Password } = require('../dataBase');

module.exports = {
    tokenDell: () => {
        try {
            const nowDate = new Date().getDate();
            const dateBaseToClean = [
                O_Auth,
                O_Password
            ];
            dateBaseToClean.map(async ( dataBase ) => {
                const tokens = await dataBase.find();

                tokens.map(async ( token ) => {
                    const timestamp = token._id.getTimestamp();
                    const date = timestamp.getDate();

                    if ( nowDate - date > 1 ) {
                        await O_Auth.deleteOne({ _id: token._id });
                    }
                });
            });

        } catch (e) {
            console.log('error delete token');
        }
    }
};
