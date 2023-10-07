import React from 'react';
import { Link} from 'react-router-dom';
import '../css/Home.css';



export default function Home() {
    return (
        <section>
            <div className="home container ">
                <h1>Welcome to the <span className="task">Task app</span> </h1>
                    <h2>Let's begin organizing</h2>
                <div className="buttons">
                    <Link to="/signup"><button>Sign Up</button></Link>
                    <Link to="/login"><button>Login</button></Link>
                        
                </div>    
            </div>    
        </section>
        
    )
}
