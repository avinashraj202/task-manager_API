const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const UserSchema = mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim : true
    },
    email:{
        type : String,
        unique : true ,
        required : true,
        trim : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Inputed!");
            }
        }
    },
    password:{
        type : String,
        required: true,
        trim : true,
        validate(value){
            if(value.length < 6){
                throw new Error("Password Should be more than 6 character!")
            }
            else if(value.toLowerCase() == "password"){
                throw new Error("Password cannot be Password")
            }
        },
    },
    age:{
        type : Number,
        required : true
    }
});


UserSchema.pre("save", async function(next){
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

module.exports = mongoose.model('User',UserSchema);