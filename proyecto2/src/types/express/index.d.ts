import { UserDocument } from "../../user/user.model";

declare global {
  namespace Express {
    interface Request {
      user: UserDocument | null;
    }
  }
}

export {};
