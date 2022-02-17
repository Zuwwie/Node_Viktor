const jwt = require('jsonwebtoken');
const ErrorHandler = require('../errors/ErrorHandler');
const { errorsEnumCode, errorsEnumMessage } = require('../errors/');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_PASSWORD_SECRET } = require('../configs/config');
const tokenRequest = require('../configs/config');
// const tokenTypeEnum = require('../configs/token-type.enum');
const { ACCESS } = require('../configs/token-type.enum');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '1d' });

        return { access_token, refresh_token };
    },
    verifyToken: async ( token, tokenType = ACCESS ) => {
        try {
            const secret = tokenRequest['JWT_' + tokenType.toUpperCase() + '_SECRET'];

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(errorsEnumMessage.INVALID_TOKEN, errorsEnumCode.UNAUTHORIZED);
        }
    },
    generatePasswordToken: () => jwt.sign({}, JWT_PASSWORD_SECRET, { expiresIn: '1d' }),
};
