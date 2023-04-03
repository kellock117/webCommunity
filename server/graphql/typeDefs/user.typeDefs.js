import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    token: String!
  }

  input CreateUserInput {
    id: String!
    userName: String!
    password: String!
    confirmPassword: String!
  }
  input LoginInput {
    id: String!
    password: String!
  }

  type Query {
    _empty: String
  }

  type Mutation {
    createUser(createUserInput: CreateUserInput): User!
    login(loginInput: LoginInput): User!
    deleteUser(id: ID!): String!
  }
`;

export default typeDefs;
