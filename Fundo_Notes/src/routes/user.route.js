import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//routes to register a new user
router.post('/Register', newUserValidator, userController.RegisterNewUser);

//routes to login user
router.post('/logins', userController.loginUser);

export default router;