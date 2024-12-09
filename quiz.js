
//Array Data
const quizArray = [
    {
        type: "radio",
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
        question: "3. Vilka av följande titlar har Hammarby IF vunnit? (Flersvarsalternativ)",
        answers: [
            { option: " a) Svenska Cupen ", correct: true },
            { option: " b) Nordic Nations League ", correct: false },
            { option: " c) Allsvenskan ", correct: true },
            { option: " d) Svenska Supercupen ", correct: false }],
    },
    {
        type: "radio",
        question: "4. Hammarby IF har aldrig spelat i någon lägre division än Allsvenskan.",
        answers: [
            { option: " Sant ", correct: false },
            { option: " Falskt ", correct: true }],
    },
    {
        type: "checkbox",
        question: "5. Vilka av följande spelare var med och vann SM-guld 2001 med Hammarby? (Flersvarsalternativ)",
        answers: [
            { option: " a) Jörgen Pettersson ", correct: false },
            { option: " b) Andreas Hermansson ", correct: true },
            { option: " c) Mikael Andersson ", correct: true },
            { option: " d) Martin Mutumba ", correct: false }],
    },
    {
        type: "radio",
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
        type: "radio",
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
const main = document.querySelector("main");
const toggleBtn = document.querySelector(".toggleBtn");

toggleBtn.addEventListener("click", toggleBackgroundBtn, false);

let toggle = false;
function toggleBackgroundBtn() {
  body.style.backgroundColor = toggle ? "white" : "rgb(0, 136, 81)";
  main.style.backgroundColor = toggle ? "white" : "rgb(0, 136, 81)";
  questionDiv.style.color = toggle ? "rgb(0, 136, 81)" : "white";
  optionsDiv.style.color = toggle ? "rgb(0, 136, 81)" : "white";

  toggle = !toggle;
};

// Variables
let questionIndex = 0;
let answersArray = [];

// HTML Elements
const questionDiv = document.querySelector("#question");
const optionsDiv = document.querySelector("#options");
const answerBtn = document.querySelector("#answerButton");
const reDoBtn = document.querySelector("#redoButton");

//Fråga & Val Function
let showQuestion = () => {
    if (questionIndex < quizArray.length) {
        let question = quizArray[questionIndex];
        questionDiv.innerHTML = `<p>${question.question}</p>`;
        optionsDiv.innerHTML = "";
        answerBtn.style.display = "inline";
        answerBtn.textContent = "Nästa";

        question.answers.forEach((answer, index) => {
            const input = document.createElement("input");
            input.type = question.type;
            input.name = `question-${questionIndex}`;
            input.value = answer.option;
            input.id = `question-${questionIndex}-answer-${index}`;

            const label = document.createElement("label");
            label.setAttribute("for", input.id);
            label.textContent = answer.option;

            optionsDiv.append(input);
            optionsDiv.append(label);
            optionsDiv.append(document.createElement("br"));
        });

        //This. Varnar för att välja mer är 2 alternativ.
        if (question.type === "checkbox") {
            document.querySelectorAll("input[type='checkbox']").forEach(el => {
                el.addEventListener('change', function() {
                    if (el.closest("#options").querySelectorAll('input:checked').length > 2) {
                        this.setCustomValidity('Du kan max välja två alternativ!');
                        this.checked = false;
                        this.reportValidity();
                    }
                });
            });
        }
    }
};

//Rätta & pusha svar Function
answerBtn.addEventListener('click', () => {
    let selectedAnswers = document.querySelectorAll("input[type='radio']:checked, input[type='checkbox']:checked");

    if (selectedAnswers.length > 0) {
        let question = quizArray[questionIndex];

        if (question && question.answers) {
            let checkAnswers = (selectedAnswers) => {
                selectedAnswers.forEach(selectedAnswer => {
                    let selectedOption = question.answers.find(answer => answer.option === selectedAnswer.value);
                    let isCorrect = selectedOption ? selectedOption.correct : false;
                    answersArray.push({questionIndex: questionIndex, answer: selectedAnswer.value, isCorrect: isCorrect});
                });
            };

            if (question.type === "radio") {
                checkAnswers([selectedAnswers[0]]);
            } else if (question.type === "checkbox") {
                checkAnswers(selectedAnswers);
            }
        }

        if (questionIndex < quizArray.length) {
            questionIndex++;
            showQuestion();
            if (questionIndex === quizArray.length) {
                answerBtn.textContent = "Rätta Quiz";
            }
        } else {
            results();
        }
    } else {
        alert("Välj ett svar!");
    }
});

//Visa resultat function
let results = () => {
    questionDiv.innerHTML = "";
    optionsDiv.innerHTML = "";
    answerBtn.style.display = "none";

    const correctAnswers = answersArray.filter(answer => answer.isCorrect).length;
    const allAnswers = answersArray.length;
    const percentage = (correctAnswers / allAnswers) * 100;

    const resultOl = document.createElement("ol");
    optionsDiv.append(resultOl);

    quizArray.forEach((question, index) => {
        const resultLi = document.createElement("li");

        const selectedAnswers = answersArray.filter(answer => answer.questionIndex === index);

        if (question.type === "checkbox") {
            let selectedAnswersText = selectedAnswers.map(answer => `${answer.answer}: ${answer.isCorrect ? "Rätt!" : "Fel!"}`).join(", ");
            resultLi.textContent = selectedAnswersText;
        } else {
            let selectedAnswer = selectedAnswers[0];
            resultLi.textContent = `${selectedAnswer.answer}: ${selectedAnswer.isCorrect ? "Rätt!" : "Fel!"}`;
        }

        resultOl.append(resultLi);
    });

    if (percentage >= 75) {
        questionDiv.innerHTML += "<p style='display: inline; background: white; color: rgb(0, 136, 81); font-weight: bold;'>Riktigt bra jobbat kisen! Äkta bajare!</p>";
    } else if (percentage >= 50 && percentage < 75) {
        questionDiv.innerHTML += "<p style='display: inline; background: white; color: orange; font-weight: bold;'>Bra, du e nyinflyttad på Söder va?</p>";
    } else {
        questionDiv.innerHTML += "<p style='display: inline; background: white; color: red; font-weight: bold;'>Underkänt! Eru gårdare? Bäst du tar o jonnar härifrån va.</p>";
    }
};


// Starta om quiz Function
reDoBtn.addEventListener("click", () => {
    questionIndex = 0;
    answersArray = [];
    showQuestion();
});

showQuestion();