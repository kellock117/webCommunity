import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/user.model.js";

const generateToken = user =>
  jwt.sign(
    {
      userName: user.userName,
    },
    process.env.SECRET_KEY,
    { expiresIn: "30m" }
  );

const userResolver = {
  Mutation: {
    createUser: async (
      _,
      { createUserInput: { id, userName, password, confirmPassword } }
    ) => {
      try {
        // check if the user already exists
        const oldUser = await User.findOne({ id: id });
        if (oldUser) throw new Error("id already exists");

        const oldUserName = await User.findOne({ userName: userName });

        if (oldUserName) throw new Error("user name already exists");

        if (password != confirmPassword)
          throw new Error("passwords dose not match");

        // encrypt the password
        password = await bcrypt.hash(password, 7);

        const user = new User({
          id: id,
          userName: userName,
          password: password,
        });

        // save the user information into mongodb
        const res = await user.save();
        const token = generateToken(res);

        return {
          ...res._doc,
          id: res._id,
          token,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (_, { loginInput: { id, password } }) => {
      try {
        // find user by id and check whether it exists
        const user = await User.findOne({ id: id });
        if (!user) throw new Error("id does not exist");

        // compare input password to user's password
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("wrong password");

        user.lastLogin = new Date();
        await user.save();

        const token = generateToken(user);

        return {
          ...user._doc,
          id: user._id,
          token,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteUser: async (_, { id }) => {
      if (process.env.NODE_ENV !== "test")
        throw new Error("This is only for test environment");

      try {
        await User.deleteOne({ id: id });

        return "User deleted successfully";
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

export default userResolver;
