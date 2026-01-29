// Dashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // react-router-dom, not react-router
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((s) => s.auth);
  const botRight = () => {
    toast.dark('Hey 👋!', {
      position: 'bottom-right',
    });
  };

  useEffect(() => {
    // Wait until loading finishes; only redirect if not authenticated
    if (!loading && !user && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, user, isAuthenticated, navigate]);

  if (loading) return <div>Loading...</div>;

  return <div>Dashboard
    <button onClick={botRight}>Bottom Right</button>
  </div>;
};
