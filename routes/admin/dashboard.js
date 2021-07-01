const express = require('express');
const router = express.Router();
const { dashboard, blog, modelCRUD } = require('../../controllers/admin/dashboard');

router.route('/').get(dashboard).post(dashboard);

router.route('/:modelName').get(modelCRUD).post(modelCRUD);
router.route('/:modelName/:modelId').get(modelCRUD).put(modelCRUD).delete(modelCRUD);

router.route('/blog').get(blog).post(blog);
router.route('/blog/:blogId').get(blog).put(blog).delete(blog);

module.exports = router;