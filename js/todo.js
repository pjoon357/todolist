const toDoForm = document.querySelector("#container__todo__form");
const toDoInput = document.querySelector("#container__todo__input");
const toDoList = document.querySelector("#container__todo__list");
const randToDo = document.querySelector("#container__todo__randBtn");

const TODOS_KEY = "todos";
let toDos = [];
let recoToDos = [
    {
        id: 1,
        text: "팔굽혀펴기 100개",
        do: false
    },
    {
        id: 2,
        text: "윗몸일으키기 100개",
        do: false
    },
    {
        id: 3,
        text: "자전거 30분 타기",
        do: false
    },
    {
        id: 4,
        text: "영화 한 편 보기",
        do: false
    },
    {
        id: 5,
        text: "노마드코더 강의 듣기",
        do: false
    },
    {
        id: 6,
        text: "노마드챌린지 과제 하기",
        do: false
    }
];

function checkId(newTodo) {
    let i;
    for (i = 0; i < toDos.length; i++) {
        if (toDos[i].id === newTodo.id) {
            return true;
        }
    }
    return false;
}

function randRecoToDo() {
    try {
        const newTodo = recoToDos[Math.floor(Math.random() * recoToDos.length)];
        if (checkId(newTodo)) {
            randRecoToDo();
        } else {
            toDos.push(newTodo);
            paintToDo(newTodo);
            saveToDo();
        }
    } catch (error) {
        alert("더이상 추천할 수 없어요.");
    }
}

function saveToDo() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(btn) {
    let li = btn.target.parentElement.parentElement;
    if (btn.target.nodeName === "I") {
        li = li.parentNode;
    }
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDo();
}

function changeDo(id) {
    for (let i = 0; i < toDos.length; i++) {
        if (toDos[i].id === parseInt(id)) {
            toDos[i].do = (toDos[i].do ? false : true);
            saveToDo()
            break;
        }
    }
}

function checkToDo(btn) {
    let button = btn.target;
    if (btn.target.nodeName === "I") {
        button = button.parentNode;
    }
    if (button.classList.contains("checkedBtn")) {
        button.innerHTML = `<i class="fas fa-check"></i>`;
    } else {
        button.innerHTML = `<i class="fas fa-times"></i>`;
    }
    changeDo(button.parentElement.parentElement.id);
    button.classList.toggle("checkedBtn");
    button.parentElement.parentElement.children[0].classList.toggle("checked");
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    li.classList.add("allLi");
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const div = document.createElement("div");
    div.classList.add("liRight");
    const button1 = document.createElement("button");
    button1.classList.add("allBtn");
    if (newTodo.do) {
        button1.innerHTML = `<i class="fas fa-times"></i>`;
        button1.classList.add("checkedBtn");
        span.classList.add("checked");
    } else {
        button1.innerHTML = `<i class="fas fa-check"></i>`;
    }
    button1.addEventListener("click", checkToDo);
    const button2 = document.createElement("button");
    button2.classList.add("allBtn");
    button2.innerHTML = `<i class="fas fa-trash-alt"></i>`;
    button2.addEventListener("click", deleteToDo);
    div.appendChild(button1);
    div.appendChild(button2);
    li.appendChild(span);
    li.appendChild(div);
    toDoList.appendChild(li);
}

function submitToDo(event) {
    event.preventDefault();
    const newToDotext = toDoInput.value;
    toDoInput.value = "";
    const newTodo = {
        id: Date.now(),
        text: newToDotext,
        do: false
    };
    toDos.push(newTodo);
    paintToDo(newTodo);
    saveToDo();
}

toDoForm.addEventListener("submit", submitToDo);
randToDo.addEventListener("click", randRecoToDo);
const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}