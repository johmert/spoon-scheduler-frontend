import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Home from './layout/Home';
import UserForm from './layout/UserForm';
import useToken from './utils/useToken';

function App() {
  const { token, setToken } = useToken();
  if(!token) return <UserForm mode="login" setToken={setToken} />
  return (
    <Router>
      <div className="App">
        <Home />
      </div>
    </Router>
  );
}

export default App;
