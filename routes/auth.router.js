const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
    '/login',
    authMiddleware.userAuthValidMiddleware,
    authMiddleware.userAuthMiddleware,
    authController.login);

module.exports = router;
