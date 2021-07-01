const express = require('express');
const router = express.Router();
const { dashboard, blog } = require('../../controllers/admin/dashboard');

router.route('/').get(dashboard).post(dashboard);
router.route('/blog').get(blog).post(blog);
router.route('/blog/:blogId').get(blog).put(blog).delete(blog);

module.exports = router;