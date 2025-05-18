import { useState, useContext, useEffect } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated, role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      redirectByRole();
    }
  }, [isAuthenticated, role]);

  const redirectByRole = () => {
    switch (role) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'trainer':
        navigate('/trainer/classes');
        break;
      default: 
        navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container className="mt-5">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate('/')}
        className="mb-3"
      >
        Back to Home
      </Button>
      
      <Card style={{ maxWidth: '500px' }} className="mx-auto p-4">
        <h2 className="text-center mb-4">Fitness System Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
}