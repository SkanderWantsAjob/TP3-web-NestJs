const socket = io("http://localhost:3000");
const SystemMessage = {
  id: 1,
  body: "Welcome to the Nest Chat app",
  author: "Bot",
};
const message = document.getElementById('message');
const messages = document.getElementById('messages');


socket.connect();
socket.on('message', ({ data }) => {
  console.log("connected");
  handleNewMessage(data);
})
socket.on('connect',()=>{
  console.log("connected");
})
socket.on('discoonect',()=>{
  console.log("disconnected");
})
const handleSubmitNewMessage = (e) => {
  if (e.key !== "Enter" || inputValue.trim().length === 0) return;
  socket.emit('message', { author: currentUser, body: inputValue.trim() })
  inputValue="";
}
const handleLogout = () => {
  socket.disconnect(); 
  onLogout();
};

const handleNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
}

const buildNewMessage = (message) => {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(message))
  return li;
}