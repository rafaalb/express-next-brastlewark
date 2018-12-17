const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
const policyModel = require('../models/policies');

module.exports = {
  authenticate: (req, res) => {
    const { email } = req.body;
    userModel.findOne({ email }, (err, user) => {
      if (!user || err) {
        return res.status(400).json({ msg: 'Bad Request: User not found' });
      }
      const token = jwt.sign({ id: user._id }, req.app.get('secretKey'), { expiresIn: '12h' });
      return res.json({ status: 'success', data: { user, token } });
    });
  },
  getUsers: async (req, res, next) => {
    userModel.find({}, (err, users) => {
      if (err) {
       return next(err);
      }
      return res.json({ status: 'success', data: users });
   });
  },
  getUser: async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findOne({ id });
    if (user) return res.json({ status: 'success', data: user });
    return res.status(400).json({ status: 'error', message: 'No user found with this id' });
  },
  getUserByPolicyId: async (req, res) => {
    const { policyId } = req.params;
    const policy = await policyModel.findOne({ id: policyId });
    if (policy && policy.clientId) {
      const user = await userModel.findOne({ id: policy.clientId });
      if (user && user.id) {
        return res.json({ status: 'success', data: user });
      }
      return res.status(400).json({ status: 'error', message: 'No policy found with this id' });
    }
    return res.status(400).json({ status: 'error', message: 'No policy found with this id' });
  },
};
