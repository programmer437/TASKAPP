import React from 'react';
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import EditTaskHandle from './editTaskHandle';
import DeleteTaskHandle from './deleteTaskHandle';
import '../../css/TaskList.css';


function TaskList({ tasks, handleTaskDelete, history }) {
  return (
    <div>
      {tasks.map((task) => (
        <div className="taskItem" key={task._id}>
          <p className={task.completed ? "strike" : ""}>{task.name}</p>
          <div className="icons">
            <AiTwotoneEdit onClick={() => EditTaskHandle({ id: task._id, history })} />
            <AiFillDelete onClick={(e) => DeleteTaskHandle({ id: task._id, e, handleTaskDelete })} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
