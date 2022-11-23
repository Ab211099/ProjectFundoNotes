import express from 'express';
import { userAuthentication  } from '../middlewares/auth.middleware';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';

const router = express.Router();



//routes to register a new user
router.post('/Register', newUserValidator, userController.RegisterNewUser);

//routes to login user
router.post('/logins', userController.loginUser);

//route to get all users
router.get('', userController.getAllUsers);

//route to forgot password
router.post('/forgotPWD',userController.forgotPassword);

//route to reset the password
router.post('/resetPassword',userAuthentication, userController.resetPassword);



export default router;