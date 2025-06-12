import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="w-100 w-md-75 w-lg-50">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} className="form-control" rows="4" required />
        </div>
        <button type="submit" className="btn btn-success">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
