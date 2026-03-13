const isAuthenticated = (req, res, next) => {
    // Check if session exists and has a userId
    if (req.session && req.session.userId) {
        return next(); // User is authenticated, proceed to the next function
    }
    
    // If not authenticated, redirect to login page
    res.redirect('/auth/login');
};

module.exports = { isAuthenticated };