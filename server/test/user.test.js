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
const createUserInput = ({
  id = createRandomString(),
  userName = createRandomString(),
  password = "passwordTest",
  confirmPassword = "passwordTest",
}) => {
  return {
    id: id,
    userName: userName,
    password: password,
    confirmPassword: confirmPassword,
  };
};

const createLoginInput = ({
  id = createRandomString(),
  password = createRandomString(),
}) => {
  return {
    id: id,
    password: password,
  };
};

describe("create user", () => {
  test("create user with valid id, userName, password and confirmPassword", async () => {
    const variables = createUserInput({});
    const {
      data: {
        createUser: { token },
      },
    } = await mutate({
      mutation: GQL_REGISTER,
      variables: variables,
    });

    expect.assertions(2);
    expect(token).toBeDefined();

    const {
      data: { deleteUser },
    } = await mutate({
      mutation: GQL_DELETE_USER,
      variables: { id: variables.id },
    });

    expect(deleteUser).toBe("User deleted successfully");
  });

  test("create user with the id which already exists", async () => {
    const variables = createUserInput({ id: "test" });
    const {
      errors: [{ message }],
    } = await mutate({
      mutation: GQL_REGISTER,
      variables: variables,
    });

    expect.assertions(1);
    expect(message).toBe("id already exists");
  });

  test("create user with the user name which already exists", async () => {
    const variables = createUserInput({ userName: "test" });
    const {
      errors: [{ message }],
    } = await mutate({
      mutation: GQL_REGISTER,
      variables: variables,
    });

    expect.assertions(1);
    expect(message).toBe("user name already exists");
  });

  test("create user when the password and confirmPassword does not match", async () => {
    const variables = createUserInput({
      password: "aaa",
      confirmPassword: "bbb",
    });
    const {
      errors: [{ message }],
    } = await mutate({
      mutation: GQL_REGISTER,
      variables: variables,
    });

    expect.assertions(1);
    expect(message).toBe("passwords dose not match");
  });
});

describe("login", () => {
  test("login with valid id and password", async () => {
    const variables = createLoginInput({ id: "test", password: "test" });
    const {
      data: {
        login: { token },
      },
    } = await mutate({
      mutation: GQL_LOGIN,
      variables: variables,
    });

    expect.assertions(1);
    expect(token).toBeDefined();
  });

  test("login with invalid id", async () => {
    const variables = createLoginInput({ password: "test" });
    const {
      errors: [{ message }],
    } = await mutate({
      mutation: GQL_LOGIN,
      variables: variables,
    });

    expect.assertions(1);
    expect(message).toBe("id does not exist");
  });

  test("login with invalid password", async () => {
    const variables = createLoginInput({ id: "test" });
    const {
      errors: [{ message }],
    } = await mutate({
      mutation: GQL_LOGIN,
      variables: variables,
    });

    expect.assertions(1);
    expect(message).toBe("wrong password");
  });
});
