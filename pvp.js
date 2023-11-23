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

startButton.addEventListener("click", (e) => {
    const playerOneName = document.querySelector("#player-one");
    const playerTwoName = document.querySelector("#player-two");
    players[0].name = playerOneName.value;
    players[1].name = playerTwoName.value;

    sessionStorage.setItem("players", JSON.stringify(players));
    // e.preventDefault();
});
