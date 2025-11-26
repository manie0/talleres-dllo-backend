import bcrypt from "bcrypt";
import { UserModel, UserDocument } from "./user.model";

async function loginUserAction(
  email: string,
  password: string
): Promise<UserDocument> {
  const user = await UserModel.findOne({ email, disabled: false });

  if (!user) throw new Error("Credenciales inválidas");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Credenciales inválidas");

  return user; // UserDocument
}

export default loginUserAction;
