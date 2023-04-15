import { ApolloError, makeVar } from "@apollo/client";

export const errorValue = makeVar<null | ApolloError>(null);
