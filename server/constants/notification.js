import gql from "graphql-tag";

export const LIKEPOST = "like post";
export const LIKECOMMENT = "like comment";
export const COMMENT = "comment";
export const MENTION = "mention";

export const GQL_GET_NOTIFICATIONS = gql`
  query GetNotifications {
    getNotifications {
      id
      userName
      action
      postId
      time
      isRead
    }
  }
`;

export const GQL_MARK_AS_READ = gql`
  mutation MarkAsRead($notificationId: String!) {
    markAsRead(notificationId: $notificationId)
  }
`;

export const GQL_DELETE_NOTIFICATIONS = gql`
  mutation DeleteNotifications {
    deleteNotifications
  }
`;
