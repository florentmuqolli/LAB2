import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Alert, Card, Badge, InputGroup } from "react-bootstrap";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaTrash, FaEdit, FaExclamationTriangle, FaSearch, FaUserPlus, FaSync, FaDumbbell } from "react-icons/fa";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [trainerToDelete, setTrainerToDelete] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    experience: ""
  });

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/trainers");
      setTimeout(() => {
        setLoading(false);
        setTrainers(res.data);
      }, 500);
    } catch (err) {
      setLoading(false);
      toast.error("Failed to fetch trainers");
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowAddModal = () => {
    setModalMode("add");
    setFormData({ 
      name: "", 
      email: "", 
      phone: "", 
      specialization: "", 
      yearsOfExperience: ""
    });
    setShowModal(true);
  };

  const handleShowEditModal = (trainer) => {
    setModalMode("edit");
    setSelectedTrainer(trainer);
    setFormData(trainer);
    setShowModal(true);
  };

  const handleShowDeleteModal = (trainer) => {
    setTrainerToDelete(trainer);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/trainers/${trainerToDelete.id}`);
      toast.success("Trainer deleted successfully");
      setShowDeleteModal(false);
      fetchTrainers();
    } catch (err) {
      toast.error("Failed to delete trainer");
      setShowDeleteModal(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log("body sent: ",formData);
      if (modalMode === "add") {
        await axiosInstance.post("/trainers", formData);
        toast.success("Trainer added successfully");
      } else {
        await axiosInstance.put(`/trainers/${selectedTrainer.id}`, formData);
        toast.success("Trainer updated successfully");
      }
      setShowModal(false);
      fetchTrainers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save trainer");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0 text-primary">
                <FaDumbbell className="me-2" />
                Trainers Directory
              </h2>
              <p className="text-muted mb-0">Manage your fitness trainers</p>
            </div>
            <div className="d-flex">
              <Button
                variant="primary"
                className="me-2 d-flex align-items-center"
                onClick={handleShowAddModal}
              >
                <FaUserPlus className="me-2" /> Add Trainer
              </Button>
              <Button
                variant="outline-secondary"
                className="d-flex align-items-center"
                onClick={fetchTrainers}
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
              placeholder="Search trainers by name, email or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="text-nowrap">ID</th>
                  <th className="text-nowrap">Trainer</th>
                  <th className="text-nowrap">Contact</th>
                  <th className="text-nowrap">Specialization</th>
                  <th className="text-nowrap">Experience</th>
                  <th className="text-nowrap text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrainers.map((trainer) => (
                  <tr key={trainer.id}>
                    <td>
                      <Badge bg="light" text="dark" className="fw-normal">
                        #{trainer.id}
                      </Badge>
                    </td>
                    <td>
                      <div className="fw-semibold">{trainer.name}</div>
                      <div className="text-muted small">{trainer.email}</div>
                    </td>
                    <td>
                      <div>{trainer.phone}</div>
                    </td>
                    <td>
                      <Badge bg="info" className="text-capitalize">
                        {trainer.specialty}
                      </Badge>
                    </td>
                    <td>
                      <div>
                        {trainer.experience} year{trainer.experience !== 1 ? 's' : ''}
                      </div>
                    </td>
                    <td className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowEditModal(trainer)}
                      >
                        <FaEdit className="me-1" /> Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleShowDeleteModal(trainer)}
                      >
                        <FaTrash className="me-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {filteredTrainers.length === 0 && (
            <div className="text-center py-5">
              <FaSearch size={48} className="text-muted mb-3" />
              <h5>No trainers found</h5>
              <p className="text-muted">
                {searchTerm ? "Try a different search term" : "Add your first trainer to get started"}
              </p>
              {!searchTerm && (
                <Button variant="primary" onClick={handleShowAddModal}>
                  <FaUserPlus className="me-2" /> Add Trainer
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
                <FaUserPlus className="me-2" /> Add New Trainer
              </span>
            ) : (
              <span className="text-primary">
                <FaEdit className="me-2" /> Edit Trainer
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
                    placeholder="Alex Johnson"
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
                    placeholder="alex@example.com"
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
                <Form.Group controlId="formSpecialization" className="mb-3">
                  <Form.Label>Specialty</Form.Label>
                  <Form.Control
                    type="text"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    placeholder="e.g., Yoga, CrossFit, Nutrition"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group controlId="formExperience" className="mb-3">
                  <Form.Label>Years of Experience</Form.Label>
                  <Form.Control
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="5"
                    min="0"
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
            {modalMode === "add" ? "Add Trainer" : "Save Changes"}
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
                <h5>Delete {trainerToDelete?.name}?</h5>
                <p className="mb-0">
                  This will permanently remove this trainer and all associated data.
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

export default Trainers;