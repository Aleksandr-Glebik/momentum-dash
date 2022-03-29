const toDoForm = document.getElementById('js-toDoForm')
const toDoInput = document.getElementById('js-toDoInput')
const toDoList = document.getElementById('js-toDoList')

const TODOLS = 'toDoLS'

function loadToDoLS() {
    const toDoLS = localStorage.getItem(TODOLS)

    if (toDoLS !== null) {
        // если есть список задач в LS
    } else {
        // если нет списка задач в LS
    }
}

function  showToDos(text) {
    console.log(text);
}

function submitHandlerToDo(event) {
    event.preventDefault()
    const currentValue = toDoInput.value
    showToDos(currentValue)
    toDoInput.value = ''
    // console.log(event);
}

function init() {
    loadToDoLS()
    toDoForm.addEventListener('submit', submitHandlerToDo)
}

init()