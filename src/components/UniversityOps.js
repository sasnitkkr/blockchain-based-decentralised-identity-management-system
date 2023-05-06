import React, { useState } from "react";
import {
  TextField,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import Navbar from "./Navbar";
import { hashString } from "./../utils/hashUtils";
// import web3 from '../web3';
// import univContract from '../eth/helper/univContract';
import {
  addStudent,
  verifyStudent,
  removeStudent,
} from "../data_providers/university_data_provider";
import { useEffect } from "react";

const UniversityOps = (props) => {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [roll, setRoll] = useState();
  const [verificationStatus, setVerificationStatus] = useState(2);
  const [message, setMessage] = useState();
  const addStudentJS = async () => {
    // console.log(name, age, roll);
    try {
      // setMessage("");
      await addStudent(name, age, roll);
      setName("");
      setAge("");
      setRoll("");
      setMessage("Enrollment Successful");
    } catch (err) {
      console.log(err.message);
      setMessage(err.message);
    }
  };
  const removeStudentJS = async () => {
    // console.log(name, age, roll);
    try {
      // setMessage("");
      await removeStudent(name, age, roll);
      setName("");
      setAge("");
      setRoll("");
      setMessage("Student removed successfully");
    } catch (err) {
      console.log(err.message);
      setMessage(err.message);
    }
  };
  const verifyStudentJS = async () => {
    const status = await verifyStudent(name, age, roll);
    // setErrorMessage("e1");
    console.log("-----------------------");
    console.log(status);
    console.log("-----------------------");
    if (status === true) setMessage("Student enrolled");
    else setMessage("Student not enrolled");
    setName("");
    setAge("");
    setRoll("");
  };

  return (
    <div style={{ backgroundColor: "gray", height: "100vh" }}>
      <Navbar />
      <Typography
        variant="h4"
        align="center"
        style={{ color: "white", paddingTop: "10px" }}
        gutterBottom
      >
        University Operations
      </Typography>
      <Card style={{ maxWidth: 600, margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>
          <form>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField
                  required
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ maxWidth: 600 }}
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  //   fullWidth='true'
                  label="Enter Name"
                  placeholder="Enter Name to add student"
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  required
                  name="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  style={{ maxWidth: 600 }}
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  //   fullWidth='true'
                  label="Enter Age"
                  placeholder="Enter age to add student"
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  required
                  name="roll"
                  type="text"
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                  style={{ maxWidth: 600 }}
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  //   fullWidth='true'
                  label="Enter Roll Number"
                  placeholder="Enter Roll No.to add student"
                />
              </Grid>
              <Grid xs={12} item>
                <Button
                  onClick={addStudentJS}
                  variant="contained"
                  color="primary"
                  //   fullWidth='true'
                  id="fullWidth"
                  fullWidth
                >
                  Enroll Roll Numbers
                </Button>
              </Grid>
              <Grid xs={12} item>
                <Button
                  onClick={removeStudentJS}
                  variant="contained"
                  color="primary"
                  //   fullWidth='true'
                  id="fullWidth"
                  fullWidth
                >
                  Delist Roll Numbers
                </Button>
              </Grid>
              <Grid xs={12} item>
                <Button
                  onClick={verifyStudentJS}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {/* fullwidth='true'> */}
                  Check Enrollment Status
                </Button>
              </Grid>
              {/* {verificationStatus === 1 && (
                <Typography
                  component="p"
                  variant="body2"
                  color="textSecondary"
                  style={{ color: "green" }}
                >
                  Student is enrolled
                </Typography>
              )} */}
              {message && (
                <Typography
                  component="p"
                  variant="body2"
                  color="textSecondary"
                  style={{ color: "blue" }}
                >
                  {message}
                </Typography>
              )}
              {/* {verificationStatus === 0 && (
                <Typography
                  component="p"
                  variant="body2"
                  color="textSecondary"
                  style={{ color: "red" }}
                >
                  Student is NOT enrolled
                </Typography>
              )}
              {errorMessage === "success" && (
                <Typography
                  component="p"
                  variant="body2"
                  color="textSecondary"
                  style={{ color: "green" }}
                >
                  Student enrollment successful
                </Typography>
              )}
              {errorMessage !== "e1" && errorMessage !== "success" && (
                <Typography
                  component="p"
                  variant="body2"
                  color="textSecondary"
                  style={{ color: "red" }}
                >
                  Student enrollment failed
                </Typography>
              )} */}
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UniversityOps;
