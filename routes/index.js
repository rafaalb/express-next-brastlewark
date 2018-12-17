const express = require('express');
const validator = require('express-joi-validation')({});
const { loginSchema } = require('../app/lib/joiSchemas');
const userController = require('../app/api/controllers/userController');
const policiesController = require('../app/api/controllers/policiesController');
const AuthService = require('../app/api/services/auth.user');

const router = express.Router();
// get list of users
router.get('/users', AuthService.isAuth, userController.getUsers);
// get user data filtered by user id
router.get('/users/:id', AuthService.isAdmin, userController.getUser);
// generate jwt signed by bcrypt
router.post('/users/auth', validator.body(loginSchema), userController.authenticate);
// get the user linked to a policy number
router.get('/users/policies/:policyId', AuthService.isAdmin, userController.getUserByPolicyId);
// get the list of policies
router.get('/policies', AuthService.isAdmin, policiesController.getPolicies);
// get the list of policies linked to user name
router.get('/policies/users/:name', AuthService.isAdmin, policiesController.getPoliciesByName);

module.exports = router;
