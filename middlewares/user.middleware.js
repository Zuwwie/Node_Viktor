const { User } = require('../dataBase/');
const { userValidator } = require('../validators/');
const ErrorHandler = require('../errors/ErrorHandler');
const { errorsEnumCode, errorsEnumMessage } = require('../errors');

module.exports = {
    userEmailSearch: ( need = true ) => async ( req, res, next ) => {
        try {
            const { email } = req.body;
            const userByEmail = await User.findOne({ email });

            if ( userByEmail && !need ) {
                throw new ErrorHandler(errorsEnumMessage.EMAIL_EXIST, errorsEnumCode.CONFLICT);
            }
            if(need && !userByEmail) {
                throw new ErrorHandler(errorsEnumMessage.WRONG_EMAIL_OR_PASSWORD, errorsEnumCode.CONFLICT);
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    userIdSearchMiddleware: async ( req, res, next ) => {
        try {
            const { user_id } = req.params;
            const userById = await User.findById(user_id).lean();

            if ( !userById ) {
                throw new ErrorHandler(errorsEnumMessage.WRONG_ID, errorsEnumCode.NOT_FOUND);
            }

            req.user = userById;
            next();
        } catch (e) {
            next(e);
        }
    },

    validateDataDynamic: ( destiny, dataIn = 'body' ) => ( req, res, next ) => {

        const { error, value } = userValidator[destiny].validate(req[dataIn]);

        if ( error ) {
            throw new ErrorHandler(error.details[0].message, errorsEnumCode.BAD_REQUEST);
        }
        req[dataIn] = value;

        next();
    }
};
