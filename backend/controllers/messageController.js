const Message = require('../models/messageModel');

const getMessages = async(req,res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.id,
        });
        if(!messages || !messages.length) {
            throw new Error("No Messages Found!");
        }
        res.status(200).json(messages);

    } catch(e) {
        res.status(400).send({ message: e.message });
    }
};

const addMessage = async(req,res) => {
    try {

        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();
        if(!savedMessage){
            throw new Error("Something Went Wrong!");
        }
        res.status(200).json(savedMessage);
        

    } catch(e) {
        res.status(400).send({ message: e.message });
    }
};

module.exports = {
getMessages,
addMessage
};