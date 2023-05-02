import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Home from './components/Home';
import KycForm from "./components/KycForm";
import Booking from "./components/Booking";
import DefenseOps from "./components/DefenseOps";
import UniversityOps from "./components/UniversityOps";
import Navbar from "./components/Navbar";
// import CompleteMerkleTree from './components/MerkleTree';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar/>}/>
        <Route path="/kyc" element={<KycForm />} />
        <Route path="/defense" element={<DefenseOps />} />
        <Route path="/university" element={<UniversityOps />} />
        <Route path="/booking" element={<Booking />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
