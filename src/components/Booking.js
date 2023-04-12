import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Booking = (props) => {
  constcoords = { Chandigarh: 0, Kurukshetra: 50, Delhi: 200 };

  const [data, setData] = useState({
    rootId: '',
    source: '',
    destination: '',
    concession: '',
    eligibleConcession: '',
    distance: 0,
    fare: 0,
  });

  consthandleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  consthandleChange = (e) => {
    let value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  constcalculateFare = () => {
    const start = coords[data.source],
      end = coords[data.destination];
    const distance = end >start ? end - start : start - end;
    let fare = distance,
      eligibleConcession = '';
    if (data.concession === 'STUDENT') {
      constcurrentUser = localStorage.getItem('currentUser');
      constrollNo = JSON.parse(localStorage.getItem(currentUser))['rollNo'];
      const students = JSON.parse(localStorage.getItem('students'));
      if (students) {
        constisRollNoEnrolled = students[rollNo];
        if (isRollNoEnrolled) {
          fare = (fare * 9) / 10;
          eligibleConcession = 'STUDENT';
        } else {
          eligibleConcession = '';
        }
      }
    } else if (data.concession === 'DEFENSE') {
      constcurrentUser = localStorage.getItem('currentUser');
      constdefenseEmpId = JSON.parse(localStorage.getItem(currentUser))[
        'defenseEmpId'
      ];
      const employees = JSON.parse(localStorage.getItem('employees'));
      if (employees) {
        constempEnrolled = employees[defenseEmpId];
        if (
          empEnrolled&&
          empEnrolled['rank'] &&
          empEnrolled['rank'].length> 0
        ) {
          eligibleConcession = 'DEFENSE';
          switch (empEnrolled['rank']) {
            case 'LIEUTINANT':
              fare = (fare * 85) / 100;
              break;
            case 'COLONEL':
              fare = (fare * 80) / 100;
              break;
            case 'MAJOR GENERAL':
              fare = (fare * 75) / 100;
              break;
            default:
              break;
          }
        } else {
          eligibleConcession = '';
        }
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
    <div style={{ backgroundColor: '#444', height: '100vh', overflow: 'auto' }}>
      <div
        style={{
          width: '30%',
          backgroundColor: '#eee',
          boxShadow: '0px 0px 50px #111',
          padding: '30px',
          borderRadius: '20px',
          marginLeft: '50vw',
          marginTop: '50vh',
          transform: 'translate(-50%, -50%)',
        }}>
        <form onSubmit={handleSubmit}>
          <TextField
            name='rootId'
            onChange={handleChange}
            type='text'
            variant='standard'
            value={data.rootId}
            label='Root ID'
            placeholder='Enter your Root ID'
          />
          <br />
          <br />
          <label htmlFor='source'>Enter Your Source</label>
          <br />
          <Select
            style={{ marginTop: '10px' }}
            id='source'
            value={data.source}
            onChange={handleChange}
            name='source'>
            <MenuItem value='Kurukshetra'>Kurukshetra</MenuItem>
            <MenuItem value='Chandigarh'>Chandigarh</MenuItem>
            <MenuItem value='Delhi'>Delhi</MenuItem>
          </Select>
          <br />
          <label htmlFor='destination'>Select Your Destination</label>
          <br />
          <Select
            style={{ marginTop: '10px' }}
            value={data.destination}
            onChange={handleChange}
            name='destination'
            id='destination'>
            <MenuItem value='Kurukshetra'>Kurukshetra</MenuItem>
            <MenuItem value='Chandigarh'>Chandigarh</MenuItem>
            <MenuItem value='Delhi'>Delhi</MenuItem>
          </Select>
          <br />
          <br />
          <label htmlFor='concession'>
            Are you eligible for any concession?
          </label>
          <br />
          <input
            style={{ marginTop: '10px' }}
            onChange={handleChange}
            type='radio'
            name='concession'
            value='STUDENT'
          />
          <strong>Student concession</strong>
          <br />
          &nbsp;&nbsp;&nbsp; 10% for university students
          <br />
          <input
            onChange={handleChange}
            type='radio'
            name='concession'
            value='DEFENSE'
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
            style={{ marginTop: '20px' }}
            variant='contained'>
            Calculate Fare
          </Button>
          <p> Your Total Distance is: {data.distance}</p>
          <p> Your Total Fare is: {data.fare}</p>
          {data.eligibleConcession === 'STUDENT' && (
            <p style={{ color: 'darkblue' }}>Eligible for Student Concession</p>
          )}
          {data.eligibleConcession === 'DEFENSE' && (
            <p style={{ color: 'darkblue' }}>Eligible for Defense Concession</p>
          )}
          <Button variant='contained'>Book Ticket</Button>
          <br />
        </form>
      </div>
    </div>
  );
};

export default Booking;

