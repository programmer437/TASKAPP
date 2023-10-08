import React, { useEffect, useState } from 'react';
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Tasks.css';

export default function Dashboard() {
  const history = useNavigate();
  const [taskCreated, setTaskCreated] = useState(false);
  const [taskDelete, setTaskDelete] = useState(false);

  const [input, setInput] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/tasks', {
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
  }, [taskCreated,taskDelete]);

  if (!data) return null;

  function editTaskHandle(id) {
    history(`/tasks/${id}`);
  }

  async function deleteTaskHandle(id,e){
    e.preventDefault();

    try {
      
      const response = await axios.delete(`http://localhost:3000/api/v1/tasks/${id}`,{
        withCredentials: true,
      });
      if (response.status === 200) {
        setTaskDelete(true);
        setTimeout(() => {
          setTaskDelete(false);

        }, 1000); // Change to 10000 milliseconds (10 seconds)
      }
    } catch (error) {
      console.log(error);
    }

  }

  async function handleCreateTask(e) {
    const formData = {
      name: input,
      completed: false,
    }

    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/tasks', formData, {
        withCredentials: true,
      });
      if (response.status === 201) {
        setTaskCreated(true);

        setInput('');
        setTimeout(() => {
          setTaskCreated(false);

        }, 1000); // Change to 10000 milliseconds (10 seconds)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = ((e) => {
    setInput(e.target.value);
  })

  const taskItems = data.tasks.map((task) => {
    return (
      <div className="taskItem" key={task._id}>
        <p>{task.name}</p>
        <div className="icons">
          <AiTwotoneEdit onClick={() => editTaskHandle(task._id)} />
          <AiFillDelete onClick={(e)=> deleteTaskHandle(task._id,e)}/>
        </div>
      </div>
    );
  })
  console.log(taskCreated);


  return (
    <section className='vh-100'>
      <div className='container h-100'>
        <div className='createTaskContainer row d-flex align-items-center justify-content-center h-100'>
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
            {taskCreated && <p className='createdAlert'>Task Created!</p>}
            {taskDelete && <p className='createdAlert'>Task Deleted!</p>}

          </div>

          <div className='taskContainer h-50 d-flex flex-column align-items-center '>
            {taskItems}
          </div>
        </div>
      </div>
    </section>
  )
}
