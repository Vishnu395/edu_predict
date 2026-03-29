// ================================================================
// File: src/components/MetricsPanel.jsx
// ================================================================

export function MetricsPanel({ metrics }) {
  const cards = [
    { label: "R² Score (Test)", value: metrics.r2_test, color: "#1D9E75", suffix: "" },
    { label: "Accuracy", value: metrics.accuracy_percent + "%", color: "#378ADD", suffix: "" },
    { label: "MAE", value: metrics.mae, color: "#EF9F27", suffix: " pts" },
    { label: "RMSE", value: metrics.rmse, color: "#D85A30", suffix: " pts" },
    { label: "CV Score (5-fold)", value: metrics.cv_score, color: "#534AB7", suffix: "" },
    { label: "R² Score (Train)", value: metrics.r2_train, color: "#1D9E75", suffix: "" },
  ];

  return (
    <div className="metrics-panel">
      <h2 className="section-title">Model Evaluation Metrics</h2>
      <div className="metrics-grid">
        {cards.map((c) => (
          <div className="metric-card" key={c.label}>
            <div className="metric-value" style={{ color: c.color }}>
              {c.value}
              {c.suffix}
            </div>
            <div className="metric-label">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MetricsPanel;

