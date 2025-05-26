import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';
import './WorkoutPlan.css';
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

const MyWorkoutPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:5000/api/workout-plans/my-plans', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTimeout(() => {
          setPlans(response.data);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch workouts");
        setLoading(false);
      }
    };

    fetchPlans();
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
