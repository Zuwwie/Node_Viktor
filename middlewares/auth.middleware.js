const {AUTHORIZATION} = require('../configs/constants');
const {authValidator} = require('../validators/');
const ErrorHandler = require('../errors/ErrorHandler');
const {passwordService, jwtService} = require('../service/');
const User = require('../dataBase/User');
const {userNormalizator, userTokenNormalizator} = require('../util/user.util');
const {errorsEnumCode, errorsEnumMessage} = require('../errors');
const {O_Auth} = require('../dataBase');
const {REFRESH} = require('../configs/token-type.enum');


module.exports = {
    userAuthMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email}).lean();

            if (!user) {
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

    userAuthValidMiddleware: (req, res, next) => {
        try {
            const user = req.body;

            const {error, value} = authValidator.authValidator.validate(user);

            if (error) {
                throw new ErrorHandler(errorsEnumMessage.WRONG_EMAIL_OR_PASSWORD, errorsEnumCode.BAD_REQUEST);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(errorsEnumMessage.INVALID_TOKEN, errorsEnumCode.UNAUTHORIZED);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth.findOne({access_token: token}).populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(errorsEnumMessage.INVALID_TOKEN, errorsEnumCode.UNAUTHORIZED);
            }

            const normalizeTokenResponse = userTokenNormalizator(tokenResponse.toObject());

            req.token = token;
            req.user = normalizeTokenResponse.user_id;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(errorsEnumMessage.INVALID_TOKEN, errorsEnumCode.UNAUTHORIZED);
            }

            await jwtService.verifyToken(token, REFRESH);

            const tokenResponse = await O_Auth.findOne({refresh_token: token}).populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(errorsEnumMessage.INVALID_TOKEN, errorsEnumCode.UNAUTHORIZED);
            }

            await O_Auth.remove({refresh_token: token});

            const normalizeTokenResponse = userTokenNormalizator(tokenResponse.toObject());

            req.user = normalizeTokenResponse.user_id;
            next();
        } catch (e) {
            next(e);
        }
    },

};
