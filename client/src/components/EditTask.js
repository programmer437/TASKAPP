import { useParams} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import '../css/EditTask.css';
import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';

import axios from 'axios';




export default function EditTask() {
  const notify = (msg) => toast.success(msg);
  const errors = (msg) => toast.error(msg);
  const {id}=useParams();

  const [data,setData]=useState({
    name:'',
    completed:false
  });

  useEffect(()=>{
    async function fetchData(){
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/tasks/${id}`,{
        withCredentials: true,
      }); 
      if(response.status===200){
        const { name, completed } = response.data;

      setData({ name, completed });
      
      }
      
     
      
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchData()
  },[id]);      

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
  };
  const editTaskHandle= async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:3001/api/v1/tasks/${id}`,data,{
      withCredentials: true,
    }); 
    if(response.status===200){
      notify("Task Edited Successfully");

      
    }


    } catch (error) {
      console.log(error);
      errors(error.response.data.msg);
      
    }
  
  }
  

  return (
    <section className='editTaskSection' >
      <div className='editTaskContainer col-sm-10 col-md-8 col-lg-6 col-11'>
        <p className='editTaskHeading'>Edit Task</p>
        <div className='middle'>
          <div className='left'>
            <p>TaskId</p>
            <p>Name</p>
            <p>Completed</p>

          </div>
          <div className='right'>
          <p>{id}</p>
          <input 
            className="text" 
            name="name" 
            type="text"  
            value={data.name} 
            onChange={handleChange}/>
          <input 
            className="input" 
            checked={data.completed} 
            type="checkbox" 
            name="completed" 
            onChange={handleChange}/>
          </div>
        </div>
        <button onClick={editTaskHandle} className='editButton'>Edit</button>
        <Toaster/>
        
      </div>
       
      <Link to="/tasks" className='col-12'><button className='homeButton col-2'>Back to task</button></Link>
      
   

    </section>
  )
}


