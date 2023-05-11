import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Navbar from "./Navbar";
import { verifyStudentFromKey } from "../data_providers/university_data_provider";
import { verifyEmployeeFromKey } from "../data_providers/defense_data_provider";
import { Grid, Typography } from "@mui/material";
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
  const [status, setStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const bookingHandleClick = () => {
    if (!status) {
      return;
    }
    setBookingMessage(true);
  };

  const calculateFare = async () => {
    if (data.source === "" || data.destination === "" || data.rootId === "") {
      return;
    }
    setStatus(false);
    setBookingMessage(false);
    const start = coords[data.source],
      end = coords[data.destination];
    const distance = end > start ? end - start : start - end;
    let fare = distance,
      eligibleConcession = "";
    if (data.concession === "STUDENT") {
      const verificationStatus = await verifyStudentFromKey(data.rootId);
      console.log(verificationStatus);
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
    setStatus(true);
    setData({
      ...data,
      fare: fare,
      distance: distance,
      eligibleConcession: eligibleConcession,
    });
  };
  return (
    <div
      style={{
        backgroundColor: "gray",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Navbar />
      <div
        style={{
          width: "40%",
          backgroundColor: "#ffffff",
          padding: "25px",
          borderRadius: "10px",
          marginLeft: "50vw",
          marginTop: "22em",
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
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} item>
              <TextField
                required
                name="source"
                value={data.source}
                onChange={handleChange}
                select
                label="Source"
                fullWidth="true"
              >
                <MenuItem value="Kurukshetra">Kurukshetra</MenuItem>
                <MenuItem value="Chandigarh">Chandigarh</MenuItem>
                <MenuItem value="Delhi">Delhi</MenuItem>
              </TextField>
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                required
                name="destination"
                value={data.destination}
                onChange={handleChange}
                select
                label="Destination"
                fullWidth="true"
              >
                <MenuItem value="Kurukshetra">Kurukshetra</MenuItem>
                <MenuItem value="Chandigarh">Chandigarh</MenuItem>
                <MenuItem value="Delhi">Delhi</MenuItem>
              </TextField>
            </Grid>
          </Grid>
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
