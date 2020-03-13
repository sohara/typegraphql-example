import { createSchema } from "../createSchema";
import { graphql } from "graphql/graphql";
import Maybe from "graphql/tsutils/Maybe";
import { GraphQLSchema } from "graphql";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues
  });
};
