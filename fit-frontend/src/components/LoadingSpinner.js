import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <ClipLoader color="#0d6efd" size={60} />
    </div>
  );
};

export default LoadingSpinner;
