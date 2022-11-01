//Make connection to the server to create websocket between the 2 (client& server)
//this var 'socket' is for the frontend (not server)
const socket=io.connect('http://localhost:4000');

//Query DOM
let message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//emit events
btn.addEventListener('click',function(){
    //emits a message down the websocket to the server (send the data to the server)

    //1st param -> name of message
    //2nd param -> data 
    socket.emit('chat',{
        message:message.value,
        handle:handle.value
    });
})

message.addEventListener('keypress',function(){
    //emit another message (typing) to the server to then BROADCAST to another users EXCLUDING THIS USER
    socket.emit('typing',handle.value);
})

//listen for events 
socket.on('chat',function(data){
    //'chat' occurs after we click send, so we can clear it
    feedback.innerHTML=""
    //output to the DOM
    output.innerHTML += '<p><strong>'+data.handle +':</strong>' +data.message+'</p>';
})

socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>'+data+' is typing a message...</em></p>'
})