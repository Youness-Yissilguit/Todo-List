const addBtn = document.querySelector('.header .add-input button');
const todoContainer = document.querySelector('.list-container .content');
const input = document.querySelector('.header .add-input input');
const checkBtn = document.querySelectorAll('.content li .complete-btn');
const todoSelect = document.querySelector('.header .filter .filter-todo');

document.addEventListener('DOMContentLoaded', getTodos);

addBtn.addEventListener('click', addTodo);

todoContainer.addEventListener('click', deleteTodo);

todoSelect.addEventListener('click', flterTodo);

//add todo function
function addTodo(e){
  e.preventDefault();
  if(input.value !== ''){
    //the list
    const list = document.createElement('li');
    //the content of the list
    const todoContent = document.createElement('p');
    todoContent.classList.add('list-content');
    todoContent.innerText = input.value;
    list.appendChild(todoContent);
    //add todo to the localStorage
    saveTodos(input.value);
    //check button
    const todoCheck = document.createElement('span');
    todoCheck.classList.add('complete-btn');
    todoCheck.innerHTML = '<i class="fas fa-check-circle"></i>';
    list.appendChild(todoCheck);
    //delete button
    const todoDelet = document.createElement('span');
    todoDelet.classList.add('trash-btn');
    todoDelet.innerHTML = '<i class="fas fa-trash-alt"></i>';
    list.appendChild(todoDelet);
    //append the list to the container
    todoContainer.appendChild(list);
    //clear the input
    input.value = '';
  }

};
//delete todo function
function deleteTodo(e){
  const item = e.target;
  if (item.classList[0] === 'trash-btn'){
    const parent = item.parentElement;
    parent.classList.add('fall');
    removeFromStorage(parent);
    parent.addEventListener('transitionend', function(){
      parent.remove();
    });
  }
  if (item.classList[0] === 'complete-btn'){
    const parent = item.parentElement;
    parent.classList.toggle('complete');
  }
}
//filter todo lists
function flterTodo(e){
  const todos = todoContainer.childNodes;
  todos.forEach(function(todo) {
    switch(e.target.value){
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("complete")){
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("complete")){
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
//save todos to local storage
function saveTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}
//get todo from the localStorage
function getTodos(){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  //loop on the todo in the local
  todos.forEach(function(todo){
    //the list
    const list = document.createElement('li');
    //the content of the list
    const todoContent = document.createElement('p');
    todoContent.classList.add('list-content');
    todoContent.innerText = todo;
    list.appendChild(todoContent);
    //check button
    const todoCheck = document.createElement('span');
    todoCheck.classList.add('complete-btn');
    todoCheck.innerHTML = '<i class="fas fa-check-circle"></i>';
    list.appendChild(todoCheck);
    //delete button
    const todoDelet = document.createElement('span');
    todoDelet.classList.add('trash-btn');
    todoDelet.innerHTML = '<i class="fas fa-trash-alt"></i>';
    list.appendChild(todoDelet);
    //append the list to the container
    todoContainer.appendChild(list);
  })
}
//remove todo from the localStorage
function removeFromStorage(todo) {
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoText = todo.childNodes[0].innerText;
  todos.splice(todos.indexOf(todoText), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
