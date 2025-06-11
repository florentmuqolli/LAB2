import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Alert, Card, Badge, InputGroup } from "react-bootstrap";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaTrash, FaEdit, FaExclamationTriangle, FaSearch, FaUserPlus, FaSync, FaUser } from "react-icons/fa";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/members");
      setTimeout(() => {
        setLoading(false);
        setMembers(res.data);
      }, 500); 
    } catch (err) {
      setLoading(false);
      toast.error("Failed to fetch members");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowAddModal = () => {
    setModalMode("add");
    setFormData({ name: "", email: "", phone: "", address: "" });
    setShowModal(true);
  };

  const handleShowEditModal = (member) => {
    setModalMode("edit");
    setSelectedMember(member);
    setFormData(member);
    setShowModal(true);
  };

  const handleShowDeleteModal = (member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/members/${memberToDelete.id}`);
      toast.success("Member deleted successfully");
      setShowDeleteModal(false);
      fetchMembers();
    } catch (err) {
      toast.error("Failed to delete member");
      setShowDeleteModal(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (modalMode === "add") {
        await axiosInstance.post("/members", formData);
        toast.success("Member added successfully");
      } else {
        await axiosInstance.put(`/members/${selectedMember.id}`, formData);
        toast.success("Member updated successfully");
      }
      setShowModal(false);
      fetchMembers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save member");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0 text-primary"><FaUser className="me-2" />Members Directory</h2>
              <p className="text-muted mb-0">Manage your organization's members</p>
            </div>
            <div className="d-flex">
              <Button
                variant="primary"
                className="me-2 d-flex align-items-center"
                onClick={handleShowAddModal}
              >
                <FaUserPlus className="me-2" /> Add Member
              </Button>
              <Button
                variant="outline-secondary"
                className="d-flex align-items-center"
                onClick={fetchMembers}
              >
                <FaSync className="me-2" /> Refresh
              </Button>
            </div>
          </div>

          <InputGroup className="mb-4">
            <InputGroup.Text className="bg-white">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search members by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="text-nowrap">ID</th>
                  <th className="text-nowrap">Member</th>
                  <th className="text-nowrap">Contact</th>
                  <th className="text-nowrap">Address</th>
                  <th className="text-nowrap text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <Badge bg="light" text="dark" className="fw-normal">
                        #{member.id}
                      </Badge>
                    </td>
                    <td>
                      <div className="fw-semibold">{member.name}</div>
                      <div className="text-muted small">{member.email}</div>
                    </td>
                    <td>
                      <div>{member.phone}</div>
                    </td>
                    <td>
                      <div className="text-truncate" style={{ maxWidth: '200px' }}>
                        {member.address}
                      </div>
                    </td>
                    <td className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowEditModal(member)}
                      >
                        <FaEdit className="me-1" /> Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleShowDeleteModal(member)}
                      >
                        <FaTrash className="me-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-5">
              <FaSearch size={48} className="text-muted mb-3" />
              <h5>No members found</h5>
              <p className="text-muted">
                {searchTerm ? "Try a different search term" : "Add your first member to get started"}
              </p>
              {!searchTerm && (
                <Button variant="primary" onClick={handleShowAddModal}>
                  <FaUserPlus className="me-2" /> Add Member
                </Button>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>
            {modalMode === "add" ? (
              <span className="text-primary">
                <FaUserPlus className="me-2" /> Add New Member
              </span>
            ) : (
              <span className="text-primary">
                <FaEdit className="me-2" /> Edit Member
              </span>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-6">
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="formAddress" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St, City, Country"
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {modalMode === "add" ? "Add Member" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>
            <FaExclamationTriangle className="me-2" />
            Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger" className="mb-0">
            <div className="d-flex">
              <FaExclamationTriangle size={24} className="me-3 mt-1 flex-shrink-0" />
              <div>
                <h5>Delete <b>{memberToDelete?.name}</b>?</h5>
                <p className="mb-0">
                  This will permanently remove this member and all associated data.
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            <FaTrash className="me-1" /> Delete Permanently
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Members;