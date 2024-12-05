
//Array Data
const quizArray = [
    {
        type: "boolean",
        question: "1. Den 23 juni 2013 spelades den sista matchen på gamla Söderstadion och Kennedy Bakircioglu gjorde det sista målet någonsin på arenan.",
        answers: [
            { option: " Sant ", correct: true },
            { option: " Falskt ", correct: false }],
    },
    {
        type: "radio",
        question: "2. Vem är huvudtränare för Hammarby IF herrlag (från och med 2024)?",
        answers: [
            { option: " a) Zlatan Ibrahimović ", correct: false },
            { option: " b) Nanne Bergstrand ", correct: false },
            { option: " c) Kim Hellberg ", correct: true },
            { option: " d) Henrik Rydström ", correct: false }],
    },
    {
        type: "checkbox",
        question: "3. Vilka av följande titlar har Hammarby IF vunnit?",
        answers: [
            { option: " a) Svenska Cupen ", correct: true },
            { option: " b) Nordic Nations League ", correct: false },
            { option: " c) Allsvenskan ", correct: true },
            { option: " d) Svenska Supercupen ", correct: false }],
    },
    {
        type: "boolean",
        question: "4. Hammarby IF har aldrig spelat i någon lägre division än Allsvenskan.",
        answers: [
            { option: " Sant ", correct: false },
            { option: " Falskt ", correct: true }],
    },
    {
        type: "checkbox",
        question: "5. Vilka av följande spelare var med och vann SM-guld 2001 med Hammarby?",
        answers: [
            { option: " a) Jörgen Pettersson ", correct: false },
            { option: " b) Andreas Hermansson ", correct: true },
            { option: " c) Mikael Andersson ", correct: true },
            { option: " d) Martin Mutumba ", correct: false }],
    },
    {
        type: "boolean",
        question: "6. Den gamle Hammarbytränaren Sören Cratz vann SM-Guld med Hammarby och blev utsedd till 'Årets tränare', 'Årets idrottsledare', 'Årets ledare' samt 'Månadens stockholmare'.",
        answers: [
            { option: " Sant ", correct: true },
            { option: " Falskt ", correct: false }],
    },
    {
        type: "radio",
        question: "7. Vilken av följande ramsor är inte en Bajen ramsa?",
        answers: [
            { option: " a) Söder Bröder Glöder ", correct: false },
            { option: " b) Säg Oh ah Kennedy ", correct: false },
            { option: " c) Forza Bajen, in med bollen, hey hey ", correct: false },
            { option: " d) Du knallar aldrig ensam ", correct: true }],
    },
    {
        type: "boolean",
        question: "8. Lennart 'Nacka' Skoglunds namn förknippas starkt med Hammarby IF. Han föddes på julafton 1929 och växte upp med sin familj på Katarina Bangata 42, där står det numera en staty till hans ära där Hammarbyare samlas varje julafton för att hedra hans minne.",
        answers: [
            { option: " Sant ", correct: true },
            { option: " Falskt ", correct: false }],
    },
    {
        type: "radio",
        question: "9. Lennart 'Nacka' Skoglund är även känd under ett annat smeknamn, vilket?",
        answers: [
            { option: " a) Den vajande majskolven ", correct: true },
            { option: " b) Blixten från Söder ", correct: false },
            { option: " c) Katarinas stjärna ", correct: false },
            { option: " d) Trädgårdsmästaren ", correct: false }],
    },
    {
        type: "radio",
        question: "10. Hur stor del av Hammarby Fotbolls aktier äger Zlatan Ibrahimovic?",
        answers: [
            { option: " a) Ingen ", correct: false },
            { option: " b) Ca 5% ", correct: false },
            { option: " c) Ca 10% ", correct: false },
            { option: " d) Ca 25% ", correct: true }],
    }
];

//Dark/Light Mode
const body = document.querySelector("body");
const toggleBtn = document.querySelector(".toggleBtn");

toggleBtn.addEventListener("click", toggleBackgroundBtn, false);

let toggle = false;
function toggleBackgroundBtn() {
  body.style.backgroundColor = toggle ? "white" : "rgb(0, 136, 81)";

  toggle = !toggle;
}

//HTML Element
const questionDiv = document.querySelector("#question");
const optionsDiv = document.querySelector("#options");
const resultDiv = document.querySelector("#result");
const reDoBtn = document.querySelector("#redoButton");
const correctSpan = document.querySelector("#correct");
const totalSpan = document.querySelector("#total");

//Variables
let questionIndex = 0;
let correctAnswers = 0;

//Fråga/Svar Function
function showQuestion() {
    const question = quizArray[questionIndex];
    
    questionDiv.innerHTML = `<p>${question.question}</p>`;
    optionsDiv.innerHTML = "";

    if (question.type === "boolean") {
        question.options.forEach(option => {
            const label = document.createElement("label");
            label.textContent = option;
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question-${index}`;
            input.value = option;
            optionsDiv.append(input);
            optionsDiv.append(label);
        });
    } else if (question.type === "radio") {
        question.options.forEach(option => {
            const label = document.createElement("label");
            label.textContent = option;
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question-${index}`;
            input.value = option;
            optionsDiv.append(input);
            optionsDiv.append(label);
        });
    } else if (question.type === "checkbox") {
        question.options.forEach(option => {
            const label = document.createElement("label");
            label.textContent = option;
            const input = document.createElement("input");
            input.type = "checkbox";
            input.name = `question-${index}`;
            input.value = option;
            optionsDiv.append(input);
            optionsDiv.append(label);
        }); 
        
        //This. Varnar för att välja mer är 2 alternativ.
        document.querySelectorAll("input[type='checkbox']").forEach(el => {
            el.addEventListener('change', function() {
                if (el.closest("#options").querySelectorAll('input:checked').length > 2) {
                    this.setCustomValidity('Du kan max välja två alternativ!');
                    this.checked = false;
                    this.reportValidity();
                }
            });
        });
    };

    

    answerBtn.innerHTML = 
    `<p>${question.question}</p>
        <ul>
            ${question.answers.map(answer => `
                <li>
                    <button id="answerBtn">${answer.option}</button>
                </li>
            `).join("")}
        </ul>
    `;

    const answerBtn = document.querySelectorAll("#answerBtn");
    answerBtn.forEach(button => {
        button.addEventListener("click", checkAnswer);
    }); 
}

//Kolla svar, uppdatera variabler
function checkAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = quizArray[questionIndex].answers.find(answer => answer.option === selectedButton.textContent).correct;
    if (isCorrect) {
        correctAnswers++;
    }
    questionIndex++;
    if (questionIndex === quizArray.length) {
        showResults();
    } else {
        showQuestion();
    }
}

//Resultat Function
function showResults() {
    questionDiv.style.display = "none";
    resultDiv.style.display = "block";
    correctSpan.textContent = correctAnswers;
    totalSpan.textContent = quizArray.length;
}

//Starta om quiz
reDoBtn.addEventListener("click", () => {
    questionIndex = 0

    // questionIndex = 0;
    // correctAnswers = 0;
    // resultDiv.style.display = "none";
    // questionDiv.style.display = "block";
    // showQuestion();

});

showQuestion();