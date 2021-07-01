const express = require('express');
const router = express.Router();
const { dashboard, blog } = require('../../controllers/admin/dashboard');

router.route('/').get(dashboard).post(dashboard);
router.route('/blog').get(blog).post(blog).put().delete();

module.exports = router;