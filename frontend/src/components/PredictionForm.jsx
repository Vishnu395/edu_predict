// ================================================================
// File: src/components/PredictionForm.jsx
// ================================================================

import { useState } from "react";

export default function PredictionForm({ onPredict, loading }) {
  const [hours, setHours] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(hours);
    if (isNaN(val) || val <= 0 || val > 24) {
      alert("Please enter valid hours between 0.1 and 24.");
      return;
    }
    onPredict(val);
  };

  const quickSelect = [1, 2, 3, 5, 7, 9];

  return (
    <div className="card form-card">
      <h2 className="card-title">Predict Score</h2>
      <p className="card-sub">
        Enter daily study hours to get predicted exam score
      </p>

      <form onSubmit={handleSubmit} className="predict-form">
        <div className="input-group">
          <label htmlFor="hours-input">Hours studied per day</label>
          <input
            id="hours-input"
            type="number"
            min="0.1"
            max="24"
            step="any"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="e.g. 9.25"
            className="hours-input"
            required
          />
        </div>

        {/* Quick select buttons */}
        <div className="quick-select">
          <span className="quick-label">Quick select:</span>
          {quickSelect.map((h) => (
            <button
              key={h}
              type="button"
              className={`quick-btn ${parseFloat(hours) === h ? "active" : ""}`}
              onClick={() => setHours(String(h))}
            >
              {h}h
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="predict-btn"
          disabled={loading || !hours}
        >
          {loading ? "Predicting..." : "Predict Score"}
        </button>
      </form>
    </div>
  );
}

