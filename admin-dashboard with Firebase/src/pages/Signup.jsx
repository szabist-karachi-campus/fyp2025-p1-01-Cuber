import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase";   // <-- make sure path correct ho
import { db } from "../firebase";
import "../styles/Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");  // default role

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // 1) Firebase Auth Create
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2) Firestore user doc with Role
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        username,
        phone,
        email,
        role,
      });

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Error signing up");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* choose role */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="customer">Customer</option>
          <option value="caterer">Caterer</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
