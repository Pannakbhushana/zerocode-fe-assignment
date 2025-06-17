import React from 'react';
import './App.css';
import Dashboard from './pages/dashboard';
import AllRoutes from './routers';

function App() {
  return (
    <div className="App">
    <AllRoutes/>
    <Dashboard/>
    </div>
  );
}

export default App;
