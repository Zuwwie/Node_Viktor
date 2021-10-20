const router = require('express').Router();

const { authController } = require('../controllers/');
const { authMiddleware } = require('../middlewares/');
const { ACCESS, REFRESH, PASSWORD } = require('../configs/token-type.enum');

router.post(
    '/login',
    authMiddleware.userAuthValidMiddleware,
    authMiddleware.userAuthMiddleware,
    authController.login
);

router.post(
    '/refresh',
    authMiddleware.checkToken(REFRESH, REFRESH),
    authController.login);

router.post(
    '/logout',
    authMiddleware.checkToken(ACCESS),
    authController.logout);

router.post(
    '/logoutAll',
    authMiddleware.checkToken(ACCESS),
    authController.logoutAllDevices);

router.post(
    '/passwordchanger',
    authMiddleware.checkToken(ACCESS),
    authController.changePasswordSendMail);

router.post(
    '/passwordchanger/:password_token',
    authMiddleware.checkToken(PASSWORD, PASSWORD),
    authController.changeUserPassword);

module.exports = router;
