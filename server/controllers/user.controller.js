import { AuthService } from "../services/user.service.js";
import { GenericController } from "./generic/generic.controller.js";
import { userService } from "../services/user.service.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    await AuthService.register(req.body);
    return res.status(200).json({
      status: "user registered successfully",
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const login = async (req, res) => {
  try {
    const result = await AuthService.login(req.body);

    await res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: "user login successfully",
      data: {
        accessToken: result.token,
        user: result.user,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    await AuthService.changePassword(req.params.id, req.body);

    return res.status(200).json({
      status: "password changed successfully",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const filePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const updatedUser = await AuthService.updateProfile(id, req.body, filePath);

    return res.status(200).json({
      status: "profile updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const logout = (req, res) => {

  res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
  });

  return res.status(200).json({ message: "Logout successful" });
};

export const refreshToken = (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ message: "No refresh token" });

        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = jwt.sign(
            { id: payload.id, role: payload.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10s" }
        );

        return res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
        return res.status(401).json({ message: "Refresh token expired" });
    }
};

export const userController = GenericController(userService);
