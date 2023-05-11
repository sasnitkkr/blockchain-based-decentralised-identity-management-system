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
import {
  addEmployee,
  removeEmployee,
  verifyEmployee,
} from "../data_providers/defense_data_provider";

const DefenseOps = (props) => {
  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [id, setId] = useState("");
  const [textColor, setTextColor] = useState("purple");
  const [message, setMessage] = useState();
  const addEmployeeJS = async () => {
    try {
      const key = await addEmployee(name, rank, id);
      setName("");
      setId("");
      setRank("");
      setTextColor("green");
      setMessage(
        `Enrollment Successful with private key = ${key}. Please keep the key safe with yourself.`
      );
    } catch (err) {
      console.log(err.message);
      setMessage(err.message);
    }
  };
  const removeEmployeeJS = async () => {
    try {
      await removeEmployee(name, rank, id);
      setName("");
      setId("");
      setRank("");
      setTextColor("green");
      setMessage("Employee removed successfully");
    } catch (err) {
      console.log(err.message);
      setMessage(err.message);
    }
  };
  const verifyEmployeeJS = async () => {
    const emp = await verifyEmployee(name, rank, id);
    if (emp.empId !== "") {
      setTextColor("green");
      setMessage("Employee exists");
    } else {
      setTextColor("red");
      setMessage("Employee doesn't exist");
    }
    setName("");
    setId("");
    setRank("");
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
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  value={name}
                  placeholder="Enter employee name"
                  label="Employee Name"
                  variant="outlined"
                  fullwidth="true"
                  required
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  required
                  name="rank"
                  onChange={(e) => {
                    setRank(e.target.value);
                  }}
                  select
                  value={rank}
                  label="Rank"
                  fullWidth="true"
                >
                  <MenuItem value="0">LIEUTINANT</MenuItem>
                  <MenuItem value="1">COLONEL</MenuItem>
                  <MenuItem value="2">MAJOR GENERAL</MenuItem>
                </TextField>
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  name="id"
                  onChange={(e) => setId(e.target.value)}
                  type="text"
                  value={id}
                  placeholder="Enter employee id"
                  label="Employee Id"
                  variant="outlined"
                  fullwidth="true"
                  required
                />
              </Grid>
              <Grid xs={12} item>
                <Button
                  onClick={addEmployeeJS}
                  variant="contained"
                  color="primary"
                  fullWidth="true"
                >
                  Add Employee
                </Button>
              </Grid>
              <Grid xs={12} item>
                <Button
                  onClick={verifyEmployeeJS}
                  variant="contained"
                  color="primary"
                  fullWidth="true"
                >
                  Check Employee
                </Button>
              </Grid>
              <Grid xs={12} item>
                <Button
                  onClick={removeEmployeeJS}
                  variant="contained"
                  color="primary"
                  fullWidth="true"
                >
                  Remove Employee
                </Button>
              </Grid>
            </Grid>
          </form>
          {message && (
            <Typography
              component="p"
              variant="body2"
              color="textSecondary"
              style={{ color: { textColor }, wordBreak: "break-all" }}
            >
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DefenseOps;
