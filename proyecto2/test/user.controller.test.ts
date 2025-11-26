/**
 * node: jest runs in ts with ts-jest config (assume you configured ts-jest)
 * We'll mock actions to control behavior and test controller functions.
 */
import * as userController from "../src/user/user.controller";

jest.mock("../src/user/create.user.action", () => jest.fn());
jest.mock("../src/user/login.user.action", () => jest.fn());
jest.mock("../src/user/read.user.action", () => jest.fn());
jest.mock("../src/user/get.user.action", () => jest.fn());
jest.mock("../src/user/update.user.action", () => jest.fn());
jest.mock("../src/user/delete.user.action", () => jest.fn());

const createUserAction = require("../src/user/create.user.action");
const loginUserAction = require("../src/user/login.user.action");
const readUserAction = require("../src/user/read.user.action");
const getUserAction = require("../src/user/get.user.action");
const updateUserAction = require("../src/user/update.user.action");
const deleteUserAction = require("../src/user/delete.user.action");

describe("user.controller", () => {
  afterEach(() => jest.resetAllMocks());

  test("register success", async () => {
    createUserAction.mockResolvedValue({
      _id: "1",
      email: "a@a.com",
      name: "A",
    });
    const res = await userController.register({
      name: "A",
      email: "a@a.com",
      password: "x",
    });
    expect(res.email).toBe("a@a.com");
  });

  test("register failure when email exists", async () => {
    createUserAction.mockRejectedValue(new Error("Email ya registrado"));
    await expect(userController.register({})).rejects.toThrow(
      "Email ya registrado"
    );
  });

  test("login success", async () => {
    loginUserAction.mockResolvedValue({ token: "tok", user: { id: "1" } });
    const res = await userController.login("a@a.com", "pw");
    expect(res.token).toBe("tok");
  });

  test("readUsers success", async () => {
    readUserAction.mockResolvedValue([{ email: "x@x.com" }]);
    const res = await userController.readUsers();
    expect(Array.isArray(res)).toBe(true);
  });

  test("getUser invalid id", async () => {
    getUserAction.mockRejectedValue(new Error("Id inválido"));
    await expect(userController.getUser("bad")).rejects.toThrow("Id inválido");
  });

  test("updateUser success", async () => {
    updateUserAction.mockResolvedValue({ _id: "1", name: "New" });
    const res = await userController.updateUser("1", { name: "New" });
    expect(res.name).toBe("New");
  });

  test("deleteUser success", async () => {
    deleteUserAction.mockResolvedValue(true);
    const res = await userController.deleteUser("1");
    expect(res).toBeTruthy();
  });
});
