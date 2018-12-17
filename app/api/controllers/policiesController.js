const userModel = require('../models/users');
const policyModel = require('../models/policies');

module.exports = {
  getPolicies: async (req, res) => {
    const policies = await policyModel.find({});
    if (policies) return res.json({ status: 'success', data: policies });
    return res.status(400).json({ status: 'error', message: 'No policies found' });
  },
  getPoliciesByName: async (req, res) => {
    const { name } = req.params;
    const user = await userModel.findOne({ name });
    if (user) {
      const policy = await policyModel.find({ clientId: user.clientId });
      if (policy) {
        return res.json({ status: 'success', data: policy });
      }
      return res.status(400).json({ status: 'success', data: [] });
    }
    return res.status(400).json({ status: 'error', message: 'No policy found with this id' });
  },
};
