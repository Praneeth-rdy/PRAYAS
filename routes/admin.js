const express = require('express');
const router = express.Router();
const dashboardRouter = express.Router();

const { login, logout, dashboard } = require('../controllers/admin');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth')


// Auth Routes
router.route('/login').get(isNotLoggedIn, login).post(isNotLoggedIn, login);
router.route('/logout').get(isLoggedIn, logout);


// Dashboard Routes
dashboardRouter.route('/').get(dashboard).post(dashboard);

router.use('/dashboard', isLoggedIn, dashboardRouter);

module.exports = router;