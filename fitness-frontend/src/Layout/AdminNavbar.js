import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container fluid>
        <Navbar.Brand onClick={() => navigate('/admin/dashboard')} style={{ cursor: 'pointer' }}>
          Fitness Admin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/admin/members')}>Members</Nav.Link>
            <Nav.Link onClick={() => navigate('/admin/classes')}>Classes</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={logout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}