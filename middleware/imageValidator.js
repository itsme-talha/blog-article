const validateImage = (req, res, next) => {
    // Agar koi file upload nahi hui, toh next() call karein (kyun ke edit mein image optional hoti hai)
    if (!req.files || !req.files.image) {
        return next();
    }

    const image = req.files.image;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    // Check MIME Type
    if (!allowedTypes.includes(image.mimetype)) {
        return res.status(400).send('<h1>Error: Invalid file type. Only JPG, PNG, and WEBP are allowed.</h1>');
    }

    // Check File Size (2MB Limit)
    if (image.size > 2 * 1024 * 1024) {
        return res.status(400).send('<h1>Error: File is too large. Maximum size allowed is 2MB.</h1>');
    }

    next();
};

module.exports = { validateImage };