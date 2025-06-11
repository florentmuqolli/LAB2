import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WorkoutPlan.css';
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { Card, Badge, Button, Spinner, Accordion } from 'react-bootstrap';
import { FaDumbbell, FaCalendarAlt, FaFireAlt, FaRedo } from 'react-icons/fa';

const MyWorkoutPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkoutPlans = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/api/workout-plans/my-plans', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlans(response.data);
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        try {
          const refreshRes = await axios.post('http://localhost:5000/api/auth/refresh-token', {}, {
            withCredentials: true 
          });

          const newAccessToken = refreshRes.data.accessToken;
          console.log('New access token:', newAccessToken);
          localStorage.setItem('accessToken', newAccessToken);

          console.log('Retrying with access token:', newAccessToken);
          const retryRes = await axios.get('http://localhost:5000/api/workout-plans/my-plans', {
            headers: { Authorization: `Bearer ${newAccessToken}` }
          });
          setPlans(retryRes.data);
        } catch (refreshError) {
          toast.error("Session expired. Please log in again.");
          console.error("Refresh failed:", refreshError);
        }
      } else {
        toast.error("Failed to fetch workouts");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchWorkoutPlans();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary mb-0">
          <FaDumbbell className="me-2" />
          My Workout Plans
        </h2>
        <Button
          variant="outline-primary"
          onClick={fetchWorkoutPlans}
          disabled={loading}
        >
          <FaRedo className={`me-2 ${loading ? 'fa-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : plans.length === 0 ? (
        <Card className="shadow-sm border-0 text-center py-5">
          <Card.Body>
            <FaDumbbell size={48} className="text-muted mb-3" />
            <h4>No Workout Plans Assigned</h4>
            <p className="text-muted">
              Your trainer hasn't assigned any workout plans yet.
            </p>
          </Card.Body>
        </Card>
      ) : (
        <Accordion defaultActiveKey="0" className="mb-4">
          {plans.map((plan, index) => (
            <Accordion.Item eventKey={index.toString()} key={plan._id} className="mb-3 border-0">
              <Card className="shadow-sm overflow-hidden">
                <Accordion.Header className="bg-light">
                  <div className="d-flex w-100 align-items-center">
                    <div className="flex-grow-1">
                      <h5 className="mb-0 text-primary">{plan.title}</h5>
                    </div>
                    <Badge bg="info" className="ms-2">
                      {plan.days.length} days/week
                    </Badge>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Card.Body>
                    <p className="text-muted mb-4">{plan.description}</p>
                    
                    <div className="mb-4">
                      <h6 className="d-flex align-items-center text-secondary">
                        <FaCalendarAlt className="me-2" />
                        Scheduled Days
                      </h6>
                      <div className="d-flex flex-wrap gap-2">
                        {plan.days.map(day => (
                          <Badge key={day} bg="light" text="dark" className="fs-6">
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h6 className="d-flex align-items-center text-secondary mb-3">
                        <FaFireAlt className="me-2" />
                        Exercises
                      </h6>
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead className="bg-light">
                            <tr>
                              <th>Exercise</th>
                              <th>Sets</th>
                              <th>Reps</th>
                              <th>Rest</th>
                            </tr>
                          </thead>
                          <tbody>
                            {plan.exercises.map((ex, idx) => (
                              <tr key={idx}>
                                <td className="fw-semibold">{ex.name}</td>
                                <td>{ex.sets}</td>
                                <td>{ex.reps}</td>
                                <td>{ex.rest || '30s'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Body>
              </Card>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default MyWorkoutPlans;
