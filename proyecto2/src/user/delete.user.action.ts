import { UserModel } from "./user.model";

async function deleteUserAction(id: string): Promise<void> {
  await UserModel.findByIdAndUpdate(id, { disabled: true });
}

export default deleteUserAction;
