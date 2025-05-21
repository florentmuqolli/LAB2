import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TrainerPlanForm from "../components/TrainerPlanForm";
import TrainerPlanList from "../components/TrainerPlanList";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PageWrapper from "../components/PageWrapper";

const TrainerDashboard = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "trainer") return;
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/workout-plans", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPlans(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch plans");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (formData, isEdit = false) => {
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/workout-plans/${selectedPlan._id}`, formData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        toast.success("Plan updated");
      } else {
        await axios.post("http://localhost:5000/api/workout-plans", formData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        toast.success("Plan created");
      }
      setShowModal(false);
      setSelectedPlan(null);
      fetchPlans();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/workout-plans/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      toast.success("Plan deleted");
      fetchPlans();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete plan");
    }
  };

  const handleEditClick = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  if (role !== "trainer") {
    return <p className="text-danger text-center mt-5">Access denied: Trainer only area</p>;
  }

  return (
    <PageWrapper>
        <div className="container mt-4">
      <h2 className="text-center mb-4">Trainer Dashboard</h2>
      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn me-2 ${activeTab === "list" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("list")}
        >
          All Workout Plans
        </button>
        <button
          className={`btn ${activeTab === "create" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => {
            setSelectedPlan(null);
            setActiveTab("create");
            setShowModal(true);
          }}
        >
          Create New Plan
        </button>
      </div>

      {activeTab === "list" && (
        <TrainerPlanList
          plans={plans}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedPlan ? "Edit Plan" : "Create Plan"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TrainerPlanForm
            initialData={selectedPlan}
            onSubmit={(formData) => handleCreateOrUpdate(formData, !!selectedPlan)}
            onCancel={() => setShowModal(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
    </PageWrapper>
  );
};

export default TrainerDashboard;
