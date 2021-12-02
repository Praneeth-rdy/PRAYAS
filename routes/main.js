const express = require('express');
const router = express.Router();

const { home, about, projects, members, gallery, blog, contact, kmc, kmcReferral, temp, upload, getKmcReferral } = require('../controllers/main');
const uploadMiddleware = require('../middleware/uploadFile');

router.route('/').get(home);
router.route('/about').get(about);
router.route('/projects').get(projects);
router.route('/members').get(members);
router.route('/gallery').get(gallery);
router.route('/blog/').get(blog);
router.route('/blog/:blogId/').get(blog);
router.route('/contact').get(contact);
router.route('/kmc').get(kmc);
router.route('/kmc/referral').get(kmcReferral);
router.route('/kmc/getKmcReferral').get(getKmcReferral);

// Testing routes
router.route('/temp').get(temp);
router.route('/upload').get(upload).post(uploadMiddleware.any(), upload);
// router.route('/blog').get(blog);
// router.route('/projects').post(projects);


module.exports = router;