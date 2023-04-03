import gql from "graphql-tag";

export const GQL_REGISTER = gql`
  mutation createUserCallback(
    $id: String!
    $password: String!
    $confirmPassword: String!
    $userName: String!
  ) {
    createUser(
      createUserInput: {
        id: $id
        password: $password
        confirmPassword: $confirmPassword
        userName: $userName
      }
    ) {
      id
      token
    }
  }
`;

export const GQL_LOGIN = gql`
  mutation loginUserCallback($id: String!, $password: String!) {
    login(loginInput: { id: $id, password: $password }) {
      id
      token
    }
  }
`;

export const GQL_DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
