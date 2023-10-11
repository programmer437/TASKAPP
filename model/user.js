const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.pre("remove", async function (next) {
    await Task.deleteMany({ user: this._id });
    next();
  });


module.exports=mongoose.model('user',userSchema);