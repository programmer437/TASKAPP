import React from 'react'
import { logout } from '../../app/authSlice';
import axios from 'axios';



export default function logOutHandle({history,dispatch}) {

    async function logOutHandle(e){
        e.preventDefault();
    
        try {
          
          
          const response = await axios.get("http://localhost:3000/api/v1/users/logout",{withCredentials: true});
          if(response.status===200)
          {
            dispatch(logout());
            history('/')
            console.log(logout())
          }
          
        } catch (error) {
          console.log(error);
        }
    
      }
  return (
    <button onClick={logOutHandle} className='btn btn-primary'>Logout</button>
  )
}
