let viewTodo=function(event){
  let reqListener=function(){
    document.getElementById(event.target.id+'_items').innerHTML=this.responseText
  }

  let xhr=new XMLHttpRequest
  xhr.addEventListener("load", reqListener)
  xhr.open('POST','viewTodo')
  xhr.send(`todoId=${event.target.id}`)
}
