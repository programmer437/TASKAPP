import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'; 

import './App.css';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route path="/tasks" element={<Tasks />} /> */}
        <Route path="/login" element={<Login />} />
       
        <Route/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
