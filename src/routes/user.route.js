import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { loginValidator } from '../validators/user.validator';

const router = express.Router();



//route to create a new user
router.post('', newUserValidator, userController.newUser);

router.post('/login', loginValidator, userController.userLogin);


router.post('/forgot-password', userController.forgotPassword);

// Route for reset password
router.post('/reset-password', userController.resetPassword);



export default router;
