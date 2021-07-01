const express = require('express');
const router = express.Router();
const { dashboard } = require('../../controllers/admin/dashboard');

router.route('/').get(dashboard).post(dashboard);

module.exports = router;