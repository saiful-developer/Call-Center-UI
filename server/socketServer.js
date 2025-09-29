const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: '*' }
});

//listen for client connection
io.on('connection', (soket) => {

    //revice message form client
    soket.on('Message', (msg) => {
        console.log(msg);

        //send message to all client
        io.emit('Message', msg);
    });



    //handel disconnection
    soket.on('disconnect', () => {
        console.log('Client Disconnected', soket.id);
    });



});



server.listen(3000, () => {
    console.log('Socket server running on http://localhost:3000');
});