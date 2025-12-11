import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { setAuthCookie } from "../../ultis/setCookie";
import { sendResponse } from "../../ultis/sendResponse";
import { AuthServices } from "./auth.service";
import { envVars } from "../../config/env";
import { catchAsync } from "../../ultis/CatchAsync";
import { User } from "../user/user.model";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body);

    setAuthCookie(res, loginInfo);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged In Successfully",
      data: loginInfo,
    });
  }
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production", // true on vercel
      sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production",
      sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged Out Successfully",
      data: null,
    });
  }
);

// export const AuthController = {
//   me: catchAsync(async (req, res) => {
//     const user = await User.findById(req.user.userId).select("-password");

//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "User fetched successfully",
//       data: user,
//     });
//   }),
// };

export const AuthControllers = {
  credentialsLogin,
  logout,
};
