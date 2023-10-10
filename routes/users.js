const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const tasks = require('../routes/tasks');

const { login, signup, deleteUser,logout } = require('../controllers/user');
// User-related routesG
router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/delete').post(deleteUser);
router.route('/logout').get(logout)


module.exports = router;
