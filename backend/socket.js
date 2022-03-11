let io;

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  


exports.socketConnection = (server) => {
  io = require('socket.io')(8900, {
        cors: {
            origin: process.env.SOCKET_API_URL,
        },
    });
  io.on('connection', (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    socket.join(socket.request._query.id);



    // After every connection take socketid and userid from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        console.info(`Client with userid [${userId}] connected with socketid [${socket.id}]`);
        io.emit("getUsers", users);
      });

      //send and get message
   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
     if(user)
        {  
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text,
                receiverId
              });
        }
   });  

    socket.on('disconnect', () => {
      console.info(`Client disconnected [id=${socket.id}]`);
    });
  });
};