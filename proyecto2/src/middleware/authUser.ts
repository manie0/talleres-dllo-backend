import { Request, Response, NextFunction } from "express";
import { UserModel } from "../user/user.model";

export async function authUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.header("x-user-id");

    if (!userId) {
      req.user = null;
      return next();
    }

    const user = await UserModel.findById(userId);

    req.user = user || null;

    next();
  } catch (err) {
    console.error("authUser error:", err);
    req.user = null;
    next();
  }
}
