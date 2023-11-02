import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'; 
import Tasks from './components/Tasks';
import EditTask from './components/EditTask'
import SignUP from './components/Signup'
import Header from "./components/Header"




import './App.css';


function App() {
  return (
    <BrowserRouter>
        <Header/>

      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path='/tasks/:id' element={<EditTask/>}/>
          <Route path='/signup' element={<SignUP/>}/>

        <Route/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;