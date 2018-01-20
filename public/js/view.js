let viewTodo=function(event){
  let reqListener=function(){
    document.getElementById(event.target.id+'_items').innerHTML=this.responseText
  }

  let xhr=new XMLHttpRequest
  xhr.addEventListener("load", reqListener)
  xhr.open('POST','viewTodo')
  xhr.send(`todoId=${event.target.id}`)
}

let deleteTodo=function(event){
  let reqListener=function(){
    window.location.reload();
  }

  let xhr=new XMLHttpRequest
  let todoId=event.target.id.split('_')[1]
  xhr.addEventListener("load", reqListener)
  xhr.open('POST','deleteTodo');
  xhr.send(`todoId=${todoId}`);
}
