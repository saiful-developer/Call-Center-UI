const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: '*' }
});

// Listen for client connection
io.on('connection', (socket) => {
    console.log('Client Connected: ', socket.id);










    // --- Agent join campaigns ---
    socket.on("joinCampaigns", (campaigns) => {
        campaigns.forEach((campaign) => {
            socket.join(campaign);
            console.log(`Agent ${socket.id} joined campaign: ${campaign}`);
        });
    });

    // --- Supervisor message to room ---
    socket.on('supervisorMessage', ({ room, message, name }) => {
        io.to(room).emit('message', {
            room,
            message,
            sender: name,
            supervisorId: socket.id,
            timestamp: new Date().toISOString()
        });
        console.log(`Supervisor name: ${name} sent message to campaign ${room} Id: ${socket.id}`);
    });

    // --- Agent reply to specific supervisor ---
    socket.on('agentReply', ({ supervisorId, message, name }) => {
        io.to(supervisorId).emit('message', {
            room: null,
            message,
            sender: name,
            isReply: true,
            timestamp: new Date().toISOString()
        });
        console.log(`Agent ${name} replied to Supervisor ${supervisorId}: ${message}`);
    });




    // --- Supervisor route tracking for continuous messages ---
    socket.on('supervisorRoute', (route) => {
        console.log(`Supervisor ${socket.id} is on route: ${route}`);

        // always clear any existing interval first
        if (socket.statusInterval) {
            clearInterval(socket.statusInterval);
            socket.statusInterval = null;
        }

        // Send continuous message only for /status route
        if (route === '/supervisor/live/campain-status') {
            socket.statusInterval = setInterval(() => {
                console.log(`continuous update form test from server at ${new Date().toLocaleTimeString()} `);
                socket.emit('continousMessage', `continuous update form test from server at ${new Date().toLocaleTimeString()} `);
            }, 2000);
        }
    });








    // --- Handle disconnection ---
    socket.on('disconnect', () => {
        clearInterval(socket.statusInterval); // stop continuous messages
        console.log('Client Disconnected', socket.id);
    });




});

server.listen(3000, () => {
    console.log('Socket server running on http://localhost:3000');
});
