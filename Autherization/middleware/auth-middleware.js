// ✅ Import express and jsonwebtoken to build middleware for route protection
const express = require('express')
const jwt = require('jsonwebtoken')

// ✅ Custom middleware function to protect routes using JWT authentication
// This function will run before protected routes and check if the user is logged in
const authMiddleware = (req, res, next) => {
    // 🔍 Get the 'Authorization' header from the request
    const authHeader = req.headers['authorization'];
    console.log(authHeader); // debug: to check what header is coming in Postman/browser

    // 🪙 Extract the token from the 'Bearer <token>' format
    const token = authHeader && authHeader.split(" ")[1];

    // ❌ If token is not present, return error
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided. Please login to continue'
        });
    }

    // ✅ Try to verify and decode the JWT token using your secret key
    try {
        const extractToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(extractToken); // debug: show decoded payload

        // ✅ Attach the decoded token info to request so it can be accessed in next middleware/route
        req.userInfo = extractToken;

        // ✅ Move to next middleware or route handler
        next();
    } catch (e) {
        // ❌ If token is invalid/expired or something goes wrong, handle the error
        console.log(e); // debug: show what went wrong
        return res.status(500).json({
            success: false,
            message: 'Invalid or expired token. Please login again.'
        });
    }
}

// 📦 Export the middleware so it can be used in routes
module.exports = authMiddleware;
