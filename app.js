const themeButtons = document.querySelectorAll(".theme");
// const html = document.querySelector("html");

const themes = [];
for (let i = 0; i < themeButtons.length; i++) {
    themes.push(themeButtons[i].dataset.theme);
    themeButtons[i].addEventListener("click", (e) => {
        html.dataset.theme = themes[i];
        sessionStorage.setItem("theme", themes[i]);
    });
}
const cardBackButtons = document.querySelectorAll(".display-card");

const cardBacks = [];
for (let i = 0; i < cardBackButtons.length; i++) {
    cardBacks.push(cardBackButtons[i].dataset.cardback);
    cardBackButtons[i].addEventListener("click", (e) => {
        for (let j = 0; j < cardBackButtons.length; j++) {
            cardBackButtons[j].classList.remove("active");
        }
        cardBackButtons[i].classList.add("active");
        console.log(cardBackButtons[i].classList);
        html.dataset.cardback = cardBacks[i];
        sessionStorage.setItem("cardback", cardBacks[i]);
    });
}
console.log(themes);
console.log(cardBacks);
