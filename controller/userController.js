const bcrypt = require('bcryptjs')
const jwt = require('../utils/jwt')
const User = require('../model/userModel')


const authController = {
    async signup (req,res){
        try{
            const {name,email,password,phone,field,age,experience} = req.body;
            if (!name||!email||!password||!phone||!field||!age ||!experience){
              return res.status(400).json({message:"all fields required"})
            }
            // Check if the user already exists
            const exitingUser = await User.findOne({email});
            if (exitingUser)
            {
                return res.status(400).json({message:"email already exist"})
            }
              // Hash the password
              const salt = await bcrypt.genSalt(10);
              const hashPaswd = await bcrypt.hash(password,salt)
              //create user
              const newUser = new User({
                name,
                email,
                password:hashPaswd,
                phone,
                field,age,experience
              })
              await newUser.save()
             
              const token = jwt.sign(req.body)
              res.json({token})
        }
        catch(error){
                res.status(500).json({message:"internal server error",error:error.message})
        }
        
    },
    async login(req,res){
      try{
        const {email,password} = req.body;
        
        //find user
        const user = await User.findOne({email})
        console.log(user)
        if(!user){
            return res.status(400).json({message:"invalid email or password"})
        }
        //compare password
        const isPaswd = await bcrypt.compare(password, user.password);
        if(!isPaswd)
        {
            return res.status(400).json({message:"wrong password"})
        }
        //generate jwt
        const token = jwt.sign(req.body)
        res.json({token})
      } 
      catch(error)
      {
        return res.status(500).json({message:"internal server error",error:error.message})
      }     
    },
    async getUser(req,res){

      // if(!req.userId){
      //   return res.status(401).json({ message: 'Please login first' });
      // }
      const users = await User.find();
      // const transformedUsers = users.map(user => user.toJSON());
    
      return res.status(200).json(users);
    }
  
}
module.exports = authController