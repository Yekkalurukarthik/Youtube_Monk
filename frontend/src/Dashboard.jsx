// import React, { useState, useEffect } from "react";
// import { Chart } from "chart.js/auto";
// import './Dashboard.css'
// export default function Dashboard({token}) {
//   const [user, setUser] = useState({});
//   const [sessions, setSessions] = useState([]);
//   const [dark, setDark] = useState(false);

//   useEffect(() => {
//     if (token) {
//       fetchDashboard();
//     }
//   }, [token]);

//   const fetchDashboard = async () => {
//     console.log("inside the fetchashboard");
    
//     const res = await fetch("http://localhost:5000/api/dashboard", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log("Dashboard response status:", res.status);
//     const data = await res.json();
//     setUser(data.user);
//     setSessions(data.sessions);
//     console.log("After the data");
    
//     // Init Chart
//     const ctx = document.getElementById("monkChart");
//     if (ctx) {
//       new Chart(ctx, {
//         type: "bar",
//         data: {
//           labels: data.sessions.map(s => new Date(s.date).toLocaleDateString()),
//           datasets: [
//             { label: "Monk Time (mins)", data: data.sessions.map(s => s.minutes), backgroundColor: "#4CAF50" },
//             { label: "Activations", data: data.sessions.map(s => s.activations), backgroundColor: "#FF9800" }
//           ]
//         },
//         options: { responsive: true }
//       });
//     }
//   };

//   const totalMinutes = sessions.reduce((sum, s) => sum + s.minutes, 0);
//   const totalActivations = sessions.reduce((sum, s) => sum + s.activations, 0);
//   const goalCompletion = user.goalMinutes ? Math.round((totalMinutes / user.goalMinutes) * 100) : 0;

//   return (
//     <div className={dark ? "dark" : "light"} style={{ padding: "20px", fontFamily: "sans-serif" }}>
//       <h1 className="MainOne">{user.name || "User"}'s Monk Dashboard</h1>
//       <div className="MainOne" style={{ display: "flex", gap: "20px", marginBottom: 50 }}>
//         <div style={{ padding: 20, background: dark ? "#222" : "#eee", borderRadius: 10 }}>Monk Time: {totalMinutes ?? 20} mins</div>
//         <div style={{ padding: 20, background: dark ? "#222" : "#eee", borderRadius: 10 }}>Activations: {totalActivations ?? 2}</div>
//         <div style={{ padding: 20, background: dark ? "#222" : "#eee", borderRadius: 10 }}>Goal Completion: {goalCompletion ?? 50}%</div>
//       </div>
//       <canvas id="monkChart"></canvas>
//       <button >Logout</button>
//       <button onClick={() => setDark(!dark)} style={{ marginLeft: 10 }}>{dark ? "Light Mode" : "Dark Mode"}</button>

//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import "./Dashboard.css";

export default function Dashboard({ token }) {

  const [user, setUser] = useState({});
  const [sessions, setSessions] = useState([]);
  const [dark, setDark] = useState(false);

  const chartRef = useRef(null);

  useEffect(() => {

    if (token) {
      console.log("token in dashboard.jsx is",token);
      fetchDashboard();
    }

  }, [token]);

  const fetchDashboard = async () => {

    try {

      console.log("Inside fetchDashboard");
      console.log("Token:", token);

      const res = await fetch("http://localhost:5000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Dashboard response status:", res.status);

      const data = await res.json();

      console.log("Dashboard data:", data);

      setUser(data.user || {});
      setSessions(data.sessions || []);

      const ctx = document.getElementById("monkChart");

      if (ctx) {

        // Destroy previous chart
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
          type: "bar",

          data: {
            labels: (data.sessions || []).map((s) =>
              new Date(s.date).toLocaleDateString()
            ),

            datasets: [
              {
                label: "Monk Time (mins)",
                data: (data.sessions || []).map((s) => s.minutes),
                backgroundColor: "#4CAF50",
              },

              {
                label: "Activations",
                data: (data.sessions || []).map((s) => s.activations),
                backgroundColor: "#FF9800",
              },
            ],
          },

          options: {
            responsive: true,
          },
        });

      }

    } catch (err) {

      console.error("Dashboard fetch error:", err);

    }

  };

  const totalMinutes = sessions.reduce(
    (sum, s) => sum + (s.minutes || 0),
    0
  );

  const totalActivations = sessions.reduce(
    (sum, s) => sum + (s.activations || 0),
    0
  );

  const goalCompletion = user.goalMinutes
    ? Math.round((totalMinutes / user.goalMinutes) * 100)
    : 0;

  return (
    <div
      className={dark ? "dark" : "light"}
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        minHeight: "100vh",
      }}
    >

      <h1 className="MainOne">
        {user.name || "User"}'s Monk Dashboard
      </h1>

      <div
        className="MainOne"
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "50px",
          flexWrap: "wrap",
        }}
      >

        <div
          style={{
            padding: 20,
            background: dark ? "#222" : "#eee",
            borderRadius: 10,
          }}
        >
          Monk Time: {totalMinutes} mins
        </div>

        <div
          style={{
            padding: 20,
            background: dark ? "#222" : "#eee",
            borderRadius: 10,
          }}
        >
          Activations: {totalActivations}
        </div>

        <div
          style={{
            padding: 20,
            background: dark ? "#222" : "#eee",
            borderRadius: 10,
          }}
        >
          Goal Completion: {goalCompletion}%
        </div>

      </div>

      <canvas id="monkChart"></canvas>

      <div style={{ marginTop: "20px" }}>

        <button
          onClick={() => {
            chrome.storage.local.remove("token", () => {
              window.location.href = "/login";
            });
          }}
        >
          Logout
        </button>

        <button
          onClick={() => setDark(!dark)}
          style={{ marginLeft: 10 }}
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>

      </div>

    </div>
  );
}