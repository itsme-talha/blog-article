const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const postController = require('../controllers/postController');
const { isAuthenticated } = require('../middleware/authGuard');
const { validateImage } = require('../middleware/imageValidator');

// Validation rules for post creation/updating
const postValidationRules = [
    body('title').notEmpty().withMessage('Title is required').isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
    body('content').notEmpty().withMessage('Content is required').isLength({ min: 20 }).withMessage('Content must be at least 20 characters long')
];

// PUBLIC ROUTES
router.get('/', (req, res) => res.redirect('/posts')); // Redirect root to /posts
router.get('/posts', postController.index);
router.get('/posts/:id', postController.show); // Show single post

// PROTECTED ROUTES (Dashboard & CRUD)
// Must be logged in to access these routes
router.get('/dashboard', isAuthenticated, postController.dashboard);

router.get('/posts/create/new', isAuthenticated, postController.showCreate);
router.post('/posts', isAuthenticated, validateImage, postValidationRules, postController.create);

router.get('/posts/:id/edit', isAuthenticated, postController.showEdit);
router.put('/posts/:id', isAuthenticated, validateImage, postValidationRules, postController.update);

router.delete('/posts/:id', isAuthenticated, postController.delete);

module.exports = router;