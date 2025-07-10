const { verifyToken } = require('../config/jwt');
const { prisma } = require('../config/database');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided'
      });
    }

    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true, isActive: true }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token or user not active'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Token verification failed'
    });
  }
};

module.exports = { authenticate };
