const cards = document.querySelectorAll(".card");
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", (e) => {
        cards[i].classList.toggle("is-flipped");
    });
}
// get data from sessionstorage & display in game
window.onload = () => {
    const players = JSON.parse(sessionStorage.getItem("players"));
    console.log(players);
    const displayNames = document.querySelectorAll(".show-player");
    const displayScores = document.querySelectorAll(".show-score");

    for (let i = 0; i < players.length; i++) {
        displayNames[i].textContent = players[i].name;
        displayScores[i].textContent = players[i].score;
    }
};

// DENNIS PARKERING
// ################
// ####
