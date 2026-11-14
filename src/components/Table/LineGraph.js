import React, { useState, useEffect } from "react";
import "./LineGraph.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
    { date: "2025-03-18", waste: 100 },
    { date: "2025-03-19", waste: 90 },
    { date: "2025-03-20", waste: 120 },
    { date: "2025-03-21", waste: 150 },
    { date: "2025-03-22", waste: 180 },
    { date: "2025-03-23", waste: 110 },
    { date: "2025-03-24", waste: 90 },
    { date: "2025-03-25", waste: 130 },
    { date: "2025-03-26", waste: 160 },
];

const LineGraph = () => {
    const [timeRange, setTimeRange] = useState("daily");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        if (timeRange === "custom" && fromDate && toDate) {
            const filtered = data.filter((item) => item.date >= fromDate && item.date <= toDate);
            setFilteredData(filtered.length > 0 ? filtered : data);
        } else {
            setFilteredData(data);
        }
    }, [timeRange, fromDate, toDate]);

    // Get today's date
    const today = new Date().toISOString().split("T")[0];

    // Get 10 days ago for custom range
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate()-40);
    const minDate = tenDaysAgo.toISOString().split("T")[0];

    // Get last 7 days for Weekly range
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const weeklyStartDate = sevenDaysAgo.toISOString().split("T")[0];

    return (
        <div className="chart-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h2 className="line-graph-title">Waste Production Analysis</h2>
            
            {/* Time Selection Section */}
            <div className="time-selection-container">
                <label htmlFor="timeRange">Select Range:</label>
                <select id="timeRange" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="custom">Custom</option>
                </select>
            </div>

            {/* Show selected date range */}
            {timeRange === "custom" ? (
                <div className="date-selection">
                    <label >From:</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        min={minDate}
                        max={today}
                    />

                    <label style={{ marginLeft: "20px" }}>To:</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        min={fromDate || minDate}
                        max={today}
                    />
                </div>
            ) : timeRange === "weekly" ? (
                <div className="selected-date">
                    <strong>Selected Date Range:</strong> {weeklyStartDate} to {today}
                </div>
            ) : null}

            {/* Centered Line Chart */}
            <div className="line-graph-wrapper" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <ResponsiveContainer width="80%" height={350}>
                    <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 30, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" padding={{ left: 80, right: 80 }} tick={{ fill: 'black' }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="waste" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineGraph;