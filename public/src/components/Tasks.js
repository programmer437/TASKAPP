import React,{useEffect,useState}from 'react'
import { AiTwotoneEdit,AiFillDelete } from "react-icons/ai";
import axios from 'axios';
import "../css/Tasks.css";


export default function Dashboard() {
  const [input,setInput]=useState('');
  const [data,setData]=useState(null);
  useEffect(()=>{
    
    async function fetchData(){
    try {
      const response=await axios.get("http://localhost:3000/api/v1/tasks",{withCredentials: true});
      
      if(response.status===201){
         setData(response.data);
        }
    }catch (error) {

      console.error(error);
    }
  }
    fetchData();

  },[]);
  if(!data) return null;

  const taskItems = data.tasks.map((task)=> {
   
    return <div className="taskItem" key={task._id}>
      <p>{task.name}</p> 
      <div className="icons">
        <AiTwotoneEdit />
        <AiFillDelete />
      </div>
      
      </div>
  })
  const handleChange=((e)=>{
    
    setInput(e.target.value)
  })
  console.log(input)

  return(
    <section className='vh-100'>
      <div className='container h-100'>
        <div className='row d-flex bg-light align-items-center justify-content-center h-100'>
          <div className='createTask d-flex justify-content-center align-items-center col-xl-6 col-md-10 col-sm-11 col-10 '>
            <input 
            type='text'
            name=""
            value={input}
            onChange={handleChange}
            />
            <button className='btn btn-dark text-center rounded-0'>Create Task</button>
            
          </div>
          <h2>Your Tasks</h2>
          
          <div className='taskContainer h-50 d-flex flex-column align-items-center '>
          
            {taskItems}
            
          </div>
            
        </div>
      </div>

    </section>
   

  )
}
