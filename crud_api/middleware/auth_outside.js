const jwt = require("jsonwebtoken");
const config = process.env;
config.TZ= "Asia/Bangkok";

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  // console.log(token);
  if (!token) {
    return res.status(403).send("A token is required");
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    // console.log(decoded);

    req.user = decoded;
  } catch (err) {
    return res.status(401).send(err.message);
  }
  return next();
};
module.exports = verifyToken;
