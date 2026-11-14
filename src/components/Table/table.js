import React, { useState, useEffect } from "react";
import "./table.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
// import LineGraph from "./LineGraph";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const BarGraph = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [inputData, setInputData] = useState([]);
  const [backendData,setBackendData]=useState([]);
  const { vegetable_id: vegetableId } = useParams();

  // Get last 7 days for dropdown
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - i);
    return date.toISOString().split("T")[0];
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedDate) return;
          if (!vegetableId) return;
          const response = await axios.get(
            `http://127.0.0.1:8000/website/vegetables/${vegetableId}/combined-bargraph/?date=${selectedDate}`
          );
          console.log("Fetched Data:", response.data);
          setBackendData(response.data);
          setInputData(processFormattedData(backendData));
        
      } catch (error) {
        setErrorMessage("Failed to fetch data. Please try again.");
        setOpenSnackbar(true);
      }
    };
    fetchData();
  }, [vegetableId, selectedDate]);

  const processFormattedData = (data) => {
    return data.map((lot) => ({
      date: selectedDate,
      lot: lot.lot_number || "N/A",
      checkpoint1: (lot.wt_supplier || 0) - (lot.wt_ours || 0),
      checkpoint2: lot.waste || 0,
      checkpoint3: (lot.waste_blanching || 0) - ((lot.final_bags || 0) * 35),
      inputBags : lot.wt_ours/35,
      inputAmount: lot.wt_ours,
      outputBags: lot.final_bags,
      finalRecovery:lot.final_recovery,
    }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <div className="chart-container">
        <h2>Lot Wise Analysis</h2>
        <div className="range-selection">
        <label htmlFor="rangeSelect">Select Range:</label>
        <select id="rangeSelect">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="custom">Custom</option>
        </select>
      </div>

        {/* Date Selection */}
        <div className="date-selection-container">
          <label htmlFor="dateSelect">Select Date:</label>
          <input
            type="date"
            id="dateSelect"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          {/* <select
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
          </select> */}
        </div>

        {/* {selectedDate && (
          <div className="selected-date">
            <strong>Selected Date:</strong> {selectedDate}
          </div>
        )} */}
        <div className="graph_and_stat">
        {/* Show Statistics */}
        {selectedDate && inputData && (
          <div className="stats-container">
            <div className="stats-box">
              <label>Input Bags:</label>
              <p>{inputData.inputBags || "N/A"}</p>
            </div>
            <div className="stats-box">
              <label>Output Bags:</label>
              <p>{inputData.outputBags || "N/A"}</p>
            </div>
            <div className="stats-box">
              <label>Input Amount:</label>
              <p>{inputData.inputAmount || "N/A"}</p>
            </div>
            <div className="stats-box">
              <label>Final Recovery:</label>
              <p>{inputData.finalRecovery || "N/A"}</p>
            </div>
          </div>
        )}

        {/* Show Bar Graph */}
        {selectedDate && inputData.length > 0 && (
          <div className="content-wrapper">
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
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BarGraph;
