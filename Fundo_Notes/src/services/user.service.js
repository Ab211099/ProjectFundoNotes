import User from '../models/user.model';
import * as utils from '../utils/user.util';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};


//login user
export const loginuser = async (body) => {
  const data = await User.findOne({ EmailId: body.EmailId });
  if (data !== null) {
    const result = await bcrypt.compare(body.password, data.password);
    if (result) {
      var token = jwt.sign(
        { EmailId: data.EmailId, _id: data._id },
        process.env.SECRET_KEY
      );
      return token;
    } else {
      throw new Error('password is invalid');
    }
  } else {
    throw new Error('email is Invalid');
  }
};

//registration new user
export const RegisterNewUser = async (body) => {
  const saltRounds = 10;
  const hashpassword = await bcrypt.hash(body.password, saltRounds);
  body.password = hashpassword;
  const data = await User.create(body);
  return data;
};

//Forgot Password
export const forgotPassword=async(body)=>{
  const data=await User.findOne({EmailId:body.EmailId});
  if(data!==null){
    var token=jwt.sign(
      {id:data._id,EmailId:data.EmailId},process.env.SECRET_KEY
    );
    utils.sendmail(body.EmailId);
    return token;
  }else{
    throw new Error('invalid Emailid');
  }
}

//reset the password
export const resetPassword=async(body)=>{
  const saltRounds=10;
  const hashPassword=await bcrypt.hash(body.password,saltRounds);
  body.password=hashPassword;
  const data=await User.findOneAndUpdate(
    {EmailId:body.Emailid},
    body,
    {
      new:true
    }
  );
  return data;
};
