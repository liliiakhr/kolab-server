const app = require("./app");
const MessageModel = require('./models/Message.model')

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;

let myServer = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});


// Socket io instance
const { Server } = require("socket.io");
const io = new Server(myServer, {
	cors: {
		origin: '*',
	}
});

//SOCKET EVENTS


io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on("join_chat", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    const { content: {sender, message}, chatId } = data
    let newMessage = {
      sender: sender._id, 
      message: message, 
      conversationId: chatId
    }
    // As the conversation happens, keep saving the messages in the DB
    MessageModel.create(newMessage)
      .then(() => {
        socket.to(data.chatId).emit("receive_message", data.content);
      })
    
  });

  socket.emit('me', socket.id)

  socket.on("callUser", (data) => {
     io.to(data.userToCall).emit("callUser", {signal: data.signalData, from: data.from, name: data.name})
  })

  socket.on("acceptCall", (data) => {
     io.to(data.to).emit("callAccepted", data.signal)
  })
});

