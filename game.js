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
    question: "🌐 Apa yang kamu gunakan untuk browsing internet?",
    answers: [
      { text: "Remote TV", correct: false },
      { text: "Web browser seperti Chrome atau Firefox 🧭", correct: true },
      { text: "Mesin cuci", correct: false },
    ]
  },
  {
    question: "🔋 Apa yang terjadi kalau baterai HP kamu habis?",
    answers: [
      { text: "HP berubah jadi robot", correct: false },
      { text: "HP bisa goreng telur", correct: false },
      { text: "HP mati dan tidak bisa digunakan 🔌", correct: true },
    ]
  },
  {
    question: "👨‍💻 Coding itu sebenarnya adalah...?",
    answers: [
      { text: "Menulis puisi cinta", correct: false },
      { text: "Menulis perintah untuk komputer 💻", correct: true },
      { text: "Menggambar kartun", correct: false },
    ]
  },
  {
    question: "📡 Fungsi dari jaringan internet adalah...?",
    answers: [
      { text: "Menghubungkan perangkat ke seluruh dunia 🌍", correct: true },
      { text: "Memperbaiki sinyal TV", correct: false },
      { text: "Mendinginkan kulkas", correct: false },
    ]
  },
  {
    question: "🖱️ Mouse pada komputer digunakan untuk...?",
    answers: [
      { text: "Menangkap tikus", correct: false },
      { text: "Menulis di papan tulis", correct: false },
      { text: "Menggerakkan pointer dan klik 📍", correct: true },
    ]
  },
  {
    question: "💻 Laptop yang lemot bisa jadi karena...?",
    answers: [
      { text: "Kurang makan", correct: false },
      { text: "Terlalu banyak aplikasi yang berjalan ⚙️", correct: true },
      { text: "Tidak disiram air", correct: false },
    ]
  },
  {
    question: "📲 Apa itu aplikasi?",
    answers: [
      { text: "Jenis makanan cepat saji", correct: false },
      { text: "Perabot rumah", correct: false },
      { text: "Program di HP/komputer untuk membantu aktivitas 💼", correct: true },
    ]
  },
  {
    question: "🔍 Google digunakan untuk...?",
    answers: [
      { text: "Mencari informasi di internet 🔎", correct: true },
      { text: "Mencari barang hilang di rumah", correct: false },
      { text: "Mencuci pakaian", correct: false },
    ]
  },
  {
    question: "🎧 Fungsi dari headphone adalah...?",
    answers: [
      { text: "Untuk topi gaya", correct: false },
      { text: "Mendengarkan suara tanpa mengganggu orang lain 🎶", correct: true },
      { text: "Mikroskop", correct: false },
    ]
  },
  {
    question: "🛡️ Apa itu antivirus di komputer?",
    answers: [
      { text: "Program untuk melindungi komputer dari virus 💉", correct: true },
      { text: "Obat buat manusia", correct: false },
      { text: "Pelindung dari sinar matahari", correct: false },
    ]
  }
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
  }, 350);
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
