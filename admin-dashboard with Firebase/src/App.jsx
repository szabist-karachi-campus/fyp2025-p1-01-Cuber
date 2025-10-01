import React, { useEffect } from "react";
import app from "./firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/Signup";
import ForgotPasswordPage from "./pages/ForgotPassword";
import AdminHome from "./pages/AdminHome";
import { AuthProvider, useAuth } from "./context/AuthContext";
import CatererDashboard from "./components/CatererDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import CustomerOrders from "./components/CustomerOrders";

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();   // ✅ use currentUser instead of isLoggedIn
  return currentUser ? children : <Navigate to="/login" />;
};


function App() {
  useEffect(() => {
    const db = getFirestore(app);
    getDocs(collection(db, "test-connection"))
      .then(() => {
        console.log("✅ Firebase is connected!");
      })
      .catch((error) => {
        console.error("❌ Firebase connection failed:", error);
      });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/caterer" element={<CatererDashboard />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer-orders" element={<CustomerOrders />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminHome />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

