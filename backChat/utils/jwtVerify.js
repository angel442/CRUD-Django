//TODO replicate in index.js and validateToken
import jwt from 'jsonwebtoken';
import 'dotenv/config';


export function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Invalis token" });
            req.user = user;
        });
    })
}