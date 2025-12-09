import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const generateToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
}

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
        },
        REFRESH_TOKEN_SECRET,
        {expiresIn: "7d"}
    );
};

