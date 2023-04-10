import gql from "graphql-tag";

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    userName: String!
    content: String!
    time: String!
    likes: [String]
    comments: [ID]!
  }

  input GetPostByPageInput {
    page: Int!
    lastPostId: String!
  }

  input CreatePostInput {
    title: String!
    content: String!
  }

  type Query {
    getPost(postId: String!): [Post]!
    getPostByPage(getPostByPageInput: GetPostByPageInput): [Post]
  }

  type Mutation {
    createPost(createPostInput: CreatePostInput): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): String!
  }
`;

export default typeDefs;
