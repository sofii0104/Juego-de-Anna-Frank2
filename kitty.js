// Preguntas y respuestas
let questions = [
  {
    question: "¿Cuál era el nombre completo de Ana Frank?",
    options: ["Anna Margot Frank", "Annelies Marie Frank", "Edith Annelies Frank", "Ana Elisabeth Frank"],
    answer: 1
  },
  {
    question: "¿En qué ciudad nació Ana Frank?",
    options: ["Ámsterdam, Países Bajos", "Berlín, Alemania", "Frankfurt am Main, Alemania", "Aachen, Alemania"],
    answer: 2
  },
  {
    question: "¿Por qué la familia Frank se trasladó a Ámsterdam en 1933?",
    options: [
      "Porque Otto Frank tenía una beca de trabajo en los Países Bajos",
      "Para huir de la persecución antijudía tras la llegada de Hitler al poder",
      "Porque Edith Frank quería que sus hijas estudiaran en Holanda",
      "Porque Margot recibió una oferta de trabajo en Ámsterdam"
    ],
    answer: 1
  },
  {
    question: "¿Qué objeto recibió Ana el día de su decimotercer cumpleaños que marcó su vida?",
    options: ["Una novela", "Una estrella de David", "Un diario", "Un pasaporte"],
    answer: 2
  },
  {
    question: "¿Dónde se escondió la familia Frank junto con otras personas?",
    options: [
      "En un campo de trabajo en Westerbork",
      "En un departamento secreto detrás de las oficinas comerciales de Otto Frank",
      "En la casa de los van Pels en Alemania",
      "En la escuela judía de Ámsterdam"
    ],
    answer: 1
  },
  {
    question: "¿Qué sucedió el 4 de agosto de 1944?",
    options: [
      "Los británicos liberaron el campo de Bergen-Belsen",
      "Ana terminó de escribir su diario",
      "La Gestapo descubrió el escondite de la familia Frank",
      "Los Frank huyeron a Suiza"
    ],
    answer: 2
  },
  {
    question: "¿En qué campo murieron Ana y su hermana Margot?",
    options: ["Auschwitz", "Westerbork", "Bergen-Belsen", "Sobibor"],
    answer: 2
  },
  {
    question: "¿Quién fue el único sobreviviente del anexo secreto?",
    options: ["Margot Frank", "Otto Frank", "Miep Gies", "Fritz Pfeffer"],
    answer: 1
  },
  {
    question: "¿Cuándo fue publicado el diario de Ana Frank por primera vez?",
    options: ["1939", "1945", "1947", "1960"],
    answer: 2
  },
  {
    question: "¿Qué se convirtió en museo en 1960?",
    options: [
      "El campo de concentración de Bergen-Belsen",
      "La casa donde nació Ana Frank en Frankfurt",
      "El anexo secreto en la calle Prinsengracht 263",
      "El campo de concentración de Auschwitz"
    ],
    answer: 2
  }
];

// Variables
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let playerName = "";

// Elementos del DOM
const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const greeting = document.getElementById("greeting");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");
const startButton = document.getElementById("start-btn");

// Mezclar arrays (para preguntas y opciones)
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Iniciar juego
startButton.addEventListener("click", () => {
  const input = document.getElementById("player-name").value.trim();
  if (!input) {
    alert("Por favor, ingresa tu nombre");
    return;
  }
  playerName = input;

  // 🔹 Ocultar pantalla inicial y mostrar preguntas
  startContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  shuffledQuestions = shuffleArray([...questions]);
  currentQuestionIndex = 0;
  score = 0;
  greeting.textContent = `¡Suerte, ${playerName}!`;
  showQuestion();
});

// Mostrar pregunta
function showQuestion() {
  const q = shuffledQuestions[currentQuestionIndex];
  questionElement.textContent = q.question;
  optionsElement.innerHTML = "";

  let shuffledOptions = shuffleArray([...q.options]);

  shuffledOptions.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => selectAnswer(option, q);
    optionsElement.appendChild(button);
  });
}

// Seleccionar respuesta
function selectAnswer(selected, q) {
  const correctAnswer = q.options[q.answer];
  const buttons = optionsElement.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
    if (btn.textContent === selected && selected !== correctAnswer) {
      btn.classList.add("wrong");
    }
  });

  if (selected === correctAnswer) {
    score += 10;
  }

  setTimeout(nextQuestion, 1200);
}

// Siguiente pregunta
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// Terminar juego
function endQuiz() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreElement.textContent = `${playerName}, tu puntaje final es: ${score}`;
  messageElement.textContent =
    score >= 80
      ? "¡Excelente trabajo! 🌟"
      : score >= 50
      ? "¡Muy bien! Sigue aprendiendo 📚"
      : "¡No te rindas! Intenta de nuevo 💪";
}
