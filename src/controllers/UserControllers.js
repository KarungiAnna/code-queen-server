import User from '../models/User'
import sendEmail from '../utils/email'
const crypto = require('crypto');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
require("dotenv").config();

//register  user
const createUser = async(req, res) => {
    const { firstname, lastname, username, email, password} = req.body;
    try{
      const user = new User({ firstname, lastname, username, email, password});
      await user.save();
      res.render('signup',{ successMessage: "Signup successful" });
    } catch (error) {
      
    }
   
};
//login a user
const loginUser = async(req, res) => {
   const { username, password } = req.body;
   //console.log({username, password});
   try{ 
   const user = await User.login(username , password);
    req.session.isAuth = true;
    res.redirect('profile');
     
  } catch (error) {
    res.render('login', { errorMessage: "Error: Incorrect login credentials" });
    
    console.log(error);
  }
};


//forgot and reset password
const forgotPassword = async(req, res, next) => {
//1)get user based on posted Email

const user = await User.findOne({ email: req.body.email }); 

if(!user) {
 return res.render('forgotpassword', {errorMessage: 'Error: User not found' })
};

//2)generate the random reset token
const resetToken = user.createPasswordResetToken();
await user.save({ validateBeforeSave: false});

//3)send it to user's email
const resetURL = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
const message = `Forgot your password? submit a PATCH request with your new password and passwordConfirm to: ${resetURL}\n
If you didn't forget your password, please ignore this email`;

try{
await sendEmail({
  email: user.email,
  subject: 'Your password reset token( valid for 10 mins)',
  message
});
return res.render('forgotpassword', { successMessage: "Success: Reset Token sent to Email" })

} catch(error) {
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save({validateBeforeSave: false});
 
  return  res.render('forgotpassword', { errorMessage: "Error: There was an error sending the email. Try again later!" })
}
}
const resetPassword = async(req, res, next) =>{
 //Get user based on the token
 const hashedToken = crypto
 .createHash('sha256')
 .update(req.params.token)
 .digest('hex');
 const user = await User.findOne({passwordResetToken : hashedToken, passwordResetExpires: {$gt: Date.now() }
});
 
 //If token has not expired, and there is user, new password
 if(!user) {
  return res.render("resetpassword",{
    token: req.params.token,
    errorMessage: 'Error: User not found'
   });
  
 }
 user.password = req.body.password;
 user.confirmPassword = req.body.confirmPassword;
 user.passwordResetToken = undefined;
 user.passwordResetExpires = undefined;
 
 await user.save();
 console.log(user)
  //Send successful password reset email 
try{
await sendEmail({
  email: user.email,
  subject:'Password Reset Successful' ,
  message: `Congratulations! Your password reset was successful.`  
});
 
res.render("resetpassword",{
  token: req.params.token,
  infoMessage: "Check your email for password change confirmation"
 });
 
} catch(error) {
  return res.render("resetpassword",{
    token: req.params.token,
    errorMessage: 'Error: There was an error sending the email. Try again later!'
   });
 
 
}
}
 //Update changedPasswordAt property for the user
 //Log the user in 
 // res.status(201).send({message: "success"});
 
//}


//Get Homepage
const homePage = (req, res) => {
 res.render('homepage');
}
//Get cohorts page
const cohortsPage = (req, res) => {
  res.render('cohorts');
 }
//Get sign up from browser
const signupPage = (req, res) => {
  res.render('signup');
}
//Get login from browser
const loginPage = (req, res) => {
  res.render('login');
}
//Get forgotpassword
const forgotpasswordPage = (req, res) => {
  res.render('forgotpassword');
}
// Get resetpassword
const resetpasswordPage = async(req, res) => {
  const hashedToken = crypto
  .createHash('sha256')
  .update(req.params.token)
  .digest('hex');
  const user = await User.findOne({passwordResetToken : hashedToken, passwordResetExpires: {$gt: Date.now() }
}); 
res.render("resetpassword",{
  token: req.params.token
 });
 
}



// Get Student profile
const studentProfile = async (req, res) => {
  const user = await req.user;
  req.session.isAuth = true;
  console.log(req.session);
  //console.log(req.session.id);
  res.render('profile');
}
//Get Dashboard
const adminDashboard = async (req, res) => {
  const user = await req.user;
 // req.session.isAuth = true;
 if(user.role !== "admin" && user.role !== "superadmin") {
    return res.status(401).send('Unauthorized')
  }
  return res.status(200).send({message: "Dashboard", user});
}
//Fetch all users
const fetchAllUsers = async (req, res) => {
  const users = await User.find({});
  const user = await req.user;
  if(user.role !== "admin" && user.role !== "superadmin") {
     return res.status(401).send('Unauthorized')
   }
   return res.status(200).send(users);  
}
//Update user
//Delete user

//logout 

export { homePage, cohortsPage,signupPage, createUser, 
 loginPage,
   loginUser, forgotpasswordPage, forgotPassword, resetpasswordPage, resetPassword, studentProfile, adminDashboard, fetchAllUsers}