import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // check both headers
    let token = req.header("token") || req.header("Authorization");

    // if it’s in "Bearer <token>" format, split it
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorised Login Again" });
    }

    // verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: err.message });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export default authMiddleware;
