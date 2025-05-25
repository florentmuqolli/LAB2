import React, { useState, useEffect } from "react";
import axios from "axios";

const TrainerPlanForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    days: [],
    exercises: [{ name: "", sets: "", reps: "" }],
    member: "", 
  });

  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (initialData) setForm(initialData);
    fetchMembers();
  }, [initialData]);

  const fetchMembers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/auth/users?role=member", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setMembers(data);
    } catch (err) {
      console.error("Failed to fetch members", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...form.exercises];
    updatedExercises[index][field] = value;
    setForm({ ...form, exercises: updatedExercises });
  };

  const addExercise = () => {
    setForm({ ...form, exercises: [...form.exercises, { name: "", sets: "", reps: "" }] });
  };

  const removeExercise = (index) => {
    const updated = [...form.exercises];
    updated.splice(index, 1);
    setForm({ ...form, exercises: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.member) {
      alert("Please select a member");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} className="form-control" required />
      </div>
      <div className="mb-3">
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label>Days</label>
        <input
          name="days"
          value={form.days.join(", ")}
          onChange={(e) => setForm({ ...form, days: e.target.value.split(",").map((d) => d.trim()) })}
          className="form-control"
        />
        <small className="text-muted">Separate days with commas (e.g. Monday, Wednesday)</small>
      </div>

      <div className="mb-3">
        <label>Select Member</label>
        <select name="member" value={form.member} onChange={handleChange} className="form-control" required>
          <option value="">-- Select Member --</option>
          {members.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name} ({m.email})
            </option>
          ))}
        </select>
      </div>

      <hr />
      <h5>Exercises</h5>
      {form.exercises.map((exercise, index) => (
        <div key={index} className="row mb-2">
          <div className="col">
            <input
              type="text"
              placeholder="Exercise name"
              value={exercise.name}
              onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="col">
            <input
              type="number"
              placeholder="Sets"
              value={exercise.sets}
              onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col">
            <input
              type="number"
              placeholder="Reps"
              value={exercise.reps}
              onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-danger" onClick={() => removeExercise(index)}>×</button>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-secondary mb-3" onClick={addExercise}>+ Add Exercise</button>
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary me-2" onClick={onCancel}>Cancel</button>
        <button className="btn btn-primary" type="submit">{initialData ? "Update" : "Create"}</button>
      </div>
    </form>
  );
};

export default TrainerPlanForm;
