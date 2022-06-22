const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    token: String!
  }
  type Post {
    id: ID!
    title: String!
    userID: String!
    content: String!
    time: String!
    likes: [String]
    comments: [Comment]
  }
  type Comment {
    id: ID!
    content: String!
    time: String!
    likes: [String]
  }
  type Query {
    getPosts: [Post]
    getComments: [Comment]
  }
  input RegisterInput {
    id: String!
    password: String!
    confirmPassword: String!
  }
  input LoginInput {
    id: String!
    password: String!
  }
  input CreatePostInput {
    title: String!
    content: String!
  }
  type Mutation {
    createUser(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    createPost(createPostInput: CreatePostInput): Post!
    deletePost(postID: ID!): String!
    likePost(postID: ID!): Post!
    createComment(content: String!): Comment!
    deleteComment(commentID: ID!): String!
    likeComment(commentID: ID!): Post!
  }
`;
