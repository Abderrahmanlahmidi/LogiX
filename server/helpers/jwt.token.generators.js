import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const GenerateToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
    );
}

export const GenerateRefreshToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
        },
        REFRESH_TOKEN_SECRET,
        {expiresIn: "7d"}
    );
};

