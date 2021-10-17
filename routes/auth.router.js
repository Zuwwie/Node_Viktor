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

router.post('/logout', authMiddleware.userLogoutMiddleware, authController.logout);

router.post('/logoutAll', authMiddleware.userLogoutAllMiddleware, authController.logoutAllDevices);

module.exports = router;
