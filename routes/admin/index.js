const express = require('express');
const router = express.Router();
const dashboardRouter = express.Router();

const { login, logout } = require('../../controllers/admin/index');
const { isLoggedIn, isNotLoggedIn } = require('../../middleware/auth')


// Auth Routes
router.route('/login').get(isNotLoggedIn, login).post(isNotLoggedIn, login);
router.route('/logout').get(isLoggedIn, logout);


// Dashboard Routes
router.use('/dashboard', isLoggedIn, require('./dashboard'));

module.exports = router;