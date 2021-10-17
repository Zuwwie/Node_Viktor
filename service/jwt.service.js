const jwt = require('jsonwebtoken');
const ErrorHandler = require('../errors/ErrorHandler');
const {errorsEnumCode, errorsEnumMessage} = require('../errors/');
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require('../configs/config');
const tokenTypeEnum = require('../configs/token-type.enum');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {access_token, refresh_token};
    },
    verifyToken: async (token, tokenType = 'access') => {
        try {
            const secret = tokenType === tokenTypeEnum.ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(errorsEnumMessage.INVALID_TOKEN, errorsEnumCode.UNAUTHORIZED);
        }
    }
};
