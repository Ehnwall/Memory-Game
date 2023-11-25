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
