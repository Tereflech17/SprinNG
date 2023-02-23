const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({ 
    firstName: String, 
    lastName: String,
    photo: {
        type: String,  
        default: '/images/users/default.jpeg'
    },
    username: {type: String, require: true, index:true, unique: true, sparse: true},
    password: {type: String, require: true},
  
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);