const savedTheme = sessionStorage.getItem("theme");
const html = document.querySelector("html");
if (savedTheme) {
    html.dataset.theme = savedTheme;
}

const savedCard = sessionStorage.getItem("cardback");
if (savedCard) {
    html.dataset.cardback = savedCard;
}
