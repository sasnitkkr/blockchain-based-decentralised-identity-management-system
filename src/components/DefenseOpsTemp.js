import React, { useState } from "react";
import Navbar from "./Navbar";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { hashString } from "./../utils/hashUtils";

const DefenseOps = (props) => {
  const [employeeDetails, setEmployeeDetails] = useState({
    id: "",
    rank: "",
  });

  const handleChange = (e) => {
    setEmployeeDetails({ ...employeeDetails, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const employeeId = employeeDetails.id.trim();
    const employeeRank = employeeDetails.rank.trim();
    if (!employeeId) {
      return;
    }
    let employeeDb = localStorage.getItem("employees");
    let newemployeeDb = {};
    if (employeeDb) {
      employeeDb = JSON.parse(employeeDb);
      newemployeeDb = employeeDb;
    }
    newemployeeDb[hashString(employeeId)] = {
      id: hashString(employeeId),
      rank: employeeRank,
    };
    newemployeeDb = JSON.stringify(newemployeeDb);
    localStorage.setItem("employees", newemployeeDb);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    const employeeIdToCheck = employeeDetails.id.trim();
    let employeeDb = localStorage.getItem("employees");
    if (!employeeDb) {
      setEmployeeDetails({ ...employeeDetails, rank: "" });
      return;
    }
    employeeDb = JSON.parse(employeeDb);
    if (employeeDb[hashString(employeeIdToCheck)]) {
      setEmployeeDetails({
        ...employeeDetails,
        rank: employeeDb[hashString(employeeIdToCheck)].rank,
      });
    } else {
      setEmployeeDetails({ ...employeeDetails, rank: "" });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const employeeId = employeeDetails.id.trim();
    const employeeRank = employeeDetails.rank.trim();
    if (!employeeId) {
      return;
    }
    let employeeDb = localStorage.getItem("employees");
    let newemployeeDb = {};
    if (employeeDb) {
      employeeDb = JSON.parse(employeeDb);
      newemployeeDb = employeeDb;
    }
    newemployeeDb[hashString(employeeId)] = {
      id: hashString(employeeId),
      rank: employeeRank,
    };
    newemployeeDb = JSON.stringify(employeeDb);
    localStorage.setItem("employees", newemployeeDb);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    const employeeId = employeeDetails.id.trim();
    if (employeeId.length === 0) {
      return;
    }
    let employeeDb = localStorage.getItem("employees");
    if (!employeeDb) {
      return;
    }
    employeeDb = JSON.parse(employeeDb);
    delete employeeDb[hashString(employeeId)];
    employeeDb = JSON.stringify(employeeDb);
    localStorage.setItem("employees", employeeDb);
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
        Defense Operations
      </Typography>
      <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>
          <form>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField
                  name="id"
                  onChange={handleChange}
                  type="text"
                  value={employeeDetails.id}
                  placeholder="Enter employee id"
                  label="Employee Id"
                  variant="outlined"
                  fullwidth="true"
                  required
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <InputLabel id="empRank">Rank</InputLabel>
                <Select
                  labelId="empRank"
                  name="rank"
                  onChange={handleChange}
                  value={employeeDetails.rank}
                  label="Rank"
                  fullWidth="true"
                >
                  <MenuItem value="LIEUTINANT">LIEUTINANT</MenuItem>
                  <MenuItem value="COLONEL">COLONEL</MenuItem>
                  <MenuItem value="MAJOR GENERAL">MAJOR GENERAL</MenuItem>
                </Select>
              </Grid>
              <Grid xs={12} item>
                <Button
                  onClick={handleAdd}
                  variant="contained"
                  color="primary"
                  fullWidth="true"
                >
                  Add Employee
                </Button>
              </Grid>
              <Grid xs={12} item>
                <Button
                  onClick={handleCheck}
                  variant="contained"
                  color="primary"
                  fullWidth="true"
                >
                  Check Employee
                </Button>
              </Grid>
              <Grid xs={12} item>
                <Button
                  onClick={handleUpdate}
                  variant="contained"
                  color="primary"
                  fullWidth="true"
                >
                  Update Employee
                </Button>
              </Grid>
              <Grid xs={12} item>
                <Button
                  onClick={handleRemove}
                  variant="contained"
                  color="primary"
                  fullWidth="true"
                >
                  Remove Employee
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DefenseOps;
