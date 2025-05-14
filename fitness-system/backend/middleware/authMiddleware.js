const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.memberId = decoded.id;
    req.memberRole = decoded.role; 
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};