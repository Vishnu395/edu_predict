// ================================================================
// File: src/components/ChartPanel.jsx
// Requires: npm install recharts
// ================================================================

import {
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  ComposedChart,
  ReferenceDot,
  Legend,
} from "recharts";

function buildHistogram(values, { binSize, max, label }) {
  const binCount = Math.ceil(max / binSize);
  const bins = Array.from({ length: binCount }, (_, i) => ({
    bin: `${(i * binSize).toFixed(0)}–${((i + 1) * binSize).toFixed(0)}`,
    count: 0,
  }));

  for (const v of values) {
    const x = typeof v === "number" ? v : Number(v);
    if (!Number.isFinite(x)) continue;
    if (x < 0) continue;
    const idx = Math.min(Math.floor(x / binSize), binCount - 1);
    bins[idx].count += 1;
  }

  return bins.map((b) => ({ ...b, label }));
}

export default function ChartPanel({ chartData, prediction }) {
  // Merge scatter + regression line for ComposedChart
  const linePoints = chartData.regression_line.x.map((x, i) => ({
    x: x,
    y: chartData.regression_line.y[i],
  }));

  const scatterPoints = chartData.scatter.x.map((x, i) => ({
    x: x,
    y: chartData.scatter.y[i],
  }));

  const hourValues = chartData.scatter.x.map((v) => Number(v));
  const scoreValues = chartData.scatter.y.map((v) => Number(v));

  const hoursHist = buildHistogram(hourValues, { binSize: 1, max: 10, label: "Hours" });
  const scoresHist = buildHistogram(scoreValues, { binSize: 10, max: 100, label: "Scores" });

  return (
    <div className="chart-panel">
      <h2 className="section-title">Data Visualization</h2>
      <div className="charts-row">
        {/* Chart 1: Scatter + Regression Line */}
        <div className="chart-card">
          <h3 className="chart-title">Hours Studied vs Score</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="x"
                type="number"
                domain={[0, 10]}
                label={{ value: "Hours studied", position: "insideBottom", offset: -5 }}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                dataKey="y"
                type="number"
                domain={[0, 100]}
                label={{ value: "Score (%)", angle: -90, position: "insideLeft" }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(val, name) => [
                  `${val}${name === "Score" ? "%" : " hrs"}`,
                  name,
                ]}
              />
              <Legend verticalAlign="top" />
              <Scatter
                name="Actual data"
                data={scatterPoints}
                fill="#378ADD"
                opacity={0.8}
              />
              <Line
                name="Regression line"
                data={linePoints}
                dataKey="y"
                dot={false}
                stroke="#E24B4A"
                strokeWidth={2}
                type="monotone"
              />
              {prediction && (
                <ReferenceDot
                  x={prediction.hours}
                  y={prediction.predicted_score}
                  r={8}
                  fill="#1D9E75"
                  stroke="white"
                  strokeWidth={2}
                  label={{
                    value: `${prediction.predicted_score}%`,
                    position: "top",
                    fontSize: 12,
                  }}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
          {prediction && (
            <p className="chart-note">
              Green dot = your prediction ({prediction.hours} hrs → {prediction.predicted_score}
              %)
            </p>
          )}
        </div>

        {/* Chart 2: Bar chart of study ranges vs avg score */}
        <div className="chart-card">
          <h3 className="chart-title">Score by Study Range</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart
              data={[
                { range: "1–3 hrs", avg: 28 },
                { range: "3–5 hrs", avg: 42 },
                { range: "5–7 hrs", avg: 62 },
                { range: "7–9 hrs", avg: 79 },
                { range: "9+ hrs", avg: 91 },
              ]}
              margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="range" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(val) => [`${val}%`, "Avg Score"]} />
              <Legend verticalAlign="top" />
              <Line
                name="Avg score"
                dataKey="avg"
                stroke="#1D9E75"
                strokeWidth={2.5}
                dot={{ fill: "#1D9E75", r: 5 }}
                type="monotone"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: Hours histogram */}
        <div className="chart-card">
          <h3 className="chart-title">Distribution of Study Hours</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={hoursHist} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="bin" tick={{ fontSize: 11 }} interval={0} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(val) => [val, "Students"]} />
              <Bar dataKey="count" name="Students" fill="#378ADD" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="chart-note">Histogram built from the training dataset</p>
        </div>

        {/* Chart 4: Scores histogram */}
        <div className="chart-card">
          <h3 className="chart-title">Distribution of Scores</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={scoresHist} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="bin" tick={{ fontSize: 11 }} interval={0} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(val) => [val, "Students"]} />
              <Bar dataKey="count" name="Students" fill="#1D9E75" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="chart-note">Histogram built from the training dataset</p>
        </div>
      </div>
    </div>
  );
}

