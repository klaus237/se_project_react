import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // 👮‍♂️ Redirection si l'utilisateur n'est pas connecté
    return <Navigate to="/" replace />;
  }
  // ✅ Sinon, afficher le contenu protégé
  return children;
}

export default ProtectedRoute;
