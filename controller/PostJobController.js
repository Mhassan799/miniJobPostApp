const PostJob = require('../model/PostJob');
const post = require('../model/PostJob')

const authController = {
    async CreateJob (req,res){
        try{
            const {jobTitle,salary,location,jobtype,experience} = req.body;
            if (!jobTitle||!salary||!location||!jobtype||!experience){
              return res.status(400).json({message:"all fields required"})
              
            }
            const data = await post.findOne({jobTitle,salary,location,jobtype,experience})
            if(data){
              return res.status(400).json({messege:"these feilds are already posted"})
            }
          
            
              //create Job
              const newUser = new post({
                jobTitle,
                salary,
                location,
                jobtype,
                experience
              })
              await newUser.save()
             
              // const token = jwt.sign(req.body)
              res.json({newUser})
        }
        catch(error){
                res.status(500).json({message:"internal server error",error:error.message})
        }
        
    },
   
    async getJobs(req,res){
      const users = await post.find();
      // const transformedUsers = users.map(user => user.toJSON());
    
      return res.status(200).json(users);
    }
  
}
module.exports = authController