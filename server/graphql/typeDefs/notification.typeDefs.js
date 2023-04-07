import gql from "graphql-tag";

const typeDefs = gql`
  type Notification {
    id: ID!
    userName: String!
    action: String!
    postId: String!
    time: String!
    isRead: Boolean!
  }

  type Query {
    getNotifications: [Notification]
  }

  type Mutation {
    markAsRead(notificationId: String!): String!
  }
`;

export default typeDefs;
