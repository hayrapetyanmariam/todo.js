// Selecttors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoSelect = document.querySelector('.todo-select');
const todoList = document.querySelector('.todo-list');

// Event Listeners

todoButton.addEventListener('click', createTodo);
todoList.addEventListener('click', checkTodo);
todoSelect.addEventListener('change', filter);
document.addEventListener('DOMContentLoaded', getTodos);


// Functions

function createTodo(event){
    event.preventDefault();


    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const span1 = document.createElement('span');
    span1.classList.add('todo-text');
    span1.innerText = todoInput.value;

    const span2 = document.createElement('span');
    span2.innerHTML = '<i class="fa-solid fa-check"></i>';
    span2.innerHTML += ' <i class="fa-solid fa-trash"></i>';

    todoDiv.appendChild(span1);
    todoDiv.appendChild(span2);

    todoList.appendChild(todoDiv);

    //console.log(todoInput.value);
   
    saveInLocalStorage( todoInput.value);
    todoInput.value = '';

}

function checkTodo(event){

    const todo =  event.target.parentElement.parentElement;

    if(event.target.classList[1] == 'fa-trash'){
        todo.classList.add('fall');
        removeFromLocalStorage(todo.children[0].innerText);
        todo.addEventListener('transitionend', ()=>{
            todo.remove();
        });
    }
    if(event.target.classList[1] == 'fa-check'){
        todo.classList.toggle('done');
    }
}

function filter(event){

    const todos = document.querySelectorAll('.todo');

    todos.forEach(todo=>{
        switch(event.target.value){
            case 'all': todo.style.display = 'flex';
            break;
            case 'completed': 
            if(todo.classList.contains('done')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                } 
            break;
            case 'uncompleted': 
            if(!todo.classList.contains('done')){
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            } 
            break;
        }
    })

    // if(event.target.value == 'all'){
    //     todos.forEach(todo =>{
    //         todo.style.display = 'flex';
    //     });
    // }
    // else if(event.target.value == 'completed'){
    //     todos.forEach(todo =>{
    //       if(todo.classList.contains('done')){
    //          todo.style.display = 'flex';
    //       } else {
    //         todo.style.display = 'none';
    //       } 
    //     });
    // }
    // else if(event.target.value == 'uncompleted'){
    //     todos.forEach(todo =>{
    //         if(!todo.classList.contains('done')){
    //            todo.style.display = 'flex';
    //         } else {
    //           todo.style.display = 'none';
    //         } 
    //       });
    // }
}

function saveInLocalStorage(text){
   let todos;
   if(localStorage.getItem('todos') == null){
    todos = [];
   } else{
    todos = JSON.parse(localStorage.getItem('todos'));
   }
   todos.push(text);
   localStorage.setItem('todos', JSON.stringify(todos));
}

function removeFromLocalStorage(text){
     todos = JSON.parse(localStorage.getItem('todos'));
    
     const index  = todos.indexOf(text);
     todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(text=>{
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    
        const span1 = document.createElement('span');
        span1.classList.add('todo-text');
        span1.innerText = text;
    
        const span2 = document.createElement('span');
        span2.innerHTML = '<i class="fa-solid fa-check"></i>';
        span2.innerHTML += ' <i class="fa-solid fa-trash"></i>';
    
        todoDiv.appendChild(span1);
        todoDiv.appendChild(span2);
    
        todoList.appendChild(todoDiv);
    
    })
}
