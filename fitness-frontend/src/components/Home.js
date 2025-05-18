import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { isAuthenticated, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="p-4">
      <h1>Welcome to Fitness System</h1>
      {isAuthenticated ? (
        <>
          <p>You are logged in as: <strong>{role}</strong></p>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </>
      ) : (
        <>
        <p>Please log in to access the system</p>
        <Button variant="success" onClick={handleLogin}>
            Login
          </Button>
        </>
      )}
    </div>
  );
}