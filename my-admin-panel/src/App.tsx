import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/LoginPage';
import Registration from './component/RegistrationPage';
import MultiStepForm from './component/MultiStepForm';
import SubmissionTable from './component/SubmissionTable';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/form" element={<MultiStepForm />} />
        <Route path="/submission" element={<SubmissionTable/>}/>
        
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
