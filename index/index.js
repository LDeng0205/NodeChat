var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let clients = [] // trying to finish differentiating clients

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.username = "anonymous";
    // socket.broadcast.emit('joined', { online: onlineusers });
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', socket.username + ": " + msg);
    });
    socket.on('disconnect', () => {
        io.emit('left', {});
        // clients.splice(onlineusers.indexOf(socket.username), 1);
        // console.log(onlineusers);
    });
    socket.on('change_username', (data) => {
        socket.username = data.username;
        // onlineusers.push(socket.username);
    });
    // console.log(onlineusers);

});

http.listen(3000, () => {
    console.log('listening on *:3000');
});