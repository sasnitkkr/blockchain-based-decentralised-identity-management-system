import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Routes,
} from 'react-router-dom';

// import Home from './components/Home';
import KycForm from './components/KycForm';
import Booking from './components/Booking';
import DefenseOps from './components/DefenseOps';
import UniversityOps from './components/UniversityOps';
// import CompleteMerkleTree from './components/MerkleTree';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/kyc' exact>
          <KycForm />
        </Route>
        <Route path='/defense' exact>
          <DefenseOps />
        </Route>
        <Route path='/university' exact>
          <UniversityOps />
        </Route>
        {/* <Route path='/merkle' exact>
          <CompleteMerkleTree />
        </Route> */}
        <Route path='/booking' exact>
          <Booking />
        </Route>
        {/* <Route path='/home' exact>
          <Home />
        </Route> */}
        {/* <Redirect to='/home' /> */}
      </Routes>
    </Router>
  );
};

export default App;
