const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    password:{type:String,required:true},
    field:{type:String,required:true},
    age:{type:String,required:true},
    experience:{type:String,required:true}
})

module.exports = mongoose.model('User',UserSchema)