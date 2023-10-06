import React,{useState} from 'react';
import "../css/Login.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const history=useNavigate();
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    const handleChange=((e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    })

    const handleLogin=(async (e)=>{
        e.preventDefault();
        try {
            const response=await axios.post("http://localhost:3000/api/v1/users/login");
            if(response.status===201)
            {
                history('/dashboard');
            }
            
        } catch (error) {
            console.error(error);
            
        }

    })




    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5"> {/* Added col-xl-5 */}
                        <div className="card bg-dark text-white" style={{ borderRadius: 16 }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Please enter your login and password!</p>
                                    <form onSubmit={handleLogin}>
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="email"
                                                id="typeEmailX"
                                                className="input form-control form-control-lg"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="password"
                                                id="typePasswordX" 
                                                className="input form-control form-control-lg"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                        </div>
                                        <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                                        <button className="login btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                    </form>
                                </div>
                                <div>
                                    <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
