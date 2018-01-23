let viewTodo = function(event) {
  let reqListener = function() {
    console.log(this.responseText);
    document.getElementById(event.target.id + '_items').innerHTML = this.responseText;
  }

  let xhr = new XMLHttpRequest
  xhr.addEventListener("load", reqListener);
  xhr.open('POST', 'viewTodo');
  xhr.send(`todoId=${event.target.id}`);
}

let deleteTodo = function(event) {
  let reqListener = function() {
    window.location.reload();
  }

  let xhr = new XMLHttpRequest
  let todoId = event.target.id.split('_')[1]
  xhr.addEventListener("load", reqListener);
  xhr.open('POST', 'deleteTodo');
  xhr.send(`todoId=${todoId}`);
}

let deleteItem = function(event) {
  let reqListener = function() {
    window.location.reload();
  }

  let xhr = new XMLHttpRequest
  let title = event.target.id.split('_')[1];
  let todoItem = event.target.id.split('_')[2];
  xhr.addEventListener('load', reqListener);
  xhr.open('POST', 'deleteItem');
  xhr.send(`todoId=${title}&item=${todoItem}`);
}

let doneItem = function(event) {
  let reqListener = function() {
    window.location.reload();
  }

  let xhr = new XMLHttpRequest
  let title = event.target.id.split('_')[1];
  let todoItem = event.target.id.split('_')[2];
  xhr.addEventListener('load', reqListener);
  xhr.open('POST', 'doneItem');
  xhr.send(`todoId=${title}&item=${todoItem}`);
}

let undoneItem = function(event) {
  let reqListener = function() {
    window.location.reload();
  }
  let xhr = new XMLHttpRequest
  let title = event.target.id.split('_')[1];
  let todoItem = event.target.id.split('_')[2];
  xhr.addEventListener('load', reqListener);
  xhr.open('POST', 'undoneItem');
  xhr.send(`todoId=${title}&item=${todoItem}`);
}

// let addItem=function(userName,title){
//   let reqListener = function() {
//     window.location.reload();
//   }
//
//   let xhr = new XMLHttpRequest
//   xhr.addEventListener('load', reqListener);
//   xhr.open('POST', 'addTodoItem');
//   xhr.send(`userName=${userName}&title=${title}`);
// }
