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

      res.cookie("refreshToken", refreshToken, {
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
        secure: false,
        sameSite: "lax",
    });


  return res.status(200).json({ message: "Logout successful" });
};

export const refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    console.log("Cookies:", req.cookies);

    if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: "Invalid refresh token" });

        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({ accessToken });
    });
};

export const userController = GenericController(userService);
