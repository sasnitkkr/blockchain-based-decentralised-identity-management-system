import React, { useState } from 'react';
import {
  TextField,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';

import { hashString } from './../utils/hashUtils';
// import web3 from '../web3';
// import univContract from '../eth/helper/univContract';

constUniversityOps = (props) => {
  constsanitizeBulkData = (values) => {
    // remove newline characters
    values = values.replace(/(\r\n|\n|\r)/gm, '');
    // split/delimit acc. to commas
    values = values.split(',');
    // remove extra whitespaces from each roll no.
    values = values.map((item) => {
      return item.trim();
    });
    // remove empty roll noseg: 3, ,4
    values = values.filter((item) => {
      return item !== '';
    });
    return values;
  };

  const [data, setData] = useState({
    rollNo: '',
    rollNoCheckStatus: 'none',
    bulkRollNos: '',
    bulkDataProcessingStatus: 'none',
    rollNoCheckResult: '',
  });

  consthandleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  consthandleBulkAddRollNos = async (e) => {
    e.preventDefault();
    constrollNoList = sanitizeBulkData(data.bulkRollNos);
    if (rollNoList.length === 0) {
      return;
    }
    let studentdb = localStorage.getItem('students');
    let newStudentdb = {};
    if (studentdb) {
      studentdb = JSON.parse(studentdb);
      newStudentdb = studentdb;
    }
    rollNoList.map((rollNo) => {
      return (newStudentdb[hashString(rollNo)] = true);
    });
    newStudentdb = JSON.stringify(newStudentdb);
    localStorage.setItem('students', newStudentdb);
  };

  consthandleBulkRemoveRollNos = async (e) => {
    e.preventDefault();
    constrollNoList = sanitizeBulkData(data.bulkRollNos);
    if (rollNoList.length === 0) {
      return;
    }
    let studentdb = localStorage.getItem('students');
    if (!studentdb) {
      // no student in list
      return;
    }
    studentdb = JSON.parse(studentdb);
    rollNoList.map((rollNo) => {
      return delete studentdb[hashString(rollNo)];
    });
    studentdb = JSON.stringify(studentdb);
    localStorage.setItem('students', studentdb);
  };

  consthandleCheckRollNo = async (e) => {
    e.preventDefault();
    constrollNoToCheck = data.rollNo.trim();
    let studentdb = localStorage.getItem('students');
    if (!studentdb) {
      setData({ ...data, rollNoCheckResult: 'NO' });
    }
    studentdb = JSON.parse(studentdb);
    if (studentdb[hashString(rollNoToCheck)] === true) {
      setData({ ...data, rollNoCheckResult: 'YES' });
    } else {
      setData({ ...data, rollNoCheckResult: 'NO' });
    }
  };

  return (
    <div style={{backgroundColor: 'gray', height: '100vh'}}>
      <Typography variant='h4' align='center' style={{color: 'white', paddingTop: '10px'}} gutterBottom>
        University Operations
      </Typography>
      <Card style={{ maxWidth: 600, margin: '0 auto', padding: '20px 5px' }}>
        <CardContent>
          <form>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField
                  name='bulkRollNos'
                  onChange={handleChange}
                  type='text'
                  value={data.bulkRollNos}
                  label='Enter list of Roll numbers to add/Remove'
                  placeholder='3072,3073,3074...'
                  variant='outlined'
                  style={{ maxWidth: 600 }}
                  fullWidth
                  id='fullWidth'
                  rows={4}
                  multiline
                />
              </Grid>
              <Grid xs={12} item>
                <Button
                  onClick={handleBulkAddRollNos}
                  variant='contained'
                  color='primary'
                  //   fullWidth='true'
                  id='fullWidth'
                  fullWidth>
                  Enroll Roll Numbers
                </Button>
              </Grid>
              <Grid xs={12} item>
                <Button
                  onClick={handleBulkRemoveRollNos}
                  variant='contained'
                  color='primary'
                  //   fullWidth='true'
                  id='fullWidth'
                  fullWidth>
                  Delist Roll Numbers
                </Button>
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  name='rollNo'
                  type='text'
                  value={data.rollNo}
                  onChange={handleChange}
                  style={{ maxWidth: 600 }}
                  variant='outlined'
                  fullWidth
                  id='fullWidth'
                  //   fullWidth='true'
                  label='Enter Roll Number'
                  placeholder='Enter Roll No. to verify student enrollment'
                />
              </Grid>
              <Grid xs={12} item>
                <Button
                  onClick={handleCheckRollNo}
                  variant='contained'
                  color='primary'
                  fullWidth>
                  {/* fullwidth='true'> */}
                  Check Enrollment Status
                </Button>
              </Grid>
              {data.rollNoCheckResult === 'YES' && (
                <Typography
                  component='p'
                  variant='body2'
                  color='textSecondary'
                  style={{ color: 'green' }}>
                  Student is enrolled
                </Typography>
              )}
              {data.rollNoCheckResult === 'NO' && (
                <Typography
                  component='p'
                  variant='body2'
                  color='textSecondary'
                  style={{ color: 'red' }}>
                  Student is NOT enrolled
                </Typography>
              )}
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UniversityOps;
