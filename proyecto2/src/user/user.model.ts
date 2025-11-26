import { model, Schema, Document, Types } from "mongoose";

export type UserRole = "admin" | "user";

// Tipo base (sin _id)
export interface UserType {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  disabled: boolean;
}

// Tipo REAL del documento (con _id)
export interface UserDocument extends UserType, Document {
  _id: Types.ObjectId;
}

const UserSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  disabled: { type: Boolean, default: false },
});

export const UserModel = model<UserDocument>("User", UserSchema);
