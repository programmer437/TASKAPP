import React, { useState } from 'react';
import "../css/Login.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { login } from '../app/authSlice';




    

export default function Login() {

    const notify = () => toast.success('Login successful');
    const errors = (msg) => toast.error(msg);
    const dispatch=useDispatch();
    const history = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handleChange = ((e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    })

    const handleLogin = (async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.post("http://localhost:3001/api/v1/users/login", formData, { withCredentials: true });
            if (response.status === 201) {
                dispatch(login());
                notify();
                setTimeout(() => {
                    history('/tasks');
                }, 2000);
            }

        } catch (error) {
            console.error(error);
            errors(error.response.data.msg);

        }

    })




    return (
        
        <section className="loginComponent h-100 w-100">
            <div className="loginContainer"> {/* Added col-xl-5 */}
                <form className='loginForm col-10 col-sm-6 col-md-5 col-lg-5 col-xl-4' onSubmit={handleLogin}>
                    <p className='Login'>Login</p>
                    <p className="enterHeading">Please enter Email and password!</p>
                        
                            <input
                                type="email"
                                id="typeEmailX"
                                className="input form-control form-control-lg"
                                name="email"
                                value={formData.email}
                                placeholder='Enter Your Email'
                                onChange={handleChange}
                                required
                            />
                        
                        
                       
                            <input
                                type="password"
                                id="typePasswordX"
                                className="input form-control form-control-lg"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Enter Your Password'
                                required
                            />
                            <Toaster toastOptions={{duration:1700}} />
                    
                        <button className="loginBtn" type="submit">Login</button>
                        <p className=""><a className="" href="#!">Forgot password?</a></p>
                        <p className="signUpLink">Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </form>
                
                
            </div>
            
            
        </section>
        
    )

}
