import Notification from "../../models/notification.model.js";
import User from "../../models/user.model.js";
import checkAuth from "../../util/authentication.js";

// notifications are made with the following situations:
// like to post or comment, comment on the post or comment(mention by @ + userName)
const notificationResolver = {
  Query: {
    getNotifications: async (_, {}, context) => {
      try {
        const user = checkAuth(context);
        const data = await User.findOne({ userName: user.userName }).populate(
          "notifications"
        );

        const notifications = data.notifications;

        return notifications;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    markAsRead: async (_, { notificationId }, context) => {
      try {
        checkAuth(context);

        const notification = await Notification.findById(notificationId);
        notification.isRead = true;
        notification.save();

        return "marked";
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteNotifications: async (_, {}, context) => {
      if (process.env.NODE_ENV !== "test")
        throw new Error("This is only for test environment");

      try {
        const userName = checkAuth(context).userName;
        const user = await User.findOne({ userName: userName });

        const notifications = user.notifications;
        user.notifications = [];
        user.save();

        for (const notification of notifications) {
          const id = notification.toString();
          await Notification.deleteOne({ _id: id });
        }

        return "Notifications deleted successfully";
      } catch (error) {
        throw new Error(error.message);
      }
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
  if (user === null) return "User not found";

  user.notifications.push(notification);
  await user.save();

  return "Notification created";
};

export default notificationResolver;
