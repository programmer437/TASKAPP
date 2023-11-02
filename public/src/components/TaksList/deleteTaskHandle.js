import axios from "axios";
export default  async function DeleteTaskHandle({id,e,handleTaskDelete}){
    e.preventDefault();

    try {
      
      const response = await axios.delete(`http://localhost:3000/api/v1/tasks/${id}`,{
        withCredentials: true,
      });
      if (response.status === 200) {
        handleTaskDelete("Task deleted successfully")// Change to 10000 milliseconds (10 seconds)
      }
    } catch (error) {
      console.log(error);
    }

  }