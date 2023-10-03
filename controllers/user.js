const User=require("../model/user");
const jwt = require('jsonwebtoken');

const signup= async (req,res)=>{
    try {
        const user= await User.create(req.body);
        res.status(201).json(user);
        
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error (e.g., email already exists)
            res.status(400).json({ error: 'User already exists.' });
          } else {
            // Handle other errors
            res.status(500).json({ error: 'An error occurred.' });
          }
    }
}
const login= async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user= await User.findOne({email});
        if(!user){
            return res.status(404).json({error: "Account not dound"});
        }
        if(user.email == email && user.password==password)
        {
            const payload = {
                user: user.id // Assuming user.id is the MongoDB ObjectId
              };
            const token = jwt.sign(payload, process.env.SECRATE_KEY, {
                expiresIn: '1h', // Token expiration time
            });
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 *60*60, // 1 hour
              });
              
              
            res.status(201).json({ token, msg: 'Log in Successful' });
        }else{
        res.status(401).json({error:"Check your password or email"});
        }
    } catch (error) {
        res.status(500).json({msg:error});
    }
}
const deleteUser=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user= await User.findOne({email});
        if(!user){
            return res.status(404).json({error: "Account not dound"});
        }
        if(user.email == email && user.password==password)
        {
        const user= await User.findOneAndDelete({email});
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
        res.cookie('token', '', { maxAge: 0, httpOnly: true });
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