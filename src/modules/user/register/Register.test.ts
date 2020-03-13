import { testConnection } from "../../../test-utils/testConnection";
import { Connection } from "typeorm";
import { gCall } from "../../../test-utils/gCall";

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
    const result = await gCall({
      source: registerMutation,
      variableValues: {
        data: {
          firstName: "Sean",
          lastName: "O'Hara",
          email: "sohara@sohara.com",
          password: "password"
        }
      }
    });
    expect(result!.data!.register.name).toBe("Sean O'Hara");
  });
});
