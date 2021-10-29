const { AUTHORIZATION } = require('../configs/constants');
const { authValidator } = require('../validators/');
const ErrorHandler = require('../errors/ErrorHandler');
const { passwordService, jwtService } = require('../service/');
const { userNormalizator, userTokenNormalizator } = require('../util/user.util');
const { errorsEnumCode, errorsEnumMessage } = require('../errors');
const { O_Auth, User, O_Password } = require('../dataBase');
const tokenTypeEnum = require('../configs/token-type.enum');

module.exports = {
    userAuthMiddleware: async ( req, res, next ) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email }).lean();

            if ( !user ) {
                throw new ErrorHandler(errorsEnumMessage.WRONG_EMAIL_OR_PASSWORD, errorsEnumCode.BAD_REQUEST);
            }

            await passwordService.compare(password, user.password);
            const normalizeUser = userNormalizator(user);

            req.user = normalizeUser;
            next();
        } catch (e) {
            next(e);
        }
    },

    userLoginValidMiddleware: ( req, res, next ) => {
        try {
            const user = req.body;

            const { error, value } = authValidator.authValidator.validate(user);

            if ( error ) {
                throw new ErrorHandler(errorsEnumMessage.WRONG_EMAIL_OR_PASSWORD, errorsEnumCode.BAD_REQUEST);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkToken: ( token_type ) => async ( req, res, next ) => {
        try {
            const token = req.get(AUTHORIZATION) || req.params.password_token;

            if ( !token ) {
                throw new ErrorHandler(errorsEnumMessage.INVALID_TOKEN, errorsEnumCode.UNAUTHORIZED);
            }
            await jwtService.verifyToken(token, token_type);
            let dataBaseToSearch;
            switch (token_type) {
                case tokenTypeEnum.PASSWORD:
                    dataBaseToSearch = O_Password;
                    break;
                case tokenTypeEnum.REFRESH:
                    dataBaseToSearch = O_Auth;
                    break;
                case tokenTypeEnum.ACCESS:
                    dataBaseToSearch = O_Auth;
                    break;
                default:
                    throw new ErrorHandler(errorsEnumMessage.WRONG_SOMETHING, 500);
            }
            const tokenResponse = await dataBaseToSearch.findOne({ [token_type + '_token']: token }).populate(
                'user_id');

            if ( !tokenResponse ) {
                throw new ErrorHandler(errorsEnumMessage.INVALID_TOKEN, errorsEnumCode.UNAUTHORIZED);
            }
            if ( token_type === tokenTypeEnum.REFRESH ) {
                await O_Auth.deleteOne({ refresh_token: token });
            }

            const normalizeTokenResponse = userTokenNormalizator(tokenResponse.toObject());

            req.token = token;
            req.user = normalizeTokenResponse.user_id;
            next();
        } catch (e) {
            next(e);
        }
    },
};
