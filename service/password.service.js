const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');
const { errorsEnumCode, errorsEnumMessage } = require('../errors');

module.exports = {
    hash: ( password ) => bcrypt.hash(password, 10),
    compare: async ( password, hashPassword ) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if ( !isPasswordMatched ) {
            throw new ErrorHandler(errorsEnumMessage.WRONG_EMAIL_OR_PASSWORD, errorsEnumCode.BAD_REQUEST);
        }
    }
};
