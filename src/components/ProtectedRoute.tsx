import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {

    const { user, loading } = useAuth();

    if (loading) return <p>Chargement...</p>;
    if (!user) return <Navigate to="/login" />;

    return children;
};

export default ProtectedRoute;
