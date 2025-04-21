const jwt = require("jsonwebtoken");
exports.auth = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ status: "fail", message: "please login first" });
  }
  try {
    let decoded = jwt.verify(authorization, process.env.SECRET);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ status: "fail", message: "please login first" });
  }
};
