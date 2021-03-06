import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Home from './layout/Home';
import UserForm from './utils/UserForm';
import useToken from './utils/useToken';

function App() {
  const { token, setToken } = useToken();
  if(!token) return <UserForm setToken={setToken} />
  return (
    <Router>
      <div className="App">
        <Home userId={token.user_id} setToken={setToken} />
      </div>
    </Router>
  );
}

export default App;
