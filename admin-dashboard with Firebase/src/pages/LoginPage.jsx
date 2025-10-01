import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/LoginPage.css";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await login(email, password);

    const userDoc = await getDoc(doc(db, "users", res.user.uid));
    const role = userDoc.data().role;

    if (role === "admin") {
      navigate("/admin");
    } else if (role === "caterer") {
      navigate("/caterer");
    } else {
      navigate("/customer");
    }

    alert("Welcome!");
  } catch (err) {
    console.log(err);
    alert("Invalid email or password!");
  }
};

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <div className="extra-options">
          <Link to="/forgot-password">Forgot Password?</Link>
          <span> | </span>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
