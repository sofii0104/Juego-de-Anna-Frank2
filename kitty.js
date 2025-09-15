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

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz-container");
const scoreElement = document.getElementById("score");

function showQuestion() {
  const q = questions[currentQuestionIndex];
  questionElement.textContent = q.question;
  optionsElement.innerHTML = "";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => selectAnswer(index);
    optionsElement.appendChild(button);
  });
}

function selectAnswer(index) {
  const q = questions[currentQuestionIndex];
  const buttons = optionsElement.querySelectorAll("button");

  if (index === q.answer) {
    buttons[index].classList.add("correct");
    score += 10;
  } else {
    buttons[index].classList.add("wrong");
    buttons[q.answer].classList.add("correct");
  }

  buttons.forEach(btn => (btn.disabled = true));
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreElement.textContent = `Puntaje final: ${score}`;
}

showQuestion();
