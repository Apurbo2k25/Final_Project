# 📚 Quiz App – Capstone Project

An interactive full-stack quiz application that allows users to take topic-based quizzes, track their scores, and view leaderboards with badges. Features include dark mode, retake quiz option, and performance graph using Chart.js.

---

## 🔖 Project Title
**Interactive Quiz Application with Dynamic Question Generation and Result Evaluation**

---

## 🚀 Features

- Dynamic question generation using Open Trivia API
- Category and difficulty selection
- Real-time scoring and result evaluation
- Leaderboard with Gold/Silver/Bronze badges
- Dark mode toggle
- Score visualization using Chart.js
- Retake quiz option
- Responsive design for mobile & desktop
- Frontend hosted on Netlify, backend on Render

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **API**: Open Trivia DB
- **Hosting**: Netlify (frontend), Render (backend)
- **Visualization**: Chart.js
- **Version Control**: Git & GitHub

---

## 🌐 Live Deployment

- 🔗 Frontend: https://quizify2025.netlify.app/
- 🔗 Backend API: https://final-project-cxem.onrender.com/


---

## 🗂️ Folder Structure

Quiz_App/
├── backend/
│ ├── server.js
│ ├── package.json
├── frontend/
│ ├── index.html
│ ├── script.js
│ ├── styles.css
├── .gitignore
└── README.md
---

## 📦 How to Run Locally

# Clone the repo
git clone https://github.com/Apurbo2k25/Final_Project.git

# Backend setup
cd backend
npm install
node server.js

# Open frontend/index.html in your browser

📅 Progress Log

✅ Day 1 – Setup & Backend Integration
Work Done:

Created folder structure and basic files

Set up backend using Node.js + Express

Fetched quiz questions from Open Trivia API

Enabled category and difficulty filters

Tested API responses via frontend

Problems Faced:

Took time to understand API parameters

Faced issue starting the server (missing server.js initially)

✅ Day 2 – Frontend & Quiz Logic
Work Done:

Designed UI using HTML + CSS

Added category, difficulty selection and start button

Rendered dynamic questions with multiple options

Implemented submission logic and score evaluation

Problems Faced:

Struggled with capturing selected answers

Layout issues on small screens

✅ Day 3 – Features & Finishing Touches
Work Done:

Added username input and detailed result summary

Created leaderboard with badges (Gold, Silver, Bronze)

Integrated dark mode toggle

Added Retake Quiz button

Optional: Score graph using Chart.js

Finalized responsive design

Problems Faced:

Chart didn't display (Chart.js config issue)

Redesigned dark mode for better UX

Improved leaderboard format

✅ Day 4 – Backend Deployment & API Integration
What I Did:

Deployed the Express backend to Render

Configured CORS to allow frontend-backend communication

Replaced local API URLs with live Render endpoint

Implemented delay and cooldown to avoid API throttling

Verified frontend-backend integration in deployment

Problems Faced:

❌ CORS error: Blocked API due to missing headers

⏱️ Too many requests: OpenTDB throttled responses

How I Solved It:

Updated CORS policy in backend

Added 1-second delay and 5-second cooldown in frontend

🎉 Outcome:

App is fully deployed and functional online

Successfully integrated and tested all core features

🎥 Demo Video
🎬 Watch Demo Walkthrough

(Upload to Loom, Drive, or YouTube and paste link here)

📸 Screenshots
(Optional – you can add a screenshot like this)

💡 Challenges & Learnings
Understood full-stack integration with real APIs

Learned to fix CORS issues and request throttling

Practiced dynamic DOM rendering, async JS, and frontend-backend coordination

Explored data visualization with Chart.js

📬 Contact
If you have any questions or feedback, feel free to reach out via GitHub Issues or pull requests.


