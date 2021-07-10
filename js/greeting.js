const loginForm = document.querySelector("#top__right__form");
const loginInput = document.querySelector("#top__right__inputnm");
const greeting = document.querySelector("#top__right__label");
const resetBtn = document.querySelector("#top__right__resetBtn");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
    resetBtn.classList.remove(HIDDEN_CLASSNAME);
    loginForm.classList.add(HIDDEN_CLASSNAME);
}

function clickResetBtn(event) {
    event.preventDefault();
    localStorage.removeItem(USERNAME_KEY);
    greeting.innerText = "이름을 등록해주세요. 👉";
    loginInput.value = "";
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    resetBtn.classList.add(HIDDEN_CLASSNAME);
}

function paintGreetings(username) {
    greeting.innerText = `안녕하세요. ${username}님`;
}

function init() {
    const savedUsername = localStorage.getItem(USERNAME_KEY);

    if (savedUsername) {
        paintGreetings(savedUsername);
        resetBtn.classList.remove(HIDDEN_CLASSNAME);
        loginForm.classList.add(HIDDEN_CLASSNAME);
    }
    loginForm.addEventListener("submit", onLoginSubmit);
    resetBtn.addEventListener("click", clickResetBtn);
}

init();