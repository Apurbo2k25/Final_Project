📚 Quiz App – Capstone Project
🔖 Project Title:

Interactive Quiz Application with Dynamic Question Generation and Result Evaluation

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

Struggled with correctly capturing selected answers

Layout issues appeared on small screen devices

✅ Day 3 – Features & Finishing Touches
Work Done:

Added username input and detailed result summary

Created leaderboard with badges (Gold, Silver, Bronze)

Integrated dark mode toggle

Added Retake Quiz button

Optional: Score graph with Chart.js

Finalized responsive design

Problems Faced:

Chart didn’t display initially (Chart.js config issue)

Dark mode design was not appealing – had to redesign

Leaderboard format was not proper in the beginning


✅ Day 4 – Backend Deployment & API Integration
🔧 What I Did:
Deployed the Express.js backend to Render.

Configured CORS to allow secure communication with my Netlify frontend.

Replaced local API URLs in the frontend with the live Render API endpoint.

Implemented a 1-second delay and 5-second cooldown to limit API call frequency.

Successfully connected frontend and backend, completing full-stack integration.

Verified that the quiz loads and works correctly in real deployment.

⚠️ Problems Faced:
❌ CORS error: The browser blocked the API call due to missing Access-Control-Allow-Origin in the backend.

⏱️ Too many requests issue: OpenTDB was throttling due to rapid requests.

✅ Solved both by updating backend CORS policy and adding delay/cooldown in frontend.

🎉 Outcome:
The app is now fully deployed and functional online.

Successfully completed full integration and testing of all core features.