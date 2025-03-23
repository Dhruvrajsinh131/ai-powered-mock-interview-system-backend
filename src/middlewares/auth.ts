import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../utils/env";
import { CustomRequest } from "../types";

interface TokenData {
  id?: string;
}

export const auth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(403).json({
        success: false,
        message: "Unauthorised",
      });
      return;
    }

    try {
      const tokenData = jwt.verify(token, env.JWT_SECRET) as TokenData;

      req._id = tokenData?.id as string;

      console.log("tokenData", tokenData);
    } catch (err) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};
