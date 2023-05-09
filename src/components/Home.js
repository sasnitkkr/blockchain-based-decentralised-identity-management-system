import React from "react";
import bgImg from "../assets/images/shubham-dhage-JlijbOtSWuw-unsplash.jpg";
import Navbar from "./Navbar";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <div
        style={{ position: "relative", textAlign: "center", color: "white" }}
      >
        <h1
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "cursive",
            backgroundColor: "#2F4994",
          }}
        >
          Blockchain Based Decentralised Identity Verification System
        </h1>
        <img
          src={bgImg}
          alt="Blockchain"
          style={{ width: "100%", height: "95vh" }}
        />
      </div>
    </div>
  );
};
