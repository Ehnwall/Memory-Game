const startButton = document.querySelector(".start-game");

const players = [
    {
        name: "",
        score: 0,
    },
    {
        name: "",
        score: 0,
    },
];

// Starts the game with the names that the user inputs(if no names, use placeholders)
startButton.addEventListener("click", (e) => {
    const playerOneName = document.querySelector("#player-one");
    const playerTwoName = document.querySelector("#player-two");
    players[0].name = playerOneName.value;
    players[1].name = playerTwoName.value;
    if (playerOneName.value == "") {
        players[0].name = playerOneName.getAttribute("placeholder");
    }
    if (playerTwoName.value == "") {
        players[1].name = playerTwoName.getAttribute("placeholder");
    }
    sessionStorage.setItem("players", JSON.stringify(players));
});
