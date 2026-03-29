Here is your content in clean **Markdown (.md) format** 👇

---

````md
# 🚀 Run EduPredict

## 1) Start Backend (Flask)

Open a terminal in the **project root** (the folder that contains `edupredict/`) and run:

```powershell
&".\edupredict\backend\venv\Scripts\python.exe" ".\edupredict\backend\day1_training.py"
&".\edupredict\backend\venv\Scripts\python.exe" ".\edupredict\backend\app.py"
````

✅ Backend URL: [http://127.0.0.1:5000](http://127.0.0.1:5000)

---

## 2) Start Frontend (Vite)

Open a **new terminal** and run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
cd .\frontend
npm install
npm run dev
```

✅ Frontend URL: [http://localhost:5173](http://localhost:5173)

---

## 💡 Notes

* Make sure you are using **PowerShell** for the `&` commands.
* Ensure the virtual environment (`venv`) is created properly.
* Install required backend packages if errors occur:

```powershell
pip install flask pandas scikit-learn
```

* Make sure Node.js is installed for frontend.

---

## 🔥 Recommended (Simpler Method)

Instead of long paths:

```powershell
cd edupredict\backend
.\venv\Scripts\activate
python day1_training.py
python app.py
```

Then for frontend:

```powershell
cd ../frontend
npm install
npm run dev
```

```

---

If you want, I can also convert this into a **README.md for your GitHub project** with badges, screenshots, and structure 👍
```
