# EduPredict – How to Run the Project

## Prerequisites

- **Python 3.x** installed
- **Node.js** installed
- The `backend/venv` virtual environment already set up (included in this project)

---

## Step 1 – Start the Flask Backend

Open a terminal (PowerShell or Command Prompt) and run:

```powershell
cd backend
.\venv\Scripts\python.exe app.py
```

You should see:

```
=======================================================
  EduPredict Flask API  ->  http://localhost:5000
  Model: score = 25.0 + 7.4065 x hours
  9.25 hrs -> 93.51%
=======================================================
 * Running on http://127.0.0.1:5000
```

> Keep this terminal open. The backend must stay running.

---

## Step 2 – Start the React Frontend

Open a **second** terminal and run:

```powershell
cd frontend
node .\node_modules\vite\bin\vite.js
```

You should see:

```
  VITE v5.x  ready in ...ms

  Local:   http://localhost:5173/
```

> If `npm run dev` gives a script execution error (PowerShell policy), use the `node` command above instead.

---

## Step 3 – Open the App

Open your browser and go to:

```
http://localhost:5173
```

---

## Step 4 – Use the App

1. Enter the number of hours studied per day in the input field (e.g. `9.25`).
2. Click **Predict Score**.
3. The predicted exam score will appear on the right (e.g. `93.51%` for 9.25 hrs).
4. Scroll down to see model evaluation metrics and data visualisation charts.

---

## API Endpoints (Backend Reference)

| Method | Endpoint      | Description                          |
|--------|---------------|--------------------------------------|
| POST   | `/predict`    | Predict score for given hours        |
| GET    | `/metrics`    | Return model evaluation metrics      |
| GET    | `/chartdata`  | Return scatter/regression chart data |
| GET    | `/health`     | Health check                         |

**Example POST request:**
```json
POST http://localhost:5000/predict
{ "hours": 9.25 }
```

**Response:**
```json
{
  "hours": 9.25,
  "predicted_score": 93.51,
  "slope": 7.4065,
  "intercept": 25.0,
  "formula": "score = 25.00 + 7.4065 x 9.25"
}
```

---

## Stopping the Servers

Press `Ctrl + C` in each terminal to stop the backend and frontend.
