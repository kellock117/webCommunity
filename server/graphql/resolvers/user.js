const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.js");
const { UserInputError } = require("apollo-server");

function loginValidCheck(id, password) {
  if (id.trim() == "") throw new UserInputError("invalid id");
  if (password.trim() == "") throw new UserInputError("invalid password");
}

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      password: user.password,
    },
    process.env.SECRET_KEY,
    { expiresIn: "30m" }
  );
}

module.exports = {
  Query: {
    getUsers: async () => {
      const users = await User.find();
      return users;
    },
  },
  Mutation: {
    createUser: async (
      _,
      { registerInput: { id, password, confirmPassword } }
    ) => {
      // check if the user already exists
      const oldUser = await User.findOne({ id: id });
      if (oldUser) {
        throw new UserInputError("id already exists");
      }

      if (password != confirmPassword) {
        throw new UserInputError("passwords dose not match");
      }

      // encrypt the password
      password = await bcrypt.hash(password, 7);

      const user = new User({
        id: id,
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
    },
    login: async (_, { loginInput: { id, password } }) => {
      // valid check
      loginValidCheck(id, password);

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
  },
};
