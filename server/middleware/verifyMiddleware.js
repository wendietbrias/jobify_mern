const jwt = require("jsonwebtoken");

const VerifiyMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const verifyToken = jwt.verify(token, `${process.env.SECRET}`);

  if (!verifyToken) {
    res.status(401).json({ msg: "Invalid token" });
  }

  try {
    req.userId = verifyToken?._id;
    next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = VerifiyMiddleware;
