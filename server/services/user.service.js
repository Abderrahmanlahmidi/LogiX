import bcrypt from "bcrypt";
import Model from "../models/index.js";
import {
  GenerateRefreshToken,
  GenerateToken,
} from "../helpers/jwt.token.generators.js";
import { GenericService } from "./generic/generic.service.js";

export const AuthService = {
  async register(data) {
    const { email, password } = data;

    console.log("register data", data);

    const exist = await Model.User.findOne({ email });
    if (exist) throw Error("User already registered");

    const hashedPassword = await bcrypt.hash(password, 12);

    const role = await Model.Role.findOne({ name: "Driver" });

    const user = await Model.User.create({
      ...data,
      password: hashedPassword,
      roleId: role._id,
    });

    return { user };
  },

  async login(data) {
    const { email, password } = data;

    const user = await Model.User.findOne({ email }).populate("roleId");
    if (!user) throw Error("User not found");

    const checkPassword = bcrypt.compare(password, user.password);
    if (!checkPassword) throw Error("Password is incorrect");

    const token = GenerateToken(user);
    const refreshToken = GenerateRefreshToken(user);

    return { user, token, refreshToken };
  },

  async changePassword(id, data) {
    const { oldPassword, newPassword } = data;

    if (!oldPassword || !newPassword) {
      throw new Error("Old password and new password are required");
    }

    const user = await Model.User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return { message: "Password changed successfully" };
  },

  async updateProfile(id, data, filePath) {
    const user = await Model.User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    // Update profile fields
    if (data.firstName) user.firstName = data.firstName;
    if (data.lastName) user.lastName = data.lastName;
    if (data.phone) user.phone = data.phone;

    // Update profile image if provided
    if (filePath) {
      user.profile = filePath;
    }

    await user.save();

    return user;
  },
};

export const userService = GenericService(Model.User);
