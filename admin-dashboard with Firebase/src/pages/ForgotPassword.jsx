import React, { useState } from "react";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email) {
      alert(`Password reset link has been sent to ${email}`);
    } else {
      alert("Email not found. Please signup first!");
    }
  };

  return (
    <div className="forgot-container">
      <form className="forgot-form" onSubmit={handleReset}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
