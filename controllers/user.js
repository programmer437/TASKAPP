const User=require("../model/user");
const jwt = require('jsonwebtoken');
const Tasks=require('../model/tasks')
const {hashPassword,comparePassword}=require('../middlewares/passwordHash')

const signup= async (req,res)=>{
    try {
        const {email,password}=req.body;
       
        if(!email || !password){
            return res.status(400).json({msg:"Please provide email and password"});
        }
        const userExist=await User.findOne({email});
        if(userExist){
            return res.status(400).json({msg:"User already exists"});
        }
        const hashedpassword= await hashPassword(password);
        await User.create({email,password:hashedpassword});
        res.status(201).json({
            msg:"User created succesfully"});
        
    } catch (error) {
       
            // Handle other errors
            res.status(500).json({ error: 'An error occurred.' });
    }
}
const login= async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user= await User.findOne({email});
        if(!user){
            return res.status(404).json({msg: "User Does not exist"});
        }

        const passwordOk= await comparePassword(password,user.password) ;
        if(!passwordOk){
            return res.status(404).json({msg:"Check your password or email"});
        }

        
            
            const payload = {
                user: user.id // Assuming user.id is the MongoDB ObjectId
              };
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: '1h', // Token expiration time
            });
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 *60*60, // 1 hour
              });
              
              
            res.status(201).json({ token, msg: 'Log in Successful' });
        
    } catch (error) {
        res.status(500).json({msg:"An error occured"});
    }
}
const deleteUser=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user= await User.findOne({email});
        if(!user){
            return res.status(404).json({error: "Account not dound"});
        }
        if(comparePassword(user.password,password))
        {
        await Tasks.deleteMany({user: user._id});
        await User.findOneAndDelete({email});
        res.cookie('token', '');
        res.status(201).json({msg: "user deleted succesfully"});
        }else{
        res.status(401).json({error:"Check your password or email"});
        }
        
        
    } catch (error) {
        res.status(500).json({msg:error});
    }

}
const logout= (req,res)=>{
    try {
        // Clear the token cookie by setting it to an empty string and expiring it immediately
        res.cookie('token', '');
        res.status(200).json({ msg: 'Logged out successfully' });
      } catch (error) {
        // Handle any potential errors that might occur during the logout process
        console.error(error);
        res.status(500).json({ error: 'An error occurred during logout' });
      }
}


module.exports={
    signup,
    login,
    deleteUser,
    logout
};