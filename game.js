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
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score-display");

// let currentQuestionIndex = 0;
// let score = 0;
// let quizEnded = false;

let username = "";
let quizEnded = false;
let timer;
let timeLeft = 10;


// function startQuiz() {
//   currentQuestionIndex = 0;
//   score = 0;
//   quizEnded = false;
//   scoreDisplay.innerText = `Skor: ${score} 🍀`;
//   nextButton.innerText = "➡️ Selanjutnya";
//   showQuestion();
// }

function startQuiz() {
  // Stop intro music & mulai quiz music
  introMusic.pause();
  introMusic.currentTime = 0;

  quizMusic.play();

  document.getElementById("intro").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";

  username = document.getElementById("username").value.trim();
  if (username === "" && !quizEnded) {
    alert("Masukkan nama kamu dulu ya! 😊");
    return;
  }

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
      autoPickAnswer(); // Otomatis kalau timeout
    }
  }, 500);
}

function autoPickAnswer() {
  const buttons = answerButtons.children;
  if (buttons.length > 0) {
    buttons[0].click(); // klik jawaban pertama
  }
}


// function showQuestion() {
//   resetState();
//   const currentQuestion = questions[currentQuestionIndex];
//   questionElement.innerText = currentQuestion.question;

//   currentQuestion.answers.forEach(answer => {
//     const button = document.createElement("button");
//     button.innerText = answer.text;
//     button.classList.add("answer-btn");
//     button.addEventListener("click", () => selectAnswer(answer));
//     answerButtons.appendChild(button);
//   });
// }

function showQuestion() {
  resetState();
  clearInterval(timer);
  startTimer();

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-btn");
    button.addEventListener("click", () => selectAnswer(answer));
    answerButtons.appendChild(button);
  });
}



function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

// function selectAnswer(answer) {
//   const buttons = answerButtons.children;
//   Array.from(buttons).forEach(btn => {
//     const isCorrect = questions[currentQuestionIndex].answers.find(a => a.text === btn.innerText).correct;
//     btn.classList.add(isCorrect ? "correct" : "wrong");
//     btn.disabled = true;
//   });

//   if (answer.correct) {
//     score++;
//   }

//   scoreDisplay.innerText = `Skor: ${score} 🍀`;
//   nextButton.style.display = "block";
// }

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
    startQuiz(); // 🔁 Ulang kuis
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

  // Sembunyikan kontainer quiz
  document.getElementById("quiz-container").style.display = "none";

  // Tampilkan hasil skor besar
  // const scoreResult = document.getElementById("score-result");
  // const finalScore = document.getElementById("final-score");
  // scoreResult.style.display = "block";
  // finalScore.innerText = `🎉 Selamat ${username}!\nSkormu: ${score}/${questions.length} 🏆`;

  const scoreResult = document.getElementById("score-result");
  const finalScore = document.getElementById("final-score");

  scoreResult.style.display = "block";
  finalScore.innerHTML = `
  <div class="emoji-top">🎉</div>
  <div class="score-text">Selamat ${username}!</div>
  <div class="score-text">Skormu: ${score}/${questions.length}</div>
  <div class="emoji-bottom">🏆</div>
`;



  // Mainkan suara ucapan terima kasih
  selesai.play();

  // Sembunyikan tombol "Main Lagi" selama 3 detik
  nextButton.style.display = "none";
  setTimeout(() => {
    nextButton.innerText = "🔁 Main lagi";
    nextButton.style.display = "block";
    document.getElementById("intro").style.display = "block";
    document.getElementById("username").value = "";
  }, 3000);
}


// const benarSound = new Audio("sounds/jawaban_benar.mp3");
// benarSound.volume = 1.0; // Maksimal

// const salahSound = new Audio("sounds/jawaban_salah.mp3");
// salahSound.volume = 1.0; // Maksimal

// const selesai = new Audio("sounds/ucapan_terimakasih.mp3");
// selesai.volume = 1.0; // Maksimal


const introMusic = new Audio("sounds/intro_game.mp3");
// introMusic.loop = true;
introMusic.volume = 0.4; // Volume kecil (maks = 1)

const quizMusic = new Audio("sounds/intro_game.mp3");
// quizMusic.loop = true;
quizMusic.volume = 0.3; // Volume kecil juga
// const introMusic = new Audio("sounds/intro_game.mp3");
// const quizMusic = new Audio("sounds/intro_game.mp3");
// const quizMusic = new Audio("sounds/quiz_play.mp3");
// const scoreMusic = new Audio("sounds/score_music.mp3");

introMusic.loop = true;
quizMusic.loop = true;
// scoreMusic.loop = true;

const benarSound = new Audio("sounds/jawaban_benar.mp3");
benarSound.volume = 1.0;
const salahSound = new Audio("sounds/jawaban_salah.mp3");
salahSound.volume = 1.0;
const selesai = new Audio("sounds/ucapan_terimakasih.mp3");
selesai.volume = 1.0;
window.onload = () => {
  introMusic.play();
};

// startQuiz();
