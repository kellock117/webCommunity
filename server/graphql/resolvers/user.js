const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.js");
const { UserInputError } = require("apollo-server");

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

module.exports = {
  Mutation: {
    createUser: async (
      _,
      { registerInput: { id, password, confirmPassword, userName } }
    ) => {
      // check if the user already exists
      const oldUser = await User.findOne({ id: id });
      if (oldUser) {
        throw new UserInputError("id already exists");
      }

      const oldUserName = await User.findOne({ userName: userName });

      if (oldUserName) {
        throw new UserInputError("user name already exists");
      }

      if (password != confirmPassword) {
        throw new UserInputError("passwords dose not match");
      }

      // encrypt the password
      password = await bcrypt.hash(password, 7);

      const user = new User({
        id: id,
        password: password,
        userName: userName,
      });

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
      const match = bcrypt.compare(password, user.password);
      if (!match) throw new UserInputError("wrong password");

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
