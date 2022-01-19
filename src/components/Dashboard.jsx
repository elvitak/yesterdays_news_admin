import React from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 data-cy="header">Yesterdays News Admin</h1>
      <button data-cy="authenticate" onClick={() => navigate("/authenticate")}>
        Log In
      </button>
    </>
  );
};

export default Dashboard;
