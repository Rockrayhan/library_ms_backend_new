import { NextFunction, Request, Response } from "express";
import { AppError } from "../errorHelpers/AppError";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import httpStatus from "http-status-codes";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../ultis/jwt";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // to get access token at header or cookie in frontend
      const accessToken = req.headers.authorization || req.cookies.accessToken;

      // if (!accessToken) {
      //   throw new AppError(403, "Not Logged in. Please login first.");
      // }

      // Allow guest access ONLY for route "/me"
      if (!accessToken) {
        if (req.path === "/me") {
          req.user = null;
          return next();
        }
        throw new AppError(403, "Not Logged in. Please login first.");
      }

      // const verifiedToken = verifyToken(accessToken, "secret") as JwtPayload
      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      const isUserExist = await User.findOne({ email: verifiedToken.email });

      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to view this route!!!");
      }
      req.user = verifiedToken;
      next();
    } catch (error) {
      console.log("jwt error", error);
      next(error);
    }
  };
