const jwt = require("jsonwebtoken");

const protectRoute = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      
      if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded; // berisi id dan role

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: Insufficient role" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = { protectRoute };

