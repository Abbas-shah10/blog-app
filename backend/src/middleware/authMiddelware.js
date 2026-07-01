import jwt from 'jsonwebtoken'
import users from '../models/users.model.js'
const authenticate = async (req, res, next) => {

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await users.findByPk(decoded.id);

            if (!user) {
                return res.status(404).json({
                    message: "Not Authorized, user not found",
                });
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({
                message: "Not Authorized, token failed",
            });
        }
    } else {
        return res.status(401).json({
            message: "Not Authorized, no token",
        });
    }
};

export default authenticate;