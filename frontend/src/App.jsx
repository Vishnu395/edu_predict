import { useState, useEffect } from "react";
import PredictionForm from "./components/PredictionForm";
import ResultCard from "./components/ResultCard";
import MetricsPanel from "./components/MetricsPanel";
import ChartPanel from "./components/ChartPanel";
import "./App.css";

const API_BASE =
  import.meta.env.VITE_API_BASE || `http://${window.location.hostname}:5000`;

export default function App() {
  const [prediction, setPrediction] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [metricsLoading, setMetricsLoading] = useState(true);

  // Load metrics and chart data on mount
  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/metrics`).then((r) => r.json()),
      fetch(`${API_BASE}/chartdata`).then((r) => r.json()),
    ])
      .then(([m, c]) => {
        setMetrics(m);
        setChartData(c);
        setMetricsLoading(false);
      })
      .catch(() => {
        setError(
          "Could not connect to backend. Make sure Flask is running on port 5000."
        );
        setMetricsLoading(false);
      });
  }, []);

  // Handle prediction form submit
  const handlePredict = async (hours) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hours }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPrediction(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">&#9698;</span>
            <span className="logo-text">EduPredict</span>
          </div>
          <p className="tagline">
            Student Score Prediction using Machine Learning
          </p>
        </div>
      </header>

      <main className="main">
        {error && (
          <div className="error-banner">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Top row: form + result */}
        <div className="top-row">
          <PredictionForm onPredict={handlePredict} loading={loading} />
          <ResultCard prediction={prediction} loading={loading} />
        </div>

        {/* Metrics row */}
        {!metricsLoading && metrics && <MetricsPanel metrics={metrics} />}

        {/* Chart row */}
        {chartData && <ChartPanel chartData={chartData} prediction={prediction} />}
      </main>

      <footer className="footer">
        <p>EduPredict &mdash; Final Year Project &mdash; Linear Regression Model</p>
      </footer>
    </div>
  );
}
