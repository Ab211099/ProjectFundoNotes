import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';



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
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
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
      code: HttpStatus.OK,
      data: data,
      message: 'User login successfully'
    });
    
  } catch (error) {
    next(error);
  }
};

/**
controller to authorise the user for forgotten password
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 * */

export const forgotPassword=async(req,res)=>{
  try{
    const data=await UserService.forgotPassword(req.body);
    res.status(HttpStatus.CREATED).json({
      code:HttpStatus.CREATED,
      data:data,
      message:'forgot password successfully'
    });
  }catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      code:HttpStatus.BAD_REQUEST,
      message:`${error}`
    });
  }
};

/**
controller to authorise the user for forgotten password
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 * */
export const resetPassword=async(req,res)=>{
  try{
     const data=await UserService.resetPassword(req.body);
     res.status(HttpStatus.OK).json({
       code:HttpStatus.OK,
       data: data,
       message:'Password reset successfully'
     });
   }catch(error){
     res.status(HttpStatus.BAD_REQUEST).json({
       code:HttpStatus.BAD_REQUEST,
       message:`${error}`
     });
   }
 }

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
