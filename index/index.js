var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.broadcast.emit('joined', {})
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        io.emit('left', {});
        console.log('a user disconnected')
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});