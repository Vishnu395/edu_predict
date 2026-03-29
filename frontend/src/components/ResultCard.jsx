// ================================================================
// File: src/components/ResultCard.jsx
// ================================================================

export default function ResultCard({ prediction, loading }) {
  const gradeColor = {
    "A+": "#1D9E75",
    A: "#1D9E75",
    B: "#378ADD",
    C: "#EF9F27",
    D: "#D85A30",
    F: "#E24B4A",
  };

  if (loading) {
    return (
      <div className="card result-card">
        <div className="result-placeholder loading-pulse">
          Calculating prediction...
        </div>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="card result-card">
        <div className="result-placeholder">
          Your predicted score will appear here
        </div>
      </div>
    );
  }

  const color = gradeColor[prediction.grade] || "#888";

  return (
    <div className="card result-card">
      <h2 className="card-title">Prediction Result</h2>

      <div className="result-score" style={{ color }}>
        {prediction.predicted_score}%
      </div>

      <div className="result-grade" style={{ background: color + "22", color }}>
        Grade: {prediction.grade}
      </div>

      <p className="result-message">{prediction.message}</p>

      <div className="result-details">
        <div className="result-detail-row">
          <span>Hours studied</span>
          <strong>{prediction.hours} hrs/day</strong>
        </div>
        <div className="result-detail-row">
          <span>Model equation</span>
          <strong className="equation">{prediction.equation}</strong>
        </div>
      </div>
    </div>
  );
}

