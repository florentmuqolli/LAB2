import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Members from "./Members";
import Subscriptions from "./Subscriptions";
import Trainers from "./Trainers";

const Dashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Navigate to="members" />} />
          <Route path="members" element={<Members />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="trainers" element={<Trainers />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
