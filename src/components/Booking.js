import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Navbar from "./Navbar";
import { verifyStudentFromKey } from "../data_providers/university_data_provider";
import { verifyEmployeeFromKey } from "../data_providers/defense_data_provider";
import { Typography } from "@mui/material";
const Booking = (props) => {
  const coords = { Chandigarh: 0, Kurukshetra: 50, Delhi: 200 };

  const [data, setData] = useState({
    rootId: "",
    source: "",
    destination: "",
    concession: "",
    eligibleConcession: "",
    distance: 0,
    fare: 0,
  });

  const [bookingMessage, setBookingMessage] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const bookingHandleClick = () => {
    setBookingMessage(true);
  };

  const calculateFare = async () => {
    setBookingMessage(false);
    const start = coords[data.source],
      end = coords[data.destination];
    const distance = end > start ? end - start : start - end;
    let fare = distance,
      eligibleConcession = "";
    if (data.concession === "STUDENT") {
      const verificationStatus = await verifyStudentFromKey(data.rootId);
      console.log(verificationStatus);
      // const currentUser = localStorage.getItem("currentUser");
      // const rollNo = JSON.parse(localStorage.getItem(currentUser))["rollNo"];
      // const students = JSON.parse(localStorage.getItem("students"));
      if (verificationStatus) {
        fare = (fare * 9) / 10;
        eligibleConcession = "STUDENT";
      } else {
        eligibleConcession = "";
      }
    } else if (data.concession === "DEFENSE") {
      const empData = await verifyEmployeeFromKey(data.rootId);
      console.log(empData);
      if (empData.empId !== "") {
        eligibleConcession = "DEFENSE";
        switch (empData.empRank) {
          case "0":
            fare = (fare * 85) / 100;
            break;
          case "1":
            fare = (fare * 80) / 100;
            break;
          case "2":
            fare = (fare * 75) / 100;
            break;
          default:
            break;
        }
      } else {
        eligibleConcession = "";
      }
    }
    setData({
      ...data,
      fare: fare,
      distance: distance,
      eligibleConcession: eligibleConcession,
    });
  };
  return (
    <div style={{ backgroundColor: "gray", height: "100vh", overflow: "auto" }}>
      <Navbar />
      <div
        style={{
          width: "30%",
          backgroundColor: "#eee",
          boxShadow: "0px 0px 50px #111",
          padding: "30px",
          borderRadius: "20px",
          marginLeft: "50vw",
          marginTop: "50vh",
          transform: "translate(-50%, -50%)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            name="rootId"
            onChange={handleChange}
            type="text"
            variant="standard"
            value={data.rootId}
            label="Root ID"
            placeholder="Enter your Root ID"
          />
          <br />
          <br />
          <label htmlFor="source">Enter Your Source</label>
          <br />
          <Select
            style={{ marginTop: "10px" }}
            id="source"
            value={data.source}
            onChange={handleChange}
            name="source"
          >
            <MenuItem value="Kurukshetra">Kurukshetra</MenuItem>
            <MenuItem value="Chandigarh">Chandigarh</MenuItem>
            <MenuItem value="Delhi">Delhi</MenuItem>
          </Select>
          <br />
          <label htmlFor="destination">Select Your Destination</label>
          <br />
          <Select
            style={{ marginTop: "10px" }}
            value={data.destination}
            onChange={handleChange}
            name="destination"
            id="destination"
          >
            <MenuItem value="Kurukshetra">Kurukshetra</MenuItem>
            <MenuItem value="Chandigarh">Chandigarh</MenuItem>
            <MenuItem value="Delhi">Delhi</MenuItem>
          </Select>
          <br />
          <br />
          <label htmlFor="concession">
            Are you eligible for any concession?
          </label>
          <br />
          <input
            style={{ marginTop: "10px" }}
            onChange={handleChange}
            type="radio"
            name="concession"
            value="STUDENT"
          />
          <strong>Student concession</strong>
          <br />
          &nbsp;&nbsp;&nbsp; 10% for university students
          <br />
          <input
            onChange={handleChange}
            type="radio"
            name="concession"
            value="DEFENSE"
          />
          <strong>Defense concession</strong>
          <br />
          &nbsp;&nbsp;&nbsp; 15% for Lieutinant
          <br />
          &nbsp;&nbsp;&nbsp; 20% for Colonel
          <br />
          &nbsp;&nbsp;&nbsp; 25% for Major General
          <br />
          <Button
            onClick={calculateFare}
            style={{ marginTop: "20px" }}
            variant="contained"
          >
            Calculate Fare
          </Button>
          <p> Your Total Distance is: {data.distance}</p>
          <p> Your Total Fare is: {data.fare}</p>
          {data.eligibleConcession === "STUDENT" && (
            <p style={{ color: "darkblue" }}>Eligible for Student Concession</p>
          )}
          {data.eligibleConcession === "DEFENSE" && (
            <p style={{ color: "darkblue" }}>Eligible for Defense Concession</p>
          )}
          <Button variant="contained" onClick={bookingHandleClick}>
            Book Ticket
          </Button>
          <br />
          {bookingMessage && (
            <p style={{ color: "darkblue" }}>Ticket Booked Successfully</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Booking;
