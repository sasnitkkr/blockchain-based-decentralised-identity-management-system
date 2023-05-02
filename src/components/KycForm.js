import React, { useState } from "react";
import { savePersonalData } from "./../utils/hashUtils";
import Navbar from "./Navbar";
import {
  Typography,
  CardContent,
  Card,
  TextField,
  Button,
  Select,
  Grid,
  InputLabel,
  MenuItem,
} from "@mui/material";
const KycForm = () => {
  const [data, setData] = useState({
    name: "",
    aadhar: "",
    gender: "",
    rollNo: "",
    defenseEmpId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    savePersonalData(data);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  return (
    <div style={{ backgroundColor: "gray", height: "100vh" }}>
      <Navbar />
      <Typography
        variant="h4"
        align="center"
        style={{ color: "white" }}
        gutterBottom
      >
        KYC Operations
      </Typography>
      <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField
                  name="name"
                  onChange={handleChange}
                  type="text"
                  value={data.name}
                  placeholder="Enter Applicant name id"
                  label="Applicant Name"
                  variant="outlined"
                  fullwidth="true"
                  required
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  name="aadhar"
                  onChange={handleChange}
                  type="text"
                  value={data.aadhar}
                  placeholder="Enter Applicants aadhar"
                  label="Applicant aadhar"
                  variant="outlined"
                  fullwidth="true"
                  required
                />
              </Grid>
              <Typography
                variant="h6"
                align="center"
                component="p"
                gutterBottom
              >
                If you are a school/college student, please add your roll number
                here:
              </Typography>
              <Grid xs={12} sm={6} item>
                <TextField
                  name="rollNo"
                  onChange={handleChange}
                  type="text"
                  value={data.rollNo}
                  placeholder="Enter your Roll Number"
                  label="Applicant Roll No"
                  variant="outlined"
                  fullwidth="true"
                />
              </Grid>
              <Typography
                variant="h6"
                align="center"
                component="p"
                gutterBottom
              >
                If you are a defense employee, please add your employee id here:
              </Typography>
              <Grid xs={12} sm={6} item>
                <TextField
                  name="defenseEmpId"
                  onChange={handleChange}
                  type="text"
                  value={data.defenseEmpId}
                  placeholder="Enter your Employee ID"
                  label="Emp ID"
                  variant="outlined"
                  fullwidth="true"
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <InputLabel id="demo-simple-select-standard-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  name="gender"
                  onChange={handleChange}
                  value={data.gender}
                  label="Gender"
                  fullWidth="true"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </Grid>
              <Grid xs={12} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth="true"
                >
                  Register Applicant
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default KycForm;
