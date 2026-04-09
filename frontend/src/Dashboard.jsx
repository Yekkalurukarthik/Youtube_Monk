import React, { useState, useEffect } from "react";
import { Chart } from "chart.js/auto";
import './Dashboard.css'
export default function Dashboard({ token, logout }) {
  const [user, setUser] = useState({});
  const [sessions, setSessions] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const res = await fetch("http://localhost:5000/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUser(data.user);
    setSessions(data.sessions);

    // Init Chart
    const ctx = document.getElementById("monkChart");
    if (ctx) {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.sessions.map(s => new Date(s.date).toLocaleDateString()),
          datasets: [
            { label: "Monk Time (mins)", data: data.sessions.map(s => s.minutes), backgroundColor: "#4CAF50" },
            { label: "Activations", data: data.sessions.map(s => s.activations), backgroundColor: "#FF9800" }
          ]
        },
        options: { responsive: true }
      });
    }
  };

  const totalMinutes = sessions.reduce((sum, s) => sum + s.minutes, 0);
  const totalActivations = sessions.reduce((sum, s) => sum + s.activations, 0);
  const goalCompletion = user.goalMinutes ? Math.round((totalMinutes / user.goalMinutes) * 100) : 0;

  return (
    <div className={dark ? "dark" : "light"} style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 className="MainOne">{user.name|| "Karthik"}'s Monk Dashboard</h1>
      <div className="MainOne" style={{ display: "flex", gap: "20px", marginBottom: 50 }}>
        <div style={{ padding: 20, background: dark ? "#222" : "#eee", borderRadius: 10 }}>Monk Time: {totalMinutes||20} mins</div>
        <div style={{ padding: 20, background: dark ? "#222" : "#eee", borderRadius: 10 }}>Activations: {totalActivations||2}</div>
        <div style={{ padding: 20, background: dark ? "#222" : "#eee", borderRadius: 10 }}>Goal Completion: {goalCompletion||50}%</div>
      </div>
      <canvas id="monkChart"></canvas>
            <button onClick={logout}>Logout</button>
      <button onClick={() => setDark(!dark)} style={{ marginLeft: 10 }}>{dark ? "Light Mode" : "Dark Mode"}</button>

    </div>
  );
}