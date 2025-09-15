const questions = [
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

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const startContainer = document.getElementById("start-container");
const startBtn = document.getElementById("start-btn");
const playerNameInput = document.getElementById("player-name");
const welcomeText = document.getElementById("welcome");

const questionNumber = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz-container");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

// -------------------- Función para mezclar arrays --------------------
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// -------------------- Inicio del juego --------------------
startBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  if (name === "") {
    alert("Por favor ingresa tu nombre");
    return;
  }
  startContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  // Mezclar preguntas y opciones
  shuffleArray(questions);
  questions.forEach(q => q.options = shuffleArray([...q.options]));

  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
});

// -------------------- Mostrar preguntas --------------------
function showQuestion() {
  resetTimer();
  const q = questions[currentQuestionIndex];
  questionNumber.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
  questionElement.textContent = q.question;
  optionsElement.innerHTML = "";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => selectAnswer(index);
    optionsElement.appendChild(button);
  });

  startTimer();
}

// -------------------- Selección de respuesta --------------------
function selectAnswer(index) {
  clearInterval(timer);
  const q = questions[currentQuestionIndex];
  const buttons = optionsElement.querySelectorAll("button");

  const correctIndex = q.options.indexOf(q.options[q.answer]);

  if (index === correctIndex) {
    buttons[index].classList.add("correct");
    score += 10;
  } else {
    if (index >= 0) buttons[index].classList.add("wrong");
    buttons[correctIndex].classList.add("correct");
  }

  buttons.forEach(btn => (btn.disabled = true));

  // Pasar automáticamente a la siguiente pregunta después de 1.2 segundos
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }, 1200);
}

// -------------------- Timer --------------------
function startTimer() {
  timeLeft = 10;
  timerElement.textContent = `Tiempo: ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Tiempo: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(-1);
    }
  }, 500);
}

function resetTimer() {
  clearInterval(timer);
}

// -------------------- Fin del quiz --------------------
function endQuiz() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreElement.textContent = `Puntaje final: ${score}`;
}
