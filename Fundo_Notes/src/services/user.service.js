import User from '../models/user.model';
import * as utils from '../utils/user.util';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//login user
export const loginuser = async (body) => {
  const data = await User.findOne({ EmailId: body.EmailId });
  if (data !== null) {
    const result = await bcrypt.compare(body.password, data.password);
    if (result) {
      var token = jwt.sign(
        { EmailId: data.EmailId, id: data._id },
        process.env.SCERET_KEY
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



//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (_id) => {
  const data = await User.findById(_id);
  return data;
};
//Forgot Password
export const forgotPassword=async(body)=>{
  const data=await User.findOne({EmailId:body.EmailId});
  if(data!==null){
    var token=jwt.sign(
      {id:data._id,EmailId:data.EmailId},process.env.SCERET_KEY
    );
    utils.sendmail(body.EmailId);
    return token;
  }else{
    throw new Error('invalid Emailid');
  }
}
