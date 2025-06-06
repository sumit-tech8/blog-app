import userModel from "../models/usermodel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from 'jsonwebtoken';
import fs from 'fs'


//POST REGISTER ----------------------------------------------

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);

   
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();
    
    res.status(201).send({
      
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};


// // get photo  ----------------------------------------------------
// export const loginPhotoController = async (req, res) => {
//   try {
//     const newblog = await userModel.findById(req.params.pid).select("photo");
//     if (users.photo.data) {
//       res.set("Content-type", users.photo.contentType);
//       return res.status(200).send(users.photo.data);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Erorr while getting photo",
//       error,
//     });
//   }
// };


//POST LOGIN -------------------------------------------------------
export const loginController = async (req,res) =>{
  try {
    const {email,password} = req.body
    //validation
    if(!email || !password){ 
      return res.status(404).send({
        success:false,
        message: 'Invalid email of password'
      })
    }
    //check user
    const user = await userModel.findOne({email})
    if(!user){
      return res.status(404).send({
        success:false,
        message: 'email is not registerd'
      })
    }
    const match = await comparePassword(password,user.password)
    if(!match){
      return res.status(404).send({
        success:false,
        message: 'Invalid password'
      })
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.status(200).send({
      success:true,
      message: 'login successfully',
      user:{
        _id: user._id,
        name:user.name,
        email:user.email,
        // phone:user.phone,
        // address:user.address,
        // role: user.role,
      },
      token,
         })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false, 
      message:'Error in login',
      error
    })
  }
};


// //forgotPasswordController
// export const forgotPasswordController = async (req,res) => {
//   try {
//     const {email,answer,newPassword} = req.body
//     if (!email) {
//       res.status(400).send({message:'Email is required'})
//     }
//     if (!answer) {
//       res.status(400).send({message:'answer is required'})
//     }
//     if (!newPassword) {
//       res.status(400).send({message:'New Password is required'})
//     }
//       //Check
//       const user = await userModel.findOne({email,answer})
//       //validation
//       if (!user) {
//         return res.status(404).send({
//           success:false,
//           message:'wrong email or Answer',
//         })
//       }
//       const hashed = await hashPassword(newPassword)
//       await userModel.findByIdAndUpdate(user._id, { password: hashed });
//       res.status(200).send({
//         success:true,
//         message:'Password Reset Successfully',
//       });
//   } catch (error) {
//     console.log(error)
//     res.status(500).send({
//       success:false,
//       message:'something went wrong',
//       error
//     })
//   }
// }



//test controller -----------------------------------------------
export const testController = (req,res) =>{
  try {
    res.send("protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
}

