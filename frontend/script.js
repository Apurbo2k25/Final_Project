document.addEventListener('DOMContentLoaded', () => {
  const welcomeSection = document.getElementById('welcome-section');
  const quizSection = document.getElementById('quiz-section');
  const container = document.getElementById('quiz-container');
  const resultBox = document.getElementById('result');
  const leaderboardBox = document.getElementById('leaderboard');
  const chartCanvas = document.getElementById('myChart');
  const loader = document.getElementById("loader");
  const submitBtn = document.getElementById('submit-btn');

  const categoryMap = {
    "18": "Computer",
    "9": "General Knowledge",
    "20": "Mythology",
    "23": "History"
  };

  let quizData = [];
  let userName = '';
  let quizMeta = { categoryName: '', difficultyName: '' };
  let lastRequestTime = 0;

  // Restore dark mode
  if (localStorage.getItem("dark_mode") === "enabled") {
    document.body.classList.add('dark-mode');
    const toggle = document.getElementById("dark-toggle");
    if (toggle) toggle.checked = true;
  }

  window.toggleDarkMode = function () {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem("dark_mode", isDark ? "enabled" : "disabled");
  };

  window.startQuiz = async function () {
    const now = Date.now();
    if (now - lastRequestTime < 5000) {
      return alert("⏳ Please wait a few seconds before starting another quiz.");
    }
    lastRequestTime = now;

    const nameInput = document.getElementById('username').value.trim();
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;

    if (!nameInput) return alert("Please enter your name to begin!");

    userName = nameInput;
    localStorage.setItem("quiz_user", userName);
    quizMeta = {
      categoryName: categoryMap[category] || "Unknown",
      difficultyName: difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
    };

    // UI Updates before fetch
    loader.style.display = 'block';
    welcomeSection.style.display = 'none';
    quizSection.style.display = 'none';
    container.innerHTML = '';
    resultBox.innerHTML = '';
    leaderboardBox.innerHTML = '';
    chartCanvas?.style && (chartCanvas.style.display = 'none');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    try {
      const response = await fetch(
        `https://final-project-cxem.onrender.com/api/questions?category=${category}&difficulty=${difficulty}`,
        { signal: controller.signal }
      );
      clearTimeout(timeout);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        quizData = data.results;
        quizSection.style.display = 'block';
        loadQuiz();
      } else {
        alert("❌ No quiz questions found for this category/difficulty.");
        resetToWelcome();
      }
    } catch (err) {
      console.error("⚠️ Failed to load quiz:", err);
      alert("Backend is sleeping or network error. Please try again after a few seconds.");
      resetToWelcome();
    } finally {
      loader.style.display = 'none';
    }
  };

  function resetToWelcome() {
    welcomeSection.style.display = 'block';
    quizSection.style.display = 'none';
    loader.style.display = 'none';
    container.innerHTML = '';
  }

  function loadQuiz() {
    container.innerHTML = '';
    quizData.forEach((q, index) => {
      const options = shuffle([...q.incorrect_answers, q.correct_answer]);
      const questionEl = document.createElement('div');
      questionEl.classList.add('question');
      questionEl.innerHTML = `<p><strong>${index + 1}.</strong> ${decodeHTML(q.question)}</p>`;

      const optionsHTML = options.map(opt => `
        <label>
          <input type="radio" name="question${index}" value="${decodeHTML(opt)}"> ${decodeHTML(opt)}
        </label><br>`).join('');

      const optionsContainer = document.createElement('div');
      optionsContainer.classList.add('options');
      optionsContainer.innerHTML = optionsHTML;

      questionEl.appendChild(optionsContainer);
      container.appendChild(questionEl);
    });
  }

  submitBtn.addEventListener('click', () => {
    for (let i = 0; i < quizData.length; i++) {
      const selected = document.querySelector(`input[name="question${i}"]:checked`);
      if (!selected) return alert("⚠️ Please answer all questions.");
    }

    let score = 0;
    const resultDetails = [];

    quizData.forEach((q, index) => {
      const selected = document.querySelector(`input[name="question${index}"]:checked`);
      const userAnswer = decodeHTML(selected.value);
      const correctAnswer = decodeHTML(q.correct_answer);
      const isCorrect = userAnswer === correctAnswer;
      if (isCorrect) score++;
      resultDetails.push({ question: decodeHTML(q.question), userAnswer, correctAnswer, isCorrect });
    });

    const total = quizData.length;
    let badge = "🔰 Beginner";
    if (score === total) badge = "🥇 Gold";
    else if (score >= total * 0.7) badge = "🥈 Silver";
    else if (score >= total * 0.4) badge = "🥉 Bronze";

    const allScores = JSON.parse(localStorage.getItem("quiz_leaderboard") || "[]");
    allScores.push({
      name: userName,
      score,
      total,
      category: quizMeta.categoryName,
      difficulty: quizMeta.difficultyName
    });
    localStorage.setItem("quiz_leaderboard", JSON.stringify(allScores));

    container.innerHTML = '';
    quizSection.style.display = 'none';

    let resultHTML = `<h2>🎯 Result for ${userName}</h2>
      <p>📘 Topic: ${quizMeta.categoryName}</p>
      <p>🎚️ Level: ${quizMeta.difficultyName}</p>
      <p>✅ Correct: ${score}/${total}</p>
      <p>🏅 Badge: ${badge}</p><hr>`;

    resultDetails.forEach((item, i) => {
      resultHTML += `<div class="result-question">
        <p><strong>Q${i + 1}:</strong> ${item.question}</p>
        <p>Your Answer: <span style="color:${item.isCorrect ? 'green' : 'red'}">${item.userAnswer}</span></p>
        ${!item.isCorrect ? `<p>Correct Answer: <strong style="color:green">${item.correctAnswer}</strong></p>` : ''}
      </div><hr>`;
    });

    resultBox.innerHTML = resultHTML;

    const retakeBtn = document.createElement('button');
    retakeBtn.textContent = "🔁 Retake Quiz";
    retakeBtn.className = "btn btn-warning mt-3";
    retakeBtn.onclick = resetToWelcome;
    resultBox.appendChild(retakeBtn);

    const topScores = [...allScores].sort((a, b) => b.score - a.score).slice(0, 3);
    leaderboardBox.innerHTML = `<h3>🏆 Top 3 Leaderboard</h3><ol>` +
      topScores.map(entry => `<li>${entry.name} — ${entry.category} (${entry.difficulty}): ${entry.score}/${entry.total}</li>`).join('') +
      `</ol>`;
  });

  window.resetLeaderboard = function () {
    if (confirm("Clear leaderboard data? This cannot be undone.")) {
      localStorage.removeItem("quiz_leaderboard");
      leaderboardBox.innerHTML = "<p>Leaderboard has been cleared.</p>";
    }
  };

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
