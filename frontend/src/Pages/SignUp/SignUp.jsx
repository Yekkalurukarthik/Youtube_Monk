import React, { useState } from "react";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (data.userId) {
      alert("Signup successful! Login now.");
      navigate("/login");
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>🧘 Monk Signup</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          {/* Name */}
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="text"
              placeholder=" "
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className={styles.label}>Name</label>
          </div>

          {/* Email */}
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="email"
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className={styles.label}>Email</label>
          </div>

          {/* Password */}
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="password"
              placeholder=" "
              required
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className={styles.label}>Password</label>
          </div>

          <button className={styles.button} type="submit">
            Sign Up
          </button>
        </form>

        <div className={styles.footer}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </div>
      </div>
    </div>
  );
}