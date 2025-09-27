import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientList from './components/ClientList';
import Evaluation from './components/Evaluation';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ClientList />} />
          <Route path="/evaluate/:entityId" element={<Evaluation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
