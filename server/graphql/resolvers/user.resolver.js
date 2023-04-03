import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

import User from "../../models/user.model.js";
// import History from "../../models/history.js";

function generateToken(user) {
  return jwt.sign(
    {
      userName: user.userName,
      password: user.password,
    },
    process.env.SECRET_KEY,
    { expiresIn: "30m" }
  );
}

const userResolver = {
  Mutation: {
    createUser: async (
      _,
      { createUserInput: { id, userName, password, confirmPassword } }
    ) => {
      // check if the user already exists
      const oldUser = await User.findOne({ id: id });
      if (oldUser) {
        throw new UserInputError("id already exists");
      }

      // const oldUserName = await User.findOne({ userName: userName });

      // if (oldUserName) {
      //   throw new UserInputError("user name already exists");
      // }

      if (password != confirmPassword) {
        throw new UserInputError("passwords dose not match");
      }

      // encrypt the password
      password = await bcrypt.hash(password, 7);

      const user = new User({
        id: id,
        userName: userName,
        password: password,
      });

      // const history = new History({
      //   userName: userName,
      // });
      // await history.save();

      // save the user information into mongodb
      const res = await user.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    login: async (_, { loginInput: { id, password } }) => {
      // find user by id and check whether it exists
      const user = await User.findOne({ id: id });
      if (!user) throw new UserInputError("id does not exist");

      // compare input password to user's password
      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new UserInputError("wrong password");

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    deleteUser: async (_, { id }) => {
      if (process.env.NODE_ENV !== "test")
        throw new Error("This is only for test environment");

      try {
        const user = await User.findOne({ id: id });
        if (user === null) throw new UserInputError("No such user");

        await user.delete();

        return "User deleted successfully";
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

export default userResolver;
