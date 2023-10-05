import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Import your Home component
// Import your other components (e.g., Tasks, Login) here
import './App.css';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Define your other routes here */}
        {/* Example:
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/login" element={<Login />} />
        */}
        <Route/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
