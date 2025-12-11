import { User } from "./user.model";
import { Types } from "mongoose";
import { AppError } from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

export const UserService = {
  // =========================================================
  // CREATE USER
  // =========================================================
  createUser: async (payload: any) => {
    try {
      return await User.create(payload);
    } catch (error: any) {
      throw new AppError(httpStatus.BAD_REQUEST, error.message);
    }
  },

  // =========================================================
  // GET ALL USERS
  // =========================================================
  getAllUsers: async () => {
    return User.find().populate("subscription");
  },

  // =========================================================
  // GET SINGLE USER
  // =========================================================
  getSingleUser: async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid user ID");
    }

    const user = await User.findById(id).populate("subscription");
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    return user;
  },

  // =========================================================
  // UPDATE USER
  // =========================================================
  updateUser: async (id: string, payload: any) => {
    if (!Types.ObjectId.isValid(id)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid user ID");
    }

    const updatedUser = await User.findByIdAndUpdate(id, payload, {
      new: true,
    }).populate("subscription");

    if (!updatedUser) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    return updatedUser;
  },

  // =========================================================
  // DELETE USER
  // =========================================================
  deleteUser: async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid user ID");
    }

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    return deleted;
  },

  // =========================================================
  // GET LOGGED-IN USER (ME)
  // =========================================================
  getMe: async (userId: string) => {
    if (!Types.ObjectId.isValid(userId)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid user ID");
    }

    const user = await User.findById(userId).select("-password").populate("subscription");

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    return { data: user };
  },
};
