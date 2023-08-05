const express = require('express');
const router = express.Router();
const {
    authenticateUser,
    authorizePermissions,
  } = require('../middleware/authentication');

const { register, login,logout,verfiyEmail,showCurrentUser,resetPassword,getAllUsers,forgotPassword} = require('../controllers/authController');
router
  .route('/')
  .get(authenticateUser, authorizePermissions('admin'), getAllUsers);
router.route('/register').post(register);
router.post('/login', login);
router.delete('/logout',authenticateUser, logout)
router.post('/verify-email', verfiyEmail); // callled by the frongend
router.get('/showMe',authenticateUser, showCurrentUser);
router.route('/reset-password').patch(authenticateUser, resetPassword)
router.post('/forgot-password', forgotPassword);


module.exports = router;
