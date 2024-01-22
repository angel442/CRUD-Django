import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authRequired = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "No token, authoritzation denied" });

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
    });

    next();
}