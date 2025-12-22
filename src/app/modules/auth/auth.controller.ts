import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { setAuthCookie } from "../../ultis/setCookie";
import { sendResponse } from "../../ultis/sendResponse";
import { AuthServices } from "./auth.service";
import { envVars } from "../../config/env";
import { catchAsync } from "../../ultis/CatchAsync";
import { User } from "../user/user.model";

// const credentialsLogin = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const loginInfo = await AuthServices.credentialsLogin(req.body);

//     setAuthCookie(res, loginInfo);

//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: "User Logged In Successfully",
//       data: loginInfo,
//     });
//   }
// );

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Required for cross-site cookies
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Origin",
      req.headers.origin || "https://lms-nextjs-frontend.vercel.app"
    );

    const loginInfo = await AuthServices.credentialsLogin(req.body);

    // Set Cookies
    setAuthCookie(res, loginInfo);

    // Send Response
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
      // secure: envVars.NODE_ENV === "production",
      // sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
      secure: true,
      sameSite: "none",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      // secure: envVars.NODE_ENV === "production",
      // sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
      secure: true,
      sameSite: "none",
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged Out Successfully",
      data: null,
    });
  }
);

export const AuthControllers = {
  credentialsLogin,
  logout,
};
