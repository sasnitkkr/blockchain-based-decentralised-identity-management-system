import { React, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Web3 from "web3";
// import Home from './components/Home';
import KycForm from "./components/KycForm";
import Booking from "./components/Booking";
import DefenseOps from "./components/DefenseOps";
import UniversityOps from "./components/UniversityOps";
import Navbar from "./components/Navbar";
// import CompleteMerkleTree from './components/MerkleTree';
// const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

const App = () => {
  // useEffect(() => {
  //   // web3.eth.getAccounts().then(console.log);
  //   // OnLoadFunctions();
  // }, []);
  const OnLoadFunctions = () => {
    window.addEventListener("load", async () => {
      // Wait for loading completion to avoid race conditions with web3 injection timing.
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          return web3;
        } catch (error) {
          console.error(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        return web3;
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:7545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        return web3;
      }
    });
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/kyc" element={<KycForm />} />
        <Route path="/defense" element={<DefenseOps />} />
        <Route path="/university" element={<UniversityOps />} />
        <Route path="/booking" element={<Booking />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
