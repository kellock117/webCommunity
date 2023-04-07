import Notification from "../../models/notification.model.js";
import User from "../../models/user.model.js";
import checkAuth from "../../util/authentication.js";

// notifications are made with the following situations:
// like to post or comment, comment on the post or comment(mention by @ + userName)
const notificationResolver = {
  Query: {
    getNotifications: async (_, {}, context) => {
      const user = checkAuth(context);
      const data = await User.findOne({ userName: user.userName }).populate(
        "notifications"
      );

      const notifications = data.notifications;

      return notifications;
    },
  },
  Mutation: {
    markAsRead: async (_, { notificationId }, context) => {
      checkAuth(context);

      const notification = await Notification.findById(notificationId);
      notification.isRead = true;
      notification.save();

      return "marked";
    },
  },
};

// userName is the name of the receiver, action has two types(like, comment)
export const createNotification = async ({
  userName,
  postId,
  action,
  context,
}) => {
  // the name of receiver
  const auth = checkAuth(context);

  // if the sender and receiver are the same, return
  if (auth.userName === userName) return "Notification created";

  const notification = new Notification({
    userName: auth.userName,
    action: action,
    postId: postId,
  });

  await notification.save();
  const user = await User.findOne({ userName: userName });

  user.notifications.push(notification);
  user.save();

  return "Notification created";
};

export default notificationResolver;
