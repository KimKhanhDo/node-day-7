const express = require('express');

const authController = require('@/controllers/auth.controller');
const authRequired = require('@/middlewares/authRequired');

const router = express.Router();

// Client -> request -> controller -> model -> JSON response

router.post('/logout', authRequired, authController.logout);
router.get('/me', authRequired, authController.getCurrentUser);

// Cần login để được resend email
router.post(
    '/resend-verified-email',
    authRequired,
    authController.resendVerifiedEmail,
);

// TODO
router.post('/change-password', authRequired, authController.changePassword);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/verify-email', authController.verifyEmail);

module.exports = router;
