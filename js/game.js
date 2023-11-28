// get data from sessionstorage & display in game

// Game data and elements
let players = JSON.parse(sessionStorage.getItem("players"));
const displayNames = document.querySelectorAll(".show-player");
const displayScores = document.querySelectorAll(".show-score");
const resetBtn = document.querySelector(".reset-btn");

// Game state
let deckOfCards = [
    { value: "A", img: "../images/Arnold-Schwarzenegger.webp" },
    { value: "A", img: "../images/Arnold-Schwarzenegger.webp" },
    { value: "B", img: "../images/Bruce-Willis.webp" },
    { value: "B", img: "../images/Bruce-Willis.webp" },
    { value: "C", img: "../images/Harrison-Ford.webp" },
    { value: "C", img: "../images/Harrison-Ford.webp" },
    { value: "D", img: "../images/Jackie-Chan.webp" },
    { value: "D", img: "../images/Jackie-Chan.webp" },
    { value: "E", img: "../images/Jean-Claude-Van-Damme.webp" },
    { value: "E", img: "../images/Jean-Claude-Van-Damme.webp" },
    { value: "F", img: "../images/John_Rambo.webp" },
    { value: "F", img: "../images/John_Rambo.webp" },
    { value: "G", img: "../images/Linda-Hamilton.webp" },
    { value: "G", img: "../images/Linda-Hamilton.webp" },
    { value: "H", img: "../images/Mel-Gibson.webp" },
    { value: "H", img: "../images/Mel-Gibson.webp" },
    { value: "I", img: "../images/Michelle-Pfieffer.webp" },
    { value: "I", img: "../images/Michelle-Pfieffer.webp" },
    { value: "J", img: "../images/Nicholas-Cage.webp" },
    { value: "J", img: "../images/Nicholas-Cage.webp" },
    { value: "K", img: "../images/Samuel-L-Jackson.webp" },
    { value: "K", img: "../images/Samuel-L-Jackson.webp" },
    { value: "L", img: "../images/Sigourney-Weaver.webp" },
    { value: "L", img: "../images/Sigourney-Weaver.webp" },
];
let firstSelectedCard = null;
let SecondSelectedCard = null;
let currentPlayer = 0;
let canFlip = true;

// Update displayed player names and scores
const renderPlayers = () => {
    for (let i = 0; i < players.length; i++) {
        displayNames[i].textContent = players[i].name;
        displayScores[i].textContent = players[i].score;
        if (i === currentPlayer) {
            displayNames[i].style.color = "var(--secondary)";
        } else {
            displayNames[i].style.color = "var(--text)";
        }
    }
};

// Takes an array and returns a shuffled array src:https://bost.ocks.org/mike/shuffle/
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

// Switch player and change color of names
const switchPlayer = () => {
    if (currentPlayer === 0) {
        currentPlayer = 1;
        renderPlayers();
        if (players[currentPlayer].name === "Computer") {
            computerTurn();
        }
    } else {
        currentPlayer = 0;
        renderPlayers();
    }
};

const computerTurn = () => {
    const unFlippedCards = [];
    const cards = document.querySelectorAll(".card:not(.is-flipped)");
    for (let i = 0; i < cards.length; i++) {
        unFlippedCards.push(cards[i]);
    }
    let firstRandomCard;
    let firstCard;
    setTimeout(() => {
        firstRandomCard = Math.floor(Math.random() * unFlippedCards.length);
        selectedCard(unFlippedCards[firstRandomCard]);
        firstCard = unFlippedCards[firstRandomCard];
        //Remove selected card from the array
        unFlippedCards.splice(firstRandomCard, 1);
    }, 3000);

    setTimeout(() => {
        let secondRandomCard;
        if (Math.random() < 0.33) {
            for (let i = 0; i < cards.length; i++) {
                if (firstCard.dataset.value === unFlippedCards[i].dataset.value) {
                    secondRandomCard = unFlippedCards[i];
                    break;
                }
            }
            console.log("Jag är skitsmart");
        } else {
            secondRandomCard = unFlippedCards[Math.floor(Math.random() * unFlippedCards.length)];
            console.log("Jag är skitdum");
        }
        selectedCard(secondRandomCard);
    }, 4000);
};

// Check who has more score when the total player points is the same as the amount of pairs
const checkWinner = () => {
    const dialog = document.querySelector("dialog");
    const winnerNameEl = document.querySelector(".winner");
    const winnerScoreEl = document.querySelector(".score");

    const totalScore = players[0].score + players[1].score;
    const totalPairs = deckOfCards.length / 2;
    let winner = { name: "Everyone", score: 6 };

    if (totalScore == totalPairs) {
        if (players[0].score > players[1].score) {
            winner = players[0];
        } else if (players[1].score > players[0].score) {
            winner = players[1];
        }
        winnerNameEl.textContent = winner.name;
        winnerScoreEl.textContent = `With the score of ${winner.score}`;
        dialog.showModal();
        // Eventlistener for closing the dialog when clicking outside
        document.addEventListener("click", (event) => {
            if (event.target === dialog) {
                dialog.close();
            }
        });
    }
};

const handleFirstCardSelection = (card) => {
    firstSelectedCard = card;
    firstSelectedCard.style.pointerEvents = "none";
};

const handleSecondCardSelection = (card) => {
    SecondSelectedCard = card;

    if (firstSelectedCard.dataset.value === SecondSelectedCard.dataset.value) {
        canFlip = false;
        handleMatch();
    } else {
        firstSelectedCard.style.pointerEvents = "auto";
        canFlip = false;
        setTimeout(() => {
            flipCard(firstSelectedCard);
            flipCard(SecondSelectedCard);
            resetSelection();
            canFlip = true;
        }, 2000);
        switchPlayer();
    }
};
const flipCard = (card) => {
    card.classList.toggle("is-flipped");
};
const handleMatch = () => {
    SecondSelectedCard.style.pointerEvents = "none";
    players[currentPlayer].score++;
    setTimeout(() => {
        firstSelectedCard.classList.add("paired");
        SecondSelectedCard.classList.add("paired");
        renderPlayers();
        resetSelection();
        canFlip = true;

        if (players[currentPlayer].name === "Computer") {
            computerTurn();
        }
    }, 1000);
};

const resetSelection = () => {
    firstSelectedCard = null;
    SecondSelectedCard = null;
};
const selectedCard = (card) => {
    if (!canFlip) return;
    if (firstSelectedCard === null) {
        handleFirstCardSelection(card);
    } else if (SecondSelectedCard === null) {
        handleSecondCardSelection(card);
        checkWinner();
    }
    flipCard(card);
};

const game = () => {
    renderPlayers();
    deckOfCards = shuffle(deckOfCards);
    cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        const imageEl = document.createElement("img");
        imageEl.src = deckOfCards[i].img;
        cards[i].querySelector(".card-face--front").append(imageEl);
        cards[i].dataset.value = deckOfCards[i].value;

        cards[i].addEventListener("click", (e) => {
            selectedCard(cards[i]);
        });
    }
};
game();

// Resets games & shuffles cards before a new game commences
resetBtn.addEventListener("click", () => {
    players[0].score = 0;
    players[1].score = 0;
    currentPlayer = 0;

    renderPlayers();
    resetSelection();
    deckOfCards = shuffle(deckOfCards);
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.pointerEvents = "auto";
        cards[i].classList.remove("paired");
        cards[i].classList.remove("is-flipped");
        const existingImageEl = cards[i].querySelector(".card-face--front > img");
        setTimeout(() => {
            existingImageEl.src = deckOfCards[i].img;
        }, 1000);
        cards[i].dataset.value = deckOfCards[i].value;
    }
});
// https://bost.ocks.org/mike/shuffle/
//Funderingar:
//Kan vi göra selectedCard1 och 2 till en array istället?
