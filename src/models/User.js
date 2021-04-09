const crypto = require('crypto');
import mongoose from "mongoose";
const validator = require('validator')
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
       required: true,
       lowercase: true,
       validate: value => {
           if(!validator.isEmail(value)){
               throw new Error({error: 'Invalid Email address'})
           }
       }
    },
    role:{
        type: String,
       default: "student",
        enum: ["student", "admin", "superadmin"]
    },
    password: {
        type: String,
        required: true
        
    },
    confirmPassword: {
        type: String,
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: "passwords don't match"       
        } 
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
});

userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')){
     user.password = await bcrypt.hash(user.password, 8)
    }
    //delete passwordConfirm
    this.confirmPassword = undefined;
    next();
});

userSchema.pre('save', function(next) {
    if(!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.changedPasswordAfter = function(timestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000, 10
        );
        return timestamp < changedTimestamp;
    }
    //false means not changed
    return false;
};

// static method to login user
userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    if (user) {
      const  isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
      
        return user;
        
      }
      throw Error('incorrect password'); 
    }
    throw Error('incorrect username');
    
  };

  userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
  .createHash('sha256')
  .update(resetToken)
  .digest('hex');
  console.log({resetToken}, this.passwordResetToken);
  
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
  }
const User = mongoose.model('User', userSchema);
export default User;