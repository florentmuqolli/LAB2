import React from 'react';

const Classes = () => {
  const classes = [
    { name: 'Yoga', description: 'Improve flexibility and mindfulness.', time: 'Mon/Wed/Fri - 8:00 AM' },
    { name: 'HIIT', description: 'High intensity interval training to burn fat.', time: 'Tue/Thu - 6:00 PM' },
    { name: 'Strength Training', description: 'Build muscle and strength.', time: 'Daily - 7:00 AM' },
  ];

  return (
    <div className="container py-5">
      <h2 className="mb-4">Our Classes</h2>
      <div className="row">
        {classes.map((cls, idx) => (
          <div key={idx} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{cls.name}</h5>
                <p className="card-text">{cls.description}</p>
                <p className="text-muted">{cls.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
