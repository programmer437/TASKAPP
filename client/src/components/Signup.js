import React from 'react'
import "../css/Signup.css"
import {useState} from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Link} from 'react-router-dom';




export default function Signup() {
  const notify = () => toast.success('Account created successfully');
  const errors = (msg) => toast.error(msg);

  const history=useNavigate();
  const [formData,setFormData]=useState({
    email:'',
    password:''
  })
  const [reenterPassword, setReenterPassword] = useState('');

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChangePassword = (e) => {
    setPasswordsMatch(true);


    setFormData({
      ...formData,
      password:e.target.value});
  };

  const handleChangeVerifyPassword = (e) => {
    const enteredReenterPassword = e.target.value;
    setReenterPassword(enteredReenterPassword);
    if (formData.password === enteredReenterPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password===reenterPassword) {
      
      try {
        const response=await axios.post("http://localhost:3001/api/v1/users/signup",formData,{withCredentials:true});
        if(response.status===201){
          
          notify();
          setTimeout(() => {
            history('/login');
          }, 2000);
        }
      } catch (error) {
        
        errors(error.response.data.msg);


        
      }
    }
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      email:e.target.value
    })
    
    
  };
  


  

  return (
    <section className='signUpSection h-100 w-100'>
      <div className="signUpContainer">
        <form onSubmit={handleSubmit} className='signUpForm  col-10 col-sm-6 col-md-5 col-lg-5 col-xl-4 '>
          <p>Don't have an account </p>
          <p>Sign up</p>
             
          <input onChange={handleInputChange} value={formData.email} type="email" name='email' id='email' placeholder='Email Address'/>
          <input type="password"
              onChange={handleChangePassword}
              value={formData.password}
              minLength="6"  
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" 
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters" 
              name='password' 
              id='password' 
              placeholder='Create Password'/>
          <input type="password" 
              onChange={handleChangeVerifyPassword}
              value={reenterPassword}
              minLength="6"  
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" 
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters" 
              name='verifyPassword' 
              id='verifyPassword' 
              placeholder='Reenter Password'/>
              {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}
              <Toaster toastOptions={{duration:2000}}/>


          <button className='signUpBtn   '>Sign Up</button>
          <p>Already have an account <Link to="/login">Sign in</Link></p>
        </form>
      </div>

    </section>
  )
}
