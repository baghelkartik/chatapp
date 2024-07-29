let name;
do{
  name = prompt("please enter your name")
}while(!name)

let messageArea=document.querySelector(".appcenter")
let textarea =document.querySelector("#textarea")
textarea.addEventListener("keyup",function(e){
if(e.key==="Enter"){
  sendmessage(e.target.value)
}
})

function sendmessage(message){
  let msg = {
    user:name,
    message:message.trim()
  }
      // Append 
      appendMessage(msg, 'outgoing')
      textarea.value = ''
      scrollToBottom()
  
      // Send to server 
      socket.emit('message', msg)    // Append 
   
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement('div')
  let className = type
  mainDiv.classList.add(className, 'message')

  let markup = `
      <h4>${msg.user}</h4>
      <p>${msg.message}</p>
  `
  mainDiv.innerHTML = markup
  messageArea.appendChild(mainDiv)
}
// Recieve messages 
socket.on('message', (msg) => {
  appendMessage(msg, 'incoming')
  scrollToBottom()
})

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight
}