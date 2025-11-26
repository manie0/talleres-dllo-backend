import { UserModel, UserDocument } from "./user.model";
import bcrypt from "bcrypt";

async function createUserAction(data: any): Promise<UserDocument> {
  const hashed = await bcrypt.hash(data.password, 10);

  const user = new UserModel({
    email: data.email,
    password: hashed,
    name: data.name,
    role: data.role || "user",
  });

  return await user.save(); // UserDocument
}

export default createUserAction;
