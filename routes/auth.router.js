const router = require('express').Router();

const {authController} = require('../controllers/');
const {authMiddleware} = require('../middlewares/');

router.post(
    '/login',
    authMiddleware.userAuthValidMiddleware,
    authMiddleware.userAuthMiddleware,
    authController.login
);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.login);

router.post('/logout', authMiddleware.checkAccessToken, authController.logout);

router.post('/logoutAll', authMiddleware.checkAccessToken, authController.logoutAllDevices);

module.exports = router;
