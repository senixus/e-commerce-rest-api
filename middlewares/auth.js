const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

const isTokenIncluded = (req) => {
  return (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
  );
};

const getToken = (req) => {
  const authorization = req.headers.authorization;

  const accessToken = authorization.split(" ")[1];
  return accessToken;
};

const verifyToken = (req, res, next) => {
  if (!isTokenIncluded(req)) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "No token provided",
    });
  }

  const token = getToken(req);

  if (token) {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: "Unauthorized",
        });
      }

      req.user = {
        ...decoded,
        access_token: token,
      };

      next();
    });
  } else {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

const setToken = (user) => {
  const payload = {
    id: user._id,
    name: user.firstName,
    isAdmin: user.isAdmin,
  };
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: "1h",
  });

  return token;
};

const sendToken = (user, res, status) => {
  const token = getToken(user);

  return res.status(status).json({
    success: true,
    token,
    data: user,
  });
};

const checkIsAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
    });
  }
  next();
};

module.exports = {
  verifyToken,
  getToken,
  setToken,
  sendToken,
  checkIsAdmin,
};
