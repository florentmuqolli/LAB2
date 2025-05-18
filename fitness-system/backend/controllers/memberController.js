const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Member = require('../models/Member');

const generateTokens = (memberId, role) => {
  const accessToken = jwt.sign(
    { id: memberId, role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { id: memberId }, 
    process.env.JWT_REFRESH_SECRET, 
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role = 'member' } = req.body;

    const member = await Member.findByEmail(email);
    if (member) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    if (!['member', 'trainer', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const memberId = await Member.create({ 
      name, 
      email, 
      password: hashedPassword,
      role 
    });

    res.status(201).json({ message: 'Registered successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const member = await Member.findByEmail(email);
    
    if (!member || !(await bcrypt.compare(password, member.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = generateTokens(member.id, member.role);
    
    res.cookie('accessToken', accessToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 900000 
    });
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 604800000 
    });

    res.json({ 
      message: 'Logged in successfully',
      role: member.role 
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.headers['x-refresh-token'];
    
    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token provided' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const member = await Member.findById(decoded.id);
    
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    const newAccessToken = jwt.sign(
      { id: member.id, role: member.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 900000 
    });

    res.json({ message: 'Access token refreshed' });
  } catch (error) {
    console.error('Refresh token error:', error.message);
    res.status(403).json({ error: 'Invalid refresh token' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};