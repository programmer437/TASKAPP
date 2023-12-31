
const Task=require('../model/tasks');

const getAllTasks= async (req,res)=>{
    try {
        
        const  tasks= await Task.find({ user: req.user});
        res.status(201).json({tasks});

    } catch (error) {
        res.status(500).json({msg :error});
        
    }
}
const createTask= async (req,res)=>{
    try {
        if(req.body.name.length>20){
            return res.status(400).json({msg:"Name cannot be more than 20 characters"});
        }
        const task= await Task.create({ ...req.body, user: req.user  });
    
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({msg :error})
        
    }
    
}
const getTask= async (req,res)=>{
    
    try {
        const {id: taskID}=req.params;
        const task= await Task.findOne({_id:taskID});
        if(!task){
            return res.status(404).json({msg:`NO TASK FOUND WITH ID ${taskID}`});
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg:"Something went wrong"});
        
    }
}
const updateTask= async (req,res)=>{
    try {
        const { id: taskID } = req.params
            

        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true,
        })

        if (!task) {
            return next(createCustomError(`No task with id : ${taskID}`, 404))
        }

    res.status(200).json({ task, msg: 'Task updated successfully'  })
        
    } catch (error) {
        res.status(500).json({msg:error});
        
    }
            
}
const deleteTask= async (req,res)=>{
    try {
        const {id: taskID}=req.params;
        const task= await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return res.status(404).json({msg:`NO TASK FOUND WITH ID ${taskID}`});
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg:error});
        
    }
}




module.exports={
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}