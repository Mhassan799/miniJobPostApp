const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    jobTitle:{type:String,required:true},
    salary:{type:String,required:true},
    location:{type:String,required:true},
    jobtype:{type:String,required:true},
    experience:{type:String,required:true}
})

module.exports = mongoose.model('Post',UserSchema)