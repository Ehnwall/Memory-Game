// get data from sessionstorage & display in game

// Game data and elements
let players = JSON.parse(sessionStorage.getItem("players"));
const displayNames = document.querySelectorAll(".show-player");
const displayScores = document.querySelectorAll(".show-score");
const resetBtn = document.querySelector(".reset-btn");

// Game state
let deckOfCards = [
    { value: "A", img: "./images/Arnold-Schwarzenegger.webp" },
    { value: "A", img: "./images/Arnold-Schwarzenegger.webp" },
    { value: "B", img: "./images/Bruce-Willis.webp" },
    { value: "B", img: "./images/Bruce-Willis.webp" },
    { value: "C", img: "./images/Harrison-Ford.webp" },
    { value: "C", img: "./images/Harrison-Ford.webp" },
    { value: "D", img: "./images/Jackie-Chan.webp" },
    { value: "D", img: "./images/Jackie-Chan.webp" },
    { value: "E", img: "./images/Jean-Claude-Van-Damme.webp" },
    { value: "E", img: "./images/Jean-Claude-Van-Damme.webp" },
    { value: "F", img: "./images/John_Rambo.webp" },
    { value: "F", img: "./images/John_Rambo.webp" },
    { value: "G", img: "./images/Linda-Hamilton.webp" },
    { value: "G", img: "./images/Linda-Hamilton.webp" },
    { value: "H", img: "./images/Mel-Gibson.webp" },
    { value: "H", img: "./images/Mel-Gibson.webp" },
    { value: "I", img: "./images/Michelle-Pfieffer.webp" },
    { value: "I", img: "./images/Michelle-Pfieffer.webp" },
    { value: "J", img: "./images/Nicholas-Cage.webp" },
    { value: "J", img: "./images/Nicholas-Cage.webp" },
    { value: "K", img: "./images/Samuel-L-Jackson.webp" },
    { value: "K", img: "./images/Samuel-L-Jackson.webp" },
    { value: "L", img: "./images/Sigourney-Weaver.webp" },
    { value: "L", img: "./images/Sigourney-Weaver.webp" },
];
let selectedCards = [null, null];
let selectedCard1 = null;
let selectedCard2 = null;
let currentPlayer = 0;
let canFlip = true;

// Update displayed player names and scores
const updateDisplayPlayers = () => {
    for (let i = 0; i < players.length; i++) {
        displayNames[i].textContent = players[i].name;
        displayScores[i].textContent = players[i].score;
    }
};

// Takes an array and returns a shuffled array
const shuffle = (array) => {
    let copy = [];
    let n = array.length;
    let i;

    // While there remain elements to shuffle…
    while (n) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * n--);

        // And move it to the new array.
        copy.push(array.splice(i, 1)[0]);
    }

    return copy;
};

// Switch player
const switchPlayer = () => {
    if (currentPlayer === 0) {
        currentPlayer = 1;
    } else {
        currentPlayer = 0;
    }
};

// Check who has more score when the total player points is the same as the amount of pairs
const checkWinner = () => {
    const totalScore = players[0].score + players[1].score;
    const totalPairs = deckOfCards.length / 2;

    if (totalScore == totalPairs) {
        if (players[0].score > players[1].score) {
            return console.log(`${players[0].name} is the winner with the score of ${players[0].score} `);
        } else if (players[1].score > players[0].score) {
            return console.log(`${players[1].name} is the winner with the score of ${players[1].score} `);
        }
        return console.log(`It's a fucking TIE m8!`);
    }
};

const handleFirstCardSelection = (card) => {
    selectedCard1 = card;
    selectedCards[0] = card;
    selectedCard1.style.pointerEvents = "none";
};

const handleSecondCardSelection = (card) => {
    selectedCard2 = card;
    console.log(`${players[currentPlayer].name} chose: ${selectedCard1.dataset.value} and ${selectedCard2.dataset.value}`);

    if (selectedCard1.dataset.value === selectedCard2.dataset.value) {
        handleMatch();
    } else {
        selectedCard1.style.pointerEvents = "auto";
        canFlip = false;
        setTimeout(() => {
            console.log("Delayed for 2 second.");
            flipCard(selectedCard1);
            flipCard(selectedCard2);
            resetSelection();
            canFlip = true;
        }, 2000);
        console.log("try again punk! 🤬 switching players...");
        switchPlayer();
    }
};
const flipCard = (card) => {
    card.classList.toggle("is-flipped");
};
const handleMatch = () => {
    selectedCard2.style.pointerEvents = "none";
    console.log("you've found a pair! 😀");
    players[currentPlayer].score++;
    updateDisplayPlayers();
    resetSelection();
};

const resetSelection = () => {
    selectedCard1 = null;
    selectedCard2 = null;
};
const selectedCard = (i) => {
    if (!canFlip) return;
    const card = cards[i];

    if (selectedCard1 === null) {
        handleFirstCardSelection(card);
    } else if (selectedCard2 === null) {
        handleSecondCardSelection(card);
        checkWinner();
    }
    flipCard(card);
};

const game = () => {
    updateDisplayPlayers();
    deckOfCards = shuffle(deckOfCards);
    cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        const existingImageEl = cards[i].querySelector(".card-face--front > img");
        if (existingImageEl) {
            existingImageEl.remove();
        }
        const imageEl = document.createElement("img");
        imageEl.src = deckOfCards[i].img;
        cards[i].querySelector(".card-face--front").append(imageEl);
        cards[i].dataset.value = deckOfCards[i].value;

        cards[i].addEventListener("click", (e) => {
            selectedCard(i);
        });
    }
};
game();

// Resets games & shuffles cards before a new game commences
resetBtn.addEventListener("click", () => {
    players[0].score = 0;
    players[1].score = 0;
    updateDisplayPlayers();
    deckOfCards = shuffle(deckOfCards);
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("is-flipped");
        cards[i].style.pointerEvents = "auto";
        const existingImageEl = cards[i].querySelector(".card-face--front > img");
        if (existingImageEl) {
            existingImageEl.remove();
        }
        const imageEl = document.createElement("img");
        imageEl.src = deckOfCards[i].img;
        setTimeout(() => {
            cards[i].querySelector(".card-face--front").append(imageEl);
        }, 1000);
        cards[i].dataset.value = deckOfCards[i].value;
    }
});
// https://bost.ocks.org/mike/shuffle/
//Funderingar:
//Kan vi göra selectedCard1 och 2 till en array istället?
