import React from "react";

const TrainerPlanList = ({ plans, loading, onEdit, onDelete }) => {
  if (loading) return <p>Loading...</p>;
  if (!plans.length) return <p>No workout plans found.</p>;

  return (
    <div className="table-responsive">
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Days</th>
            <th>Exercises</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.title}</td>
              <td>{plan.description}</td>
              <td>{plan.days.join(", ")}</td>
              <td>
                <ul className="mb-0">
                  {plan.exercises.map((ex, i) => (
                    <li key={i}>
                      {ex.name} ({ex.sets}x{ex.reps})
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(plan)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(plan._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainerPlanList;
