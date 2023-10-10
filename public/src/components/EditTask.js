
import { useParams} from 'react-router-dom';
import '../css/EditTask.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';




export default function EditTask() {
  const {id}=useParams();
  const [data,setData]=useState({
    name:'',
    done:false
  });

  useEffect(()=>{
    async function fetchData(){
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/tasks/${id}`,{
        withCredentials: true,
      }); 
      const {name :taskName,completed}=response.data;
  
      setData({
        name:taskName,
        done:completed
      })
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchData()
  },[id]);      

  const handleNameChange = (e) => {
    setData({
      ...data,
      name: e.target.value,
    });
  };
  const handleCheckboxChange = (e) => {
    setData({
      ...data,
      done: e.target.checked, // Update done based on checkbox state
    });
  };

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
          <input className="text" type="text"  value={data.name} onChange={handleNameChange}/>
          <input className="input" checked={data.done} type="checkbox" name="myCheckbox" onChange={handleCheckboxChange}
/>
          </div>
        </div>
        <button className='editButton'>Edit</button>
        <div></div>
        
      </div>
       
      <button className='homeButton col-2'>Back to task</button>
      
   

    </section>
  )
}


