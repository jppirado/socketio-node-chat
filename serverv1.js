const express = require('express')
const app = express()
const http = require('http')
const socketio = require('socket.io')

const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/messages').then(()=>{
  console.log('mongo ok')
}).catch((err)=>{
  consolle.log('err')
})

require('./models/messages')
const Message = mongoose.model('messages')

const server = http.createServer(app)
const io = socketio(server)

app.get('/' , (request , response) => {
  response.sendFile(__dirname + '/chat.html')
})


let messages = []

io.on('connection', socket =>{

  socket.emit('sendAllMessages', messages)

  socket.on('send' , message=>{
    messages.push(message)
    io.emit('upDate' , message)
  })
})

server.listen( 3000 , console.log('Server ok'))

