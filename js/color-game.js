/**Juego de Palabras - Test de Personalidad de cuatro colores
 * @author Alberto Canela
 * July 19, 2020
 * Color Game based on true colors personality games to identify the color profile of a person based on the four core colors.
 * Use of drag and drop functionality for sorting the options.
 */

/**Test Defined group of words for the personality game*/
const Questions = [
  [
    "Actividad, Variedad, Deportes, Oportunidades, Espontaniedad, Flexible",
    "Organizado, Planeado, Ordenado, Paternal, Tradicional, Responsable",
    "Cálido, Servicial, Amigos, Auténtico, Armonioso, Compasivo",
    "Aprendizaje, Ciencia, Tranquilo, Versátil, Inventivo, Compatente",
  ],
  [
    "Curioso, Ideas, Cuestionario, Conceptual, Conicimientos, Solucionar Problemas",
    "Cuidadoso, Interesado en las Personas, Sentimental, Singular, Enfático, Cominicativo",
    "Ordenado, Puntual, Honesto, Estable, Sensible, Formal",
    "Diversión, Acción, Retos, Competitivo, Impetuoso, Impactar",
  ],
  [
    "Servicial, Confiable, Formal, Leal, Conservador, Organizado",
    "Independiente, Explorador, Competente, Teórico, Pregunta ¿Por Qué?, Ingenioso",
    "Juguetón, Rápido, Aventurero, Confrontador, De Mente Abierta, Independiente",
    "Generoso, Comprensivo, Entregado, Devoto, Cálido, Poeta",
  ],
  [
    "Compartir, Participar, Llevarse Bien, Sentimental, Tierno, Inspiracional, Dramático",
    "Activo, Libre, Vencedor, Atrevido, Impulsivo, Arriesgado",
    "Pensador, Soluciona Problemas, Perfeccionista, Determinado, Complejo, Compuesto",
    "Sigue las Reglas, Útil, Ahorrador, Preocupado, Sigue los procedimientos, Cooperativo",
  ],
  [
    "Acertijos, Busca Información, Con sentido común, Filosófico, Con Principios, Racional",
    "Causas Sociales, Fácil de tratar, Finales Felices, Accesible, Afectuoso, Simpático",
    "Excitante, Avivado, Manos al asunto, Valiente, Habilidoso, Centro de Atención",
    "Orgullo, Tradición, Hacer las Cosas Bien, Ordenado, Convencional, Cuidadoso",
  ],
];

/**Maps a initial order with the color category to help calculate personality points
 * naranja = 1, oro = 2, azul = 3, verde = 4
 */
const pointMap = [
  [1, 2, 3, 4],
  [4, 3, 2, 1],
  [2, 4, 1, 3],
  [3, 1, 4, 2],
  [4, 3, 1, 2],
];

/**Controler Object that stores the state of the application */
var control = {
  page: 0, //Current Page (Set of caracteristics) shown
  naranja: 0,
  oro: 0,
  azul: 0,
  verde: 0,
  order: [
    //Store the current order of elements
    ["1", "2", "3", "4"],
    ["1", "2", "3", "4"],
    ["1", "2", "3", "4"],
    ["1", "2", "3", "4"],
    ["1", "2", "3", "4"],
  ],
};

//DOM elements retrieval
const tareas = document.getElementById("tareas");
const questionPage = document.getElementById("question-page");
const resultCard = document.getElementById("results");
const nextButton = document.getElementById("next-button");
const backButton = document.getElementById("back-button");
const chBar = document.getElementById("result-bars");
const chartData = {
  labels: ["Naranja", "Oro", "Azul", "Verde"],
  datasets: [
    {
      data: [0, 0, 0, 0],
      backgroundColor: ["orange", "gold", "blue", "green"],
    },
  ],
};

/**Chart.js bar chart construction*/
var bar = new Chart(chBar, {
  type: "bar",
  data: chartData,
  options: {
    plugins: {
      datalabels: {
        color: "white",
        font: {
          weight: "bold",
          size: 24,
        },
      },
    },

    scales: {
      xAxes: [
        {
          barPercentage: 0.75,
          categoryPercentage: 0.5,
        },
      ],
      yAxes: [
        {
          ticks: {
            max: 20,
            min: 0,
            stepSize: 2,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  },
});

/**Adds an specific amount of points to the control counter of the color specified */
function addPoints(colorNumber, pointsToAdd) {
  switch (colorNumber) {
    case 1:
      control.naranja += pointsToAdd;
      break;
    case 2:
      control.oro += pointsToAdd;
      break;
    case 3:
      control.azul += pointsToAdd;
      break;
    case 4:
      control.verde += pointsToAdd;
      break;
  }
}

/**
 * Calculates the final results of the game given the final order of the elements per page and their corresponding colors.
 * Per the game rules the highest (first element) will be asigned 4 points.
 */
function calculateResults() {
  //Reset Control Values
  control.verde = 0;
  control.azul = 0;
  control.naranja = 0;
  control.oro = 0;
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 4; j++) {
      //j=0 represents highest preference thus 4 points shall be awarded
      var blockNumber = parseInt(control.order[i][j], 10) - 1;
      addPoints(pointMap[i][blockNumber], 4 - j);
    }
  }
  console.log("Color Values: ", control);
}

/**
 * Inserts into the dom the word groups corresponding to the current page.
 * Sort the elements according to stored order for when backtraking.
 */
function renderQuestion() {
  tareas.innerHTML = `<div class="list-group-item" id="w" data-identificador="1">
  <h5 class="mb-0">
  ${Questions[control.page][0]}
  </h5>
  </div>
  
  <div class="list-group-item d-flex" id="x" data-identificador="2">
  <h5 class="mb-0">
  ${Questions[control.page][1]}
  </h5>
  </div>
  
  <div class="list-group-item d-flex" id="y" data-identificador="3">
  <h5 class="mb-0">
  ${Questions[control.page][2]}
  </h5>
  </div>
  
  <div class="list-group-item d-flex" id="z" data-identificador="4">
  <h5 class="mb-0">
  ${Questions[control.page][3]}
  </h5>
  </div>`;

  //Sort the list according to sort state in controller
  sortable.sort(control.order[control.page]);
}

/**Callback to advance to the next page on the game.
 * If next page corresponds to the final page in the program,
 * results will be shown and the questions block will be hidden.
 */
function renderNextQuestion() {
  control.page++;
  if (control.page < 5) {
    renderQuestion();
    if (control.page == 1) {
      showBackButton();
    }
  } else {
    renderResults();
    hideNextButton();
  }
}

/**Callback to return to a previous page. If called from the final page,
 * the question DOM elements will be restored and results will be hidden.
 * If navigating to page 0, the navigate bag button will be hidden.
 */
function renderPreviousQuestion() {
  control.page--;
  if (control.page == 0) {
    hideBackButton();
  }
  if (control.page == 4) {
    showNextButton();
    hideResults();
  }
  renderQuestion();
}

/**Calculates the results and updates the bar graph*/
function renderResults() {
  calculateResults();

  //Hide Questions
  questionPage.classList.add("d-none");
  //Show Result Canvas
  resultCard.classList.remove("d-none");

  bar.data.datasets[0].data = [
    control.naranja,
    control.oro,
    control.azul,
    control.verde,
  ];

  bar.update();
}

/**Hide Result (Bar Graph) DOM elements and shows Questions*/
function hideResults() {
  //Show Questions
  questionPage.classList.remove("d-none");
  //Hide Result Canvas
  resultCard.classList.add("d-none");
}

/**Hides the next button */
function hideNextButton() {
  nextButton.classList.add("d-none");
}

/**Shows the next button */
function showNextButton() {
  nextButton.classList.remove("d-none");
}

/**Hides the navigate back button */
function hideBackButton() {
  backButton.classList.add("d-none");
}

/**Shows the navigate back button */
function showBackButton() {
  backButton.classList.remove("d-none");
}

//Init Script: Start Sortable.js and render first page
var sortable = Sortable.create(tareas, {
  group: {
    name: "lista-tareas",
  },
  animation: 150,
  easing: "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
  chosenClass: "active",
  store: {
    set: function (sortable) {
      const orden = sortable.toArray();
      control.order[control.page][0] = orden[0];
      control.order[control.page][1] = orden[1];
      control.order[control.page][2] = orden[2];
      control.order[control.page][3] = orden[3];
      console.log(control.order[control.page]);
    },
  },
  dataIdAttr: "data-identificador",
});

renderQuestion();
