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
    req.id = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ status: "fail", message: "please login first" });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return res.status(403).json({
        status: "fail",
        message: "No permission to perform this action",
      });
    } else {
      next();
    }
  };
};
