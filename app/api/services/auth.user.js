const jwt = require('jsonwebtoken');
const userModel = require('../models/users');

const AuthService = {
  isAdmin: (req, res, next) => {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), async (err, decoded) => {
      if (err) {
        return res.status(404).json({ status: 'error', message: err.message });
      }
      const { id } = decoded;
      const me = await userModel.findOne({ _id: id });
      if (me && me.role === 'admin') {
        next();
      } else {
        return res.status(403).json({ status: 'error', message: 'Insufficient privileges' });
      }
    });
  },
  isAuth: (req, res, next) => {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), async (err, decoded) => {
      if (err) {
        return res.status(404).json({ status: 'error', message: err.message });
      }
      req.body.userId = decoded.id;
      next();
    });
  }
};

module.exports = AuthService;
