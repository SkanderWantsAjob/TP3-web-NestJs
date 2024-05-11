const socket = io('http://localhost:3000');
const SystemMessage = {
  id: 1,
  body: 'Welcome to the Nest Chat app',
  author: 'Bot',
};
const message = document.getElementById('message');
const messages = document.getElementById('messages');

let user = prompt('Enter your name to join the chat');
socket.connect();

socket.on('message', (message) => {
  console.log('hedhy data wok', message.author);
  handleNewMessage(message.body, message.author);
});
socket.on('connect', () => {
  console.log('connected');
});
socket.on('disconnect', () => {
  console.log('disconnected');
});
const handleSubmitNewMessage = () => {
  socket.emit('message', { author: user, body: message.value });
};
const handleLogout = () => {
  socket.disconnect();
  console.log('disconnected');
};

const handleNewMessage = (body,author) => {
  messages.appendChild(buildNewMessage(body,author));
};

const buildNewMessage = (body, author) => {
  const li = document.createElement('li');
  
  //console.log(body, author);
  if(author==user){
    li.style.color='blue';
    li.classList.add('Messageright');
  }else{li.classList.add('messageLeft')}
    
  li.appendChild(document.createTextNode(author+":  "))
  li.appendChild(document.createTextNode(body));
  return li;
};
