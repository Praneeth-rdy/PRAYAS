const express = require('express');
const router = express.Router();

const { login, logout, dashboard } = require('../controllers/admin');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth')

router.route('/login').get(isNotLoggedIn, login);
router.route('/login').post(isNotLoggedIn, login);

router.route('/logout').get(isLoggedIn, logout);

router.route('/dashboard').get(isLoggedIn, dashboard);

module.exports = router;