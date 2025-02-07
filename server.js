// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let documentContent = ''; // Shared document content

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send the current document content to the new user
    socket.emit('document', documentContent);

    // Handle document updates
    socket.on('edit', (newContent) => {
        documentContent = newContent;
        // Broadcast the updated content to all connected clients
        socket.broadcast.emit('update', documentContent);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});