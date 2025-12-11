import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { catchAsync } from "../../ultis/CatchAsync";
import { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../../ultis/sendResponse";

export const UserController = {
  createUser: catchAsync(async (req: Request, res: Response): Promise<void> => {
    const user = await UserService.createUser(req.body);
    res
      .status(201)
      .json({ success: true, message: "User created", data: user });
  }),

  getAllUsers: catchAsync(
    async (_req: Request, res: Response): Promise<void> => {
      const users = await UserService.getAllUsers();
      res
        .status(200)
        .json({ success: true, message: "Users retrieved", data: users });
    }
  ),

  getSingleUser: catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const user = await UserService.getSingleUser(req.params.id);
      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }
      res.status(200).json({ success: true, data: user });
    }
  ),

  updateUser: catchAsync(async (req: Request, res: Response): Promise<void> => {
    const user = await UserService.updateUser(req.params.id, req.body);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "User updated", data: user });
  }),

  deleteUser: catchAsync(async (req: Request, res: Response): Promise<void> => {
    const user = await UserService.deleteUser(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.status(200).json({ success: true, message: "User deleted" });
  }),

  // getMe: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //   const decodedToken = req.user as JwtPayload;
  //   const result = await UserService.getMe(decodedToken.userId);
  //   sendResponse(res, {
  //     success: true,
  //     statusCode: 200,
  //     message: "Your profile Retrieved Successfully",
  //     data: result.data,
  //   });
  // }),

  getMe: catchAsync(async (req: Request, res: Response) => {
    // no user means not logged in
    if (!req.user) {
      return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Guest user",
        data: null,
      });
    }

    const decodedToken = req.user as JwtPayload;
    const result = await UserService.getMe(decodedToken.userId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Your profile Retrieved Successfully",
      data: result.data,
    });
  }),
};
