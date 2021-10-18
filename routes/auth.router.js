const router = require('express').Router();

const {authController} = require('../controllers/');
const {authMiddleware} = require('../middlewares/');
const {ACCESS, REFRESH} = require('../configs/token-type.enum');

router.post(
    '/login',
    authMiddleware.userAuthValidMiddleware,
    authMiddleware.userAuthMiddleware,
    authController.login
);

router.post(
    '/refresh',
    authMiddleware.checkToken(REFRESH),
    authController.login);

router.post(
    '/logout',
    authMiddleware.checkToken(ACCESS),
    authController.logout);

router.post(
    '/logoutAll',
    authMiddleware.checkToken(ACCESS),
    authController.logoutAllDevices);

module.exports = router;
