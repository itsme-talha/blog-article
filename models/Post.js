const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: 5,
        maxlength: 200,
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        minlength: 20
    },
    image: {
        type: String,
        default: ''
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Establishes relationship with User model
        required: true
    },
    tags: {
        type: [String],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);