import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WorkoutPlan.css';
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

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
      if (err.response && err.response.status === 401) {
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
    <div className="my-workout-plans">
      <h2>My Workout Plans</h2>
      {plans.length === 0 ? (
        <p>No workout plans assigned yet.</p>
      ) : (
        plans.map(plan => (
          <div key={plan._id} className="plan-card">
            <h3>{plan.title}</h3>
            <p>{plan.description}</p>
            <strong>Days: </strong>{plan.days.join(', ')}
            <ul>
              {plan.exercises.map((ex, idx) => (
                <li key={idx}>{ex.name} - {ex.sets} sets x {ex.reps} reps</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MyWorkoutPlans;
