const express = require('express');
const router = express.Router();

const { home } = require('../controllers/base');

router.route('/').get(home);
// router.route('/projects').post(projects);


module.exports = router;