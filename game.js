// Data pertanyaan (dari game.js original)
const questions = [
  {
    question: "💡 Apa yang dimaksud dengan Teknologi Informasi (TI)?",
    answers: [
      { text: "Bidang yang mempelajari pengolahan data dan teknologi komputer", correct: true },
      { text: "Pelajaran tentang mesin industri berat", correct: false },
      { text: "Ilmu tentang perakitan bangunan", correct: false },
    ]
  },
  {
    question: "📚 Mata kuliah yang dipelajari di Teknologi Informasi adalah...",
    answers: [
      { text: "Memasak dan tata boga", correct: false },
      { text: "Pemrograman, Basis Data, dan Jaringan Komputer", correct: true },
      { text: "Olahraga dan seni tari", correct: false },
    ]
  },
  {
    question: "🧑‍💻 Selain coding, mahasiswa TI juga belajar tentang...",
    answers: [
      { text: "Keamanan sistem dan manajemen data", correct: true },
      { text: "Menjahit pakaian", correct: false },
      { text: "Perawatan tanaman", correct: false },
    ]
  },
  {
    question: "💼 Berikut ini yang termasuk profesi lulusan Teknologi Informasi adalah...",
    answers: [
      { text: "Koki dan pelayan restoran", correct: false },
      { text: "Atlet dan seniman", correct: false },
      { text: "Programmer, IT Support, dan Network Engineer", correct: true },
    ]
  },
  {
    question: "🌐 Lulusan Teknologi Informasi dibutuhkan karena...",
    answers: [
      { text: "Hampir semua bidang sekarang menggunakan sistem digital", correct: true },
      { text: "Semua orang harus bisa bermain game", correct: false },
      { text: "Komputer akan menggantikan manusia sepenuhnya", correct: false },
    ]
  },
  {
    question: "🎯 Mengapa lulusan SMK sangat cocok memilih Teknologi Informasi?",
    answers: [
      { text: "Tidak perlu belajar hal baru lagi", correct: false },
      { text: "Sudah terbiasa dengan praktik dan penggunaan teknologi", correct: true },
      { text: "Karena tidak ada jurusan lain", correct: false },
    ]
  },
  {
    question: "🔥 Alasan utama memilih Teknologi Informasi adalah...",
    answers: [
      { text: "Kuliah tanpa tugas", correct: false },
      { text: "Tidak perlu menggunakan komputer", correct: false },
      { text: "Peluang kerja luas dan masa depan cerah", correct: true },
    ]
  },
  {
    question: "💰 Bagaimana gambaran gaji lulusan Teknologi Informasi?",
    answers: [
      { text: "Relatif tinggi dan meningkat sesuai skill dan pengalaman", correct: true },
      { text: "Selalu kecil dan tidak berkembang", correct: false },
      { text: "Sama untuk semua orang tanpa melihat kemampuan", correct: false },
    ]
  },
  {
    question: "📈 Gaji lulusan TI bisa terus naik jika...",
    answers: [
      { text: "Terus mengasah skill dan mengikuti perkembangan teknologi", correct: true },
      { text: "Jarang belajar hal baru", correct: false },
      { text: "Menghindari tantangan", correct: false },
    ]
  },
  {
    question: "🚀 Memilih Teknologi Informasi berarti...",
    answers: [
      { text: "Tidak punya masa depan", correct: false },
      { text: "Siap berkarier di dunia digital dan teknologi", correct: true },
      { text: "Hanya belajar teori tanpa praktik", correct: false },
    ]
  }
];

    // Variabel global
    let currentQuestionIndex = 0;
    let score = 0;
    let quizEnded = false;
    let timer;
    let timeLeft = 5;
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
      timeLeft = 5;
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
      }, 1000);
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





