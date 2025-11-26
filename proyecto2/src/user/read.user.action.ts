import { UserModel, UserDocument } from "./user.model";

async function readUserAction(): Promise<UserDocument[]> {
  return await UserModel.find({ disabled: false });
}

export default readUserAction;
