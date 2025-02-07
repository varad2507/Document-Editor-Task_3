const editor = document.getElementById('editor');
const socket = io();

// Receive the initial document content
socket.on('document', (content) => {
    editor.value = content;
});

// Receive updates from other users
socket.on('update', (content) => {
    editor.value = content;
});

// Send updates to the server
editor.addEventListener('input', () => {
    socket.emit('edit', editor.value);
});