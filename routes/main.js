const express = require('express');
const router = express.Router();

const { home, about, projects, members, contact, temp } = require('../controllers/main');

router.route('/').get(home);
router.route('/about').get(about);
router.route('/projects').get(projects);
router.route('/members').get(members);
router.route('/contact').get(contact);
router.route('/temp').get(temp);
// router.route('/blog').get(blog);
// router.route('/projects').post(projects);


module.exports = router;