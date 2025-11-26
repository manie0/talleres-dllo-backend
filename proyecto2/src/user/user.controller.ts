import createUserAction from "./create.user.action";
import loginUserAction from "./login.user.action";
import readUserAction from "./read.user.action";
import getUserAction from "./get.user.action";
import updateUserAction from "./update.user.action";
import deleteUserAction from "./delete.user.action";

import { UserDocument } from "./user.model";

async function register(data: any): Promise<UserDocument> {
  return await createUserAction(data);
}

async function login(email: string, password: string): Promise<UserDocument> {
  return await loginUserAction(email, password);
}

async function readUsers(): Promise<UserDocument[]> {
  return await readUserAction();
}

async function getUser(id: string): Promise<UserDocument | null> {
  return await getUserAction(id);
}

async function updateUser(id: string, data: any): Promise<UserDocument | null> {
  return await updateUserAction(id, data);
}

async function deleteUser(id: string): Promise<void> {
  return await deleteUserAction(id);
}

export { register, login, readUsers, getUser, updateUser, deleteUser };
