/* ========= Carousel ========= */
const track = document.querySelector(".track");
const slides = Array.from(track.children);
const prevBtn = document.querySelector(".control.prev");
const nextBtn = document.querySelector(".control.next");
const dotsNav = document.querySelector(".dots");

let currentIndex = 0;
let autoSlideInterval;

slides.forEach((_, i) => {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dotsNav.appendChild(dot);
});
const dots = Array.from(dotsNav.children);

function updateCarousel(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
    currentIndex = index;
}
prevBtn.addEventListener("click", () => { updateCarousel((currentIndex - 1 + slides.length) % slides.length); resetAutoSlide(); });
nextBtn.addEventListener("click", () => { updateCarousel((currentIndex + 1) % slides.length); resetAutoSlide(); });
dots.forEach((dot, i) => dot.addEventListener("click", () => { updateCarousel(i); resetAutoSlide(); }));

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        updateCarousel((currentIndex + 1) % slides.length);
    }, 5000);
}
function resetAutoSlide() { clearInterval(autoSlideInterval); startAutoSlide(); }
startAutoSlide();

/* ========= Weather Quiz ========= */
const quizData = [
    {
        question: "Which instrument is used to measure temperature?",
        options: ["Barometer", "Thermometer", "Anemometer", "Hygrometer"],
        answer: "Thermometer"
    },
    {
        question: "What does a barometer measure?",
        options: ["Wind Speed", "Air Pressure", "Humidity", "Rainfall"],
        answer: "Air Pressure"
    },
    {
        question: "Which cloud type is fluffy and white?",
        options: ["Cumulus", "Cirrus", "Stratus", "Nimbus"],
        answer: "Cumulus"
    },
    {
        question: "The scale used to measure wind speed is?",
        options: ["Richter Scale", "Beaufort Scale", "Fahrenheit Scale", "Kelvin Scale"],
        answer: "Beaufort Scale"
    },
    {
        question: "What gas is most abundant in Earth’s atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
        answer: "Nitrogen"
    }
];

let currentQ = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");
const nextBtnQuiz = document.getElementById("next-btn");
const resultBox = document.getElementById("quiz-result");
const progressText = document.getElementById("quiz-progress");

function loadQuestion() {
    const q = quizData[currentQ];
    quizContainer.innerHTML = `
    <h3>${q.question}</h3>
    <div class="quiz-options">
      ${q.options.map(opt => `<button class="option-btn">${opt}</button>`).join("")}
    </div>
  `;

    progressText.textContent = `Question ${currentQ + 1} of ${quizData.length}`;

    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
        });
    });
}

nextBtnQuiz.addEventListener("click", () => {
    const selected = document.querySelector(".option-btn.selected");
    if (!selected) return alert("Please select an option!");
    if (selected.textContent === quizData[currentQ].answer) score++;

    currentQ++;
    if (currentQ < quizData.length) {
        loadQuestion();
    } else {
        quizContainer.innerHTML = "";
        nextBtnQuiz.style.display = "none";
        progressText.textContent = "";
        resultBox.innerHTML = `🌟 You scored <span style="color:var(--primary)">${score}</span> out of ${quizData.length}`;
    }
});

loadQuestion();

/* ========= Weather API ========= */
/* ========= Weather API ========= */
const apiKey = "6834e0094d6da99125998627f4f8a7ba"; // direct API key

document.getElementById("get-weather").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                document.getElementById("weather-result").innerHTML = `<p>❌ City not found</p>`;
                return;
            }

            const { name, main, weather } = data;
            document.getElementById("weather-result").innerHTML = `
        <h3>${name}</h3>
        <p>🌡️ Temperature: ${main.temp}°C</p>
        <p>💧 Humidity: ${main.humidity}%</p>
        <p>☁️ Condition: ${weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" 
             alt="${weather[0].description}" />
      `;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById("weather-result").innerHTML = `<p>⚠️ Something went wrong</p>`;
        });
});


/* ========= Footer Year ========= */
document.getElementById("year").textContent = new Date().getFullYear();
