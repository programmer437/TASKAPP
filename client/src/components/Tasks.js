import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../css/Tasks.css';
import TaskList from './TaksList/TaskList'
import Logout from './authHandlers/logOutHandle';
import { useDispatch, useSelector } from 'react-redux';
import IsnotLoggedIn from './IsnotLoggedIn';






export default function Dashboard() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const notify = (msg) => toast.success(msg);
    const errors = (msg) => toast.error(msg);

  const dispatch= useDispatch();

  
  const history = useNavigate();

  const [input, setInput] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/tasks', {
          withCredentials: true,
        });

        if (response.status === 201) {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  });

  if (!data) return null;



  

  

  async function handleCreateTask(e) {
    const formData = {
      name: input,
      completed: false,
    }

    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/tasks', formData, {
        withCredentials: true,
      });
      if (response.status === 201) {
        notify('Task Created Successfully');
        setInput('');

      }
    } catch (error) {
      console.log(error);
      errors(error.response.data.msg);

    }
  }

  const handleChange = ((e) => {
    setInput(e.target.value);
  })

    const handleTaskDelete = (value) => {
      notify(value);
    };


  return (
    isLoggedIn ? (<section className='vh-100'>
    <div className='container h-100'>
      <div className='createTaskContainer row d-flex align-items-center justify-content-center h-100'>
          <div className='logout'>
            <Logout history={history} dispatch={dispatch}/>
            
          </div>
          <div className='createTask d-flex flex-column justify-content-center align-items-center col-xl-6 col-md-10 col-sm-11 col-10 '>
            <p className='taskTitle'>Task Manager</p>
            <div className='inputField'>
              <input
                type='text'
                name=""
                value={input}
                onChange={handleChange}
                placeholder='e.g. wash dishes'
              />
              <button onClick={handleCreateTask} className='btn  text-center rounded-0'>Create Task</button>
            </div>
            <Toaster />

          </div>
        
        <div className='taskContainer h-50 d-flex flex-column align-items-center '>
        <TaskList 
        tasks={data.tasks}
        handleTaskDelete={handleTaskDelete}
        history={history}
         />
        </div>
      </div>
    </div>
  </section>) : <IsnotLoggedIn />
  
  );
}
