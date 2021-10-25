const router = require('express').Router();

const { authController } = require('../controllers/');
const { authMiddleware } = require('../middlewares/');
const { ACCESS, REFRESH, PASSWORD } = require('../configs/token-type.enum');
const { userMiddleware } = require('../middlewares');

router.post(
    '/login',
    authMiddleware.userLoginValidMiddleware,
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

router.put(
    '/passwordchangerMail',
    authMiddleware.userAuthValidMiddleware('email'),
    userMiddleware.userEmailSearch(true),
    authController.changePasswordSendMail
);

router.put(
    '/passwordchanger/:password_token',
    authMiddleware.userAuthValidMiddleware('password'),
    authMiddleware.checkToken(PASSWORD, PASSWORD),
    authController.changeUserPassword);

module.exports = router;
