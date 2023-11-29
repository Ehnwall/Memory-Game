const startButton = document.querySelector(".start-game");
const players = [
    {
        name: "",
        score: 0,
    },
    {
        name: "Computer",
        score: 0,
    },
];

// Starts the game with the name that the user submits(if no name, use placeholders)
startButton.addEventListener("click", (e) => {
    const playerOneName = document.querySelector("#player-one");
    players[0].name = playerOneName.value;
    if (playerOneName.value == "") {
        players[0].name = playerOneName.getAttribute("placeholder");
    }
    sessionStorage.setItem("players", JSON.stringify(players));
});
