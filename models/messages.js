const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Message = new Schema({
  author: {
    type:String, 
  },
  messageContent:{
    type:String,
  }
})
mongoose.model('messages' , Message)
