import jwt from "jsonwebtoken";

const auth = context => {
  // context = { ... headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ...
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (error) {
        throw new Error("Invalid/Expired token");
      }
    }
    throw new Error(`Authentication token must be Bearer [token]`);
  }
  throw new Error("Authorization header must be provided");
};

export default auth;
