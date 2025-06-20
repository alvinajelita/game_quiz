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

// Data pertanyaan
const questions = [
  {
    question: "📱 Di HP kamu, aplikasi seperti WhatsApp dan Instagram dibuat oleh siapa?",
    answers: [
      { text: "Tukang bangunan 🧱", correct: false },
      { text: "Programmer 👨‍💻👩‍💻", correct: true },
      { text: "Tukang servis HP", correct: false },
    ]
  },
  {
    question: "💾 Menyimpan file di Google Drive itu contoh dari...?",
    answers: [
      { text: "Cloud storage ☁️", correct: true },
      { text: "TV kabel 📺", correct: false },
      { text: "Kulkas pintar ❄️", correct: false },
    ]
  },
  {
    question: "🔐 Kenapa penting pakai password yang kuat?",
    answers: [
      { text: "Biar nggak gampang dibobol hacker 🕵️‍♂️", correct: true },
      { text: "Biar bisa buka kulkas", correct: false },
      { text: "Supaya lebih berat ngetiknya", correct: false },
    ]
  },
  {
    question: "🧑‍💻 Belajar di jurusan Teknologi Informasi itu bisa jadi...?",
    answers: [
      { text: "Pembuat aplikasi/game 🎮", correct: true },
      { text: "Tukang ledeng 💧", correct: false },
      { text: "Pemadam kebakaran 🔥", correct: false },
    ]
  },
  {
    question: "🛜 Kalau sinyal Wi-Fi hilang, artinya kamu tidak bisa...?",
    answers: [
      { text: "Makan gorengan", correct: false },
      { text: "Akses internet 🌐", correct: true },
      { text: "Nonton TV kabel", correct: false },
    ]
  },
  {
    question: "🎮 Game Mobile Legends bisa dimainkan karena ada...?",
    answers: [
      { text: "Sambungan listrik PLN ⚡", correct: false },
      { text: "Jaringan internet 📶", correct: true },
      { text: "Remote AC", correct: false },
    ]
  },
  {
    question: "🧠 Komputer bisa 'pintar' karena ada...?",
    answers: [
      { text: "Kecerdasan Buatan (AI) 🤖", correct: true },
      { text: "Otak manusia di dalamnya", correct: false },
      { text: "Tulang belakangnya", correct: false },
    ]
  },
  {
    question: "📸 Saat kamu selfie dan menyimpan foto, data itu tersimpan di...?",
    answers: [
      { text: "Memory / penyimpanan HP 💾", correct: true },
      { text: "Kamera orang lain", correct: false },
      { text: "Udara", correct: false },
    ]
  },
  {
    question: "🧾 Kalau kamu daftar online, biasanya harus isi...?",
    answers: [
      { text: "Nama dan data diri 📋", correct: true },
      { text: "Nomor sepatu", correct: false },
      { text: "Zodiak", correct: false },
    ]
  },
  {
    question: "💡 Teknologi Informasi itu mempelajari tentang...?",
    answers: [
      { text: "Cara bikin dan pakai teknologi digital 📱💻", correct: true },
      { text: "Cara menanam singkong", correct: false },
      { text: "Sejarah kerajaan", correct: false },
    ]
  }
  // Tambahkan soal lainnya di sini...
];

function startQuiz() {
  username = document.getElementById("username").value.trim();
  if (username === "") {
    alert("Masukkan nama kamu dulu ya! 😊");
    return;
  }

  introMusic.pause();
  introMusic.currentTime = 0;
  quizMusic.play();

  document.getElementById("intro").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";

  currentQuestionIndex = 0;
  score = 0;
  quizEnded = false;
  scoreDisplay.innerText = `Skor: ${score} 🍀`;
  nextButton.innerText = "➡️ Selanjutnya";
  showQuestion();
}

function startTimer() {
  timeLeft = 10;
  document.getElementById("timer").innerText = `⏱️ ${timeLeft} detik`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `⏱️ ${timeLeft} detik`;
    if (timeLeft === 0) {
      clearInterval(timer);
      autoPickAnswer();
    }
  }, 800);
}

function autoPickAnswer() {
  const currentQuestion = questions[currentQuestionIndex];
  const buttons = answerButtons.children;

  Array.from(buttons).forEach(btn => {
    const isCorrect = currentQuestion.answers.find(a => a.text === btn.innerText).correct;
    btn.classList.add(isCorrect ? "correct" : "wrong");
    btn.disabled = true;
  });

  salahSound.play();
  nextButton.style.display = "block";
}

function showQuestion() {
  resetState();
  clearInterval(timer);
  startTimer();

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn", "btn-outline-primary", "answer-btn");
    button.addEventListener("click", () => selectAnswer(answer));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
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
    benarSound.play();
    score++;
  } else {
    salahSound.play();
  }

  scoreDisplay.innerText = `Skor: ${score} 🍀`;
  nextButton.style.display = "block";
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
  document.getElementById("quiz-container").style.display = "none";

  const scoreResult = document.getElementById("score-result");
  const finalScore = document.getElementById("final-score");

  scoreResult.style.display = "block";
  finalScore.innerHTML = `
    <div class="emoji-top">🎉</div>
    <div class="score-text">Selamat ${username}!</div>
    <div class="score-text">Skormu: ${score}/${questions.length}</div>
    <div class="emoji-bottom">🏆</div>
  `;

  selesai.play();

  nextButton.style.display = "none";
  setTimeout(() => {
    nextButton.innerText = "🔁 Main lagi";
    nextButton.style.display = "block";
    document.getElementById("intro").style.display = "block";
    document.getElementById("username").value = "";
  }, 3000);
}

// 🔊 Suara
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

window.addEventListener("DOMContentLoaded", () => {
  introMusic.play();

  const startButton = document.getElementById("start-btn");
  if (startButton) {
    startButton.addEventListener("click", startQuiz);
  } else {
    console.error("Tombol start tidak ditemukan!");
  }
});
