import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);

const JWT_SECRET = 'anand'; 

/**
 * Check if a user exists by email
 * @param {string} email
 * @returns {Promise<boolean>}
 */
const doesUserExist = async (email) => {
  const existingUser = await User.findOne({ where: { email: email } });
  return existingUser;
};

/**
 * Create a new user
 * @param {object} body
 * @returns {Promise<object>}
 */
export const newUser = async (body) => {
  const existingUser = await doesUserExist(body.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  body.password = await bcrypt.hash(body.password, 10);
  const data = await User.create(body);
  return data;
};

/**
 * Login a user
 * @param {object} body
 * @returns {Promise<object>}
 */
export const userLogin = async (body) => {
  const { email, password } = body;

  const user = await doesUserExist(email);
  if (!user) {
    throw new Error('User with this email does not exist');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Incorrect password');
  }

  const token = generateToken(user);

  return { user, token };
};

/**
 * Generate JWT token
 * @param {object} user
 * @returns {string}
 */
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  return token;

  
};
