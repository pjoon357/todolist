const loginForm = document.querySelector("#top__right__form");
const loginInput = document.querySelector("#top__right__inputnm");
const greeting = document.querySelector("#top__right__label");
const resetBtn = document.querySelector("#top__right__resetBtn");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
}

function clickResetBtn() {
    localStorage.removeItem(USERNAME_KEY);
    greeting.innerText = "이름을 등록해주세요. 👉";
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    resetBtn.classList.add(HIDDEN_CLASSNAME);
}

function paintGreetings(username) {
    greeting.innerText = `안녕하세요. ${username}님`;
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings(savedUsername);
    resetBtn.classList.remove(HIDDEN_CLASSNAME);
    resetBtn.addEventListener("click", clickResetBtn);
}