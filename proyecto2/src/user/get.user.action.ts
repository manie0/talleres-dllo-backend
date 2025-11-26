import { UserModel, UserDocument } from "./user.model";

async function getUserAction(id: string): Promise<UserDocument | null> {
  return await UserModel.findById(id);
}

export default getUserAction;
