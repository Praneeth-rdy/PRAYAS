const express = require('express');
const router = express.Router();

const { index, login, userCRUD, getUserInfo } = require('../../controllers/api/kmc');
const { kmcAuthCheck } = require('../../middleware/tokenAuth');

router.route('/').get(index);
router.route('/login').post(login);
router.route('/users').get(userCRUD).post(userCRUD);
router.route('/my-info').get(kmcAuthCheck, getUserInfo);
router.route('/users/:id').get(userCRUD).put(userCRUD).delete(userCRUD)
// router.route('/projects').post(projects);


module.exports = router;