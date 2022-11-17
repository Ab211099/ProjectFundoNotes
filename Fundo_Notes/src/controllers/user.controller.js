import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getUser = async (req, res, next) => {
  try {
    const data = await UserService.getUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

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
 * Controller to update a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateUser = async (req, res, next) => {
  try {
    const data = await UserService.updateUser(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

  /**
 * Controller to Register New User
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const RegisterNewUser = async (req, res, next) => {
  try {
    const data = await UserService.RegisterNewUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User Registration successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to loginuser a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const loginUser = async (req, res, next) => {
  try {
    const data = await UserService.loginuser(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.Ok,
      data: data,
      message: 'User login successfully'
    });
  } catch (error) {
    next(error);
  }
};
