import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const tokenValidity = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({ status: 400, msg: "Access denied. No Tokens provided." });
    }

    try {
        const tokenVerify = jwt.verify(token, process.env.PASSWORD);
        if (!tokenVerify) {
            return res.json({ status: 411, msg: 'Invalid token.' });
        }
        
        // Set user information in request object
        req.user = tokenVerify;

        // Call next middleware
        next();
    } catch (error) {
        return res.json({ status: 411, msg: 'Invalid token.' });
    }
}

export default tokenValidity;