import { testConnection } from "../../../test-utils/testConnection";
import { Connection } from "typeorm";
import { gCall } from "../../../test-utils/gCall";
import { User } from "../../../entities/User";

let connection: Connection;

beforeAll(async () => {
  connection = await testConnection();
});

afterAll(async () => {
  await connection.close();
});

const meQuery = `
  {
    me {
      id
      email
      firstName
      lastName
      name
    }
  }
`;

describe("Me", () => {
  it("get user", async () => {
    const user = await User.create({
      firstName: "Sean",
      lastName: "O'Hara",
      email: "soharaz@sohara.com",
      password: "password"
    }).save();
    const result = await gCall({
      source: meQuery,
      userId: user.id
    });
    expect(result).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });
  });

  it("return null when no user in context", async () => {
    const result = await gCall({
      source: meQuery
    });
    expect(result).toMatchObject({
      data: {
        me: null
      }
    });
  });
});
