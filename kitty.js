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

const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const questionNumberElement = document.getElementById("question-number");
const finalMessage = document.getElementById("final-message");

document.getElementById("start-btn").addEventListener("click", () => {
  const name = document.getElementById("player-name").value.trim();
  if (name === "") {
    alert("Por favor ingresa tu nombre");
    return;
  }
  startContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  shuffleArray(questions);
  showQuestion();
});

function showQuestion() {
  resetState();
  const q = questions[currentQuestionIndex];
  questionElement.textContent = q.question;
  questionNumberElement.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;

  const shuffledOptions = [...q.options];
  shuffleArray(shuffledOptions);

  shuffledOptions.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => selectAnswer(option, q.answer, q.options);
    optionsElement.appendChild(button);
  });
}

function resetState() {
  optionsElement.innerHTML = "";
}

function selectAnswer(selected, correctIndex, originalOptions) {
  const buttons = optionsElement.querySelectorAll("button");
  buttons.forEach(btn => {
    if (btn.textContent === originalOptions[correctIndex]) {
      btn.classList.add("correct");
    }
    if (btn.textContent === selected && selected !== originalOptions[correctIndex]) {
      btn.classList.add("wrong");
    }
    btn.disabled = true;
  });

  if (selected === originalOptions[correctIndex]) {
    score += 10;
  }

  setTimeout(goNext, 800);
}

function goNext() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreElement.textContent = `Puntaje final: ${score}`;
  finalMessage.textContent = "👏 ¡Muy bien! Gracias por jugar 🐾";
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
