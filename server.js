const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ScrapedData = require('./schema');
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);
const {new_user, disconnect_user, get_user} = require('./users.js');

//connection to mongodb
mongoose.connect('mongodb+srv://msoriano:goldtree299@scrapednumbers.pyjdr.mongodb.net/scrapedNumbers?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true}).then(function() {
    console.log('connected to database!')
});

const publicFolder = path.join(__dirname, './public');
app.use(express.static(publicFolder));

app.use(express.json());
app.use(express.static('./'));

//get users data and finds in the mongodb
app.post('/api', function(req, res) {
    ScrapedData.findOne(req.body)
        .then(function(data) {
          res.json({
            status: 'success',
            Phone_Number: data.Phone_Number
        });
    })
    .catch(function(error) {
        console.log('you entered a trusted number')
        res.json(error);
    });
});

// sample compromised numbers found in the database
// 08234567899 (indonesia)
// 7785134298 (canada)

//connection to socket.io
io.on('connect', function(socket){
    console.log('connected to socket.io!')

    //join user to specific rooms
    socket.on('join', function({username, room}, callback){
        const {error, user} = new_user({id: socket.id, username, room})

        if(error) {
            return callback(error)
        };

        socket.join(user.room)

        socket.emit('message', 'Welcome to this chatroom!')
        //broadcast events
        socket.broadcast.to(user.room).emit('message', `${user.username} has joined the room!`)

        callback()
    })

    //server listens for the message and emits
    socket.on('sendMessage', function(message){
        const user = get_user(socket.id)

        io.to(user.room).emit('message', message)
    });

    //disconnects user
    socket.on('disconnect', function(){
        const user = disconnect_user(socket.id)

        if(user) {
            io.to(user.room).emit('message', `${user.username} left the room!`)   
        }
       
    });
});

//connection to server
server.listen(3000, function(req, res){
    console.log('server connected to port3000!')
});