const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

/// 1. READ: Get all posts (Home Page)
exports.index = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name email').sort({ createdAt: -1 });
        // Yahan 'layout: layouts/public' add kiya hai
        res.render('posts/index', { title: 'Blog-Article | Premium Tech Insights', posts, layout: 'layouts/public' });
    } catch (err) {
        console.error(err);
        res.status(500).send('<h1>Server Error</h1>');
    }
};

// 2. READ: Get single post
exports.show = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'name email');
        if (!post) return res.status(404).send('<h1>Post not found</h1>');
        // Yahan bhi 'layout: layouts/public' add kiya hai
        res.render('posts/show', { title: post.title, post, layout: 'layouts/public' });
    } catch (err) {
        console.error(err);
        res.status(500).send('<h1>Server Error</h1>');
    }
};

// GET: Admin Dashboard
exports.dashboard = async (req, res) => {
    try {
        // Database se saari posts uthayen, latest pehle
        const posts = await Post.find().populate('author', 'name email').sort({ createdAt: -1 });
        
        // Posts ka data dashboard file ko bhej dein
        res.render('dashboard', { 
            title: 'Admin Console | Dashboard', 
            posts, // Yeh line posts bhej rahi hai
            layout: 'layouts/main' 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('<h1>Server Error</h1>');
    }
};

// 4. CREATE: Render Create Form
exports.showCreate = (req, res) => {
    res.render('posts/create', { title: 'Create Post - Lumina', errors: [] });
};

// 5. CREATE: Handle Post Creation
exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('posts/create', { title: 'Create Post', errors: errors.array() });
    }

    try {
        let imageFileName = '';

        // Handle Image Upload
        if (req.files && req.files.image) {
            const image = req.files.image;
            // Generate unique filename to avoid overwriting
            imageFileName = Date.now() + '-' + image.name.replace(/\s+/g, '-');
            const uploadPath = path.join(__dirname, '../public/uploads/', imageFileName);
            
            await image.mv(uploadPath); // Move file to uploads folder
        }

        // Save to Database
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            image: imageFileName,
            author: req.session.userId, // Link post to current user
            tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : []
        });

        await newPost.save();
        res.redirect('/dashboard');
    } catch (err) {
        console.error('Create Error:', err);
        res.status(500).send('<h1>Error creating post</h1>');
    }
};

// 6. UPDATE: Render Edit Form
exports.showEdit = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send('<h1>Post not found</h1>');
        
        // Security check: Only the author can edit
        if (post.author.toString() !== req.session.userId) {
            return res.status(403).send('<h1>Unauthorized Action</h1>');
        }

        res.render('posts/edit', { title: 'Edit Post - Lumina', post, errors: [] });
    } catch (err) {
        console.error(err);
        res.status(500).send('<h1>Server Error</h1>');
    }
};

// 7. UPDATE: Handle Post Update
exports.update = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send('<h1>Post not found</h1>');

        // Security check
        if (post.author.toString() !== req.session.userId) {
            return res.status(403).send('<h1>Unauthorized Action</h1>');
        }

        let imageFileName = post.image; // Keep old image by default

        // Handle new image upload
        if (req.files && req.files.image) {
            const image = req.files.image;
            imageFileName = Date.now() + '-' + image.name.replace(/\s+/g, '-');
            const uploadPath = path.join(__dirname, '../public/uploads/', imageFileName);
            
            await image.mv(uploadPath);

            // Delete old image from server if it exists
            if (post.image) {
                const oldImagePath = path.join(__dirname, '../public/uploads/', post.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        // Update Database
        post.title = req.body.title;
        post.content = req.body.content;
        post.image = imageFileName;
        post.tags = req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : post.tags;

        await post.save();
        res.redirect(`/dashboard`);
    } catch (err) {
        console.error('Update Error:', err);
        res.status(500).send('<h1>Error updating post</h1>');
    }
};

// 8. DELETE: Handle Post Deletion
exports.delete = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send('<h1>Post not found</h1>');

        // Security check
        if (post.author.toString() !== req.session.userId) {
            return res.status(403).send('<h1>Unauthorized Action</h1>');
        }

        // Delete image file from server
        if (post.image) {
            const imagePath = path.join(__dirname, '../public/uploads/', post.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        // Delete from database
        await post.deleteOne();
        res.redirect('/dashboard');
    } catch (err) {
        console.error('Delete Error:', err);
        res.status(500).send('<h1>Error deleting post</h1>');
    }
};