import { buildSchema } from "type-graphql";

export const createSchema = () =>
  buildSchema({
    resolvers: [__dirname + "/modules/user/*.ts"],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });
