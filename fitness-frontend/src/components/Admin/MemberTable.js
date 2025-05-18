import { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import api from '../../services/api';

export default function MemberTable() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);

  const fetchMembers = async () => {
    try {
      const res = await api.get('/api/members');
      setMembers(res.data);
    } catch (err) {
      setError('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setCurrentMember(member);
    setShowEditModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/members/${currentMember.id}`, currentMember);
      fetchMembers();
      setShowEditModal(false);
    } catch (err) {
      setError('Failed to update member');
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex justify-content-between mb-4">
        <h4>Member Management</h4>
        <Button variant="primary" size="sm">
          + Add Member
        </Button>
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.role}</td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => handleEdit(member)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Member</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSave}>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={currentMember?.name || ''}
                    onChange={(e) => setCurrentMember({
                      ...currentMember,
                      name: e.target.value
                    })}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
      )}
    </>
  );
}