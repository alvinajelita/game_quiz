let currentQuestionIndex = 0;
let score = 0;
let quizEnded = false;
let timer;
let timeLeft = 5;
let username = "";
// Data pertanyaan (dari game.js original)
let questions = [];

const questionsByMajor = {
  CODING: [
    {
      question: "💡 Apa yang dimaksud dengan Teknologi Informasi (TI)?",
      answers: [
        { text: "Bidang yang mempelajari pengolahan data dan teknologi komputer", correct: true },
        { text: "Pelajaran mesin industri", correct: false },
        { text: "Jurusan yang belajar cara menonton", correct: false },
      ]
    },
    {
      question: "📚 Mata kuliah TI yang berhubungan dengan coding adalah...",
      answers: [
        { text: "Memasak dan tata boga", correct: false },
        { text: "Pemrograman, Algoritma, Basis Data", correct: true },
        { text: "Bahasa Inggris, Bahasa Jepang, dan Mandarin", correct: false },
      ]
    },
    {
      question: "💼 Profesi TI yang dekat dengan dunia coding adalah...",
      answers: [
        { text: "Prog pamer dan Soft Bread", correct: false },
        { text: "Programmer dan Software Developer", correct: true },
        { text: "Programmer abal dan Software Dede", correct: false },
      ]
    },
    {
      question: "💰 Gaji lulusan TI di bidang coding biasanya...",
      answers: [
        { text: "Selalu rendah", correct: false },
        { text: "Tidak punya gaji", correct: false },
        { text: "Relatif tinggi dan tergantung skill", correct: true },
      ]
    },
    {
      question: "🌟 Manfaat belajar TI di dunia coding adalah...",
      answers: [
        { text: "Mampu membuat aplikasi dan solusi digital", correct: true },
        { text: "Mampu membuat apple dan solusi uang digital", correct: false },
        { text: "Mampu mengelola masalah orang lain", correct: false },
      ]
    }
  ],

  KOMPUTER: [
    {
      question: "💡 Teknologi Informasi berkaitan erat dengan...",
      answers: [
        { text: "Mesin berat", correct: false },
        { text: "Komputer, sistem, dan jaringan", correct: true },
        { text: "Handphone dan Earphone", correct: false },
      ]
    },
    {
      question: "📚 Mata kuliah TI yang berhubungan dengan komputer adalah...",
      answers: [
        { text: "Jaringan Komputer dan Sistem Operasi", correct: true },
        { text: "Mata kuliah lain", correct: false },
        { text: "Menggambar codingan", correct: false },
      ]
    },
    {
      question: "💼 Profesi TI yang berkaitan dengan komputer adalah...",
      answers: [
        { text: "IT Suplemen dan Network Eror", correct: false },
        { text: "IT Sport dan Network Energi", correct: false },
        { text: "IT Support dan Network Engineer", correct: true },
      ]
    },
    {
      question: "💰 Gaji lulusan TI di bidang komputer biasanya...",
      answers: [
        { text: "Selalu kecil", correct: false },
        { text: "Menjanjikan dan meningkat seiring pengalaman", correct: true },
        { text: "Tidak berkembang", correct: false },
      ]
    },
    {
      question: "🌟 Manfaat belajar TI di dunia komputer adalah...",
      answers: [
        { text: "Tidak ada manfaat", correct: false },
        { text: "Dapat uang yang banyak hingga milyarder", correct: false },
        { text: "Mampu mengelola sistem dan perangkat komputer", correct: true },
      ]
    }
  ],

  
  DIGITAL: [
    {
      question: "💡 Apa itu Teknologi Informasi (TI)?",
      answers: [
        { text: "Bidang keilmuan untuk memanfaatkan teknologi televisi & kabel untuk mengelola, mengolah, menyimpan, & Menyebarkan Hoax", correct: false },
        { text: "Bidang keilmuan untuk memanfaatkan teknologi yang ada untuk mengelola, mengolah, menyimpan, & Menyebarkan makanan", correct: false },
        { text: "Bidang keilmuan untuk memanfaatkan teknologi komputer & jaringan untuk mengelola, mengolah, menyimpan, & Menyebarkan Informasi", correct: true },
      ]
    },
    {
      question: "📚 Mata kuliah TI mencakup...",
      answers: [
        { text: "Pemrograman, Basis Data, dan Jaringan", correct: true },
        { text: "Pembobolan, Basis Mata, dan Jaringan", correct: false },
        { text: "Pemrograman, Data Diri, dan Jaringan Saraf Otak", correct: false },
      ]
    },
    {
      question: "💼 Profesi lulusan TI di dunia digital adalah...",
      answers: [
        { text: "Atlet", correct: false },
        { text: "Programmer, IT Support, Digital Specialist", correct: true },
        { text: "Petani", correct: false },
      ]
    },
    {
      question: "💰 Gaji lulusan TI di dunia digital...",
      answers: [
        { text: "Selalu kecil", correct: false },
        { text: "Tidak berkembang", correct: false },
        { text: "Kompetitif dan tergantung skill", correct: true },
      ]
    },
    {
      question: "🌟 Manfaat TI untuk diri sendiri adalah...",
      answers: [
        { text: "Siap menghadapi dunia kerja berbasis teknologi", correct: true },
        { text: "Tidak punya masa depan", correct: false },
        { text: "Hanya teori", correct: false },
      ]
    }
  ]
};
const majorSelectionDiv = document.getElementById("major-selection");
let selectedMajor = "";



function startQuiz() {
  username = usernameInput.value.trim();
  if (!username) {
    alert("⚠️ Masukkan nama kamu dulu ya! 😊");
    return;
  }

  // 🔊 PLAY INTRO MUSIC DI SINI
  introMusic.currentTime = 0;
  introMusic.play();

  introDiv.classList.add("hidden");
  majorSelectionDiv.classList.remove("hidden");
}


document.querySelectorAll(".major-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedMajor = btn.dataset.major;

    questions = questionsByMajor[selectedMajor];

    majorSelectionDiv.classList.add("hidden");
    quizContainer.classList.remove("hidden");

    currentQuestionIndex = 0;
    score = 0;
    quizEnded = false;
    scoreDisplay.innerText = `Skor: ${score} 🍀`;

    showQuestion();
  });
});



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
