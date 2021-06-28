const express = require('express');
const router = express.Router();

const { home, projects } = require('../controllers/main');

router.route('/').get(home);
router.route('/projects').get(projects);
// router.route('/blog').get(blog);
// router.route('/projects').post(projects);


module.exports = router;