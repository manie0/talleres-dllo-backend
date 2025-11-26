import {
  register,
  login,
  readUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../src/user/user.controller";

import createUserAction from "../src/user/create.user.action";
import loginUserAction from "../src/user/login.user.action";
import readUserAction from "../src/user/read.user.action";
import getUserAction from "../src/user/get.user.action";
import updateUserAction from "../src/user/update.user.action";
import deleteUserAction from "../src/user/delete.user.action";

jest.mock("../src/user/create.user.action");
jest.mock("../src/user/login.user.action");
jest.mock("../src/user/read.user.action");
jest.mock("../src/user/get.user.action");
jest.mock("../src/user/update.user.action");
jest.mock("../src/user/delete.user.action");

describe("User Controller", () => {
  // REGISTER
  test("register → éxito", async () => {
    (createUserAction as jest.Mock).mockResolvedValue({
      _id: "123",
      email: "test@test.com",
    });

    const result = await register({
      email: "test@test.com",
      password: "1234",
    });

    expect(result).toHaveProperty("_id");
  });

  test("register → error por datos inválidos", async () => {
    (createUserAction as jest.Mock).mockRejectedValue(
      new Error("Invalid data")
    );

    await expect(register({} as any)).rejects.toThrow("Invalid data");
  });

  // LOGIN
  test("login → éxito", async () => {
    (loginUserAction as jest.Mock).mockResolvedValue({
      _id: "123",
      email: "test@test.com",
    });

    const result = await login("test@test.com", "1234");

    expect(result.email).toBe("test@test.com");
  });

  test("login → credenciales inválidas", async () => {
    (loginUserAction as jest.Mock).mockRejectedValue(
      new Error("Invalid credentials")
    );

    await expect(login("x@test.com", "wrong")).rejects.toThrow(
      "Invalid credentials"
    );
  });

  // READ USERS
  test("readUsers → éxito", async () => {
    (readUserAction as jest.Mock).mockResolvedValue([
      { _id: "1" },
      { _id: "2" },
    ]);

    const result = await readUsers();

    expect(result.length).toBe(2);
  });

  test("readUsers → error", async () => {
    (readUserAction as jest.Mock).mockRejectedValue(new Error("DB error"));

    await expect(readUsers()).rejects.toThrow("DB error");
  });

  // GET USER
  test("getUser → éxito", async () => {
    (getUserAction as jest.Mock).mockResolvedValue({
      _id: "123",
      email: "a@test.com",
    });

    const result = await getUser("123");
    expect(result?._id).toBe("123");
  });

  test("getUser → usuario no encontrado", async () => {
    (getUserAction as jest.Mock).mockResolvedValue(null);

    const result = await getUser("no-id");
    expect(result).toBeNull();
  });

  // UPDATE USER
  test("updateUser → éxito", async () => {
    (updateUserAction as jest.Mock).mockResolvedValue({
      _id: "123",
      name: "Nuevo",
    });

    const result = await updateUser("123", { name: "Nuevo" });
    expect(result?.name).toBe("Nuevo");
  });

  test("updateUser → error por validación", async () => {
    (updateUserAction as jest.Mock).mockRejectedValue(
      new Error("Invalid update data")
    );

    await expect(updateUser("123", {})).rejects.toThrow("Invalid update data");
  });

  // DELETE USER
  test("deleteUser → éxito", async () => {
    (deleteUserAction as jest.Mock).mockResolvedValue(undefined);

    await expect(deleteUser("123")).resolves.toBeUndefined();
  });

  test("deleteUser → id inválido", async () => {
    (deleteUserAction as jest.Mock).mockRejectedValue(new Error("Invalid ID"));

    await expect(deleteUser("bad-id")).rejects.toThrow("Invalid ID");
  });
});
