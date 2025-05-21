import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyWorkoutPlan = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPlans = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    try {
      const res = await axios.get('http://localhost:5000/api/workout-plans/mine', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlans(res.data);
    } catch (err) {
      toast.error('Failed to load your workout plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPlans();
  }, []);

  if (loading) return <div className="text-center mt-4">Loading your plans...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Workout Plans</h3>
      {plans.length === 0 ? (
        <p>You have no assigned workout plans yet.</p>
      ) : (
        plans.map(plan => (
          <div key={plan._id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{plan.title}</h5>
              <p className="card-text">{plan.description}</p>
              <p><strong>Days:</strong> {plan.days.join(', ')}</p>
              <ul>
                {plan.exercises.map((ex, i) => (
                  <li key={i}>{ex.name} — {ex.sets} sets x {ex.reps} reps</li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyWorkoutPlan;
