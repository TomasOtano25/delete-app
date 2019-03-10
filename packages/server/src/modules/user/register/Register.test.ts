import faker from "faker";
import { Connection } from "typeorm";
import bcrypt from "bcryptjs";

import { gCall } from "../../../test-utils/gCall";
import { testConn } from "../../../test-utils/testConn";
import User from "../../../entity/User";

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const registerMutation = `
mutation Register($data: RegisterInput!){
  register(data: $data) {
    id
    firstName
    lastName
    email
    name
  }
}`;

describe("Register", () => {
  it("create user", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(5)
    };

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });

    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.confirmed).toBeFalsy();
    expect(dbUser!.firstName).toBe(user.firstName);
    expect(dbUser!.lastName).toBe(user.lastName);
    expect(await bcrypt.compare(user.password, dbUser!.password)).toBeTruthy();
    expect(dbUser!.roles).toEqual(["CUSTOMER"]);
  });
  it("create user with invalid email", () => {});
  it("create user with invalid password", () => {});
});
