import { initialize, disconnect } from "./server";
import typeDefs from "../graphql/typeDefs/user.typeDefs";
import resolvers from "../graphql/resolvers/user.resolver";
import { GQL_REGISTER, GQL_LOGIN, GQL_DELETE_USER } from "../constants/user";

let mutate;

beforeAll(async () => {
  const server = await initialize({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });
  mutate = server.mutate;
});

afterAll(async () => {
  await disconnect();
});

// create random string which the length is 34
const createRandomString = () => Math.random().toString(36).substring(2);

// random register input for testing
const createUserInput = (
  id = createRandomString(),
  userName = createRandomString(),
  password = "passwordTest",
  confirmPassword = "passwordTest"
) => {
  return {
    id: id,
    userName: userName,
    password: password,
    confirmPassword: confirmPassword,
  };
};

describe("create user", () => {
  // test("create user with valid id, userName, password and confirmPassword", async () => {
  //   const variables = createUserInput();
  //   const {
  //     data: { createUser },
  //   } = await mutate({
  //     mutation: GQL_REGISTER,
  //     variables: variables,
  //   });

  //   expect.assertions(2);
  //   expect(createUser.token).toBeDefined();

  //   const {
  //     data: { deleteUser },
  //   } = await mutate({
  //     mutation: GQL_DELETE_USER,
  //     variables: { id: variables.id },
  //   });

  //   expect(deleteUser).toBe("User deleted successfully");
  // });

  test("create user with the id which already exists", async () => {
    const variables = createUserInput({ id: "test" });
    const { errors } = await mutate({
      mutation: GQL_REGISTER,
      variables: variables,
    });
    console.log(errors);

    expect.assertions(1);
    expect(errors[0].message).toBe("id already exists");
  });
});
