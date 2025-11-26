import { UserModel, UserDocument } from "./user.model";

async function updateUserAction(
  id: string,
  data: any
): Promise<UserDocument | null> {
  return await UserModel.findByIdAndUpdate(id, data, { new: true });
}

export default updateUserAction;
