const express = require('express');
const router = express.Router();

const { index } = require('../../controllers/api/main');
const kmcRoutes = require('./kmc')

router.route('/').get(index);
router.use('/kmc', kmcRoutes);
// router.route('/projects').post(projects);


module.exports = router;