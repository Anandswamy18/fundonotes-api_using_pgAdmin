// import HttpStatus from 'http-status-codes';
// import * as UserService from '../services/user.service';


// /**
//  * Controller to create a new user
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
// export const newUser = async (req, res, next) => {
//   try {
//     const data = await UserService.newUser(req.body);
//     res.status(HttpStatus.CREATED).json({
//       code: HttpStatus.CREATED,
//       data: data,
//       message: 'User created successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// export const userLogin = async (req, res) => {
//   try {
//     const data = await UserService.userLogin(req.body);
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       success: true,
//       message: 'User loggedIn successfully',
//       data: data.user,
//       token: data.token
//     });
//   } catch (error) {
//     res.status(HttpStatus.BAD_REQUEST).json({
//       code: HttpStatus.BAD_REQUEST,
//       message: error.message
//     });
//   }
// };


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

const JWT_SECRET = 'anand'; // Replace with your actual JWT secret
const EMAIL_FROM = 'swamyanand823@gmail.com'; // Replace with your email address
const EMAIL_PASSWORD = 'tikr vjku mzft jaut'; // Replace with your email password or use environment variables

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for user login
 * @param {object} req - request object
 * @param {object} res - response object
 */
export const userLogin = async (req, res) => {
  try {
    const data = await UserService.userLogin(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      success: true,
      message: 'User loggedIn successfully',
      data: data.user,
      token: data.token
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

/**
 * Controller to handle forgot password request
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await UserService.doesUserExist(email);
    if (!user) {
      throw new Error('User with this email does not exist');
    }

    // Generate token with user email and secret
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    // Send reset password email
    // const resetLink = `${req.protocol}://${req.get('host')}/reset-password?token=${token}`;
    const resetLink = `http://localhost:3000/api/v1/reset-password?token=${token}`;

    console.log(resetLink)
    await sendResetPasswordEmail(email, resetLink);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Password reset link has been sent to your email'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle reset password request
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    // Verify and decode token
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;

    // Check if user exists
    const user = await UserService.doesUserExist(email);
    if (!user) {
      throw new Error('User with this email does not exist');
    }

    // Update user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserService.updateUserPassword(email, hashedPassword);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Password reset successful'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Send reset password email using Nodemailer
 * @param {string} email - recipient email
 * @param {string} resetLink - password reset link
 */
const sendResetPasswordEmail = async (email, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_FROM,
      pass: EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: EMAIL_FROM,
    to: email,
    subject: 'Password Reset Link',
    html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`
  };

  await transporter.sendMail(mailOptions);
};
