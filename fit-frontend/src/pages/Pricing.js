import React from 'react';

const Pricing = () => {
  const plans = [
    { name: 'Basic', price: '$29/mo', features: ['Access to gym', '1 personal session/month'] },
    { name: 'Standard', price: '$49/mo', features: ['Everything in Basic', 'Group classes', '2 personal sessions/month'] },
    { name: 'Premium', price: '$69/mo', features: ['All features', 'Unlimited personal training', 'Nutrition plan'] },
  ];

  return (
    <div className="container py-5">
      <h2 className="mb-4">Pricing Plans</h2>
      <div className="row">
        {plans.map((plan, idx) => (
          <div key={idx} className="col-md-4 mb-4">
            <div className="card h-100 shadow border-primary">
              <div className="card-body text-center">
                <h5 className="card-title">{plan.name}</h5>
                <h3 className="card-text">{plan.price}</h3>
                <ul className="list-unstyled mt-3">
                  {plan.features.map((feature, i) => (
                    <li key={i}>✅ {feature}</li>
                  ))}
                </ul>
                <button className="btn btn-primary mt-3">Choose Plan</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
