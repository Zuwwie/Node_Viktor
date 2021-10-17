const User = require('../dataBase/User');
const {userValidator} = require('../validators/');
const ErrorHandler = require('../errors/ErrorHandler');
const {errorsEnumCode, errorsEnumMessage} = require('../errors');


module.exports = {
    userEmailSearch: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new ErrorHandler(errorsEnumMessage.EMAIL_EXIST, errorsEnumCode.NOT_ACCEPTABLE);
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    userIdSearchMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const userById = await User.findById(user_id).lean();

            if (!userById) {
                throw new ErrorHandler(errorsEnumMessage.WRONG_ID, errorsEnumCode.NOT_FOUND);
            }

            req.user = userById;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValid: (checkParameter = []) => (req, res, next) => {
        try {
            if (checkParameter.includes('id')) {
                const {user_id} = req.params;

                const {error, value} = userValidator.isUserIdValid.validate({_id: user_id});

                if (error) {
                    throw new ErrorHandler(errorsEnumMessage.WRONG_ID, errorsEnumCode.NOT_FOUND);
                }

                req.params.user_id = value;
            }
            if (checkParameter.includes('bodyValid')) {
                const user = req.body;

                const {error, value} = userValidator.createUserValidator.validate(user);

                if (error) {
                    throw new ErrorHandler(errorsEnumMessage.WRONG_SOMETHING, errorsEnumCode.BAD_REQUEST);
                }

                req.body = value;
            }
            if (checkParameter.includes('updateValid')) {
                const user = req.body;

                const {error, value} = userValidator.updateUserValidator.validate(user);

                if (error) {
                    throw new ErrorHandler(errorsEnumMessage.WRONG_SOMETHING, errorsEnumCode.BAD_REQUEST);
                }

                req.body = value;
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    // userIdValidationMiddleware: (req, res, next) => {
    //     try {
    //         const {user_id} = req.params;
    //
    //         const {error, value} = userValidator.isUserIdValid.validate({_id: user_id});
    //
    //         if (error) {
    //             throw new ErrorHandler('Wrong id validation!' + error.details[0].message, 404);
    //         }
    //
    //         req.params.user_id = value;
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    // isUserBodyValid: (req, res, next) => {
    //     try {
    //         const user = req.body;
    //
    //         const {error, value} = userValidator.createUserValidator.validate(user);
    //
    //         if (error) {
    //             throw new ErrorHandler(error.details[0].message, 404);
    //         }
    //
    //         req.body = value;
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    // isUserUpdateValid: (req, res, next) => {
    //     try {
    //         const user = req.body;
    //
    //         const {error, value} = userValidator.updateUserValidator.validate(user);
    //
    //         if (error) {
    //             throw new ErrorHandler(error.details[0].message, 404);
    //         }
    //
    //         req.body = value;
    //
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    validateDataDynamic: (destiny, dataIn) => (req, res, next) => {
        console.log(destiny);
        console.log(dataIn);

        const {error} = userValidator[destiny].validate(req[dataIn]);

        if (error) {
            throw new ErrorHandler(error.details[0].message, errorsEnumCode.BAD_REQUEST);
        }

        next();
    }
};
