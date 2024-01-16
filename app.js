var input = document.querySelector('input');
var button = document.querySelector('button');
var form = document.querySelector('form');
var todos = document.querySelector('.todos');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log("ok");
    let val = input.value.trim();
    if (val) {
        addToDoEl(
            {
                text: val,
            }
        )
        saveTodoList();
    }
    input.value = "";
})

function addToDoEl(todo) {
    var li = document.createElement("li");
    li.innerHTML = `
    <span>${todo.text}</span>
    <i class="fa fa-trash" aria-hidden="true"></i>
    `
    if(todo.status === 'completed'){
        li.setAttribute('class', 'completed')
    }

    li.addEventListener('click', function(){
        this.classList.toggle('completed')
        saveTodoList();
    })
    li.querySelector('i').addEventListener('click', function(){
        this.parentElement.remove();
        saveTodoList();
    })

    todos.appendChild(li);
}

function saveTodoList(){
    let todoList = document.querySelectorAll('li');
    // console.log(todoList);
    let todoStorage = [];
    todoList.forEach((item)=>{
        let text = item.querySelector('span').textContent
        let status = item.getAttribute('class')
        console.log(text, status);

        todoStorage.push({
            text,
            status
        })
    })
    // console.log(todoStorage);
    localStorage.setItem('todoList', JSON.stringify(todoStorage));
}

function init(){
    let data = JSON.parse(localStorage.getItem("todoList"));
    console.log(data);
    data.forEach((item)=>{
        addToDoEl(item);
    })
}

init()