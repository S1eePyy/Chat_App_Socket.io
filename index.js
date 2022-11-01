const express = require('express');
const socket = require('socket.io');

//App setup 
const app = express();
const server = app.listen(4000,function(){
    console.log('bruh')
});


//Static files (serve these files in the browser)
app.use(express.static('public'));

//Socket setup (on server)
const io = socket(server); //want socket.io to work in this server (set it up in the backend)
//socket.io will be sitting around in the server, waiting for a client/browser to make a connection and set up a websocket between the 2

//listen for connection event
//the socket arg refers to that instance of socket which is made (10 clients making connection, each 1 will have their own socket between that client & server )
io.on('connection',function(socket){
    console.log('made socket connection',socket.id)

    //listen for that message being sent to us from the client -> 'chat'
    socket.on('chat',function(data){
        //send out to all diff clients connected to the server on the websocket
        io.sockets.emit('chat',data);
    })

    socket.on('typing',function(data){
        //broadcast this msg to every OTHER socket/client
        //socket-> individual who is typing
        socket.broadcast.emit('typing',data)//broadcasted/emit from the server
    })

})
