import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./BarGraph.css"; // Ensure you import your CSS file

const BarGraph = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Dummy data for visualization (replace with your actual data source)
  const inputData = [
    { lot: "A", checkpoint1: 40, checkpoint2: 30, checkpoint3: 20 },
    { lot: "B", checkpoint1: 35, checkpoint2: 25, checkpoint3: 15 },
    { lot: "C", checkpoint1: 50, checkpoint2: 40, checkpoint3: 30 },
  ];

  // Dummy statistics
  const stats = {
    inputBags: 500,
    outputBags: 450,
    inputAmount: 10000,
    finalRecovery: "90%",
  };

  // Date selection options (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  });

  // Handle error messages
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <div className="chart-container">
      <h2>Lot Wise Analysis</h2>

      {/* Date Selection - Left Aligned */}
      <div className="date-selection-container">
        <label htmlFor="dateSelect">Select Date:</label>
        <select
          id="dateSelect"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">-- Select Date --</option>
          {last7Days.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {/* Show Statistics - Left Aligned */}
      {selectedDate && (
        <div className="stats-container">
          <div className="stats-box">
            <label>Input Bags:</label>
            <p>{stats.inputBags || "N/A"}</p>
          </div>
          <div className="stats-box">
            <label>Output Bags:</label>
            <p>{stats.outputBags || "N/A"}</p>
          </div>
          <div className="stats-box">
            <label>Input Amount:</label>
            <p>{stats.inputAmount || "N/A"}</p>
          </div>
          <div className="stats-box">
            <label>Final Recovery:</label>
            <p>{stats.finalRecovery || "N/A"}</p>
          </div>
        </div>
      )}

      {/* Stats on Left - Bar Chart on Right */}
      {selectedDate && inputData.length > 0 && (
        <div className="content-wrapper">
          {/* Bar Chart */}
          <BarChart width={750} height={500} data={inputData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lot" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="checkpoint1"
              stackId="a"
              fill="#C0392B"
              name="Checkpoint 1"
            />
            <Bar
              dataKey="checkpoint2"
              stackId="a"
              fill="#28A745"
              name="Checkpoint 2"
            />
            <Bar
              dataKey="checkpoint3"
              stackId="a"
              fill="#897AD4"
              name="Checkpoint 3"
            />
          </BarChart>
        </div>
      )}

      {/* Snackbar for Error Messages */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BarGraph;
