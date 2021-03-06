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

const registerMutation = `
  mutation Register($data: RegisterInput!) {
    register(
      data: $data
    ) {
      id
      email
      firstName
      lastName
      name
    }
  }
`;

describe("Register", () => {
  it("create user", async () => {
    const user = {
      firstName: "Sean",
      lastName: "O'Hara",
      email: "sohara@sohara.com",
      password: "password"
    };
    const result = await gCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });
    expect(result).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          name: "Sean O'Hara"
        }
      }
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.email).toEqual(user.email);
  });
});
