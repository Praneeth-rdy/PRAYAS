const express = require('express');
const router = express.Router();

const { index, login } = require('../../controllers/api/kmc')

router.route('/').get(index);
router.route('/login').get(login);
// router.route('/projects').post(projects);


module.exports = router;