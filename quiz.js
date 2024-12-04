// Dark/Light theme function från DEV
// https://dev.to/whitep4nth3r/the-best-lightdark-mode-theme-toggle-in-javascript-368f

function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
      return localStorageTheme;
    }
  
    if (systemSettingDark.matches) {
      return "dark";
    }
  
    return "light";
  }

  function updateButton({ buttonEl, isDark }) {
    const newCta = isDark ? "Ändra till ljust tema" : "Ändra till mörkt tema";
    buttonEl.innerText = newCta;
  }

  function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
  }

  const button = document.querySelector("[data-theme-toggle]");
  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
  let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
  
  updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
  updateThemeOnHtmlEl({ theme: currentThemeSetting });
  
  button.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  
    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });
  
    currentThemeSetting = newTheme;
  }); 

// Quiz

const quizArray = [
    {
        question: "1. Den 23 juni 2013 spelades den sista matchen på gamla Söderstadion och Kennedy Bakircioglu gjorde det sista målet någonsin på arenan.",
        options: ["Sant", "Falskt"],
        answer: "Sant",
        type: "trueFalse"
    },
    {
        question: "2. Vem är huvudtränare för Hammarby IF herrlag (från och med 2024)?",
        options: ["a) Zlatan Ibrahimović", "b) Nanne Bergstrand", "c) Kim Hellberg", "d) Henrik Rydström"],
        answer: "c) Kim Hellberg",
        type: "single"
    },
    {
        question: "3. Vilka av följande titlar har Hammarby IF vunnit?",
        options: ["a) Svenska Cupen", "b) Nordic Nations League", "c) Allsvenskan", "d) Svenska Supercupen"],
        answer: ["a) Svenska Cupen", "c) Allsvenskan"],
        type: "multiple"
    },
    {
        question: "4. Hammarby IF har aldrig spelat i någon lägre division än Allsvenskan.",
        options: ["Sant", "Falskt"],
        answer: "Falskt",
        type: "trueFalse"
    },
    {
        question: "5. Vilka av följande spelare var med och vann SM-guld 2001 med Hammarby?",
        options: ["a) Jörgen Pettersson", "b) Andreas Hermansson", "c) Mikael Andersson", "d) Martin Mutumba"],
        answer: ["b) Andreas Hermansson", "c) Mikael Andersson"],
        type: "multiple"
    },
    {
        question: "6. Den gamle Hammarbytränaren Sören Cratz vann SM-Guld med Hammarby och blev utsedd till 'Årets tränare', 'Årets idrottsledare', 'Årets ledare' samt 'Månadens stockholmare'.",
        options: ["Sant", "Falskt"],
        answer: "Sant",
        type: "trueFalse"
    },
    {
        question: "7. Vilken av följande ramsor är inte en Bajen ramsa?",
        options: ["a) Söder Bröder Glöder!", "b) Säg Oh ah Kennedy", "c) Forza Bajen, in med bollen, hey hey!", "d) You'll never walk alone"],
        answer: "d) You'll never walk alone",
        type: "single"
    },
    {
        question: "8. Lennart 'Nacka' Skoglunds namn förknippas starkt med Hammarby IF. Han föddes på julafton 1929 och växte upp med sin familj på Katarina Bangata 42, där står det numera en staty till hans ära där Hammarbyare samlas varje julafton för att hedra hans minne.",
        options: ["Sant", "Falskt"],
        answer: "Sant",
        type: "trueFalse"
    },
    {
        question: "9. Lennart 'Nacka' Skoglund är även känd under ett annat smeknamn, vilket?",
        options: ["a) Den vajande majskolven", "b) Blixten från Söder", "c) Katarinas stjärna", "d) Trädgårdsmästaren"],
        answer: "a) Den vajande majskolven",
        type: "single"
        },
        {
        question: "10. Hur stor del av Hammarby Fotbolls aktier äger Zlatan Ibrahimovic?",
        options: ["a) Ingen", "b) Ca 5%", "c) Ca 10%", "d) Ca 25%."],
        answer: "d) Ca 25%",
        type: "single"
        }
];
  
// Quiz
