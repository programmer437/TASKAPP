import axios from "axios";
export async function deleteTaskHandle(id,e){
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