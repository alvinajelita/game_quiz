// Data pertanyaan (dari game.js original)
    const questions = [
      {
        question: "🌐 Apa yang kamu gunakan untuk browsing internet?",
        answers: [
          { text: "Remote TV", correct: false },
          { text: "Web browser seperti Chrome atau Firefox", correct: true },
          { text: "Mesin cuci", correct: false },
        ]
      },
      {
        question: "🔋 Apa yang terjadi kalau baterai HP kamu habis?",
        answers: [
          { text: "HP berubah jadi robot", correct: false },
          { text: "HP bisa goreng telur", correct: false },
          { text: "HP mati dan tidak bisa digunakan", correct: true },
        ]
      },
      {
        question: "👨‍💻 Coding itu sebenarnya adalah...?",
        answers: [
          { text: "Menulis puisi cinta", correct: false },
          { text: "Menulis perintah untuk komputer", correct: true },
          { text: "Menggambar kartun", correct: false },
        ]
      },
      {
        question: "📡 Fungsi dari jaringan internet adalah...?",
        answers: [
          { text: "Menghubungkan perangkat ke seluruh dunia", correct: true },
          { text: "Memperbaiki sinyal TV", correct: false },
          { text: "Mendinginkan kulkas", correct: false },
        ]
      },
      {
        question: "🖱️ Mouse pada komputer digunakan untuk...?",
        answers: [
          { text: "Menangkap tikus", correct: false },
          { text: "Menulis di papan tulis", correct: false },
          { text: "Menggerakkan pointer dan klik", correct: true },
        ]
      },
      {
        question: "💻 Laptop yang lemot bisa jadi karena...?",
        answers: [
          { text: "Kurang makan", correct: false },
          { text: "Terlalu banyak aplikasi yang berjalan", correct: true },
          { text: "Tidak disiram air", correct: false },
        ]
      },
      {
        question: "📲 Apa itu aplikasi?",
        answers: [
          { text: "Jenis makanan cepat saji", correct: false },
          { text: "Perabot rumah", correct: false },
          { text: "Program di HP/komputer untuk membantu aktivitas", correct: true },
        ]
      },
      {
        question: "🔍 Google digunakan untuk...?",
        answers: [
          { text: "Mencari informasi di internet", correct: true },
          { text: "Mencari barang hilang di rumah", correct: false },
          { text: "Mencuci pakaian", correct: false },
        ]
      },
      {
        question: "🎧 Fungsi dari headphone adalah...?",
        answers: [
          { text: "Untuk topi gaya", correct: false },
          { text: "Mendengarkan suara tanpa mengganggu orang lain", correct: true },
          { text: "Mikroskop", correct: false },
        ]
      },
      {
        question: "🛡️ Apa itu antivirus di komputer?",
        answers: [
          { text: "Program untuk melindungi komputer dari virus", correct: true },
          { text: "Obat buat manusia", correct: false },
          { text: "Pelindung dari sinar matahari", correct: false },
        ]
      }
    ];

    // Variabel global
    let currentQuestionIndex = 0;
    let score = 0;
    let quizEnded = false;
    let timer;
    let timeLeft = 10;
    let username = "";

    // Ambil elemen dari HTML
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const scoreDisplay = document.getElementById("score-display");
    const introDiv = document.getElementById("intro");
    const quizContainer = document.getElementById("quiz-container");
    const scoreResult = document.getElementById("score-result");
    const usernameInput = document.getElementById("username");
    const startBtn = document.getElementById("start-btn");
    const timerEl = document.getElementById("timer");

    // 🔊 Audio Setup
    const introMusic = new Audio("sounds/intro_game.mp3");
    introMusic.loop = true;
    introMusic.volume = 0.4;

    const quizMusic = new Audio("sounds/intro_game.mp3");
    quizMusic.loop = true;
    quizMusic.volume = 0.3;

    const benarSound = new Audio("sounds/jawaban_benar.mp3");
    benarSound.volume = 1.0;

    const salahSound = new Audio("sounds/jawaban_salah.mp3");
    salahSound.volume = 1.0;

    const selesai = new Audio("sounds/ucapan_terimakasih.mp3");
    selesai.volume = 1.0;

    // Event listeners
    startBtn.addEventListener("click", startQuiz);
    usernameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") startQuiz();
    });

    function startQuiz() {
      username = usernameInput.value.trim();
      if (username === "") {
        alert("⚠️ Masukkan nama kamu dulu ya! 😊");
        usernameInput.focus();
        return;
      }

      // Stop intro music & play quiz music
      introMusic.pause();
      introMusic.currentTime = 0;
      quizMusic.play();

      // Reset game state
      currentQuestionIndex = 0;
      score = 0;
      quizEnded = false;
      
      introDiv.classList.add("hidden");
      quizContainer.classList.remove("hidden");
      scoreDisplay.innerText = `Skor: ${score} 🍀`;
      nextButton.innerText = "➡️ Selanjutnya";
      
      showQuestion();
    }

    function startTimer() {
      timeLeft = 10;
      timerEl.innerText = `⏱️ ${timeLeft} detik`;
      timerEl.classList.remove("warning");
      
      timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `⏱️ ${timeLeft} detik`;
        
        if (timeLeft <= 3) {
          timerEl.classList.add("warning");
        }
        
        if (timeLeft === 0) {
          clearInterval(timer);
          autoPickAnswer();
        }
      }, 500);
    }

    function autoPickAnswer() {
      const currentQuestion = questions[currentQuestionIndex];
      const buttons = answerButtons.children;

      Array.from(buttons).forEach(btn => {
        const isCorrect = currentQuestion.answers.find(a => a.text === btn.innerText).correct;
        btn.classList.add(isCorrect ? "correct" : "wrong");
        btn.disabled = true;
      });

      // Play wrong sound when time runs out
      salahSound.play();

      nextButton.classList.add("show");
    }

    function showQuestion() {
      resetState();
      clearInterval(timer);
      startTimer();

      const currentQuestion = questions[currentQuestionIndex];
      questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

      currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => selectAnswer(answer));
        answerButtons.appendChild(button);
      });
    }

    function resetState() {
      nextButton.classList.remove("show");
      answerButtons.innerHTML = "";
    }

    function selectAnswer(answer) {
      clearInterval(timer);
      const buttons = answerButtons.children;
      
      Array.from(buttons).forEach(btn => {
        const isCorrect = questions[currentQuestionIndex].answers.find(a => a.text === btn.innerText).correct;
        btn.classList.add(isCorrect ? "correct" : "wrong");
        btn.disabled = true;
      });

      if (answer.correct) {
        score++;
        benarSound.play(); // Play correct sound
      } else {
        salahSound.play(); // Play wrong sound
      }

      scoreDisplay.innerText = `Skor: ${score} 🍀`;
      nextButton.classList.add("show");
    }

    nextButton.addEventListener("click", () => {
      if (quizEnded) {
        startQuiz();
      } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          showQuestion();
        } else {
          showScore();
        }
      }
    });

    function showScore() {
      resetState();
      quizEnded = true;
      clearInterval(timer);
      
      // Stop quiz music & play completion sound
      quizMusic.pause();
      quizMusic.currentTime = 0;
      selesai.play();
      
      quizContainer.classList.add("hidden");
      scoreResult.classList.remove("hidden");

      const playerNameEl = document.getElementById("player-name");
      const finalScoreEl = document.getElementById("final-score");
      const scoreMessageEl = document.getElementById("score-message");

      playerNameEl.textContent = `Selamat, ${username}! 👋`;
      finalScoreEl.textContent = `${score}/${questions.length}`;

      const percentage = (score / questions.length) * 100;

      if (percentage === 100) {
        scoreMessageEl.textContent = "🏆 Sempurna! Kamu luar biasa!";
      } else if (percentage >= 80) {
        scoreMessageEl.textContent = "🌟 Hebat sekali! Kamu sangat pintar!";
      } else if (percentage >= 60) {
        scoreMessageEl.textContent = "👍 Bagus! Terus tingkatkan!";
      } else if (percentage >= 40) {
        scoreMessageEl.textContent = "💪 Tidak buruk! Semangat belajar lagi!";
      } else {
        scoreMessageEl.textContent = "📚 Ayo belajar lebih giat lagi!";
      }
    }

    function restartQuiz() {
      // Reset semua ke awal - NAMA AKAN DIHAPUS
      usernameInput.value = "";
      scoreResult.classList.add("hidden");
      introDiv.classList.remove("hidden");
      quizEnded = false;
      usernameInput.focus();
      
      // Restart intro music
      introMusic.currentTime = 0;
      introMusic.play();
    }

    // Focus otomatis ke input nama saat halaman dimuat & play intro music
    window.addEventListener("DOMContentLoaded", () => {
      usernameInput.focus();
      
      // Auto-play intro music (might be blocked by browser)
      introMusic.play().catch(err => {
        console.log("Auto-play blocked. Music will play after user interaction.");
      });
    });


