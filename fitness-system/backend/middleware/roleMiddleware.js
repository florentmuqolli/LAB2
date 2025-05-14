exports.requireRole = (role) => {
    return (req, res, next) => {
      if (req.memberRole !== role) {
        return res.status(403).json({ error: `Requires ${role} role` });
      }
      next();
    };
  };