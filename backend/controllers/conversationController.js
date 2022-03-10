const Conversation = require('../models/conversationModel');


const addConversation = async(req,res) => {
    const newConv = new Conversation({
        members:[req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConv = await newConv.save();
        if(!savedConv){
            throw new Error("Something Went Wrong!");
        }
        res.status(200).json(savedConv);

    } catch (e) {
        res.status(400).send({ message: e.message });
    }
};

//  Get conversation of a user
const getConversation = async(req,res) => {
    try {

            const conv = await Conversation.find({
                members: {$in: [req.params.id] },
            });
            if(!conv || !conv.length) {
                throw new Error("Conversations Not Found!");
            }

            res.status(200).json(conv);

    } catch(e) {
        res.status(400).send({ message: e.message });
    }
};


module.exports = {
    addConversation,
    getConversation
};