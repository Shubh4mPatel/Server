const jwt= require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('No token provided');
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send('Failed to authenticate token');
        }
        req.user_id = decoded.id;
        next();
    });
};
module.exports={verifyToken}