const User = require('../models/User');
const { validationResult } = require('express-validator');

// ==========================================
// 1. PUBLIC USER AUTHENTICATION
// ==========================================

exports.showRegister = (req, res) => {
    // User registration uses the public layout
    res.render('auth/register', { title: 'Register - Blog-Article', layout: 'layouts/public', errors: [] });
};

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('auth/register', { title: 'Register', layout: 'layouts/public', errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('auth/register', { title: 'Register', layout: 'layouts/public', errors: [{ msg: 'Email is already registered.' }] });
        }
        const user = new User({ name, email, password, role: 'user' }); // Force role as 'user'
        await user.save();

        req.session.userId = user._id;
        req.session.name = user.name;
        req.session.role = user.role;
        
        // Normal user goes to home page after registration
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.showLogin = (req, res) => {
    // User login uses the public layout
    res.render('auth/login', { title: 'Login - Blog-Article', layout: 'layouts/public', errors: [] });
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('auth/login', { title: 'Login', layout: 'layouts/public', errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.render('auth/login', { title: 'Login', layout: 'layouts/public', errors: [{ msg: 'Invalid credentials.' }] });
        }

        req.session.userId = user._id;
        req.session.name = user.name;
        req.session.role = user.role;
        
        // Admin trying to login from public page -> send to dashboard
        // User -> send to home page
        res.redirect(user.role === 'admin' ? '/dashboard' : '/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// ==========================================
// 2. SECRET ADMIN AUTHENTICATION
// ==========================================

exports.showAdminLogin = (req, res) => {
    // Admin login uses its own isolated layout (layouts/main)
    res.render('admin/login', { title: 'Admin Console Login', layout: 'layouts/main', errors: [] });
};

exports.adminLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('admin/login', { title: 'Admin Console Login', layout: 'layouts/main', errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        
        // STRICT CHECK: Is user an admin?
        if (!user || !(await user.comparePassword(password)) || user.role !== 'admin') {
            return res.render('admin/login', { 
                title: 'Admin Console Login', 
                layout: 'layouts/main', 
                errors: [{ msg: 'Access Denied. Invalid Admin Credentials.' }] 
            });
        }

        req.session.userId = user._id;
        req.session.name = user.name;
        req.session.role = user.role;
        
        // Admin securely goes to dashboard
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Logout (Works for both)
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};