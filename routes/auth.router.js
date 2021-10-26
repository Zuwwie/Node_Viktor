const router = require('express').Router();

const { authController } = require('../controllers/');
const { authMiddleware } = require('../middlewares/');
const { ACCESS, REFRESH, PASSWORD } = require('../configs/token-type.enum');
const { userMiddleware } = require('../middlewares');
const { authValidator } = require('../validators/');

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

router.post(
    '/passwordchangerMail',
    userMiddleware.validateDataDynamic('emailValidator', authValidator),
    userMiddleware.userEmailSearch(true),
    authController.changePasswordSendMail
);

router.put(
    '/passwordchanger/:password_token',
    userMiddleware.validateDataDynamic('passwordValidator', authValidator),
    authMiddleware.checkToken(PASSWORD, PASSWORD),
    authController.changeUserPassword);

module.exports = router;
