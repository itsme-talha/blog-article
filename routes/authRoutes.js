const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');

// --- PUBLIC USER ROUTES ---
router.get('/register', authController.showRegister);
router.post('/register', [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 30 }).trim(),
    body('email').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], authController.register);

router.get('/login', authController.showLogin);
router.post('/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
], authController.login);

// --- SECRET ADMIN ROUTES (/auth/admin/login) ---
router.get('/admin/login', authController.showAdminLogin);
router.post('/admin/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
], authController.adminLogin);

router.get('/logout', authController.logout);

module.exports = router;